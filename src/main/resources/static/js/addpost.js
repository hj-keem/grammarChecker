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
        const response = await fetch('http://localhost:8080/post', {
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
