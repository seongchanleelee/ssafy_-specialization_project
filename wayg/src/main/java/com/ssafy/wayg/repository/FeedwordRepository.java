package com.ssafy.wayg.repository;

import com.ssafy.wayg.entity.Feedword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FeedwordRepository extends JpaRepository<Feedword, Integer> {
	Long countByFeedwordWord(String placewordWord);
	List<Feedword> findByFeedwordWord(String feedwordWord);
}