const STORAGE_KEY = 'erevo-fleet-v1';

const seed = {
  selectedCar: 'blue',
  cars: [
    { id:'blue', name:'Blue E‑Revo', color:'#1967e8', model:'71054-8', note:'Car 01', upgrades:[] },
    { id:'red', name:'Red E‑Revo', color:'#df3d3d', model:'71054-8', note:'Car 02', upgrades:[] },
    { id:'violet', name:'Violet E‑Revo', color:'#7c4bc4', model:'71054-8', note:'Car 03', upgrades:[] }
  ],
  parts: [
    {no:'7131',name:'Front suspension arm set',group:'Suspension',stock:0,price:'',desc:'Front upper and lower suspension arms, left and right.'},
    {no:'7132',name:'Rear suspension arm set',group:'Suspension',stock:0,price:'',desc:'Rear upper and lower suspension arms, left and right.'},
    {no:'7034',name:'Axle carriers',group:'Suspension',stock:0,price:'',desc:'Left and right axle carriers; common impact-area spare.'},
    {no:'7151',name:'Driveshaft assembly',group:'Driveline',stock:0,price:'',desc:'Complete left/right driveshaft assembly, ready to install.'},
    {no:'7078',name:'Differential assembly',group:'Driveline',stock:0,price:'',desc:'Complete differential assembly for front or rear.'},
    {no:'7043',name:'Steering / servo-saver assembly',group:'Steering',stock:0,price:'',desc:'Steering arm, link, horn, servo saver and related hardware.'},
    {no:'2080',name:'Micro steering servo',group:'Electronics',stock:0,price:'',desc:'Micro-format steering servo used on Traxxas 1/16 models.'},
    {no:'3024R',name:'XL‑2.5 ESC',group:'Electronics',stock:0,price:'',desc:'Waterproof electronic speed control with low-voltage detection.'},
    {no:'3975',name:'Titan 550 12T motor',group:'Power',stock:0,price:'',desc:'Brushed Titan 550-size 12-turn motor.'},
    {no:'7061',name:'GTR composite shocks',group:'Suspension',stock:0,price:'',desc:'Pair of assembled GTR composite shocks, without springs.'},
    {no:'7152',name:'Slipper clutch',group:'Driveline',stock:0,price:'',desc:'Complete slipper clutch assembly.'},
    {no:'7095',name:'Transmission, complete',group:'Driveline',stock:0,price:'',desc:'Complete transmission for 1/16-scale brushed models.'},
    {no:'7022',name:'Chassis',group:'Chassis',stock:0,price:'',desc:'Main 1/16 chassis.'},
    {no:'7030X',name:'Front bulkhead',group:'Chassis',stock:0,price:'',desc:'Front bulkhead left and right halves with hardware.'},
    {no:'7029X',name:'Rear bulkhead',group:'Chassis',stock:0,price:'',desc:'Rear bulkhead left and right halves with hardware.'},
    {no:'7174A',name:'Talon tyres & wheels',group:'Wheels',stock:0,price:'',desc:'Assembled glued Talon tyres on Gemini wheels, pair.'},
    {no:'1834',name:'Body clips',group:'Body',stock:0,price:'',desc:'Standard-size body clips, pack of 12.'},
    {no:'battery',name:'Battery pack',group:'Power',stock:0,price:'',desc:'Track your actual battery packs in Batteries & radio below.'}
  ],
  maintenance: [],
  accessories: []
};

let state = loadState();
let currentView = 'body';
let selectedPart = null;

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const car = () => state.cars.find(c => c.id === state.selectedCar) || state.cars[0];
const part = (no) => state.parts.find(p => p.no === no);
const openIssues = (carId=state.selectedCar) => state.maintenance.filter(x => x.carId === carId && x.status !== 'done');

