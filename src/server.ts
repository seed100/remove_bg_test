import app from './app';
import { ImageService } from './services/imageService';

const PORT = process.env.PORT || 5003;

const startServer = async () => {
  // Optional: Warm up AI model
  await ImageService.warmup();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();
