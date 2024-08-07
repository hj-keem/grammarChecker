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
    }
}

