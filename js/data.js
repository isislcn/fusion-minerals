const materialData = {
  tungsten: {
    label: 'Tungsten',
    id: 'tungsten',
    stages: [
      { id: 'tungsten-mine', stage: 'Mine', kind: 'mine', title: 'Mine', location: 'Eastern DR Congo', risk: 'Conflict finance in 3T mining; tungsten volumes are not quantified', confidence: 'reported', sourceIds: ['unsc-2025a'], evidence: 'UN experts report that M23 controls Rubaya, earns at least $800,000 a month from taxing coltan, and smuggles 3T minerals into Rwanda for blending with legal exports. Most evidence concerns coltan; tungsten volumes are not quantified.', relevant: ['all','eu','un'] },
      { id: 'tungsten-trade', stage: 'Trade', kind: 'trade', title: 'Trade', location: 'DR Congo and Rwanda', risk: 'Traceability and origin mixing', confidence: 'reported', sourceIds: ['unsc-2025a'], evidence: 'UN experts report that 3T minerals are smuggled into Rwanda and blended with legal exports.', relevant: ['all','eu','un'] },
      { id: 'tungsten-refine', stage: 'Refining', kind: 'refine', title: 'Refining', location: 'China', risk: 'Concentration and governance gaps', confidence: 'documented', sourceIds: ['usgs-2026'], evidence: 'China mined about 79% of the world’s tungsten in 2025 and produces about 80% of ammonium paratungstate (APT), a refined intermediate.', relevant: ['all','investors','un'] },
      { id: 'tungsten-components', stage: 'Components', kind: 'component', title: 'Components', location: 'Global industrial supply chains', risk: 'Due-diligence coverage varies by product and jurisdiction', confidence: 'documented', sourceIds: ['cmr-2017'], evidence: 'The EU Conflict Minerals Regulation covers specified imports of tungsten ores and concentrates, and metals; it does not cover tungsten inside all finished components.', relevant: ['all','investors','eu'] },
      { id: 'tungsten-plant', stage: 'Plant', kind: 'plant', title: 'Plant', location: 'Fusion plant procurement', risk: 'Procurement and design dependency', confidence: 'inferred', sourceIds: [], evidence: 'Early procurement decisions are an opportunity to specify sourcing expectations.', relevant: ['all','investors'] }
    ],
    tab: {
      where: 'China mined about 79% of the world’s tungsten in 2025 and produces about 80% of APT, the refined intermediate. Eastern Congo’s 3T trade runs through armed-group-controlled routes into Rwanda.',
      affected: 'See the documented cases on the <a href="#human-cost-rubaya">Human cost page →</a>',
      evidence: 'Stage-specific evidence is listed below.'
    }
  },
  lithium: {
    label: 'Lithium',
    id: 'lithium',
    stages: [
      { id: 'lithium-mine', stage: 'Mine', kind: 'mine', title: 'Mine', location: 'High Andean salt flats', risk: 'Water and Indigenous rights', confidence: 'reported', sourceIds: ['oc-2025'], evidence: 'Lithium extraction in the high Andean salt flats raises reported concerns about water and Indigenous rights.', relevant: ['all','eu','un'] },
      { id: 'lithium-trade', stage: 'Trade', kind: 'trade', title: 'Trade', location: 'Global ports and refineries', risk: 'Traceability and product substitution', confidence: 'documented', evidence: 'Bulk lithium supply is traded across many nodes; isotopic separation is the critical gap for lithium-6.', relevant: ['all','eu','un'] },
      { id: 'lithium-refine', stage: 'Refining', kind: 'refine', title: 'Refining', location: 'Global', risk: 'No established commercial lithium-6 supply at fusion-relevant scale', confidence: 'reported', sourceIds: ['pearson-2022'], evidence: 'Commercial lithium-6 supply at fusion-relevant scale is not established in the cited supply presentation.', relevant: ['all','investors','un'] },
      { id: 'lithium-components', stage: 'Components', kind: 'component', title: 'Components', location: 'Strategic manufacturing', risk: 'Traceability and due-diligence gaps', confidence: 'inferred', evidence: 'The sector is still early enough to build due diligence before major component procurement.', relevant: ['all','investors','eu'] },
      { id: 'lithium-plant', stage: 'Plant', kind: 'plant', title: 'Plant', location: 'Fusion plant footprint', risk: 'Procurement and design dependency', confidence: 'inferred', evidence: 'Pilot-plant demand is a key unknown and will depend on reactor design and blanket architecture.', relevant: ['all','investors'] }
    ],
    tab: {
      where: 'Lithium is produced for several established markets. Lithium-6 requires isotopic separation, so ordinary lithium production figures do not describe the supply available for fusion blanket concepts.',
      affected: 'See the documented cases on the <a href="#human-cost-andes">Human cost page →</a>',
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
      { id: 'beryllium-components', stage: 'Components', kind: 'component', title: 'Components', location: 'Beryllium processing and machining plants', risk: 'Occupational exposure and chronic disease', confidence: 'documented', sourceIds: ['atsdr-2008'], evidence: 'Inhaled beryllium particles can sensitize workers and lead to chronic beryllium disease.', relevant: ['all','investors','eu'] },
      { id: 'beryllium-plant', stage: 'Plant', kind: 'plant', title: 'Plant', location: 'Fusion project procurement', risk: 'Design-dependent supply conditions', confidence: 'inferred', evidence: 'The risk will vary by blanket design and reactor architecture.', relevant: ['all','investors'] }
    ],
    tab: {
      where: 'Beryllium has industrial uses, while public information on a complete fusion-specific supply chain and plant-level demand profile remains limited.',
      affected: 'See the documented cases on the <a href="#human-cost-beryllium">Human cost page →</a>',
      evidence: 'The evidence base is limited. The entries are labeled inferred where they describe research gaps or potential procurement implications rather than documented fusion sourcing.'
    }
  },
  ree: {
    label: 'Rare earths',
    id: 'ree',
    stages: [
      { id: 'ree-mine', stage: 'Mine', kind: 'mine', title: 'Mine', location: 'Kachin State, Myanmar', risk: 'Pollution, health and land rights', confidence: 'reported', sourceIds: ['gw-2024'], evidence: 'Mining sites in Kachin Special Region 1 rose by more than 40% from 2021 to 2023, to over 300. China’s imports of heavy rare earth oxides from Myanmar more than doubled, from 19,500 to 41,700 tonnes. Streams near the mines test highly acidic with elevated arsenic.', relevant: ['all','eu','un'] },
      { id: 'ree-trade', stage: 'Trade', kind: 'trade', title: 'Trade', location: 'China and regional hubs', risk: 'Mixed origin and limited traceability', confidence: 'documented', evidence: 'Heavy rare earth inputs move through global trade channels and can be difficult to trace by origin without stronger procurement rules.', relevant: ['all','eu','un'] },
      { id: 'ree-refine', stage: 'Refining', kind: 'refine', title: 'Refining', location: 'China', risk: 'Concentration and governance gaps', confidence: 'documented', evidence: 'China accounts for roughly 80% of rare earth refining; the issue is concentrated in a small number of processing nodes.', relevant: ['all','investors','un'] },
      { id: 'ree-components', stage: 'Components', kind: 'component', title: 'Components', location: 'Magnet and component manufacturing', risk: 'Traceability and source conditions', confidence: 'inferred', evidence: 'The project shows the need to map materials before major superconducting and magnet procurement.', relevant: ['all','investors','eu'] },
      { id: 'ree-plant', stage: 'Plant', kind: 'plant', title: 'Plant', location: 'Fusion plant procurement', risk: 'Procurement lock-in', confidence: 'inferred', evidence: 'The cost of deeper sourcing due diligence rises once contracts are signed.', relevant: ['all','investors'] }
    ],
    tab: {
      where: 'Mining sites in Kachin Special Region 1 rose by more than 40% from 2021 to 2023, and China’s imports of heavy rare earth oxides from Myanmar more than doubled, from 19,500 to 41,700 tonnes. Streams near the mines test highly acidic with elevated arsenic.',
      affected: 'See the documented cases on the <a href="#human-cost-kachin">Human cost page →</a>',
      evidence: 'Stage-specific evidence is listed below.'
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
  { id: 'crma-2024', type: 'eu-law', cite: 'Regulation (EU) 2024/1252, 2024', apa: 'Regulation (EU) 2024/1252 of the European Parliament and of the Council of 11 April 2024 establishing a framework for ensuring a secure and sustainable supply of critical raw materials. (2024). <i>Official Journal of the European Union</i>.', url: 'http://data.europa.eu/eli/reg/2024/1252/oj', verify: true },
  { id: 'nzia-2024', type: 'eu-law', cite: 'Regulation (EU) 2024/1735, 2024', apa: 'Regulation (EU) 2024/1735 of the European Parliament and of the Council of 13 June 2024 on establishing a framework of measures for strengthening Europe’s net-zero technology manufacturing ecosystem. (2024). <i>Official Journal of the European Union</i>.', url: 'http://data.europa.eu/eli/reg/2024/1735/oj', verify: true },
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
SOURCES.sort((a, b) => a.apa.localeCompare(b.apa));

const TIMELINE = [
  { t: 2025.10, date: 'Feb 2025', text: 'China adds export licensing for tungsten', line: 'fusion', audiences: ['investors', 'eu'], status: 'done', sourceIds: ['usgs-2026'] },
  { t: 2025.95, date: 'Dec 2025', text: 'UN Task Force on Critical Energy Transition Minerals launched', line: 'global', audiences: ['un'], status: 'done', sourceIds: ['unctad-2026'] },
  { t: 2026.15, date: 'Feb 2026', text: 'US NRC proposes a regulatory framework for fusion machines', line: 'global', audiences: ['investors'], status: 'done', sourceIds: ['nrc-2026'] },
  { t: 2026.20, date: 'Mar 2026', text: 'Euratom 2026–27 commits €222 million to fusion', line: 'eu', audiences: ['eu', 'investors'], status: 'done', sourceIds: ['ec-2026'] },
  { t: 2026.45, date: '2026', text: 'EU Conflict Minerals Regulation under review', line: 'eu', audiences: ['eu'], status: 'planned', sourceIds: ['cmr-2017'] },
  { t: 2026.55, date: 'Jul 2026', text: 'Critical Raw Materials Act amendments reach Parliament', line: 'eu', audiences: ['eu', 'investors'], status: 'done', sourceIds: ['ep-2026'] },
  { t: 2026.53, date: 'Jul 2026', text: 'First UN High-Level Meeting on critical energy transition minerals', line: 'global', audiences: ['un'], status: 'done', sourceIds: ['unctad-2026'] },
  { t: 2026.75, date: 'Sep–Oct 2026', text: 'UN study on a traceability framework', line: 'global', audiences: ['un'], status: 'done', sourceIds: ['unctad-2026'] },
  { t: 2027.00, date: 'Pending', text: 'EU Fusion Strategy', line: 'eu', audiences: ['eu', 'investors'], status: 'pending', sourceIds: ['evroux-2026'] },
  { t: 2027.30, date: '2027', text: 'SPARC first plasma targeted', line: 'fusion', audiences: ['investors', 'eu', 'un'], status: 'planned', sourceIds: ['wnn-2026'] },
  { t: 2027.40, date: '2027', text: 'UN expert discussions on the traceability framework', line: 'global', audiences: ['un'], status: 'planned', sourceIds: ['unctad-2026'] },
  { t: 2027.62, date: 'Aug 2027', text: 'EU battery due diligence applies (lithium in batteries only)', line: 'eu', audiences: ['eu'], status: 'planned', sourceIds: ['batt-2023'] },
  { t: 2027.95, date: 'Dec 2027', text: 'EU ban on products made with forced labour applies', line: 'eu', audiences: ['eu', 'investors', 'un'], status: 'planned', sourceIds: ['flr-2024'] },
  { t: 2027.97, date: 'Dec 2027', text: 'Statutory deadline for the US fusion rule', line: 'global', audiences: ['investors'], status: 'planned', sourceIds: ['nrc-2026'] },
  { t: 2028.30, date: '2028', text: 'Helion’s power delivery target for Microsoft', line: 'fusion', audiences: ['investors'], status: 'planned', sourceIds: ['wnn-2026'] },
  { t: 2029.55, date: 'Jul 2029', text: 'EU CSDDD applies to the largest firms', line: 'eu', audiences: ['eu', 'investors'], status: 'planned', sourceIds: ['csddd-2024'] },
  { t: 2031.50, date: 'Early 2030s', text: 'First commercial plants, e.g. CFS ARC', line: 'fusion', audiences: ['investors', 'eu', 'un'], status: 'planned', sourceIds: ['wnn-2026'] }
];

const riskRows = [
  { id: 'W-MINE-01', material: 'Tungsten', stage: 'Mine', risk: 'Conflict finance', location: 'Eastern DR Congo', confidence: 'reported', sourceIds: ['unsc-2025a'], type: 'conflict finance' },
  { id: 'W-MINE-02', material: 'Tungsten', stage: 'Mine', risk: 'Worker deaths', location: 'Rubaya, North Kivu', confidence: 'reported', sourceIds: ['reuters-2026', 'ap-2026', 'unsc-2025a'], type: 'worker safety' },
  { id: 'W-REF-01', material: 'Tungsten', stage: 'Refining', risk: 'Supply concentration', location: 'China', confidence: 'documented', sourceIds: ['usgs-2026'], type: 'supply concentration' },
  { id: 'REE-MINE-01', material: 'Rare earths', stage: 'Mine', risk: 'Pollution', location: 'Kachin State, Myanmar', confidence: 'reported', sourceIds: ['gw-2024'], type: 'pollution' },
  { id: 'REE-MINE-02', material: 'Rare earths', stage: 'Mine', risk: 'Health and land rights', location: 'Kachin Special Region 1', confidence: 'reported', sourceIds: ['gw-2024'], type: 'health' },
  { id: 'REE-REF-01', material: 'Rare earths', stage: 'Refining', risk: 'Traceability gap', location: 'China', confidence: 'inferred', sourceIds: [], type: 'traceability gap' },
  { id: 'LI-MINE-01', material: 'Lithium', stage: 'Mine', risk: 'Water and Indigenous rights', location: 'High Andean salt flats', confidence: 'reported', sourceIds: ['oc-2025'], type: 'land and water' },
  { id: 'LI-MINE-02', material: 'Lithium', stage: 'Mine', risk: 'Indigenous rights', location: 'High Andean salt flats', confidence: 'reported', sourceIds: ['oc-2025'], type: 'Indigenous rights' },
  { id: 'LI-REF-01', material: 'Lithium', stage: 'Refining', risk: 'Supply concentration', location: 'Global', confidence: 'inferred', sourceIds: [], type: 'supply concentration' },
  { id: 'LI-PLANT-01', material: 'Lithium', stage: 'Plant', risk: 'Regulatory gap', location: 'Fusion market', confidence: 'inferred', sourceIds: [], type: 'regulatory gap' },
  { id: 'BE-COMP-01', material: 'Beryllium', stage: 'Components', risk: 'Occupational health', location: 'United States', confidence: 'documented', sourceIds: ['atsdr-2008'], type: 'health' },
  { id: 'BE-COMP-02', material: 'Beryllium', stage: 'Components', risk: 'Occupational disease', location: 'US plants', confidence: 'documented', sourceIds: ['atsdr-2008'], type: 'worker safety' },
  { id: 'W-COMP-01', material: 'Tungsten', stage: 'Components', risk: 'Regulatory gap', location: 'Global components', confidence: 'inferred', sourceIds: [], type: 'regulatory gap' },
  { id: 'REE-COMP-01', material: 'Rare earths', stage: 'Components', risk: 'Traceability gap', location: 'Magnet manufacturing', confidence: 'inferred', sourceIds: [], type: 'traceability gap' },
  { id: 'LI-COMP-01', material: 'Lithium', stage: 'Components', risk: 'Supply concentration', location: 'Strategic manufacturing', confidence: 'inferred', sourceIds: [], type: 'supply concentration' }
];

const allMaterials = Object.keys(materialData);
const defaultStageOrder = ['mine', 'trade', 'refine', 'component', 'plant'];
