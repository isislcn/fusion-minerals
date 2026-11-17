const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('main-nav');
const navButtons = document.querySelectorAll('.nav-button');
const materialButtons = document.querySelectorAll('.material-button');
const lensButtons = document.querySelectorAll('.lens');
const riskMaterialFilter = document.getElementById('risk-material-filter');
const riskStageFilter = document.getElementById('risk-stage-filter');
const riskTypeFilter = document.getElementById('risk-type-filter');
const riskConfidenceFilter = document.getElementById('risk-confidence-filter');
const riskBody = document.getElementById('risk-body');
const riskCount = document.getElementById('risk-count');
const chainFlow = document.getElementById('chain-flow');
const stageDetail = document.getElementById('stage-detail');
const ladderSteps = document.querySelectorAll('.ladder-step');
const ladderDetail = document.getElementById('ladder-detail');
let activeStageTab = 'where';
const copyTimers = new WeakMap();
let citationInstance = 0;
const harmCaseByStage = {
  'tungsten-mine': 'rubaya',
  'ree-mine': 'kachin',
  'lithium-mine': 'andes',
  'beryllium-components': 'beryllium'
};

const GLOSSARY = {
  '3T': 'Tin, tantalum and tungsten, minerals often covered by conflict-minerals rules.',
  APT: 'Ammonium paratungstate, a powder used to make tungsten metal and products.',
  divertor: 'A reactor part that removes heat and particles from the plasma.',
  'breeding blanket': 'A layer around the plasma that can make tritium and capture heat.',
  'lithium-6': 'A form of lithium used by some fusion designs to help make tritium.',
  REBCO: 'A high-temperature superconducting material used in some magnets.',
  'due diligence': 'Checking where your materials come from and fixing problems you find.',
  offtake: 'A contract to buy power before the plant is built.',
  procurement: 'Buying.',
  smelter: 'A facility that turns ore into metal or another usable material.',
  traceability: 'The ability to follow a material through its supply chain.',
  CSDDD: 'The EU Corporate Sustainability Due Diligence Directive.',
  CRMA: 'The EU Critical Raw Materials Act.',
  CMR: 'The EU Conflict Minerals Regulation.',
  M23: 'An armed group active in eastern Democratic Republic of the Congo.',
  'artisanal mining': 'Small-scale mining often done by individuals or small groups.',
  FPIC: 'Free, prior and informed consent: a community’s right to decide before a project affects it.',
  tokamak: 'A doughnut-shaped machine that uses magnetic fields to hold hot plasma.',
  stellarator: 'A fusion machine that uses twisted magnetic fields to hold hot plasma.'
};

const PAGE_INTROS = {
  overview: ['Fusion’s mineral supply chains raise sourcing questions that can be addressed before plants are built.', 5],
  tour: ['Follow tungsten from the mine to a fusion reactor in five short steps.', 3],
  primer: ['Fusion makes energy by squeezing tiny atoms together, and the machine that does it is built from a handful of rare minerals.', 4],
  chain: ['Follow each mineral from the mine to the reactor and see where the risks are.', 4],
  'human-cost': ['The mines that will supply fusion are already hurting people, and here are the documented cases.', 5],
  'why-now': ['The first fusion plants will be ordered soon, and whatever suppliers they pick will be hard to change.', 3],
  risks: ['Every risk we found, in one sortable list.', 4],
  governance: ['Almost no law checks where fusion’s minerals come from.', 4],
  demand: ['Nobody has published how much of each mineral a fusion plant needs, except for one fuel ingredient that barely exists yet.', 3],
  remedy: ['When a buyer finds a problem at a supplier, fixing it helps people more than walking away.', 4],
  methodology: ['This site maps public evidence about fusion materials, human impacts and the rules that apply.', 3],
  sources: ['Every cited source, with publication details and links.', 8],
  about: ['This project asks how fusion-mineral sourcing can respect people and communities.', 2]
};

function toSuperscript(value) {
  const digits = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  return String(value).split('').map((digit) => digits[digit]).join('');
}

