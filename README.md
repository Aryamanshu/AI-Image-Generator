<div align="center">
  <img src="client/src/assets/logo2.svg" alt="Stability AI Gallery" width="400" />
  <h1>🎨 Stability AI Image Gallery</h1>
  <p><strong>Create, share, and explore AI-generated artwork powered by Stability AI</strong></p>
  
  <p>
    <a href="https://arya-ai-image-generator.netlify.app/">View Demo</a> •
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#api-reference">API Reference</a> •
    <a href="#license">License</a>
  </p>
  
  <img src="https://img.shields.io/badge/stability--ai-0099FF?style=for-the-badge&logo=stability-ai&logoColor=white" alt="Stability AI" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<br />

## ✨ Demo

(https://arya-ai-image-generator.netlify.app/)



<br />

## 🚀 Features

- **AI Image Generation** - Create stunning images using Stability AI's powerful models
- **Community Gallery** - Browse and get inspired by images created by other users
- **Search Functionality** - Find images by creator name or prompt description
- **Responsive Design** - Beautiful UI that works on desktop and mobile devices
- **Image Sharing** - Download and share your favorite AI-generated artwork
- **User-friendly Interface** - Modern, intuitive design with smooth animations

<br />

## 🛠️ Tech Stack

### Frontend
- **React** - UI component library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Cloudinary** - Image storage and management

### APIs
- **Stability AI API** - Text-to-image generation
- **Cloudinary API** - Image hosting and transformation

<br />

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB account
- Stability AI API key
- Cloudinary account

### Clone the repository
```bash
git clone https://github.com/yourusername/stability-ai-gallery.git
cd stability-ai-gallery
```

### Set up environment variables
Create a `.env` file in the server directory:
```
MONGODB_URL=your_mongodb_connection_string
STABILITY_API_KEY=your_stability_ai_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

<br />

## 🚀 Usage

### Development mode
```bash
# Start the server (from the server directory)
npm run dev

# Start the client (from the client directory)
npm run dev
```

### Production mode
```bash
# Build the client
cd client
npm run build

# Start the server
cd ../server
npm start
```

<br />

## 📚 API Reference

### Generate Image
```http
POST /api/v1/stability
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `prompt`  | `string` | **Required**. Text prompt for image generation |

#### Response
```json
{
  "photo": "data:image/png;base64,..."
}
```

### Get All Posts
```http
GET /api/v1/post
```

#### Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "John Doe",
      "prompt": "A beautiful sunset over mountains",
      "photo": "https://example.com/image.jpg"
    }
  ]
}
```

### Create Post
```http
POST /api/v1/post
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | **Required**. Creator name        |
| `prompt`  | `string` | **Required**. Text prompt used    |
| `photo`   | `string` | **Required**. Base64 image data   |

<br />

## 🔧 Configuration

### Client
The client configuration is located in `client/src/config.js`:
```javascript
export const config = {
  apiUrl: 'http://localhost:8080',
  // other configuration options
};
```

### Server
Server configuration is managed through environment variables. See the [Installation](#installation) section for details.

<br />

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<br />

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<br />

## 🙏 Acknowledgements

- [Stability AI](https://stability.ai/) for their amazing image generation technology
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) for the database
- [Cloudinary](https://cloudinary.com/) for image hosting
- [React](https://reactjs.org/) for the UI library

<br />

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Aryamanshu">Aryamanshu</a></p>
  <p>© 2024 Stability AI Gallery. All rights reserved.</p>
</div>
