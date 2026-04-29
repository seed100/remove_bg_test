import request from 'supertest';
import app from '../src/app';
import path from 'path';
import fs from 'fs';
import { ImageService } from '../src/services/imageService';

jest.mock('../src/services/imageService');

describe('Image Upload API', () => {
  const realImageBuffer = fs.readFileSync(path.join(__dirname, 'assets/test-person.jpg'));
  const validPngBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');

  it('should return 200 and image/png for valid JPG upload', async () => {
    (ImageService.removeImageBackground as jest.Mock).mockResolvedValue(Buffer.from('processed'));
    
    const res = await request(app)
      .post('/api/remove-bg')
      .attach('image', realImageBuffer, 'test.jpg');

    expect(res.status).toBe(200);
    expect(res.header['content-type']).toBe('image/png');
  });

  it('should return 200 and image/png for valid PNG upload', async () => {
    (ImageService.removeImageBackground as jest.Mock).mockResolvedValue(Buffer.from('processed'));

    const res = await request(app)
      .post('/api/remove-bg')
      .attach('image', realImageBuffer, 'test.png');

    expect(res.status).toBe(200);
    expect(res.header['content-type']).toBe('image/png');
  });

  it('should return 400 if no file is uploaded', async () => {
    const res = await request(app)
      .post('/api/remove-bg');

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({ error: 'Please upload an image file.' });
  });

  it('should return 400 for invalid file type (.txt)', async () => {
    const res = await request(app)
      .post('/api/remove-bg')
      .attach('image', validPngBuffer, 'test.txt');

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({ error: 'Invalid file type. Only JPG and PNG are allowed.' });
  });
});