function cite(ids, { full = false } = {}) {
  const sourceIds = Array.isArray(ids) ? ids : String(ids || '').split(',').map((id) => id.trim()).filter(Boolean);
  const references = sourceIds
    .map((id) => SOURCES.find((source) => source.id === id))
    .filter(Boolean);
  if (!references.length) return '';
  const instance = citationInstance++;
  const compact = references.map((source) => {
    const number = SOURCES.findIndex((item) => item.id === source.id) + 1;
    const popoverId = `citation-popover-${instance}-${source.id}`;
    return `<span class="citation-chip-wrap"><button type="button" class="citation-chip" aria-label="Citation: ${source.cite}" aria-controls="${popoverId}" aria-expanded="false">${toSuperscript(number)}</button><span class="citation-popover" id="${popoverId}" role="dialog" aria-label="Citation details" hidden>${source.cite} <a href="#src-${source.id}">See source</a></span></span>`;
  }).join('');
  const citationText = `(${references.map((source) => `${source.verify ? '<!-- VERIFY -->' : ''}<a href="#src-${source.id}">${source.cite}</a>`).join('; ')})`;
  return `<span class="citation${full ? ' citation-always-full' : ''}"><span class="citation-compact">${compact}</span><span class="citation-full">${citationText}</span></span>`;
}

function announceCopy(message) {
  let liveRegion = document.getElementById('copy-announcement');
  if (!liveRegion) {
    liveRegion = document.createElement('span');
    liveRegion.id = 'copy-announcement';
    liveRegion.className = 'visually-hidden';
    liveRegion.setAttribute('aria-live', 'polite');
    document.body.appendChild(liveRegion);
  }
  liveRegion.textContent = '';
  window.setTimeout(() => { liveRegion.textContent = message; }, 0);
}

function getCopyFeedback(button) {
  const stageFeedback = button.closest('#stage-detail')?.querySelector('.share-feedback');
  if (stageFeedback) return stageFeedback;
  let feedback = button.nextElementSibling;
  if (!feedback?.matches('.copy-feedback')) {
    feedback = document.createElement('div');
    feedback.className = 'copy-feedback';
    button.insertAdjacentElement('afterend', feedback);
  }
  return feedback;
}

function showCopied(button) {
  if (!button.dataset.originalLabel) button.dataset.originalLabel = button.textContent.trim();
  button.textContent = 'Link copied ✓';
  getCopyFeedback(button).replaceChildren();
  announceCopy('Link copied');
  window.clearTimeout(copyTimers.get(button));
  copyTimers.set(button, window.setTimeout(() => {
    button.textContent = button.dataset.originalLabel;
  }, 2000));
}

function showUrlField(button, value) {
  if (!button.dataset.originalLabel) button.dataset.originalLabel = button.textContent.trim();
  button.textContent = button.dataset.originalLabel;
  window.clearTimeout(copyTimers.get(button));
  const feedback = getCopyFeedback(button);
  const input = document.createElement('input');
  input.type = 'text';
  input.readOnly = true;
  input.value = value;
  input.setAttribute('aria-label', 'Copyable link or text');
  const hint = document.createElement('span');
  hint.textContent = 'Press Ctrl+C or ⌘C to copy.';
  feedback.replaceChildren(input, hint);
  input.focus();
  input.select();
  announceCopy('Clipboard access is unavailable. The text is selected for copying.');
}

