#!/bin/bash

name=$1
capitalized_name=$(echo "$name" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')

# Find and replace lowercase "xenous"
find . -type f -not -path '*/.git/*' -exec grep -l "xenous" {} + | while read -r file; do
    if [[ "$(uname)" = "Darwin" ]]; then
        sed -i '' "s/xenous/${name}/g" "$file" # macOS requires empty extension for -i flag
    else
        sed -i "s/xenous/${name}/g" "$file"
    fi
done

# Find and replace uppercase "Xenous"
find . -type f -not -path '*/.git/*' -exec grep -l "Xenous" {} + | while read -r file; do
    if [[ "$(uname)" = "Darwin" ]]; then
        sed -i '' "s/Xenous/${capitalized_name}/g" "$file" # macOS requires empty extension for -i flag
    else
        sed -i "s/Xenous/${capitalized_name}/g" "$file"
    fi
done
