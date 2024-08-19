document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const loginButton = document.getElementById('loginButton');

    // URL 쿼리 파라미터에서 userId 가져오기
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get('id');
    console.log(userId);  // userId 확인

    if (!userId) {
        console.error('userId is null');
        return;
    }

    // saveButton 클릭 시 변경사항 저장
    saveButton.addEventListener('click', async () => {
        // FormData 객체 생성
        const formData = new FormData();

        // JSON 데이터를 FormData에 추가
        const postData = {
            nickname: document.getElementById('nickname').value
        };

        // JSON 문자열을 'dto' 키로 FormData에 추가
        formData.append('dto', new Blob([JSON.stringify(postData)], { type: "application/json" }));

        // 이미지 파일이 있는지 확인
        const imageFile = document.getElementById('profileImgUpload').files[0];
        if (imageFile) {
            formData.append('profile', imageFile);
        }

        try {
            const response = await fetch(`/profile/${userId}`, {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const result = await response.json();
            console.log(result);

            // 프로필이 성공적으로 수정되었음을 알림
            alert('프로필이 수정되었습니다.');

            // localStorage와 UI 업데이트
            localStorage.setItem('userNickname', result.nickname);
            console.log('Nickname saved to localStorage:', nickname);

            // 수정 후 마이페이지로 리다이렉션
            window.location.href = `/mypage?id=${userId}`;

        } catch (error) {
            console.error('Error:', error);
            alert('프로필 수정에 실패했습니다.');
        }
    });

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

});
