# JCS playground

Quick prototypes for work. Each one lives in its own folder under `prototypes/` and deploys to its own Vercel URL.

## Start a new prototype

```sh
scripts/new.sh pricing-calculator
```

This copies `prototypes/_template` (a single HTML page with Tailwind) to `prototypes/pricing-calculator/`. Open its `index.html` in a browser to work locally.

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
