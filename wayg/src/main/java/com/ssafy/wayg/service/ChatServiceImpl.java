package com.ssafy.wayg.service;

import com.ssafy.wayg.dto.PlacewordDto;
import com.ssafy.wayg.entity.Placeword;
import com.ssafy.wayg.repository.PlaceRepository;
import com.ssafy.wayg.repository.PlacewordRepository;
import com.ssafy.wayg.util.DEConverter;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ChatServiceImpl implements ChatService {

    private PlacewordRepository placewordRepository;
    private PlaceRepository placeRepository;
    private DEConverter converter;

    public ChatServiceImpl(PlacewordRepository placewordRepository, PlaceRepository placeRepository, DEConverter deConverter){
        this.placewordRepository = placewordRepository;
        this.placeRepository = placeRepository;
        this.converter = deConverter;
    }

    @Override
    public double placeword(String word, long total) {
        Long size = placewordRepository.countByplacewordWord(word);
        List<String> words = new ArrayList<>();
        double idf = Math.log(((double)total / (double) size));
        //int idf = log ( total / size )

        return idf;
    }

    @Override
    public long totalSize(){
        return placeRepository.count();
    }

    @Override
    public List<PlacewordDto> oneSize(String str){
        List<Placeword> placeword = placewordRepository.findByplacewordWord(str);
        //kakao chatbot api connection

        //int size = place.getPlaceScrap();
        return converter.toPlacewordDto(placeword);
    }

    @Override
    public List<String> findPlaces(List<String> nouns){
        Set<String> nounSet = new HashSet<>();
        for(String noun : nouns){
            nounSet.addAll(placeRepository.findByPlaceAddressContains(noun));
            nounSet.addAll(placeRepository.findByPlaceNameContains(noun));
        }
        return new ArrayList<>(nounSet);
    }

    @Override
    public String setUrl(String title) throws IOException {
        StringBuilder new_name = new StringBuilder();
        new_name.append("https://res.cloudinary.com/da8po50b1/image/upload/v1664293859/place/");
        for(int j = 0; j<title.length(); j++) {
            char c = title.charAt(j);
            if(j == 0 && c == '(') continue;
            if(c == ' ' || c =='(' || c == ')') new_name.append('_');
            else new_name.append(c);
        }

        new_name.append("_1.jpg");

//        URL url_check = new URL(new_name.toString());
//        URLConnection con = url_check.openConnection();
//        HttpURLConnection exitCode = (HttpURLConnection)con;
//        if(exitCode.getResponseCode() == 404) {
//            return "https://j7c202.p.ssafy.io/noPhoto.png";//우리 url
//        }

        return new_name.toString();
    }

    @Override
    public List<PlacewordDto> search(List<String> word){
        List<Placeword> placewords = placewordRepository.findTop3ByplacewordWordInOrderByplacewordCountDesc(word);
        return converter.toPlacewordDto(placewords);
    }

}
