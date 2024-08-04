document.addEventListener('DOMContentLoaded', () => {
  const backButton = document.getElementById('back-to-list');
  const postForm = document.getElementById('post-form');

  // 뒤로가기 버튼 클릭 시 게시물 목록 페이지로 이동
    backButton.addEventListener('click', () => {
      window.location.href = 'notice.html'; // 게시물 목록 페이지 URL로 변경
    });

  // 폼 제출 처리
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('post-title').value;
    const writer = document.getElementById('post-writer').value;
    const content = document.getElementById('post-content').value;

    try {
      const response = await fetch('/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          writer,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      alert('게시물이 작성되었습니다.');
      // 작성 후 페이지를 리디렉션하거나 폼을 초기화
      window.location.href = 'notice.html'; // 페이지 리디렉션

    } catch (error) {
      console.error('Error:', error);
      alert('게시물 작성에 실패했습니다.');
    }
  });
});
