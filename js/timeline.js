function setupTimelines() {
  const lineY = { fusion: 75, eu: 135, global: 195 };
  const lineNames = { fusion: 'FUSION AND MARKETS', eu: 'EU RULES', global: 'UN, US AND UK RULES' };
  const audienceOptions = ['all', 'investors', 'eu', 'un'];
  const audienceLabels = { all: 'All', investors: 'Investors', eu: 'EU', un: 'UN' };

  document.querySelectorAll('.timeline-mount').forEach((mount, mountIndex) => {
    const defaultAudience = mount.dataset.audience || 'all';
    const id = `timeline-${mountIndex}`;
    mount.innerHTML = `
      <div class="timeline-filters" role="group" aria-label="Filter timeline events by audience">
        ${audienceOptions.map((audience) => `
          <button type="button" class="filter timeline-filter${audience === defaultAudience ? ' active' : ''}" data-audience="${audience}" aria-pressed="${audience === defaultAudience}">${audienceLabels[audience]}</button>
        `).join('')}
      </div>
      <p class="timeline-scroll-hint">Scroll to see the full timeline →</p>
      <div class="table-scroll timeline-scroll" role="region" aria-label="Fusion materials policy timeline" tabindex="0">
        <svg class="rail-timeline" viewBox="0 0 680 290" role="img" aria-labelledby="${id}-title ${id}-description">
          <title id="${id}-title">Fusion materials policy timeline</title>
          <desc id="${id}-description">Three tracks for fusion and markets, EU rules, and international rules converge at first-plant orders, with remedy-first sourcing and retrofit outcomes.</desc>
          <rect class="time-band cheap" x="60" y="34" width="120" height="222"></rect>
          <rect class="time-band costly" x="180" y="34" width="140" height="222"></rect>
          <rect class="time-band locked" x="320" y="34" width="300" height="222"></rect>
          <text class="band-label" x="66" y="25">Cheap to shape</text>
          <text class="band-label" x="187" y="25">Costly to change</text>
          <text class="band-label" x="330" y="25">Locked in</text>
          <g class="timeline-track" data-track="fusion">
            <path d="M60 75 H430 Q458 75 493 135"></path>
          </g>
          <g class="timeline-track" data-track="eu">
            <path d="M60 135 H493"></path>
          </g>
          <g class="timeline-track global-track" data-track="global">
            <path d="M60 195 H430 Q458 195 493 135"></path>
          </g>
          <path class="timeline-outcome remedy-outcome" d="M493 135 Q535 95 620 82"></path>
          <path class="timeline-outcome retrofit-outcome" d="M493 135 Q535 178 620 194"></path>
          <rect class="procurement-node" x="435" y="119" width="116" height="32" rx="16"></rect>
          <text class="procurement-label" x="493" y="139" text-anchor="middle">First-plant orders</text>
          <text class="outcome-label remedy-label" x="555" y="70">Built in</text>
          <text class="outcome-label retrofit-label" x="552" y="218">Retrofit later</text>
          ${Object.entries(lineY).map(([line, y]) => `<text class="track-label" x="60" y="${y - 25}">${lineNames[line]}</text>`).join('')}
          <g class="year-ticks">
            ${Array.from({ length: 8 }, (_, year) => {
              const x = 60 + year * 80;
              return `<line x1="${x}" y1="252" x2="${x}" y2="258"></line><text x="${x}" y="275" text-anchor="middle">${2025 + year}</text>`;
            }).join('')}
          </g>
          <g class="today-marker">
            <line x1="0" y1="34" x2="0" y2="256"></line>
            <text x="0" y="45">Today</text>
          </g>
          <g class="timeline-markers"></g>
        </svg>
      </div>
      <ol class="timeline-list" aria-label="Timeline events"></ol>
      <p class="timeline-caption">Indicative. Dates come from public announcements; targets may slip. The fork is analytical, not a legal deadline. The gold path means remedy-first sourcing built in from the start.</p>
    `;

    const svg = mount.querySelector('svg');
    const markerGroup = mount.querySelector('.timeline-markers');
    const eventList = mount.querySelector('.timeline-list');
    const currentDate = new Date();
    const todayYear = currentDate.getFullYear() + currentDate.getMonth() / 12;
    const todayX = Math.max(60, Math.min(620, 60 + (todayYear - 2025) * 80));
    const todayMarker = mount.querySelector('.today-marker');
    todayMarker.querySelector('line').setAttribute('x1', String(todayX));
    todayMarker.querySelector('line').setAttribute('x2', String(todayX));
    todayMarker.querySelector('text').setAttribute('x', String(todayX + 4));

    TIMELINE.forEach((event, index) => {
      const x = 60 + (event.t - 2025) * 80;
      const y = lineY[event.line];
      const labelY = index % 2 === 0 ? y - 12 : y + 23;
      const labelX = event.line === 'eu' && event.t >= 2026.1 && event.t <= 2026.6
        ? x + (index === 3 ? -10 : index === 5 ? 10 : 0)
        : x;
      const sourceNames = event.sourceIds.map((sourceId) => SOURCES.find((source) => source.id === sourceId)?.cite).filter(Boolean).join('; ');
      const marker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      marker.classList.add('timeline-marker', `status-${event.status}`);
      marker.dataset.eventIndex = String(index);
      marker.dataset.line = event.line;
      marker.setAttribute('role', 'button');
      marker.setAttribute('tabindex', '0');
      marker.setAttribute('aria-label', `${index + 1}. ${event.date}: ${event.text}. ${lineNames[event.line]}. ${event.status}. Sources: ${sourceNames}`);
      marker.innerHTML = `
        <circle cx="${x}" cy="${y}" r="6"></circle>
        <text x="${labelX}" y="${labelY}" text-anchor="middle">${index + 1}</text>
      `;
      markerGroup.appendChild(marker);

      const item = document.createElement('li');
      item.className = 'timeline-event-item';
      item.dataset.eventIndex = String(index);
      item.dataset.line = event.line;
      item.dataset.audiences = event.audiences.join(' ');
      item.tabIndex = 0;
      item.innerHTML = `<span class="event-number">${index + 1}</span><div><strong>${event.date}</strong><p>${event.text} <span class="event-status">${event.status}</span> ${cite(event.sourceIds)}</p></div>`;
      eventList.appendChild(item);

      const highlight = () => {
        mount.querySelectorAll(`[data-event-index="${index}"]`).forEach((node) => node.classList.add('highlighted'));
      };
      const clearHighlight = () => {
        mount.querySelectorAll(`[data-event-index="${index}"]`).forEach((node) => node.classList.remove('highlighted'));
      };
      marker.addEventListener('mouseenter', highlight);
      marker.addEventListener('mouseleave', clearHighlight);
      marker.addEventListener('focus', highlight);
      marker.addEventListener('blur', clearHighlight);
      marker.addEventListener('click', highlight);
      marker.addEventListener('keydown', (keyboardEvent) => {
        if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
          keyboardEvent.preventDefault();
          highlight();
        }
      });
      item.addEventListener('mouseenter', highlight);
      item.addEventListener('mouseleave', clearHighlight);
      item.addEventListener('focus', highlight);
      item.addEventListener('blur', clearHighlight);
    });

    function filterTimeline(audience) {
      mount.dataset.activeAudience = audience;
      mount.querySelectorAll('.timeline-filter').forEach((button) => {
        const active = button.dataset.audience === audience;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      mount.querySelectorAll('.timeline-event-item').forEach((item) => {
        item.classList.toggle('dimmed', audience !== 'all' && !item.dataset.audiences.split(' ').includes(audience));
      });
      markerGroup.querySelectorAll('.timeline-marker').forEach((marker) => {
        const event = TIMELINE[Number(marker.dataset.eventIndex)];
        marker.classList.toggle('dimmed', audience !== 'all' && !event.audiences.includes(audience));
      });
      mount.querySelectorAll('.timeline-track').forEach((track) => {
        const hasMatchingEvent = TIMELINE.some((event) => event.line === track.dataset.track && (audience === 'all' || event.audiences.includes(audience)));
        track.classList.toggle('line-dimmed', !hasMatchingEvent);
      });
    }

    mount.querySelector('.timeline-filters').addEventListener('click', (event) => {
      const button = event.target.closest('.timeline-filter');
      if (button) filterTimeline(button.dataset.audience);
    });
    filterTimeline(defaultAudience);
  });
}
