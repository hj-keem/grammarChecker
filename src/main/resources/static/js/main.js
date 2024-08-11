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

    // 로그인 버튼 처리
    const loginButton = document.getElementById('loginButton');

    // 현재 페이지 URL 저장
    loginButton.setAttribute('data-redirect', window.location.href);

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
                    window.location.href = '/oauth2/authorization/kakao?redirect_uri=' + encodeURIComponent(redirectUrl); // 카카오 로그인 페이지로 이동
                });
            }
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
        });
});