async function copyStageLink(button, value) {
  try {
    await navigator.clipboard.writeText(value);
    showCopied(button);
  } catch {
    showUrlField(button, value);
  }
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
  const tableWrap = document.getElementById('governance-table-wrap');
  const picker = document.getElementById('governance-material-picker');
  const pickerView = document.querySelector('.governance-picker');
  const ruleCards = document.getElementById('governance-rule-cards');
  const coverageCount = document.getElementById('governance-coverage-count');
  const toggle = document.getElementById('governance-table-toggle');
  if (!table || !tableWrap || !picker || !pickerView || !ruleCards || !coverageCount || !toggle) return;
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
  const rows = [...table.tBodies[0].rows];
  const getMaterialName = (row) => {
    const materialCell = row.cells[0].cloneNode(true);
    materialCell.querySelectorAll('.citation').forEach((citation) => citation.remove());
    return materialCell.textContent.trim();
  };
  const selectedMaterial = 'Lithium-6';
  picker.innerHTML = rows.map((row) => {
    const material = getMaterialName(row);
    return `<button type="button" class="governance-material-button" data-governance-material="${material}" aria-pressed="${material === selectedMaterial}">${material}</button>`;
  }).join('');

  function renderMaterial(materialName) {
    const row = rows.find((item) => getMaterialName(item) === materialName);
    if (!row) return;
    const statuses = [...row.cells].slice(1).map((cell) => {
      const text = cell.textContent.trim();
      const status = text.startsWith('Covered') ? 'covered'
        : text.startsWith('Not covered') ? 'not'
          : text.startsWith('Partly') ? 'partly' : 'partly';
      return { cell, status };
    });
    const covered = statuses.filter((item) => item.status === 'covered').length;
    coverageCount.textContent = `${materialName}: ${covered} of ${statuses.length} rules fully cover it.`;
    ruleCards.innerHTML = statuses.map(({ cell, status }, index) => {
      const verdict = status === 'covered' ? 'Covered' : status === 'not' ? 'Not covered' : 'Partly';
      const marker = status === 'covered' ? '✓' : status === 'not' ? '✕' : '◐';
      const explanation = cell.cloneNode(true);
      explanation.querySelectorAll('.state, .citation').forEach((item) => item.remove());
      const reason = explanation.textContent.trim() || verdict;
      return `<article class="governance-rule-card">
        <h4>${headers[index]}</h4>
        <p class="governance-verdict ${status}"><span aria-hidden="true">${marker}</span> ${verdict}</p>
        <p>${reason}</p>
        ${cell.querySelector('.citation')?.outerHTML || ''}
      </article>`;
    }).join('');
  }

  picker.addEventListener('click', (event) => {
    const button = event.target.closest('[data-governance-material]');
    if (!button) return;
    picker.querySelectorAll('[data-governance-material]').forEach((item) => {
      const active = item === button;
      item.setAttribute('aria-pressed', String(active));
    });
    renderMaterial(button.dataset.governanceMaterial);
  });
  toggle.addEventListener('click', () => {
    const showTable = tableWrap.hidden;
    tableWrap.hidden = !showTable;
    pickerView.hidden = showTable;
    toggle.setAttribute('aria-expanded', String(showTable));
    toggle.textContent = showTable ? 'Hide full table' : 'Show full table';
  });
  renderMaterial(selectedMaterial);
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

  renderStageDetail(material, stage, activeStageTab);
  chainFlow.querySelectorAll('.chain-node').forEach((item) => {
    const active = item === node;
    item.classList.toggle('active', active);
    if (active) item.setAttribute('aria-current', 'true');
    else item.removeAttribute('aria-current');
  });
}

