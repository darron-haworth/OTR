/**
 * User Controller
 * Handles HTTP requests for user operations
 * Based on specs/api/API_SPECIFICATIONS.md
 */

import { Request, Response } from 'express';
import { UserService } from '../../domain/services/UserService';
import { RegisterRequest, RegisterResponse } from '../dto/RegisterDto';
import { ApiError, ErrorCodes } from '../../core/errors/ApiError';

export class UserController {
  constructor(private userService: UserService) {}

  /**
   * POST /api/users/register
   * Generate User GUID
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const request: RegisterRequest = req.body;

      const response: RegisterResponse = await this.userService.register(
        request
      );

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json(
          error.toResponse(process.env.NODE_ENV === 'development')
        );
      } else {
        const apiError = new ApiError(
          500,
          ErrorCodes.INTERNAL_ERROR,
          'An unexpected error occurred',
          error instanceof Error ? error.message : undefined
        );
        res.status(500).json(
          apiError.toResponse(process.env.NODE_ENV === 'development')
        );
      }
    }
  }
}

