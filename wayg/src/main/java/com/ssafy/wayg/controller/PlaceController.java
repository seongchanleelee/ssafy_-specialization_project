package com.ssafy.wayg.controller;

import com.ssafy.wayg.dto.PlaceDto;
import com.ssafy.wayg.dto.PlacescrapDto;
import com.ssafy.wayg.service.PlaceService;
import com.ssafy.wayg.service.PlaceService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/place")
public class PlaceController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	private PlaceService placeService;

	@Autowired
	public PlaceController(PlaceService placeService) {
		this.placeService = placeService;
	}
	
	@ApiOperation(value = "관광지 목록", notes = "성공여부와 해당 페이지의 관광지 정보를 반환한다. ", response = Map.class)
	@GetMapping
	public ResponseEntity<Map<String,Object>> retrievePlace(@ApiParam(value="현재 페이지", required=true) int page,
															@RequestParam(value="size", defaultValue = "3") @ApiParam(value="페이지 당 글 개수") int size,
															@RequestParam(value = "sort", defaultValue = "placeScrap,desc") @ApiParam("정렬기준 컬럼명,정렬방식. 기본값은 placeScrap,desc 다.") String sort,
															@ApiParam(value="Pageable 객체. 자동생성된다.") Pageable pageable,
															@ApiParam(value="회원 번호", required = true) int userNo) {
		Map<String,Object> resultMap = new HashMap<>();
		HttpStatus httpStatus = HttpStatus.ACCEPTED;
		try {
			resultMap.put("placeList",placeService.retrievePlace(userNo, pageable));
			resultMap.put("message",SUCCESS);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message",FAIL);
		}
		return new ResponseEntity<>(resultMap, httpStatus);
	}

	@ApiOperation(value = "관광지 상세보기", notes = "성공여부와 관광지 번호에 해당하는 관광지의 정보를 반환한다.", response = Map.class)
	@GetMapping("/view")
	public ResponseEntity<Map<String,Object>> detailPlace(@RequestParam int userNo, @RequestParam int placeNo) {
		Map<String,Object> resultMap = new HashMap<>();
		try {
			PlaceDto placeDto = placeService.detailPlace(userNo, placeNo);
			resultMap.put("place",placeDto);
			resultMap.put("message",SUCCESS);
		}
		catch (Exception e) {
			resultMap.put("message",FAIL);
		}
		return new ResponseEntity<>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "스크랩 추가", notes = "관광지에 스크랩을 추가한다. 그리고 DB 입력 성공여부 메세지, 등록한 객체를 반환한다.", response = Map.class)
	@PostMapping("/scrap")
	public ResponseEntity<Map<String,Object>> plusScrap(@RequestBody PlacescrapDto scrap) {
		Map<String, Object> resultMap = new HashMap<>();
		try {
			placeService.insertScrap(scrap);
			resultMap.put("message",SUCCESS);
		} catch (Exception e) {
			resultMap.put("message",e.getMessage());
		}
		return new ResponseEntity<>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "스크랩 삭제", notes = "관광지 번호에 해당하는 관광지의 스크랩 정보를 삭제한다. 그리고 DB 삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
	@DeleteMapping("/scrap/{placeNo}")
	public ResponseEntity<Map<String,Object>> deleteScrap(@RequestParam int userNo, @RequestParam int placeNo) {
		Map<String, Object> resultMap = new HashMap<>();
		try {
			placeService.deleteScrap(userNo, placeNo);
			resultMap.put("message",SUCCESS);
		} catch (Exception e) {
			resultMap.put("message",e.getMessage());
		}
		return new ResponseEntity<>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "스크랩 리스트", notes = "성공여부와 내가 스크랩한 관광지의 정보를 반환한다. ", response = Map.class)
	@GetMapping("/myScrapList")
	public ResponseEntity<Map<String,Object>> retrieveScrapList(@ApiParam(value="현재 페이지", required=true) int page,
															@RequestParam(value="size", defaultValue = "3") @ApiParam(value="페이지 당 글 개수") int size,
															@RequestParam(value = "sort", defaultValue = "scrapNo,desc") @ApiParam("정렬기준 컬럼명,정렬방식. 기본값은 scrapNo,desc 다.") String sort,
															@ApiParam(value="Pageable 객체. 자동생성된다.") Pageable pageable,
															@ApiParam(value="회원 번호", required = true) int userNo) {
		Map<String,Object> resultMap = new HashMap<>();
		HttpStatus httpStatus = HttpStatus.ACCEPTED;
		try {
			resultMap.put("myScrapList",placeService.retrieveScrapList(userNo, pageable));
			resultMap.put("message",SUCCESS);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message",FAIL);
		}
		return new ResponseEntity<>(resultMap, httpStatus);
	}

	@ApiOperation(value = "관광지 목록 검색", notes = "초성포함 해당되는 관광지를 모두 반환한다.", response = Map.class)
	@GetMapping("/search")
	public ResponseEntity<Map<String,Object>> searchPlace(@ApiParam(value="검색단어") @RequestParam String keyword){
		Map<String,Object> resultMap = new HashMap<>();
		HttpStatus httpStatus = HttpStatus.ACCEPTED;

		try {
			resultMap.put("placeList",placeService.searchPlace(keyword));
			resultMap.put("message",SUCCESS);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			resultMap.put("message",FAIL);
		}

		return new ResponseEntity<>(resultMap, httpStatus);
	}

	@ApiOperation(value = "관광지 목록 검색", notes = "이름에 맞는 관광지를 반환한다.", response = Map.class)
	@PostMapping("/search")
	public ResponseEntity<Map<String, Object>> searchName(@RequestBody Map<String, String> params){
		int userNo = Integer.parseInt(params.get("userNo"));
		String name = params.get("placeName");

		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus httpStatus = HttpStatus.ACCEPTED;

		try{
			PlaceDto placeDto = placeService.searchName(userNo, name);
			resultMap.put("message", SUCCESS);
			resultMap.put("place", placeDto);
			httpStatus = HttpStatus.OK;
		} catch (Exception e){
			resultMap.put("message", FAIL);
		}
		return new ResponseEntity<>(resultMap, httpStatus);
	}

	@GetMapping("/wordcloud")
	public ResponseEntity<Map<String,Object>> wordCloud(@RequestParam String placeName){
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus httpStatus = HttpStatus.ACCEPTED;

		try{
			resultMap.put("words", placeService.wordCloud(placeName));
			resultMap.put("message", SUCCESS);
			httpStatus = HttpStatus.OK;
		} catch (Exception e){
			resultMap.put("message", FAIL);
		}

		return new ResponseEntity<>(resultMap, httpStatus);
	}
}