function updateChainUrl(route) {
  try {
    window.history.replaceState(null, '', `#chain-${route}`);
  } catch {
    window.location.hash = `#chain-${route}`;
  }
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
  const tourSection = sections.find((section) => section.id === 'tour');
  const pageGroups = [
    { anchor: 'overview', label: 'Overview', sections: sections.slice(0, primerIndex).filter((section) => section.id !== 'tour') },
    ...(tourSection ? [{ anchor: 'tour', label: 'Guided tour', sections: [tourSection] }] : []),
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
      if (route.stageId) activeStageTab = 'where';
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
      Learn: ['primer', 'chain', 'human-cost', 'why-now'],
      Evidence: ['risks', 'governance', 'demand'],
      Act: ['remedy', 'brief-investors', 'brief-eu', 'brief-un'],
      About: ['methodology', 'sources', 'about']
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

function setupPageIntros() {
  document.querySelectorAll('.page-view').forEach((page) => {
    const anchor = page.dataset.pageAnchor;
    const section = page.querySelector(`#${anchor}`);
    if (!section) return;
    const briefAsk = section.querySelector('.brief-summary > p:first-child');
    if (briefAsk) {
      briefAsk.classList.add('one-sentence');
      const readTime = document.createElement('span');
      readTime.className = 'reading-time';
      readTime.textContent = '6 min read';
      briefAsk.insertAdjacentElement('afterend', readTime);
      return;
    }
    const intro = PAGE_INTROS[anchor];
    if (!intro) return;
    const heading = section.querySelector('h1, h2');
    if (!heading) return;
    const box = document.createElement('aside');
    box.className = 'page-intro';
    box.innerHTML = `<p>${intro[0]}</p><span class="reading-time">${intro[1]} min read</span>`;
    heading.insertAdjacentElement('afterend', box);
  });
}

function simplifyBodyLanguage(root = document) {
  const pages = root === document ? [...root.querySelectorAll('.page-view')] : [root];
  const excluded = '.citation, .source-list, .brief-print-references, .copy-block';
  pages.forEach((page) => {
    let firstDueDiligence = true;
    const walker = document.createTreeWalker(page, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.nodeValue.trim() || node.parentElement.closest(excluded)) continue;
      let text = node.nodeValue
        .replace(/\bprocured\b/gi, 'ordered')
        .replace(/\bprocurement\b/gi, 'buying')
        .replace(/\bdisengage(?:ment)?\b/gi, 'walk away')
        .replace(/\bremediation\b/gi, 'repair')
        .replace(/\bconflict[- ]finance\b/gi, 'money for armed groups')
        .replace(/\btraceability gap\b/gi, 'no way to trace the origin');
      text = text.replace(/\bdue[- ]diligence\b/gi, (match, offset, original) => {
        if (original[offset - 1] === '[' && original[offset + match.length] === ']') return match;
        if (firstDueDiligence) {
          firstDueDiligence = false;
          return 'supply-chain checks [due diligence]';
        }
        return 'supply-chain checks';
      });
      text = text.replace(/\bconcentration\b/gi, 'reliance on one country');
      node.nodeValue = text;
    }
  });
}

function setupJargonTerms() {
  const glossary = document.querySelector('.glossary-list');
  if (glossary) {
    Object.entries(GLOSSARY).forEach(([term, definition]) => {
      const existing = [...glossary.querySelectorAll('summary')].find((summary) => summary.textContent.trim().toLowerCase() === term.toLowerCase());
      if (existing) {
        const description = existing.parentElement.querySelector('p');
        if (description) description.textContent = definition;
        return;
      }
      const entry = document.createElement('details');
      entry.innerHTML = `<summary>${term}</summary><p>${definition}</p>`;
      glossary.appendChild(entry);
    });
  }

  document.querySelectorAll('.page-view').forEach((page) => {
    const seen = new Set([...page.querySelectorAll('.term')].map((button) => button.dataset.term));
    wrapJargonTerms(page, seen);
  });

  document.addEventListener('click', (event) => {
    const button = event.target.closest('.term');
    if (button) {
      setTermOpen(button.closest('.term-wrap'), true);
      return;
    }
    closeTermPopovers();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeTermPopovers();
  });
}

function wrapJargonTerms(root, seen) {
  const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const excluded = 'button, a, script, style, .citation, .term-popover, .glossary-list, .source-list, .brief-print-references, .copy-block';
  let node;
  let termInstance = document.querySelectorAll('.term-popover').length;
  while ((node = walker.nextNode())) {
    if (!node.nodeValue.trim() || node.parentElement.closest(excluded)) continue;
    const text = node.nodeValue;
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match;
    let replaced = false;
    while ((match = pattern.exec(text))) {
      const glossaryTerm = terms.find((term) => term.toLowerCase() === match[0].toLowerCase());
      if (!glossaryTerm || seen.has(glossaryTerm)) continue;
      seen.add(glossaryTerm);
      replaced = true;
      fragment.append(text.slice(lastIndex, match.index));
      const wrapper = document.createElement('span');
      wrapper.className = 'term-wrap';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'term';
      button.dataset.term = glossaryTerm;
      button.textContent = match[0];
      button.setAttribute('aria-label', `Explain ${match[0]}`);
      button.setAttribute('aria-expanded', 'false');
      const popover = document.createElement('span');
      popover.className = 'term-popover';
      popover.id = `term-popover-${termInstance++}`;
      popover.setAttribute('role', 'tooltip');
      popover.textContent = GLOSSARY[glossaryTerm];
      popover.hidden = true;
      button.setAttribute('aria-describedby', popover.id);
      wrapper.append(button, popover);
      fragment.append(wrapper);
      lastIndex = match.index + match[0].length;
      bindTermWrapper(wrapper);
    }
    if (replaced) {
      fragment.append(text.slice(lastIndex));
      node.replaceWith(fragment);
    }
  }
}

function bindTermWrapper(wrapper) {
  wrapper.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') setTermOpen(wrapper, true);
  });
  wrapper.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse' && !wrapper.contains(document.activeElement)) setTermOpen(wrapper, false);
  });
  wrapper.addEventListener('focusin', () => setTermOpen(wrapper, true));
  wrapper.addEventListener('focusout', (event) => {
    if (!wrapper.contains(event.relatedTarget)) setTermOpen(wrapper, false);
  });
}

