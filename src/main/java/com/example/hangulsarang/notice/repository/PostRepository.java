package com.example.hangulsarang.notice.repository;

import com.example.hangulsarang.notice.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<PostEntity, Long> {

}
