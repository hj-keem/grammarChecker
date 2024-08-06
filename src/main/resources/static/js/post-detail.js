document.addEventListener('DOMContentLoaded', () => {
  const postDetailDiv = document.querySelector('.content-container');
  const backToListButton = document.getElementById('back-to-list');
  const commentForm = document.getElementById('comment-form');
  const commentContent = document.getElementById('comment-content');
  const commentsList = document.getElementById('comments');
  const postTitle = document.getElementById('post-title');
  const editPostButton = document.getElementById('edit-post');
  const deletePostButton = document.getElementById('delete-post');

  // URL 쿼리 파라미터에서 게시글 ID 가져오기
  const queryParams = new URLSearchParams(window.location.search);
  const postId = queryParams.get('id');
  console.log(postId);  // postId 확인

  if (!postId) {
    console.error('postId is null');
    return;
  }

  // 게시글 상세 내용 가져오기
  async function fetchPostDetail() {
    try {
      const response = await fetch(`/post/${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post details');
      }
      const post = await response.json();

      // 게시글 제목 설정
      postTitle.textContent = post.title;

      // 게시글 상세 내용 및 이미지 표시
      postDetailDiv.innerHTML = `
        <p>${post.content}</p>
        ${post.imgUrl ? `<img src="${post.imgUrl}" alt="게시글 이미지">` : ''}
      `;
    } catch (error) {
      console.error('Error fetching post details:', error);
      postDetailDiv.innerHTML = '<p>게시글을 불러오는 데 실패했습니다.</p>';
    }
  }

  // 댓글 목록 가져오기
  async function fetchComments(page = 0, limit = 10) {
    try {
      const response = await fetch(`/post/${postId}/comment?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const commentsData = await response.json();
      console.log(commentsData);

      const comments = commentsData.content || [];
      commentsList.innerHTML = '';

      if (comments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments">댓글이 없습니다.</p>';
        commentsList.style.textAlign = 'center'; // 중앙 정렬
      } else {
        commentsList.style.textAlign = 'left'; // 왼쪽 정렬
        comments.forEach(comment => {
          console.log(comment);

          // 날짜 포맷팅
          let formattedDate = '날짜 오류'; // 기본값 설정
          const date = new Date(comment.time); // 'comment.time'으로 변경
          if (!isNaN(date.getTime())) {
            formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
          }

          const commentItem = document.createElement('li');
          commentItem.innerHTML = `
            <div class="comment-text">${comment.comment || 'No content'}</div>
            <div class="comment-date">${formattedDate}</div>
          `;
          commentsList.appendChild(commentItem);
        });
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      commentsList.innerHTML = '<p class="no-comments">댓글을 불러오는 데 실패했습니다.</p>';
      commentsList.style.textAlign = 'center'; // 중앙 정렬
    }
  }

  // 댓글 작성
  commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = commentContent.value;

    try {
      const response = await fetch(`/post/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: content }),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      // 댓글 작성 후 폼 초기화 및 댓글 목록 재로드
      commentContent.value = '';
      fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  });


  // 뒤로 가기 버튼 클릭 이벤트
  backToListButton.addEventListener('click', () => {
    window.location.href = 'notice.html';
  });

  // 수정 버튼 클릭 이벤트
  editPostButton.addEventListener('click', () => {
    window.location.href = `edit-post.html?id=${postId}`;  // 수정 페이지로 이동
  });

  // 삭제 버튼 클릭 이벤트
  deletePostButton.addEventListener('click', async () => {
    try {
      const response = await fetch(`/post/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // 게시글 삭제 후 목록으로 이동
      window.location.href = 'notice.html';
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  });

  // 초기 데이터 로드
  fetchPostDetail();
  fetchComments();
});
