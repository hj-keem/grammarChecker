package com.example.hangulsarang.worldcup;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class WorldCupService {
    private final ObjectMapper objectMapper = new ObjectMapper();

    // 후보 정보
    public List<CandidateDto> candidates = new ArrayList<>(Arrays.asList(
            new CandidateDto("후보1", "https://grammarchecker-0dcy.onrender.com/images/image1.png"),
            new CandidateDto("후보2", "https://grammarchecker-0dcy.onrender.com/images/image2.png"),
            new CandidateDto("후보3", "https://grammarchecker-0dcy.onrender.com/images/image3.png"),
            new CandidateDto("후보4", "https://grammarchecker-0dcy.onrender.com/images/image4.png"),
            new CandidateDto("후보5", "https://grammarchecker-0dcy.onrender.com/images/image5.png"),
            new CandidateDto("후보6", "https://grammarchecker-0dcy.onrender.com/images/image6.png"),
            new CandidateDto("후보7", "https://grammarchecker-0dcy.onrender.com/images/image7.png"),
            new CandidateDto("후보8", "https://grammarchecker-0dcy.onrender.com/images/image8.png")
    ));

    // 후보 정보를 나타내는 로직
    public String getCandidate() throws JsonProcessingException {
        List<CandidateDto>changedCandidates = new ArrayList<>();
        if (candidates.size() > 1){
            for (int i = 0; i < candidates.size(); i+=2) {
                CandidateDto candidate1 = candidates.get(i);
                CandidateDto candidate2 = candidates.get(i+1);

                // 한 라운드에서 사용될 후보 리스트
                changedCandidates.add(candidate1);
                changedCandidates.add(candidate2);
            }
            return objectMapper.writeValueAsString(changedCandidates);
        }
        return null;
    }


    // 사용자가 선택한 후보 정보를 받아와 반환하는 로직 (사용자가 선택할 때마다 해당 메서드 사용)
    List<CandidateDto> nextRoundCandidates = new ArrayList<>();
    public String getSelectedCandidate(CandidateDto selectedCandidateName) throws JsonProcessingException {
        // 사용자가 선택한 후보 정보를 받아온 것이 selectedCandidateName
        nextRoundCandidates.add(selectedCandidateName);
        return objectMapper.writeValueAsString(nextRoundCandidates);
    }


    // 다음 라운드로 넘어가는 로직
    public void proceedToNextRound() {
        // 후보 리스트 업
        candidates = new ArrayList<>(nextRoundCandidates);
        // 다음후보리스트 초기화
        nextRoundCandidates.clear();
    }


    // 후보를 json 형태로 나타내는 메서드
//    public String sendCandidatesToClient(CandidateDto candidate1, CandidateDto candidate2) throws JsonProcessingException {
//        Map<String, String> candidateMap = new HashMap<>();
//        candidateMap.put(candidate1.getName(), candidate1.getImg());
//        candidateMap.put(candidate2.getName(), candidate2.getImg());
//        return objectMapper.writeValueAsString(candidateMap);
//    }
}
