# 🇰🇷 한글사랑 홈페이지 🇰🇷
맞춤법을 헷갈려하는 사람들을 대상으로 한 한글 관련 서비스 홈페이지

## 📂   프로젝트 소개
개인 프로젝트로 Stringboot, JPA, ORM, restfulAPI를 이용한 웹페이지 입니다.   
맞춤법을 헷갈려하는 경우가 많아 검색하는 일이 잦았고, 이런 상황에서 영감을 얻어 시작하게 되었습니다.   
해당 웹페이지의 기능은 로그인, 맞춤법 검사, 맞춤법 월드컵 게임, 게시판, 마이페이지 기능을 구현하였습니다.   





## 🗒️  사용 방법

1. grammarChecker의 레포지토리를 Clone !

2. IntelliJ 에서 Clone 받은 hangulsarang파일 열기

3. IntelliJ 내에 기본으로 제공하는 MySql 연결

4. 실행(Run) 후 localhost:8080/hangulsarang 접속


## 📓 각 API 및 반환값
| 게시판        | EndPoint              |
|------------|-----------------------|
| 게시글 생성     | POST /post            |
| 게시글 검색     | POST /post/search     |
| 게시글 단독 조회  | GET /post/{postId}    |
| 게시글 페이지 조회 | GET /post             |
| 게시글 수정     | PUT /post/{postId}    |
| 게시글 삭제     | Delete /post/{postId} |

| 댓글        | EndPoint                                    |
|-----------|---------------------------------------------|
| 댓글 작성     | POST /post/{postId}/comment                 |
| 댓글 단독 조회  | GET /post/{postId}/comment/{commentId}      |
| 댓글 페이지 조회 | GET /post/{postId}/comment                  |
| 댓글 수정     | PUT /post/{postId}/comment/{commentId}      |
| 댓글 삭제     | Delete /post/{postId}/comment/{commentId}   |

| 유저       | EndPoint              |
|----------|-----------------------|
| 유저프로필 생성 | POST /profile         |
| 유저프로필 조회 | GET /mypage/{userId}  |
| 유저프로필 수정 | PUT /profile/{userId} |

| 맞춤법 월드컵   | EndPoint                 |
|-----------|--------------------------|
| 선택된 후보 생성 | POST /selectedCandidate  |
| 다음 단계로 이동 | POST /proceedToNextRound |
| 후보 정보 조회  | GET /candidates          |

| 맞춤법 검사기 | EndPoint    |
|---------|-------------|
| 검사 기능   | POST /check |

##  🏁 프로젝트 개발 과정


### ⏲️ 개발 기간
- 2023.07.05 ~ ing


### ⚙️  개발 환경
- Java 17
- JDK GraalVM CE 17
- Gradle


### 🔨 개발 도구

#### [BackEnd]
- Language : java
- Framework : Spring boot
- IDE : IntelliJ IDEA CE
- DataBase : MySQL
- API Platform : Postman


#### [FrontEnd]
- Language : Html, JS, CSS
- IDE : IntelliJ IDEA CE
- 서버와의 통신을 위해 **`fetch` API**를 사용


## 🎤 시스템 구현

- [ 메인페이지 ]   
  웹에서 입력 받은 값을 서버에서 저장, 로그인 시 JWT 토큰이 발급되며, 웹과 서버 간 검증을 거쳐 결과적으로 유저 정보를 웹에게 전달하도록 구현   
  <img width="1433" alt="스크린샷 2024-08-15 오후 3 35 39" src="https://github.com/user-attachments/assets/30f22626-cf2f-4647-b367-bc5746611eee">


  
- [ 맞춤법 검사기 ]   
  검사할 단어를 사이트에 입력 후 '검사하기' 버튼을 누르면 해당 단어가 올바른지, 수정이 필요한지 판단하여 수정이 필요할 시 권장 수정어 제시
  <img width="999" alt="스크린샷 2024-08-15 오후 3 36 21" src="https://github.com/user-attachments/assets/1f997fff-2570-4d19-b78a-8bd385444585">



