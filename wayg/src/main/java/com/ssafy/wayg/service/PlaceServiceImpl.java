package com.ssafy.wayg.service;

import com.ssafy.wayg.dto.PlaceDto;
import com.ssafy.wayg.dto.PlacescrapDto;
import com.ssafy.wayg.entity.Place;
import com.ssafy.wayg.repository.PlaceRepository;
import com.ssafy.wayg.repository.PlacescrapRepository;
import com.ssafy.wayg.repository.PlacewordRepository;
import com.ssafy.wayg.repository.UserRepository;
import com.ssafy.wayg.util.DEConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class PlaceServiceImpl implements PlaceService {

	private PlaceRepository placeRepository;
	private PlacescrapRepository scrapRepository;
	private PlacewordRepository placewordRepository;
	private UserRepository userRepository;
	private DEConverter converter;

	private final char[] textArr = {'가','깋','낗','닣','딯','띻','맇','밓','빟','삫','싷','잏','짛','찧','칳','킿','팋','핗','힣'};
	private final char[] jamoArr = {'ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'};

	@Autowired
	public PlaceServiceImpl(PlaceRepository placeRepository, PlacescrapRepository scrapRepository,
							UserRepository userRepository, PlacewordRepository placewordRepository,
							DEConverter converter) {
		this.placeRepository = placeRepository;
		this.scrapRepository = scrapRepository;
		this.placewordRepository = placewordRepository;
		this.userRepository = userRepository;
		this.converter = converter;
	}

	@Override
	public Page<PlaceDto> retrievePlace(int userNo, Pageable pageable) throws Exception {
		Page<PlaceDto> placeDtoPage = converter.toPlaceDtoList(placeRepository.findAllByOrderByPlaceScrapDesc(pageable));

		for (int i = 0; i < placeDtoPage.getContent().size(); i++) {
			PlaceDto placeDto = placeDtoPage.getContent().get(i);
			placeDto.setPlaceScrapYn(scrapRepository.findByUserNoUserNoAndPlaceNoPlaceNo(userNo, placeDto.getPlaceNo()) != null);
			String name = placeDto.getPlaceName();
			String new_name = "";
			for(int j = 0; j<name.length(); j++) {
				char c = name.charAt(j);
				if(j == 0 && c == '(') continue;
				if(c == ' ' || c =='(' || c == ')') new_name += '_';
				else new_name += c;
			}
			String url = "https://res.cloudinary.com/da8po50b1/image/upload/v1664854566/place/" + new_name + "_1.jpg";

			URL url_check = new URL(url);
			URLConnection con = url_check.openConnection();
			HttpURLConnection exitCode = (HttpURLConnection)con;
			if(exitCode.getResponseCode() == 404) {
				url = "";
			}

			placeDto.setPlaceFile(url);
		}

		return placeDtoPage;
	}

	@Override
	public PlaceDto detailPlace(int userNo, int placeNo) throws Exception {
		PlaceDto placeDto = converter.toPlaceDto(placeRepository.getReferenceById(placeNo));

		placeDto.setPlaceScrapYn(scrapRepository.findByUserNoUserNoAndPlaceNoPlaceNo(userNo, placeNo) != null);

		String name = placeDto.getPlaceName();
		String new_name = "";
		for(int j = 0; j<name.length(); j++) {
			char c = name.charAt(j);
			if(j == 0 && c == '(') continue;
			if(c == ' ' || c =='(' || c == ')') new_name += '_';
			else new_name += c;
		}
		String url = "https://res.cloudinary.com/da8po50b1/image/upload/v1664854566/place/" + new_name + "_1.jpg";

		URL url_check = new URL(url);
		URLConnection con = url_check.openConnection();
		HttpURLConnection exitCode = (HttpURLConnection)con;
		if(exitCode.getResponseCode() == 404) {
			url = "";
		}

		placeDto.setPlaceFile(url);
		
		return placeDto;
	}

	@Override
	@Transactional
	public PlacescrapDto insertScrap(PlacescrapDto scrapDto) throws Exception {

		if(scrapRepository.findByUserNoUserNoAndPlaceNoPlaceNo(scrapDto.getUserNo(), scrapDto.getPlaceNo()) == null) {
			Place place = placeRepository.getReferenceById(scrapDto.getPlaceNo());
			place.setPlaceScrap(place.getPlaceScrap()+1);
			return converter.toScrapDto(scrapRepository.save(converter.toScrapEntity(scrapDto)));
		}

		throw new Exception("fail");
	}
	
	@Override
	@Transactional
	public void deleteScrap(int userNo, int placeNo) throws Exception {

		if(scrapRepository.findByUserNoUserNoAndPlaceNoPlaceNo(userNo, placeNo) != null) {
			Place place = placeRepository.getReferenceById(placeNo);
			place.setPlaceScrap(place.getPlaceScrap()-1);
		}

		scrapRepository.delete(scrapRepository.findByUserNoUserNoAndPlaceNoPlaceNo(userNo, placeNo));
	}
	
	@Override
	public Page<PlaceDto> retrieveScrapList(int userNo, Pageable pageable) throws Exception {

		List<Integer> scrapList = scrapRepository.findByUserNo(userNo);

		if(scrapList.isEmpty()) {
			scrapList.add(0);
		}

		Page<PlaceDto> placeDtoPage = converter.toPlaceDtoList(placeRepository.findByPlaceNo(scrapList,pageable));
		for (int i = 0; i < placeDtoPage.getContent().size(); i++) {
			PlaceDto placeDto = placeDtoPage.getContent().get(i);
			placeDto.setPlaceScrapYn(true);
			String name = placeDto.getPlaceName();
			String new_name = "";
			for(int j = 0; j<name.length(); j++) {
				char c = name.charAt(j);
				if(j == 0 && c == '(') continue;
				if(c == ' ' || c =='(' || c == ')') new_name += '_';
				else new_name += c;
			}
			String url = "https://res.cloudinary.com/da8po50b1/image/upload/v1664854566/place/" + new_name + "_1.jpg";

			URL url_check = new URL(url);
			URLConnection con = url_check.openConnection();
			HttpURLConnection exitCode = (HttpURLConnection)con;
			if(exitCode.getResponseCode() == 404) {
				url = "";
			}

			placeDto.setPlaceFile(url);
		}

		return placeDtoPage;
	}

	@Override
	public List<String> searchPlace(String keyword) throws Exception {
		char targetChar = keyword.charAt(keyword.length() - 1);
		char endChar = '0';
		// 입력값의 끝 문자가 ㄱ...ㅎ 인 경우
		if(targetChar <= 12622) {
			for(int i = 0; i < jamoArr.length; i++) {
				if(targetChar == jamoArr[i]) {
					endChar = textArr[i + 1];
				}
			}
		} else {
			// 입력값의 끝 문자가 가...힣 인 경우
			for(int i = 0; i < textArr.length; i++) {
				if(targetChar >= textArr[i] && targetChar < textArr[i + 1]) {
					endChar = textArr[i + 1];
				}
			}
		}

		String endKeyword = keyword.substring(0, keyword.length() - 1) + endChar;

		return placeRepository.searchByPlaceName(keyword,endKeyword);
	}

	@Override
	public PlaceDto searchName(int userNo, String name) throws Exception{
		PlaceDto placeDto = converter.toPlaceDto(placeRepository.findByPlaceName(name));

		placeDto.setPlaceScrapYn(scrapRepository.findByUserNoUserNoAndPlaceNoPlaceNo(userNo, placeDto.getPlaceNo()) != null);

		String new_name = "";
		for(int j = 0; j<name.length(); j++) {
			char c = name.charAt(j);
			if(j == 0 && c == '(') continue;
			if(c == ' ' || c =='(' || c == ')') new_name += '_';
			else new_name += c;
		}
		String url = "https://res.cloudinary.com/da8po50b1/image/upload/v1664293859/place/" + new_name + "_1.jpg";

		URL url_check = new URL(url);
		URLConnection con = url_check.openConnection();
		HttpURLConnection exitCode = (HttpURLConnection)con;
		if(exitCode.getResponseCode() == 404) {
			url = "";
		}

		placeDto.setPlaceFile(url);

		return placeDto;
	}

	public PlaceDto searchName(String name) throws Exception{
		return converter.toPlaceDto(placeRepository.findByPlaceName(name));
	}

	@Override
	public List<List<Object>> wordCloud(String placeName) {
		List<List<Object>> result = placewordRepository.findWordCountFindByplacewordName(placeName);
		return result;
	}
}