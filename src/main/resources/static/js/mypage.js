document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const nicknameInput = document.getElementById('nickname');
    const profileImage = document.getElementById('profileImage');
    const editButton = document.getElementById('editButton');
    const loginButton = document.getElementById('loginButton');

    // URL 쿼리 파라미터에서 게시글 ID 가져오기
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get('id');
    console.log(userId);  // postId 확인

    if (!userId) {
        console.error('userId is null');
        return;
    }

    loadUserProfile();

    // 로그인 상태 확인 함수
    function checkLoginStatus() {
        fetch('/api/user')
            .then(response => response.json())
            .then(data => {
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
        window.location.href = `/mypage?id=${userId}`;
        console.log('handleMypageClick에서 userId : ', userId);
    }

    // 사용자 프로필을 로드하는 함수
    async function loadUserProfile() {
        try {
            const response = await fetch(`/mypage/${userId}`);
            if (response.ok) {
                const user = await response.json();
                usernameInput.value = user.username;
                nicknameInput.value = user.nickname;
                if (user.profileImg) {
                    profileImage.src = user.profileImg;
                    profileImage.style.display = 'block';
                }
            } else {
                console.error('Failed to fetch user profile');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }

    // 편집 버튼 클릭 시 (이후 편집 기능 추가 시 사용)
    editButton.addEventListener('click', () => {
        window.location.href = `/edit-profile?id=${userId}`;
    });
});
