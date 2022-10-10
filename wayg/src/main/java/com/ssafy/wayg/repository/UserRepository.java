package com.ssafy.wayg.repository;

import com.ssafy.wayg.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserEmail(String userEmail);

    User findByUserNo(int userNo);
}
