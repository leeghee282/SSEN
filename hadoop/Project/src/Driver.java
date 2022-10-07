package ssafy;

import org.apache.hadoop.util.ProgramDriver;

public class Driver {
	public static void main(String[] args) {
		int exitCode = -1;
		ProgramDriver pgd = new ProgramDriver();
		try {
			pgd.addClass("keyword", Keywordsort.class,
					"A map/reduce program output frequency of the keywords in the input files sort by frequency DESC.");
			pgd.addClass("news", Newssearch.class,
					"A map/reduce program that search news by input keyword.");
			pgd.addClass("news2", Newssearch2.class,
					"A map/reduce program that search news by input keyword(return without content).");
			pgd.addClass("topksearch", TopKSearch.class, "A map/reduce program that performs the top-k search for a single input file.");
			// pgd.addClass("valuesortexp", ValueSortExp.class,
			// 		"A map/reduce program output frequency of the words in the input files sort by desc order.");
			// pgd.addClass("inverted", InvertedIndex.class,
			// 		"A map/reduce program that generates the inverted index using words in the input files.");
			// pgd.addClass("matadd", MatrixAdd.class, "A map/reduce program that computes the addition of two matrices.");
			// pgd.addClass("matmulti", MatrixMulti.class, "1-Phase Matrix Multiplication Preparation");
			// pgd.addClass("allpair", AllPairPartition.class, "A map/reduce prgoram that partitions all pairs of tuples from both tables.");
			// pgd.addClass("allpairself", AllPairPartitionSelf.class, "A map/reduce prgoram that partitions all pairs of tuples from a tables.");
			// pgd.addClass("itemcount", CommonItemCount.class, "A map/reduce prgoram that performs the common item count using the inverted index for a single input file.");
			// pgd.addClass("topksearch", TopKSearch.class, "A map/reduce prgoram that performs the top-k search for a single input file.");
			pgd.driver(args);
			exitCode = 0;
		} catch (Throwable e) {
			e.printStackTrace();
		}

		System.exit(exitCode);
	}
}
