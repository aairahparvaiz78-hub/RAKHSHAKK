// Edit this file to change the teams and vehicles page layout.
window.RakshakPages=window.RakshakPages||{};window.RakshakPages.teams=function(ctx){const {state,esc,timestamp,ago,village,team,totalPeople,openSos,unresolved,pendingMessages,metric,statusClass,statusChip,eventRows,pageHead,mapSvg,getMapSelection,statuses,sosCard,messageChip,filteredReportEvents}=ctx;return `${pageHead('FIELD OPERATIONS','Teams & Vehicles','Track last-known locations, assignments and communication state. Updates are shared with SOS and map views.',`<button class="button" data-page="map">⌖ &nbsp;View on map</button>
      <button class="button primary" data-action="field-update">＋ &nbsp;Log field update</button>`)}<div class="metric-grid">${metric('Teams tracked',state.teams.length,'Locations may be last-known','⌖')}${metric('On active assignment',state.teams.filter(t=>t.status!=='Available').length,'Shared with SOS queue','↗')}${metric('Devices relaying',state.teams.filter(t=>t.connectivity==='Relaying').length,'Passing messages between teams','⌁')}${metric('Waiting to sync',state.teams.filter(t=>t.connectivity==='Waiting to sync').length,'Location and field notes may be stale','◷')}</div>
      <div class="page-two-col">
      <section class="card">
      <div class="card-head">
      <div>
      <div class="eyebrow">LIVE / LAST KNOWN</div>
      <h2>Response teams</h2>
      <p>Use reassignment to coordinate with the active SOS queue.</p>
      </div>
      <span class="tag">${state.online?'NETWORK CONNECTED':'SIMULATED OFFLINE'}</span>
      </div>
      <div class="team-grid" style="padding:0 14px 14px">${state.teams.map(t=>`<article class="card team-card">
      <div class="team-card-top">
      <span class="team-avatar">${esc(t.initials)}</span>
      <div>
      <b>${esc(t.name)}</b>
      <small>${esc(t.vehicle)}</small>
      </div>
      <span class="team-status status-chip ${t.status==='Available'?'chip-low':'chip-medium'}">${esc(t.status)}</span>
      </div>
      <div class="team-assignment">
      <span class="subtle">CURRENT TASK</span>
      <br>${esc(t.assignment)}<br>
      <span class="vehicle-chip">Route: ${state.roads.bridge&&t.id==='t1'?'East embankment via south road':'Suggested · verify on approach'}</span>
      </div>
      <div class="team-foot">
      <span>⌖ ${esc(t.lastSeen)}</span>
      <span class="${t.connectivity==='Online'?'chip-low':t.connectivity==='Relaying'?'chip-blue':'chip-medium'}">● ${esc(t.connectivity.toUpperCase())}</span>
      </div>
      <div style="display:flex;gap:7px;margin-top:10px">
      <button class="button small" data-action="assign-team" data-id="${t.id}">Change assignment</button>
      <button class="button small ghost" data-action="team-update" data-id="${t.id}">Field update</button>
      </div>
      </article>`).join('')}</div>
      </section>
      <aside>
      <section class="card">
      <div class="card-head">
      <div>
      <div class="eyebrow">ROUTE PLANNING</div>
      <h2>Road conditions</h2>
      </div>
      <span class="tag ${state.roads.bridge?'chip-high':'chip-medium'}">${state.roads.bridge?'1 BLOCKED':'1 UNVERIFIED'}</span>
      </div>
      <div class="priority-list">
      <div class="priority-item">
      <span class="priority-index">!</span>
      <div class="priority-copy">
      <b>North bridge crossing</b>
      <small>${state.roads.bridge?'Reported blocked by dispatch':'Status unverified · no field confirmation'}</small>
      </div>
      <button class="button small" data-action="toggle-road">${state.roads.bridge?'Reopen':'Flag'}</button>
      </div>
      </div>
      <div class="card-head" style="border-top:1px solid var(--line)">
      <span class="subtle" style="font-size:9px">Suggested route to Dharampur</span>
      </div>
      <div style="padding:0 15px 15px;font-size:9px;color:#acb9aa">${state.roads.bridge?'Updated: south road → east embankment. Verify conditions with field team.':'Primary route via north bridge. Crossing status unverified; verify before dispatch.'}</div>
      </section>
      <section class="card" style="margin-top:13px">
      <div class="card-head">
      <div>
      <div class="eyebrow">FIELD UPDATES</div>
      <h2>Latest reports</h2>
      </div>
      <button class="more-link" data-page="reports">History ↗</button>
      </div>${state.events.filter(e=>['field','team','road'].includes(e.kind)).slice(0,3).map(e=>`<div class="activity-row">
      <span class="activity-icon">⌖</span>
      <div class="activity-copy">
      <b>${esc(e.title)}</b>
      <small>${esc(e.detail)} · ${esc(e.actor)}</small>
      </div>
      <time class="activity-time">${ago(e.created)}</time>
      </div>`).join('')||'<div class="empty-state">No field updates yet.</div>'}</section>
      </aside>
      </div>`;};



