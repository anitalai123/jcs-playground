# JCS playground

Quick prototypes for work, all served from one site: **https://jcs-playground.vercel.app**

`prototypes/index.html` is the home page. Each prototype lives in its own folder under `prototypes/`, and its address is `jcs-playground.vercel.app/<folder>/`.

## Start a new prototype

```sh
scripts/new.sh pricing-calculator
```

This copies `prototypes/_template` to `prototypes/pricing-calculator/` and adds a heading and "Go to prototype" button to the home page. The template is a single HTML page built with [GOV.UK Frontend](https://design-system.service.gov.uk/) 6.5.1, loaded from jsDelivr. Open its `index.html` in a browser to work locally.

To use a component, copy its HTML from the design system's example pages. The "HTML" tab under each example has it.

Rules for prototypes hosted off GOV.UK:
- Don't use the GOV.UK header, crown or GDS Transport font. The template leaves them out, and text falls back to Arial.
- Keep the "Prototype" banner so nobody mistakes the page for a real government service.

## Deploy

```sh
scripts/deploy.sh            # updates https://jcs-playground.vercel.app
scripts/deploy.sh --preview  # throwaway preview URL (needs a Vercel login to view)
```

This deploys the whole `prototypes/` folder, except `_template`. Pushing to GitHub doesn't deploy anything.

## Save to GitHub

```sh
git add -A && git commit -m "Describe the change" && git push
```
