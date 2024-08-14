package com.example.hangulsarang.notice.dto;

import com.example.hangulsarang.notice.entity.CommentEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDto {
    private Long id;
    private Long postId;
    private String comment;
    private String writer;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime time;

    public static CommentDto fromEntity(CommentEntity entity){
        CommentDto dto = new CommentDto();
        dto.setId(entity.getId());
        dto.setPostId(entity.getPost().getId());
        dto.setComment(entity.getComment());
        dto.setTime(entity.getTime());
        dto.setWriter(entity.getWriter());
        return dto;
    }
}
