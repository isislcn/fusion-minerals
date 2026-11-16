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

const riskRows = [
  { id: 'W-MINE-01', material: 'Tungsten', stage: 'Mine', risk: 'Conflict finance', location: 'Eastern DR Congo', confidence: 'reported', source: 'UN reporting / field accounts', type: 'conflict finance' },
  { id: 'W-REF-01', material: 'Tungsten', stage: 'Refining', risk: 'Supply concentration', location: 'China', confidence: 'documented', source: 'USGS / industry summaries', type: 'supply concentration' },
  { id: 'REE-MINE-01', material: 'Rare earths', stage: 'Mine', risk: 'Pollution', location: 'Kachin State, Myanmar', confidence: 'reported', source: 'NGO and reporting interviews', type: 'pollution' },
  { id: 'REE-REF-01', material: 'Rare earths', stage: 'Refining', risk: 'Traceability gap', location: 'China', confidence: 'documented', source: 'Trade and refining analysis', type: 'traceability gap' },
  { id: 'LI-REF-01', material: 'Lithium', stage: 'Refining', risk: 'Supply concentration', location: 'Global', confidence: 'documented', source: 'Strategic supply summaries', type: 'supply concentration' },
  { id: 'LI-PLANT-01', material: 'Lithium', stage: 'Plant', risk: 'Regulatory gap', location: 'Fusion market', confidence: 'inferred', source: 'Due-diligence review', type: 'regulatory gap' },
  { id: 'BE-COMP-01', material: 'Beryllium', stage: 'Components', risk: 'Traceability gap', location: 'Specialist materials market', confidence: 'inferred', source: 'Supply-chain review', type: 'traceability gap' },
  { id: 'W-COMP-01', material: 'Tungsten', stage: 'Components', risk: 'Regulatory gap', location: 'Global components', confidence: 'inferred', source: 'Policy gap analysis', type: 'regulatory gap' },
  { id: 'REE-COMP-01', material: 'Rare earths', stage: 'Components', risk: 'Traceability gap', location: 'Magnet manufacturing', confidence: 'inferred', source: 'Supply-chain review', type: 'traceability gap' },
  { id: 'LI-COMP-01', material: 'Lithium', stage: 'Components', risk: 'Supply concentration', location: 'Strategic manufacturing', confidence: 'inferred', source: 'Strategic supply analysis', type: 'supply concentration' }
];

const allMaterials = Object.keys(materialData);
const defaultStageOrder = ['mine', 'trade', 'refine', 'component', 'plant'];
