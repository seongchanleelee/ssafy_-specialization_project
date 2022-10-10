package com.ssafy.wayg.repository;

import com.ssafy.wayg.entity.Place;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Integer> {

	Page<Place> findAllByOrderByPlaceScrapDesc(Pageable pageable);
	
	@Query("Select p FROM Place p WHERE p.id IN (?1)")
	Page<Place> findByPlaceNo(List<Integer> placeNoList, Pageable pageable);

	Place findByPlaceName(String placeName);

	@Query(value = "SELECT place_name " +
			"FROM place " +
			"WHERE place_name >= ?1 and place_name <= ?2 " +
			"ORDER BY place_name", nativeQuery = true)
	List<String> searchByPlaceName(String placeName1, String placeName2);

	@Query(value = "SELECT place_name FROM place WHERE place_address LIKE CONCAT('%',?1,'%')", nativeQuery = true)
	List<String> findByPlaceAddressContains(String placeName);

	@Query(value = "SELECT place_name FROM place WHERE place_name LIKE CONCAT('%',?1,'%')", nativeQuery = true)
	List<String> findByPlaceNameContains(String placeName);
}