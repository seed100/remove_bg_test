import { removeBackground, Config } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

/**
 * Service to handle image processing tasks
 */
export class ImageService {
  private static config: Config = {
    output: {
      format: 'image/png',
      quality: 1,
    },
  };

  /**
   * Removes background from an image buffer
   * @param imageBuffer Input image as Buffer
   * @returns Processed image as Buffer
   */
  public static async removeImageBackground(imageBuffer: Buffer): Promise<Buffer> {
    const tempFilePath = path.join(process.cwd(), `temp_${Date.now()}.jpg`);
    try {
      // Write buffer to temp file to ensure the engine can read it from a path
      // This is a workaround for buffer/blob decoding issues in some Node environments
      fs.writeFileSync(tempFilePath, imageBuffer);

      const fileUrl = pathToFileURL(tempFilePath).href;
      const blob = await removeBackground(fileUrl, {
        ...this.config,
        model: 'medium',
      });
      const arrayBuffer = await blob.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error) {
      console.error('Error removing background:', error);
      throw error;
    } finally {
      // Clean up temp file
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }
  }

  /**
   * Warm up the model by running a dummy processing
   */
  public static async warmup(): Promise<void> {
    console.log('⏳ Warming up background removal model...');
    try {
      const url = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=688&q=80';
      await removeBackground(url, {
        ...this.config,
        model: 'medium',
      });
      console.log('✅ Model warmed up and ready.');
    } catch (error) {
      console.warn('⚠️ Model warmup failed:', error);
    }
  }
}
