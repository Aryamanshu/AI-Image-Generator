import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongoDbMode/connect.js';
import postRoutes from './routes/postRoutes.js';
import stabilityRoutes from './routes/stabilityRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/stability', stabilityRoutes);

app.get('/', async (_, res) => {
  res.status(200).json({
    message: 'Hello from Stability AI Image Generator!',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();