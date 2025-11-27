/**
 * Application configuration
 * Loads and validates environment variables
 */

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Config {
  nodeEnv: string;
  port: number;
  apiBaseUrl: string;
  apiVersion: string;
  jwt: {
    secret: string;
    expiry: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    serviceAccountKeyPath?: string;
  };
  security: {
    encryptionAlgorithm: string;
    pbkdf2Iterations: number;
    sessionTimeout: number;
  };
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  logging: {
    level: string;
    format: string;
  };
  features: {
    biometricAuth: boolean;
    crashReporting: boolean;
    analytics: boolean;
  };
  dev: {
    mode: boolean;
    flipper: boolean;
  };
}

function getConfig(): Config {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    apiVersion: process.env.API_VERSION || 'v1',
    jwt: {
      secret: process.env.JWT_SECRET || 'change-me-in-production',
      expiry: process.env.JWT_EXPIRY || '7d',
    },
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY || '',
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
      projectId: process.env.FIREBASE_PROJECT_ID || '',
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
      appId: process.env.FIREBASE_APP_ID || '',
      serviceAccountKeyPath: process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH,
    },
    security: {
      encryptionAlgorithm: process.env.ENCRYPTION_ALGORITHM || 'AES-256-GCM',
      pbkdf2Iterations: parseInt(
        process.env.PBKDF2_ITERATIONS || '100000',
        10
      ),
      sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || '900000', 10),
    },
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    },
    logging: {
      level: process.env.LOG_LEVEL || 'info',
      format: process.env.LOG_FORMAT || 'json',
    },
    features: {
      biometricAuth: process.env.ENABLE_BIOMETRIC_AUTH === 'true',
      crashReporting: process.env.ENABLE_CRASH_REPORTING === 'true',
      analytics: process.env.ENABLE_ANALYTICS === 'true',
    },
    dev: {
      mode: process.env.DEV_MODE === 'true',
      flipper: process.env.ENABLE_FLIPPER === 'true',
    },
  };
}

export const config = getConfig();

// Validate critical configuration
if (config.nodeEnv === 'production' && config.jwt.secret === 'change-me-in-production') {
  throw new Error('JWT_SECRET must be set in production');
}

if (!config.firebase.apiKey || !config.firebase.projectId) {
  throw new Error('Firebase configuration is required. Please set FIREBASE_API_KEY and FIREBASE_PROJECT_ID');
}

