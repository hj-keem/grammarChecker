document.addEventListener('DOMContentLoaded', function() {
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
                console.log('login status : ', data.isLoggedIn);

                if (data.isLoggedIn) {
                    loginButton.textContent = '마이페이지';
                    loginButton.addEventListener('click', handleMypageClick);

                    userId = data.userId; // 서버에서 가져온 userId 설정
                    console.log('data.userId : ', userId);
                    localStorage.setItem('userId', userId); // localStorage에 userId 저장
                    // 프로필 존재 여부 확인
                    checkUserProfile(userId);
                } else {
                    loginButton.textContent = '로그인';
                    loginButton.addEventListener('click', handleLoginClick);
                }
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });
    }

    // 사용자 프로필 존재 여부 확인 함수
    function checkUserProfile(userId) {
        fetch('/profile')
            .then(response => response.json())
            .then(data => {
                if (data.profileExists) {
                    console.log('User profile exists.');
                } else {
                    console.log('User profile does not exist. Creating profile...');
                    createUserProfile();
                }
            })
            .catch(error => {
                console.error('Error checking user profile:', error);
            });
    }

    // 사용자 프로필 생성 함수
    async function createUserProfile() {
        try {
            const response = await fetch('/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'default_username',
                    nickname: 'default_nickname', // 기본 닉네임 (필요시 수정)
                    profileImg: 'default_profile.png', // 기본 프로필 이미지 경로 (필요시 수정)
                }),
            });

            if (response.ok) {
                const user = await response.json(); // 새로 생성된 사용자 정보 가져오기
                userId = user.id; // userId 저장
                console.log("유저프로필 생성 완료! userId: ", userId);
                // 세션 스토리지에 닉네임 저장
                localStorage.setItem('userNickname', user.nickname);
                console.log("세션에 저장된 유저닉네임 : ", user.nickname);
            } else {
                console.error('Failed to create user profile');
            }
        } catch (error) {
            console.error('Error creating user profile:', error);
            alert('Error creating profile');
        }
    }

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

    // 페이지 로드 시 로그인 상태 확인
    checkLoginStatus();
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
            console.log('Response Data:', data); // 응답 데이터 확인
            resultDiv.textContent = data.result || '검사 결과가 없습니다.';
        } catch (error) {
            resultDiv.textContent = `오류 발생: ${error.message}`;
        }
    }
