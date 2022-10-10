package com.ssafy.wayg.repository;

import com.ssafy.wayg.dto.FeedDto;
import com.ssafy.wayg.dto.FeedlikeDto;
import com.ssafy.wayg.entity.Feed;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Integer> {

	Page<Feed> findAllByOrderByFeedLikeDesc(Pageable pageable);
	Page<Feed> findByUserNoUserNoOrderByFeedNoDesc(int userNo, Pageable pageable);
	
	@Query("Select f FROM Feed f WHERE f.id IN (?1)")
	Page<Feed> findByFeedNo(List<Integer> feedNoList, Pageable pageable);

	@Query(value = "select user_no from feed where feed_no = ?1", nativeQuery = true)
    int findByFeedNo(int feedNo);
}