import multer from 'multer';
import { Request } from 'express';
import { AppError } from './errorHandler';

// Use memory storage to handle files as buffers
const storage = multer.memoryStorage();

// Filter files by type
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error: AppError = new Error('Invalid file type. Only JPG and PNG are allowed.');
    error.statusCode = 400;
    cb(error as any, false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});
