package com.example.hangulsarang.grammarchecker.service;

import com.example.hangulsarang.grammarchecker.dto.SpellCheckDto;
import com.nikialeksey.hunspell.Hunspell;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SpellCheckService {


    // 사전이 있는지 확인하는 메서드로, 사전 파일을 찾을 수 없다면 예외 발생
    public String spellingCheck(SpellCheckDto dto) throws Exception {
        String dictionaryPath = "src/main/resources/ko_KR"; // 사전 파일 경로 설정
        List<String> errors = new ArrayList<>();

        try {
            // 사전 파일이 존재하는지 확인
            File dicFile = new File(dictionaryPath + ".dic");
            File affFile = new File(dictionaryPath + ".aff");
            if (!dicFile.exists() || !affFile.exists()) {
                throw new Exception("사전 파일을 찾을 수 없습니다.");
            }

            // Hunspell 객체 초기화
            Hunspell hunspell = new Hunspell(dicFile.getPath(), affFile.getPath());
            String[] words = dto.getText().split("\\s+");

            for (String word : words) {
                // Hunspell 객체를 사용하여 현재 단어가 맞춤법에 맞는지 여부를 검사
                boolean correct = hunspell.spell(word);
                // 만약 맞춤법이 틀렸다면
                if (!correct) {
                    // Hunspell 라이브러리에서 제시하는 권장 수정어리스트를 추가
                    List<String> suggestions = hunspell.suggest(word);
                    dto.setResult(suggestions.get(0));
                    System.out.println(word + ": 맞춤법 오류! 권장 수정어 : " + dto.getResult());
                }
                else {
                    dto.setResult("완벽한 문장이에요");
                }
            }
            hunspell.close();
        } catch (Exception e) {
            errors.add("사전 파일을 로드하는 중 오류가 발생했습니다: " + e.getMessage());
        }
        return dto.getResult();
    }
}