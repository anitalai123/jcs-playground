#!/usr/bin/env bash
# Create a new prototype from the template: scripts/new.sh <name>
set -euo pipefail
cd "$(dirname "$0")/.."
name="${1:?Usage: scripts/new.sh <name>  (lowercase, dashes, e.g. pricing-calculator)}"
[[ "$name" =~ ^[a-z0-9][a-z0-9-]*$ ]] || { echo "Name must be lowercase letters, numbers and dashes"; exit 1; }
dir="prototypes/$name"
[ -e "$dir" ] && { echo "$dir already exists"; exit 1; }
cp -R prototypes/_template "$dir"
sed -i '' "s/__NAME__/$name/g" "$dir/index.html"
echo "Created $dir — open $dir/index.html in a browser, or run: scripts/deploy.sh $name"
