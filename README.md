# JCS playground

Quick prototypes for work. Each one lives in its own folder under `prototypes/` and deploys to its own Vercel URL.

## Start a new prototype

```sh
scripts/new.sh pricing-calculator
```

This copies `prototypes/_template` to `prototypes/pricing-calculator/`. The template is a single HTML page built with [GOV.UK Frontend](https://design-system.service.gov.uk/) 6.5.1, loaded from jsDelivr. Open its `index.html` in a browser to work locally.

To use a component, copy its HTML from the design system's example pages. The "HTML" tab under each example has it.

Rules for prototypes hosted off GOV.UK:
- Don't use the GOV.UK header, crown or GDS Transport font. The template leaves them out, and text falls back to Arial.
- Keep the "Prototype" banner so nobody mistakes the page for a real government service.

## Deploy

```sh
scripts/deploy.sh pricing-calculator            # production URL
scripts/deploy.sh pricing-calculator --preview  # throwaway preview URL
```

The first deploy creates a Vercel project called `jcs-pricing-calculator`. Production lives at `https://jcs-pricing-calculator.vercel.app`, unless Vercel has to adjust the name.

## Save to GitHub

```sh
git add -A && git commit -m "Describe the change" && git push
```
