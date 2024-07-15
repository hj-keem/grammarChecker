package com.example.hangulsarang.worldcup;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class WorldCupService {
    // 후보 준비
    public List<CandidateDto> candidates = new ArrayList<>(Arrays.asList(
            new CandidateDto("후보1", "image1.jpg"),
            new CandidateDto("후보2", "image2.jpg"),
            new CandidateDto("후보3", "image3.jpg"),
            new CandidateDto("후보4", "image4.jpg"),
            new CandidateDto("후보5", "image5.jpg"),
            new CandidateDto("후보6", "image6.jpg"),
            new CandidateDto("후보7", "image7.jpg"),
            new CandidateDto("후보8", "image8.jpg")
    ));

    public void worldCupLogic(CandidateDto candidateName) {
        while (candidates.size() > 1) {
            List<CandidateDto> nextRoundCandidates = new ArrayList<>();

            // i와 i+1을 비교해야하기 때문에 i+=2 씩 증가
            for (int i = 0; i < candidates.size(); i += 2) {
                CandidateDto candidate1 = candidates.get(i);
                CandidateDto candidate2 = candidates.get(i+1);

                // 후보 정보를 클라이언트에 전송 (이름과 이미지 경로)
                sendCandidatesToClient(candidate1, candidate2);

                // 선택된 후보를 다음 라운드 후보 배열에 추가
                nextRoundCandidates.add(getUserSelectedCandidate(candidateName));

                // 선택된 후보들로 후보리스트 업
                candidates = nextRoundCandidates;
            }
        }
    }

    // 클라이언트에서 선택된 후보 정보를 받아오는 메서드
    public CandidateDto getUserSelectedCandidate(CandidateDto candidateInfo) {
        System.out.println("사용자가 선택한 후보: " + candidateInfo);
        return candidateInfo;
    }


    // 클라이언트로 후보 정보를 전송하는 로직 구현
    public Map<String, String> sendCandidatesToClient(CandidateDto candidate1, CandidateDto candidate2) {
        // 예를 들어, 클라이언트에 JSON 형식으로 데이터를 전송하는 방법 등을 사용할 수 있음 (name , img)
        HashMap<String, String> candidateList = new HashMap<>();
        candidateList.put(candidate1.getName(), candidate1.getImg());
        candidateList.put(candidate2.getName(), candidate2.getImg());
        return candidateList;
    }
}
