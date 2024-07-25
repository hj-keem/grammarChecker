package com.example.hangulsarang.notice.repository;

import com.example.hangulsarang.notice.entity.CommentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    Page<CommentEntity> findByPostId(Long postId, Pageable pageable);
}
