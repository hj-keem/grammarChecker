package com.example.hangulsarang.worldcup;

import lombok.Data;


public class CandidateDto {
    private String name;
    private String img;

    public CandidateDto(String name, String img) {
        this.name = name;
        this.img = img;
    }

    public String getName() {
        return name;
    }

    public String getImg() {
        return img;
    }
}
