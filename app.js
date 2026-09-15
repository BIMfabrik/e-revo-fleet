const IMG = {
  body: {
    blue: 'https://i0.wp.com/discountrcparts.com/wp-content/uploads/2026/09/TRA-71076-3-BLUEX_01.webp',
    red: 'https://i0.wp.com/discountrcparts.com/wp-content/uploads/2026/09/TRA-71076-3-BLUEX_01.webp',
    violet: 'https://i0.wp.com/discountrcparts.com/wp-content/uploads/2026/09/TRA-71076-3-BLUEX_01.webp'
  },
  front: 'https://i0.wp.com/discountrcparts.com/wp-content/uploads/2026/09/TRA-71076-3-BLUEX_03.webp',
  side: 'https://i0.wp.com/discountrcparts.com/wp-content/uploads/2026/09/TRA-71076-3-BLUEX_04.webp',
  rear: 'https://i0.wp.com/discountrcparts.com/wp-content/uploads/2026/09/TRA-71076-3-BLUEX_02.webp',
  chassis: 'https://i0.wp.com/discountrcparts.com/wp-content/uploads/2026/09/TRA-71076-3-BLUEX_05.webp',
  top: 'https://i0.wp.com/discountrcparts.com/wp-content/uploads/2026/09/TRA-71076-3-BLUEX_06.webp',
  bottom: 'assets/e-revo-bottom.svg'
};
const REFERENCE_FILTER = {blue:'none', red:'hue-rotate(142deg) saturate(1.15)', violet:'none'};

const PARTS = {
  body: {n:'7111', name:'Body / shell', note:'Clear 1/16 E‑Revo body. Painted body numbers depend on colour.'},
  bumper: {n:'7135', name:'Front / rear bumper set', note:'Front and rear bumpers.'},
  frontArms: {n:'7131', name:'Front suspension arm set', note:'Upper and lower left/right front arms.', common:true},
  rearArms: {n:'7132', name:'Rear suspension arm set', note:'Upper and lower left/right rear arms.', common:true},
  carrier: {n:'7034', name:'Axle carriers', note:'Left and right axle carriers.'},
  driveshaft: {n:'7151', name:'Driveshaft assembly', note:'Complete left/right driveshaft assembly.'},
  shock: {n:'7061', name:'GTR composite shocks', note:'Assembled shocks, supplied without springs.'},
  motor: {n:'3371', name:'Velineon 380 brushless motor', note:'Stock 4000 kV brushless motor for the older 1/16 E‑Revo VXL / 71076‑3 generation.'},
  esc: {n:'3375', name:'VXL‑3m ESC', note:'Waterproof brushless ESC with LiPo Low-Voltage Detection and three drive profiles.'},
  servo: {n:'2080', name:'Micro waterproof steering servo', note:'Stock digital waterproof steering servo on the 71076‑3 generation.'},
  receiver: {n:'6533', name:'TQi receiver with TSM', note:'5-channel TQi receiver with telemetry ports and Traxxas Stability Management (TSM).'},
  diff: {n:'7078', name:'Differential assembly', note:'Front/rear differential assembly.'},
  chassis: {n:'7022', name:'Monocoque chassis', note:'Main chassis tub.'},
  pushrod: {n:'7118', name:'Push rods', note:'Composite push rods used front and rear. Aluminum upgrade: 7118X.'},
  rocker: {n:'7158', name:'Progressive-2 rocker arms', note:'Rocker-arm set for the inboard suspension.'},
  toeLink: {n:'7138', name:'Toe links', note:'Composite front/rear toe links. Aluminum upgrade: 7138X.'},
  pivotBall: {n:'7033', name:'Pivot balls & caps', note:'Pivot balls and caps at the axle carriers.'},
  frontBulkhead: {n:'7030X', name:'Front bulkhead', note:'Left/right front bulkhead halves.'},
  rearBulkhead: {n:'7029X', name:'Rear bulkhead', note:'Left/right rear bulkhead halves.'},
  suspensionPins: {n:'7021', name:'Suspension pin set', note:'Front/rear suspension pins.'},
  skidplate: {n:'7037', name:'Skidplate / servo guard set', note:'Front, rear and transmission skidplates plus steering-servo guards.'},
  wing: {n:'7122', name:'Rear wing', note:'Black 1/16 E-Revo rear wing.'}
};

