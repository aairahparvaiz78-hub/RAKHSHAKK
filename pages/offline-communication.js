// Edit this file to change the offline communication page layout.
window.RakshakPages=window.RakshakPages||{};window.RakshakPages.offline=function(ctx){const {state,esc,timestamp,ago,village,team,totalPeople,openSos,unresolved,pendingMessages,metric,statusClass,statusChip,eventRows,pageHead,mapSvg,getMapSelection,statuses,sosCard,messageChip,filteredReportEvents}=ctx;const msgRows=state.messages.map(m=>`<div class="message-row">
      <span class="message-priority">${m.priority==='Urgent'?'!':'⌁'}</span>
      <div class="message-copy">
      <b>${esc(m.title)}</b>
      <p>${esc(m.body)}</p>
      <small>${esc(m.sender)} · ${ago(m.created)} · ${esc(m.id)}</small>
      </div>
      <div class="message-status">${messageChip(m.status)}<small>${m.hops} hop${m.hops===1?'':'s'} · ${m.ack?'ACK RECEIVED':'NO ACK'}</small>${m.status==='Pending'?`<button class="action-link" data-action="relay-message" data-id="${m.id}">Relay ↗</button>`:''}</div>
      </div>`).join('');return `${pageHead('STORE · CARRY · FORWARD','Offline Communication','Queue SOS and field messages locally, relay between responder devices, then sync with acknowledgement.',`<button class="button ${state.online?'':'primary'}" data-action="toggle-network">${state.online?'◉ &nbsp;Simulate network loss':'↗ &nbsp;Restore connectivity'}</button>`)}<div class="offline-banner ${state.online?'online':''}">
      <div>
      <b>${state.online?'Gateway connected · network online':'Network unavailable · local queue active'}</b>
      <span>${state.online?'Messages sync when acknowledged by the gateway.':'New messages remain on this device until a nearby relay or gateway receives them.'}</span>
      </div>
      <span class="tag ${state.online?'chip-low':'chip-high'}">${state.online?'ONLINE':'OFFLINE'}</span>
      </div>
      <div class="message-grid">
      <section class="card">
      <div class="card-head">
      <div>
      <div class="eyebrow">MESSAGE QUEUE</div>
      <h2>Shared incident messages</h2>
      <p>Pending and relayed messages never show delivered without an acknowledgement.</p>
      </div>
      <span class="tag">${pendingMessages().length} NEED SYNC</span>
      </div>
      <div class="message-list">${msgRows||'<div class="empty-state">No messages in this incident.</div>'}</div>
      <div class="card-head" style="border-top:1px solid var(--line);padding-top:12px">
      <span class="subtle" style="font-size:8px">Duplicate message IDs are preserved during reconnect.</span>${state.online&&pendingMessages().length?'<button class="button small primary" data-action="sync-messages">Sync queue · '+pendingMessages().length+'</button>':''}</div>
      </section>
      <aside>
      <section class="card">
      <div class="card-head">
      <div>
      <div class="eyebrow">COMPOSE</div>
      <h2>Send field message</h2>
      <p>Saved locally if offline</p>
      </div>
      </div>
      <form id="messageForm" style="padding:0 14px 14px">
      <div class="form-grid">
      <div class="field full">
      <label for="msgTitle">Subject</label>
      <input id="msgTitle" name="title" required maxlength="70" placeholder="e.g. Road condition update">
      </div>
      <div class="field full">
      <label for="msgBody">Message</label>
      <textarea id="msgBody" name="body" required maxlength="240" placeholder="Share a short operational update">
      </textarea>
      </div>
      <div class="field">
      <label for="msgRecipient">Destination</label>
      <select id="msgRecipient" name="recipient">
      <option>All response teams</option>${state.teams.map(t=>`<option>${esc(t.name)}</option>`).join('')}</select>
      </div>
      <div class="field">
      <label for="msgPriority">Priority</label>
      <select id="msgPriority" name="priority">
      <option>Normal</option>
      <option>High</option>
      <option>Urgent</option>
      </select>
      </div>
      </div>
      <button class="button primary" style="width:100%;justify-content:center;margin-top:12px">${state.online?'Send message':'Save to offline queue'}</button>
      </form>
      </section>
      <section class="card" style="margin-top:13px">
      <div class="card-head">
      <div>
      <div class="eyebrow">DEMO RELAY NETWORK</div>
      <h2>Nearby devices</h2>
      </div>
      <span class="tag">SIMULATED</span>
      </div>
      <div class="relay-diagram">
      <span class="relay-node">C3</span>
      <i class="relay-path">
      </i>
      <span class="relay-node">B2</span>
      <i class="relay-path">
      </i>
      <span class="relay-node">GW</span>
      </div>
      <div class="device-list">${state.teams.map(t=>`<div class="device-row">
      <span class="device-icon">${esc(t.initials)}</span>
      <div>
      <b>${esc(t.name)}</b>
      <small>${esc(t.vehicle)}</small>
      </div>
      <span class="device-state ${t.connectivity==='Waiting to sync'?'off':''}">${esc(t.connectivity.toUpperCase())}</span>
      </div>`).join('')}</div>
      </section>
      </aside>
      </div>
      <div class="inline-note" style="margin-top:14px">
      <b>Prototype note:</b> relay hops are simulated in this browser. No radio, Bluetooth or satellite hardware is connected. NavIC is not implied. Messages become delivered only after the demo gateway records an acknowledgement.</div>`;};



