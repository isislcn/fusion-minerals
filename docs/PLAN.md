# Plan

## Site map

1. Overview — `#overview`
2. Fusion primer — `#primer`
3. Supply chain — `#chain` and `#chain-<material>`
4. Why now — `#why-now`
5. Evidence: risk register — `#risks`
6. Evidence: governance gaps — `#governance`
7. Evidence: demand — `#demand`
8. Remedy-first framework — `#remedy`
9. Brief: fusion investors — `#brief-investors`
10. Brief: European Union — `#brief-eu`
11. Brief: UN Task Force — `#brief-un`
12. Methodology — `#methodology`
13. Limitations — `#limitations`
14. Sources — `#sources`
15. About — `#about`

## Architecture

- Static site, no build step.
- Hash-based in-page navigation: one content view is shown at a time, and internal links switch views without opening new browser tabs.
- Overview groups the hero, key figures, reactor supply comparison, research snapshot, briefs, route guide and glossary.
- Data in `js/data.js` as plain `const` objects.
- Works from `file://` and GitHub Pages.

## Research plan per material

| Material | What is known | What is missing | Tool to fill it |
| --- | --- | --- | --- |
| Tungsten | Concentration, eastern DR Congo conflict-finance exposure, mine and refining relevance. | Smelter and trader links; detailed chain mapping. | Sayari, USGS, UN and NGO sources. |
| Lithium | Lithium-6 has effectively no commercial supply and is central to breeding blankets. | Country shares and plant-level demand estimates. | USGS, Tavily, primary source reviews. |
| Beryllium | It is a neutron multiplier with concentrated supply. | Detailed country shares and traceability data. | USGS, industry reports, Sayari. |
| Rare earths | Myanmar is reported as a major heavy rare earth source; Kachin-linked mining and refining is documented. | Full mine-to-refiner chain and material-specific supply shares. | Sayari, Tavily, primary UN/NGO sources. |

## Phases

### Phase 1

- All pages live.
- Tungsten fully mapped.
- Other materials mapped initially with honest gaps.
- Three briefs complete.

### Phase 2

- Country shares for lithium, beryllium and rare earths.
- Sayari smelter mapping.
- Regional locators.
- Demand sizing figures.
- Primary-source replacements.

### Phase 3

- Reader testing and revision.
- Optional translation of brief summary cards.

## Reader testing

Test with one investor, one EU-policy reader and one UN/NGO reader. The question is: “What would you do after reading this?”

## Publishing steps

1. Finalise the static site.
2. Check links and hash routing.
3. Confirm update dates and date stamps.
4. Check Sayari licensing.
5. Add AI-use disclosure.
6. Publish to GitHub Pages.
7. Run a pre-publish checklist.

## Risks and mitigations

- Overstated fusion link: use confidence labels and limitations page.
- Data licensing: summarise findings; avoid raw records.
- Scope creep: keep to the agreed material list and page set.
- Stale dates: stamp and review source dates.

## Summary

The plan prioritises a credible static site with honest gaps, strong evidence and a clear path from primer to remedy. The first build stabilises the structure and user journey; deeper data work comes next.