const HOTSPOTS = {
  // Coordinates are calibrated per source image. Keep markers only where the part is actually visible.
  body: [
    ['body',50,43], ['bumper',68,59], ['frontArms',58,64], ['carrier',81,57], ['rearArms',30,50]
  ],
  front: [
    ['bumper',50,58], ['frontArms',35,61], ['frontArms',65,61], ['carrier',29,56], ['carrier',71,56]
  ],
  side: [['body',50,46]],
  rear: [
    ['body',55,45], ['bumper',18,56], ['rearArms',30,56]
  ],
  chassis: [
    ['motor',50,40], ['esc',36,48], ['servo',53,55], ['chassis',48,54], ['shock',64,54],
    ['frontArms',68,62], ['rearArms',32,42], ['diff',66,56]
  ],
  top: [
    ['bumper',8,52], ['frontArms',19,37], ['frontArms',19,63], ['servo',27,41], ['shock',36,46], ['shock',36,54], ['esc',48,42],
    ['motor',52,47], ['chassis',50,55], ['receiver',52,60], ['shock',67,46], ['shock',67,54], ['rearArms',78,37], ['rearArms',78,63], ['wing',90,52]
  ],
  bottom: [
    ['bumper',6,50], ['frontArms',24,35], ['frontArms',24,65], ['servo',31,50], ['skidplate',50,50],
    ['chassis',50,43], ['rearArms',76,35], ['rearArms',76,65]
  ]
};

const VIEWS = [
  {id:'body', label:'3D / ¾'}, {id:'front', label:'Front'}, {id:'side', label:'Side'},
  {id:'rear', label:'Rear 3D'}, {id:'chassis', label:'Chassis 3D'}, {id:'top', label:'Top'}, {id:'bottom', label:'Bottom'},
  {id:'xChassis', label:'EXP Chassis', exploded:'chassis'},
  {id:'xFront', label:'EXP Front', exploded:'front'},
  {id:'xRear', label:'EXP Rear', exploded:'rear'},
  {id:'xDrive', label:'EXP Drive', exploded:'driveshaft'},
  {id:'xTransmission', label:'EXP Trans', exploded:'transmission'}
];

