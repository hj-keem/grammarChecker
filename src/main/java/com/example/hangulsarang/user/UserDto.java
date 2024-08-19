package com.example.hangulsarang.user;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String nickname;
    private String profileImg;

    public static UserDto fromEntity(UserEntity entity){
        UserDto dto = new UserDto();
        dto.setId(entity.getId());
        dto.setUsername(entity.getUsername());
        dto.setNickname(entity.getNickname());
        dto.setProfileImg(entity.getProfileImg());
        return dto;
    }
}
