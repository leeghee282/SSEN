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

public class Newssearch {
	/*
	 * Object, Text : input key-value pair type (always same (to get a line of input
	 * file))
	 * Text, IntWritable : output key-value pair type
	 */
	public static class newsMapper
			extends Mapper<Object, Text, Text, IntWritable> {

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
			if (row.contains(keyword)) {
				StringTokenizer st = new StringTokenizer(row);
				System.out.println(row);
				word.set(row);
				context.write(word, one);
			}
		}
	}

	/*
	 * Text, IntWritable : input key type and the value type of input value list
	 * Text, IntWritable : output key-value pair type
	 */
	public static class newsReducer
			extends Reducer<Text, IntWritable, Text, IntWritable> {

		// variables
		private IntWritable result = new IntWritable();

		// key : a disticnt word
		// values : Iterable type (data list)
		public void reduce(Text key, Iterable<IntWritable> values, Context context)
				throws IOException, InterruptedException {

			int sum = 0;
			for (IntWritable val : values) {
				sum += val.get();
			}
			result.set(sum);
			context.write(key, result);
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



		// let hadoop know my map and reduce classes
		job.setMapperClass(newsMapper.class);
		// job.setReducerClass(newsReducer.class);

		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(IntWritable.class);

		// set number of reduces
		// job.setNumReduceTasks(1);

		// set input and output directories
		FileInputFormat.addInputPath(job, input);
		FileOutputFormat.setOutputPath(job, output);


		// if(job.waitForCompletion(true)) {
		// 	System.exit(0);
		// } else {
		// 	System.exit(1);
		// }
		System.exit(job.waitForCompletion(true) ? 0 : 1 );

	}
}