const fallbackFleet = {
  cars:[
    {id:'blue',name:'Blue',accent:'#1667d9',status:'ready',issues:[],upgrades:[]},
    {id:'red',name:'Red',accent:'#d51f2f',status:'ready',issues:[],upgrades:[]},
    {id:'violet',name:'Violet',accent:'#7047d7',status:'ready',issues:[],upgrades:[]}
  ],
  shared:{spares:[],gear:{batteries:[],transmitters:[],chargers:[],other:[]}}
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
let fleet = fallbackFleet;
let workflows = [];
let exploded = {views:{}};
let backendAvailable = false;
let carId = 'blue';
let topMode = 'car';
let view = 'body';

function currentCar(){ return fleet.cars.find(c=>c.id===carId) || fleet.cars[0]; }
function esc(s=''){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function sharedGarage(){ return fleet.shared || {spares:[],gear:{batteries:[],transmitters:[],chargers:[],other:[]}}; }
function countGear(){ return Object.values(sharedGarage().gear||{}).reduce((n,a)=>n+(Array.isArray(a)?a.filter(x=>!x.archived).reduce((s,x)=>s+Number(x.qty||1),0):0),0); }
function stockFor(partNo){
  return (sharedGarage().spares||[]).filter(x=>!x.archived && String(x.part||x.number||'')===String(partNo)).reduce((n,x)=>n+Number(x.qty||1),0);
}

function issuesForPart(car,key,part){
  return (car.issues||[]).filter(x=>!x.archived && (x.component===key || (x.part && String(x.part)===String(part?.n))));
}
function bestViewForComponent(key){
  const preferred={frontArms:'xFront',rearArms:'xRear',pushrod:'xFront',rocker:'xFront',toeLink:'xRear',pivotBall:'xFront',frontBulkhead:'xFront',rearBulkhead:'xRear',suspensionPins:'xFront',driveshaft:'xDrive',diff:'xTransmission'};
  if(preferred[key]) return preferred[key];
  return VIEWS.find(v=>(HOTSPOTS[v.id]||[]).some(([partKey])=>partKey===key))?.id || 'chassis';
}
function viewDef(id=view){ return VIEWS.find(v=>v.id===id); }
function explodedDef(id=view){ const v=viewDef(id); return v?.exploded ? exploded.views?.[v.exploded] : null; }
function syncHotspotFrame(){
  const img=$('#carImage'), stage=$('#imageStage'), layer=$('#hotspots');
  if(!img || !stage || !layer || !img.complete) return;
  const r=img.getBoundingClientRect(), sr=stage.getBoundingClientRect();
  layer.style.left=`${r.left-sr.left}px`; layer.style.top=`${r.top-sr.top}px`;
  layer.style.width=`${r.width}px`; layer.style.height=`${r.height}px`;
  layer.style.right='auto'; layer.style.bottom='auto';
}
function planetLink(n){ return `https://planet-rc.ch/search?sSearch=${encodeURIComponent(n)}`; }

async function loadFleet(){
  try{
    const [workflowRes, explodedRes] = await Promise.all([
      fetch(`data/workflows.json?v=${Date.now()}`,{cache:'no-store'}),
      fetch(`data/exploded.json?v=${Date.now()}`,{cache:'no-store'})
    ]);
    if(workflowRes.ok) workflows = (await workflowRes.json()).workflows || [];
    if(explodedRes.ok) exploded = await explodedRes.json();
    try{
      const apiRes=await fetch(`api/fleet?v=${Date.now()}`,{cache:'no-store'});
      if(apiRes.ok && (apiRes.headers.get('content-type')||'').includes('application/json')){fleet=await apiRes.json();backendAvailable=true;}
    }catch(_e){}
    if(!backendAvailable){const fleetRes=await fetch(`data/fleet.json?v=${Date.now()}`,{cache:'no-store'});if(fleetRes.ok) fleet=await fleetRes.json();}
    if(backendAvailable){ fleet.shared=fleet.shared||{}; if(Array.isArray(fleet.shared.workflows)) workflows=fleet.shared.workflows; else { fleet.shared.workflows=workflows; fetch('api/fleet',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(fleet)}).catch(()=>{}); } }
  }catch(e){ console.warn('Using fallback data',e); }
  render();
}

function render(){
  const car=currentCar(), shared=sharedGarage(), isShared=topMode==='shared';
  document.documentElement.style.setProperty('--accent',isShared?'#111214':(car.accent||'#1667d9'));
  $('#carSwitch').innerHTML=fleet.cars.map((c,i)=>`<button class="car-pill ${!isShared&&c.id===carId?'active':''}" data-car="${c.id}" style="--pill-accent:${c.accent}"><i></i>${String(i+1).padStart(2,'0')} ${esc(c.name)}${(c.issues||[]).some(x=>!x.archived)?'<span class="attention-dot" aria-label="Open issue"></span>':''}</button>`).join('')+
    `<button class="car-pill garage-pill ${isShared?'active':''}" data-shared-home style="--pill-accent:#111214"><i></i>04 Garage</button>`;

  $('.car-heading').hidden=isShared;
  $('#vehicleViewer').hidden=isShared;
  $('#sharedHub').hidden=!isShared;
  $('#dock').hidden=isShared;

  const spares=shared.spares||[], gear=shared.gear||{};
  $('#sharedSpareCount').textContent=`${spares.filter(x=>!x.archived).reduce((n,x)=>n+Number(x.qty||1),0)} parts`;
  $('#batteryCount').textContent=`${(gear.batteries||[]).filter(x=>!x.archived).reduce((n,x)=>n+Number(x.qty||1),0)} packs`;
  $('#chargerCount').textContent=`${(gear.chargers||[]).filter(x=>!x.archived).reduce((n,x)=>n+Number(x.qty||1),0)} units`;
  $('#sharedGearCount').textContent=`${countGear()} items`;
  $('#sharedWorkflowCount').textContent=`${workflows.length} procedures`;
  if(isShared) return;

  $('#carName').textContent=car.name;
  $('#carIndex').textContent=String(fleet.cars.findIndex(c=>c.id===carId)+1).padStart(2,'0');
  const openIssues=(car.issues||[]).filter(x=>!x.archived);
  const hasIssues=openIssues.length>0;
  $('#carStatus').className=`status-line ${hasIssues?'attention':''}`;
  $('#carStatus').innerHTML=`<span class="status-dot"></span><span>${hasIssues?`${openIssues.length} open issue${openIssues.length===1?'':'s'}`:'Ready'}</span>`;
  $('#issueCount').textContent=openIssues.length;
  $('#upgradeCount').textContent=(car.upgrades||[]).filter(x=>!x.archived).length;
  $('#serviceCount').textContent=(car.serviceHistory||[]).filter(x=>!x.archived).length;
  document.querySelector('[data-panel="issues"]').classList.toggle('has-items',hasIssues);
  $('#viewSwitch').innerHTML=VIEWS.map(v=>{
    const exp=v.exploded ? exploded.views?.[v.exploded] : null;
    const thumb=exp?.image || (v.id==='body'?IMG.body[carId]:IMG[v.id]);
    const filter=exp?'none':((['front','side','rear'].includes(v.id) || (v.id==='body' && carId==='red'))?REFERENCE_FILTER[carId]:'none');
    return `<button class="view-btn ${v.id===view?'active':''} ${exp?'exploded-tab':''}" data-view="${v.id}"><img src="${thumb}" alt="" style="filter:${filter}"><span>${v.label}</span></button>`;
  }).join('');
  renderImage();
}
function renderImage(){
  const img=$('#carImage'), stage=$('#imageStage'), exp=explodedDef();
  stage.classList.add('loading');
  stage.classList.toggle('technical-view',!!exp);
  stage.classList.toggle('exploded-view',!!exp);
  const src=exp?.image || (view==='body'?IMG.body[carId]:IMG[view]);
  img.style.filter=exp?'none':((['front','side','rear'].includes(view) || (view==='body' && carId==='red'))?REFERENCE_FILTER[carId]:'none');
  img.onload=()=>{ stage.classList.remove('loading'); syncHotspotFrame(); };
  img.onerror=()=>stage.classList.remove('loading');
  img.src=src;
  img.alt=exp?`Traxxas 1/16 E-Revo VXL — ${exp.label} exploded view`:`${currentCar().name} Traxxas 1/16 E-Revo — ${view} view`;
  const car=currentCar();
  if(exp){
    $('#hotspots').innerHTML=(exp.hotspots||[]).map((spot,i)=>{
      const left=spot.x/exp.width*100, top=spot.y/exp.height*100, w=spot.w/exp.width*100, h=spot.h/exp.height*100;
      const issue=(car.issues||[]).some(x=>!x.archived && x.part && String(x.part)===String(spot.part));
      return `<button class="exploded-hit ${issue?'issue-exploded':''}" data-exp-index="${i}" style="left:${left}%;top:${top}%;width:${w}%;height:${h}%" aria-label="Part ${esc(spot.part)} ${esc(spot.title)}"><span>${esc(spot.part)}</span></button>`;
    }).join('');
  } else {
    $('#hotspots').innerHTML=(HOTSPOTS[view]||[]).map(([key,x,y])=>{
      const p=PARTS[key], partIssues=issuesForPart(car,key,p), hasIssue=partIssues.length>0;
      return `<button class="hotspot ${hasIssue?'issue-hotspot':''}" data-part="${key}" style="left:${x}%;top:${y}%" aria-label="${esc(p.name)}${hasIssue?' — open issue':''}"><span class="hotspot-dot"></span>${hasIssue?'<span class="issue-badge">!</span>':''}<span class="hotspot-label">${esc(p.name)}${hasIssue?' · issue':''}</span></button>`;
    }).join('');
  }
  requestAnimationFrame(syncHotspotFrame);
}
function openDrawer(title, eyebrow, html){
  $('#drawerTitle').textContent=title;
  $('#drawerEyebrow').textContent=eyebrow;
  $('#drawerBody').innerHTML=html;
  $('#scrim').hidden=false;
  requestAnimationFrame(()=>$('#scrim').classList.add('show'));
  $('#drawer').classList.add('open');
  $('#drawer').setAttribute('aria-hidden','false');
}

function openImagePopup(src,alt='Garage image'){
  let box=document.querySelector('#imageLightbox');
  if(!box){
    box=document.createElement('div');
    box.id='imageLightbox';
    box.className='image-lightbox';
    box.innerHTML='<button class="image-lightbox-close" type="button" aria-label="Close image">×</button><img alt="">';
    document.body.appendChild(box);
    box.addEventListener('click',e=>{if(e.target===box || e.target.closest('.image-lightbox-close')) closeImagePopup();});
  }
  const img=box.querySelector('img'); img.src=src; img.alt=alt;
  box.classList.add('open'); document.body.classList.add('lightbox-open');
}
function closeImagePopup(){
  const box=document.querySelector('#imageLightbox'); if(!box) return;
  box.classList.remove('open'); document.body.classList.remove('lightbox-open');
}

function closeDrawer(){
  $('#drawer').classList.remove('open'); $('#drawer').setAttribute('aria-hidden','true');
  $('#scrim').classList.remove('show'); setTimeout(()=>$('#scrim').hidden=true,250);
}

async function persistFleet(){
  if(!backendAvailable) return false;
  const res=await fetch('api/fleet',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(fleet)});
  if(!res.ok) throw new Error(`Save failed (${res.status})`);
  render(); return true;
}
function scopeArray(scope){
  const c=currentCar(), g=sharedGarage().gear||{};
  if(scope==='issues') return c.issues||(c.issues=[]);
  if(scope==='upgrades') return c.upgrades||(c.upgrades=[]);
  if(scope==='service') return c.serviceHistory||(c.serviceHistory=[]);
  if(scope==='spares') return sharedGarage().spares||(fleet.shared.spares=[]);
  if(scope==='workflows') return fleet.shared.workflows||(fleet.shared.workflows=workflows);
  if(scope.startsWith('gear:')){ const k=scope.split(':')[1]; return g[k]||(g[k]=[]); }
  return [];
}
function crudButtons(scope,index,archived=false){
  if(!backendAvailable) return '';
  return `<div class="crud-tools">${archived?`<button data-crud="restore" data-scope="${esc(scope)}" data-index="${index}" title="Restore">↶</button>`:`<button data-crud="edit" data-scope="${esc(scope)}" data-index="${index}" title="Edit">✎</button><button data-crud="archive" data-scope="${esc(scope)}" data-index="${index}" title="Archive">⌄</button>`}<button data-crud="delete" data-scope="${esc(scope)}" data-index="${index}" title="Delete permanently">×</button></div>`;
}
function managerBar(scope,label='item'){
  if(!backendAvailable) return '';
  const arr=scopeArray(scope), n=arr.filter(x=>x.archived).length;
  return `<div class="manager-bar"><button class="action" data-crud="add" data-scope="${esc(scope)}">+ Add ${esc(label)}</button>${n?`<button class="action" data-crud="bin" data-scope="${esc(scope)}">Archive · ${n}</button>`:''}</div>`;
}
function itemRows(items, kind, scope=''){
  if(!items?.some(x=>!x.archived)) return `<div class="empty">Nothing recorded yet.</div>`;
  return `<div class="list">${items.map((x,i)=>{
    if(x.archived) return '';
    const photos=(x.images||[]).map(src=>`<button class="stock-photo" type="button" data-lightbox-src="${esc(src)}" aria-label="Open image"><img src="${esc(src)}" alt="${esc(x.name||x.part||kind)}"></button>`).join('');
    const part=x.part?`<span class="stock-part">${esc(x.part)}</span>`:'';
    return `<div class="list-row stock-row">${photos?`<div class="stock-photos">${photos}</div>`:'<div class="stock-photo-placeholder"></div>'}<div class="stock-copy"><strong>${esc(x.name||x.part||x.title||kind)}</strong><p>${part}${part&&x.note?' · ':''}${esc(x.note||x.details||'')}</p>${x.needsConfirmation?'<small class="stock-confirm">TO CONFIRM</small>':''}</div>${x.qty?`<div class="qty">×${esc(x.qty)}</div>`:''}${scope?crudButtons(scope,i):''}</div>`;
  }).join('')}</div>`;
}
function reopenScope(scope){
  if(scope==='issues') return panelIssues(); if(scope==='upgrades') return panelUpgrades(); if(scope==='service') return panelService(); if(scope==='spares') return panelSpares();
  if(scope.startsWith('gear:')) return panelGear(scope.split(':')[1]); if(scope==='workflows') return panelWorkflows();
}
function editFields(scope,x={}){
  const name=prompt('Name',x.name||x.partName||x.title||''); if(name===null) return null;
  const out={...x};
  if(scope==='service') out.partName=name; else if(scope==='workflows') out.title=name; else out.name=name;
  if(scope==='workflows'){ const cat=prompt('Category',x.category||'Procedure'); if(cat===null)return null; out.category=cat; const summary=prompt('Summary',x.summary||''); if(summary===null)return null; out.summary=summary; out.id=out.id||('workflow-'+Date.now()); out.steps=out.steps||[]; return out; }
  if(['spares','service'].includes(scope)){ const part=prompt('Part number',x.part||''); if(part===null)return null; out.part=part.trim(); }
  if(scope==='spares'||scope.startsWith('gear:')){ const q=prompt('Quantity',String(x.qty||1)); if(q===null)return null; out.qty=Math.max(1,Number(q)||1); }
  if(scope==='issues'||scope==='upgrades'){ const d=prompt('Details / note',x.details||x.note||''); if(d===null)return null; out.details=d; }
  if(scope==='service'){ const d=prompt('Date (YYYY-MM-DD)',x.date||new Date().toISOString().slice(0,10)); if(d===null)return null; out.date=d; }
  return out;
}
async function handleCrud(action,scope,index){
  const arr=scopeArray(scope); let i=Number(index);
  if(action==='add'){ const x=editFields(scope,{}); if(!x)return; if(scope==='issues'){x.status='open';x.reported=new Date().toISOString().slice(0,10);} arr.push(x); }
  else if(action==='edit'){ const x=editFields(scope,arr[i]); if(!x)return; arr[i]=x; }
  else if(action==='archive'){ arr[i].archived=true; arr[i].archivedAt=new Date().toISOString(); }
  else if(action==='restore'){ delete arr[i].archived; delete arr[i].archivedAt; }
  else if(action==='delete'){ if(!confirm('Delete permanently?'))return; arr.splice(i,1); }
  await persistFleet(); reopenScope(scope);
}
function panelArchive(scope){
  const arr=scopeArray(scope), rows=arr.map((x,i)=>x.archived?`<div class="archive-row"><div><strong>${esc(x.name||x.partName||x.title||x.part||'Item')}</strong><small>${esc(x.part||x.date||'')}</small></div>${crudButtons(scope,i,true)}</div>`:'').join('');
  openDrawer('Archive','Bin · archived items',rows||'<div class="empty">Archive is empty.</div>');
}


