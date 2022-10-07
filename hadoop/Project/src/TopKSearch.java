package ssafy;

import java.io.*;
import java.util.*;

import org.apache.hadoop.io.Text;

import org.apache.commons.math3.linear.MatrixUtils;
import org.apache.commons.math3.linear.RealVector;

import org.apache.hadoop.conf.*;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.io.*;
import org.apache.hadoop.io.compress.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;



public class TopKSearch {

    
    public static class MyType implements Comparable<MyType> {
        public double dist; 
        public String str; 
        public String date; 

        public MyType(double d, String s, String date) { 
            dist = d;
            str = s;
            this.date = date;
        }

        @Override
        public int compareTo(MyType o) { 
            return this.dist > o.dist ? -1 : (this.dist < o.dist ? 1 : 0);
        }
    }

    /*
     * 1 Phase - Map class part
     */

    public static class MapClass1 extends Mapper<Object, Text, Text, Text> {

        private int numOfPartitions = 4; 
        private String keywords; 

        private Text emitkey = new Text(); 
        private Text emitval = new Text(); 

        public void setup(Mapper.Context context) { 
            Configuration conf = context.getConfiguration();
            numOfPartitions = conf.getInt("numberOfPartitions", 2);
            keywords = conf.get("keywords", "");
        }

        
        
        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
            
            
            String arr[] = value.toString().split("\t", 2);

            
            int rid = Integer.parseInt(arr[0]); 
            
            int partitionId = rid % numOfPartitions; 

            
            