function setTermOpen(wrapper, open) {
  const button = wrapper?.querySelector('.term');
  const popover = wrapper?.querySelector('.term-popover');
  if (!button || !popover) return;
  button.setAttribute('aria-expanded', String(open));
  popover.hidden = !open;
}

function closeTermPopovers() {
  document.querySelectorAll('.term-wrap').forEach((wrapper) => setTermOpen(wrapper, false));
}

function setupCitationControls() {
  const toggle = document.getElementById('citation-mode-toggle');
  if (toggle) {
    let full = false;
    try {
      full = localStorage.getItem('fusion-minerals-citations') === 'full';
    } catch (error) {
      console.warn('Citation display preference could not be loaded.', error);
    }
    function renderCitationMode() {
      document.body.classList.toggle('citations-full', full);
      toggle.textContent = `Citations: ${full ? 'full' : 'compact'}`;
      toggle.setAttribute('aria-label', `Show citations: ${full ? 'full' : 'compact'}`);
      toggle.setAttribute('aria-pressed', String(full));
    }
    toggle.addEventListener('click', () => {
      full = !full;
      try {
        localStorage.setItem('fusion-minerals-citations', full ? 'full' : 'compact');
      } catch (error) {
        console.warn('Citation display preference could not be saved.', error);
      }
      renderCitationMode();
    });
    renderCitationMode();
  }

  document.addEventListener('click', (event) => {
    const chip = event.target.closest('.citation-chip');
    document.querySelectorAll('.citation-chip[aria-expanded="true"]').forEach((openChip) => {
      if (openChip !== chip) {
        openChip.setAttribute('aria-expanded', 'false');
        const popover = document.getElementById(openChip.getAttribute('aria-controls'));
        if (popover) popover.hidden = true;
      }
    });
    if (!chip) return;
    const isOpen = chip.getAttribute('aria-expanded') === 'true';
    chip.setAttribute('aria-expanded', String(!isOpen));
    const popover = document.getElementById(chip.getAttribute('aria-controls'));
    if (popover) {
      popover.hidden = isOpen;
      if (!isOpen) {
        const chipRect = chip.getBoundingClientRect();
        const popoverRect = popover.getBoundingClientRect();
        const left = Math.max(8, Math.min(window.innerWidth - popoverRect.width - 8, chipRect.left + (chipRect.width - popoverRect.width) / 2));
        const top = Math.max(8, chipRect.top - popoverRect.height - 8);
        popover.style.left = `${left}px`;
        popover.style.top = `${top}px`;
      }
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('.citation-chip[aria-expanded="true"]').forEach((chip) => {
      chip.setAttribute('aria-expanded', 'false');
      const popover = document.getElementById(chip.getAttribute('aria-controls'));
      if (popover) popover.hidden = true;
      chip.focus();
    });
  });
}

function setupTour() {
  const tour = document.getElementById('tour');
  if (!tour) return;
  const screens = [...tour.querySelectorAll('[data-tour-screen]')];
  const dots = [...tour.querySelectorAll('[data-tour-go]')];
  const back = document.getElementById('tour-back');
  const next = document.getElementById('tour-next');
  const progress = document.getElementById('tour-progress-label');
  const announcement = document.getElementById('tour-announcement');
  const stepCount = 5;
  let current = 0;

  function showStep(index) {
    current = Math.max(0, Math.min(screens.length - 1, index));
    screens.forEach((screen, screenIndex) => {
      screen.hidden = screenIndex !== current;
      screen.setAttribute('aria-hidden', String(screenIndex !== current));
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex <= current && current < stepCount);
      if (dotIndex === current && current < stepCount) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
    progress.textContent = current < stepCount ? `Step ${current + 1} of ${stepCount}` : 'Tour complete';
    back.disabled = current === 0;
    next.hidden = current === screens.length - 1;
    next.textContent = current === stepCount - 1 ? 'Finish tour →' : 'Next →';
    const heading = screens[current].querySelector('h3')?.textContent || 'Tour step';
    announcement.textContent = current === stepCount ? 'Tour complete. What now?' : `Step ${current + 1} of ${stepCount}: ${heading}`;
  }

  back.addEventListener('click', () => showStep(current - 1));
  next.addEventListener('click', () => showStep(current + 1));
  dots.forEach((dot) => dot.addEventListener('click', () => showStep(Number(dot.dataset.tourGo))));
  tour.addEventListener('keydown', (event) => {
    const activePage = document.querySelector('.page-view:not([hidden])');
    if (activePage?.dataset.pageAnchor !== 'tour' || event.target.matches('input, textarea, select')) return;
    if (event.key === 'ArrowRight' && current < screens.length - 1) {
      event.preventDefault();
      showStep(current + 1);
    } else if (event.key === 'ArrowLeft' && current > 0) {
      event.preventDefault();
      showStep(current - 1);
    }
  });
  showStep(0);
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
      <td>${row.sourceIds.length ? cite(row.sourceIds, { full: true }) : 'Project analysis'}</td>
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
      if (!stage) return;
      updateChainUrl(stage.id);
      renderStageDetail(material, stage, activeStageTab);
      nodes.forEach((item) => {
        const active = item === node;
        item.classList.toggle('active', active);
        if (active) item.setAttribute('aria-current', 'true');
        else item.removeAttribute('aria-current');
      });
    });
  });

  const firstStage = material.stages[0];
  renderStageDetail(material, firstStage, activeStageTab);
  if (nodes[0]) {
    nodes[0].classList.add('active');
    nodes[0].setAttribute('aria-current', 'true');
  }
}

