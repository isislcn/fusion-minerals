const materialData = {
  tungsten: {
    label: 'Tungsten',
    id: 'tungsten',
    stages: [
      { id: 'tungsten-mine', stage: 'Mine', kind: 'mine', title: 'Mine', location: 'Eastern DR Congo', risk: 'Reported 3T-related conflict-finance exposure; tungsten link unverified', confidence: 'reported', evidence: 'UN and field reporting describe armed-group taxation in 3T mining areas, with much reporting focused on coltan. This regional context does not establish tungsten extraction at a specific site or sourcing by a fusion company.', relevant: ['all','eu','un'] },
      { id: 'tungsten-trade', stage: 'Trade', kind: 'trade', title: 'Trade', location: 'Regional trading hubs', risk: 'Traceability and origin mixing', confidence: 'documented', evidence: 'Multiple trade and processing steps can complicate origin tracing. The public evidence summarized here does not establish a route from a specific mine to a fusion component.', relevant: ['all','eu','un'] },
      { id: 'tungsten-refine', stage: 'Refining', kind: 'refine', title: 'Refining', location: 'China', risk: 'Concentration and governance gaps', confidence: 'documented', evidence: 'China accounts for around 80% of APT and tungsten refining capacity.', relevant: ['all','investors','un'] },
      { id: 'tungsten-components', stage: 'Components', kind: 'component', title: 'Components', location: 'Global industrial supply chains', risk: 'Due-diligence coverage varies by product and jurisdiction', confidence: 'inferred', evidence: 'The EU Conflict Minerals Regulation applies to specified 3TG imports and thresholds; it does not create universal traceability requirements for every finished product or component.', relevant: ['all','investors','eu'] },
      { id: 'tungsten-plant', stage: 'Plant', kind: 'plant', title: 'Plant', location: 'Fusion plant footprint', risk: 'Project delivery risk and offtake conditions', confidence: 'inferred', evidence: 'Procurement and sourcing conditions will matter before the first commercial plant is built.', relevant: ['all','investors'] }
    ],
    tab: {
      where: 'Tungsten mining and processing are concentrated in a limited number of countries. Separate reporting on 3T minerals in eastern DR Congo provides regional conflict-finance context, but does not establish a tungsten link to a specific mine or fusion buyer.',
      affected: 'Mining and processing communities may face distinct labour, environmental and governance risks. The evidence summarized here should not be read as showing that all tungsten-producing areas share the same risk profile.',
      evidence: 'The evidence combines commodity and trade information with UN and field reporting. The eastern DR Congo material is classified as reported and is not direct evidence of tungsten sourcing by fusion companies.'
    }
  },
  lithium: {
    label: 'Lithium',
    id: 'lithium',
    stages: [
      { id: 'lithium-mine', stage: 'Mine', kind: 'mine', title: 'Mine', location: 'Global', risk: 'Concentration and energy intensity', confidence: 'documented', evidence: 'Lithium mining is globally distributed but the chain for lithium-6 is different and much less mature.', relevant: ['all','eu','un'] },
      { id: 'lithium-trade', stage: 'Trade', kind: 'trade', title: 'Trade', location: 'Global ports and refineries', risk: 'Traceability and product substitution', confidence: 'documented', evidence: 'Bulk lithium supply is traded across many nodes; isotopic separation is the critical gap for lithium-6.', relevant: ['all','eu','un'] },
      { id: 'lithium-refine', stage: 'Refining', kind: 'refine', title: 'Refining', location: 'Global', risk: 'No established commercial lithium-6 supply at fusion-relevant scale', confidence: 'documented', evidence: 'Public information does not establish commercial lithium-6 supply at the scale discussed in fusion blanket estimates; strategic stocks and historical production are not equivalent to current commercial supply.', relevant: ['all','investors','un'] },
      { id: 'lithium-components', stage: 'Components', kind: 'component', title: 'Components', location: 'Strategic manufacturing', risk: 'Traceability and due-diligence gaps', confidence: 'inferred', evidence: 'The sector is still early enough to build due diligence before major component procurement.', relevant: ['all','investors','eu'] },
      { id: 'lithium-plant', stage: 'Plant', kind: 'plant', title: 'Plant', location: 'Fusion plant footprint', risk: 'Procurement and design dependency', confidence: 'inferred', evidence: 'Pilot-plant demand is a key unknown and will depend on reactor design and blanket architecture.', relevant: ['all','investors'] }
    ],
    tab: {
      where: 'Lithium is produced for several established markets. Lithium-6 requires isotopic separation, so ordinary lithium production figures do not describe the supply available for fusion blanket concepts.',
      affected: 'Potential constraints include isotopic-separation capacity, qualification and the scale of future blanket demand; public evidence is insufficient to quantify a commercial supply gap precisely.',
      evidence: 'The assessment compares published strategic and demand information. Estimates depend on reactor and blanket design and should not be treated as a settled forecast.'
    }
  },
  beryllium: {
    label: 'Beryllium',
    id: 'beryllium',
    stages: [
      { id: 'beryllium-mine', stage: 'Mine', kind: 'mine', title: 'Mine', location: 'Limited producing countries', risk: 'Concentrated supply and limited fusion-specific visibility', confidence: 'inferred', evidence: 'Public sources reviewed for this project do not provide a complete mine-to-fusion chain or a reliable plant-level demand estimate.', relevant: ['all','eu','un'] },
      { id: 'beryllium-trade', stage: 'Trade', kind: 'trade', title: 'Trade', location: 'Global trade flows', risk: 'Traceability gaps', confidence: 'inferred', evidence: 'No definitive fusion-specific chain is yet public, which increases uncertainty.', relevant: ['all','eu','un'] },
      { id: 'beryllium-refine', stage: 'Refining', kind: 'refine', title: 'Refining', location: 'Limited processing nodes', risk: 'Concentration', confidence: 'inferred', evidence: 'Processing is limited and the design dependence of beryllium use is still unclear.', relevant: ['all','investors','un'] },
      { id: 'beryllium-components', stage: 'Components', kind: 'component', title: 'Components', location: 'Specialist materials production', risk: 'Governance without explicit fusion rules', confidence: 'inferred', evidence: 'The fusion market is small enough to impose due diligence before procurement scales.', relevant: ['all','investors','eu'] },
      { id: 'beryllium-plant', stage: 'Plant', kind: 'plant', title: 'Plant', location: 'Fusion project procurement', risk: 'Design-dependent supply conditions', confidence: 'inferred', evidence: 'The risk will vary by blanket design and reactor architecture.', relevant: ['all','investors'] }
    ],
    tab: {
      where: 'Beryllium has industrial uses, but the public evidence reviewed here does not establish a complete fusion-specific supply chain or plant-level demand profile.',
      affected: 'The project cannot identify fusion-specific exposure for particular producers, workers or communities from the available public evidence.',
      evidence: 'The evidence base is limited. The entries are labeled inferred where they describe research gaps or potential procurement implications rather than documented fusion sourcing.'
    }
  },
  ree: {
    label: 'Rare earths',
    id: 'ree',
    stages: [
      { id: 'ree-mine', stage: 'Mine', kind: 'mine', title: 'Mine', location: 'Kachin State, Myanmar', risk: 'Reported pollution associated with heavy rare-earth mining', confidence: 'reported', evidence: 'Reporting describes an increase of more than 40% in identified leaching sites in Kachin Special Region 1 from 2021–23, while China’s heavy rare-earth oxide imports from Myanmar also rose. These indicators do not establish the origin of material used in any fusion component.', relevant: ['all','eu','un'] },
      { id: 'ree-trade', stage: 'Trade', kind: 'trade', title: 'Trade', location: 'China and regional hubs', risk: 'Mixed origin and limited traceability', confidence: 'documented', evidence: 'Heavy rare earth inputs move through global trade channels and can be difficult to trace by origin without stronger procurement rules.', relevant: ['all','eu','un'] },
      { id: 'ree-refine', stage: 'Refining', kind: 'refine', title: 'Refining', location: 'China', risk: 'Concentration and governance gaps', confidence: 'documented', evidence: 'China accounts for roughly 80% of rare earth refining; the issue is concentrated in a small number of processing nodes.', relevant: ['all','investors','un'] },
      { id: 'ree-components', stage: 'Components', kind: 'component', title: 'Components', location: 'Magnet and component manufacturing', risk: 'Traceability and source conditions', confidence: 'inferred', evidence: 'The project shows the need to map materials before major superconducting and magnet procurement.', relevant: ['all','investors','eu'] },
      { id: 'ree-plant', stage: 'Plant', kind: 'plant', title: 'Plant', location: 'Fusion plant procurement', risk: 'Procurement lock-in', confidence: 'inferred', evidence: 'The cost of deeper sourcing due diligence rises once contracts are signed.', relevant: ['all','investors'] }
    ],
    tab: {
      where: 'Some magnet technologies use rare-earth-containing materials, but requirements vary by design. Mining, trade and refining are distinct stages, and concentration estimates should be tied to the specific material and stage measured.',
      affected: 'Reports from some producing regions describe environmental and governance concerns. They should not be generalized to every mine or treated as evidence of a link to a fusion buyer.',
      evidence: 'Mine-level risks are labeled reported because they rely on external reporting. Trade and refining concentration provide broader supply-chain context, not proof of fusion procurement.'
    }
  }
};

