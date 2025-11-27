/**
 * API Types for UsersCreate
 * Auto-generated from specs/api/endpoints/users-register.md
 */

export interface RegisterRequest {
  deviceId: string;           // Unique device identifier
  publicName: string;         // User's public display name
}

export interface RegisterResponse {
  success: boolean;
  cloudGuid: string;          // Unique user identifier
  token: string;              // JWT for authentication
}