            String keyFre[] = arr[1].split("\t"); 
            String keywordList[] = keywords.split("\t"); 
            StringBuilder fvsb = new StringBuilder(); 
            fvsb.append(arr[0]).append("\t"); 

            
            for (int j = 1; j < keywordList.length; j++) {
                boolean existCheck = false; 
                for (int i = 1; i < keyFre.length; i += 2) { 
                    if (keyFre[i].equals(keywordList[j])) { 
                        fvsb.append(keyFre[i + 1]).append("\t"); 
                        existCheck = true;
                        break;
                    }
                }
                if (!existCheck) { 
                    fvsb.append("0").append("\t"); 
                }
            }
            fvsb.append(keyFre[0]); 
            emitkey.set(Integer.toString(partitionId)); 
            Text freValue = new Text(); 
            freValue.set(fvsb.toString()); 
            context.write(emitkey, freValue);
        }
    }

    /*
     * 1 Phase - Reduce class part
     */

    public static class ReduceClass1 extends Reducer<Text, Text, Text, Text> {

        private int numOfPartitions = 4; 
        private int K; 
        private String query; 

        private Text emitkey = new Text(); 
        private Text emitval = new Text(); 

        public void setup(Reducer.Context context) { 
            Configuration conf = context.getConfiguration();
            numOfPartitions = conf.getInt("numberOfPartitions", 2);
            K = conf.getInt("K", 2);
            query = conf.get("queryPoint", "");
        }

        public void reduce(Text key, Iterable<Text> values, Context context)
                throws IOException, InterruptedException {

            String[] keyarr = key.toString().split("\t"); 
            double d; 
            String date; 
            PriorityQueue<MyType> queue = new PriorityQueue<MyType>(Collections.reverseOrder()); 
            
            for (Text p : values) { 
                String[] strarr1 = query.split("\t"); 
                String[] strarr2 = p.toString().split("\t"); 
                d = dist(strarr1, strarr2); 
                date = strarr2[strarr2.length - 1]; 
                MyType e = new MyType(d, p.toString(), date); 
                
                if (d < 100) { 
                    if (queue.size() < K) { 
                        queue.add(e);
                    } else { 
                        if ((queue.peek().dist < d)) { 
                            queue.remove(); 
                            queue.add(e); 
                        }
                    }
                }
            }
            while (!queue.isEmpty()) { 
                MyType v = queue.poll(); 
                emitkey.set(v.str); 
                emitval.set(Double.toString(v.dist)); 
                context.write(emitkey, emitval);
            }
        }

        public static double dist(String[] strarr1, String[] strarr2) { 
            
            double[] d1 = new double[strarr1.length - 1]; 
            double[] d2 = new double[strarr2.length - 2]; 

            
            
            for (int i = 0, j = 1; i < d1.length; i++, j++) { 
                d1[i] = Double.parseDouble(strarr1[j]);
                d2[i] = Double.parseDouble(strarr2[j]);
            }
            
            RealVector s1 = MatrixUtils.createRealVector(d1); 
            RealVector s2 = MatrixUtils.createRealVector(d2); 
            double dot = s1.dotProduct(s2); 
            double n1 = s1.getNorm(); 
            double n2 = s2.getNorm(); 
            double cosSim = dot / (n1 * n2); 
            cosSim = cosSim * 100; 
            return cosSim;
        }
    }

    /*
     * 2 Phase - Map class part => 한 번만
     */

    public static class MapClass2 extends Mapper<Object, Text, Text, Text> {
        private Text emitkey = new Text("*"); 
        private Text emitval = new Text(); 

        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
            context.write(emitkey, value);
        }
    }

    /*
     * 2 Phase - Reduce class part
     */

    public static class ReduceClass2 extends Reducer<Text, Text, Text, Text> {

        private int K; 

        public void setup(Reducer.Context context) { 
            Configuration conf = context.getConfiguration();
            K = conf.getInt("K", 2);
        }

        private Text emitkey = new Text(); 
        private Text emitval = new Text(); 

        public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
            PriorityQueue<MyType> queue = new PriorityQueue<MyType>(Collections.reverseOrder()); 
            for (Text value : values) {
                String val = value.toString(); 
                String[] tuple = val.split("\t");
                Double d = Double.parseDouble(tuple[tuple.length - 1]); 
                MyType e = new MyType(d, val, tuple[tuple.length - 2]); 
                
                if (queue.size() < K) { 
                    queue.add(e);
                } else { 
                    if ((queue.peek().dist < d)) { 
                        queue.remove(); 
                        queue.add(e); 
                    }
                }
            }
            
            MyType[] arr = new MyType[queue.size()]; 
            for (int i = queue.size() - 1; i >= 0; i--) {
                arr[i] = queue.poll(); 
            }
            for (MyType e : arr) {
                String[] tuple = e.str.split("\t"); 
                String k = ""; 
                String v = ""; 
                if (tuple.length > 0)
                    k = tuple[0];
                emitkey.set(k); 
                double d = Double.parseDouble(tuple[tuple.length - 1]); 
                v = tuple[tuple.length - 2] + "\t" + String.format("%.2f",d); 
                emitval.set(v); 
                context.write(emitkey, emitval);
            }
        }
    }

    public static void main(String[] args) throws IOException, InterruptedException, ClassNotFoundException {
        Configuration conf = new Configuration();
        String[] otherArgs = new GenericOptionsParser(conf, args).getRemainingArgs(); 
        if (otherArgs.length != 6) { 
            System.out.println("usage: <numberOfPartitions> <queryPoint> <K> <in> <out1> <out2>");
            System.exit(1);
        }
        
        conf.setInt("numberOfPartitions", Integer.parseInt(otherArgs[0])); 
        
        String arr[] = otherArgs[1].split(":");
        String keywords = "0"; 
        String query = "0"; 
        for (int i = 0; i < arr.length; i++)
            if (i % 2 == 0) { 
                keywords = keywords + "\t" + arr[i];
            } else { 
                query = query + "\t" + arr[i];
            }
        conf.set("keywords", keywords); 
        conf.set("queryPoint", query); 
        conf.setInt("K", Integer.parseInt(otherArgs[2])); 

        FileSystem hdfs = FileSystem.get(conf);
        Path output1 = new Path(otherArgs[4]); 
        Path output2 = new Path(otherArgs[5]); 

        
        if (hdfs.exists(output1))
            hdfs.delete(output1, true);
        if (hdfs.exists(output2))
            hdfs.delete(output2, true);

        
        Job job = new Job(conf, "1st phase");
        job.setJarByClass(TopKSearch.class); 
        job.setNumReduceTasks(2); 
        job.setMapperClass(MapClass1.class); 
        job.setReducerClass(ReduceClass1.class); 
        job.setOutputKeyClass(Text.class); 
        job.setOutputValueClass(Text.class); 
        FileInputFormat.addInputPath(job, new Path(otherArgs[3])); 
        FileOutputFormat.setOutputPath(job, output1); 
        if (!job.waitForCompletion(true))
            System.exit(1);

        
        Job job2 = new Job(conf, "2nd phase");
        job2.setJarByClass(TopKSearch.class); 
        job2.setNumReduceTasks(1); 
        job2.setMapperClass(MapClass2.class); 
        job2.setReducerClass(ReduceClass2.class); 
        job2.setOutputKeyClass(Text.class); 
        job2.setOutputValueClass(Text.class); 
        FileInputFormat.addInputPath(job2, new Path(otherArgs[4])); 
        FileOutputFormat.setOutputPath(job2, output2); 
        if (!job2.waitForCompletion(true))
            System.exit(1);
    }
}
