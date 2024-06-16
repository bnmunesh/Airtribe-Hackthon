const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const apiKey = process.env.api_key; // Replace with your actual API key

app.post('/generate-quiz', async (req, res) => {
    const { topic, difficulty } = req.body;

    if (!topic || !difficulty) {
        return res.status(400).json({ error: 'Topic and difficulty are required fields.' });
    }

    try {
        const response = await axios.post('https://api.anthropic.com/v1/messages', {
            model: 'claude-3-opus-20240229',
            max_tokens: 1000,
            temperature: 0.5,
            system: 'Generate a quiz with multiple-choice questions with difficulty level from(1-5)',
            messages: [
                { role: 'user', content: `Create a quiz about ${topic} for a particular difficulty level: ${difficulty}  with multiple choice questions.` }
            ]
        }, {
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json',
                'anthropic-version': '2023-06-01' // Replace with the correct API version
            }
        });

        console.log('Claude response:', response.data);

        const quiz = response.data;
        res.json(quiz);
    } catch (error) {
        console.error('Error generating quiz:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error generating quiz' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
