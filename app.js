(() => {
  'use strict';
  const STORAGE_KEY = 'relay-orchestra-demo-v1';
  const navItems = [
    ['dashboard','Dashboard','Overall disaster overview','grid'],
    ['map','Disaster Map','Satellite images and affected areas','map'],
    ['villages','Village Risk','Village-level risk and priority','village'],
    ['sos','SOS & Rescue','Emergency requests and routes','sos'],
    ['teams','Teams & Vehicles','Vehicle tracking and rescue assignments','team'],
    ['offline','Offline Communication','Team messaging and connectivity','signal'],
    ['reports','Reports & History','Disaster and rescue reports','report']
  ];
  const statuses = ['Received','Prioritized','Assigned','Team en route','Contacted','Assistance complete','Unable to reach'];
  const now = () => new Date().toISOString();
  const initialState = () => ({
    page:'home', online:true, incident:{id:'INC-2026-041',name:'Monsoon Response',type:'Flood',area:'Kosi Basin, Bihar',status:'Active',opened:now(),source:'SIMULATED · Hydrology replay'},
    roads:{bridge:false}, layers:{flood:true,villages:true,sos:true,teams:true,shelters:true,fire:false,earthquake:false},
    villages:[
      {id:'v1',name:'Dharampur',district:'Supaul · 26.52°N, 86.78°E',x:180,y:110,pop:2840,risk:94,exposure:'Severe inundation',access:'At risk of isolation',factors:['River overflow','Road access narrowing','High water rise'],warned:true,contacted:false,shelter:'Dharampur School'},
      {id:'v2',name:'Madhopur',district:'Supaul · 26.57°N, 86.89°E',x:500,y:140,pop:1960,risk:81,exposure:'Rising water',access:'Reachable',factors:['Low-lying settlement','Rising river gauge'],warned:true,contacted:true,shelter:'Panchayat Hall'},
      {id:'v3',name:'Bela Ghat',district:'Saharsa · 26.43°N, 86.93°E',x:620,y:320,pop:3170,risk:76,exposure:'Flood watch',access:'At risk of isolation',factors:['River proximity','Bridge capacity reduced'],warned:false,contacted:false,shelter:'Bela Primary School'},
      {id:'v4',name:'Rampur Khurd',district:'Supaul · 26.61°N, 86.69°E',x:300,y:300,pop:1420,risk:58,exposure:'Watch area',access:'Reachable',factors:['Low elevation','Water rising slowly'],warned:true,contacted:false,shelter:'Rampur Community Centre'},
      {id:'v5',name:'Kataiya',district:'Madhepura · 26.38°N, 87.02°E',x:730,y:190,pop:2280,risk:43,exposure:'Monitor',access:'Access unverified',factors:['Sparse field reports','River-adjacent road'],warned:false,contacted:false,shelter:'Kataiya High School'}
    ],
    sos:[
      {id:'SOS-0418',villageId:'v1',need:'Evacuation',people:6,medical:true,danger:true,note:'Two children and one older adult. Water at the doorstep.',status:'Prioritized',teamId:'t1',created:now(),actor:'Dispatch desk',priority:98,communication:'Delivered',x:195,y:125},
      {id:'SOS-0417',villageId:'v3',need:'Medical help',people:2,medical:true,danger:false,note:'Elderly resident needs medication; boat access requested.',status:'Received',teamId:null,created:new Date(Date.now()-1000*60*11).toISOString(),actor:'Citizen report',priority:87,communication:'Delivered',x:605,y:304},
      {id:'SOS-0416',villageId:'v2',need:'Food & water',people:4,medical:false,danger:false,note:'Supplies needed at the north lane near the health post.',status:'Team en route',teamId:'t2',created:new Date(Date.now()-1000*60*26).toISOString(),actor:'Dispatch desk',priority:72,communication:'Delivered',x:484,y:151}
    ],
    teams:[
      {id:'t1',name:'Alpha · Boat Unit',vehicle:'Rescue boat BR-04',type:'Boat',x:238,y:183,status:'En route',connectivity:'Online',assignment:'SOS-0418 · Dharampur',lastSeen:'Live · 1 min ago',initials:'A1'},
      {id:'t2',name:'Bravo · Medical',vehicle:'4×4 ambulance BR-12',type:'4×4',x:437,y:227,status:'En route',connectivity:'Relaying',assignment:'SOS-0416 · Madhopur',lastSeen:'Last sync · 4 min ago',initials:'B2'},
      {id:'t3',name:'Charlie · Field Team',vehicle:'Rescue boat BR-09',type:'Boat',x:677,y:265,status:'Available',connectivity:'Waiting to sync',assignment:'Standby · Bela Ghat',lastSeen:'Last sync · 18 min ago',initials:'C3'}
    ],
    shelters:[{name:'Dharampur School',x:112,y:205},{name:'Panchayat Hall',x:555,y:82},{name:'Bela Primary School',x:711,y:365}],
    messages:[
      {id:'MSG-0082',title:'Water level rising · Bela Ghat',body:'Field update: water has reached the east access road. Route needs review.',sender:'Bravo · Medical',priority:'High',created:new Date(Date.now()-1000*60*7).toISOString(),status:'Relayed',hops:2,ack:false},
      {id:'MSG-0081',title:'Shelter capacity update',body:'Dharampur School shelter has 34 places remaining.',sender:'Alpha · Boat Unit',priority:'Normal',created:new Date(Date.now()-1000*60*18).toISOString(),status:'Delivered',hops:1,ack:true},
      {id:'MSG-0080',title:'Bridge inspection requested',body:'North bridge surface not visible under water. Treat crossing as unverified.',sender:'Charlie · Field Team',priority:'Urgent',created:new Date(Date.now()-1000*60*39).toISOString(),status:'Pending',hops:0,ack:false}
    ],
    events:[
      {title:'SOS prioritized',detail:'SOS-0418 · 6 people at Dharampur',actor:'Dispatch desk',created:new Date(Date.now()-1000*60*3).toISOString(),kind:'sos'},
      {title:'Field message relayed',detail:'Bela Ghat east access road update · 2 hops',actor:'Bravo · Medical',created:new Date(Date.now()-1000*60*7).toISOString(),kind:'message'},
      {title:'Rescue team dispatched',detail:'Alpha · Boat Unit assigned to SOS-0418',actor:'Ananya Sharma',created:new Date(Date.now()-1000*60*14).toISOString(),kind:'team'},
      {title:'Flood watch raised',detail:'Kosi river level rising near Dharampur',actor:'Hydrology replay',created:new Date(Date.now()-1000*60*32).toISOString(),kind:'alert'},
      {title:'Shelter confirmed open',detail:'Dharampur School · capacity 120',actor:'Field desk',created:new Date(Date.now()-1000*60*48).toISOString(),kind:'shelter'}
    ],
    alerts:[
      {id:'ALT-004',title:'Flood warning · Kosi river corridor',body:'Water levels are rising along low-lying areas of the Kosi river corridor. Move to higher ground and follow responder guidance. Do not cross flooded roads.',area:'Supaul and Saharsa districts',status:'Published',source:'Incident command',created:new Date(Date.now()-1000*60*24).toISOString(),updated:now()},
      {id:'ALT-003',title:'Shelter open · Dharampur School',body:'Dharampur School is open as a temporary shelter. Carry essential medicines and follow local responder instructions.',area:'Dharampur village',status:'Published',source:'Field coordination',created:new Date(Date.now()-1000*60*55).toISOString(),updated:new Date(Date.now()-1000*60*16).toISOString()},
      {id:'ALT-005',title:'North crossing status update',body:'The north bridge crossing is being assessed. Treat this crossing as unverified and use responder-approved guidance.',area:'Kosi Basin',status:'Draft',source:'Incident command',created:now(),updated:now()}
    ],
    selectedMap:null, compare:52, filters:{villageSearch:'',sosStatus:'All requests',riskSort:'Highest risk',reportIncident:'Current incident',reportVillage:'All villages',reportTeam:'All teams',reportMessage:'All message statuses',reportDate:'Last 24 hours'}, lastSync:now()
  });
  let state;
  try { state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || initialState(); } catch { state = initialState(); }
  // Keep this demonstration clearly replay-only, while safely accepting older saved data.
  if (!state.villages || !state.sos || !state.teams || !state.messages || !state.events) state = initialState();
  state.forecasts ||= [];
  state.filters ||= {};
  Object.assign(state.filters,{reportIncident:'Current incident',reportVillage:'All villages',reportTeam:'All teams',reportMessage:'All message statuses',reportDate:'Last 24 hours'},state.filters);
  state.page=document.body.dataset.page||'home';
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  let backendConnected = false;
  let backendMode = 'local';
  let backendSaveTimer = 0;
  function setDatabaseBadge(label, status) {
    const badge = document.getElementById('databaseStatus');
    if (!badge) return;
    badge.dataset.state = status;
    const text = badge.querySelector('span');
    if (text) text.textContent = label;
  }
  async function putStateOnBackend() {
    if (!backendConnected) return false;
    setDatabaseBadge('Saving data…', 'syncing');
    try {
      const response = await fetch('/api/state', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state })
      });
      if (!response.ok) throw new Error('Backend save failed.');
      setDatabaseBadge((backendMode === 'supabase' ? 'Supabase' : 'SQLite') + ' connected', 'connected');
      return true;
    } catch (error) {
      backendConnected = false;
      setDatabaseBadge('Browser save only', 'offline');
      console.warn('Rakshak could not save to its backend.', error);
      return false;
    }
  }
  const save = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
    if (backendConnected) {
      clearTimeout(backendSaveTimer);
      backendSaveTimer = setTimeout(putStateOnBackend, 300);
    }
  };
  async function refreshForecasts(showToast = false, shouldRender = true) {
    try {
      const response = await fetch('/api/forecasts', { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Forecast could not be refreshed.');
      state.forecasts = result.forecasts || [];
      state.forecastNotice = result.notice || '';
      save();
      if (shouldRender) render();
      if (showToast) toast('Flood risk outlook refreshed from the latest saved readings.');
      return true;
    } catch (error) {
<<<<<<< HEAD
      if (showToast) toast(error.message || 'Start the Rakshak backend to refresh forecasts.', true);
=======
      if (showToast) toast(error.message || 'Forecast service is unavailable. Check the connection and try again.', true);
>>>>>>> c6fb400426897a8e758b31e8f6b9f88e8ec9a94a
      return false;
    }
  }
  async function connectDatabase() {
    setDatabaseBadge('Connecting…', 'connecting');
    try {
      const healthResponse = await fetch('/api/health', { cache: 'no-store' });
      const health = await healthResponse.json();
      if (!healthResponse.ok || !health.connected) throw new Error('Database unavailable.');
      backendConnected = true;
      backendMode = health.mode || 'sqlite';
      const stateResponse = await fetch('/api/state', { cache: 'no-store' });
      const saved = await stateResponse.json();
      if (!stateResponse.ok) throw new Error(saved.error || 'Could not load saved incident data.');
      if (saved.state && Array.isArray(saved.state.villages) && Array.isArray(saved.state.sos)) {
        state = saved.state;
        state.page = document.body.dataset.page || 'home';
        state.forecasts ||= [];
        state.filters ||= {};
        Object.assign(state.filters, {
          reportIncident: 'Current incident', reportVillage: 'All villages',
          reportTeam: 'All teams', reportMessage: 'All message statuses',
          reportDate: 'Last 24 hours'
        });
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
      } else {
        await putStateOnBackend();
      }
      await refreshForecasts(false, false);
      setDatabaseBadge((backendMode === 'supabase' ? 'Supabase' : 'SQLite') + ' connected', 'connected');
      render();
    } catch (error) {
      backendConnected = false;
      setDatabaseBadge('Browser save only', 'offline');
      console.info('Rakshak is running without its API backend.', error);
    }
  }
  const timestamp = value => new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit'}).format(new Date(value));
  const ago = value => {const mins=Math.max(0,Math.floor((Date.now()-new Date(value).getTime())/60000));return mins<1?'just now':mins<60?`${mins} min ago`:`${Math.floor(mins/60)} hr ago`;};
  const village = id => state.villages.find(v=>v.id===id);
  const team = id => state.teams.find(t=>t.id===id);
  const totalPeople = () => state.villages.reduce((sum,v)=>sum+v.pop,0);
  const openSos = () => state.sos.filter(s=>!['Assistance complete','Unable to reach'].includes(s.status));
  const unresolved = () => state.sos.filter(s=>!['Assistance complete','Unable to reach','Contacted'].includes(s.status));
  const pendingMessages = () => state.messages.filter(m=>m.status==='Pending'||m.status==='Relaying');
  const makeId = prefix => `${prefix}-${String(Math.floor(1000+Math.random()*8999))}`;
  const priorityFor = ({people,medical,danger,villageId}) => {const v=village(villageId);return Math.min(99,Math.round((danger?30:0)+(medical?25:0)+Math.min(people*3,18)+(v?.risk||30)*.27+(v?.access==='At risk of isolation'?13:0)));};
  const logEvent = (title,detail,actor='Ananya Sharma',kind='update') => {state.events.unshift({title,detail,actor,created:now(),kind});state.events=state.events.slice(0,50);};
  const toast = (message,error=false) => {const el=document.createElement('div');el.className=`toast${error?' error':''}`;el.textContent=message;$('#toastRegion').append(el);setTimeout(()=>el.remove(),3300);};
  const icon = name => {
    const paths={grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15m6-12v15"/>',village:'<path d="m3 11 9-8 9 8v9h-6v-6H9v6H3z"/><path d="M7 11h.01M17 11h.01"/>',sos:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 4h.01"/>',team:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1m1-14a3 3 0 0 1 0 6m1 3a5 5 0 0 1 4 5"/>',signal:'<path d="M4 18v-3m5 3V10m5 8V6m5 12V3"/>',report:'<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5m-9 4h5m-5 4h5"/>'};
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]||paths.grid}</svg>`;
  };
  function renderNav(){ $('#mainNav').innerHTML=navItems.map(([id,label,desc,ico])=>`<button class="nav-item ${state.page===id?'active':''}" data-page="${id}" ${state.page===id?'aria-current="page"':''}><span class="nav-icon">${icon(ico)}</span><span class="nav-copy"><b>${label}</b><small>${desc}</small></span></button>`).join(''); }
  function pageTitle(){return navItems.find(n=>n[0]===state.page)?.[1]||'Public Alerts';}
  const pageContext={state,esc,timestamp,ago,village,team,totalPeople,openSos,unresolved,pendingMessages,metric,statusClass,statusChip,eventRows,pageHead,mapSvg,getMapSelection,statuses};
  pageContext.sosCard=sosCard;
  pageContext.messageChip=messageChip;
  pageContext.filteredReportEvents=filteredReportEvents;
  function render(){
    renderNav(); $('#crumbTitle').textContent=pageTitle();
    document.querySelector('.app-shell').classList.toggle('landing-mode',state.page==='home');
    const net=$('#networkToggle');net.classList.toggle('offline',!state.online);net.setAttribute('aria-pressed',String(!state.online));$('#networkToggleText').textContent=state.online?'Network online':'Network offline';$('#sideNetworkState').textContent=state.online?'ONLINE':'OFFLINE';$('#sideNetworkState').style.color=state.online?'#e7a25d':'#e79a87';
    $('#lastSync').textContent=ago(state.lastSync);
    const renderPage=window.RakshakPages?.[state.page];
    const content=$('#content');
    let pageMarkup;
    try {
      pageMarkup=renderPage?renderPage(pageContext):'<div class="card empty-state">This page module could not be loaded. Check the matching file in the pages folder.</div>';
    } catch(error) {
      console.error('Rakshak page could not render:',state.page,error);
      pageMarkup='<section class="card empty-state render-error"><h2>This page did not load</h2><p>Refresh the page. If it remains blank, check that its page file is available.</p></section>';
    }
    content.innerHTML=pageMarkup;
    window.RakhshakI18n?.apply(document.querySelector('.app-shell'));
    $('#content').focus({preventScroll:true});
    bindContent();
  }
  function pageHead(kicker,title,desc,actions=''){return `<div class="page-head"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p>${desc}</p></div>${actions?`<div class="head-actions">${actions}</div>`:''}</div>`;}
  function metric(label,value,foot,ico,footClass=''){return `<article class="card metric-card"><div class="metric-top"><span>${label}</span><span class="metric-icon">${ico}</span></div><strong>${value}</strong><div class="metric-foot ${footClass}">${foot}</div></article>`;}
  function statusClass(status){if(['Received','Prioritized','Unable to reach'].includes(status))return status==='Unable to reach'?'chip-muted':'chip-high';if(['Assigned','Team en route'].includes(status))return 'chip-medium';if(['Contacted','Assistance complete','Delivered'].includes(status))return 'chip-low';return 'chip-muted';}
  function statusChip(status){return `<span class="status-chip ${statusClass(status)}">${esc(status)}</span>`;}
  function eventRows(events){return events.slice(0,5).map(e=>`<div class="activity-row"><span class="activity-icon">${e.kind==='sos'?'!':e.kind==='team'?'↗':e.kind==='message'?'⌁':e.kind==='shelter'?'⌂':'✳'}</span><div class="activity-copy"><b>${esc(e.title)}</b><small>${esc(e.detail)} · ${esc(e.actor)}</small></div><time class="activity-time">${ago(e.created)}</time></div>`).join('')||'<div class="empty-state">No incident activity yet.</div>';}
  function mapSvg(size='full'){
    const markers=[];
    if(state.layers.villages)state.villages.forEach(v=>markers.push(`<g data-map-key="${v.id}" tabindex="0" role="button" aria-label="Village ${esc(v.name)}"><circle class="marker-village" cx="${v.x}" cy="${v.y}" r="7"/><text class="map-label" x="${v.x+10}" y="${v.y-8}">${esc(v.name)}</text><text class="map-small" x="${v.x+10}" y="${v.y+3}">RISK ${v.risk}</text></g>`));
    if(state.layers.sos)state.sos.filter(s=>!['Assistance complete','Unable to reach'].includes(s.status)).forEach(s=>markers.push(`<g data-map-key="${s.id}" tabindex="0" role="button" aria-label="SOS request ${s.id}"><circle class="marker-halo" cx="${s.x}" cy="${s.y}" r="12"/><circle class="marker-sos" cx="${s.x}" cy="${s.y}" r="5"/></g>`));
    if(state.layers.teams)state.teams.forEach(t=>markers.push(`<g data-map-key="${t.id}" tabindex="0" role="button" aria-label="Team ${esc(t.name)}"><rect class="marker-team" x="${t.x-5}" y="${t.y-5}" width="10" height="10" rx="3"/><text class="map-small" x="${t.x+9}" y="${t.y+3}">${esc(t.initials)}</text></g>`));
    if(state.layers.shelters)state.shelters.forEach((s,i)=>markers.push(`<g data-map-key="shelter-${i}" tabindex="0" role="button" aria-label="Shelter ${esc(s.name)}"><path class="marker-shelter" d="M${s.x-6} ${s.y}l6-6 6 6v7h-12z"/></g>`));
    const roadClass=state.roads.bridge?'road road-blocked':'road';
    return `<svg class="map-art ${size==='full'?'map-art-full':''}" viewBox="0 0 800 440" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Simulated Kosi Basin response map"><defs><pattern id="mapGrid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" fill="none" stroke="#e5bd8e" stroke-opacity=".055" stroke-width=".7"/></pattern><clipPath id="beforeClip"><rect id="beforeClipRect" x="0" y="0" width="${Math.round(800*state.compare/100)}" height="440"/></clipPath></defs><rect width="800" height="440" fill="#3a291e"/><path class="terrain" d="M0 0h800v440H0z"/><path class="terrain2" d="M20 70 140 28l85 34-36 52-124 18zm185 84 88-39 89 49-46 64-138-17zm280-95 106-31 96 45-25 80-152-10zM48 300l111-54 95 58-42 87-148 5zm491 12 89-50 125 27-31 112-148 13z"/><path class="contour" d="M-20 88c111-66 167 27 260-2s148-58 241-12 154 7 344-27M-12 112c99-54 161 27 253 2s165-52 256-9 158 1 323-25M-10 272c115-77 177 16 281-10s166-53 241-6 169 30 314-12M-4 298c124-63 170 21 276-1s173-47 250-3 166 18 282-6M-3 361c114-50 188 13 285-13s162-28 230 7 173 22 298-15"/><path class="river" d="M-30 219c108-45 131 2 214-9s102-69 202-61 146 77 236 58 116-61 221-42"/><path class="river-edge" d="M-30 196c112-43 138 0 219-8s101-63 197-56 148 70 238 52 116-56 219-40M-30 242c111-45 126 2 211-10s104-72 201-65 146 83 236 63 119-65 225-45"/><path class="flood-area" data-layer="flood" style="opacity=${state.layers.flood?0.16:0}" d="M20 182c52-37 116-30 176-1s83 41 140 13 80-59 132-33 88 62 160 34 113-44 160-25v111c-59-18-105 39-169 33s-113-54-166-31-83 62-157 36-94-48-159-22S65 339 8 306z"/><g class="before-imagery" clip-path="url(#beforeClip)"><path d="M0 0h800v440H0z" fill="#b2b58c" opacity=".09"/><path d="M0 20 800 250M0 80 800 310M0 145 800 375" stroke="#e1ddb3" stroke-opacity=".08" stroke-width="19"/><text class="map-small" x="22" y="30">BEFORE · ARCHIVE REFERENCE</text></g><rect width="800" height="440" fill="url(#mapGrid)"/><path class="boundary" d="M96 49 173 73l39 58-31 77 48 63-33 98-87 32-54-73 20-77-42-72 31-83zM466 35l78 32 22 61-36 78 59 69-17 102-89 33-63-83 10-87-45-74 31-82z"/><path class="road-minor" d="M70 20 149 99l94 66 84 67 87 58 140 49 173 68M34 365l136-95 82-66 104-68 100-49 133-51M120 414l33-123 45-98 38-78m336 257 22-94 46-77 96-62"/><path class="${roadClass}" d="M25 390 155 278l107-52 116-22 101-79 126 3 178-77"/><path class="road-minor" d="M131 83 278 131l104 73 93 88 107 49m-450-15 141-9 112 25 104-17 130 24"/><g class="route-line" fill="none" stroke="#e9a45e" stroke-width="2.4" stroke-dasharray="5 4"><path d="M238 183 202 156 195 125"/><path d="M437 227 461 190 484 151"/></g><g data-action="toggle-road" class="road-button" tabindex="0" role="button" aria-label="Toggle north bridge road status"><circle cx="392" cy="204" r="14" fill="#352419" stroke="${state.roads.bridge?'#ef907b':'#dbc17f'}" stroke-width="1.5"/><path d="M386 204h12m-9-4 6 8m1-8-6 8" stroke="${state.roads.bridge?'#ef907b':'#dbc17f'}" stroke-width="1.3"/><text class="map-small" x="408" y="207">${state.roads.bridge?'BLOCKED':'NORTH BRIDGE'}</text></g><text class="map-small" x="28" y="421">KOSI BASIN · SIMULATED MAP TILE</text><text class="map-small" x="620" y="421">26.5°N 86.8°E · REPLAY</text>${markers.join('')}<g id="compareDivider" style="transform:translateX(${Math.round(800*state.compare/100)}px)"><path d="M0 0V440" stroke="#f2d8b3" stroke-width="1" stroke-dasharray="3 3"/><circle cy="220" r="10" fill="#f2d8b3"/><path d="M-3 216v8m6-8v8" stroke="#492f20" stroke-width="1"/></g></svg>`;
  }
  function getMapSelection(){if(!state.selectedMap)return null;const id=state.selectedMap;const v=village(id);if(v)return{title:`Village · ${v.name}`,detail:`Risk ${v.risk}/100 · ${v.access} · estimated population ${v.pop.toLocaleString()}. ${v.factors.join(' · ')}`};const s=state.sos.find(x=>x.id===id);if(s)return{title:`SOS · ${s.id}`,detail:`${s.need} · ${s.people} people · ${s.status} · priority ${s.priority}/100. Personal details stay in the dispatcher view.`};const t=team(id);if(t)return{title:`Team · ${t.name}`,detail:`${t.vehicle} · ${t.status} · ${t.connectivity} · ${t.assignment}`};if(id.startsWith('shelter-')){const index=Number(id.split('-')[1]);const sh=state.shelters[index];if(sh)return{title:`Shelter · ${sh.name}`,detail:'Field desk confirmed open · capacity details are simulated.'};}return null;}
  function sosCard(s){const v=village(s.villageId),assigned=team(s.teamId);return `<article class="card sos-card ${s.priority>=85?'urgent':''}"><div class="sos-main"><span class="sos-marker">!</span><div class="sos-body"><div class="sos-title-row"><b>${esc(s.need)} · ${esc(v?.name||'Unknown location')}</b>${statusChip(s.status)}<span class="tag ${s.priority>=85?'chip-high':'chip-medium'}">PRIORITY ${s.priority}</span></div><div class="sos-meta">${esc(s.id)} · ${s.people} people · ${s.medical?'Medical need':''}${s.medical&&s.danger?' · ':''}${s.danger?'Immediate danger':''} · ${ago(s.created)} · ${esc(s.communication)}</div><div class="sos-note">“${esc(s.note||'No additional note provided.')}”</div><div class="sos-factors"><span class="tag">${esc(v?.exposure||'Exposure unknown')}</span><span class="tag">${esc(v?.access||'Access unverified')}</span><span class="tag">Need + urgency + isolation</span>${assigned?`<span class="tag chip-blue">${esc(assigned.name)}</span>`:'<span class="tag chip-high">Unassigned</span>'}</div></div></div><div class="sos-side"><span class="case-id">${timestamp(s.created)}</span><select class="select-input" data-sos-status="${s.id}" aria-label="Update ${esc(s.id)} status">${statuses.map(st=>`<option ${s.status===st?'selected':''}>${st}</option>`).join('')}</select><button class="button small" data-action="assign-sos" data-id="${s.id}">${assigned?'↻ Reassign team':'＋ Assign team'}</button></div></article>`;}
  function messageChip(status){const c=status==='Delivered'?'chip-low':status==='Relayed'?'chip-blue':status==='Pending'?'chip-medium':'chip-muted';return `<span class="status-chip ${c}">${esc(status)}</span>`;}
  function filteredReportEvents(){const f=state.filters,cutoff=f.reportDate==='Last 24 hours'?Date.now()-86400000:f.reportDate==='Last 7 days'?Date.now()-604800000:0;return state.events.filter(e=>{if(new Date(e.created).getTime()<cutoff)return false;if(f.reportVillage&&f.reportVillage!=='All villages'&&!e.detail.includes(f.reportVillage))return false;if(f.reportTeam&&f.reportTeam!=='All teams'&&!e.detail.includes(f.reportTeam)&&e.actor!==f.reportTeam)return false;if(f.reportMessage&&f.reportMessage!=='All message statuses'){if(e.kind!=='message')return false;const status=f.reportMessage.toLowerCase();if(status==='delivered'&&!/delivered|acknowledged|synced/i.test(e.title))return false;if(status==='relayed'&&!/relayed/i.test(e.title))return false;if(status==='pending'&&!/pending|local queue|lost/i.test(`${e.title} ${e.detail}`))return false;}return true;});}
  function bindContent(){
    $$('[data-page]',$('#content')).forEach(el=>el.addEventListener('click',()=>go(el.dataset.page)));
    $$('[data-action]',$('#content')).forEach(el=>{el.addEventListener('click',()=>handleAction(el.dataset.action,el.dataset.id));if(el.namespaceURI==='http://www.w3.org/2000/svg')el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();handleAction(el.dataset.action,el.dataset.id);}});});
    $$('[data-layer-toggle]').forEach(el=>el.addEventListener('change',()=>{state.layers[el.dataset.layerToggle]=el.checked;save();render();}));
    const vs=$('[data-village-search]');if(vs)vs.addEventListener('input',()=>{state.filters.villageSearch=vs.value;const start=vs.selectionStart;render();const next=$('[data-village-search]');next.focus();next.setSelectionRange(start,start);});
    const rs=$('[data-risk-sort]');if(rs)rs.addEventListener('change',()=>{state.filters.riskSort=rs.value;render();});
    const sf=$('[data-sos-filter]');if(sf)sf.addEventListener('change',()=>{state.filters.sosStatus=sf.value;render();});
    $$('[data-sos-status]').forEach(el=>el.addEventListener('change',()=>changeSosStatus(el.dataset.sosStatus,el.value)));
    const mr=$('[data-map-search]');if(mr)mr.addEventListener('input',()=>{const q=mr.value.toLowerCase();const candidate=state.villages.find(v=>v.name.toLowerCase().includes(q))||state.sos.find(s=>s.id.toLowerCase().includes(q));if(q&&candidate){state.selectedMap=candidate.id;render();const inp=$('[data-map-search]');inp.focus();inp.value=mr.value;}});
    $$('[data-map-key]').forEach(el=>{const select=()=>{state.selectedMap=el.dataset.mapKey;save();render();};el.addEventListener('click',select);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select();}});});
    const compare=$('[data-compare-range]');if(compare)compare.addEventListener('input',()=>{state.compare=Number(compare.value);save();const map=$('.map-full .map-art');if(map){const rect=$('#beforeClipRect',map);if(rect)rect.setAttribute('width',Math.round(800*state.compare/100));const div=$('#compareDivider',map);if(div)div.style.transform=`translateX(${Math.round(800*state.compare/100)}px)`;}const value=compare.parentElement.querySelector('.mono');if(value)value.textContent=`${state.compare}%`;});
    const mf=$('#messageForm');if(mf)mf.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(mf);addMessage({title:fd.get('title'),body:fd.get('body'),priority:fd.get('priority'),sender:'Ananya Sharma'});});
    const reports=$$('[data-report-filter]');reports.forEach(el=>el.addEventListener('change',()=>{state.filters[el.dataset.reportFilter]=el.value;save();render();}));
  }
  const pageRoutes={home:'index.html',dashboard:'dashboard.html',map:'disaster-map.html',villages:'village-risk.html',sos:'sos-rescue.html',teams:'teams-vehicles.html',offline:'offline-communication.html',reports:'reports-history.html',public:'public-alerts.html'};
  function go(page,message=''){if(page===state.page){save();render();window.scrollTo({top:0,behavior:'smooth'});if(message)toast(message);return;}state.page=page;save();if(message){try{sessionStorage.setItem('RakshakFlash',message);}catch{}}window.location.href=pageRoutes[page]||'index.html';}
  function handleAction(action,id){switch(action){case'new-sos':openSosDialog();break;case'public-page':go('public');break;case'toggle-network':toggleNetwork();break;case'toggle-road':toggleRoad();break;case'assign-sos':openAssignDialog(id);break;case'assign-team':openTeamAssignDialog(id);break;case'team-update':openFieldDialog(id);break;case'field-update':openFieldDialog(null);break;case'relay-message':relayMessage(id);break;case'sync-messages':syncMessages();break;case'reset-layers':state.layers={flood:true,villages:true,sos:true,teams:true,shelters:true,fire:false,earthquake:false};save();render();toast('Map layers reset to incident defaults.');break;case'toggle-compare':document.querySelector('[data-compare-range]')?.focus();toast('Use the before/after slider beneath the map.');break;case'approve-alert':approveAlert(id);break;case'new-alert':openAlertDialog();break;case'edit-alert':openAlertDialog(id);break;case'print-report':window.print();break;case'export-report':downloadReport();break;case'download-villages':downloadVillages();break;case'add-observation':openObservationDialog();break;case'refresh-forecasts':refreshForecasts(true);break;}}
  function openObservationDialog(){
    const dlg=$('#detailDialog');
    const options=state.villages.map(v=>'<option value="'+esc(v.id)+'">'+esc(v.name)+'</option>').join('');
    dlg.innerHTML='<div class="dialog-head"><div><div class="eyebrow">FLOOD OUTLOOK INPUT</div><h2>Add a ground reading</h2><p>Use a trusted station or responder observation. The forecast remains a screening estimate.</p></div><button class="dialog-close" data-close aria-label="Close">×</button></div>'+
      '<form id="observationForm"><div class="form-grid"><div class="field"><label for="observationVillage">Village</label><select id="observationVillage" name="village" required>'+options+'</select></div>'+
      '<div class="field"><label for="observationSource">Reading source</label><input id="observationSource" name="source" maxlength="100" value="Manual observation" required></div>'+
      '<div class="field"><label for="rainfall6">Rainfall · last 6 hours (mm)</label><input id="rainfall6" name="rainfall6" type="number" min="0" max="1000" step="0.1" value="0" required></div>'+
      '<div class="field"><label for="rainfall24">Rainfall · last 24 hours (mm)</label><input id="rainfall24" name="rainfall24" type="number" min="0" max="3000" step="0.1" value="0" required></div>'+
      '<div class="field"><label for="riverLevel">River level (cm)</label><input id="riverLevel" name="riverLevel" type="number" min="0" max="100000" step="0.1" value="0" required></div>'+
      '<div class="field"><label for="riverRise">River rise (cm per hour)</label><input id="riverRise" name="riverRise" type="number" min="-100" max="100" step="0.1" value="0" required></div>'+
      '<div class="field"><label for="soilSaturation">Soil saturation (%)</label><input id="soilSaturation" name="soilSaturation" type="number" min="0" max="100" step="1" value="50" required></div>'+
      '<label class="check-row"><input type="checkbox" name="simulated"> This reading is simulated</label></div>'+
      '<div class="inline-note" style="margin-top:12px">Only enter measurements from a named source. Demo readings are labelled and are not official warning data.</div>'+
      '<div class="dialog-actions"><button type="button" class="button ghost" data-close>Cancel</button><button class="button primary" type="submit">Save reading and refresh outlook</button></div></form>';
    openDialog(dlg);
    $('#observationForm').addEventListener('submit',async event=>{
      event.preventDefault();
      const form=new FormData(event.currentTarget);
      try{
        const response=await fetch('/api/observations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
          villageId:form.get('village'),source:form.get('source'),
          rainfall6hMm:Number(form.get('rainfall6')),rainfall24hMm:Number(form.get('rainfall24')),
          riverLevelCm:Number(form.get('riverLevel')),riverRiseCmHr:Number(form.get('riverRise')),
          soilSaturationPct:Number(form.get('soilSaturation')),isSimulated:form.get('simulated')==='on'
        })});
        const result=await response.json();
        if(!response.ok){toast(result.error||'Could not save this reading.',true);return;}
        dlg.close();
        await refreshForecasts(false,false);
        render();
        toast('Reading saved to the database and flood outlook updated.');
      }catch{
<<<<<<< HEAD
        toast('Start the Rakshak backend before adding a reading.',true);
=======
        toast('Connect the API and database before saving a field reading.',true);
>>>>>>> c6fb400426897a8e758b31e8f6b9f88e8ec9a94a
      }
    });
  }  function openSosDialog(){const dlg=$('#sosDialog');dlg.innerHTML=`<div class="dialog-head"><div><div class="eyebrow">CITIZEN SOS</div><h2>Request emergency help</h2><p>Your request is linked to the Kosi Basin incident.</p></div><button class="dialog-close" data-close aria-label="Close">×</button></div><form id="sosForm"><div class="form-grid"><div class="field"><label for="sosVillage">Village / location</label><select id="sosVillage" name="village" required>${state.villages.map(v=>`<option value="${v.id}">${esc(v.name)} · ${esc(v.access)}</option>`).join('')}</select></div><div class="field"><label for="sosNeed">Type of help</label><select id="sosNeed" name="need"><option>Evacuation</option><option>Medical help</option><option>Food & water</option><option>Rescue from water</option><option>Other urgent help</option></select></div><div class="field"><label for="sosPeople">People needing help</label><input id="sosPeople" name="people" type="number" min="1" max="99" value="1" required></div><div class="field"><label for="sosLocation">Location detail (optional)</label><input id="sosLocation" name="location" maxlength="80" placeholder="Landmark or last-known location"></div><label class="check-row"><input type="checkbox" name="medical"> Medical need</label><label class="check-row"><input type="checkbox" name="danger"> Immediate danger</label><div class="field full"><label for="sosNote">Short note (optional)</label><textarea id="sosNote" name="note" maxlength="180" placeholder="Tell responders what they should know"></textarea></div></div><div class="inline-note" style="margin-top:12px">Priority is suggested from need, people affected, village exposure and isolation. ${state.online?'Request will be sent through this simulated network.':'Request will be saved on this device and marked pending until synced.'}</div><div class="dialog-actions"><button type="button" class="button ghost" data-close>Cancel</button><button class="button primary" type="submit">Send SOS request</button></div></form>`;openDialog(dlg);$('#sosForm').addEventListener('submit',submitSos);}
  function submitSos(e){e.preventDefault();const fromHome=state.page==='home';const fd=new FormData(e.currentTarget),vId=fd.get('village'),v=village(vId),people=Math.max(1,Number(fd.get('people'))||1),medical=fd.get('medical')==='on',danger=fd.get('danger')==='on';const id=makeId('SOS');const item={id,villageId:vId,need:fd.get('need'),people,medical,danger,note:[fd.get('location'),fd.get('note')].filter(Boolean).join(' · '),status:'Received',teamId:null,created:now(),actor:'Citizen SOS form',priority:priorityFor({people,medical,danger,villageId:vId}),communication:state.online?'Delivered':'Pending sync',x:v.x+14,y:v.y+13};state.sos.unshift(item);if(!state.online){state.messages.unshift({id:makeId('MSG'),title:`Offline SOS · ${id}`,body:`${item.need} request · ${people} people · ${v.name}. Pending gateway acknowledgement.`,sender:'Citizen device',priority:danger?'Urgent':'High',created:now(),status:'Pending',hops:0,ack:false,linkedSos:id});}logEvent('Citizen SOS received',`${id} · ${item.need} · ${v.name} · priority ${item.priority}`,'Citizen device','sos');save();$('#sosDialog').close();go(fromHome?'dashboard':'sos',state.online?`SOS ${id} received and added to dispatch queue.`:`SOS ${id} saved locally. It is pending sync.`);}
  function openAssignDialog(sosId){const s=state.sos.find(x=>x.id===sosId);if(!s)return;const dlg=$('#detailDialog');dlg.innerHTML=`<div class="dialog-head"><div><div class="eyebrow">DISPATCH ASSIGNMENT · ${esc(s.id)}</div><h2>Choose a response team</h2><p>${esc(s.need)} · ${s.people} people · ${esc(village(s.villageId)?.name||'Location unknown')}</p></div><button class="dialog-close" data-close aria-label="Close">×</button></div><form id="assignForm"><div class="field"><label for="assignTeam">Available team</label><select id="assignTeam" name="team" required>${state.teams.map(t=>`<option value="${t.id}" ${t.id===s.teamId?'selected':''}>${esc(t.name)} · ${esc(t.status)} · ${esc(t.connectivity)}</option>`).join('')}</select></div><div class="inline-note" style="margin-top:12px">Suggested route accounts for known closures. ${state.roads.bridge?'North bridge is marked blocked; use the south road and east embankment.':'North bridge is unverified; confirm conditions before dispatch.'}</div><div class="dialog-actions"><button type="button" class="button ghost" data-close>Cancel</button><button class="button primary">Assign team</button></div></form>`;openDialog(dlg);$('#assignForm').addEventListener('submit',e=>{e.preventDefault();assignSos(sosId,new FormData(e.currentTarget).get('team'));dlg.close();});}
  function assignSos(sosId,teamId){const s=state.sos.find(x=>x.id===sosId),t=team(teamId);if(!s||!t)return;if(s.teamId){const old=team(s.teamId);if(old&&old.assignment.includes(s.id)){old.assignment='Available for dispatch';old.status='Available';}}s.teamId=teamId;s.status='Assigned';s.actor='Ananya Sharma';s.updated=now();t.status='Assigned';t.assignment=`${s.id} · ${village(s.villageId)?.name||'SOS location'}`;logEvent('Rescue team assigned',`${t.name} assigned to ${s.id} · ${state.roads.bridge?'route updated around blocked bridge':'route suggested · verify crossing'}`,'Ananya Sharma','team');save();render();toast(`${t.name} assigned to ${s.id}.`);}
  function openTeamAssignDialog(teamId){const t=team(teamId);if(!t)return;const dlg=$('#detailDialog');dlg.innerHTML=`<div class="dialog-head"><div><div class="eyebrow">TEAM DISPATCH</div><h2>Assign ${esc(t.name)}</h2><p>${esc(t.vehicle)} · ${esc(t.connectivity)}</p></div><button class="dialog-close" data-close aria-label="Close">×</button></div><div class="sos-list">${openSos().map(s=>`<button class="card" style="padding:12px;text-align:left" data-choose-sos="${s.id}"><b style="font-size:10px">${esc(s.id)} · ${esc(s.need)} · ${esc(village(s.villageId)?.name||'')}</b><div style="margin-top:6px">${statusChip(s.status)} <span class="tag">PRIORITY ${s.priority}</span></div></button>`).join('')||'<div class="empty-state">No open SOS requests.</div>'}</div>`;openDialog(dlg);$$('[data-choose-sos]',dlg).forEach(b=>b.addEventListener('click',()=>{assignSos(b.dataset.chooseSos,teamId);dlg.close();}));}
  function changeSosStatus(id,newStatus){const s=state.sos.find(x=>x.id===id);if(!s||s.status===newStatus)return;if(newStatus==='Assistance complete'){const dlg=$('#detailDialog');dlg.innerHTML=`<div class="dialog-head"><div><div class="eyebrow">RESPONDER CONFIRMATION · ${esc(id)}</div><h2>Confirm assistance complete</h2><p>This status is reserved for a responder-verified outcome.</p></div><button class="dialog-close" data-close aria-label="Close">×</button></div><p style="font-size:10px;color:#b0bcae">Record that a responder contacted the people and confirmed the assistance was completed.</p><label class="check-row" style="padding:12px;border:1px solid var(--line);border-radius:9px"><input type="checkbox" id="completionConfirm"> I confirm this person was contacted and assistance was completed.</label><div class="dialog-actions"><button type="button" class="button ghost" data-close>Cancel</button><button type="button" class="button primary" id="confirmComplete">Confirm outcome</button></div>`;openDialog(dlg);$('#confirmComplete').addEventListener('click',()=>{if(!$('#completionConfirm').checked){toast('Check the responder confirmation before closing this case.',true);return;}dlg.close();applySosStatus(s,newStatus);});return;}applySosStatus(s,newStatus);}
  function applySosStatus(s,newStatus){const old=s.status;s.status=newStatus;s.actor='Ananya Sharma';s.updated=now();if(newStatus==='Team en route'&&s.teamId){const t=team(s.teamId);if(t)t.status='En route';}if(newStatus==='Contacted'){const v=village(s.villageId);if(v)v.contacted=true;}if(['Assistance complete','Unable to reach'].includes(newStatus)&&s.teamId){const t=team(s.teamId);if(t){t.status='Available';t.assignment='Available for dispatch';}}logEvent('SOS status updated',`${s.id} · ${old} → ${newStatus}`,'Ananya Sharma','sos');save();render();toast(`${s.id} updated: ${newStatus}.`);}
  function toggleRoad(){state.roads.bridge=!state.roads.bridge;const msg=state.roads.bridge?'North bridge marked blocked; suggested routes now use the south road and east embankment.':'North bridge returned to unverified; confirm before routing.';state.teams.forEach(t=>{if(t.assignment.includes('SOS'))t.route=state.roads.bridge?'South road → east embankment':'North bridge unverified';});logEvent(state.roads.bridge?'Road marked blocked':'Road status set to unverified',msg,'Ananya Sharma','road');save();render();toast(msg);}
  function toggleNetwork(){state.online=!state.online;if(!state.online){state.teams.forEach(t=>{if(t.connectivity==='Online')t.connectivity='Relaying';});logEvent('Network connectivity lost','Demo network switched to offline mode; local messages remain pending.','Ananya Sharma','message');save();render();toast('Offline mode simulated. New messages will stay pending until acknowledged.');}else{state.teams.forEach(t=>{if(t.connectivity==='Relaying'||t.connectivity==='Waiting to sync')t.connectivity='Online';});logEvent('Gateway connectivity restored','Pending messages syncing to gateway.','Ananya Sharma','message');let count=0;state.messages.forEach(m=>{if(!m.ack){m.status='Delivered';m.ack=true;m.ackAt=now();if(!m.hops)m.hops=1;if(m.linkedSos){const linked=state.sos.find(s=>s.id===m.linkedSos);if(linked)linked.communication='Delivered';}count++;}});state.lastSync=now();if(count)logEvent('Messages synced with acknowledgement',`${count} message${count===1?'':'s'} delivered · gateway acknowledgements recorded`,'Gateway simulator','message');save();render();toast(count?`Connectivity restored; ${count} messages synced with gateway acknowledgement.`:'Connectivity restored. No messages were waiting to sync.');}}
  function addMessage({title,body,priority='Normal',sender='Ananya Sharma'}){const msg={id:makeId('MSG'),title:String(title).trim(),body:String(body).trim(),sender,priority,created:now(),status:state.online?'Pending':'Pending',hops:0,ack:false};state.messages.unshift(msg);if(state.online){msg.status='Delivered';msg.hops=1;msg.ack=true;}logEvent(state.online?'Message delivered with acknowledgement':'Message saved to local queue',`${msg.title} · ${msg.id}${state.online?' · gateway acknowledgement received':' · pending sync'}`,sender,'message');if(!state.online){state.teams.filter(t=>t.connectivity!=='Online').forEach(t=>t.connectivity='Waiting to sync');}state.lastSync=state.online?now():state.lastSync;save();render();toast(state.online?'Message sent and gateway acknowledged it.':'Message saved locally. Pending until a relay or gateway acknowledgement.');}
  function relayMessage(id){const m=state.messages.find(x=>x.id===id);if(!m||m.ack)return;if(state.online){toast('Gateway is online. Sync the queue to record an acknowledgement.');return;}m.status='Relayed';m.hops=Math.max(1,m.hops+2);m.relayedAt=now();logEvent('Message relayed between devices',`${m.id} · ${m.hops} hops · awaiting gateway acknowledgement`,'Relay simulator','message');save();render();toast(`${m.id} relayed via nearby responder devices; still awaiting acknowledgement.`);}
  function syncMessages(){if(!state.online){toast('Restore connectivity before syncing to the gateway.',true);return;}let count=0;state.messages.forEach(m=>{if(!m.ack){m.status='Delivered';m.ack=true;m.ackAt=now();if(!m.hops)m.hops=1;if(m.linkedSos){const linked=state.sos.find(s=>s.id===m.linkedSos);if(linked)linked.communication='Delivered';}count++;}});state.teams.forEach(t=>{if(t.connectivity==='Waiting to sync')t.connectivity='Online';});state.lastSync=now();if(count)logEvent('Messages synced with acknowledgement',`${count} message${count===1?'':'s'} delivered · gateway acknowledgements recorded`,'Gateway simulator','message');save();render();toast(count?`${count} messages received gateway acknowledgement.`:'No messages were waiting for acknowledgement.');}
  function openFieldDialog(teamId){const t=team(teamId),dlg=$('#detailDialog');dlg.innerHTML=`<div class="dialog-head"><div><div class="eyebrow">FIELD UPDATE</div><h2>${t?`Update from ${esc(t.name)}`:'Log a field update'}</h2><p>Share a change to the ground picture with the incident team.</p></div><button class="dialog-close" data-close aria-label="Close">×</button></div><form id="fieldForm"><div class="form-grid"><div class="field"><label for="fieldVillage">Village</label><select name="village" id="fieldVillage">${state.villages.map(v=>`<option value="${v.id}">${esc(v.name)}</option>`).join('')}</select></div><div class="field"><label for="fieldType">Update type</label><select name="type" id="fieldType"><option>Water level rising</option><option>Road blocked</option><option>People contacted</option><option>Shelter status</option><option>Other field report</option></select></div><div class="field full"><label for="fieldNote">Details</label><textarea id="fieldNote" name="note" required maxlength="220" placeholder="What has changed? Include location and time observed."></textarea></div></div><div class="inline-note" style="margin-top:11px">If offline, the update is stored in the local message queue and will remain pending.</div><div class="dialog-actions"><button type="button" class="button ghost" data-close>Cancel</button><button class="button primary">Save field update</button></div></form>`;openDialog(dlg);$('#fieldForm').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.currentTarget),v=village(fd.get('village')),type=fd.get('type'),detail=`${v.name} · ${fd.get('note')}`;logEvent(type,detail,t?.name||'Ananya Sharma','field');if(type==='Road blocked')toggleRoad();if(type==='People contacted')v.contacted=true;addMessage({title:type,body:detail,priority:'High',sender:t?.name||'Ananya Sharma'});dlg.close();});}
  function approveAlert(id){const a=state.alerts.find(x=>x.id===id);if(!a)return;a.status='Published';a.updated=now();logEvent('Public alert approved and published',`${a.title} · ${a.area}`,'Ananya Sharma','alert');save();render();toast('Public alert approved and published.');}
  function openAlertDialog(id){const a=state.alerts.find(x=>x.id===id),dlg=$('#detailDialog');dlg.innerHTML=`<div class="dialog-head"><div><div class="eyebrow">OPERATOR ALERT DRAFT</div><h2>${a?'Edit public alert':'Draft a public alert'}</h2><p>Private citizen data is never included in public alerts.</p></div><button class="dialog-close" data-close aria-label="Close">×</button></div><form id="alertForm"><div class="form-grid"><div class="field full"><label for="alertTitle">Title</label><input id="alertTitle" name="title" maxlength="90" required value="${esc(a?.title||'')}" placeholder="Clear, actionable safety update"></div><div class="field full"><label for="alertBody">Public message</label><textarea id="alertBody" name="body" maxlength="320" required placeholder="Approved warning, shelter information or safe-route update">${esc(a?.body||'')}</textarea></div><div class="field"><label for="alertArea">Area</label><input id="alertArea" name="area" value="${esc(a?.area||'Kosi Basin')}" maxlength="80" required></div><div class="field"><label for="alertSource">Source</label><input id="alertSource" name="source" value="${esc(a?.source||'Incident command')}" maxlength="60" required></div></div><div class="dialog-actions"><button type="button" class="button ghost" data-close>Cancel</button><button class="button primary">Save draft for approval</button></div></form>`;openDialog(dlg);$('#alertForm').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.currentTarget);if(a){Object.assign(a,{title:fd.get('title'),body:fd.get('body'),area:fd.get('area'),source:fd.get('source'),updated:now()});}else{state.alerts.unshift({id:makeId('ALT'),title:fd.get('title'),body:fd.get('body'),area:fd.get('area'),source:fd.get('source'),status:'Draft',created:now(),updated:now()});}logEvent('Public alert draft saved','Awaiting operator approval before publication.','Ananya Sharma','alert');save();dlg.close();render();toast('Alert saved as a draft. Approve it to publish.');});}
  function openDialog(dlg){dlg.showModal();$$('[data-close]',dlg).forEach(b=>b.addEventListener('click',()=>dlg.close()));dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close();},{once:true});}
  function downloadFile(name,content,type='application/json'){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function downloadReport(){const report={incident:state.incident,exportedAt:now(),notice:'All scenario data is simulated for demonstration. Population and route information are estimates.',villages:state.villages,sos:state.sos.map(s=>({...s,village:village(s.villageId)?.name,team:team(s.teamId)?.name||null})),teams:state.teams,messages:state.messages,alerts:state.alerts.map(({id,title,area,status,source,created,updated})=>({id,title,area,status,source,created,updated})),eventLog:state.events};downloadFile('Rakshak-incident-report.json',JSON.stringify(report,null,2));toast('Incident report exported as JSON.');}
  function downloadVillages(){const rows=[['Village','District','Risk score','Exposure','Estimated population','Access status','Open SOS','Warning sent','Team contacted','Risk factors'],...state.villages.map(v=>[v.name,v.district,v.risk,v.exposure,v.pop,v.access,state.sos.filter(s=>s.villageId===v.id&&!['Assistance complete','Unable to reach'].includes(s.status)).length,v.warned?'Yes':'No',v.contacted?'Yes':'No',v.factors.join('; ')])];const csv=rows.map(row=>row.map(cell=>`"${String(cell).replaceAll('"','""')}"`).join(',')).join('\r\n');downloadFile('Rakshak-village-risk.csv',csv,'text/csv');toast('Village risk list exported as CSV.');}
  $('#networkToggle').addEventListener('click',toggleNetwork);$('#publicAlertBtn').addEventListener('click',()=>go('public'));$('#menuToggle').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));$('#mainNav').addEventListener('click',e=>{const btn=e.target.closest('[data-page]');if(btn)go(btn.dataset.page);});$('.brand').addEventListener('click',e=>{e.preventDefault();go('home');});
  window.addEventListener('scroll',()=>{const button=$('#floatingSOS');if(button)button.classList.toggle('show',window.scrollY>340);},{passive:true});
  render();
  connectDatabase();
<<<<<<< HEAD
  try{const flash=sessionStorage.getItem('RakshakFlash');if(flash){sessionStorage.removeItem('RakshakFlash');toast(flash);}}catch{}
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js?v=9').catch(() => {});
=======
  try{const flash=sessionStorage.getItem('rakhshakFlash');if(flash){sessionStorage.removeItem('rakhshakFlash');toast(flash);}}catch{}
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js?v=10').catch(() => {});
>>>>>>> c6fb400426897a8e758b31e8f6b9f88e8ec9a94a
})();
