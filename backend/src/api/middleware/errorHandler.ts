/**
 * Global Error Handler Middleware
 */

import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../core/errors/ApiError';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(
      err.toResponse(process.env.NODE_ENV === 'development')
    );
  } else {
    const apiError = new ApiError(
      500,
      'INTERNAL_ERROR',
      'An unexpected error occurred',
      process.env.NODE_ENV === 'development' ? err.message : undefined
    );
    res.status(500).json(
      apiError.toResponse(process.env.NODE_ENV === 'development')
    );
  }
}