function clone(v){ return JSON.parse(JSON.stringify(v)); }
function loadState(){
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return clone(seed);
    const merged = clone(seed);
    merged.selectedCar = saved.selectedCar || merged.selectedCar;
    merged.cars = merged.cars.map(base => ({...base,...(saved.cars||[]).find(c=>c.id===base.id)}));
    merged.parts = merged.parts.map(base => ({...base,...(saved.parts||[]).find(p=>p.no===base.no)}));
    merged.maintenance = saved.maintenance || [];
    merged.accessories = saved.accessories || [];
    return merged;
  } catch { return clone(seed); }
}
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function esc(v=''){ return String(v).replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function shopUrl(no){ return `https://www.rcplanet.ch/search?q=${encodeURIComponent(no)}`; }
function officialUrl(){ return 'https://traxxas.com/media/productattach/C-71054-8/3/71054-8_parts.pdf'; }
function money(v){ return v === '' || v == null ? '—' : `CHF ${Number(v).toFixed(2)}`; }
function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }

function render(){
  renderCarSwitcher(); renderHero(); renderMaintenance(); renderStock(); renderAccessories(); renderParts(); renderUpgrades();
  if(selectedPart) renderPartDetail(selectedPart);
}

function renderCarSwitcher(){
  $('#carSwitcher').innerHTML = state.cars.map(c => {
    const issues = openIssues(c.id).length;
    return `<button class="car-pill ${c.id===state.selectedCar?'active':''} ${issues?'has-issue':''}" data-car="${c.id}">
      <span class="color-chip" style="background:${c.color}"></span><span><strong>${esc(c.name)}</strong><span>${esc(c.note)} · ${issues?`${issues} open`:'ready'}</span></span><i class="health"></i>
    </button>`;
  }).join('');
  $$('.car-pill').forEach(b=>b.onclick=()=>{state.selectedCar=b.dataset.car;selectedPart=null;save();render();});
}

function renderHero(){
  const c=car(), issues=openIssues();
  $('#carTitle').textContent=c.name; $('#carSubtitle').textContent=`Model ${c.model}`;
  $('#carSvg').style.setProperty('--car-color',c.color);
  $('#conditionText').textContent=issues.length?'Needs attention':'Ready';
  $('#repairCount').textContent=issues.length; $('#upgradeCount').textContent=c.upgrades.length;
  $('#statusDot').style.background=issues.length?'var(--danger)':'var(--good)';
  $('#carSvg').className=`car-svg view-${currentView}`;
}

$('#viewToggle').addEventListener('click',e=>{
  const b=e.target.closest('button[data-view]'); if(!b)return;
  currentView=b.dataset.view; $$('#viewToggle button').forEach(x=>x.classList.toggle('active',x===b)); renderHero();
});

$$('.assembly[data-part]').forEach(g=>g.addEventListener('click',()=>selectPart(g.dataset.part)));
function selectPart(no){
  selectedPart=no; $$('.assembly').forEach(x=>x.classList.toggle('selected',x.dataset.part===no)); renderPartDetail(no);
  if(innerWidth<1050) $('#partDetail').scrollIntoView({behavior:'smooth',block:'nearest'});
}

function renderPartDetail(no){
  const p=part(no);
  if(!p){ $('#partDetail').innerHTML=`<div class="empty-detail"><div class="part-orb">?</div><h2>Accessory</h2><p>This item is tracked separately.</p></div>`; return; }
  const issues=openIssues().filter(x=>x.partNo===no).length;
  $('#partDetail').innerHTML=`
    <div class="part-no">TRAXXAS #${esc(p.no)}</div><h2 class="part-detail-title">${esc(p.name)}</h2><p class="part-description">${esc(p.desc)}</p>
    <div class="detail-kpis"><div class="kpi"><span>In garage</span><strong>${p.stock}</strong></div><div class="kpi"><span>Shop price</span><strong>${money(p.price)}</strong></div></div>
    <div class="availability ${p.stock>0?'yes':'no'}">${p.stock>0?'✓ Spare available — you can repair now':'No spare in stock — likely needs purchase'}</div>
    <div class="field"><label>Recorded RCPlanet price (CHF)</label><input id="priceInput" type="number" step="0.05" min="0" value="${esc(p.price)}" placeholder="e.g. 12.90"></div>
    <div class="detail-actions"><button class="primary" id="breakBtn">${issues?'Add another issue':'Mark broken'}</button><a class="ghost" target="_blank" rel="noreferrer" href="${shopUrl(p.no)}">Search RCPlanet ↗</a><button class="ghost" id="stockPlus">+ Add spare</button><a class="ghost" target="_blank" rel="noreferrer" href="${officialUrl()}">Parts PDF ↗</a></div>
    <div class="detail-meta">${esc(p.group)} · price is manually recorded until live shop lookup is added.</div>`;
  $('#breakBtn').onclick=()=>addRepair(no);
  $('#stockPlus').onclick=()=>changeStock(no,1);
  $('#priceInput').onchange=e=>{p.price=e.target.value;save();renderPartDetail(no);renderParts();};
}

