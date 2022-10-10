package com.ssafy.wayg.controller;

import java.util.*;

import com.ssafy.wayg.dto.FeedwordDto;
import com.ssafy.wayg.dto.PlacewordDto;
import com.ssafy.wayg.util.MorphemeAnalyzer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.wayg.dto.FeedDto;
import com.ssafy.wayg.dto.FeedlikeDto;
import com.ssafy.wayg.service.FeedService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/feed")
public class FeedController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	private FeedService feedService;
	private MorphemeAnalyzer analyzer;
	
	@Autowired
	public FeedController(FeedService feedService, MorphemeAnalyzer analyzer) {
		this.feedService = feedService;
		this.analyzer = analyzer;
	}
	
	@ApiOperation(value = "피드 목록", notes = "성공여부와 해당 페이지의 피드 정보를 반환한다. ", response = Map.class)
	@GetMapping
	public ResponseEntity<Map<String,Object>> retrieveFeed(@ApiParam(value="현재 페이지", required=true) int page,
															@RequestParam(value="size", defaultValue = "3") @ApiParam(value="페이지 당 글 개수") int size,
															@RequestParam(value = "sort", defaultValue = "feedLike,desc") @ApiParam("정렬기준 컬럼명,정렬방식. 기본값은 feedLike,desc 다.") String sort,
															@ApiParam(value="Pageable 객체. 자동생성된다.") Pageable pageable,
														   @ApiParam(value="회원 번호", required = true) int userNo) {
		Map<String,Object> resultMap = new HashMap<>();
		HttpStatus httpStatus = HttpStatus.ACCEPTED;
		try {
			resultMap.put("feedList",feedService.retrieveFeed(userNo, pageable));
			resultMap.put("message",SUCCESS);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message",FAIL);
		}
		return new ResponseEntity<>(resultMap, httpStatus);
	}

	@ApiOperation(value = "피드 목록(tf-idf)", notes = "성공여부와 해당 페이지의 피드 정보를 입력받은 텍스트와 관련된 순으로 반환한다. ", response = Map.class)
	@PostMapping
	public ResponseEntity<Map<String,Object>> retrieveFeed(@RequestBody Map<String,Object> params){
		Map<String,Object> resultMap = new HashMap<>();
		HttpStatus httpStatus = HttpStatus.ACCEPTED;
		Map<String,Integer> split = analyzer.pickMorpheme((String) params.get("str")); // 형태소 분리한 결과 넣은 map
		List<String> send = new ArrayList<>(split.keySet());	//형태소 분리한 단어들을 list에 넣어줌

		ArrayList<String> placeList = (ArrayList<String>) params.get("placeList");
		if(placeList != null) Collections.sort(placeList);

		Map<String, Double> feeds = new HashMap<>(); // 피드와 tfidf 값 넣어줄 map
		try {
			long total = feedService.totalSize(); //전체 문서 수

			for (String s : send) {
				//각 단어의 idf 구하기 * 피드 tf
				List<FeedwordDto> feedwordDtoList = feedService.oneSize(s);
				double idf = feedService.feedword(s, total);
				for (FeedwordDto feedwordDto : feedwordDtoList) {
					if(placeList != null && Collections.binarySearch(placeList,feedwordDto.getFeedwordName()) >= 0){
						feeds.put(feedwordDto.getFeedwordName(), idf * feedwordDto.getFeedwordCount());
					}
				}
			}
			resultMap.put("content",feeds);
			resultMap.put("message",SUCCESS);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message", FAIL);
		}
		return new ResponseEntity<>(resultMap, httpStatus);
	}

	@ApiOperation(value = "피드 상세보기", notes = "성공여부와 피드 번호에 해당하는 피드의 정보를 반환한다.", response = Map.class)
	@GetMapping("/view")
	public ResponseEntity<Map<String,Object>> detailFeed(@RequestParam int userNo, @RequestParam int feedNo) {
		Map<String,Object> resultMap = new HashMap<>();
		try {
			FeedDto feedDto = feedService.detailFeed(userNo, feedNo);
			resultMap.put("feed",feedDto);
			resultMap.put("message",SUCCESS);
		}
		catch (Exception e) {
			resultMap.put("message",FAIL);
		}
		return new ResponseEntity<>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "피드 등록", notes = "새로운 피드 정보를 입력한다. 그리고 DB 입력 성공여부 메세지, 등록한 글 객체를 반환한다.", response = Map.class)
	@PostMapping("/upload")
	public ResponseEntity<Map<String,Object>> writeFeed(@RequestBody FeedDto feed) {
		Map<String, Object> resultMap = new HashMap<>();
		try {
			resultMap.put("feed",feedService.insertFeed(feed));
			resultMap.put("message",SUCCESS);
		} catch (Exception e) {
			resultMap.put("message",e.getMessage());
		}
		return new ResponseEntity<>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "피드 삭제", notes = "피드 번호에 해당하는 피드의 정보를 삭제한다. 그리고 DB 삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("/{feedNo}")
	public ResponseEntity<Map<String,Object>> deleteFeed(@PathVariable int feedNo) {
		Map<String,Object> resultMap = new HashMap<>();
		try {
			feedService.deleteFeed(feedNo);
			resultMap.put("message",SUCCESS);
		} catch (Exception e) {
			resultMap.put("message",e.getMessage());
		}
		return new ResponseEntity<>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "내 피드 목록", notes = "성공여부와 내 피드 정보를 반환한다. ", response = Map.class)
	@GetMapping("/myFeed")
	public ResponseEntity<Map<String,Object>> retrieveMyFeed(@ApiParam(value="현재 페이지", required=true) int page,
															@RequestParam(value="size", defaultValue = "3") @ApiParam(value="페이지 당 글 개수") int size,
															@RequestParam(value = "sort", defaultValue = "feedNo,desc") @ApiParam("정렬기준 컬럼명,정렬방식. 기본값은 feedNo,desc 다.") String sort,
															@ApiParam(value="Pageable 객체. 자동생성된다.") Pageable pageable,
															@ApiParam(value="회원 번호", required = true) int userNo) {
		Map<String,Object> resultMap = new HashMap<>();
		HttpStatus httpStatus = HttpStatus.ACCEPTED;
		try {
			resultMap.put("myFeedList",feedService.retrieveMyFeed(userNo, pageable));
			resultMap.put("message",SUCCESS);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message",FAIL);
		}
		return new ResponseEntity<>(resultMap, httpStatus);
	}
	
	@ApiOperation(value = "좋아요 추가", notes = "피드에 좋아요를 추가한다. 그리고 DB 입력 성공여부 메세지, 등록한 객체를 반환한다.", response = Map.class)
	@PostMapping("/like")
	public ResponseEntity<Map<String,Object>> plusLike(@RequestBody FeedlikeDto like) {
		Map<String, Object> resultMap = new HashMap<>();
		try {
			feedService.insertLike(like);
			resultMap.put("message",SUCCESS);
		} catch (Exception e) {
			resultMap.put("message",e.getMessage());
		}
		return new ResponseEntity<>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "좋아요 삭제", notes = "피드 번호에 해당하는 피드의 좋아요 정보를 삭제한다. 그리고 DB 삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("/like/{feedNo}")
	public ResponseEntity<Map<String,Object>> deleteLike(@RequestParam int userNo, @RequestParam int feedNo) {
		Map<String, Object> resultMap = new HashMap<>();
		try {
			feedService.deleteLike(userNo, feedNo);
			resultMap.put("message",SUCCESS);
		} catch (Exception e) {
			resultMap.put("message",e.getMessage());
		}
		return new ResponseEntity<>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "좋아요 리스트", notes = "성공여부와 내가 좋아요 누른 피드의 정보를 반환한다. ", response = Map.class)
	@GetMapping("/myLikeList")
	public ResponseEntity<Map<String,Object>> retrieveLikeList(@ApiParam(value="현재 페이지", required=true) int page,
															@RequestParam(value="size", defaultValue = "3") @ApiParam(value="페이지 당 글 개수") int size,
															@RequestParam(value = "sort", defaultValue = "likeNo,desc") @ApiParam("정렬기준 컬럼명,정렬방식. 기본값은 likeNo,desc 다.") String sort,
															@ApiParam(value="Pageable 객체. 자동생성된다.") Pageable pageable,
															@ApiParam(value="회원 번호", required = true) int userNo) {
		Map<String,Object> resultMap = new HashMap<>();
		HttpStatus httpStatus = HttpStatus.ACCEPTED;
		try {
			resultMap.put("myLikeList",feedService.retrieveLikeList(userNo, pageable));
			resultMap.put("message",SUCCESS);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message",FAIL);
		}
		return new ResponseEntity<>(resultMap, httpStatus);
	}
}
