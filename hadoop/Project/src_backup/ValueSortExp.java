package ssafy;

import java.nio.ByteBuffer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.IntWritable.Comparator;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.WritableComparator;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;

import org.apache.hadoop.util.GenericOptionsParser;
import org.apache.hadoop.mapreduce.Partitioner;

public class ValueSortExp {

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

 public static class ReduceTask extends
   Reducer<IntWritable, Text, Text, IntWritable> {
  public void reduce(IntWritable key, Iterable<Text> list, Context context)
    throws java.io.IOException, InterruptedException {

   for (Text value : list) {

    context.write(value,key);

   }

  }
 }

 public static void main(String[] args) throws Exception {
    Configuration conf = new Configuration();
    String[] otherArgs = new GenericOptionsParser(conf,args).getRemainingArgs();
    if ( otherArgs.length != 2 ) {
        System.err.println("Usage: <in> <out>");
        System.exit(2);
    }

    FileSystem hdfs = FileSystem.get(conf);
    Path output = new Path(otherArgs[1]);
    if (hdfs.exists(output))
      hdfs.delete(output, true);

    Job job = new Job(conf, "valuesortexp");
    job.setJarByClass(ValueSortExp.class);
  
    // Setup MapReduce
    job.setMapperClass(ValueSortExp.MapTask.class);
    job.setReducerClass(ValueSortExp.ReduceTask.class);
    job.setNumReduceTasks(1);
  
    // Specify key / value
    job.setMapOutputKeyClass(IntWritable.class);
    job.setMapOutputValueClass(Text.class);
    job.setOutputKeyClass(IntWritable.class);
    job.setOutputValueClass(Text.class);
    job.setSortComparatorClass(IntComparator.class);

    // Input
    FileInputFormat.addInputPath(job,new Path(otherArgs[0]));
    job.setInputFormatClass(TextInputFormat.class);
  
    // Output
    FileOutputFormat.setOutputPath(job,new Path(otherArgs[1]));
    job.setOutputFormatClass(TextOutputFormat.class);
  
  
    // Execute job
    int code = job.waitForCompletion(true) ? 0 : 1;
    System.exit(code);
   }
}