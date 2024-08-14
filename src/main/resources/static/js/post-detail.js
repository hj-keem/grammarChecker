document.addEventListener('DOMContentLoaded', () => {
  const postDetailDiv = document.querySelector('.content-container');
  const backToListButton = document.getElementById('back-to-list');
  const commentForm = document.getElementById('comment-form');
  const commentContent = document.getElementById('comment-content');
  const commentsList = document.getElementById('comments');
  const postTitle = document.getElementById('post-title');
  const editPostButton = document.getElementById('edit-post');
  const deletePostButton = document.getElementById('delete-post');
  const commentButton = document.getElementById('comment-button'); //댓글작성버튼

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

  async function toggleCommentButton() {
    try {
      const response = await fetch('/api/user');
      const data = await response.json();

      if (data.isLoggedIn) {
        // 댓글 작성 버튼
        commentButton.disabled = false;
        commentButton.style.backgroundColor = '';
        // 수정삭제 버튼
        editPostButton.disabled = false;
        commentButton.style.backgroundColor = '';
        deletePostButton.disabled = false;
        commentButton.style.backgroundColor = '';

      } else {
        commentButton.disabled = true;
        commentButton.style.backgroundColor = 'gray';
        commentContent.placeholder = '로그인 후 댓글을 작성할 수 있습니다.';
        // 수정삭제 버튼
        editPostButton.disabled = true;
        commentButton.style.backgroundColor = 'gray';
        deletePostButton.disabled = true;
        commentButton.style.backgroundColor = 'gray';
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
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
    window.location.href = '/notice';
  });

  // 수정 버튼 클릭 이벤트
  editPostButton.addEventListener('click', () => {
    window.location.href = `/edit-post?id=${postId}`;  // 수정 페이지로 이동
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
      window.location.href = '/notice';
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  });

  // 초기 데이터 로드
  fetchPostDetail();
  fetchComments();
  toggleCommentButton();  // 댓글 작성 버튼 활성화/비활성화 토글
});

