package com.example.hangulsarang.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.AuthenticationMethod;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public UserDto createUser(UserDto dto) {
        // SecurityContextHolder를 통해 현재 인증된 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null) {
            if (authentication.getPrincipal() instanceof OAuth2User oAuth2User) {
                // 카카오에서 가져온 정보 확인 (properties.nickname)
                Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttributes().get("properties");
                String username = (String) properties.get("nickname");
//                log.info("properties에서 가져온 사용자 이름 : {}", username);

                // 이미지 URL 생성
                String basicProfile = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/element/default_profile.png") // 이미지 업로드 경로
                        .toUriString();

                // 엔티티에 추가
                UserEntity userEntity = new UserEntity();
                userEntity.setUsername(username);
                userEntity.setNickname("기본닉네임 (변경필수)");
                userEntity.setProfileImg(basicProfile);

                return UserDto.fromEntity(userRepository.save(userEntity));
            } else {
                log.error("Principal is not an instance of OAuth2User");
            }
        } else {
            log.error("Authentication object is null");
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    public UserDto getProfileInfo(Long userId) {
        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return UserDto.fromEntity(optionalUser.get());
    }

    public UserDto updateProfile(UserDto dto, Long userId, MultipartFile profileImage) throws IOException {
        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        UserEntity userEntity = optionalUser.get();
        userEntity.setNickname(dto.getNickname());

        if (profileImage == null || profileImage.isEmpty()){
            dto.setProfileImg(null);
        } else {
            String profileDir = "media/profile/";
            try {
                Files.createDirectories(Path.of(profileDir));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            // 이미지 이름 만들기
            String[] fileNameSplit = profileImage.getOriginalFilename().split("\\.");
            String extension = fileNameSplit[fileNameSplit.length - 1]; // 확장자 추출
            String fileName = System.currentTimeMillis() + "." + extension;
            profileImage.transferTo(Path.of(profileDir + fileName));

            // 이미지 URL 생성
            String crerateImageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("static/profile/") // 이미지 업로드 경로
                    .path(fileName)
                    .toUriString();

            userEntity.setProfileImg(crerateImageUrl); // url 경로 생성
        }
        return UserDto.fromEntity(userRepository.save(userEntity));
    }

    // 사용자 프로필 존재 여부 확인
    public boolean checkUserProfileExists(Long userId) {
        return userRepository.findById(userId).isPresent();
    }
}
