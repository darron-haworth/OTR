/**
 * JWT Service
 * Based on specs/api/API_SPECIFICATIONS.md JWT requirements
 */

import jwt from 'jsonwebtoken';

export interface JWTPayload {
  guid: string;
  deviceId: string;
  iat: number;
  exp: number;
}

export class JwtService {
  private readonly secret: string;
  private readonly expiresIn: string = '7d'; // Token expiry: 7 days

  constructor(secret: string) {
    this.secret = secret;
  }

  /**
   * Generate JWT token for authenticated user
   */
  generateToken(guid: string, deviceId: string): string {
    const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
      guid,
      deviceId,
    };

    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });
  }

  /**
   * Verify and decode JWT token
   */
  verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.secret) as JWTPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

