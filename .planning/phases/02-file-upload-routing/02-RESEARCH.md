# Phase 2: File Upload & Routing - Research

## Context Overview
The goal is to implement an endpoint for receiving images via multipart/form-data.
Decided to use `multer` with `MemoryStorage` and restrict files to JPG/PNG under 10MB.

## Technical Approach
1. **Library**: `multer` is the standard Node.js middleware for handling `multipart/form-data`.
2. **Storage**: `multer.memoryStorage()` keeps the file in memory as a `Buffer`, accessible via `req.file.buffer`.
3. **Filtering**: `multer({ fileFilter })` allows validating the MIME type before the file is even processed.
4. **Endpoint**: `POST /api/remove-bg`.
5. **Types**: Need `@types/multer` for TypeScript support.

## Validation Architecture
- **Testing**: Use `supertest`'s `.attach('image', 'path/to/test.jpg')` to simulate file uploads.
- **Test cases**:
  - Success: Valid JPG/PNG returns 200 (currently just a placeholder response).
  - Error: No file uploaded returns 400.
  - Error: Invalid file type (e.g., text file) returns 400.
