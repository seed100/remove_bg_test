# Phase 1: Project Setup & Express Foundation - Research

## Context Overview
The goal is to initialize a TypeScript-based Node.js Express server.
The user prefers `npm` and a Layer-based folder structure (`routes`, `controllers`, `services`).

## Technical Approach
1. **TypeScript Setup**: Install `typescript`, `@types/node`, `@types/express`. Configure `tsconfig.json` for ESNext or CommonJS compatibility with strict typing.
2. **Express Setup**: Install `express`, `cors`, `dotenv`.
3. **Error Handling Architecture**: Create a centralized error handling middleware that captures exceptions and formats them uniformly. Create custom error classes (e.g., `AppError`).
4. **Folder Structure**:
   - `src/app.ts` (App initialization)
   - `src/server.ts` (Server start)
   - `src/routes/` (API routes)
   - `src/controllers/` (Request/Response handling)
   - `src/services/` (Business logic)
   - `src/middlewares/` (Error handler, etc.)

## Validation Architecture
- **Testing framework**: `jest`, `supertest`, `ts-jest` for endpoint testing.
- We will set up a basic health-check route `/api/health` to verify server operation.
- We will write a test for the 404 handler and 500 error handler.
