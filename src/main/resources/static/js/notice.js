document.addEventListener('DOMContentLoaded', () => {
    const writePostButton = document.getElementById('write-post-button');
    const postTableBody = document.querySelector('#post-table tbody');
    const noPostsMessage = document.getElementById('no-posts-message');

    if (!writePostButton || !postTableBody || !noPostsMessage) {
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
                        <td><a href="post-detail.html?id=${post.id}">${post.title}</a></td>
                        <td>${post.writer}</td>
                    `;
                    postTableBody.appendChild(postRow);
                });
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    // 페이지 전환 함수
    function goToCreatePostPage() {
        window.location.href = 'addpost.html'; // addpost.html 페이지로 리디렉션
    }

    // 이벤트 리스너
    writePostButton.addEventListener('click', goToCreatePostPage);

    // 초기 데이터 로드
    fetchPosts();
});