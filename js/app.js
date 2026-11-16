const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('main-nav');
const navButtons = document.querySelectorAll('.nav-button');
const materialButtons = document.querySelectorAll('.material-button');
const lensButtons = document.querySelectorAll('.lens');
const tabButtons = document.querySelectorAll('.tab-button');
const riskMaterialFilter = document.getElementById('risk-material-filter');
const riskStageFilter = document.getElementById('risk-stage-filter');
const riskTypeFilter = document.getElementById('risk-type-filter');
const riskConfidenceFilter = document.getElementById('risk-confidence-filter');
const riskBody = document.getElementById('risk-body');
const riskCount = document.getElementById('risk-count');
const chainFlow = document.getElementById('chain-flow');
const stageDetail = document.getElementById('stage-detail');
const wherePanel = document.getElementById('where-panel');
const affectedPanel = document.getElementById('affected-panel');
const evidencePanel = document.getElementById('evidence-panel');
const ladderSteps = document.querySelectorAll('.ladder-step');
const ladderDetail = document.getElementById('ladder-detail');
const harmCaseByStage = {
  'tungsten-mine': 'rubaya',
  'ree-mine': 'kachin',
  'lithium-mine': 'andes',
  'beryllium-components': 'beryllium'
};

function cite(ids) {
  const sourceIds = Array.isArray(ids) ? ids : String(ids || '').split(',').map((id) => id.trim()).filter(Boolean);
  const references = sourceIds
    .map((id) => SOURCES.find((source) => source.id === id))
    .filter(Boolean);
  if (!references.length) return '';
  return `<span class="citation">(${references.map((source) => `${source.verify ? '<!-- VERIFY -->' : ''}<a href="#src-${source.id}">${source.cite}</a>`).join('; ')})</span>`;
}

function renderCitations(root = document) {
  root.querySelectorAll('[data-cite]').forEach((element) => {
    element.innerHTML = cite(element.dataset.cite);
  });
}

function renderSources() {
  const list = document.getElementById('source-list');
  if (!list) return;
  const sourceTypes = ['all', 'un', 'eu-law', 'us-uk', 'ngo', 'research', 'industry', 'news'];
  const filterLabels = { all: 'All', un: 'UN', 'eu-law': 'EU law', 'us-uk': 'US and UK', ngo: 'NGO', research: 'Research', industry: 'Industry', news: 'News' };
  const filters = document.getElementById('source-filters');
  filters.innerHTML = sourceTypes.map((type) => `
    <button class="filter source-filter${type === 'all' ? ' active' : ''}" type="button" data-source-type="${type}" aria-pressed="${type === 'all'}">${filterLabels[type]}</button>
  `).join('');
  const alphabeticalSources = [...SOURCES].sort((a, b) => a.apa.localeCompare(b.apa));
  list.innerHTML = alphabeticalSources.map((source) => `
    ${source.verify ? '<!-- VERIFY -->' : ''}
    <li id="src-${source.id}" data-source-type="${source.type}">
      <span>${source.apa}</span>
      ${source.url ? `<a class="source-url" href="${source.url}" target="_blank" rel="noopener">${source.url}</a>` : '<span class="pending">URL to verify</span>'}
      <button class="copy-source" type="button" data-source-id="${source.id}">Copy APA reference</button>
      ${source.verify ? '<span class="verify-flag">Verify reference</span>' : ''}
    </li>
  `).join('');
  renderCitations(document.getElementById('sources'));
}

