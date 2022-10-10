package org.apache.hadoop.examples;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;
import org.openkoreantext.processor.OpenKoreanTextProcessorJava;
import org.openkoreantext.processor.phrase_extractor.KoreanPhraseExtractor;
import org.openkoreantext.processor.tokenizer.KoreanTokenizer;
import org.openkoreantext.processor.util.KoreanPos;
import scala.collection.Iterator;
import scala.collection.Seq;

import java.io.IOException;
import java.util.List;
import java.util.Locale;
import java.util.StringTokenizer;

public class MorphCount {
	public static void main(String[] args) throws Exception {
		Configuration conf = new Configuration();
		String[] otherArgs = new GenericOptionsParser(conf, args).getRemainingArgs();
		if (otherArgs.length != 2) {
			System.err.println("Usage: morpheme <in> <out>");
			System.exit(2);
		}

		FileSystem hdfs = FileSystem.get(conf);
		Path output = new Path(otherArgs[1]);
		if (hdfs.exists(output))
			hdfs.delete(output, true);

		Job job = new Job(conf, "morpheme count");
		job.setJarByClass(MorphCount.class);
		job.setMapperClass(MorphCount.TokenizerMapper.class);
		job.setCombinerClass(MorphCount.IntSumReducer.class);
		job.setReducerClass(MorphCount.IntSumReducer.class);
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(IntWritable.class);
		FileInputFormat.addInputPath(job, new Path(otherArgs[0]));
		FileOutputFormat.setOutputPath(job, new Path(otherArgs[1]));
		System.exit(job.waitForCompletion(true) ? 0 : 1);
	}

	public static class TokenizerMapper
			extends Mapper<Object, Text, Text, IntWritable> {

		private final static IntWritable one = new IntWritable(1);
		private final static String top = "관광지";
		private Text word = new Text();

		public void map(Object key, Text value, Context context
		) throws IOException, InterruptedException {

			StringTokenizer itr = new StringTokenizer(value.toString(), ",");
			String name = "";
			if (itr.countTokens() > 1) {
				name = itr.nextToken().trim();
				if (name.equals(top)) return;
			}

			while (itr.hasMoreTokens()) {
				CharSequence normalized = OpenKoreanTextProcessorJava.normalize(itr.nextToken());
				Seq<KoreanTokenizer.KoreanToken> tokens = OpenKoreanTextProcessorJava.tokenize(normalized);
				List<KoreanPhraseExtractor.KoreanPhrase> phrases = OpenKoreanTextProcessorJava.extractPhrases(tokens, true, false);

				for (KoreanPhraseExtractor.KoreanPhrase phrase : phrases) {
					Iterator<KoreanTokenizer.KoreanToken> iter = phrase.tokens().iterator();
					int cnt = 0;
					StringBuilder val = new StringBuilder();

					while (iter.hasNext() && cnt < 2) {
						KoreanTokenizer.KoreanToken token = iter.next();
						if(token.pos() == KoreanPos.Noun()|| token.pos() == KoreanPos.Adjective() || token.pos() == KoreanPos.Verb()){
							val.append(token.text().trim()).append(' ');
						}
						cnt++;
					}

					if(val.length() == 0) continue;
					word.set(new StringBuilder().append(name).append(',').append(val.deleteCharAt(val.length()-1)).append(',').toString());
					context.write(word, one);
				}
			}

		}
	}

	public static class IntSumReducer
			extends Reducer<Text, IntWritable, Text, IntWritable> {
		private IntWritable result = new IntWritable();

		public void reduce(Text key, Iterable<IntWritable> values,
						   Context context
		) throws IOException, InterruptedException {
			int sum = 0;
			for (IntWritable val : values) {
				sum += val.get();
			}
			result.set(sum);
			context.write(key, result);
		}
	}
}
