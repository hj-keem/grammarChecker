package com.example.hangulsarang.worldcup;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class WorldCupController {
    private final WorldCupTestService testService;

    // 후보 정보를 나타내는 로직
    @GetMapping("/candidates")
    public String getCandidates() throws JsonProcessingException {
        return testService.getCandidate();
    }

    // 사용자가 선택한 후보를 나타내는 로직
    @PostMapping("/selectedCandidate")
    public String getSelectedCandidate(@RequestBody CandidateDto dto) throws JsonProcessingException {
        return testService.getSelectedCandidate(dto);
    }

    // 다음 라운드로 넘어가는 로직
    @PostMapping("/proceedToNextRound")
    public void proceedToNextRound() {
        testService.proceedToNextRound();
    }
}
