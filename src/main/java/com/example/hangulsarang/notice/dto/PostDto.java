package com.example.hangulsarang.notice.dto;

import com.example.hangulsarang.notice.entity.PostEntity;
import lombok.Data;

@Data
public class PostDto {
    private Long id;
    private String writer;
    private String password;
    private String title;
    private String content;
    private String imgUrl;

    public static PostDto fromEntity(PostEntity entity){
        PostDto dto = new PostDto();
        dto.setId(dto.getId());
        dto.setWriter(dto.getWriter());
        dto.setPassword(dto.getPassword());
        dto.setTitle(dto.getTitle());
        dto.setContent(dto.getContent());
        dto.setImgUrl(dto.getImgUrl());
        return dto;
    }
}
