package com.example.hangulsarang;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception { //HTTP 요청에 대한 보안 설정을 적용
        http
                .csrf(AbstractHttpConfigurer::disable) // CSRF 보호 비활성화
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .anyRequest().permitAll() // 모든 요청을 허용
                )
                // OAuth 2.0을 사용하여 로그인을 처리하는 설정
                .oauth2Login(oauth2Login ->
                        oauth2Login
                                .defaultSuccessUrl("/handleLoginSuccess", true)
                                .failureUrl("/login?error")
                );
        return http.build();
    }
}
