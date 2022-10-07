/home/hadoop/hadoop/bin/hdfs dfs -rm keyword_in/*
cd /home/ubuntu/mapreduce/input/news
dates=""
for date in "$@"; do
dates+="${date}.csv "
done
/home/hadoop/hadoop/bin/hdfs dfs -put $dates keyword_in
/home/hadoop/hadoop/bin/hadoop jar /home/ubuntu/mapreduce/ssen.jar keyword keyword_in keyword_out1 keyword_out2 

# combine string tutorial
# https://linuxhint.com/string_concatenation_bash/