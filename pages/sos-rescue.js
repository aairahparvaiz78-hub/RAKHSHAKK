// Edit this file to change the SOS and rescue page layout.
window.RakshakPages=window.RakshakPages||{};window.RakshakPages.sos=function(ctx){const {state,esc,timestamp,ago,village,team,totalPeople,openSos,unresolved,pendingMessages,metric,statusClass,statusChip,eventRows,pageHead,mapSvg,getMapSelection,statuses,sosCard,messageChip,filteredReportEvents}=ctx;const visible=state.sos.filter(s=>state.filters.sosStatus==='All requests'||s.status===state.filters.sosStatus);return `${pageHead('CITIZEN REQUESTS & DISPATCH','SOS & Rescue','Create and prioritize requests, assign a team, and confirm what happened on the ground.',`<button class="button" data-action="public-page">↗ &nbsp;Public safety page</button>
      <button class="button primary" data-action="new-sos">＋ &nbsp;Create SOS</button>`)}<div class="inline-note" style="margin-bottom:14px">
      <b>Priority logic:</b> danger indicator + medical need + people affected + village exposure + isolation risk. Scores are transparent demo suggestions; the dispatcher makes the final decision.</div>
      <div class="section-toolbar">
      <div>
      <h2>Active requests <span class="tag">${openSos().length} OPEN</span>
      </h2>
      <p>${state.sos.filter(s=>s.status==='Assistance complete').length} assistance cases confirmed complete · case changes are logged</p>
      </div>
      <select class="select-input" data-sos-filter aria-label="Filter SOS requests">
      <option>All requests</option>${statuses.map(s=>`<option ${state.filters.sosStatus===s?'selected':''}>${s}</option>`).join('')}</select>
      </div>
      <div class="sos-list">${visible.map(sosCard).join('')||'<div class="card empty-state">No SOS requests match this filter.</div>'}</div>
      <section class="card" style="margin-top:14px">
      <div class="card-head">
      <div>
      <div class="eyebrow">CITIZEN ACCESS</div>
      <h2>Request help from a phone</h2>
      <p>Open the form as a citizen; it creates a case in this shared incident queue.</p>
      </div>
      <button class="button primary" data-action="new-sos">Open citizen SOS form ↗</button>
      </div>
      </section>`;};



