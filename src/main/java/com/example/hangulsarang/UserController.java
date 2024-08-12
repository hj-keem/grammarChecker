package com.example.hangulsarang;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
public class UserController {
    @GetMapping("/api/user")
    public Map<String, Object> getUserInfo(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        response.put("isLoggedIn", session.getAttribute("user") != null);
        return response;
    }

    @PostMapping("/api/set-redirect-uri")
    public void setRedirectUri(@RequestBody RedirectUriRequest request, HttpSession session) {
        // 서버 측에서 redirectUri를 처리
        String redirectUri = request.getRedirectUri();
        // 받은 redirect_uri를 세션에 저장
        session.setAttribute("redirectUri", redirectUri);
        // 디버깅용 로그
        log.info("postmapping으로 전달받은 URI: " + redirectUri);
        log.info("세션에 저장된 url: " + (String) session.getAttribute("redirectUri"));
    }

}
