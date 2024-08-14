package com.example.hangulsarang;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;

@Controller
@Slf4j
public class HomeController {

    @GetMapping("/hangulsarang")
    public String home(){
        return "main";
    }

    @GetMapping("/spellcheck")
    public String spellcheck() {
        return "spellcheck";
    }

    @GetMapping("/game")
    public String game() {
        return "game";
    }

    @GetMapping("/notice")
    public String notice() {
        return "notice";
    }

    @GetMapping("/addpost")
    public String addpost(){
        return "addpost";
    }

    @GetMapping("/post-detail")
    public String postDetail(){
        return "post-detail";
    }

    @GetMapping("/edit-post")
    public String editPost(){
        return "edit-post";
    }

    // 로그인 성공 후 redirect_uri로 리다이렉트
    @GetMapping("/handleLoginSuccess")
    public String handleLoginSuccess(HttpSession session, OAuth2AuthenticationToken authentication) {
        // OAuth2 인증 후 사용자 정보를 가져오는 코드
        OAuth2User user = authentication.getPrincipal(); // OAuth2User 객체를 얻는 방법

        if (user != null){
            session.setAttribute("user",user);
            log.info("로그인된 사용자 정보: {}", user);

            // 저장된 리다이렉트 URI 가져오기
            String redirectUri = (String) session.getAttribute("redirectUri");
//            log.info("세션에서 가져온 redirect_uri : {}", redirectUri);

            // 만약 값을 가져오지 않으면 404
            if (redirectUri == null || redirectUri.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }

            return "redirect:" + redirectUri;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/mypage")
    public String mypage(){
        return "mypage";
    }

    @GetMapping("/edit-profile")
    public String editProfile(){
        return "edit-profile";
    }
}