- [ 맞춤법 월드컵 ]   
  📍 맞춤법 월드컵 게임    
  가장 헷갈리는 맞춤법 월드컵 게임    
  <img width="1039" alt="스크린샷 2024-08-15 오후 3 36 38" src="https://github.com/user-attachments/assets/c81d0c05-627c-49a7-aa67-943df7158093">

  📍 게임 결과
  <img width="999" alt="스크린샷 2024-08-15 오후 3 36 51" src="https://github.com/user-attachments/assets/66fa9f06-11e2-47be-83bc-96ddd7155609">



- [ 게시판 ]    
  📍 게시글 목록   
  게시판에 들어가면 게시글 목록을 나타내는 api를 이용하여 게시글 목록 표시. 공지사항은 언제나 고정될 수 있도록 설정   
  ![게시판](https://github.com/user-attachments/assets/d2d7d793-6205-497f-a2e9-8e1a4748d5c7)

  📍 게시글 상세보기   
  목록에서 제목을 누르면 해당 게시글의 상세 내용을 표시.     
  현재는 로그인된 상태가 아니기 때문에 댓글 작성 버튼 비활성화   
  <img width="979" alt="스크린샷 2024-08-15 오후 3 37 28" src="https://github.com/user-attachments/assets/e9e1b1a7-3d88-4c11-b2c2-ce4f3a5f1d28">

  📍 게시글 생성하기   
  게시글 생성 기능은 '로그인'이 된 상태에서 가능하며, 로그인 이후 글쓰기 버튼을 누르면 게시글 생성 페이지로 이동.     
  '마이페이지'에서 사용자가 설정한 nickname을 이용해 작성자가 자동으로 현재 사용중인 유저의 닉네임으로 표시.   
  <img width="1370" alt="스크린샷 2024-08-15 오후 3 39 47" src="https://github.com/user-attachments/assets/d078d149-88bd-48f7-af00-909de5d8bb4a">

  📍 생성된 게시글   
  <img width="1071" alt="스크린샷 2024-08-15 오후 3 43 23" src="https://github.com/user-attachments/assets/a3a802a4-c5a7-4faa-ab9e-26b961c4f0ff">

  📍 게시글 검색   
  찾고 싶은 게시글의 키워드를 입력하여 검색창에 입력된 키워드와 일치하는 제목의 게시글을 표시.   
  <img width="1028" alt="스크린샷 2024-08-15 오후 4 11 26" src="https://github.com/user-attachments/assets/4aa7e86f-678f-4341-a752-d6ed52f79042">



- [ 로그인 ]   
  📍 카카오 로그인   
  Oauth 2.0를 이용하여 로그인 기능 구현.   
  '로그인' 버튼을 누를 시 카카오 로그인 페이지로 이동하게 되며, 로그인 성공 시 이전 페이지 리다이렉트.   
  <img width="1383" alt="스크린샷 2024-08-15 오후 3 38 08" src="https://github.com/user-attachments/assets/6b6bb32b-f0e3-4f99-b98d-0190f4c261dc">
  
  📍 '로그인' 이었던 버튼 '마이페이지' 버튼으로 변경
  <img width="734" alt="스크린샷 2024-08-15 오후 4 17 34" src="https://github.com/user-attachments/assets/980e1b25-d269-426e-a326-23d619b8a392">
  
  

- [ 마이페이지 ]   
  📍 마이페이지   
  로그인 성공 시 현재 로그인된 사용자의 프로필이 존재하는지 확인 후 없다면 사용자 프로필 생성 (최초로그인 시 프로필 자동 생성)   
  카카오 로그인 시 사용자의 이름을 받아와 username에 고정값으로 지정, 이외에 nickname이나 사용자 프로필 사진은 아래 '변경하기' 버튼을 이용해 변경 가능
  <img width="1173" alt="스크린샷 2024-08-15 오후 3 43 36" src="https://github.com/user-attachments/assets/ac575815-4eb2-44fe-999f-a8dcc918676a">

  📍 마이페이지 수정
  <img width="1042" alt="스크린샷 2024-08-15 오후 3 46 32" src="https://github.com/user-attachments/assets/9aeabf15-0288-4891-b21e-dd73126871a8">
  <img width="1010" alt="스크린샷 2024-08-15 오후 3 47 54" src="https://github.com/user-attachments/assets/f3e605a2-45de-4580-9f62-9df86e4f662a">

