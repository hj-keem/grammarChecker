package com.example.hangulsarang.notice.dto;

import com.example.hangulsarang.notice.entity.PostEntity;
import lombok.Data;

@Data
public class PostDto {
    private Long id;
    private String writer;
//    private String password;
    private String title;
    private String content;
    private String imgUrl;

    public static PostDto fromEntity(PostEntity entity){
        PostDto dto = new PostDto();
        dto.setId(entity.getId());
        dto.setWriter(entity.getWriter());
//        dto.setPassword(entity.getPassword());
        dto.setTitle(entity.getTitle());
        dto.setContent(entity.getContent());
        dto.setImgUrl(entity.getImgUrl());
        return dto;
    }
}
