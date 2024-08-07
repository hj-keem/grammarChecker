async function checkSpelling() {
    const textInput = document.getElementById('textInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = '검사 중...';

    try {
        const response = await fetch('/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput }),
        });

        if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
        }

        const data = await response.json();
        resultDiv.textContent = data.result;
    } catch (error) {
        resultDiv.textContent = `오류 발생: ${error.message}`;
    }
}