function renderMaintenance(){
  const items=state.maintenance.filter(x=>x.carId===state.selectedCar).sort((a,b)=>b.created.localeCompare(a.created));
  $('#maintenanceList').innerHTML=items.length?items.map(x=>{
    const p=x.partNo?part(x.partNo):null; const canFix=p&&p.stock>0;
    return `<div class="row-card"><div class="grow"><strong>${esc(x.title)}</strong><small>${esc(x.note||'')} ${p?`· #${p.no}${canFix&&x.status!=='done'?' · spare available':''}`:''}</small></div><span class="tag ${x.status}">${x.status==='done'?'fixed':'open'}</span>${x.status!=='done'?`<button class="ghost small" data-fix="${x.id}">Mark fixed</button>`:''}</div>`;
  }).join(''):`<div class="empty-row">No maintenance issues for this car.</div>`;
  $$('[data-fix]').forEach(b=>b.onclick=()=>resolveIssue(b.dataset.fix));
}
function addRepair(partNo=''){
  const p=partNo?part(partNo):null;
  state.maintenance.push({id:uid(),carId:state.selectedCar,partNo,title:p?`${p.name} damaged`:'Maintenance issue',note:p&&p.stock>0?'Spare part available in garage.':'',status:'open',created:new Date().toISOString()});
  save();render();
}
function resolveIssue(id){
  const x=state.maintenance.find(i=>i.id===id); if(!x)return;
  if(x.partNo){const p=part(x.partNo);if(p&&p.stock>0&&confirm(`Use one spare #${p.no} from stock?`))p.stock--}
  x.status='done';x.resolved=new Date().toISOString();save();render();
}

function renderStock(){
  const stocked=state.parts.filter(p=>p.stock>0); const total=state.parts.reduce((a,p)=>a+p.stock,0); $('#stockTotal').textContent=`${total} item${total===1?'':'s'}`;
  $('#stockList').innerHTML=stocked.length?stocked.map(p=>`<div class="row-card"><div class="grow"><strong>#${p.no} · ${esc(p.name)}</strong><small>${esc(p.group)} · ${money(p.price)}</small></div><div class="qty-step"><button data-stock="${p.no}" data-delta="-1">−</button><span>${p.stock}</span><button data-stock="${p.no}" data-delta="1">+</button></div></div>`).join(''):`<div class="empty-row">No spare parts recorded yet. Open a part and tap “Add spare”.</div>`;
  $$('[data-stock]').forEach(b=>b.onclick=()=>changeStock(b.dataset.stock,Number(b.dataset.delta)));
}
function changeStock(no,delta){const p=part(no);if(!p)return;p.stock=Math.max(0,p.stock+delta);save();render();}

function renderAccessories(){
  const list=state.accessories.filter(a=>!a.carId||a.carId===state.selectedCar);
  $('#accessoryList').innerHTML=list.length?list.map(a=>`<div class="row-card"><div class="accessory-icon">${a.type==='Battery'?'⚡':'RC'}</div><div class="grow"><strong>${esc(a.name)}</strong><small>${esc(a.type)} · qty ${a.qty}${a.note?` · ${esc(a.note)}`:''}</small></div><button class="ghost small" data-del-accessory="${a.id}">×</button></div>`).join(''):`<div class="empty-row">Add batteries, chargers or transmitters for this car.</div>`;
  $$('[data-del-accessory]').forEach(b=>b.onclick=()=>{state.accessories=state.accessories.filter(a=>a.id!==b.dataset.delAccessory);save();render();});
}

