package com.ssafy.wayg.controller;

import com.ssafy.wayg.config.auth.LoginUser;
import com.ssafy.wayg.config.auth.SessionUser;
import com.ssafy.wayg.entity.User;
import com.ssafy.wayg.repository.UserRepository;
import com.ssafy.wayg.service.KakaoService;
import com.ssafy.wayg.util.DEConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class MainController {
    private final HttpSession httpSession;
    private final KakaoService kakaoService;
    private final DEConverter deConverter;
    private final UserRepository userRepository;

    @GetMapping("/")
    public void index(Model model, @LoginUser SessionUser user, HttpServletResponse response) throws IOException {

        if(user != null)
            model.addAttribute("userName", user.getName());

        response.sendRedirect("https://j7c202.p.ssafy.io/main");

    }

    @GetMapping("/login")
    public void login(@RequestParam("code") String code, HttpServletResponse response) throws IOException {
//        System.out.println("code: " + code);

        try {
            String access_token = kakaoService.getAccessToken(code);
//            System.out.println("access-token : " + access_token);

            HashMap<String, Object> userInfo = kakaoService.getUserInfo(access_token);
//            System.out.println("login Controller : " + userInfo);

            if(userInfo.get("email") != null){
                httpSession.setAttribute("userId", userInfo.get("email"));
                httpSession.setAttribute("access_token", access_token);
            } else {

            }
            String url = "https://j7c202.p.ssafy.io/loginhandler";
            //        여기좀 바꿔줘 https://j7c202.p.ssafy.io/loginhandler

            User user = userRepository.findByUserEmail((String) userInfo.get("email")).get();
            String id = String.valueOf(deConverter.toUserDto(user).getUserNo());

            response.sendRedirect(url + "?access_token="+access_token+"&id="+id);
        } catch(Exception e) {
            response.sendRedirect("https://early-honeycrisp-704.notion.site/0-a0000ed62e984039841342adb53fad24");
        }

    }

//    @GetMapping("/logout")
//    public String logout(HttpSession session){
//       String access_token = (String)session.getAttribute("access_token");
//
//       if(access_token != null && !"".equals(access_token)){
//           kakaoService.kakaoLogout(access_token);
//           session.removeAttribute("access_token");
//           session.removeAttribute("userId");
//       }
//       else{
//           System.out.println("access_token is null");
//       }
//
//       return "redirect:/";
//    }
//    @Autowired
//    private UserDto userDto;
//
//    @GetMapping(path="/", produces="application/json")
//    public Employees getEmployees() {
//        return dao.getAllEmployees();
//    }
}