package com.example.hangulsarang;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // /media/img/ 경로로 요청을 받았을 때 실제 파일 시스템의 media/img/ 디렉토리로 리소스 처리
        registry.addResourceHandler("/static/img/**")
                .addResourceLocations("file:media/img/");
        registry.addResourceHandler("/static/profile/**")
                .addResourceLocations("file:media/profile/");
        // 정적 리소스
        registry.addResourceHandler("/js/**")
                .addResourceLocations("classpath:/static/js/")
                .setCachePeriod(3600); // 캐시 기간 설정
        registry.addResourceHandler("/css/**")
                .addResourceLocations("classpath:/static/css/")
                .setCachePeriod(3600); // 캐시 기간 설정

    }
}

