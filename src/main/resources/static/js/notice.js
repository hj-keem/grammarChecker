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


    // 페이지 전환 함수
    function goToCreatePostPage() {
        window.location.href = '/addpost'; // addpost.html 페이지로 리디렉션
    }

    // 이벤트 리스너
    searchButton.addEventListener('click', handleSearch); // 검색 버튼 클릭 시 검색 함수 호출
    writePostButton.addEventListener('click', goToCreatePostPage); // 글쓰기 버튼 클릭 시 페이지 전환

    // 전체 게시글 로드
    fetchPosts();
});
