package com.example.hangulsarang.notice.service;

import com.example.hangulsarang.notice.dto.PostDto;
import com.example.hangulsarang.notice.entity.PostEntity;
import com.example.hangulsarang.notice.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {
    private final PostRepository repository;

    // create
    public PostDto createPost(PostDto dto){
        PostEntity postEntity = new PostEntity();
        postEntity.setTitle(dto.getTitle());
        postEntity.setContent(dto.getContent());
        postEntity.setImgUrl(dto.getImgUrl());
        postEntity.setWriter(dto.getWriter());
        postEntity.setPassword(dto.getPassword());
        return PostDto.fromEntity(repository.save(postEntity));
    }

    // readPost (개별)
    public PostDto readPost(Long id){
        Optional<PostEntity> postEntity = repository.findById(id);
        if(postEntity.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return PostDto.fromEntity(postEntity.get());
    }

    // readPost (전체)
    public Page<PostDto> readAllPost(Integer page, Integer limit) {
        Pageable pageable = PageRequest.of(page, limit); // 동적 페이지 번호와 크기
        Page<PostEntity> postEntityPage = repository.findAll(pageable);
        // 엔티티를 DTO로 변환하여 바로 반환
        return postEntityPage.map(PostDto::fromEntity);
    }



    // update
    public PostDto updatePost(Long id, PostDto dto){
        Optional<PostEntity> optionalPost = repository.findById(id);
        if (optionalPost.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        PostEntity postEntity = optionalPost.get();
        postEntity.setTitle(dto.getTitle());
        postEntity.setContent(dto.getContent());
        return PostDto.fromEntity(repository.save(postEntity));
    }


    // 이미지 등록
    public PostDto updateImage(Long id, MultipartFile postImage){
        String profileDir = "media/images/";
        try {
            Files.createDirectories(Path.of(profileDir));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // 이미지 이름 만들기
        String originalFilename = postImage.getOriginalFilename();
        String[] fileNameSplit = originalFilename.split("\\.");
        String extension = fileNameSplit[fileNameSplit.length - 1]; // 확장자 추출
        String profileFilename = "Image."+extension;
        String profilePath = profileDir + profileFilename;

        // multipartfile 저장
        try {
            postImage.transferTo(Path.of(profilePath));
        } catch (IOException e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }

        // Entity에 저장
        Optional<PostEntity> optionalPost = repository.findById(id);
        if (optionalPost.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        PostEntity postEntity = optionalPost.get();
        postEntity.setImgUrl(String.format("/static/%d/%s", id, profileFilename)); // url 경로 생성
        return PostDto.fromEntity(repository.save(postEntity));
    }


    // deletePost
    public void deletePost(Long id) {
        Optional<PostEntity> optionalPost = repository.findById(id);
        if(optionalPost.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        repository.deleteById(id);
    }
}
