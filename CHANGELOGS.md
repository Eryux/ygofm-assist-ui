# YGOFM Helper - Changelogs

## 2026-02-22 (current) - 1.1.0

### Yugipedia Data Pipeline

- Add combine-yugipedia-fusions.js to merge 4 HTML files into yugipedia-fusions-combined.html
- Update parse-yugipedia-fusions.js to use combined file as input
- Add ID normalization (strip leading zeros, e.g. 082 → 82)
- Add missing cards instead of skipping when not found in data.json
- Store fusions on both Material 1 and Material 2 cards
- Write to both data.json and data.min.json

### Invalid Fusion Bug Fix

- Filter out fusions where result equals a material (e.g. A + B → A)
- Add parser cleanup step to remove existing invalid entries from data
- Add display-time checks in FusionComponent for both fusion modes

### Deck Fusions Page

- Add "Fusion Potential by Card" section: counts possible fusions per card
- Sort cards from greatest to least fusion count

### Deck Filter in Card Details

- Add deck dropdown in "Fusion(s) using [card]" section
- Filter fusion list by selected deck (or all cards)

### Local Development / Mobile Access

- Set host: true in vite.config.js for network access
- Use window.location.origin for siteUrl so app works on iPhone/local network

From [Lodakia](https://github.com/Eryux/ygofm-assist-ui/pull/1) pull request.


## 2023-03-10 (current) - 1.0.0
- Initial release
- Homepage

## 2023-01-28 (pre-version)
- Fix incorrect guardian stars on cards

## 2022-08-19 (pre-version)
- First iteration with cards, decks, guardians and assist sections