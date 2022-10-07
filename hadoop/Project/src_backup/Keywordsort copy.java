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

public class Keywordsort {

	public static class IntComparator extends WritableComparator {

		public IntComparator() {
			super(IntWritable.class);
		}

		@Override
		public int compare(byte[] b1, int s1, int l1,
				byte[] b2, int s2, int l2) {

			Integer v1 = ByteBuffer.wrap(b1, s1, l1).getInt();
			Integer v2 = ByteBuffer.wrap(b2, s2, l2).getInt();

			return v1.compareTo(v2) * (-1);
		}
	}

	/*
	 * Object, Text : input key-value pair type (always same (to get a line of input
	 * file))
	 * Text, IntWritable : output key-value pair type
	 */
	public static class TokenizerMapper
			extends Mapper<Object, Text, Text, IntWritable> {

		// variable declairations
		private final static IntWritable one = new IntWritable(1);
		private Text word = new Text();

		public static int countTokens(String s) {
			StringTokenizer itr = new StringTokenizer(s, ",");
			int ret = 0;

			while (itr.hasMoreTokens()) {
				itr.nextToken();
				ret++;
			}

			return ret;
		}

		// map function (Context -> fixed parameter)
		public void map(Object key, Text value, Context context)
				throws IOException, InterruptedException {

			// value.toString() : get a line
			int count = countTokens(value.toString());
			StringTokenizer itr = new StringTokenizer(value.toString(), ",");

			for (int i = 0; i < count - 1; i++) {
				itr.nextToken();
			}

			// 키워드 추출 결과가 저장된 마지막 열
			String s = itr.nextToken();

			StringTokenizer itr2 = new StringTokenizer(s, " ");
			while (itr2.hasMoreTokens()) {
				word.set(itr2.nextToken());
				// emit a key-value pair
				context.write(word, one);
			}

		}
	}

	public static class MapTask extends
			Mapper<LongWritable, Text, IntWritable, Text> {
		public void map(LongWritable key, Text value, Context context)
				throws java.io.IOException, InterruptedException {
			String line = value.toString();
			String[] tokens = line.split("\t"); // This is the delimiter between Key and Value
			int valuePart = Integer.parseInt(tokens[1]);
			context.write(new IntWritable(valuePart), new Text(tokens[0]));
		}
	}

	/*
	 * Text, IntWritable : input key type and the value type of input value list
	 * Text, IntWritable : output key-value pair type
	 */
	public static class IntSumReducer
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

	public static class ReduceTask extends
			Reducer<IntWritable, Text, Text, IntWritable> {

		private int limit = 0;

		public void setup(Reducer.Context context) {
			Configuration conf = context.getConfiguration();
			limit = conf.getInt("limit", 10);
		}

		public void reduce(IntWritable key, Iterable<Text> list, Context context)
				throws java.io.IOException, InterruptedException {

			int cnt = 0;
			for (Text value : list) {
				 System.out.println("----------------cnt : "+cnt++
				 +"---------------------");
				// if (++cnt > 2){ 
				// 	System.out.println("ENTER-----");
				// 	break;
				// }
				context.write(value, key);
			}
		}
	}

	/* Main function */
	public static void main(String[] args) throws Exception {
		Configuration conf = new Configuration();
		String[] otherArgs = new GenericOptionsParser(conf, args).getRemainingArgs();
		if (otherArgs.length != 3) {
			System.err.println("Usage: <in> <out1> <out2>");
			System.exit(2);
		}

		FileSystem hdfs = FileSystem.get(conf);
		Path output1 = new Path(otherArgs[1]);
		Path output2 = new Path(otherArgs[2]);
		if (hdfs.exists(output1))
			hdfs.delete(output1, true);
		if (hdfs.exists(output2))
			hdfs.delete(output2, true);

		conf.setInt("limit", 10);

		// first phase : keyword count (output :[keyword - count ] list)
		Job job = new Job(conf, "1st phase");
		job.setJarByClass(Keywordsort.class);

		// let hadoop know my map and reduce classes
		job.setMapperClass(TokenizerMapper.class);
		job.setReducerClass(IntSumReducer.class);
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(IntWritable.class);

		// set number of reduces
		// job.setNumReduceTasks(1);

		// set input and output directories
		FileInputFormat.addInputPath(job, new Path(otherArgs[0]));
		FileOutputFormat.setOutputPath(job, output1);
		if (!job.waitForCompletion(true))
			System.exit(1);

		// second phase : sort by count DESC (output :[count - keyword] list)
		Job job2 = new Job(conf, "2nd phase");
		job2.setJarByClass(Keywordsort.class);

		job2.setMapperClass(MapTask.class);
		job2.setReducerClass(ReduceTask.class);
		job2.setNumReduceTasks(1);

		// Specify key / value
		job2.setMapOutputKeyClass(IntWritable.class);
		job2.setMapOutputValueClass(Text.class);
		job2.setOutputKeyClass(IntWritable.class);
		job2.setOutputValueClass(Text.class);
		job2.setSortComparatorClass(IntComparator.class);

		FileInputFormat.addInputPath(job2, output1);
		job2.setInputFormatClass(TextInputFormat.class);

		FileOutputFormat.setOutputPath(job2, output2);
		job2.setOutputFormatClass(TextOutputFormat.class);
		if (!job2.waitForCompletion(true))
			System.exit(1);

	}
}
