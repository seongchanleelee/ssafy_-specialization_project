package com.ssafy.wayg.repository;

import com.ssafy.wayg.entity.Place;
import com.ssafy.wayg.entity.Placeword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface PlacewordRepository extends JpaRepository<Placeword, Integer> {
    Long countByplacewordWord(String placewordWord);
    List<Placeword> findByplacewordWord(String placewordWord);
    @Query(nativeQuery = true, value = "SELECT * FROM placeword as p WHERE p.placeword_word IN (:words) ORDER BY p.placeword_count DESC LIMIT 3")
    List<Placeword> findTop3ByplacewordWordInOrderByplacewordCountDesc(@Param("words") List<String> placewordWords);

    @Query(value = "select placeword_word as text, placeword_count as `value` from placeword where placeword_name = ?1 order by placeword_count desc limit 100", nativeQuery = true)
    List<List<Object>> findWordCountFindByplacewordName(String placeName);

}
