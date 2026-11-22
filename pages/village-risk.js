// Edit this file to change the village risk page layout.
window.RakshakPages=window.RakshakPages||{};window.RakshakPages.villages=function(ctx){const {state,esc,timestamp,ago,village,team,totalPeople,openSos,unresolved,pendingMessages,metric,statusClass,statusChip,eventRows,pageHead,mapSvg,getMapSelection,statuses,sosCard,messageChip,filteredReportEvents}=ctx;
    let rows=state.villages.filter(v=>`${v.name} ${v.district} ${v.exposure}`.toLowerCase().includes((state.filters.villageSearch||'').toLowerCase()));
    rows=rows.sort((a,b)=>state.filters.riskSort==='Lowest risk'?a.risk-b.risk:b.risk-a.risk);
    return `${pageHead('COMMUNITY PRIORITY','Village Risk','Risk is an explainable estimate. Use access status, SOS urgency and exposure to guide attention.',`<button class="button" data-action="download-villages">↓ &nbsp;Export village list</button>`)}<div class="metric-grid">${metric('Affected villages',state.villages.length,'Within the active incident boundary','⌂')}${metric('Estimated population',totalPeople().toLocaleString(),'Population estimate · not a live count','◌')}${metric('At risk of isolation',state.villages.filter(v=>v.access==='At risk of isolation').length,'Access routes need field review','⌁','critical')}${metric('Warnings received',state.villages.filter(v=>v.warned).length,`of ${state.villages.length} monitored villages`,'↗','good')}</div>
      <section class="card table-card">
      <div class="card-head">
      <div>
      <div class="eyebrow">VILLAGE REGISTER</div>
      <h2>Village-level risk & priority</h2>
      <p>Factors shown for each score · latest field picture ${ago(state.lastSync)}</p>
      </div>
      <div class="table-toolbar">
      <input class="filter-input" type="search" placeholder="Search villages…" value="${esc(state.filters.villageSearch||'')}" data-village-search aria-label="Search villages">
      <select class="select-input" data-risk-sort aria-label="Sort villages">
      <option ${state.filters.riskSort!=='Lowest risk'?'selected':''}>Highest risk</option>
      <option ${state.filters.riskSort==='Lowest risk'?'selected':''}>Lowest risk</option>
      </select>
      </div>
      </div>
      <div class="table-wrap">
      <table class="data-table">
      <thead>
      <tr>
      <th>VILLAGE</th>
      <th>EXPOSURE / RISK</th>
      <th>EST. POPULATION</th>
      <th>OPEN SOS</th>
      <th>ACCESS</th>
      <th>WARNING / CONTACT</th>
      <th>FACTORS</th>
      </tr>
      </thead>
      <tbody>${rows.map(v=>`<tr>
      <td>
      <div class="village-cell">
      <span class="village-avatar">${esc(v.name[0])}</span>
      <div>
      <strong>${esc(v.name)}</strong>
      <small>${esc(v.district)}</small>
      </div>
      </div>
      </td>
      <td>
      <span class="status-chip ${v.risk>=75?'chip-high':v.risk>=55?'chip-medium':'chip-low'}">${v.risk>=75?'HIGH':v.risk>=55?'ELEVATED':'MONITOR'}</span>
      <small>${esc(v.exposure)} · score ${v.risk}/100</small>
      </td>
      <td>
      <strong>${v.pop.toLocaleString()}</strong>
      <small>estimate</small>
      </td>
      <td>
      <strong>${state.sos.filter(s=>s.villageId===v.id&&!['Assistance complete','Unable to reach'].includes(s.status)).length}</strong>
      <small>requests</small>
      </td>
      <td>${v.access==='Reachable'?'<span class="tag chip-low">Reachable</span>':v.access==='At risk of isolation'?'<span class="tag chip-high">At risk</span>':'<span class="tag chip-medium">Unverified</span>'}</td>
      <td>
      <span class="tag ${v.warned?'chip-low':'chip-muted'}">${v.warned?'Warning sent':'No warning'}</span>
      <small>${v.contacted?'Team contacted':'Awaiting team contact'}</small>
      </td>
      <td class="factors">${esc(v.factors.join(' · '))}</td>
      </tr>`).join('')||'<tr> <td colspan="7" class="empty-state">No villages match this search.</td> </tr>'}</tbody>
      </table>
      </div>
      <div class="card-head">
      <span class="subtle" style="font-size:8px">Risk score considers hazard exposure, reported urgency and access reliability.</span>
      <span class="tag">ESTIMATES · SIMULATED DATA</span>
      </div>
      </section>`;
  };




