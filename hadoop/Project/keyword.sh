
#!/bin/bash

hdfs dfs -rm -r in
hdfs dfs -mkdir in
#cd /home/hadoop/Project/data

dates=""
for date in "$@"; do
dates+="/home/hadoop/Project/data/${date}.csv "
done
#echo "hdfs dfs -put $dates in"
hdfs dfs -put $dates in
hadoop jar /home/hadoop/Project/ssen.jar keyword in out1 out2

# combine string tutorial
# https://linuxhint.com/string_concatenation_bash/

