import { Request, Response, NextFunction } from 'express';
import { withTransaction } from '../db/index.js';

export async function rlsTransactionMiddleware(req: Request, res: Response, next: NextFunction) {
  // Store playerSessionId for explicit queries or wrapper use
  next();
}
