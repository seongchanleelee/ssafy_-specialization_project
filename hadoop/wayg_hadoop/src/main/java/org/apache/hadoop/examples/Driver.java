package org.apache.hadoop.examples;

import org.apache.hadoop.util.ProgramDriver;

public class Driver {
	public static void main(String[] args) {
		int exitCode = -1;
		ProgramDriver pgd = new ProgramDriver();
		try {

			pgd.addClass("wordcount", WordCount.class, "A map/reduce program that performs word counting.");
			pgd.addClass("morph", MorphCount.class, "A map/reduce program that perfomes morpheme counting.");

			pgd.driver(args);
			exitCode = pgd.run(args);
		}
		catch(Throwable e) {
			e.printStackTrace();
		}

		System.exit(exitCode);
	}
}
