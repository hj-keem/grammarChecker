package com.example.hangulsarang.notice.controller;

import com.example.hangulsarang.notice.dto.PostDto;
import com.example.hangulsarang.notice.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;

@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService service;

    // createPost
    // 게시글 생성 api
    @PostMapping("/post")
    public PostDto createPost(@RequestBody PostDto dto){
        return service.createPost(dto);
    }

    // readPost (개별)
    @GetMapping("/post/{postId}")
    public PostDto readPost(@PathVariable("postId") Long id ){
        return service.readPost(id);
    }

    // readAllPost (전체)
    @GetMapping("/post")
    public Page<PostDto> readAllPost(
            @RequestParam("page") Integer page,
            @RequestParam("limit") Integer limit
    ){
        return service.readAllPost(page, limit);
    }

    // updatePost
    @PutMapping("/post/{postId}")
    public PostDto updatePost(@PathVariable("postId") Long id,
                              @RequestBody PostDto dto
    ){
        return service.updatePost(id, dto);
    }


    // updateImage
    @PutMapping(value = "/post/{postId}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PostDto updateImage(@PathVariable("postId") Long id,
                               @RequestParam("image")MultipartFile postImage
    ){
        return service.updateImage(id,postImage);
    }

    // delete
    @DeleteMapping("/post/{postId}")
    public void deletePost(@PathVariable("postId") Long id){
        service.deletePost(id);
    }
}
