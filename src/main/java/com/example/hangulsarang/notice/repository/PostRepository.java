package com.example.hangulsarang.notice.repository;

import com.example.hangulsarang.notice.entity.PostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity, Long> {
    Page<PostEntity> findByTitleContaining(String keyword, Pageable pageable);

}
