package com.ssafy.wayg.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * A DTO for the {@link com.ssafy.wayg.entity.User} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "User : 회원정보", description = "회원의 상세 정보를 나타낸다.")
public class UserDto implements Serializable {
    @ApiModelProperty(value = "회원 번호")
    private Integer userNo;
    @ApiModelProperty(value = "회원 이름")
    private String userName;
    @ApiModelProperty(value = "회원 역할")
    private String Role;
    @ApiModelProperty(value = "회원 이메일")
    private String userEmail;
}