function quickSpareForm(){
  if(!backendAvailable) return `<div class="source-note">Photo upload is available on the BlackBerg version of the garage.</div>`;
  return `<form id="quickSpareForm" class="quick-spare-form"><div class="quick-spare-fields"><input name="part" placeholder="Part no. (optional)" autocomplete="off"><input name="name" placeholder="Name (optional)" autocomplete="off"></div><label class="photo-picker"><input name="photo" type="file" accept="image/*" capture="environment" required><span>Take / choose photo</span></label><button class="action primary" type="submit">Add to stock</button><div id="spareUploadStatus" class="source-note">One photo = one stock item. Leave part number blank to confirm it later.</div></form>`;
}
function resizePhoto(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onerror=reject;r.onload=()=>{const img=new Image();img.onerror=reject;img.onload=()=>{const max=1400,scale=Math.min(1,max/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);const ctx=c.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(img,0,0,c.width,c.height);resolve(c.toDataURL('image/jpeg',.82));};img.src=r.result;};r.readAsDataURL(file);});}
async function saveQuickSpare(form){
  const status=form.querySelector('#spareUploadStatus'),file=form.elements.photo.files?.[0];if(!file)return;status.textContent='Saving photo…';
  try{const imageDataUrl=await resizePhoto(file);const rawPart=form.elements.part.value.trim();const payload={part:rawPart||'?',name:form.elements.name.value.trim(),qty:1,needsConfirmation:!rawPart,originalName:file.name,imageDataUrl};const res=await fetch('api/spares',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!res.ok)throw new Error((await res.json().catch(()=>({}))).error||`HTTP ${res.status}`);const out=await res.json();fleet=out.fleet;render();panelSpares();}catch(err){status.textContent=`Could not save: ${err.message}`;}
}

