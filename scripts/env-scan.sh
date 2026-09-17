#!/usr/bin/env bash
# Scan the repo for plaintext copies of secret values.
#
# `varlock scan` only searches for values declared by the schema it loaded, and `-p` takes a
# single path, so every .env.schema directory must be passed as its own flag. Discovered rather
# than listed, so adding a package needs no change here.
#
# Extra args are forwarded, e.g. `--staged` for the pre-commit hook.
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

paths=()
while IFS= read -r schema; do
    paths+=(-p "$(dirname "$schema")/")
done < <(find . -name node_modules -prune -o -name .env.schema -print)

# `${paths[@]+...}` keeps bash 3.2 (stock macOS) from treating an empty array as unset.
# With no schemas there are no -p flags, and varlock reports it has nothing to scan for.
pnpm exec varlock scan ${paths[@]+"${paths[@]}"} "$@"
