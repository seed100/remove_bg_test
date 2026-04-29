import { Router, Request, Response, NextFunction } from 'express';
import { upload } from '../middlewares/upload';
import { ImageService } from '../services/imageService';
import { AppError } from '../middlewares/errorHandler';

const router = Router();

/**
 * @route POST /api/remove-bg
 * @desc Receive image and remove background
 */
router.post('/remove-bg', upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      const error: AppError = new Error('Please upload an image file.');
      error.statusCode = 400;
      throw error;
    }

    // Process background removal
    const processedBuffer = await ImageService.removeImageBackground(req.file.buffer);

    // Return the PNG image
    res.set('Content-Type', 'image/png');
    res.status(200).send(processedBuffer);
  } catch (error) {
    next(error);
  }
});

export default router;