function panelIssues(){
  const car=currentCar(), items=car.issues||[];
  const active=items.map((x,i)=>[x,i]).filter(([x])=>!x.archived);
  const body=active.length?`<div class="issue-list">${active.map(([x,i])=>`<div class="issue-row-wrap"><button class="issue-row" ${x.component?`data-show-component="${esc(x.component)}"`:''}><div><span class="issue-state">OPEN</span><strong>${esc(x.name||'Issue')}</strong><p>${esc(x.details||x.note||'')}</p><small>${esc(x.area||'Maintenance')}${x.reported?` · ${esc(x.reported)}`:''}</small></div>${x.component?'<span class="locate">Show on car →</span>':''}</button>${crudButtons('issues',i)}</div>`).join('')}</div>`:`<div class="clean-state"><span class="clean-check">✓</span><div>No open damage recorded.</div></div>`;
  openDrawer('Issues',`${car.name} · maintenance`,`${managerBar('issues','issue')}${body}`);
}
function panelSpares(){
  const shared=sharedGarage();
  openDrawer('Spares','Shared garage · inventory',`${managerBar('spares','spare')}<div class="drawer-section"><h3>Quick add from photo</h3>${quickSpareForm()}</div><div class="drawer-section"><h3>Stock</h3>${itemRows(shared.spares,'Spare part','spares')}</div>`);
}
function panelService(){
  const c=currentCar(), items=c.serviceHistory||[], active=items.map((x,i)=>[x,i]).filter(([x])=>!x.archived).sort((a,b)=>String(b[0].date||'').localeCompare(String(a[0].date||'')));
  const body=active.length?`<div class="service-table-wrap"><table class="service-table"><thead><tr><th>Date</th><th>Part No.</th><th>Part name</th><th></th></tr></thead><tbody>${active.map(([x,i])=>`<tr><td>${esc(x.date||'—')}</td><td>${esc(x.part||'—')}${x.needsConfirmation?' ?':''}</td><td>${esc(x.partName||x.title||'Service')}</td><td>${crudButtons('service',i)}</td></tr>`).join('')}</tbody></table></div>`:`<div class="empty">No completed maintenance recorded for this car yet.</div>`;
  openDrawer('Service history',`${c.name} · completed work`,`${managerBar('service','service')} ${body}`);
}
function panelUpgrades(){ const c=currentCar(); openDrawer('Upgrades',`${c.name} · setup`,`${managerBar('upgrades','upgrade')}${itemRows(c.upgrades,'Upgrade','upgrades')}`); }
function panelGear(filterKey=null){
  const g=sharedGarage().gear||{};
  const keys=filterKey?[filterKey]:['batteries','transmitters','chargers','other'];
  const sections=keys.map(k=>`<div class="drawer-section"><h3>${k}</h3>${managerBar(`gear:${k}`,k.slice(0,-1)||'item')}${itemRows(g[k],k,`gear:${k}`)}</div>`).join('');
  const title=filterKey?filterKey.charAt(0).toUpperCase()+filterKey.slice(1):'Radio & gear';
  openDrawer(title,'Shared garage',sections);
}
function panelPart(key){
  const car=currentCar(), p=PARTS[key], qty=stockFor(p.n), partIssues=issuesForPart(car,key,p);
  const issueHtml=partIssues.length?`<div class="component-issues">${partIssues.map(x=>`<div class="component-issue"><span>OPEN ISSUE</span><strong>${esc(x.name||'Issue')}</strong><p>${esc(x.details||x.note||'')}</p></div>`).join('')}</div>`:'';
  openDrawer(p.name,`${car.name} · part`,`
    <div class="drawer-section"><div class="part-number">TRAXXAS ${esc(p.n)}</div><h3 class="part-title">${esc(p.name)}</h3><p class="empty">${esc(p.note)}</p><div class="part-meta"><span class="tag ${qty?'good':''}">${qty?`${qty} in shared stock`:'No shared spare recorded'}</span>${p.common?'<span class="tag wear">Frequent breakage</span>':''}${partIssues.length?'<span class="tag bad">Open issue</span>':''}</div>${issueHtml}<div class="drawer-actions"><a class="action primary" href="${planetLink(p.n)}" target="_blank" rel="noopener">Find at Planet‑RC</a><a class="action" href="https://www.astramodel.cz/manualy/7/71076-3_parts.pdf" target="_blank" rel="noopener">71076‑3 parts PDF</a></div></div>
    <div class="drawer-section"><h3>ChatGPT command</h3><div class="chat-command">“${esc(car.name)} car: ${esc(p.name)} (${esc(p.n)}) is broken.”</div></div>`);
}

