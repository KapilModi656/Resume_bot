import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = process.env.port || 3000

// Middleware
app.use(cors());
app.use(express.json());
console.log('API Key:', process.env.API_KEY);
// Define the Gemini API URL
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + process.env.API_KEY;

// POST endpoint to handle requests from the client
app.post('/api/gemini', async (req, res) => {
    const { prompt } = req.body;

    // Construct the request body according to the cURL command
    const requestBody = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    try {
        const response = await axios.post(GEMINI_API_URL, requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Log the response for debugging
        console.log('API Response:', response.data);
        
        if (response.data && response.data.candidates && response.data.candidates.length > 0) {
            const generatedContent = response.data.candidates[0].content; // Access the content
            res.json({ response: generatedContent }); 
        }
            else {
            res.status(500).json({ error: 'No valid response from Gemini API' });
        }
       }   catch (error) {
        console.error('Error calling Gemini API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to get response from Gemini API' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/api/gemini`);
});