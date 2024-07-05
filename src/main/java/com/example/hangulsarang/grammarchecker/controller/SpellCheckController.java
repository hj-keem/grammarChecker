package com.example.hangulsarang.grammarchecker.controller;

import com.example.hangulsarang.grammarchecker.dto.SpellCheckDto;
import com.example.hangulsarang.grammarchecker.service.SpellCheckService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class SpellCheckController {
    private final SpellCheckService service;

    @PostMapping("/check")
    public String checkSpelling(@RequestBody SpellCheckDto dto) throws Exception {
        return service.spellingCheck(dto);
    }
}
