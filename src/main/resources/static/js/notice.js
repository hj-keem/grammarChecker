document.addEventListener('DOMContentLoaded', () => {
    const writePostButton = document.getElementById('write-post-button');
    const postTableBody = document.querySelector('#post-table tbody');
    const noPostsMessage = document.getElementById('no-posts-message');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    if (!writePostButton || !postTableBody || !noPostsMessage || !searchInput || !searchButton) {
            console.error('One or more required elements are missing in the HTML.');
            return; // 페이지가 제대로 로드되지 않으면 이후 코드를 실행하지 않음
        }

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


    // 게시글 목록 가져오기
    async function fetchPosts() {
        try {
            const response = await fetch('/post?page=0&limit=10');
            const data = await response.json();

            const posts = data.content || []; // Page 객체의 content 배열 가져오기

            if (posts.length === 0) {
                noPostsMessage.style.display = 'block';
            } else {
                noPostsMessage.style.display = 'none';
                posts.forEach((post, index) => {
                    const postRow = document.createElement('tr');
                    postRow.innerHTML = `
                        <td>${index + 1}</td>
                        <td><a href="/post-detail?id=${post.id}">${post.title}</a></td>
                        <td>${post.writer}</td>
                    `;
                    postTableBody.appendChild(postRow);
                });
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    // 검색어가 포함된 게시글 조회
    async function searchedPosts(searchKeyword='', page=0, limit=10){
        try {
            // 검색어를 URL에 포함
            const response = await fetch(`/post/search?keyword=${searchKeyword}&page=${page}&limit=${limit}`);
            const data = await response.json();
            const posts = data.content || []; // Page 객체의 content 배열 가져오기

            postTableBody.innerHTML = ''; // 기존 게시물 내용 초기화

            if (posts.length === 0) {
                noPostsMessage.style.display = 'block';
            } else {
                noPostsMessage.style.display = 'none';
                posts.forEach((post, index) => {
                    const postRow = document.createElement('tr');
                    postRow.innerHTML = `
                        <td>${index + 1}</td>
                        <td><a href="/post-detail?id=${post.id}">${post.title}</a></td>
                        <td>${post.writer}</td>
                    `;
                    postTableBody.appendChild(postRow);
                });
            }
        } catch (error) {
            console.error('Error fetching searched posts:', error);
        }
    }

    // 검색 버튼 클릭 시 호출되는 함수
    function handleSearch() {
        const searchKeyword = searchInput.value.trim(); // 검색어 가져오기
        searchedPosts(searchKeyword); // 검색어를 사용하여 게시글 가져오기
    }

    // 로그인 상태 확인 함수
    async function goToCreatePostPage() {
        try {
            const response = await fetch('/api/user'); // 사용자 로그인 상태를 확인하는 API 호출
            const data = await response.json();

            if (data.isLoggedIn) {
                // 로그인된 상태라면 addpost 페이지로 이동
                window.location.href = '/addpost';
            } else {
                handleLoginClick();
                }
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    }

    // 이벤트 리스너
    searchButton.addEventListener('click', handleSearch); // 검색 버튼 클릭 시 검색 함수 호출
    writePostButton.addEventListener('click', goToCreatePostPage); // 글쓰기 버튼 클릭 시 페이지 전환

    // 전체 게시글 로드
    fetchPosts();


});
