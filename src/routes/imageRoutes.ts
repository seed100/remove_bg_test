import { Router, Request, Response, NextFunction } from 'express';
import { upload } from '../middlewares/upload';
import { AppError } from '../middlewares/errorHandler';

const router = Router();

/**
 * @route POST /api/remove-bg
 * @desc Receive image and prepare for background removal
 */
router.post('/remove-bg', upload.single('image'), (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      const error: AppError = new Error('Please upload an image file.');
      error.statusCode = 400;
      throw error;
    }

    // Success response (placeholder for Phase 3)
    res.status(200).json({
      message: 'File received successfully',
      filename: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
