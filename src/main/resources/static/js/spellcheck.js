document.addEventListener('DOMContentLoaded', function() {
    // 로그인 버튼 처리
    const loginButton = document.getElementById('loginButton');

    // 현재 페이지 URL 저장
    const currentUrl = window.location.href;
    loginButton.setAttribute('data-redirect', currentUrl);
    console.log('Current URL saved for redirect:', currentUrl); // URL 확인용 로그

    // 서버로부터 로그인 상태를 확인
    fetch('/api/user')
        .then(response => response.json())
        .then(data => {
            if (data.isLoggedIn) {
                // 로그인된 상태일 때
                loginButton.textContent = '마이페이지';
                loginButton.addEventListener('click', function() {
                    window.location.href = '/mypage'; // 마이페이지로 이동
                });
            } else {
                // 로그인되지 않은 상태일 때
                loginButton.textContent = '로그인';
                loginButton.addEventListener('click', function() {
                    // 현재 페이지 URL을 redirect_uri에 추가
                    const redirectUrl = loginButton.getAttribute('data-redirect');
                    console.log('Redirect URL:', redirectUrl); // URL 확인용 로그

                    // 서버에 redirect_uri를 전송
                    fetch('/api/set-redirect-uri', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ redirectUri: redirectUrl }),
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('네트워크 응답에 문제가 있습니다.');
                        }
                        // 카카오 로그인 페이지로 이동
                        window.location.href = '/oauth2/authorization/kakao';
                    })
                    .catch(error => {
                        console.error('Error sending redirect URI to server:', error);
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
        });


    // 맞춤법 검사 함수
    async function checkSpelling() {
        const textInput = document.getElementById('textInput').value;
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = '검사 중...';

        try {
            const response = await fetch('/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: textInput }),
            });

            if (!response.ok) {
                throw new Error('네트워크 응답에 문제가 있습니다.');
            }

            const data = await response.json();
            resultDiv.textContent = data.result;
        } catch (error) {
            resultDiv.textContent = `오류 발생: ${error.message}`;
        }
    }
});
