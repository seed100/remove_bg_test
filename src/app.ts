import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import imageRoutes from './routes/imageRoutes';
import { errorHandler, AppError } from './middlewares/errorHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', imageRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: AppError = new Error('Not Found');
  error.statusCode = 404;
  next(error);
});

// Global error handler
app.use(errorHandler);

export default app;
