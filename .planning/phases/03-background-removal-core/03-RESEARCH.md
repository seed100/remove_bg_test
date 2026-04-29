# Phase 3: Background Removal Core - Research

## Context Overview
The core task is integrating the AI background removal engine.
We decided to pre-warm the model and use a service layer for processing.

## Technical Approach
1. **Library**: `@imgly/background-removal-node`.
2. **Functionality**: `removeBackground(source, config?)` accepts `Buffer`, `URL`, `string`, etc.
3. **WASM/Assets**: The library uses WASM. In Node.js, it handles local asset loading usually, but may require specifying a path if deployed in certain environments.
4. **Service Layer**: `src/services/imageService.ts` will handle the call to `removeBackground`.
5. **Memory**: Large images can be memory-intensive during processing.

## Validation Architecture
- **Testing**: Integration tests using a real (but small) image to verify the result is a valid PNG buffer.
- **Mocking**: For unit tests (if any), we could mock `removeBackground`.
- **Criteria**:
  - Success: Returns a `Buffer` with `image/png` header.
  - Performance: Monitor time taken for a single processing request.
