// DOMContentLoaded 이벤트를 사용하여 페이지가 로드될 때 실행
document.addEventListener('DOMContentLoaded', () => {
    const writerInput = document.getElementById('post-writer');

    // localStorage에서 닉네임을 가져와 작성자 필드에 설정
    const userNickname = localStorage.getItem('userNickname');
    if (userNickname) {
        writerInput.value = userNickname;
        writerInput.readOnly = true; // 수정 불가능하게 설정
    } else {
        console.error('User nickname not found in localStorage.');
    }
});


document.getElementById('post-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // FormData 객체 생성
    const formData = new FormData();

    // JSON 데이터를 FormData에 추가
    const postData = {
        title: document.getElementById('post-title').value,
        writer: document.getElementById('post-writer').value,
        content: document.getElementById('post-content').value
    };

    // JSON 문자열을 'dto' 키로 FormData에 추가
    formData.append('dto', new Blob([JSON.stringify(postData)], { type: "application/json" }));

    // 이미지 파일이 있는지 확인
    const imageFile = document.getElementById('post-image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        const response = await fetch('/post', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        const result = await response.json();
        alert('게시물이 작성되었습니다.');
        console.log(result);
        window.location.href = '/notice';

    } catch (error) {
        console.error('Error:', error);
        alert('게시물 작성에 실패했습니다.');
    }
});