function setupSources() {
  const filters = document.getElementById('source-filters');
  filters?.addEventListener('click', (event) => {
    const button = event.target.closest('.source-filter');
    if (!button) return;
    filters.querySelectorAll('.source-filter').forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('#source-list li').forEach((item) => {
      item.hidden = button.dataset.sourceType !== 'all' && item.dataset.sourceType !== button.dataset.sourceType;
    });
  });
  document.getElementById('source-list')?.addEventListener('click', async (event) => {
    const button = event.target.closest('.copy-source');
    if (!button) return;
    const source = SOURCES.find((item) => item.id === button.dataset.sourceId);
    if (!source) return;
    const reference = `${source.apa.replace(/<[^>]+>/g, '')}${source.url ? ` ${source.url}` : ''}`;
    try {
      await navigator.clipboard.writeText(reference);
      button.textContent = 'Copied';
    } catch (error) {
      button.textContent = 'Copy failed';
      button.setAttribute('aria-label', `Could not copy reference: ${error.message}`);
    }
  });
  document.getElementById('download-references')?.addEventListener('click', () => {
    const text = [...SOURCES].sort((a, b) => a.apa.localeCompare(b.apa))
      .map((source) => `${source.apa.replace(/<[^>]+>/g, '')}${source.url ? ` ${source.url}` : ''}`).join('\n\n');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fusion-minerals-references.txt';
    link.click();
    URL.revokeObjectURL(url);
  });
}

function addTableCitations(table, sourceRows) {
  if (!table) return;
  [...table.tBodies[0].rows].forEach((row, rowIndex) => {
    const sourceIds = sourceRows[rowIndex] || [];
    row.querySelectorAll('td').forEach((cell) => {
      if (!cell.textContent.trim() || cell.querySelector('.citation') || !sourceIds.length) return;
      cell.insertAdjacentHTML('beforeend', ` ${cite(sourceIds)}`);
    });
  });
}

function setupGovernance() {
  const table = document.getElementById('governance-table');
  const list = document.getElementById('governance-card-list');
  const toggle = document.getElementById('governance-list-toggle');
  if (!table || !list || !toggle) return;
  const sourceIdsByMaterial = {
    Tungsten: ['usgs-2026', 'unsc-2025a'],
    Lithium: ['oc-2025', 'pearson-2022'],
    'Lithium-6': ['pearson-2022'],
    Beryllium: ['atsdr-2008'],
    'Rare earths': ['gw-2024', 'scsp-2025']
  };
  const sourceIdsByColumn = [
    null,
    ['cmr-2017'],
    ['stoop-2018'],
    ['batt-2023'],
    ['csddd-2024'],
    ['oecd-2016'],
    ['unpanel-2024'],
    ['crma-2024', 'ep-2026'],
    ['flr-2024'],
    ['nzia-2024']
  ];
  table.querySelectorAll('tbody tr').forEach((row) => {
    row.querySelectorAll('td').forEach((cell, index) => {
      const sourceIds = index === 0 ? sourceIdsByMaterial[cell.textContent.trim()] : sourceIdsByColumn[index];
      if (sourceIds?.length) cell.insertAdjacentHTML('beforeend', ` ${cite(sourceIds)}`);
    });
  });

  const headers = [...table.tHead.rows[0].cells].slice(1).map((cell) => cell.textContent.trim());
  list.innerHTML = [...table.tBodies[0].rows].map((row) => {
    const cells = [...row.cells];
    return `<article class="governance-card"><h3>${cells[0].textContent.trim()}</h3><dl>${headers.map((header, index) => `
      <div><dt>${header}</dt><dd>${cells[index + 1].innerHTML}</dd></div>
    `).join('')}</dl></article>`;
  }).join('');

  toggle.addEventListener('click', () => {
    const showList = list.hidden;
    list.hidden = !showList;
    table.closest('.table-scroll').hidden = showList;
    toggle.setAttribute('aria-expanded', String(showList));
    toggle.textContent = showList ? 'Show as table' : 'Show as list';
  });
}

function setupBriefTableCitations() {
  addTableCitations(document.querySelector('.framework-table'), [
    ['crma-2024', 'ep-2026'],
    ['ec-2026', 'crma-2024', 'ep-2026', 'cmr-2017'],
    ['oecd-2016', 'cmr-2017'],
    ['oecd-2016'],
    ['batt-2023', 'cmr-2017'],
    ['cmr-2017'],
    ['cmr-2017', 'flr-2024'],
    ['unpanel-2024', 'cmr-2017'],
    ['unctad-2026', 'nrc-2026', 'desnz-2026']
  ]);
  addTableCitations(document.querySelector('.options-table'), [
    ['scsp-2025'],
    ['fia-2025'],
    ['ec-2026', 'oecd-2016'],
    ['crma-2024', 'ep-2026'],
    ['cmr-2017', 'ipis-2024'],
    ['nzia-2024', 'desnz-2026']
  ]);
  addTableCitations(document.querySelector('#brief-investors table'), [
    ['usgs-2026', 'pearson-2022'],
    ['crma-2024', 'ep-2026'],
    ['oecd-2016'],
    ['unpanel-2024', 'stoop-2018'],
    ['scsp-2025']
  ]);
  addTableCitations(document.querySelector('.un-proposal-table'), [
    ['unctad-2026'],
    ['oecd-2016', 'unpanel-2024'],
    ['unpanel-2024'],
    ['unctad-2026']
  ]);
}

