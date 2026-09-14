const IMG = {
  body: {
    blue: 'https://cdn11.bigcommerce.com/s-sdwy6qdoez/images/stencil/1280x1280/products/24615/76844/71054-8-116-E-Revo-BLUE-3qtr-low__76407.1700582770.jpg?c=2',
    red: 'https://cdn11.bigcommerce.com/s-sdwy6qdoez/images/stencil/500x659/products/24618/76868/71054-8-116-E-Revo-RED-3qtr-low__44194.1700583880.jpg?c=2',
    violet: 'https://cdn11.bigcommerce.com/s-sdwy6qdoez/images/stencil/500x659/products/24619/76883/71076-3-116-E-Revo-PURPLE-3qtr-low__11622.1700584346.jpg?c=2'
  },
  front: 'https://cdn11.bigcommerce.com/s-sdwy6qdoez/images/stencil/1280x1280/products/24615/76845/71054-8-116-E-Revo-BLUE-Front__53811.1700582772.jpg?c=2',
  side: 'https://cdn11.bigcommerce.com/s-sdwy6qdoez/images/stencil/1280x1280/products/24615/76847/71054-8-116-E-Revo-BLUE-Side__73574.1700582773.jpg?c=2',
  rear: 'https://cdn11.bigcommerce.com/s-sdwy6qdoez/images/stencil/1280x1280/products/24615/76849/71054-8-116-E-Revo-BLUE-3qtr-rear__12431.1700582776.jpg?c=2',
  chassis: 'https://cdn11.bigcommerce.com/s-sdwy6qdoez/images/stencil/1280x1280/products/24615/76850/71054-8-116-E-Revo-3qtr-Chassis__62912.1700582779.jpg?c=2',
  top: 'https://cdn11.bigcommerce.com/s-sdwy6qdoez/images/stencil/1280x1280/products/24615/76846/7105-E-Revo-Top-Chassis__43976.1700582782.jpg?c=2'
};
const REFERENCE_FILTER = {blue:'none', red:'hue-rotate(142deg) saturate(1.15)', violet:'hue-rotate(58deg) saturate(1.1)'};

const PARTS = {
  body: {n:'7111', name:'Body / shell', note:'Clear 1/16 E‑Revo body. Painted body numbers depend on colour.'},
  bumper: {n:'7135', name:'Front / rear bumper set', note:'Front and rear bumpers.'},
  frontArms: {n:'7131', name:'Front suspension arm set', note:'Upper and lower left/right front arms.'},
  rearArms: {n:'7132', name:'Rear suspension arm set', note:'Upper and lower left/right rear arms.'},
  carrier: {n:'7034', name:'Axle carriers', note:'Left and right axle carriers.'},
  driveshaft: {n:'7151', name:'Driveshaft assembly', note:'Complete left/right driveshaft assembly.'},
  shock: {n:'7061', name:'GTR composite shocks', note:'Assembled shocks, supplied without springs.'},
  motor: {n:'3785', name:'Titan 12T 550 motor', note:'Stock brushed motor for model 71054‑8.'},
  esc: {n:'3024R', name:'XL‑2.5 ESC', note:'Waterproof electronic speed control with low-voltage detection.'},
  servo: {n:'2080A', name:'Micro waterproof servo', note:'Stock steering servo family.'},
  receiver: {n:'6519', name:'TQ 2.4 GHz receiver', note:'Micro 3-channel receiver.'},
  diff: {n:'7078', name:'Differential assembly', note:'Front/rear differential assembly.'},
  chassis: {n:'7022', name:'Monocoque chassis', note:'Main chassis tub.'}
};

const HOTSPOTS = {
  body: [
    ['body',57,37], ['bumper',75,58], ['frontArms',72,68], ['carrier',81,69], ['rearArms',30,65], ['driveshaft',66,73]
  ],
  front: [['bumper',50,61], ['frontArms',46,70], ['carrier',68,71]],
  side: [['body',50,39], ['frontArms',73,67], ['rearArms',28,66], ['driveshaft',59,69]],
  rear: [['bumper',50,59], ['rearArms',45,70], ['carrier',31,71]],
  chassis: [
    ['motor',49,38], ['esc',62,45], ['servo',65,63], ['shock',45,57], ['frontArms',74,66], ['rearArms',27,64], ['diff',67,58]
  ],
  top: [
    ['motor',49,38], ['esc',59,46], ['receiver',39,46], ['servo',62,58], ['chassis',50,52], ['shock',47,61], ['diff',69,54]
  ]
};