function renderStageDetail(material, stage, activeTab = activeStageTab) {
  if (!stage) return;
  const harmCase = harmCaseByStage[stage.id];
  const where = stage.where;
  const affected = stage.affected;
  const tabDefinitions = [
    { id: 'where', label: 'Where' },
    { id: 'affected', label: "Who's affected" },
    { id: 'evidence', label: 'Evidence' }
  ];
  const evidenceSources = stage.sourceIds?.length ? cite(stage.sourceIds) : 'Project analysis';
  stageDetail.innerHTML = `
    <div class="detail-header">
      <h3>${material.label} · ${stage.stage}</h3>
      <button class="share-stage" type="button" aria-label="Copy link to ${material.label} ${stage.stage.toLowerCase()} stage"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.07 0l3-3A5 5 0 0 0 13 2.93l-1.72 1.71m2.72 6.36a5 5 0 0 0-7.07 0l-3 3A5 5 0 0 0 11 21.07l1.71-1.71"/></svg> Share</button>
    </div>
    <div class="share-feedback" aria-live="polite"></div>
    <p class="stage-summary">${stage.location} · ${stage.risk} · <span class="confidence-label ${stage.confidence}">● ${stage.confidence}</span></p>
    <div class="stage-tabs" role="tablist" aria-label="Stage detail">
      ${tabDefinitions.map((tab) => `
        <button type="button" role="tab" id="tab-${tab.id}" aria-controls="panel-${tab.id}" aria-selected="${activeTab === tab.id}" tabindex="${activeTab === tab.id ? '0' : '-1'}" data-stage-tab="${tab.id}">${tab.label}</button>
      `).join('')}
    </div>
    <div role="tabpanel" id="panel-where" aria-labelledby="tab-where" tabindex="0"${activeTab === 'where' ? '' : ' hidden'}>
      ${where.text ? `<p>${where.text} ${cite(where.sourceIds)}</p>` : ''}
      ${where.share ? `
        <div class="concentration-bar" role="img" aria-label="${where.share.country} accounts for ${where.share.percent}%">
          <div class="concentration-bar-track"><span style="width:${where.share.percent}%"></span></div>
          <span>${where.share.country} ${where.share.percent}%</span>
        </div>
      ` : `<div class="data-gap"><strong>Data gap</strong><span>No reliable country share for this stage yet.</span></div>`}
    </div>
    <div role="tabpanel" id="panel-affected" aria-labelledby="tab-affected" tabindex="0"${activeTab === 'affected' ? '' : ' hidden'}>
      <p>${affected.summary} ${cite(affected.sourceIds)}</p>
      ${harmCase ? `<a class="harm-link" href="#human-cost-${harmCase}">Read the case file →</a>` : ''}
    </div>
    <div role="tabpanel" id="panel-evidence" aria-labelledby="tab-evidence" tabindex="0"${activeTab === 'evidence' ? '' : ' hidden'}>
      <ul class="stage-evidence-list">
        <li>${stage.evidence} <span class="confidence-label ${stage.confidence}">● ${stage.confidence}</span> ${evidenceSources}</li>
      </ul>
      <a href="#risks">All risks in the register →</a>
    </div>
  `;
  simplifyBodyLanguage(stageDetail);
  const page = stageDetail.closest('.page-view');
  const usedTerms = new Set([...page.querySelectorAll('.term')].map((button) => button.dataset.term));
  wrapJargonTerms(stageDetail, usedTerms);
}

