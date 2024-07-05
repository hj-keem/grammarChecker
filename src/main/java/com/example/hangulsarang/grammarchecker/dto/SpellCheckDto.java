package com.example.hangulsarang.grammarchecker.dto;

public class SpellCheckDto {
    private String text;
    private String result;

    // 생성자, getter, setter 생략

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}