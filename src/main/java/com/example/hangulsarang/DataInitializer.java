package com.example.hangulsarang;
import com.example.hangulsarang.notice.entity.PostEntity;
import com.example.hangulsarang.notice.repository.PostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner init(PostRepository postRepository) {
        return args -> {
            // 데이터베이스에 공지사항이 있는지 확인
            if (postRepository.count() == 0) {
                // 게시판에 게시글이 없는 경우에만 추가
                PostEntity noticePost = new PostEntity();
                noticePost.setTitle("공지사항 제목");
                noticePost.setContent("공지사항 내용");
                noticePost.setWriter("관리자");

                postRepository.save(noticePost);
            }
        };
    }
}

