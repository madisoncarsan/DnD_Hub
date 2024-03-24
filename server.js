require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Serve your frontend files

app.post('/create-image', async (req, res) => {
    const { apiKey, prompt } = req.body;

    try {
        const response = await axios.post(
            'https://api.openai.com/v3/dall-e-3/generations',
            { prompt: prompt, n: 1 },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            }
        );

        // Assuming the API returns a URL to the image
        const imageUrl = response.data.data[0].image_url;

        // Redirect to the image URL or download it and send it as a file
        res.redirect(imageUrl);
    } catch (error) {
        console.error('Error creating image:', error);
        res.status(500).send('Error creating image');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
