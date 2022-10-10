package com.ssafy.wayg.service;

import com.ssafy.wayg.dto.FeedDto;
import com.ssafy.wayg.dto.FeedlikeDto;
import com.ssafy.wayg.dto.FeedwordDto;
import com.ssafy.wayg.entity.Feed;
import com.ssafy.wayg.entity.Feedword;
import com.ssafy.wayg.entity.Place;
import com.ssafy.wayg.repository.*;
import com.ssafy.wayg.util.DEConverter;
import com.ssafy.wayg.util.MorphemeAnalyzer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class FeedServiceImpl implements FeedService {

	private FeedRepository feedRepository;
	private FeedlikeRepository likeRepository;
	private UserRepository userRepository;
	private PlaceRepository placeRepository;
	private FeedwordRepository feedwordRepository;
	private DEConverter converter;
	private MorphemeAnalyzer analyzer;

	@Autowired
	public FeedServiceImpl(FeedRepository feedRepository, FeedlikeRepository likeRepository,
						   UserRepository userRepository, PlaceRepository placeRepository,
						   FeedwordRepository feedwordRepository,
						   DEConverter converter, MorphemeAnalyzer analyzer) {
		this.feedRepository = feedRepository;
		this.likeRepository = likeRepository;
		this.userRepository = userRepository;
		this.placeRepository = placeRepository;
		this.feedwordRepository = feedwordRepository;
		this.converter = converter;
		this.analyzer = analyzer;
	}

	@Override
	public Page<FeedDto> retrieveFeed(int userNo, Pageable pageable) throws Exception {
		Page<FeedDto> feedDtoPage = converter.toFeedDtoList(feedRepository.findAllByOrderByFeedLikeDesc(pageable));

		for (int i = 0; i < feedDtoPage.getContent().size(); i++) {
			FeedDto feedDto = feedDtoPage.getContent().get(i);
			feedDto.setUserNo(feedRepository.findByFeedNo(feedDto.getFeedNo()));
			feedDtoPage.getContent().get(i).setFeedLikeYn(likeRepository.findByUserNoUserNoAndFeedNoFeedNo(userNo, feedDto.getFeedNo()) != null);
			System.out.println(feedDto);
		}

		return feedDtoPage;
	}

	@Override
	@Transactional
	public FeedDto insertFeed(FeedDto feedDto) throws Exception {
		feedDto.setFeedRegdate(Instant.now());
		//피드 저장하기
		Feed savedFeed = feedRepository.save(converter.toFeedEntity(feedDto));

		//관광지 있는지 찾기
		if(placeRepository.findByPlaceName(feedDto.getFeedPlacename()) == null){
			//없는 관광지면 place에 저장하기
			placeRepository.save(new Place(feedDto.getFeedPlacename()));
		}

		//형태소 저장
		//피드 형태소 분리해서 feedword에 저장하기
		Map<String,Integer> morphemes = analyzer.pickMorpheme(savedFeed.getFeedContent()+", "+savedFeed.getFeedTitle());
		for(Map.Entry<String,Integer> entry:morphemes.entrySet()){
			feedwordRepository.save(new Feedword(entry.getKey(), entry.getValue(), savedFeed, savedFeed.getFeedPlacename()));
		}

		//저장된 피드 반환하기
		return converter.toFeedDto(savedFeed);
	}

	@Override
	public FeedDto detailFeed(int userNo, int feedNo) throws Exception {
		FeedDto feedDto = converter.toFeedDto(feedRepository.getReferenceById(feedNo));

		feedDto.setUserNo(feedRepository.findByFeedNo(feedNo));
		feedDto.setFeedLikeYn(likeRepository.findByUserNoUserNoAndFeedNoFeedNo(userNo, feedNo) != null);
		
		return feedDto;
	}

	@Override
	@Transactional
	public void deleteFeed(int feedNo) throws Exception {
		feedRepository.delete(feedRepository.getReferenceById(feedNo));
	}
	
	@Override
	public Page<FeedDto> retrieveMyFeed(int userNo, Pageable pageable) throws Exception {
		Page<FeedDto> feedDtoPage = converter.toFeedDtoList(feedRepository.findByUserNoUserNoOrderByFeedNoDesc(userNo,pageable));
		return feedDtoPage;
	}

	@Override
	@Transactional
	public FeedlikeDto insertLike(FeedlikeDto likeDto) throws Exception {
		System.out.println(likeRepository.findByUserNoUserNoAndFeedNoFeedNo(likeDto.getUserNo(), likeDto.getFeedNo()));
		System.out.println(likeRepository.findByUserNoUserNoAndFeedNoFeedNo(likeDto.getUserNo(), likeDto.getFeedNo()) == null);
		if(likeRepository.findByUserNoUserNoAndFeedNoFeedNo(likeDto.getUserNo(), likeDto.getFeedNo()) == null) {
			Feed feed = feedRepository.getReferenceById(likeDto.getFeedNo());
			feed.setFeedLike(feed.getFeedLike()+1);
			return converter.toLikeDto(likeRepository.save(converter.toLikeEntity(likeDto)));
		}

		throw new Exception("fail");

	}
	
	@Override
	@Transactional
	public void deleteLike(int userNo, int feedNo) throws Exception {

		if(likeRepository.findByUserNoUserNoAndFeedNoFeedNo(userNo, feedNo) != null) {
			Feed feed = feedRepository.getReferenceById(feedNo);
			feed.setFeedLike(feed.getFeedLike()-1);
		}

		likeRepository.delete(likeRepository.findByUserNoUserNoAndFeedNoFeedNo(userNo, feedNo));
	}
	
	@Override
	public Page<FeedDto> retrieveLikeList(int userNo, Pageable pageable) throws Exception {
		
		List<Integer> likeList = likeRepository.findByUserNo(userNo);
		Page<FeedDto> feedDtoPage = null;

		if(likeList.isEmpty()) {
			likeList.add(0);
		}

		feedDtoPage = converter.toFeedDtoList(feedRepository.findByFeedNo(likeList, pageable));

		for (int i = 0; i < feedDtoPage.getContent().size(); i++) {
			FeedDto feedDto = feedDtoPage.getContent().get(i);
			feedDto.setFeedLikeYn(true);
		}

		return feedDtoPage;

	}

	@Override
	public long totalSize(){
		return feedRepository.count();
	}

	@Override
	public List<FeedwordDto> oneSize(String str){
		List<Feedword> feedwords = feedwordRepository.findByFeedwordWord(str);
		return converter.toFeedwordDto(feedwords);
	}

	@Override
	public double feedword(String word, long total) {
		Long size = feedwordRepository.countByFeedwordWord(word);
		return Math.log(((double)total / (double) size));
	}

}