function setupStageDetail() {
  stageDetail.addEventListener('click', (event) => {
    const tab = event.target.closest('[role="tab"][data-stage-tab]');
    if (tab) {
      activeStageTab = tab.dataset.stageTab;
      const materialKey = document.querySelector('.material-button.active')?.dataset.material || 'tungsten';
      const material = materialData[materialKey];
      const stageId = chainFlow.querySelector('.chain-node[aria-current="true"]')?.dataset.stageId;
      const stage = material.stages.find((item) => item.id === stageId);
      renderStageDetail(material, stage, activeStageTab);
      stageDetail.querySelector(`[role="tab"][data-stage-tab="${activeStageTab}"]`)?.focus();
      return;
    }

    const shareButton = event.target.closest('.share-stage');
    if (!shareButton) return;
    const stageId = chainFlow.querySelector('.chain-node[aria-current="true"]')?.dataset.stageId;
    if (!stageId) return;
    const url = new URL(window.location.href);
    url.hash = `chain-${stageId}`;
    copyStageLink(shareButton, url.href);
  });

  stageDetail.addEventListener('keydown', (event) => {
    const currentTab = event.target.closest('[role="tab"][data-stage-tab]');
    if (!currentTab) return;
    const tabs = [...stageDetail.querySelectorAll('[role="tab"][data-stage-tab]')];
    const currentIndex = tabs.indexOf(currentTab);
    let nextIndex;
    if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else return;
    event.preventDefault();
    activeStageTab = tabs[nextIndex].dataset.stageTab;
    const materialKey = document.querySelector('.material-button.active')?.dataset.material || 'tungsten';
    const material = materialData[materialKey];
    const stageId = chainFlow.querySelector('.chain-node[aria-current="true"]')?.dataset.stageId;
    const stage = material.stages.find((item) => item.id === stageId);
    renderStageDetail(material, stage, activeStageTab);
    stageDetail.querySelector(`[role="tab"][data-stage-tab="${activeStageTab}"]`)?.focus();
  });
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
      updateChainUrl(materialKey);
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
      const url = new URL(window.location.href);
      url.hash = button.closest('section')?.id || '';
      copyStageLink(button, url.href);
    });
  });

  document.querySelectorAll('.copy-button').forEach((button) => {
    button.addEventListener('click', () => {
      const copyContent = button.previousElementSibling?.cloneNode(true);
      copyContent?.querySelectorAll('.citation').forEach((citation) => citation.remove());
      const text = copyContent?.textContent || '';
      copyStageLink(button, text);
    });
  });
}

