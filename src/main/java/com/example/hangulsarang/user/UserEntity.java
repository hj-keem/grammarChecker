package com.example.hangulsarang.user;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username; //카톡에서 받아오기
    private String nickname;
    private String profileImg;
}
