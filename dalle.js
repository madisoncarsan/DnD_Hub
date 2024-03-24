// dalle.js
document.getElementById('dalleForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const prompt = document.getElementById('prompt').value;
    // No need to send the API key from the client

    try {
        const response = await fetch('/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) throw new Error('Network response was not ok.');

        const data = await response.json();
        document.getElementById('generatedImage').src = data.imageUrl;
        document.getElementById('generatedImage').hidden = false;
    } catch (error) {
        console.error('Error generating image:', error);
    }
});
