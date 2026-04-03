#!/usr/bin/env bash
# Restructures flat shadcn component files into the barrel export pattern:
#   src/components/button.tsx → src/components/button/ui/button.tsx
#                              + src/components/button/index.ts (barrel)
#
# Usage: ./restructure.sh [component...]
#   No args  → restructures all .tsx files in src/components/
#   With args → restructures only named components (e.g. ./restructure.sh calendar popover)

set -euo pipefail

COMPONENTS_DIR="$(cd "$(dirname "$0")/src/components" && pwd)"
affected=()

restructure() {
  local file="$1"
  local name
  name="$(basename "$file" .tsx)"
  local dir="$COMPONENTS_DIR/$name"

  if [[ -d "$dir" ]]; then
    rm "$file"
    return
  fi

  mkdir -p "$dir/ui"
  mv "$file" "$dir/ui/$name.tsx"
  echo "export * from './ui/$name';" > "$dir/index.ts"
  affected+=("$name")
}

if [[ $# -gt 0 ]]; then
  for name in "$@"; do
    file="$COMPONENTS_DIR/${name%.tsx}.tsx"
    if [[ ! -f "$file" ]]; then
      echo "error: $file not found" >&2
      exit 1
    fi
    restructure "$file"
  done
else
  for file in "$COMPONENTS_DIR"/*.tsx; do
    [[ -f "$file" ]] || continue
    restructure "$file"
  done
fi

if [[ ${#affected[@]} -gt 0 ]]; then
  label="components"
  if [[ ${#affected[@]} -eq 1 ]]; then
    label="component"
  fi
  echo -e "\033[32m✔\033[0m Restructured ${#affected[@]} ${label}:"
  for name in "${affected[@]}"; do
    echo "  - $name"
  done
fi
