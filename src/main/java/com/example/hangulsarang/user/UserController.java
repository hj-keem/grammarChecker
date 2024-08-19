package com.example.hangulsarang.user;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    @PostMapping("/profile")
    public UserDto createUser(HttpSession session, @RequestBody UserDto dto){
        UserDto createdUser = service.createUser(dto);
        session.setAttribute("id", createdUser.getId()); // 세션에 userId 저장
        log.info("userService에서 받아온 userId값  : {}", createdUser.getId());
        log.info("현재 세션 userId값  : {}", session.getId());
        log.info("세션에 저장된 userId : {}", session.getAttribute("id")); // 세션 값 확인
        return createdUser;
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> checkUserProfile(HttpSession session){
        Map<String, Object> response = new HashMap<>();
        Long userId = (Long) session.getAttribute("id");
        log.info("checkUserProfile 메서드에서 userId : {}", userId);
        if (userId != null) {
            // 프로필이 존재한다면
            boolean profileExists = service.checkUserProfileExists(userId);
            response.put("profileExists", profileExists);
        } else {
            response.put("profileExists", false);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/mypage/{userId}")
    public UserDto getProfileInfo(@PathVariable("userId") Long userId){
        return service.getProfileInfo(userId);
    }

    @PutMapping(value = "/profile/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public UserDto updateProfile(@RequestPart UserDto dto,
                                 @PathVariable("userId") Long userId,
                                 @RequestPart(value = "profile", required = false)MultipartFile profileImage) throws IOException {
        return service.updateProfile(dto, userId, profileImage);
    }
}