function renderParts(){
  const q=($('#partSearch').value||'').trim().toLowerCase(); const list=state.parts.filter(p=>!q||`${p.no} ${p.name} ${p.group}`.toLowerCase().includes(q));
  $('#partsGrid').innerHTML=list.map(p=>`<button class="part-tile" data-part-tile="${p.no}"><div class="icon">${p.no==='battery'?'⚡':p.group.slice(0,2).toUpperCase()}</div><strong>${esc(p.name)}</strong><small><i class="stock-dot ${p.stock?'in':''}"></i>#${p.no} · stock ${p.stock}</small></button>`).join('');
  $$('[data-part-tile]').forEach(b=>b.onclick=()=>selectPart(b.dataset.partTile));
}
$('#partSearch').addEventListener('input',renderParts);

function renderUpgrades(){
  const items=car().upgrades;
  $('#upgradeList').innerHTML=items.length?items.map(u=>`<div class="row-card"><div class="grow"><strong>${esc(u.name)}</strong><small>${esc(u.note||'Installed')}</small></div><button class="ghost small" data-del-upgrade="${u.id}">×</button></div>`).join(''):`<div class="empty-row">No upgrades recorded. Add aluminium parts, brushless conversion, tyres, gearing, lights, etc.</div>`;
  $$('[data-del-upgrade]').forEach(b=>b.onclick=()=>{car().upgrades=car().upgrades.filter(x=>x.id!==b.dataset.delUpgrade);save();render();});
}

const dialog=$('#quickDialog'), fields=$('#dialogFields');
function openDialog(mode){
  dialog.dataset.mode=mode;
  if(mode==='repair'){
    $('#dialogTitle').textContent='Add maintenance issue';
    fields.innerHTML=`<div class="field"><label>Part</label><select name="partNo"><option value="">General / unknown</option>${state.parts.map(p=>`<option value="${p.no}">#${p.no} · ${esc(p.name)}</option>`).join('')}</select></div><div class="field"><label>Issue</label><input required name="title" placeholder="e.g. steering feels loose"></div><div class="field"><label>Notes</label><textarea name="note" placeholder="What happened?"></textarea></div>`;
  } else if(mode==='accessory'){
    $('#dialogTitle').textContent='Add battery or radio item';
    fields.innerHTML=`<div class="field"><label>Type</label><select name="type"><option>Battery</option><option>Transmitter</option><option>Charger</option><option>Receiver</option><option>Other</option></select></div><div class="field"><label>Name</label><input required name="name" placeholder="e.g. 2S 2200 mAh LiPo"></div><div class="field"><label>Quantity</label><input name="qty" type="number" min="1" value="1"></div><div class="field"><label>Notes</label><input name="note" placeholder="ID, condition, pairing…"></div>`;
  } else {
    $('#dialogTitle').textContent='Add upgrade';
    fields.innerHTML=`<div class="field"><label>Upgrade</label><input required name="name" placeholder="e.g. aluminium push rods"></div><div class="field"><label>Notes</label><input name="note" placeholder="Brand / part number / date"></div>`;
  }
  dialog.showModal();
}
$('#newRepairBtn').onclick=()=>openDialog('repair'); $('#addAccessoryBtn').onclick=()=>openDialog('accessory'); $('#addUpgradeBtn').onclick=()=>openDialog('upgrade');
$('#quickForm').addEventListener('submit',e=>{
  e.preventDefault(); const fd=new FormData(e.currentTarget), mode=dialog.dataset.mode;
  if(mode==='repair') state.maintenance.push({id:uid(),carId:state.selectedCar,partNo:fd.get('partNo'),title:fd.get('title'),note:fd.get('note'),status:'open',created:new Date().toISOString()});
  if(mode==='accessory') state.accessories.push({id:uid(),carId:state.selectedCar,type:fd.get('type'),name:fd.get('name'),qty:Number(fd.get('qty')||1),note:fd.get('note')});
  if(mode==='upgrade') car().upgrades.push({id:uid(),name:fd.get('name'),note:fd.get('note')});
  save();dialog.close();render();
});

$('#exportBtn').onclick=()=>{
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`e-revo-fleet-${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(a.href);
};
$('#importInput').onchange=async e=>{
  const file=e.target.files[0];if(!file)return;
  try{const next=JSON.parse(await file.text()); if(!next.cars||!next.parts)throw new Error('Invalid fleet file'); state=next;save();selectedPart=null;render();}catch(err){alert(`Import failed: ${err.message}`)} e.target.value='';
};

render();