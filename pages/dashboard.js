// Edit this file to change the dashboard page layout.
window.RakhshakPages=window.RakhshakPages||{};window.RakhshakPages.dashboard=function(ctx){const {state,esc,timestamp,ago,village,team,totalPeople,openSos,unresolved,pendingMessages,metric,statusClass,statusChip,eventRows,pageHead,mapSvg,getMapSelection,statuses,sosCard,messageChip,filteredReportEvents}=ctx;
    const urgent=unresolved().filter(s=>s.priority>=75).length,assigned=state.teams.filter(t=>t.status!=='Available').length;
    const top=state.villages.slice().sort((a,b)=>b.risk-a.risk).slice(0,3);
    const forecastRows=(state.forecasts||[]).slice().sort((a,b)=>(b.horizons?.['24h']?.riskIndex||0)-(a.horizons?.['24h']?.riskIndex||0)).slice(0,4);
    const scoreCell=(forecast,key)=>{
      const value=forecast.horizons?.[key];
      if(!value)return '<td><span class="forecast-score empty">—</span></td>';
      const score=Math.max(0,Math.min(100,Number(value.riskIndex)||0));
      return '<td><span class="forecast-score '+String(value.category||'monitor').toLowerCase()+'">'+score+'</span><small>'+esc(value.category||'Monitor')+'</small></td>';
    };
    const forecastSource=forecastRows.some(row=>row.isSimulated)?'SIMULATED READINGS':'SCREENING OUTLOOK';
    const forecastPanel='<section class="forecast-panel card">'+
      '<div class="forecast-panel-head"><div><div class="eyebrow">FLOOD RISK OUTLOOK</div><h2>What may need attention next</h2><p>Risk index by village using recorded rainfall, river trend, soil and access inputs.</p></div>'+
      '<div class="forecast-actions"><span class="forecast-source">'+forecastSource+'</span><button class="button small" data-action="add-observation">＋ Add reading</button><button class="button ghost small" data-action="refresh-forecasts" aria-label="Refresh outlook">↻ Refresh</button></div></div>'+
      (forecastRows.length?'<div class="forecast-table-wrap"><table class="forecast-table"><thead><tr><th>Village</th><th>6 hours</th><th>24 hours</th><th>72 hours</th></tr></thead><tbody>'+
      forecastRows.map(forecast=>'<tr><th scope="row"><b>'+esc(forecast.villageName)+'</b><small>Baseline '+forecast.baselineRisk+'/100 · '+esc(forecast.confidence||'Low confidence')+'</small></th>'+scoreCell(forecast,'6h')+scoreCell(forecast,'24h')+scoreCell(forecast,'72h')+'</tr>').join('')+
      '</tbody></table></div>':'<div class="forecast-empty">Forecast is loading. Start the Rakhshak backend to calculate the outlook.</div>')+
      '<div class="forecast-disclaimer"><b>Prototype screening estimate</b> · not a probability, evacuation instruction or official warning. Source: '+esc(forecastRows[0]?.source||'awaiting readings')+'.</div></section>';
    return `${pageHead('RESPONSE OVERVIEW','Good morning, Ananya','Your response picture for the active incident. Updates from the field appear here as they arrive.',`<button class="button" data-page="reports">↗ &nbsp;Incident report</button>
      <button class="button primary" data-action="new-sos">＋ &nbsp;Log an SOS</button>`)}
      <section class="dashboard-banner">
      <div class="banner-left">
      <div class="banner-kicker">
      <i class="live-dot">
      </i>${esc(state.incident.status.toUpperCase())} INCIDENT <span>·</span> ${esc(state.incident.type.toUpperCase())}</div>
      <h2>${esc(state.incident.name)} <span style="color:#b8cb91">/</span> ${esc(state.incident.area)}</h2>
      <p>${esc(state.incident.source)} &nbsp;·&nbsp; Update ${ago(state.lastSync)}</p>
      </div>
      <div class="banner-right">
      <div class="banner-stat">
      <b>${state.villages.length}</b>
      <small>villages monitored</small>
      </div>
      <div class="banner-divider">
      </div>
      <div class="banner-stat">
      <b>${totalPeople().toLocaleString()}</b>
      <small>population estimate</small>
      </div>
      <div class="banner-divider">
      </div>
      <div class="banner-stat">
      <b>${state.teams.length}</b>
      <small>response teams</small>
      </div>
      </div>
      </section>
      ${forecastPanel}
      <div class="metric-grid">${metric('Unresolved SOS',unresolved().length,`<span class="critical">${urgent} high priority</span> · needs attention`,'!','')}${metric('People contacted',state.sos.filter(s=>['Contacted','Assistance complete'].includes(s.status)).reduce((n,s)=>n+s.people,0),'Across active rescue cases','↗','good')}${metric('Teams in field',assigned,`${state.teams.length-assigned} available for dispatch`,'⌖','')}${metric('Messages awaiting sync',pendingMessages().length,`${state.messages.filter(m=>m.status==='Relayed').length} relayed · ${state.messages.filter(m=>m.status==='Delivered').length} acknowledged`,'⌁','') }</div>
      <div class="dash-grid">
      <section class="card">
      <div class="card-head">
      <div>
      <div class="eyebrow">SITUATION MAP</div>
      <h2>Flood impact & response</h2>
      <p>Observed layer, village estimates and live response locations</p>
      </div>
      <button class="more-link" data-page="map">Open full map ↗</button>
      </div>
      <div class="mini-map-wrap">${mapSvg('mini')}</div>
      <div class="map-legend">
      <span class="legend-item">
      <i class="legend-swatch">
      </i> Flood extent · estimated</span>
      <span class="legend-item">
      <i class="legend-dot village">
      </i> Village</span>
      <span class="legend-item">
      <i class="legend-dot">
      </i> SOS</span>
      <span class="legend-item">
      <i class="legend-dot team">
      </i> Rescue team</span>
      <span class="legend-item">
      <i class="legend-dot shelter">
      </i> Shelter</span>
      </div>
      <div class="map-card-bottom">
      <span>SIMULATED REPLAY · HYDROLOGY MODEL · ${timestamp(state.lastSync)}</span>
      <span>Confidence: Medium · <button class="more-link" data-page="map">Layer details</button>
      </span>
      </div>
      </section>
        <section class="card">
      <div class="card-head">
      <div>
      <div class="eyebrow">NEEDS ATTENTION</div>
      <h2>Priority villages</h2>
      <p>Explainable risk score · highest first</p>
      </div>
      <button class="more-link" data-page="villages">View all ↗</button>
      </div>
      <div class="priority-list">${top.map((v,i)=>`<div class="priority-item">
      <span class="priority-index">0${i+1}</span>
      <div class="priority-copy">
      <b>${esc(v.name)}</b>
      <small>${esc(v.access)} · ${state.sos.filter(s=>s.villageId===v.id&&!['Assistance complete','Unable to reach'].includes(s.status)).length} open SOS</small>
      </div>
      <div class="priority-score">${v.risk}<small>RISK</small>
      </div>
      </div>`).join('')}</div>
      <div class="card-head" style="border-top:1px solid var(--line);padding-top:12px">
      <span class="subtle" style="font-size:8px">Risk considers exposure, access and field reports</span>
      <button class="more-link" data-page="sos">SOS queue ↗</button>
      </div>
      </section>
      </div>
      <div class="dash-lower">
      <section class="card">
      <div class="card-head">
      <div>
      <div class="eyebrow">FIELD PICTURE</div>
      <h2>Village risk snapshot</h2>
      </div>
      <button class="more-link" data-page="villages">Village risk ↗</button>
      </div>
      <div class="village-summary">${top.slice(0,3).map(v=>`<div class="village-summary-row">
      <div>
      <b>${esc(v.name)}</b>
      <small>${esc(v.exposure)} · est. ${v.pop.toLocaleString()} people</small>
      </div>
      <div class="risk-bar">
      <i style="width:${v.risk}%">
      </i>
      </div>
      <span class="risk-label">${v.risk} / 100</span>
      </div>`).join('')}</div>
      </section>
      <section class="card activity-card">
      <div class="card-head">
      <div>
      <div class="eyebrow">LATEST UPDATES</div>
      <h2>Incident activity</h2>
      </div>
      <button class="more-link" data-page="reports">Full timeline ↗</button>
      </div>${eventRows(state.events)}</section>
      </div>`;
  };



