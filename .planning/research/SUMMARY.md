# Background Removal API Research Summary

## 1. Stack Recommendations
- **Background Removal:** Use `@imgly/background-removal-node` instead of the browser-based `@imgly/background-removal`. This specific node package wraps the ONNX neural networks and WebAssembly binaries correctly for server-side use.
- **Web Server:** `Express` or `Fastify` for handling HTTP requests.
- **File Uploads:** `multer` (for Express) or `@fastify/multipart` to handle incoming image uploads (multipart/form-data).
- **Logging:** `winston` or `pino` with a daily-rotate-file transport to handle file-based logging efficiently.

## 2. Expected Features
- **Table Stakes:**
  - Receive an image via API (e.g. `POST /api/remove-bg`).
  - Extract person from the background.
  - Return the resulting image as a PNG blob/buffer.
- **Differentiators:**
  - Robust file-based logging recording usage per domain/IP, processing time, and success rate.
- **Anti-Features:**
  - Built-in UI/Frontend (API only).
  - API Key Management system (kept public for now).

## 3. Architecture Overview
- **Routing Layer:** Accepts multipart form data, validates image size and type.
- **Processing Layer:** Passes the image buffer or temp file path to `removeBackground()` from `@imgly/background-removal-node`.
- **Response Layer:** Converts the returned Blob to a Node.js Buffer and sends it back with `Content-Type: image/png`.
- **Logging Middleware:** Wraps the entire request to log domain, size, and timing.

## 4. Critical Pitfalls & Prevention
- **Pitfall 1: Browser-only Package usage.** Using `@imgly/background-removal` will fail on the server due to missing Canvas/Browser APIs.
  - *Prevention:* Explicitly install and use `@imgly/background-removal-node`.
- **Pitfall 2: Memory/CPU Exhaustion.** Node.js is single-threaded; processing many concurrent images could block the event loop or consume too much memory.
  - *Prevention:* Although we chose basic async for now, we must ensure proper garbage collection of large Blobs and Buffers. Rate limiting (even basic) might be necessary if we experience issues.
- **Pitfall 3: WASM/Model Loading Delays.** The package loads ONNX models. Loading it for every request is slow.
  - *Prevention:* Initialize or pre-load the model at server startup, or reuse the loaded instance across requests.
