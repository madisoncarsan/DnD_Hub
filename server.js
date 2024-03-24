// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

app.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;
    const apiKey = process.env.OPENAI_API_KEY; // Use your server-stored API key

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                prompt: prompt,
                n: 1,
                size: "1024x1024"
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Send the image URL or binary data back to the client
        res.json({ imageUrl: response.data.data[0].url });
    } catch (error) {
        console.error('Error calling DALL·E 3 API:', error);
        res.status(500).send('Failed to generate image');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

