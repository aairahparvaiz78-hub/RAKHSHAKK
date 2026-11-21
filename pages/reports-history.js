// Edit this file to change the reports and history page layout.
window.RakhshakPages=window.RakhshakPages||{};window.RakhshakPages.reports=function(ctx){const {state,esc,timestamp,ago,village,team,totalPeople,openSos,unresolved,pendingMessages,metric,statusClass,statusChip,eventRows,pageHead,mapSvg,getMapSelection,statuses,sosCard,messageChip,filteredReportEvents}=ctx;const done=state.sos.filter(s=>s.status==='Assistance complete'),contacted=state.sos.filter(s=>['Contacted','Assistance complete'].includes(s.status)),events=filteredReportEvents();const f=state.filters;return `${pageHead('OPERATIONAL RECORD','Reports & History','A traceable incident record of alerts, assignments, field reports and confirmed outcomes.',`<button class="button" data-action="print-report">▤ &nbsp;Print report</button>
      <button class="button primary" data-action="export-report">↓ &nbsp;Export report</button>`)}<div class="metric-grid">${metric('SOS requests',state.sos.length,`${unresolved().length} unresolved · ${done.length} complete`,'!')}${metric('People contacted',contacted.reduce((n,s)=>n+s.people,0),'Contacted or assistance complete','↗','good')}${metric('Messages acknowledged',state.messages.filter(m=>m.ack).length,`${state.messages.filter(m=>!m.ack).length} pending acknowledgement`,'⌁')}${metric('Villages monitored',state.villages.length,`${state.villages.filter(v=>v.warned).length} received a warning`,'⌂')}</div>
      <div class="report-grid">
      <section class="card">
      <div class="card-head">
      <div>
      <div class="eyebrow">AUDIT TRAIL</div>
      <h2>Incident timeline</h2>
      <p>Actor and timestamp are recorded for each update</p>
      </div>
      <span class="tag">${events.length} MATCHING EVENTS</span>
      </div>
      <div class="report-timeline">${events.map(e=>`<div class="timeline-event">
      <time>${timestamp(e.created)}<br>${new Date(e.created).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</time>
      <i class="event-dot">
      </i>
      <div class="event-copy">
      <b>${esc(e.title)}</b>
      <p>${esc(e.detail)} · ${esc(e.actor)}</p>
      </div>
      </div>`).join('')||'<div class="empty-state">No activity matches these filters.</div>'}</div>
      </section>
      <aside>
      <section class="card">
      <div class="card-head">
      <div>
      <div class="eyebrow">OUTCOME SNAPSHOT</div>
      <h2>Response summary</h2>
      </div>
      <span class="tag">SIMULATED</span>
      </div>
      <div class="report-stat-grid">
      <div class="report-stat">
      <b>${totalPeople().toLocaleString()}</b>
      <span>estimated population in monitored villages</span>
      </div>
      <div class="report-stat">
      <b>${done.reduce((n,s)=>n+s.people,0)}</b>
      <span>people in confirmed complete cases</span>
      </div>
      <div class="report-stat">
      <b>${state.sos.filter(s=>s.status==='Team en route').length}</b>
      <span>cases with team en route</span>
      </div>
      <div class="report-stat">
      <b>${state.messages.filter(m=>m.status==='Relayed').length}</b>
      <span>messages relayed, awaiting gateway ack</span>
      </div>
      </div>
      </section>
      <section class="card" style="margin-top:13px">
      <div class="card-head">
      <div>
      <div class="eyebrow">RESPONSE COVERAGE</div>
      <h2>Village risk by priority</h2>
      </div>
      </div>
      <div class="bar-list">${state.villages.slice().sort((a,b)=>b.risk-a.risk).map(v=>`<div class="bar-row">
      <span>${esc(v.name)}</span>
      <div class="bar-track">
      <i style="width:${v.risk}%">
      </i>
      </div>
      <b>${v.risk}</b>
      </div>`).join('')}</div>
      </section>
      <section class="card" style="margin-top:13px">
      <div class="card-head">
      <div>
      <div class="eyebrow">MESSAGE HEALTH</div>
      <h2>Delivery acknowledgements</h2>
      </div>
      </div>
      <div class="bar-list">
      <div class="bar-row">
      <span>Delivered</span>
      <div class="bar-track">
      <i style="width:${state.messages.length?state.messages.filter(m=>m.ack).length/state.messages.length*100:0}%">
      </i>
      </div>
      <b>${state.messages.filter(m=>m.ack).length}</b>
      </div>
      <div class="bar-row">
      <span>Relayed</span>
      <div class="bar-track">
      <i style="width:${state.messages.length?state.messages.filter(m=>m.status==='Relayed').length/state.messages.length*100:0}%;background:linear-gradient(90deg,#78aab9,#95c6d5)">
      </i>
      </div>
      <b>${state.messages.filter(m=>m.status==='Relayed').length}</b>
      </div>
      <div class="bar-row">
      <span>Pending</span>
      <div class="bar-track">
      <i style="width:${state.messages.length?pendingMessages().length/state.messages.length*100:0}%;background:linear-gradient(90deg,#cb9d64,#e3bf81)">
      </i>
      </div>
      <b>${pendingMessages().length}</b>
      </div>
      </div>
      </section>
      </aside>
      </div>
      <section class="card" style="margin-top:14px">
      <div class="card-head">
      <div>
      <div class="eyebrow">FILTERABLE RECORDS</div>
      <h2>Incident activity filters</h2>
      <p>Filter the audit trail by incident, village, team, message status and date.</p>
      </div>
      <div class="table-toolbar">
      <select class="select-input" data-report-filter="reportIncident">
      <option ${f.reportIncident==='Current incident'?'selected':''}>Current incident</option>
      <option ${f.reportIncident==='All incidents'?'selected':''}>All incidents</option>
      </select>
      <select class="select-input" data-report-filter="reportVillage">
      <option>All villages</option>${state.villages.map(v=>`<option ${f.reportVillage===v.name?'selected':''}>${esc(v.name)}</option>`).join('')}</select>
      <select class="select-input" data-report-filter="reportTeam">
      <option>All teams</option>${state.teams.map(t=>`<option ${f.reportTeam===t.name?'selected':''}>${esc(t.name)}</option>`).join('')}</select>
      <select class="select-input" data-report-filter="reportMessage">
      <option>All message statuses</option>
      <option ${f.reportMessage==='Pending'?'selected':''}>Pending</option>
      <option ${f.reportMessage==='Relayed'?'selected':''}>Relayed</option>
      <option ${f.reportMessage==='Delivered'?'selected':''}>Delivered</option>
      </select>
      <select class="select-input" data-report-filter="reportDate">
      <option ${f.reportDate==='Last 24 hours'?'selected':''}>Last 24 hours</option>
      <option ${f.reportDate==='Last 7 days'?'selected':''}>Last 7 days</option>
      <option ${f.reportDate==='All dates'?'selected':''}>All dates</option>
      </select>
      </div>
      </div>
      </section>`;};



