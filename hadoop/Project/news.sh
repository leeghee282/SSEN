hdfs dfs -rm -r in
hdfs dfs -mkdir in 
cd ~/Project/data

# https://stackoverflow.com/questions/255898/how-to-iterate-over-arguments-in-a-bash-script
argc="$#"
argv=("$@")
dates=""
for(( i=0; i< argc-1; i++ )); do
dates+="${argv[i]}.csv "
done

hdfs dfs -put $dates in
hadoop jar ~/Project/ssen.jar news "${argv[argc-1]}" in news_out
