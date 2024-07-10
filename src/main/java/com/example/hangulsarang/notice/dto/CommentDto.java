package com.example.hangulsarang.notice.dto;

import com.example.hangulsarang.notice.entity.CommentEntity;
import lombok.Data;

@Data
public class CommentDto {
    private Long id;
    private Long postId;
    private String comment;

    public static CommentDto fromEntity(CommentEntity entity){
        CommentDto dto = new CommentDto();
        dto.setId(entity.getId());
        dto.setPostId(entity.getPostId());
        dto.setComment(entity.getComment());
        return dto;
    }
}
