package com.ssafy.wayg.repository;

import com.ssafy.wayg.entity.Feedlike;
import com.ssafy.wayg.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedlikeRepository extends JpaRepository<Feedlike, Integer> {

	Feedlike findByUserNoUserNoAndFeedNoFeedNo(int userNo, int feedNo);
	
	int countByFeedNoFeedNo(int feedNo);
	
	@Query(value = "select feed_no from feedlike where user_no = ?1", nativeQuery = true)
	List<Integer> findByUserNo(int userNo);

}