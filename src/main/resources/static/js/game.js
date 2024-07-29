
document.addEventListener("DOMContentLoaded", function() {
    let candidates = [];
    let selectedCandidates = [];
    let currentIndex = 0;

    // 해당 메서드는 게임시작 혹은 게임을 재시작할 경우에 사용하며, 때문에 인덱스와 배열을 초기화한다.
    async function startGame() {
    // 후보 정보 가져오기
    // 서버에서 /candidates 엔드포인트를 호출하여 현재 라운드의 후보 정보
    const response = await fetch('/candidates');
    // candidates 배열을 서버 응답으로 채운다.
    candidates = await response.json();
    // currentIndex와 selectedCandidates를 초기화합니다.
    currentIndex = 0;
    selectedCandidates = [];
    // displayNextPair() 함수를 호출하여 첫 번째 두 후보를 화면에 표시합니다.
    displayNextPair();

    }

    function displayNextPair() {
        // currentIndex가 candidates.length보다 작으면 다음 두 후보를 가져와 표시
        if (currentIndex < candidates.length) {
            const candidate1 = candidates[currentIndex];
            const candidate2 = candidates[currentIndex + 1];
            // 화면에 후보를 표시하는 로직
            // 화면에 두 후보를 표시하는 HTML 코드를 생성하여 candidates-container 요소의 innerHTML에 설정
            // 클릭 시 selectCandidate 함수가 호출되도록 onclick 이벤트 설정
            // 첫 번째 후보자 정보 설정
            document.getElementById('candidate-img-1').src = candidate1.img;
            document.getElementById('candidate-img-1').alt = candidate1.name;
            document.getElementById('candidate-name-1').textContent = candidate1.name;

            // 두 번째 후보자 정보 설정
            document.getElementById('candidate-img-2').src = candidate2.img;
            document.getElementById('candidate-img-2').alt = candidate2.name;
            document.getElementById('candidate-name-2').textContent = candidate2.name;

            // 클릭 이벤트 핸들러 설정
            document.querySelector('.candidate:nth-child(1)').onclick = function() { selectCandidate(currentIndex); };
            document.querySelector('.candidate:nth-child(2)').onclick = function() { selectCandidate(currentIndex + 1); };
        } else {
            // 다음 라운드로 진행
            proceedToNextRound();
        }
    }


    async function selectCandidate(index) {
        // 선택된 후보를 저장
        // 사용자가 클릭한 후보의 인덱스를 받아 해당 후보를 selectedCandidates 배열에 추가
        const selectedCandidate = candidates[index];
        selectedCandidates.push(selectedCandidate);

        // 서버로 선택된 후보 보내기
        await fetch('/selectedCandidate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedCandidate),
        });

        // currentIndex를 2씩 증가시켜 다음 두 후보를 표시할 준비
        currentIndex += 2;
        // displayNextPair() 함수를 호출하여 다음 두 후보를 표시
        displayNextPair();
    }

    async function proceedToNextRound() {
        if (selectedCandidates.length > 1) {
            candidates = selectedCandidates;
            selectedCandidates = [];
            currentIndex = 0;
            displayNextPair();
        } else {
            // 우승자 컨테이너 표시
            console.log('Winner:', selectedCandidates[0]);
            document.getElementById('candidates-container').style.display = 'none'; // 후보자 영역 숨김
            document.getElementById('winner-container').style.display = 'block'; // 우승자 컨테이너를 보이게 함
            // 우승자 이름만 따로 색상을 설정
            document.getElementById('winner-name').innerHTML = `우승자는  <span class="highlight">${selectedCandidates[0].name}</span>  입니다! `;
            document.getElementById('winner-img').src = selectedCandidates[0].img;
        }
    }

    // 게임 시작정
    startGame();


    // 이 함수는 실제로 사용되지 않지만, 후보들을 한꺼번에 표시하는 데 사용.
    function displayCandidates(candidates) {
        // 후보들을 화면에 표시하는 로직
        const container = document.getElementById('candidates-container');
        container.innerHTML = '';
        candidates.forEach(candidate => {
            const candidateDiv = document.createElement('div');
            candidateDiv.textContent = candidate.name;
            container.appendChild(candidateDiv);
        });
    }
});