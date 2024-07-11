package com.example.hangulsarang.notice.controller;

import com.example.hangulsarang.notice.dto.CommentDto;
import com.example.hangulsarang.notice.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService service;

    // createComment
    @PostMapping("/post/{postId}/comment")
    public CommentDto createComment(
            @PathVariable("postId") Long postId,
            @RequestBody CommentDto dto){
        return service.createComment(postId, dto);
    }

    // readComment
    @GetMapping("/post/{postId}/comment/{commentId}")
    public CommentDto readComment(@PathVariable("postId") Long postId,
                                  @PathVariable("commentId") Long commentId){
        return service.readComment(postId, commentId);
    }

    // readAllComment
    @GetMapping("/post/{postId}/comment")
    public Page<CommentDto> readAllComment(
            @PathVariable("postId") Long postId,
            @RequestParam("page") Integer page,
            @RequestParam("limit") Integer limit
    ){
        return service.readAllComment(postId, page, limit);
    }

    // updateComment
    @PutMapping("/post/{postId}/comment/{commentId}")
    public CommentDto updateComment(
            @PathVariable("postId") Long postId,
            @PathVariable("commentId") Long commentId,
            @RequestBody CommentDto dto
    ){
        return service.updateComment(postId, commentId, dto);
    }


    // deleteComment
    @DeleteMapping("/post/{postId}/comment/{commentId}")
    public void deleteComment(
            @PathVariable("postId") Long postId,
            @PathVariable("commentId") Long commentId
    ){
        service.deleteComment(postId, commentId);
    }
}
