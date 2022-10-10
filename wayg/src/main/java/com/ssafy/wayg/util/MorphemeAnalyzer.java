package com.ssafy.wayg.util;

import lombok.val;
import org.openkoreantext.processor.OpenKoreanTextProcessorJava;
import org.openkoreantext.processor.phrase_extractor.KoreanPhraseExtractor;
import org.openkoreantext.processor.tokenizer.KoreanTokenizer;
import org.openkoreantext.processor.util.KoreanPos;
import org.springframework.stereotype.Component;
import scala.Enumeration;
import scala.collection.Iterator;
import scala.collection.Seq;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class MorphemeAnalyzer {
	public Map<String, Integer> analyseText(String text, Enumeration.Value[] pos){
		CharSequence normalized = OpenKoreanTextProcessorJava.normalize(text);    //정규화
		Seq<KoreanTokenizer.KoreanToken> tokens = OpenKoreanTextProcessorJava.tokenize(normalized);        //토큰화
		List<KoreanPhraseExtractor.KoreanPhrase> phrases = OpenKoreanTextProcessorJava.extractPhrases(tokens, true, false);

		Map<String,Integer> result = new HashMap<>();
		for (KoreanPhraseExtractor.KoreanPhrase phrase : phrases) {
			Iterator<KoreanTokenizer.KoreanToken> iter = phrase.tokens().iterator();
			int cnt = 0;
			StringBuilder val = new StringBuilder();
			while (iter.hasNext() && cnt < 2) {
				KoreanTokenizer.KoreanToken token = iter.next();
				for(Enumeration.Value p:pos){
					if(token.pos().equals(p)){
						val.append(token.text().trim()).append(' ');
						break;
					}
				}
				cnt++;
			}
			if(val.length() > 0) result.put(val.toString().trim(), result.getOrDefault(val.toString(),0)+1);
		}
		return result;
	}

	public Map<String, Integer> pickMorpheme(String text) {
		return analyseText(text,new Enumeration.Value[]{KoreanPos.Noun(),KoreanPos.Verb(), KoreanPos.Adjective()});
	}

	public List<String> pickNouns(String text){
		return new ArrayList<>(analyseText(text, new Enumeration.Value[]{KoreanPos.Noun()}).keySet());
	}
}