function panelExplodedPart(index){
  const exp=explodedDef(); if(!exp) return;
  const spot=exp.hotspots?.[Number(index)]; if(!spot) return;
  const car=currentCar(), qty=stockFor(spot.part);
  const issues=(car.issues||[]).filter(x=>!x.archived && x.part && String(x.part)===String(spot.part));
  const issueHtml=issues.length?`<div class="component-issues">${issues.map(x=>`<div class="component-issue"><span>OPEN ISSUE</span><strong>${esc(x.name||'Issue')}</strong><p>${esc(x.details||x.note||'')}</p></div>`).join('')}</div>`:'';
  openDrawer(`Part ${spot.part}`,`${exp.label} exploded view`,`
    <div class="drawer-section"><div class="part-number">TRAXXAS ${esc(spot.part)}</div><h3 class="part-title">${esc(spot.title||`Part ${spot.part}`)}</h3><div class="part-meta"><span class="tag ${qty?'good':''}">${qty?`${qty} in shared stock`:'No shared spare recorded'}</span>${issues.length?'<span class="tag bad">Open issue</span>':''}</div>${issueHtml}<div class="drawer-actions"><a class="action primary" href="${planetLink(spot.part)}" target="_blank" rel="noopener">Find at Planet‑RC</a><a class="action" href="${esc(spot.href)}" target="_blank" rel="noopener">Part reference</a><a class="action" href="${esc(exp.source)}" target="_blank" rel="noopener">Full exploded view</a></div></div>
    <div class="drawer-section"><h3>ChatGPT command</h3><div class="chat-command">“${esc(car.name)} car: part ${esc(spot.part)} is broken.”</div></div>`);
}

