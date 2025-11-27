/**
 * User Routes
 * Based on specs/api/API_SPECIFICATIONS.md
 */

import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validateRequest } from '../middleware/validationMiddleware';
import { registerRequestSchema } from '../validators/registerValidator';

export function createUserRoutes(userController: UserController): Router {
  const router = Router();

  /**
   * POST /api/users/register
   * Generate User GUID
   * Security: Rate limiting, device fingerprinting
   */
  router.post(
    '/register',
    validateRequest(registerRequestSchema),
    userController.register.bind(userController)
  );

  return router;
}

