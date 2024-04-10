name=$1

grep -rl "xenous" | xargs sed -i "s/xenous/${name}/g"
grep -rl "Xenous" | xargs sed -i "s/Xenous/${name^}/g"
