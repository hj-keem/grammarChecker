package com.example.hangulsarang;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
public class OauthController {
    @GetMapping("/api/user")
    public Map<String, Object> getUserInfo(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        response.put("isLoggedIn", session.getAttribute("user") != null);
        response.put("userId", session.getAttribute("id"));

        log.info("/api/user에서 가져온 userId : {}", session.getAttribute("id"));
        log.info("현재 세션 ID : {}", session.getId()); // 세션 ID 로그
        return response;
    }

    @PostMapping("/api/set-redirect-uri")
    public void setRedirectUri(@RequestBody RedirectUriRequest request, HttpSession session) {
        // 서버 측에서 redirectUri를 처리
        String redirectUri = request.getRedirectUri();
        // 받은 redirect_uri를 세션에 저장
        session.setAttribute("redirectUri", redirectUri);
    }

}
