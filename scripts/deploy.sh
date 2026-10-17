#!/usr/bin/env bash
# Deploy a prototype to Vercel: scripts/deploy.sh <name> [--preview]
# Each prototype is its own Vercel project, named jcs-<name>.
set -euo pipefail
cd "$(dirname "$0")/.."
name="${1:?Usage: scripts/deploy.sh <name> [--preview]}"
dir="prototypes/$name"
[ -d "$dir" ] || { echo "No prototype at $dir"; exit 1; }
cd "$dir"
[ -d .vercel ] || vercel link --yes --project "jcs-$name" >/dev/null
if [ "${2:-}" = "--preview" ]; then args=(--yes); else args=(--prod --yes); fi
out=$(vercel deploy "${args[@]}" 2>/dev/null)
url=$(printf '%s' "$out" | python3 -c 'import json,sys; d=json.load(sys.stdin)["deployment"]; print(d.get("productionUrl") or d["url"]) if d["target"]=="production" else print(d["url"])')
echo "Live at: $url"