const VIEWS = [
  {id:'body', label:'3/4'}, {id:'front', label:'Front'}, {id:'side', label:'Side'},
  {id:'rear', label:'Rear'}, {id:'chassis', label:'Chassis'}, {id:'top', label:'Top'}
];

const fallbackFleet = {cars:[
  {id:'blue',name:'Blue',accent:'#1667d9',status:'ready',issues:[],upgrades:[],spares:[],gear:{batteries:[],transmitters:[],chargers:[],other:[]}},
  {id:'red',name:'Red',accent:'#d51f2f',status:'ready',issues:[],upgrades:[],spares:[],gear:{batteries:[],transmitters:[],chargers:[],other:[]}},
  {id:'violet',name:'Violet',accent:'#7047d7',status:'ready',issues:[],upgrades:[],spares:[],gear:{batteries:[],transmitters:[],chargers:[],other:[]}}
]};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
let fleet = fallbackFleet;
let workflows = [];
let carId = 'blue';
let view = 'body';

function currentCar(){ return fleet.cars.find(c=>c.id===carId) || fleet.cars[0]; }
function esc(s=''){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function countGear(car){ return Object.values(car.gear||{}).reduce((n,a)=>n+(Array.isArray(a)?a.length:0),0); }
function stockFor(car, partNo){
  return (car.spares||[]).filter(x=>String(x.part||x.number||'')===String(partNo)).reduce((n,x)=>n+Number(x.qty||1),0);
}
function issuesForPart(car,key,part){
  return (car.issues||[]).filter(x=>x.component===key || (x.part && String(x.part)===String(part?.n)));
}
function bestViewForComponent(key){
  return VIEWS.find(v=>(HOTSPOTS[v.id]||[]).some(([partKey])=>partKey===key))?.id || 'chassis';
}
function planetLink(n){ return `https://planet-rc.ch/search?sSearch=${encodeURIComponent(n)}`; }

async function loadFleet(){
  try{
    const [fleetRes, workflowRes] = await Promise.all([
      fetch(`data/fleet.json?v=${Date.now()}`,{cache:'no-store'}),
      fetch(`data/workflows.json?v=${Date.now()}`,{cache:'no-store'})
    ]);
    if(fleetRes.ok) fleet = await fleetRes.json();
    if(workflowRes.ok) workflows = (await workflowRes.json()).workflows || [];
  }catch(e){ console.warn('Using fallback data',e); }
  render();
}

function render(){
  const car=currentCar();
  document.documentElement.style.setProperty('--accent',car.accent||'#1667d9');
  $('#carSwitch').innerHTML=fleet.cars.map((c,i)=>`<button class="car-pill ${c.id===carId?'active':''}" data-car="${c.id}" style="--pill-accent:${c.accent}"><i></i>${String(i+1).padStart(2,'0')} ${esc(c.name)}${(c.issues||[]).length?'<span class="attention-dot" aria-label="Open issue"></span>':''}</button>`).join('');
  $('#carName').textContent=car.name;
  $('#carIndex').textContent=String(fleet.cars.findIndex(c=>c.id===carId)+1).padStart(2,'0');
  const hasIssues=(car.issues||[]).length>0;
  $('#carStatus').className=`status-line ${hasIssues?'attention':''}`;
  $('#carStatus').innerHTML=`<span class="status-dot"></span><span>${hasIssues?`${car.issues.length} open issue${car.issues.length===1?'':'s'}`:'Ready'}</span>`;
  $('#issueCount').textContent=(car.issues||[]).length;
  $('#spareCount').textContent=(car.spares||[]).reduce((n,x)=>n+Number(x.qty||1),0);
  $('#upgradeCount').textContent=(car.upgrades||[]).length;
  $('#gearCount').textContent=countGear(car);
  $('#workflowCount').textContent=workflows.length || '';
  document.querySelector('[data-panel="issues"]').classList.toggle('has-items',hasIssues);
  $('#viewSwitch').innerHTML=VIEWS.map(v=>{
    const thumb=v.id==='body'?IMG.body[carId]:IMG[v.id];
    const filter=['front','side','rear'].includes(v.id)?REFERENCE_FILTER[carId]:'none';
    return `<button class="view-btn ${v.id===view?'active':''}" data-view="${v.id}"><img src="${thumb}" alt="" style="filter:${filter}"><span>${v.label}</span></button>`;
  }).join('');
  renderImage();
}

function renderImage(){
  const img=$('#carImage'), stage=$('#imageStage');
  stage.classList.add('loading');
  const src=view==='body'?IMG.body[carId]:IMG[view];
  img.style.filter=['front','side','rear'].includes(view)?REFERENCE_FILTER[carId]:'none';
  img.onload=()=>stage.classList.remove('loading');
  img.onerror=()=>stage.classList.remove('loading');
  img.src=src;
  img.alt=`${currentCar().name} Traxxas 1/16 E-Revo — ${view} view`;
  const car=currentCar();
  $('#hotspots').innerHTML=(HOTSPOTS[view]||[]).map(([key,x,y])=>{
    const p=PARTS[key], partIssues=issuesForPart(car,key,p), hasIssue=partIssues.length>0;
    return `<button class="hotspot ${hasIssue?'issue-hotspot':''}" data-part="${key}" style="left:${x}%;top:${y}%" aria-label="${esc(p.name)}${hasIssue?' — open issue':''}"><span class="hotspot-dot"></span>${hasIssue?'<span class="issue-badge">!</span>':''}<span class="hotspot-label">${esc(p.name)}${hasIssue?' · issue':''}</span></button>`;
  }).join('');
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
function closeDrawer(){
  $('#drawer').classList.remove('open'); $('#drawer').setAttribute('aria-hidden','true');
  $('#scrim').classList.remove('show'); setTimeout(()=>$('#scrim').hidden=true,250);
}

function itemRows(items, kind){
  if(!items?.length) return `<div class="empty">Nothing recorded for this car yet.</div>`;
  return `<div class="list">${items.map(x=>`<div class="list-row"><div><strong>${esc(x.name||x.part||x.title||kind)}</strong><p>${esc(x.note||x.details||(x.part?`Part ${x.part}`:''))}</p></div>${x.qty?`<div class="qty">×${esc(x.qty)}</div>`:''}</div>`).join('')}</div>`;
}

function panelIssues(){
  const car=currentCar(), items=car.issues||[];
  const body=items.length?`<div class="issue-list">${items.map(x=>`<button class="issue-row" ${x.component?`data-show-component="${esc(x.component)}"`:''}><div><span class="issue-state">OPEN</span><strong>${esc(x.name||'Issue')}</strong><p>${esc(x.details||x.note||'')}</p><small>${esc(x.area||'Maintenance')}${x.reported?` · ${esc(x.reported)}`:''}</small></div>${x.component?'<span class="locate">Show on car →</span>':''}</button>`).join('')}</div>`:`<div class="clean-state"><span class="clean-check">✓</span><div>No open damage recorded.</div></div>`;
  openDrawer('Issues',`${car.name} · maintenance`,`${body}<div class="drawer-section"><h3>Update through ChatGPT</h3><div class="chat-command">“${esc(car.name)} car: the front-right axle carrier is broken. Add it as an open issue.”</div></div>`);
}
function panelSpares(){ const c=currentCar(); openDrawer('Spares',`${c.name} · inventory`,`${itemRows(c.spares,'Spare part')}<div class="drawer-section"><h3>Update through ChatGPT</h3><div class="chat-command">“Add 2× Traxxas 7151 driveshafts to my garage stock.”</div></div>`); }
function panelUpgrades(){ const c=currentCar(); openDrawer('Upgrades',`${c.name} · setup`,`${itemRows(c.upgrades,'Upgrade')}<div class="drawer-section"><h3>Update through ChatGPT</h3><div class="chat-command">“${esc(c.name)} car now has aluminum push rods 7118X.”</div></div>`); }
function panelGear(){
  const c=currentCar(), g=c.gear||{};
  const sections=['batteries','transmitters','chargers','other'].map(k=>`<div class="drawer-section"><h3>${k}</h3>${itemRows(g[k],k)}</div>`).join('');
  openDrawer('Gear',`${c.name} · batteries & radio`,sections+`<div class="drawer-section"><h3>Update through ChatGPT</h3><div class="chat-command">“${esc(c.name)} car uses battery … and transmitter …”</div></div>`);
}
function panelPart(key){
  const car=currentCar(), p=PARTS[key], qty=stockFor(car,p.n), partIssues=issuesForPart(car,key,p);
  const issueHtml=partIssues.length?`<div class="component-issues">${partIssues.map(x=>`<div class="component-issue"><span>OPEN ISSUE</span><strong>${esc(x.name||'Issue')}</strong><p>${esc(x.details||x.note||'')}</p></div>`).join('')}</div>`:'';
  openDrawer(p.name,`${car.name} · part`,`
    <div class="drawer-section"><div class="part-number">TRAXXAS ${esc(p.n)}</div><h3 class="part-title">${esc(p.name)}</h3><p class="empty">${esc(p.note)}</p><div class="part-meta"><span class="tag ${qty?'good':''}">${qty?`${qty} in stock`:'No spare recorded'}</span>${partIssues.length?'<span class="tag bad">Open issue</span>':''}</div>${issueHtml}<div class="drawer-actions"><a class="action primary" href="${planetLink(p.n)}" target="_blank" rel="noopener">Find at Planet‑RC</a><a class="action" href="https://traxxas.com/media/productattach/C-71054-8/3/71054-8_parts.pdf" target="_blank" rel="noopener">Parts PDF</a></div></div>
    <div class="drawer-section"><h3>ChatGPT command</h3><div class="chat-command">“${esc(car.name)} car: ${esc(p.name)} (${esc(p.n)}) is broken.”</div></div>`);
}

function panelWorkflows(){
  if(!workflows.length){ openDrawer('Workflows','garage procedures','<div class="empty">No workflows loaded.</div>'); return; }
  const rows=workflows.map(w=>`<button class="workflow-row" data-workflow="${esc(w.id)}"><div><span>${esc(w.category||'Procedure')}</span><strong>${esc(w.title)}</strong><p>${esc(w.summary||'')}</p></div><b>→</b></button>`).join('');
  openDrawer('Workflows','garage procedures',`<div class="workflow-list">${rows}</div>`);
}
function openWorkflow(id){
  const w=workflows.find(x=>x.id===id); if(!w) return;
  const steps=(w.steps||[]).map((step,i)=>`<div class="workflow-step"><i>${i+1}</i><div>${esc(step)}</div></div>`).join('');
  const warning=w.warning?`<div class="workflow-warning"><strong>Important</strong><p>${esc(w.warning)}</p></div>`:'';
  const result=w.result?`<div class="workflow-result"><span>Expected result</span><strong>${esc(w.result)}</strong></div>`:'';
  const source=w.source?`<div class="drawer-actions"><a class="action" href="${esc(w.source)}" target="_blank" rel="noopener">Open Traxxas manual</a></div>`:'';
  openDrawer(w.title,`${w.category||'Procedure'} · ${w.scope||'1/16 E-Revo'}`,`${warning}<div class="workflow-steps">${steps}</div>${result}${source}`);
}

function panelAbout(){
  openDrawer('Garage','E‑Revo fleet',`
    <div class="drawer-section"><h3>How this is managed</h3><p class="empty">The visible garage stays deliberately minimal. Maintenance, spare stock, upgrades and gear live in <b>data/fleet.json</b>. Tell ChatGPT what changed and it can update that file and commit it.</p></div>
    <div class="drawer-section"><h3>Vehicle reference</h3><p class="source-note">Part numbers are based on the Traxxas 1/16 E‑Revo 71054‑8 parts list. Product imagery is loaded from existing retailer product media and is not stored in this repository. The violet hero image is a purple 1/16 E‑Revo product view used as a visual stand‑in until your own photo is added.</p></div>`);
}

document.addEventListener('click',e=>{
  const car=e.target.closest('[data-car]'); if(car){carId=car.dataset.car;view='body';render();closeDrawer();return;}
  const locate=e.target.closest('[data-show-component]'); if(locate){const key=locate.dataset.showComponent;view=bestViewForComponent(key);render();closeDrawer();setTimeout(()=>panelPart(key),280);return;}
  const wf=e.target.closest('[data-workflow]'); if(wf){openWorkflow(wf.dataset.workflow);return;}
  const v=e.target.closest('[data-view]'); if(v){view=v.dataset.view;render();return;}
  const h=e.target.closest('[data-part]'); if(h){panelPart(h.dataset.part);return;}
  const p=e.target.closest('[data-panel]'); if(p){({issues:panelIssues,spares:panelSpares,upgrades:panelUpgrades,gear:panelGear,workflows:panelWorkflows})[p.dataset.panel]?.();return;}
});
$('#menuBtn').addEventListener('click',panelAbout);
$('#closeDrawer').addEventListener('click',closeDrawer);
$('#scrim').addEventListener('click',closeDrawer);
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeDrawer(); });
loadFleet();
