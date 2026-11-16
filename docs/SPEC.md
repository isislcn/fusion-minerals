# Specification

## Purpose

This project is a research website for the assignment “Mapping the Human Cost of Fusion Energy Materials.” It explains the supply chains behind fusion materials, the human-rights risks that sit within them, and the policy gaps that can still be addressed before the market scales.

## Site map and page requirements

### 1. Overview (`#overview`)

The overview page contains the hero, key figures, brief selection cards and route-through guidance. It must include the approved headline and the gold-highlighted phrase “Its minerals.”

### 2. Fusion primer (`#primer`)

This page explains fusion basics and then moves into a reactor cutaway, a list of companies and funding, and the connection between AI demand and fusion procurement. Every reactor layer needs a label, role and material note, with stage links into the supply chain page.

### 3. Supply chain (`#chain…`)

This is the main evidence page. It includes a material switcher, chain with focus mode, legend, tabs and a detail panel. The audience lens chips must highlight but not hide relevant stages.

### 4. Why now (`#why-now`)

This page explains why procurement expectations can be considered while fusion designs, financing and supplier relationships are still developing. It presents three concise reasons without a timeline or audience-filter controls.

### 5. Evidence: risk register (`#risks`)

Filterable risk table built from the evidence set. Filters: material, stage, risk type and confidence. Each row should navigate to the stage on the supply chain page.

### 6. Evidence: governance gaps (`#governance`)

Matrix page comparing key due-diligence and governance instruments against tungsten, lithium, lithium-6, beryllium and rare earths. Use text and shapes, not colour alone.

### 7. Evidence: demand (`#demand`)

Demand page that is honest about sparse figures. It shows the lithium-6 comparison and the glaring data gap around tungsten, beryllium and rare earths.

### 8. Remedy-first framework (`#remedy`)

Interactive ladder explaining the correct sequence from identification to exit, with guardrails and scenario examples.

### 9–11. Briefs (`#brief-investors`, `#brief-eu`, `#brief-un`)

Each brief follows the same pattern: summary card, why it matters, why now, actions, remedy-first framing and evidence. All three include a print action and copyable text blocks.

### 12. Methodology (`#methodology`)

This page explains data collection, confidence labels and the evidence rules used throughout the project.

### 13. Limitations (`#limitations`)

This page states what the project cannot claim and what remains uncertain. It should include a careful explanation of the limits of traceability and supply-chain attribution.

### 14. Sources (`#sources`)

This page lists the key sources and links to the evidence used on the site.

### 15. About (`#about`)

This page records the project background, iteration log and AI-use disclosure.

## Navigation rules

- Top navigation includes Overview, Fusion primer, Supply chain, Why now, Evidence (dropdown), Remedy first, Briefs (dropdown), Sources and the gold Limitations button.
- Navigation and internal links switch the visible in-page content view; they do not open separate browser tabs. The selected view is reflected in the URL hash and supports browser back/forward navigation.
- Overview groups the hero, key figures, reactor supply comparison, research snapshot, brief cards, route guide and glossary. The reactor supply comparison appears between Key figures and Research snapshot.
- Dropdown menus must support keyboard and touch interactions via accessible disclosure controls.
- Every page includes a footer with site title, “Updated November 2026,” links to Methodology, Limitations and About, and the GitHub repo.
- On screens wider than 480px, a fixed stamp reading “November 2026” appears in the bottom-right corner.

## Content rules

1. Sentence case for every heading and label.
2. Plain, direct English.
3. Do not state or imply that a named fusion company has used conflict-sourced material.
4. Confidence labels stay exactly as in the data: documented, reported or inferred.
5. The Rubaya mine link stays “reported” for tungsten because the UN evidence is mainly about coltan.
6. Every page must feature depth, a clear opening statement, at least one visual or interactive element, evidence links and a pager.
7. Missing content should be flagged as `[TODO: source needed]` in the docs and shown as a data-gap state on the site.

## Summary

The specification defines the full research site: a primer, an evidence-heavy supply chain page, a policy-facing why-now section, a remedy-first framework and three audience-specific briefs. The project’s standard is to be precise, transparent and evidence-led, not dramatic.
