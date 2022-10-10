package com.ssafy.wayg.config.auth;

import com.ssafy.wayg.role.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                    .authorizeRequests()
//                    .antMatchers("/", "/css/**", "/images/**", "/js/**", "/h2-console/**", "/swagger-ui/**","/swagger-ui","/feed","/feed/**","/place","/place/**").permitAll()
//                    .antMatchers("/api/v1/**").hasRole(Role.USER.name()) //USER 권한 가진 사람만 가능 -> 로그인 후 기능 url 넣어야함
//                    .antMatchers("/oauth2/authorization/kakao/**").permitAll()
//                    .antMatchers("/api/login/**").permitAll()
//                    .anyRequest().authenticated() //설정값 이외의 url은 인증 완료한 사용자만이 사용가능함
                    .antMatchers("api/feed/upload","api/feed/myFeed","api/feed/like","api/feed/like/**","api/feed/myLikeList","api/place/scrap","api/place/scrap/**","api/place/myScrapList").authenticated()
                    .anyRequest().permitAll()
                .and()
                    .logout()
                    .logoutSuccessUrl("/") // 로그아웃 성공시 /로 이동
                .and()
                    .oauth2Login()
                    .userInfoEndpoint()
                    .userService(customOAuth2UserService); //로그인 성공 시 후속 조치 진행 구현체

        return http.build();
    }
}