function setupBriefClaimCitations() {
  const supportingSources = {
    'brief-investors': ['oecd-2016', 'scsp-2025'],
    'brief-eu': ['crma-2024', 'cmr-2017', 'oecd-2016'],
    'brief-un': ['unpanel-2024', 'unctad-2026']
  };
  Object.entries(supportingSources).forEach(([briefId, sourceIds]) => {
    document.querySelectorAll(`#${briefId} p, #${briefId} li`).forEach((claim) => {
      if (claim.closest('.pager, .timeline-event-item, .brief-print-references') || claim.querySelector('.citation') || !claim.textContent.trim()) return;
      claim.insertAdjacentHTML('beforeend', ` ${cite(sourceIds)}`);
    });
  });
}

function setupPrintReferences() {
  ['brief-investors', 'brief-eu', 'brief-un'].forEach((briefId) => {
    const brief = document.getElementById(briefId);
    if (!brief) return;
    const citedIds = new Set([...brief.querySelectorAll('a[href^="#src-"]')].map((link) => link.hash.slice(5)));
    const citations = [...SOURCES]
      .filter((source) => citedIds.has(source.id))
      .sort((a, b) => a.apa.localeCompare(b.apa));
    const references = document.createElement('div');
    references.className = 'container brief-print-references';
    references.innerHTML = `<h3>References</h3><ol>${citations.map((source) => `
      ${source.verify ? '<!-- VERIFY -->' : ''}
      <li>${source.apa}${source.url ? ` <span>${source.url}</span>` : ' [URL to verify]'}</li>
    `).join('')}</ol>`;
    brief.appendChild(references);
  });
}

const ladderStates = [
  { title: 'Identify', text: 'Mapping or audit finds a risk. The first response is to understand the exposure and agree what evidence is missing.' },
  { title: 'Engage', text: 'Raise the issue with the supplier and agree a corrective action plan with measurable milestones.' },
  { title: 'Improve on a deadline', text: 'Set a time-bound plan, such as 6–12 months, with support where the buyer has influence.' },
  { title: 'Suspend temporarily', text: 'Pause new orders only when milestones are missed; keep engagement active while the issue is addressed.' },
  { title: 'Exit responsibly', text: 'Exit is a last resort and should include notice, a transition period and an assessment of impact on workers.' }
];

function getChainRoute(hash) {
  const value = hash.replace(/^#chain-/, '').replace(/^#/, '');
  if (Object.hasOwn(materialData, value)) return { materialKey: value };

  for (const [materialKey, material] of Object.entries(materialData)) {
    const stage = material.stages.find((item) => item.id === value);
    if (stage) return { materialKey, stageId: stage.id };
  }

  return null;
}

function selectChainStage(stageId) {
  const node = [...chainFlow.querySelectorAll('.chain-node')]
    .find((item) => item.dataset.stageId === stageId);
  if (!node) return;

  const materialKey = document.querySelector('.material-button.active')?.dataset.material || 'tungsten';
  const material = materialData[materialKey];
  const stage = material.stages.find((item) => item.id === stageId);
  if (!stage) return;

  renderStageDetail(material, stage);
  chainFlow.querySelectorAll('.chain-node').forEach((item) => {
    item.classList.toggle('active', item === node);
  });
}

function initNav() {
  function closeDropdowns() {
    navButtons.forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
      button.nextElementSibling?.classList.remove('open');
    });
  }

  function closeMobileNav() {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    closeDropdowns();
  }

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) closeDropdowns();
  });

  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const panel = button.nextElementSibling;
      if (!panel) return;
      const willOpen = !panel.classList.contains('open');
      closeDropdowns();
      panel.classList.toggle('open', willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
    });
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('.nav-group')) return;
    closeDropdowns();
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('#main-nav a[href^="#"]')) closeMobileNav();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const openButton = [...navButtons].find((button) => button.getAttribute('aria-expanded') === 'true');
      closeMobileNav();
      openButton?.focus();
      return;
    }

    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const panel = event.target.closest('.nav-panel');
    if (!panel) return;
    const items = [...panel.querySelectorAll('a')];
    if (!items.length) return;
    const current = items.indexOf(document.activeElement);
    const next = event.key === 'Home' ? 0
      : event.key === 'End' ? items.length - 1
        : (current + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
    event.preventDefault();
    items[next].focus();
  });
}