const SOURCES = [
  { id: 'atsdr-2008', type: 'us-uk', cite: 'ATSDR, 2008', apa: 'Agency for Toxic Substances and Disease Registry. (2008). <i>Beryllium toxicity: Who is at risk of exposure to beryllium?</i> Centers for Disease Control and Prevention.', url: 'https://archive.cdc.gov/www_atsdr_cdc_gov/csem/beryllium/who_risk.html', verify: false },
  { id: 'ap-2025', type: 'news', cite: 'Associated Press, 2025', apa: 'Associated Press. (2025, July 4). UN experts say Rwanda supported rebels in Congo and smuggled minerals at "unprecedented levels." <i>WSLS</i>.', url: 'https://www.wsls.com/news/world/2025/07/04/un-experts-say-rwanda-supported-rebels-in-congo-and-smuggled-minerals-at-unprecedented-levels/', verify: false },
  { id: 'ap-2026', type: 'news', cite: 'Associated Press, 2026', apa: 'Associated Press. (2026, March). Mine collapse in eastern Congo leaves 200 dead, authorities say. But rebels dispute the number. <i>WTOP</i>.', url: 'https://wtop.com/world/2026/03/at-least-200-dead-in-a-congo-coltan-mine-collapse-authorities-say-as-rebels-dispute-toll', verify: false },
  { id: 'desnz-2026', type: 'us-uk', cite: 'DESNZ, 2026', apa: 'Department for Energy Security and Net Zero. (2026). <i>Fusion regulation landscape: An overview of regulations for fusion in England and Wales</i>. GOV.UK.', url: 'https://assets.publishing.service.gov.uk/media/6aa2cea85f6e942efe37f135/fusion-regulation-landscap-guidance.pdf', verify: false },
  { id: 'csddd-2024', type: 'eu-law', cite: 'Directive (EU) 2024/1760, 2024', apa: 'Directive (EU) 2024/1760 of the European Parliament and of the Council of 13 June 2024 on corporate sustainability due diligence. (2024). <i>Official Journal of the European Union</i>.', url: 'http://data.europa.eu/eli/dir/2024/1760/oj', verify: false },
  { id: 'ec-2026', type: 'eu-law', cite: 'European Commission, 2026', apa: 'European Commission. (2026, March 19). <i>EU to invest €330 million to accelerate fusion energy and support nuclear technologies and skills</i> [Press release].', url: 'https://europa.eu/newsroom/ecpc-failover/pdf/ip-26-651_en.pdf', verify: false },
  { id: 'ep-2026', type: 'eu-law', cite: 'European Parliament, 2026', apa: 'European Parliament. (2026). <i>Amendments to the Critical Raw Materials Act</i> (Procedure 2025/0385(COD)) [Legislative Observatory].', url: 'https://oeil.europarl.europa.eu/oeil/en/document-summary?id=1907865', verify: false },
  { id: 'evroux-2026', type: 'research', cite: 'Evroux, 2026', apa: 'Evroux, C. (2026, May 18). <i>Nuclear fusion: State of play</i> [Briefing]. European Parliamentary Research Service.', url: 'https://epthinktank.eu/2026/05/18/nuclear-fusion-state-of-play/', verify: false },
  { id: 'fia-2025', type: 'industry', cite: 'Fusion Industry Association, 2025', apa: 'Fusion Industry Association. (2025). <i>The global fusion industry in 2025</i>.', url: 'https://realtafusion.com/wp-content/uploads/2026/02/2025-FIA-Global-Fusion-Industry-Report.pdf', verify: true },
  { id: 'gw-2022', type: 'ngo', cite: 'Global Witness, 2022', apa: 'Global Witness. (2022). <i>Myanmar’s poisoned mountains</i>.', url: '', verify: true },
  { id: 'gw-2024', type: 'ngo', cite: 'Global Witness, 2024', apa: 'Global Witness. (2024, May 23). <i>Fuelling the future, poisoning the present: Myanmar’s rare earth boom</i>.', url: 'https://www.globalwitness.org/en/campaigns/natural-resource-governance/fuelling-the-future-poisoning-the-present-myanmars-rare-earth-boom/', verify: false },
  { id: 'ilo-2022', type: 'un', cite: 'ILO et al., 2022', apa: 'International Labour Organization, Walk Free, & International Organization for Migration. (2022). <i>Global estimates of modern slavery: Forced labour and forced marriage</i>. International Labour Organization.', url: '', verify: true },
  { id: 'ipis-2024', type: 'ngo', cite: 'IPIS, 2024', apa: 'IPIS. (2024, December 4). <i>EU acknowledges shortcomings of the EU Conflict Minerals Regulation</i> [Policy paper].', url: 'https://ipisresearch.be/wp-content/uploads/2024/12/20241204_IPIS-Policy-paper_EU-acknowledges-shortcomings-EUCMR.pdf', verify: true },
  { id: 'oc-2025', type: 'ngo', cite: 'Observatorio Ciudadano et al., 2025', apa: 'Observatorio Ciudadano, Centro de Estudios Legales y Sociales, & CIDES-UMSA. (2025). <i>Lithium and human rights in the high Andean salt flats of Argentina, Bolivia and Chile</i>. FIDH.', url: 'https://www.fidh.org/IMG/pdf/lithium_and_human_rights_in_the_high_andean_salt_flats_of_argentina_bolivia_and_chile.pdf', verify: false },
  { id: 'oecd-2016', type: 'research', cite: 'OECD, 2016', apa: 'OECD. (2016). <i>OECD due diligence guidance for responsible supply chains of minerals from conflict-affected and high-risk areas</i> (3rd ed.). OECD Publishing.', url: 'https://doi.org/10.1787/9789264252479-en', verify: false },
  { id: 'pearson-2022', type: 'research', cite: 'Pearson, 2022', apa: 'Pearson, R. J. (2022, June 8). <i>Resource availability and supply</i> [Conference presentation]. IAEA Technical Meeting on Fusion Supply Chains, Vienna, Austria.', url: 'https://conferences.iaea.org/event/285/contributions/22687/attachments/11981/19520/IAEA%20Resource%20availability%20&%20supply%20RJPearson_8June2022.pdf', verify: false },
  { id: 'cmr-2017', type: 'eu-law', cite: 'Regulation (EU) 2017/821, 2017', apa: 'Regulation (EU) 2017/821 of the European Parliament and of the Council of 17 May 2017 laying down supply chain due diligence obligations for Union importers of tin, tantalum and tungsten, their ores, and gold originating from conflict-affected and high-risk areas. (2017). <i>Official Journal of the European Union</i>.', url: 'http://data.europa.eu/eli/reg/2017/821/oj', verify: false },
  { id: 'batt-2023', type: 'eu-law', cite: 'Regulation (EU) 2023/1542, 2023', apa: 'Regulation (EU) 2023/1542 of the European Parliament and of the Council of 12 July 2023 concerning batteries and waste batteries. (2023). <i>Official Journal of the European Union</i>.', url: 'http://data.europa.eu/eli/reg/2023/1542/oj', verify: false },
  { id: 'crma-2024', type: 'eu-law', cite: 'Regulation (EU) 2024/1252, 2024', apa: 'Regulation (EU) 2024/1252 of the European Parliament and of the Council of 11 April 2024 establishing a framework for ensuring a secure and sustainable supply of critical raw materials. (2024). <i>Official Journal of the European Union</i>.', url: 'http://data.europa.eu/eli/reg/2024/1252/oj', verify: false },
  { id: 'nzia-2024', type: 'eu-law', cite: 'Regulation (EU) 2024/1735, 2024', apa: 'Regulation (EU) 2024/1735 of the European Parliament and of the Council of 13 June 2024 on establishing a framework of measures for strengthening Europe’s net-zero technology manufacturing ecosystem. (2024). <i>Official Journal of the European Union</i>.', url: 'http://data.europa.eu/eli/reg/2024/1735/oj', verify: false },
  { id: 'flr-2024', type: 'eu-law', cite: 'Regulation (EU) 2024/3015, 2024', apa: 'Regulation (EU) 2024/3015 of the European Parliament and of the Council on prohibiting products made with forced labour on the Union market. (2024). <i>Official Journal of the European Union</i>.', url: 'http://data.europa.eu/eli/reg/2024/3015/oj', verify: true },
  { id: 'reuters-2026', type: 'news', cite: 'Reuters, 2026', apa: 'Reuters. (2026, February 1). More than 200 killed in coltan mine collapse in east Congo, official says. <i>The National</i>.', url: 'https://www.thenationalnews.com/news/2026/02/01/more-than-200-killed-in-mine-collapse-in-eastern-drc', verify: false },
  { id: 'scsp-2025', type: 'research', cite: 'Special Competitive Studies Project, 2025', apa: 'Special Competitive Studies Project. (2025). <i>Fusion supply chain report</i>.', url: 'https://www.scsp.ai/wp-content/uploads/2025/12/Fusion-Supply-Chain-Report.pdf', verify: false },
  { id: 'stoop-2018', type: 'research', cite: 'Stoop et al., 2018', apa: 'Stoop, N., Verpoorten, M., & van der Windt, P. (2018). More legislation, more violence? The impact of Dodd-Frank in the DRC. <i>PLOS ONE, 13</i>(8), Article e0201783.', url: 'https://doi.org/10.1371/journal.pone.0201783', verify: false },
  { id: 'unpanel-2024', type: 'un', cite: 'UN Secretary-General’s Panel, 2024', apa: 'UN Secretary-General’s Panel on Critical Energy Transition Minerals. (2024). <i>Resourcing the energy transition: Principles to guide critical energy transition minerals towards equity and justice</i>. United Nations.', url: 'https://www.un.org/en/climatechange/critical-minerals', verify: false },
  { id: 'unsc-2025a', type: 'un', cite: 'UN Security Council, 2025a', apa: 'UN Security Council. (2025a). <i>Letter dated 3 July 2025 from the Group of Experts on the Democratic Republic of the Congo addressed to the President of the Security Council</i> (S/2025/446).', url: 'https://undocs.org/S/2025/446', verify: false },
  { id: 'unsc-2025b', type: 'un', cite: 'UN Security Council, 2025b', apa: 'UN Security Council. (2025b). <i>Midterm report of the Group of Experts on the Democratic Republic of the Congo</i> (S/2025/858).', url: 'https://undocs.org/S/2025/858', verify: false },
  { id: 'unctad-2026', type: 'un', cite: 'UNCTAD, 2026', apa: 'UNCTAD. (2026). <i>UN system follow-up to the Secretary-General’s Panel on Critical Energy Transition Minerals</i>.', url: 'https://unctad.org/project/un-system-follow-up-to-panel-on-critical-energy-transition-minerals', verify: false },
  { id: 'usgs-2026', type: 'us-uk', cite: 'USGS, 2026', apa: 'U.S. Geological Survey. (2026). <i>Mineral commodity summaries 2026: Tungsten</i>.', url: 'https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-tungsten.pdf', verify: true },
  { id: 'nrc-2026', type: 'us-uk', cite: 'U.S. Nuclear Regulatory Commission, 2026', apa: 'U.S. Nuclear Regulatory Commission. (2026, February 26). Regulatory framework for fusion machines [Proposed rule]. <i>Federal Register</i> (Doc. 2026-03865).', url: 'https://www.govinfo.gov/content/pkg/FR-2026-02-26/pdf/2026-03865.pdf', verify: false },
  { id: 'wnn-2026', type: 'news', cite: 'World Nuclear News, 2026', apa: 'World Nuclear News. (2026). Fusion industry raised USD4.5 billion in past year, report says.', url: 'https://wnn.world-nuclear.org/articles/fusion-industry-raised-usd45-billion-over-past-year-report-says', verify: true }
];

