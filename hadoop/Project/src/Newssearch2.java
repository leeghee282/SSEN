package ssafy;

import java.io.IOException;
import java.util.StringTokenizer;

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

public class Newssearch2 {
	/*
	 * Object, Text : input key-value pair type (always same (to get a line of input
	 * file))
	 * Text, Text(NULL) : output key(String)
	 */
	public static class newsMapper
			extends Mapper<Object, Text, Text, Text> {

		String keyword;

		public void setup(Mapper.Context context) {
			Configuration conf = context.getConfiguration();
			keyword = conf.get("keyword");
		}

		// variable declairations
		private final static IntWritable one = new IntWritable(1);
		private Text word = new Text();

		// map function (Context -> fixed parameter)
		public void map(Object key, Text value, Context context)
				throws IOException, InterruptedException {
			String row = value.toString();
			StringBuilder sb = new StringBuilder();
			if (row.contains(keyword)) {
				StringTokenizer st = new StringTokenizer(row, ",");
				sb.append(st.nextToken() + ","); // 보도시각
				st.nextToken(); // 카테고리
				sb.append(st.nextToken() + ","); // 언론사
				sb.append(st.nextToken() + ","); // 제목
				st.nextToken(); // 내용
				// sb.append(st.nextToken() + ","); // 내용
				sb.append(st.nextToken()); // url
				word.set(sb.toString());
				context.write(word, new Text());
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
		Job job = new Job(conf, "news search2");
		job.setJarByClass(Newssearch2.class);
		job.setNumReduceTasks(0);

		// let hadoop know my map classes
		job.setMapperClass(newsMapper.class);

		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);

		// set input and output directories
		FileInputFormat.addInputPath(job, input);
		FileOutputFormat.setOutputPath(job, output);

		System.exit(job.waitForCompletion(true) ? 0 : 1);

	}
}