function setupPageTabs() {
  const main = document.querySelector('main');
  const sections = [...main.children].filter((child) => child.matches('section'));
  const primerIndex = sections.findIndex((section) => section.id === 'primer');
  const pageGroups = [
    { anchor: 'overview', label: 'Overview', sections: sections.slice(0, primerIndex) },
    ...sections.slice(primerIndex).map((section) => ({
      anchor: section.id,
      label: section.querySelector('h2')?.textContent.trim() || section.id,
      sections: [section]
    }))
  ];

  pageGroups.forEach(({ anchor, label, sections: pageSections }) => {
    const panel = document.createElement('div');
    panel.id = `page-${anchor}`;
    panel.className = 'page-view';
    panel.dataset.pageAnchor = anchor;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', label);
    panel.tabIndex = 0;
    pageSections.forEach((section) => panel.appendChild(section));
    main.appendChild(panel);
  });

  function showPage(hash, { resetScroll = true } = {}) {
    const route = getChainRoute(hash);
    if (route) {
      materialButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.material === route.materialKey);
      });
      buildChain(route.materialKey);
      if (route.stageId) selectChainStage(route.stageId);
    }

    const id = hash.replace(/^#/, '');
    const target = document.getElementById(id);
    const page = target?.closest('.page-view')
      || (route ? document.getElementById('chain')?.closest('.page-view') : null)
      || document.getElementById('page-overview');

    document.querySelectorAll('.page-view').forEach((panel) => {
      const active = panel === page;
      panel.hidden = !active;
      panel.setAttribute('aria-hidden', String(!active));
    });

    document.querySelectorAll('#main-nav a[href^="#"]').forEach((link) => {
      if (link.hash === `#${page.dataset.pageAnchor}`) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
    const activeChildren = {
      Evidence: ['risks', 'governance', 'demand'],
      Briefs: ['brief-investors', 'brief-eu', 'brief-un']
    };
    navButtons.forEach((button) => {
      button.classList.toggle('has-active-child', activeChildren[button.textContent.replace('▾', '').trim()]?.includes(page.dataset.pageAnchor) || false);
    });

    const hasDeepTarget = target && id !== page.dataset.pageAnchor;
    if (resetScroll && !hasDeepTarget) window.scrollTo({ top: 0, behavior: 'smooth' });
    const sourceTarget = id.startsWith('src-');
    const highlightTarget = sourceTarget || id.startsWith('human-cost-');
    if (sourceTarget) {
      const allSources = document.querySelector('.source-filter[data-source-type="all"]');
      allSources?.click();
    }
    if (hasDeepTarget) {
      requestAnimationFrame(() => {
        const currentTarget = document.getElementById(id);
        currentTarget?.scrollIntoView({ behavior: 'smooth', block: sourceTarget ? 'center' : 'start' });
        if (highlightTarget) {
          currentTarget?.classList.add('highlighted');
          window.setTimeout(() => currentTarget?.classList.remove('highlighted'), 1800);
        }
      });
    }
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    const route = getChainRoute(hash);
    const target = document.getElementById(hash.slice(1));
    if (!target && !route) return;

    event.preventDefault();
    if (window.location.hash === hash) {
      showPage(hash);
      return;
    }
    window.history.pushState(null, '', hash);
    showPage(hash);
  });

  const handleLocationChange = () => showPage(window.location.hash || '#overview');
  window.addEventListener('hashchange', handleLocationChange);
  window.addEventListener('popstate', handleLocationChange);
  showPage(window.location.hash || '#overview', { resetScroll: false });
}

