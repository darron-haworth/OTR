/**
 * Main application setup and configuration
 */

import express, { Express } from 'express';
import { errorHandler } from './api/middleware/errorHandler';
import { createUserRoutes } from './api/routes/userRoutes';
import { UserController } from './api/controllers/UserController';
import { UserService } from './domain/services/UserService';
import { FirebaseUserRepository } from './domain/repositories/FirebaseUserRepository';
import { JwtService } from './core/security/JwtService';
import { initializeFirebase } from './core/config/firebase';
import { logger } from './core/logging/logger';

export function createApp(): Express {
  const app = express();

  // Initialize Firebase
  try {
    initializeFirebase();
    logger.info('Firebase initialized successfully', 'App');
  } catch (error) {
    logger.error(
      'Failed to initialize Firebase',
      'App',
      error instanceof Error ? error : undefined
    );
    throw error;
  }

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize services and repositories
  const userRepository = new FirebaseUserRepository();
  const jwtService = new JwtService(
    process.env.JWT_SECRET || 'change-me-in-production'
  );
  const userService = new UserService(userRepository, jwtService);
  const userController = new UserController(userService);

  // Routes
  app.use('/api/users', createUserRoutes(userController));

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}
