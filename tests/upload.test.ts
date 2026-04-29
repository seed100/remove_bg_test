import request from 'supertest';
import app from '../src/app';
import path from 'path';
import fs from 'fs';

describe('Image Upload API', () => {
  // Create a small dummy buffer for testing
  const dummyBuffer = Buffer.from('dummy image content');

  it('should return 200 and success message for valid JPG upload', async () => {
    const res = await request(app)
      .post('/api/remove-bg')
      .attach('image', dummyBuffer, 'test.jpg');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('File received successfully');
    expect(res.body.filename).toBe('test.jpg');
    expect(res.body.mimetype).toBe('image/jpeg');
  });

  it('should return 200 and success message for valid PNG upload', async () => {
    const res = await request(app)
      .post('/api/remove-bg')
      .attach('image', dummyBuffer, 'test.png');

    expect(res.status).toBe(200);
    expect(res.body.mimetype).toBe('image/png');
  });

  it('should return 400 if no file is uploaded', async () => {
    const res = await request(app)
      .post('/api/remove-bg');

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Please upload an image file.');
  });

  it('should return 400 for invalid file type (.txt)', async () => {
    const res = await request(app)
      .post('/api/remove-bg')
      .attach('image', dummyBuffer, 'test.txt');

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid file type. Only JPG and PNG are allowed.');
  });
});
