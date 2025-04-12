import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

// Stability AI API configuration
const STABILITY_API_URL = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";
const STABILITY_API_KEY = process.env.STABILITY_API_KEY;

// Log API key for debugging (only showing first few characters for security)
console.log('Stability API Key loaded:', STABILITY_API_KEY ? `${STABILITY_API_KEY.substring(0, 5)}...` : 'none');

// Verify API key is loaded
if (!STABILITY_API_KEY) {
  console.error('WARNING: STABILITY_API_KEY is not defined in environment variables');
  console.error('Please sign up at https://platform.stability.ai/ to get an API key');
  console.error('Then add it to your .env file as STABILITY_API_KEY=your_api_key');
}

// GET route for testing
router.route('/').get((_, res) => {
  res.status(200).json({ message: 'Hello from Stability AI Image Generator!' });
});

// POST route for generating images
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!STABILITY_API_KEY) {
      return res.status(500).json({ 
        error: 'STABILITY_API_KEY is not configured',
        message: 'Please sign up at https://platform.stability.ai/ to get an API key'
      });
    }

    console.log('Making API request to Stability AI with prompt:', prompt);

    // Set up the request payload
    const payload = {
      text_prompts: [
        {
          text: prompt,
          weight: 1
        }
      ],
      cfg_scale: 7,
      height: 1024,
      width: 1024,
      samples: 1,
      steps: 30
    };

    // Make the request
    const response = await axios.post(STABILITY_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${STABILITY_API_KEY}`
      }
    });

    // Process the response
    const image = response.data.artifacts[0];
    const base64Image = image.base64;
    
    // Return the image data
    res.status(200).json({ 
      photo: `data:image/png;base64,${base64Image}`
    });
  } catch (error) {
    console.error('Stability AI API Error:', error);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      
      return res.status(error.response.status).json({
        error: 'Image generation failed',
        details: error.response.data,
        status: error.response.status
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      return res.status(500).json({
        error: 'No response from Stability AI API',
        details: 'The request was made but no response was received'
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
      return res.status(500).json({
        error: 'Failed to generate image',
        details: error.message
      });
    }
  }
});

export default router;
