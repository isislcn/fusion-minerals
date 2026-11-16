# Plan

## Site map

1. Overview — `#overview`
2. Fusion primer — `#primer`
3. Supply chain — `#chain` and `#chain-<stage>`
4. Human cost — `#human-cost` and `#human-cost-<case>`
5. Why now — `#why-now`
6. Risk register — `#risks`
7. Governance gaps — `#governance`
8. Demand — `#demand`
9. Remedy first — `#remedy`
10. Investor brief — `#brief-investors`
11. EU brief — `#brief-eu`
12. UN brief — `#brief-un`
13. Methodology — `#methodology`
14. Sources — `#sources`
15. About — `#about`

## Architecture

- Static HTML, CSS and JavaScript; no build step or added framework.
- Hash-based in-page views with deep links and browser back/forward support.
- Evidence and policy data live in `js/data.js`; the shared three-track timeline is rendered by `js/timeline.js`.
- The Human cost page connects cases to material and stage views; citations link to full APA references.
- Responsive tables scroll inside labeled regions or stack into cards. Print views include each brief’s cited references.
- The site deploys to GitHub Pages from `main`.

## Evidence and policy work

- Maintain documented, reported and inferred confidence labels.
- Keep material-level and location-level exposure separate from any claim about a named fusion buyer.
- Map known human impacts by material: Rubaya, Kachin, the high Andean salt flats and beryllium workers.
- Use a three-track timeline for fusion and markets, EU rules, and UN/US/UK rules. The tracks converge at first-plant procurement and branch to remedy-first sourcing or retrofit.
- Present the EU framework and options appraisal as policy proposals, not existing obligations.

## Quality and publishing

1. Check JavaScript syntax, internal hashes, source IDs and citations.
2. Verify keyboard operation for navigation, timeline markers, filters, tables, tabs, copy actions and the governance list toggle.
3. Check horizontal overflow at 390px and print layout for each brief.
4. Check the deep links `#chain-tungsten-mine`, `#human-cost-kachin`, `#brief-eu` and `#sources`.
5. Commit each revision stage, push to `main`, and verify GitHub Pages deployment.

## Research gaps

- Verify all entries marked `verify: true`.
- Add primary-source and country-level supply data as it becomes available.
- Continue mapping mining and processing impacts in China and beryllium chains outside the United States.
- Update the evidence base as regulatory proposals and fusion procurement evolve.