const riskRows = [
  { id: 'W-MINE-01', material: 'Tungsten', stage: 'Mine', risk: 'Conflict finance', location: 'Eastern DR Congo', confidence: 'reported', sourceIds: ['unsc-2025a'], type: 'conflict finance' },
  { id: 'W-REF-01', material: 'Tungsten', stage: 'Refining', risk: 'Supply concentration', location: 'China', confidence: 'documented', sourceIds: ['usgs-2026'], type: 'supply concentration' },
  { id: 'REE-MINE-01', material: 'Rare earths', stage: 'Mine', risk: 'Pollution', location: 'Kachin State, Myanmar', confidence: 'reported', sourceIds: ['gw-2024'], type: 'pollution' },
  { id: 'REE-REF-01', material: 'Rare earths', stage: 'Refining', risk: 'Traceability gap', location: 'China', confidence: 'inferred', sourceIds: [], type: 'traceability gap' },
  { id: 'LI-REF-01', material: 'Lithium', stage: 'Refining', risk: 'Supply concentration', location: 'Global', confidence: 'inferred', sourceIds: [], type: 'supply concentration' },
  { id: 'LI-PLANT-01', material: 'Lithium', stage: 'Plant', risk: 'Regulatory gap', location: 'Fusion market', confidence: 'inferred', sourceIds: [], type: 'regulatory gap' },
  { id: 'BE-COMP-01', material: 'Beryllium', stage: 'Components', risk: 'Occupational health', location: 'United States', confidence: 'documented', sourceIds: ['atsdr-2008'], type: 'health' },
  { id: 'W-COMP-01', material: 'Tungsten', stage: 'Components', risk: 'Regulatory gap', location: 'Global components', confidence: 'inferred', sourceIds: [], type: 'regulatory gap' },
  { id: 'REE-COMP-01', material: 'Rare earths', stage: 'Components', risk: 'Traceability gap', location: 'Magnet manufacturing', confidence: 'inferred', sourceIds: [], type: 'traceability gap' },
  { id: 'LI-COMP-01', material: 'Lithium', stage: 'Components', risk: 'Supply concentration', location: 'Strategic manufacturing', confidence: 'inferred', sourceIds: [], type: 'supply concentration' }
];

const allMaterials = Object.keys(materialData);
const defaultStageOrder = ['mine', 'trade', 'refine', 'component', 'plant'];
