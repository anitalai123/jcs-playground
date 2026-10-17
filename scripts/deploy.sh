#!/usr/bin/env bash
# Deploy the whole playground to Vercel: scripts/deploy.sh [--preview]
# Everything in prototypes/ goes to https://jcs-playground.vercel.app
set -euo pipefail
cd "$(dirname "$0")/../prototypes"
if [ ! -d .vercel ]; then
  vercel link --yes --project jcs-playground >/dev/null 2>&1
  # vercel link auto-connects the GitHub repo, and pushes would then deploy the repo root (404).
  # Deploys go through this script instead, so disconnect it.
  vercel git disconnect --yes >/dev/null 2>&1 || true
  rm -f .env.local
fi
if [ "${1:-}" = "--preview" ]; then args=(--yes); else args=(--prod --yes); fi
out=$(vercel deploy "${args[@]}" 2>/dev/null)
url=$(printf '%s' "$out" | python3 -c 'import json,sys; d=json.load(sys.stdin)["deployment"]; print(d.get("productionUrl") or d["url"]) if d["target"]=="production" else print(d["url"])')
echo "Live at: $url"