function renderFilters() {
  const materialSet = new Set(['all']);
  const stageSet = new Set(['all']);
  const typeSet = new Set(['all']);
  const confidenceSet = new Set(['all']);

  riskRows.forEach((row) => {
    materialSet.add(row.material);
    stageSet.add(row.stage);
    typeSet.add(row.type);
    confidenceSet.add(row.confidence);
  });

  function populateSelect(select, values) {
    select.innerHTML = '';
    values.forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value === 'all' ? 'All' : value;
      select.appendChild(option);
    });
  }

  populateSelect(riskMaterialFilter, [...materialSet].sort());
  populateSelect(riskStageFilter, [...stageSet].sort());
  populateSelect(riskTypeFilter, [...typeSet].sort());
  populateSelect(riskConfidenceFilter, [...confidenceSet].sort());

  riskMaterialFilter.value = 'all';
  riskStageFilter.value = 'all';
  riskTypeFilter.value = 'all';
  riskConfidenceFilter.value = 'all';
}

function getFilteredRows() {
  const materialValue = riskMaterialFilter?.value || 'all';
  const stageValue = riskStageFilter?.value || 'all';
  const typeValue = riskTypeFilter?.value || 'all';
  const confidenceValue = riskConfidenceFilter?.value || 'all';

  return riskRows.filter((row) => {
    const matchesMaterial = materialValue === 'all' || row.material === materialValue;
    const matchesStage = stageValue === 'all' || row.stage === stageValue;
    const matchesType = typeValue === 'all' || row.type === typeValue;
    const matchesConfidence = confidenceValue === 'all' || row.confidence === confidenceValue;
    return matchesMaterial && matchesStage && matchesType && matchesConfidence;
  });
}

function renderRiskTable() {
  const rows = getFilteredRows();
  riskBody.innerHTML = rows.map((row) => {
    const material = Object.entries(materialData)
      .find(([, item]) => item.label === row.material)?.[1];
    const stage = material?.stages.find((item) => item.stage === row.stage);
    const target = stage ? `#chain-${stage.id}` : '#chain';
    return `
    <tr data-link="${target}">
      <td><a href="${target}">${row.id}</a></td>
      <td>${row.material}</td>
      <td>${row.stage}</td>
      <td>${row.risk}</td>
      <td>${row.location}</td>
      <td>${row.confidence}</td>
      <td>${row.sourceIds.length ? cite(row.sourceIds) : 'Project analysis'}</td>
    </tr>
  `;
  }).join('');

  riskCount.textContent = `Showing ${rows.length} of ${riskRows.length} risks.`;

  riskBody.querySelectorAll('tr').forEach((row) => {
    row.addEventListener('click', (event) => {
      if (event.target.closest('a')) return;
      const target = row.dataset.link || '#chain';
      window.location.hash = target;
    });
  });
}

function buildChain(materialKey='tungsten') {
  const material = materialData[materialKey];
  if (!material) return;

  chainFlow.innerHTML = material.stages.map((stage) => {
    return `
      <button id="chain-${stage.id}" class="chain-node ${stage.kind}" data-stage-id="${stage.id}" data-kind="${stage.kind}" aria-label="Open ${stage.stage} stage for ${material.label}">
        <span class="node-tag ${stage.kind}">${stage.stage}</span>
        <span>${stage.location}</span>
      </button>
    `;
  }).join('');

  const nodes = chainFlow.querySelectorAll('.chain-node');
  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      const stage = material.stages.find((item) => item.id === node.dataset.stageId);
      renderStageDetail(material, stage);
      nodes.forEach((item) => item.classList.toggle('active', item === node));
    });
  });

  const firstStage = material.stages[0];
  renderStageDetail(material, firstStage);
  if (nodes[0]) nodes[0].classList.add('active');
  renderTabPanels(material, 'where');
}

