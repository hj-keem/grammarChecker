document.addEventListener('DOMContentLoaded', () => {
  const postTitleInput = document.getElementById('post-title');
  const postContentTextarea = document.getElementById('post-content');
  const postWriterInput = document.getElementById('post-writer');
  const saveButton = document.getElementById('save-post');
  const backToListButton = document.getElementById('back-to-list');

  // URL 쿼리 파라미터에서 게시글 ID 가져오기
  const queryParams = new URLSearchParams(window.location.search);
  const postId = queryParams.get('id');

  if (!postId) {
    console.error('postId is null');
    return;
  }

  // 게시글 수정 저장
  async function savePost() {
    const title = postTitleInput.value;
    const content = postContentTextarea.value;
    const writer = postWriterInput.value;

    const data = {
      title: title,
      content: content,
      writer: writer
    };

    try {
      const response = await fetch(`/post/${postId}`, {
        method: 'PUT', // 수정 요청을 위한 메서드
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to save post');
      }

      // 게시글 수정 후 목록으로 이동
      window.location.href = '/notice';
    } catch (error) {
      console.error('Error saving post:', error);
      alert('게시글을 저장하는 데 실패했습니다.');
    }
  }

  // 뒤로 가기 버튼 클릭 이벤트
  backToListButton.addEventListener('click', () => {
    window.location.href = '/notice';
  });

  // 저장 버튼 클릭 이벤트
  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    savePost();
  });

  // 초기 데이터 로드
  fetchPostDetail();
});
