/**
 * Standard API Error Response
 * Based on specs/api/API_SPECIFICATIONS.md error handling
 */

export interface ErrorResponse {
  success: false;
  error: {
    code: string; // e.g., 'INVALID_TOKEN'
    message: string; // User-friendly message
    details?: any; // Debug info (dev environment only)
  };
  timestamp: string;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }

  toResponse(includeDetails: boolean = false): ErrorResponse {
    return {
      success: false,
      error: {
        code: this.code,
        message: this.message,
        ...(includeDetails && this.details ? { details: this.details } : {}),
      },
      timestamp: new Date().toISOString(),
    };
  }
}

// Common error codes
export const ErrorCodes = {
  INVALID_TOKEN: 'INVALID_TOKEN',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NOT_FOUND: 'NOT_FOUND',
} as const;

