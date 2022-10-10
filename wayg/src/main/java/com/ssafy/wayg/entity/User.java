package com.ssafy.wayg.entity;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.ssafy.wayg.role.Role;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@Table(name = "`user`")
@NoArgsConstructor
@Getter
@DynamicInsert
@DynamicUpdate
public class User {
    @Id
    @Column(name = "user_no", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer userNo;

    @Column(name = "user_name", nullable = false, length = 10)
    private String userName;

    @Column(name = "user_email", nullable = false, length = 45)
    private String userEmail;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Builder
    public User(String userName, String userEmail, String userGender, String userAge, Role role){
        this.userName = userName;
        this.userEmail = userEmail;
        this.role = role;
    }

    public User update(String userName){
        this.userName = userName;
        return this;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }
}