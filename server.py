import base64, json, mimetypes, os, sqlite3, threading, uuid
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

WEB=Path(os.environ.get('WEB_ROOT','/app/web')).resolve()
DATA=Path(os.environ.get('DATA_ROOT','/data')).resolve()
DB=DATA/'garage.db'; IMAGES=DATA/'images'; LOCK=threading.Lock()
DATA.mkdir(parents=True,exist_ok=True); IMAGES.mkdir(parents=True,exist_ok=True)
def now(): return datetime.now(timezone.utc).isoformat()
def connect():
    con=sqlite3.connect(DB); con.row_factory=sqlite3.Row; return con
def init_db():
    with connect() as con:
        con.execute("CREATE TABLE IF NOT EXISTS state (key TEXT PRIMARY KEY,value TEXT NOT NULL,updated_at TEXT NOT NULL)")
        con.execute("CREATE TABLE IF NOT EXISTS images (id TEXT PRIMARY KEY,part TEXT,filename TEXT NOT NULL,original_name TEXT,created_at TEXT NOT NULL)")
        if not con.execute("SELECT 1 FROM state WHERE key='fleet'").fetchone():
            seed=json.loads((WEB/'data'/'fleet.json').read_text())
            con.execute("INSERT INTO state VALUES(?,?,?)",('fleet',json.dumps(seed),now()))
        con.commit()
def get_state(key):
    with connect() as con: row=con.execute("SELECT value FROM state WHERE key=?",(key,)).fetchone()
    return json.loads(row['value']) if row else None
def set_state(key,value):
    raw=json.dumps(value,ensure_ascii=False)
    with connect() as con:
        con.execute("INSERT INTO state VALUES(?,?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=excluded.updated_at",(key,raw,now())); con.commit()
def save_data_url(part,data_url,original_name=None):
    if not data_url or not data_url.startswith('data:image/'): return None
    header,encoded=data_url.split(',',1); mime=header.split(';',1)[0].split(':',1)[1]
    ext={'image/jpeg':'.jpg','image/png':'.png','image/webp':'.webp'}.get(mime,'.jpg')
    image_id=uuid.uuid4().hex; filename=image_id+ext; payload=base64.b64decode(encoded)
    if len(payload)>15*1024*1024: raise ValueError('image too large')
    (IMAGES/filename).write_bytes(payload)
    with connect() as con:
        con.execute("INSERT INTO images VALUES(?,?,?,?,?)",(image_id,part,filename,original_name,now())); con.commit()
    return f'api/images/{filename}'
def add_spare(payload):
    part=str(payload.get('part') or '?').strip(); name=str(payload.get('name') or (f'Part {part}' if part!='?' else 'Unidentified spare')).strip(); qty=max(1,int(payload.get('qty') or 1))
    img=save_data_url(part,payload.get('imageDataUrl'),payload.get('originalName'))
    with LOCK:
        fleet=get_state('fleet'); spares=fleet.setdefault('shared',{}).setdefault('spares',[])
        item=next((x for x in spares if str(x.get('part'))==part and part!='?'),None)
        if item:
            item['qty']=int(item.get('qty') or 0)+qty
            if img: item.setdefault('images',[]).append(img)
        else:
            item={'part':part,'name':name,'qty':qty,'unit':payload.get('unit') or 'item'}
            if payload.get('needsConfirmation') or part=='?': item['needsConfirmation']=True
            if img: item['images']=[img]
            spares.append(item)
        set_state('fleet',fleet)
    return fleet,item

class Handler(BaseHTTPRequestHandler):
    server_version='ERevoGarage/1.0'
    def log_message(self,fmt,*args): print(f"{self.address_string()} - {fmt%args}")
    def send_json(self,obj,status=200):
        body=json.dumps(obj,ensure_ascii=False).encode(); self.send_response(status); self.send_header('Content-Type','application/json; charset=utf-8'); self.send_header('Content-Length',str(len(body))); self.send_header('Cache-Control','no-store'); self.end_headers(); self.wfile.write(body)
    def read_json(self):
        length=int(self.headers.get('Content-Length','0'))
        if length>20*1024*1024: raise ValueError('request too large')
        return json.loads(self.rfile.read(length) or b'{}')
    def do_GET(self):
        path=unquote(urlparse(self.path).path)
        if path=='/api/health': return self.send_json({'ok':True,'db':str(DB),'images':len(list(IMAGES.glob('*')))})
        if path=='/api/fleet': return self.send_json(get_state('fleet'))
        if path.startswith('/api/images/'): return self.serve_file(IMAGES/Path(path).name)
        return self.serve_static(path)
    def do_PUT(self):
        path=unquote(urlparse(self.path).path)
        try:
            if path=='/api/fleet': set_state('fleet',self.read_json()); return self.send_json({'ok':True})
            return self.send_json({'error':'not found'},404)
        except Exception as e: return self.send_json({'error':str(e)},400)
    def do_POST(self):
        path=unquote(urlparse(self.path).path)
        try:
            if path=='/api/spares':
                fleet,item=add_spare(self.read_json()); return self.send_json({'ok':True,'item':item,'fleet':fleet},201)
            return self.send_json({'error':'not found'},404)
        except Exception as e: return self.send_json({'error':str(e)},400)
    def serve_file(self,file_path):
        try:
            file_path=file_path.resolve(); allowed=file_path.is_relative_to(WEB) or file_path.is_relative_to(IMAGES)
            if not allowed or not file_path.is_file(): return self.send_error(404)
            body=file_path.read_bytes(); ctype=mimetypes.guess_type(file_path.name)[0] or 'application/octet-stream'
            self.send_response(200); self.send_header('Content-Type',ctype); self.send_header('Content-Length',str(len(body))); self.send_header('Cache-Control','no-cache' if file_path.is_relative_to(WEB) else 'public, max-age=31536000, immutable'); self.end_headers(); self.wfile.write(body)
        except Exception: return self.send_error(404)
    def serve_static(self,path):
        rel='index.html' if path in ('','/') else path.lstrip('/'); target=(WEB/rel).resolve()
        if target.is_dir(): target=target/'index.html'
        if not target.is_relative_to(WEB): return self.send_error(403)
        if not target.exists():
            fallback=WEB/'index.html'; return self.serve_file(fallback) if fallback.exists() else self.send_error(404)
        return self.serve_file(target)

if __name__=='__main__':
    init_db(); port=int(os.environ.get('PORT','9560')); server=ThreadingHTTPServer(('0.0.0.0',port),Handler); print(f'E-Revo Garage listening on :{port}; DB={DB}; WEB={WEB}'); server.serve_forever()
