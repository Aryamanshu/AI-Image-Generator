# Stability AI Image Generator - Backend

This is the backend server for the Stability AI Image Generator application.

## Deployment on Render

### Prerequisites

1. Create a [Render](https://render.com/) account
2. Set up a MongoDB database (e.g., using MongoDB Atlas)
3. Get your Stability AI API key from [platform.stability.ai](https://platform.stability.ai/)
4. Set up Cloudinary for image storage

### Environment Variables

Make sure to set the following environment variables in your Render dashboard:

- `MONGODB_URL`: Your MongoDB connection string
- `STABILITY_API_KEY`: Your Stability AI API key
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

### Deployment Steps

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Select the repository and branch
4. Configure the service:
   - **Name**: stability-ai-backend (or your preferred name)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server` (if your server code is in a subdirectory)
5. Add the environment variables
6. Click "Create Web Service"

### Updating the Frontend

After deploying the backend, update your frontend API endpoints to point to your Render URL:

```javascript
// Example:
const response = await fetch('https://your-render-url.onrender.com/api/v1/stability', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ prompt: form.prompt }),
});
```

## Local Development

1. Clone the repository
2. Navigate to the server directory: `cd server`
3. Install dependencies: `npm install`
4. Create a `.env` file with the required environment variables
5. Start the development server: `npm run dev`

The server will be available at http://localhost:8080.
