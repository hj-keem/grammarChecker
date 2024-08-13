document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('.scroll-to').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const loginButton = document.getElementById('loginButton');
    event.preventDefault(); // 기본 동작 방지

    // 현재 페이지 URL 저장
        const currentUrl = window.location.href;
        loginButton.setAttribute('data-redirect', currentUrl);
        console.log('Current URL saved for redirect:', currentUrl);

        // 로그인 상태 확인 함수
        function checkLoginStatus() {
            fetch('/api/user')
                .then(response => response.json())
                .then(data => {
                    loginButton.removeEventListener('click', handleLoginClick); // 중복된 이벤트 방지록 기존 리스너 제거
                    loginButton.removeEventListener('click', handleMypageClick); //
                    console.log('login status : ',data.isLoggedIn);

                    if (data.isLoggedIn) {
                        loginButton.textContent = '마이페이지';
                        loginButton.addEventListener('click', handleMypageClick);
                    } else {
                        loginButton.textContent = '로그인';
                        loginButton.addEventListener('click', handleLoginClick);
                    }
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                });
        }

        checkLoginStatus();  // DOMContentLoaded 시 로그인 상태 확인

        function handleLoginClick() {
            const redirectUrl = loginButton.getAttribute('data-redirect');
            console.log('Redirect URL:', redirectUrl);

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
                window.location.href = '/oauth2/authorization/kakao';
            })
            .catch(error => {
                console.error('Error sending redirect URI to server:', error);
            });
        }

        function handleMypageClick() {
            window.location.href = '/mypage';
        }
});
