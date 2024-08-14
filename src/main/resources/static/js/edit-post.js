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
    // FormData 객체 생성
    const formData = new FormData();

    // Json 데이터를 FormData에 추가
    const postData = {
      title: document.getElementById('post-title').value,
      content: document.getElementById('post-content').value
    };

    // Json 문자열을 'dto' 키로 FormData에 추가
    formData.append('dto', new Blob([JSON.stringify(postData)], { type: "application/json"}));

    // 이미지 파일이 있는지 확인
    const imageFile = document.getElementById('post-image').files[0];
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(`/post/${postId}`, {
        method: 'PUT', // 수정 요청을 위한 메서드
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to save post');
      }

      const result = await response.json();
      alert('게시물이 수정되었습니다.');
      console.log(result);

      // 게시글 수정 후 수정된 게시글로 이동
      window.location.href = `/post-detail?id=${postId}`;
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
