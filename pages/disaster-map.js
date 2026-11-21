// Edit this file to change the disaster map page layout.
window.RakhshakPages=window.RakhshakPages||{};window.RakhshakPages.map=function(ctx){const {state,esc,timestamp,ago,village,team,totalPeople,openSos,unresolved,pendingMessages,metric,statusClass,statusChip,eventRows,pageHead,mapSvg,getMapSelection,statuses,sosCard,messageChip,filteredReportEvents}=ctx;
    const selected=getMapSelection();
    const layers=[['flood','Flood extent','Bhuvan-style replay · observed '+ago(state.lastSync),'SIMULATED · MEDIUM'],['villages','Village risk','Risk model · updated '+ago(state.lastSync),'ESTIMATE'],['sos','SOS requests','Citizen reports · received '+ago(state.lastSync),'USER REPORTS'],['teams','Rescue teams','Vehicle fixes · sync '+ago(state.lastSync),'SIMULATED'],['shelters','Shelters','Field desk confirmation · '+ago(state.lastSync),'FIELD VERIFIED'],['fire','Fire hotspots','NASA FIRMS replay · checked '+ago(state.lastSync),'NO OBSERVATION · N/A'],['earthquake','Seismic alert','USGS feed reference · checked '+ago(state.lastSync),'NO ALERT · N/A']];
    const layerRows=layers.map(([key,name,description,status])=>`<label class="layer-row">
      <input type="checkbox" data-layer-toggle="${key}" ${state.layers[key]?'checked':''}>
      <span class="layer-copy">
      <b>${name}</b>
      <small>${description.replace('${ago(state.lastSync)}',ago(state.lastSync))}</small>
      </span>
      <span class="layer-state ${status.includes('NO ')?'unavailable':''}">${status}</span>
      </label>`).join('');
    const selectionHtml=selected?`<div class="map-detail">
      <b>${esc(selected.title)}</b>
      <p>${esc(selected.detail)}</p>
      </div>`:`<div class="map-detail">
      <b>Map inspection</b>
      <p>Select a marker to inspect its shared incident record. Mark the north bridge blocked or unverified from the map.</p>
      </div>`;
    return `${pageHead('GEO SPATIAL PICTURE','Disaster Map','Review hazard layers, affected communities and field response locations.',`<button class="button" data-action="toggle-road">${state.roads.bridge?'↶ &nbsp;Reopen bridge':'⊘ &nbsp;Flag north bridge'}</button>
      <button class="button primary" data-action="toggle-compare">◐ &nbsp;Compare imagery</button>`)}
    <div class="page-two-col">
      <section class="card">
      <div class="card-head">
      <div>
      <div class="eyebrow">${esc(state.incident.area.toUpperCase())}</div>
      <h2>${esc(state.incident.type)} extent & response map</h2>
      <p>Observed river context with estimated flood impact · SIMULATED REPLAY</p>
      </div>
      <span class="tag">◉ &nbsp;${state.roads.bridge?'ROUTE UPDATED':'ROUTE SUGGESTED'}</span>
      </div>
      <div class="map-full">${mapSvg('full')}<div class="map-controls">
      <span class="map-control">ILLUSTRATIVE MAP</span>
      <span class="map-control">NOT TO SCALE</span>
      </div>
      </div>
      <div class="timeline-strip">
      <span>09:00</span>
      <div class="timeline-line">
      </div>
      <span>11:30</span>
      <span>NOW</span>
      </div>
      <div class="compare-control">
      <span>BEFORE</span>
      <input type="range" min="0" max="100" value="${state.compare}" data-compare-range aria-label="Before and after comparison slider">
      <span>AFTER</span>
      <span class="mono">${state.compare}%</span>
      </div>
      <div class="map-legend">
      <span class="legend-item">
      <i class="legend-swatch">
      </i> Flood area · estimated</span>
      <span class="legend-item">
      <i class="legend-dot village">
      </i> Village</span>
      <span class="legend-item">
      <i class="legend-dot">
      </i> SOS</span>
      <span class="legend-item">
      <i class="legend-dot team">
      </i> Team</span>
      <span class="legend-item">
      <i class="legend-dot shelter">
      </i> Shelter</span>
      </div>
      </section>
    <aside class="card map-sidebar">
      <div class="card-head" style="padding:2px 0 10px">
      <div>
      <div class="eyebrow">MAP CONTROLS</div>
      <h2>Layers & filters</h2>
      </div>
      <button class="more-link" data-action="reset-layers">Reset</button>
      </div>
      <input class="filter-input" type="search" placeholder="Find village or case…" data-map-search>
      <div class="layer-title">INCIDENT LAYERS</div>${layerRows}<div class="layer-title">SELECTED FEATURE</div>${selectionHtml}<div class="layer-title">ROUTE CONDITION</div>
      <div class="map-detail">
      <b>${state.roads.bridge?'North bridge · blocked':'North bridge · unverified'}</b>
      <p>${state.roads.bridge?'Suggested route now avoids the north crossing via the east embankment.':'No verified closure report. Routes crossing this segment are suggested and unverified.'} Never treat a suggested route as guaranteed safe.</p>
      </div>
      <div class="layer-title">DATA PROVENANCE</div>
      <div class="inline-note">
      <b>Flood extent</b> · Bhuvan-style replay layer<br>Observation: ${ago(state.lastSync)} · Confidence: Medium<br>All layers in this demo are SIMULATED or clearly marked.</div>
      </aside>
      </div>`;
  };



