package com.ssafy.wayg.service;

import com.ssafy.wayg.dto.UserDto;

import java.util.HashMap;

public interface UserService {
    public UserDto register(HashMap<String, Object> userInfo);
    public UserDto userInfo(int userNo) throws Exception;
}