function setupLayerCards() {
  const visual = document.querySelector('.cutaway-visual');
  const svg = document.getElementById('tokamak-cutaway');
  const layerList = document.querySelector('.cutaway-layer-list');
  if (!visual || !svg || !layerList) return;

  const materials = {
    'deuterium-tritium': 'Deuterium and tritium',
    tungsten: 'Tungsten',
    lithium: 'Lithium-6',
    'rare-earths': 'REBCO or niobium-tin',
    steel: 'Steel'
  };
  const details = {
    plasma: ['Fuel burns here', 'Fusion fuel supply and tritium breeding depend on reactor design.'],
    'first-wall': ['Faces the plasma', 'Material choice and sourcing vary by design.'],
    divertor: ['Removes heat and exhaust', 'Tungsten refining concentration and traceability are key supply concerns.'],
    blanket: ['Makes new tritium and captures heat', 'Lithium-6 availability and blanket design remain significant supply uncertainties.'],
    shield: ['Protects the magnets', 'Tungsten carbide and steel requirements depend on reactor design.'],
    vessel: ['Sealed chamber', 'Industrial steel supply is not the main risk theme of this project.'],
    magnets: ['Confine the plasma', 'Material demand and upstream exposure depend on magnet architecture.'],
    cryostat: ['Keeps magnets cold', 'Industrial steel supply and helium logistics vary by plant design.']
  };

  function getLayer(target) {
    return target instanceof Element ? target.closest('.layer[data-layer], .cutaway-list-layer[data-layer]') : null;
  }

  function setHighlightedLayer(layer) {
    const layerId = layer?.dataset.layer;
    svg.classList.toggle('has-active-layer', Boolean(layerId));
    layerList.classList.toggle('has-active-layer', Boolean(layerId));
    [...svg.querySelectorAll('.layer'), ...layerList.querySelectorAll('.cutaway-list-layer')].forEach((item) => {
      item.classList.toggle('is-highlighted', item.dataset.layer === layerId);
    });
  }

  function selectLayer(layer) {
    const layerId = layer.dataset.layer;
    const materialKey = layer.dataset.material || 'tungsten';
    const relevantLink = layer.dataset.link || '#chain';
    const label = layer.querySelector('.layer-label')?.textContent.trim()
      || layer.childNodes[0]?.textContent.trim()
      || layerId;
    const [role, risk] = details[layerId] || ['Reactor component', 'Supply conditions vary by design.'];
    const material = materials[materialKey] || materialKey;
    document.getElementById('cutaway-detail').innerHTML = `
      <h3>${label}</h3>
      <p><strong>Role:</strong> ${role}</p>
      <p><strong>Materials:</strong> ${material}${layerId === 'cryostat' ? ', helium' : ''}</p>
      <p><strong>Key supply risk:</strong> ${risk}</p>
      <a href="${relevantLink}">Trace this mineral →</a>
    `;
    [...svg.querySelectorAll('.layer'), ...layerList.querySelectorAll('.cutaway-list-layer')].forEach((item) => {
      const active = item.dataset.layer === layerId;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
  }

  visual.addEventListener('pointerover', (event) => {
    const layer = getLayer(event.target);
    if (layer) setHighlightedLayer(layer);
  });
  visual.addEventListener('pointerout', (event) => {
    if (!visual.contains(event.relatedTarget)) setHighlightedLayer(null);
    else setHighlightedLayer(getLayer(event.relatedTarget));
  });
  visual.addEventListener('focusin', (event) => {
    const layer = getLayer(event.target);
    if (layer) setHighlightedLayer(layer);
  });
  visual.addEventListener('focusout', (event) => {
    if (!visual.contains(event.relatedTarget)) setHighlightedLayer(null);
    else setHighlightedLayer(getLayer(event.relatedTarget));
  });
  visual.addEventListener('click', (event) => {
    const layer = getLayer(event.target);
    if (layer) selectLayer(layer);
  });
  svg.addEventListener('keydown', (event) => {
    const layer = getLayer(event.target);
    if (!layer || !['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    selectLayer(layer);
  });
}

function init() {
  initNav();
  setupPageTabs();
  setupPageIntros();
  setupTour();
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
  setupStageDetail();
  setupRiskFilters();
  setupLadder();
  setupPrintAndCopy();
  setupLayerCards();
  setupCitationControls();
  simplifyBodyLanguage();
  setupJargonTerms();
}

init();
