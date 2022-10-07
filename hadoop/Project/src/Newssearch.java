package ssafy;

import java.io.*;
import java.util.*;
import java.nio.ByteBuffer;

import org.apache.hadoop.conf.*;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.io.*;
import org.apache.hadoop.io.compress.*;
import org.apache.hadoop.mapreduce.*;

import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;

import org.apache.hadoop.util.GenericOptionsParser;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

public class Newssearch {

	/*
	 * Object, Text : input key-value pair type (always same (to get a line of input
	 * file))
	 * Text, Text(NULL) : output key(String)
	 */
	public static class newsMapper
			extends Mapper<Object, Text, LongWritable, Text > {

		// sort by time
		// private LongWritable epoch = new LongWritable();

		String keyword;

		public void setup(Mapper.Context context) {
			Configuration conf = context.getConfiguration();
			keyword = conf.get("keyword");
		}

		// variable declairations
		private Text word = new Text();

		// map function (Context -> fixed parameter)
		public void map(Object key, Text value, Context context)
				throws IOException, InterruptedException {

			String row = value.toString();
			StringBuilder sb = new StringBuilder();
			if (row.contains(keyword)) {
				StringTokenizer st = new StringTokenizer(row, ",");
					String time = st.nextToken(); // 보도시각
					sb.append(time+",");
					st.nextToken(); // 카테고리
					sb.append(st.nextToken()+","); // 언론사
					sb.append(st.nextToken()+","); // 제목
					sb.append(st.nextToken()+","); // 내용
					sb.append(st.nextToken()); // url
				word.set(sb.toString());
				LocalDateTime date = LocalDateTime.parse(time, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
				long epoch = date.toEpochSecond(ZoneOffset.UTC) * -1; // 날짜 역순으로 정렬
				// context.write(new LongWritable(epoch), word);
				context.write(new LongWritable(epoch), word);
			}
		}
	}


	/*
	 * LongWritable, Text : input key type and the value type of input value list
	 * Text, Text(null) : output key-value pair type
	 */
	public static class newsReducer
			extends Reducer<LongWritable, Text, Text, Text> {

		// key : a epoch of localdatetime (ex: 1477958399) 
		// values : news
		public void reduce(Iterable<LongWritable> epoch, Text news, Context context)
				throws IOException, InterruptedException {
			for (LongWritable val: epoch) {
				context.write(new Text(), new Text());
			}
		}
	}


	/* Main function */
	public static void main(String[] args) throws Exception {
		Configuration conf = new Configuration();
		String[] otherArgs = new GenericOptionsParser(conf, args).getRemainingArgs();
		if (otherArgs.length != 3) {
			System.err.println("Usage: <keyword> <in> <out>");
			System.exit(2);
		}

		FileSystem hdfs = FileSystem.get(conf);
		Path input = new Path(otherArgs[1]);
		Path output = new Path(otherArgs[2]);
		if (hdfs.exists(output))
			hdfs.delete(output, true);

		conf.set("keyword", otherArgs[0]);
		Job job = new Job(conf, "news search");
		job.setJarByClass(Newssearch.class);
		job.setNumReduceTasks(1);

		// let hadoop know my map classes
		job.setMapperClass(newsMapper.class);
		job.setReducerClass(newsReducer.class);

		job.setMapOutputKeyClass(LongWritable.class);
		job.setMapOutputValueClass(Text.class);

		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);

		// set input and output directories
		FileInputFormat.addInputPath(job, input);
		FileOutputFormat.setOutputPath(job, output);

		System.exit(job.waitForCompletion(true) ? 0 : 1 );
	}
}