function panelWorkflows(){
  const active=workflows.map((w,i)=>[w,i]).filter(([w])=>!w.archived);
  if(!active.length){ openDrawer('Workflows','garage procedures',`${managerBar('workflows','workflow')}<div class="empty">No workflows loaded.</div>`); return; }
  const rows=active.map(([w,i])=>`<div class="workflow-row-wrap"><button class="workflow-row" data-workflow="${esc(w.id)}"><div><span>${esc(w.category||'Procedure')}</span><strong>${esc(w.title)}</strong><p>${esc(w.summary||'')}</p></div><b>→</b></button>${crudButtons('workflows',i)}</div>`).join('');
  openDrawer('Workflows','garage procedures',`${managerBar('workflows','workflow')}<div class="workflow-list">${rows}</div>`);
}
function openWorkflow(id){
  const w=workflows.find(x=>x.id===id); if(!w) return;
  const steps=(w.steps||[]).map((step,i)=>`<div class="workflow-step"><i>${i+1}</i><div>${esc(step)}</div></div>`).join('');
  const warning=w.warning?`<div class="workflow-warning"><strong>Important</strong><p>${esc(w.warning)}</p></div>`:'';
  const result=w.result?`<div class="workflow-result"><span>Expected result</span><strong>${esc(w.result)}</strong></div>`:'';
  const source=w.source?`<div class="drawer-actions"><a class="action" href="${esc(w.source)}" target="_blank" rel="noopener">Open Traxxas manual</a></div>`:'';
  openDrawer(w.title,`${w.category||'Procedure'} · ${w.scope||'1/16 E-Revo'}`,`${warning}<div class="workflow-steps">${steps}</div>${result}${source}`);
}


