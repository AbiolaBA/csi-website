# Consumer Intelligence Lab — website prototype

A multi-page static website for the Consumption Sovereignty Index (CSI) and the
lab's wider index family. Built entirely from the real pipeline outputs — every
chart, ranking and number on the site comes from `outputs/` of the CSI project.

## Pages

| File | Page |
|---|---|
| `index.html` | Home — hero, headline stats, index family, latest research |
| `csi.html` | The Index — full methodology (v0.3 + v0.4), measurement ladder, verification, limitations |
| `rankings.html` | Interactive country rankings — search, region filter, Africa toggle, sortable; regional trends and correlation charts |
| `research.html` | Publications repository — methodology papers, ERSA conference material, working papers, critical review |
| `data.html` | Data & Code — CSV downloads, the `cii` Python package, reproducibility, data sources |
| `policy.html` | Policy — seven stylised facts, Nigeria case study, green-growth findings, four policy directions |
| `about.html` | About — mission, how we work, people, roadmap, contact |

## Structure

```
assets/css/main.css          design system (validated dataviz palette)
assets/js/data.js            real datasets embedded as JSON (generated from outputs/)
assets/js/main.js            navigation + chart components
assets/js/vendor/chart.umd.min.js   Chart.js v4 (vendored — the site works fully offline)
assets/img/                  figures from the research pipeline
assets/downloads/            CSVs, config, and the cii package zip served as downloads
```

No build step, no server needed — open `index.html` in any browser.

## Deploying free

**GitHub Pages** (recommended):
1. Create a repository (e.g. `csi-website`) on github.com
2. Upload the entire contents of this folder (keep the structure)
3. Settings → Pages → Source: "Deploy from a branch" → `main` / root
4. Your site appears at `https://<username>.github.io/csi-website/`

**Netlify**: drag-and-drop this folder at app.netlify.com/drop — live in seconds.

## Updating with new results

Charts and tables read from `assets/js/data.js`. When you re-run the pipeline
(`python -m cii.run`), regenerate that file from the new outputs (the structure
is plain JSON: rankings, trends, region means, correlations, tier comparison,
GMM/threshold results) and the whole site updates.

## Renaming the lab

The site is branded "Consumer Intelligence Lab". To change the name, search and
replace across the seven HTML files (header brand, footer, titles).
