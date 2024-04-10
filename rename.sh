name=$1

grep -rl "xenous" --exclude-dir=.git | xargs sed -i "s/xenous/${name}/g"
grep -rl "Xenous" --exclude-dir=.git | xargs sed -i "s/Xenous/${name^}/g"
