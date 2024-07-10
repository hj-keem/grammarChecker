package com.example.hangulsarang.notice.repository;

import com.example.hangulsarang.notice.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
}
