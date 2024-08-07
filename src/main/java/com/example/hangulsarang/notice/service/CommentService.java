package com.example.hangulsarang.notice.service;

import com.example.hangulsarang.notice.dto.CommentDto;
import com.example.hangulsarang.notice.dto.PostDto;
import com.example.hangulsarang.notice.entity.CommentEntity;
import com.example.hangulsarang.notice.entity.PostEntity;
import com.example.hangulsarang.notice.repository.CommentRepository;
import com.example.hangulsarang.notice.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    // createComment
    public CommentDto createComment(Long postId, CommentDto dto) {
        Optional<PostEntity> optionalPost = postRepository.findById(postId);
        if(optionalPost.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        PostEntity postEntity = optionalPost.get();

        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setPost(postEntity);
        commentEntity.setComment(dto.getComment());
        commentEntity.setTime(LocalDateTime.now());

        return CommentDto.fromEntity(commentRepository.save(commentEntity));
    }

    // readComment
    public CommentDto readComment(Long postId, Long commentId){
        // 게시글이 존재하는 지 확인
        Optional<PostEntity> optionalPost = postRepository.findById(postId);
        if(optionalPost.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        // 댓글이 존재하는 지 확인
        Optional<CommentEntity> optionalComment = commentRepository.findById(commentId);
        if(optionalComment.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return CommentDto.fromEntity(optionalComment.get());
    }


    // readAllComment
    public Page<CommentDto> readAllComment(Long postId, Integer page, Integer limit) {
        // 게시글이 존재하는지 확인
        Optional<PostEntity> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다.");
        }

        // Pageable 객체 생성
        Pageable pageable = PageRequest.of(page, limit);
        // 특정 게시글의 댓글 조회
        Page<CommentEntity> commentEntityPage = commentRepository.findByPostId(postId, pageable);
        // 엔티티를 DTO로 변환
        return commentEntityPage.map(CommentDto::fromEntity);
    }


    // updateComment
    public CommentDto updateComment(Long postId,Long commentId,CommentDto dto){
        // 게시글이 존재하는 지 확인
        Optional<PostEntity> optionalPost = postRepository.findById(postId);
        if(optionalPost.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        // 댓글이 존재하는 지 확인
        Optional<CommentEntity> optionalComment = commentRepository.findById(commentId);
        if(optionalComment.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        CommentEntity commentEntity = optionalComment.get();
        commentEntity.setComment(dto.getComment());
        return CommentDto.fromEntity(commentRepository.save(commentEntity));
    }

    //deleteComment
    public void deleteComment(Long postId, Long commentId){
        // 게시글이 존재하는 지 확인
        Optional<PostEntity> optionalPost = postRepository.findById(postId);
        if(optionalPost.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        // 댓글이 존재하는 지 확인
        Optional<CommentEntity> optionalComment = commentRepository.findById(commentId);
        if(optionalComment.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        commentRepository.deleteById(commentId);
    }
}