document.addEventListener('submit',e=>{const form=e.target.closest('#quickSpareForm');if(form){e.preventDefault();saveQuickSpare(form);}});

document.addEventListener('click',e=>{
  const photo=e.target.closest('[data-lightbox-src]'); if(photo){e.preventDefault();openImagePopup(photo.dataset.lightboxSrc,photo.querySelector('img')?.alt||'Garage image');return;}
  if(e.target.id==='carImage'){openImagePopup(e.target.src,e.target.alt||'Vehicle image');return;}
  const car=e.target.closest('[data-car]'); if(car){topMode='car';carId=car.dataset.car;view='body';render();closeDrawer();return;}
  const sharedHome=e.target.closest('[data-shared-home]'); if(sharedHome){topMode='shared';render();closeDrawer();return;}
  const sharedGear=e.target.closest('[data-shared-gear]'); if(sharedGear){panelGear(sharedGear.dataset.sharedGear);return;}
  const crud=e.target.closest('[data-crud]'); if(crud){const a=crud.dataset.crud,s=crud.dataset.scope;if(a==='bin')panelArchive(s);else handleCrud(a,s,crud.dataset.index).catch(err=>alert(err.message));return;}
  const locate=e.target.closest('[data-show-component]'); if(locate){const key=locate.dataset.showComponent;view=bestViewForComponent(key);render();closeDrawer();setTimeout(()=>panelPart(key),280);return;}
  const wf=e.target.closest('[data-workflow]'); if(wf){openWorkflow(wf.dataset.workflow);return;}
  const expHit=e.target.closest('[data-exp-index]'); if(expHit){panelExplodedPart(expHit.dataset.expIndex);return;}
  const v=e.target.closest('[data-view]'); if(v){view=v.dataset.view;render();return;}
  const h=e.target.closest('[data-part]'); if(h){panelPart(h.dataset.part);return;}
  const p=e.target.closest('[data-panel]'); if(p){({issues:panelIssues,spares:panelSpares,upgrades:panelUpgrades,service:panelService,gear:()=>panelGear(),workflows:panelWorkflows})[p.dataset.panel]?.();return;}
});
$('#closeDrawer').addEventListener('click',closeDrawer);
$('#scrim').addEventListener('click',closeDrawer);
document.addEventListener('keydown',e=>{ if(e.key==='Escape'){closeImagePopup();closeDrawer();} });
window.addEventListener('resize',syncHotspotFrame,{passive:true});
loadFleet();
