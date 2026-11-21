// Edit this file to change the public alerts page layout.
window.RakhshakPages=window.RakhshakPages||{};window.RakhshakPages.public=function(ctx){const {state,esc,timestamp,ago,village,team,totalPeople,openSos,unresolved,pendingMessages,metric,statusClass,statusChip,eventRows,pageHead,mapSvg,getMapSelection,statuses,sosCard,messageChip,filteredReportEvents}=ctx;const published=state.alerts.filter(a=>a.status==='Published'),drafts=state.alerts.filter(a=>a.status==='Draft');return `${pageHead('PUBLIC INFORMATION','Safety updates','Public information is approved by an authorized operator before it appears here.',`<button class="button" data-page="dashboard">← &nbsp;Back to command center</button>
      <button class="button primary" data-action="new-alert">＋ &nbsp;Draft public alert</button>`)}<section class="public-preview">
      <div class="public-brand">RAKHSHAK · PUBLIC SAFETY</div>
      <h2>Community safety updates</h2>
      <p>Follow official instructions from responders. Routes are suggestions only and may change with conditions. If you need urgent help, use the SOS form or contact local emergency services.</p>
      </section>
      <div class="page-two-col">
      <section>
      <div class="section-toolbar">
      <div>
      <h2>Published alerts</h2>
      <p>Public page contains no private citizen SOS details.</p>
      </div>
      <span class="tag chip-low">${published.length} APPROVED</span>
      </div>
      <div class="public-list">${published.map(a=>`<article class="card public-alert-card">
      <div>
      <span class="tag chip-low">● PUBLISHED</span>
      <h3 style="font-size:11px;margin:9px 0 0">${esc(a.title)}</h3>
      <p>${esc(a.body)}</p>
      <small>${esc(a.area)} · Source: ${esc(a.source)} · Published ${ago(a.updated)}</small>
      </div>
      </article>`).join('')||'<div class="card empty-state">No active public alerts.</div>'}</div>
      <div class="inline-note" style="margin-top:12px">Suggested routes are not guaranteed safe. Check latest field guidance and treat stale or unverified information carefully.</div>
      </section>
      <aside class="card">
      <div class="card-head">
      <div>
      <div class="eyebrow">OPERATOR REVIEW</div>
      <h2>Drafts awaiting approval</h2>
      <p>Only the authorized operator can publish a warning.</p>
      </div>
      <span class="tag chip-medium">${drafts.length} DRAFT</span>
      </div>${drafts.map(a=>`<div class="alert-approval">
      <h3>${esc(a.title)}</h3>
      <p>${esc(a.body)}</p>
      <small class="subtle">Area: ${esc(a.area)} · Source: ${esc(a.source)}</small>
      <div style="margin-top:11px">
      <button class="button primary small" data-action="approve-alert" data-id="${a.id}">✓ Approve & publish</button>
      <button class="button small ghost" data-action="edit-alert" data-id="${a.id}">Edit draft</button>
      </div>
      </div>`).join('')||'<div class="empty-state">No alerts awaiting approval.</div>'}<div class="card-head" style="border-top:1px solid var(--line);margin-top:10px">
      <span class="subtle" style="font-size:8px">Alert history and approval time are logged.</span>
      <button class="more-link" data-page="reports">Audit trail ↗</button>
      </div>
      </aside>
      </div>`;};



