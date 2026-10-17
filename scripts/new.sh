#!/usr/bin/env bash
# Create a new prototype from the template and add it to the home page: scripts/new.sh <name>
set -euo pipefail
cd "$(dirname "$0")/.."
name="${1:?Usage: scripts/new.sh <name>  (lowercase, dashes, e.g. pricing-calculator)}"
[[ "$name" =~ ^[a-z0-9][a-z0-9-]*$ ]] || { echo "Name must be lowercase letters, numbers and dashes"; exit 1; }
dir="prototypes/$name"
[ -e "$dir" ] && { echo "$dir already exists"; exit 1; }
# pricing-calculator -> Pricing calculator
title="$(printf '%s' "${name:0:1}" | tr '[:lower:]' '[:upper:]')$(printf '%s' "${name:1}" | tr '-' ' ')"
cp -R prototypes/_template "$dir"
sed -i '' "s/__NAME__/$title/g" "$dir/index.html"
python3 - "$name" "$title" <<'PY'
import sys
name, title = sys.argv[1:]
path = "prototypes/index.html"
s = open(path).read()
entry = f'''          <h2 class="govuk-heading-l govuk-!-margin-top-6">{title}</h2>
          <a href="{name}/" role="button" draggable="false" class="govuk-button" data-module="govuk-button">
            Go to prototype
          </a>
          <!-- prototypes:end -->'''
assert "<!-- prototypes:end -->" in s, "Marker missing from prototypes/index.html"
open(path, "w").write(s.replace("          <!-- prototypes:end -->", entry, 1))
PY
echo "Created $dir and added it to the home page. Deploy with: scripts/deploy.sh"