function renderStageDetail(material, stage) {
  if (!stage) return;
  const targetHash = `#chain-${stage.id}`;
  const stageSources = stage.sourceIds?.length ? cite(stage.sourceIds) : 'Project analysis';
  const harmCase = harmCaseByStage[stage.id];
  stageDetail.innerHTML = `
    <div class="detail-header">
      <h3>${material.label}: ${stage.stage}</h3>
      <button class="copy-detail" data-link="${targetHash}">Copy link to this stage</button>
    </div>
    <p><strong>Location:</strong> ${stage.location}</p>
    <p><strong>Risk:</strong> ${stage.risk}</p>
    <p><strong>Confidence:</strong> ${stage.confidence}</p>
    <p><strong>Evidence:</strong> ${stage.evidence} ${stageSources}</p>
    ${harmCase ? `<p><a class="harm-link" href="#human-cost-${harmCase}">Harm documented →</a></p>` : ''}
    <p><a href="#risks">View the evidence register</a></p>
  `;

  const copyDetail = stageDetail.querySelector('.copy-detail');
  copyDetail.addEventListener('click', () => {
    const stageLink = `${window.location.origin}${window.location.pathname}#chain-${stage.id}`;
    navigator.clipboard.writeText(stageLink);
  });
}

function renderTabPanels(material, activeTab) {
  const where = material.tab.where;
  const affected = material.tab.affected;
  const sourceIds = [...new Set(material.stages.flatMap((stage) => stage.sourceIds || []))];
  const evidence = `<ul>${material.stages.map((stage) => `
    <li><strong>${stage.stage} · ${stage.confidence}:</strong> ${stage.evidence} ${stage.sourceIds?.length ? cite(stage.sourceIds) : 'Project analysis'}</li>
  `).join('')}</ul>`;
  wherePanel.innerHTML = `<p>${where} ${sourceIds.length ? cite(sourceIds) : ''}</p>`;
  affectedPanel.innerHTML = `<p>${affected}</p>`;
  evidencePanel.innerHTML = `<p>${evidence}</p>`;

  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === activeTab;
    button.classList.toggle('active', isActive);
  });

  const panels = [wherePanel, affectedPanel, evidencePanel];
  panels.forEach((panel) => panel.classList.remove('active'));
  const activePanel = { where: wherePanel, affected: affectedPanel, evidence: evidencePanel }[activeTab];
  if (activePanel) activePanel.classList.add('active');
}

function applyAudienceLens(lens='all') {
  const allNodes = document.querySelectorAll('.chain-node');
  allNodes.forEach((node) => {
    const stageId = node.dataset.stageId;
    const material = materialData[document.querySelector('.material-button.active')?.dataset.material || 'tungsten'];
    const stage = material.stages.find((item) => item.id === stageId);
    if (!stage) return;
    const relevant = stage.relevant.includes(lens) || lens === 'all';
    node.classList.toggle('dimmed', !relevant);
  });
}

function setupMaterialButtons() {
  materialButtons.forEach((button) => {
    button.addEventListener('click', () => {
      materialButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      const materialKey = button.dataset.material;
      buildChain(materialKey);
      applyAudienceLens(document.querySelector('.lens.active')?.dataset.lens || 'all');
    });
  });
}

function setupLensButtons() {
  lensButtons.forEach((button) => {
    button.addEventListener('click', () => {
      lensButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      applyAudienceLens(button.dataset.lens || 'all');
    });
  });
}

function setupTabs() {
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const materialKey = document.querySelector('.material-button.active')?.dataset.material || 'tungsten';
      renderTabPanels(materialData[materialKey], button.dataset.tab);
    });
  });
}

function setupRiskFilters() {
  [riskMaterialFilter, riskStageFilter, riskTypeFilter, riskConfidenceFilter].forEach((select) => {
    select.addEventListener('change', renderRiskTable);
  });

  document.getElementById('download-csv').addEventListener('click', () => {
    const csvRows = [
      ['ID', 'Material', 'Stage', 'Risk', 'Location', 'Confidence', 'Source', 'Risk type'],
      ...riskRows.map((row) => [row.id, row.material, row.stage, row.risk, row.location, row.confidence, row.sourceIds.map((id) => {
        const source = SOURCES.find((item) => item.id === id);
        return source ? `${source.apa.replace(/<[^>]+>/g, '')}${source.url ? ` ${source.url}` : ''}` : '';
      }).filter(Boolean).join('; ') || 'Project analysis', row.type])
    ];
    const csv = csvRows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fusion-minerals-risks.csv';
    link.click();
    URL.revokeObjectURL(url);
  });
}

