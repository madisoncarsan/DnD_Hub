document.getElementById('imageForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const apiKey = document.getElementById('apiKey').value;
    const prompt = document.getElementById('prompt').value;

    const response = await fetch('/create-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey, prompt }),
    });

    if (response.ok) {
        const imageUrl = await response.text();
        window.location.href = imageUrl; // Or handle the downloaded image differently
    } else {
        alert('Failed to generate image.');
    }
});
