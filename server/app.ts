import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { sessionMiddleware } from './middleware/session.js';
import { errorHandler } from './middleware/errorHandler.js';

import categoriesRouter from './routes/categories.js';
import quizRouter from './routes/quiz.js';
import memoryRouter from './routes/memory.js';
import storiesRouter from './routes/stories.js';
import learnRouter from './routes/learn.js';
import playerRouter from './routes/player.js';
import feedbackRouter from './routes/feedback.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.APP_ORIGIN || true,
    credentials: true,
  })
);

// Session middleware for all requests
app.use(sessionMiddleware);

// Rate limiting for submissions
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP/session to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

// API Routes
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/quiz', submitLimiter, quizRouter);
app.use('/api/v1/memory', submitLimiter, memoryRouter);
app.use('/api/v1/stories', storiesRouter);
app.use('/api/v1/learn', learnRouter);
app.use('/api/v1/player', playerRouter);
app.use('/api/v1/feedback', submitLimiter, feedbackRouter);

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global Error Handler
app.use(errorHandler);

export default app;