function setupLadder() {
  ladderSteps.forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.step);
      ladderSteps.forEach((step, i) => step.classList.toggle('active', i === index));
      const stepData = ladderStates[index];
      ladderDetail.innerHTML = `<h3>${stepData.title}</h3><p>${stepData.text}</p>`;
    });
  });
}

function setupPrintAndCopy() {
  document.querySelectorAll('.print-btn').forEach((button) => {
    button.addEventListener('click', () => window.print());
  });

  document.querySelectorAll('.copy-link').forEach((button) => {
    button.addEventListener('click', () => {
      const url = window.location.href.split('#')[0] + '#' + button.closest('section')?.id;
      navigator.clipboard.writeText(url);
    });
  });

  document.querySelectorAll('.copy-button').forEach((button) => {
    button.addEventListener('click', () => {
      const copyContent = button.previousElementSibling?.cloneNode(true);
      copyContent?.querySelectorAll('.citation').forEach((citation) => citation.remove());
      const text = copyContent?.textContent || '';
      navigator.clipboard.writeText(text);
    });
  });
}

function setupLayerCards() {
  document.querySelectorAll('.layer').forEach((layer) => {
    layer.addEventListener('click', () => {
      const materialKey = layer.dataset.material || 'tungsten';
      const relevantLink = layer.dataset.link || '#chain';
      const copy = `
        <h3>${layer.textContent.trim()}</h3>
        <p><strong>Role:</strong> ${layer.textContent.trim() === 'Plasma' ? 'Fuel burns here' : layer.textContent.trim() === 'First wall' ? 'Faces the plasma' : layer.textContent.trim() === 'Divertor' ? 'Removes heat and exhaust' : layer.textContent.trim() === 'Breeding blanket' ? 'Makes new tritium, captures heat' : layer.textContent.trim() === 'Shield' ? 'Protects the magnets' : layer.textContent.trim() === 'Vacuum vessel' ? 'Sealed chamber' : layer.textContent.trim() === 'Magnets' ? 'Hold the plasma' : 'Keeps the magnets cold' }</p>
        <p><strong>Materials:</strong> ${materialKey === 'tungsten' ? 'Tungsten' : materialKey === 'lithium' ? 'Lithium (lithium-6)' : materialKey === 'rare-earths' ? 'Rare earths' : 'Steel / beryllium'}</p>
        <p><strong>Key supply risk:</strong> ${materialKey === 'tungsten' ? 'Concentrated refining and traceability weakness' : materialKey === 'lithium' ? 'Lithium-6 supply is effectively zero' : materialKey === 'rare-earths' ? 'Refining concentration and mine-linked harm' : 'Small supply base and design dependence'}</p>
        <a href="${relevantLink}">Trace this mineral →</a>
      `;
      document.getElementById('cutaway-detail').innerHTML = copy;
      document.querySelectorAll('.layer').forEach((item) => item.classList.toggle('active', item === layer));
    });
  });
}

function init() {
  initNav();
  setupPageTabs();
  renderSources();
  setupSources();
  renderCitations();
  setupGovernance();
  setupBriefTableCitations();
  setupBriefClaimCitations();
  setupTimelines();
  setupPrintReferences();
  renderFilters();
  renderRiskTable();
  const initialRoute = getChainRoute(window.location.hash);
  const initialMaterial = initialRoute?.materialKey || 'tungsten';
  materialButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.material === initialMaterial);
  });
  buildChain(initialMaterial);
  if (initialRoute?.stageId) selectChainStage(initialRoute.stageId);
  setupMaterialButtons();
  setupLensButtons();
  setupTabs();
  setupRiskFilters();
  setupLadder();
  setupPrintAndCopy();
  setupLayerCards();
}

init();
