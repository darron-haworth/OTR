/**
 * Validation Middleware
 * Validates request bodies using Zod schemas
 */

import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiError, ErrorCodes } from '../../core/errors/ApiError';

export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const apiError = new ApiError(
          400,
          ErrorCodes.VALIDATION_ERROR,
          'Validation failed',
          error.errors
        );
        res.status(400).json(
          apiError.toResponse(process.env.NODE_ENV === 'development')
        );
      } else {
        next(error);
      }
    }
  };
}

