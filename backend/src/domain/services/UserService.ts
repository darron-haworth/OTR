/**
 * User Service
 * Business logic for user operations
 * Based on specs/api/API_SPECIFICATIONS.md
 */

import { v4 as uuidv4 } from 'uuid';
import { IUserRepository } from '../repositories/IUserRepository';
import { JwtService } from '../../core/security/JwtService';
import { RegisterRequest, RegisterResponse } from '../../api/dto/RegisterDto';
import { ApiError, ErrorCodes } from '../../core/errors/ApiError';

export class UserService {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: JwtService
  ) {}

  /**
   * Register a new user
   * POST /api/users/register
   * 
   * Security: Rate limiting, device fingerprinting (to be implemented in middleware)
   */
  async register(request: RegisterRequest): Promise<RegisterResponse> {
    // Check if user with this device ID already exists
    const existingUser = await this.userRepository.findByDeviceId(
      request.deviceId
    );

    if (existingUser) {
      // If user exists, return existing GUID and new token
      const token = this.jwtService.generateToken(
        existingUser.guid,
        request.deviceId
      );

      // Update last active
      await this.userRepository.updateLastActive(existingUser.guid);

      return {
        success: true,
        cloudGuid: existingUser.guid,
        token,
      };
    }

    // Create new user
    const user = await this.userRepository.create({
      publicName: request.publicName,
      deviceId: request.deviceId,
    });

    // Generate JWT token
    const token = this.jwtService.generateToken(user.guid, request.deviceId);

    return {
      success: true,
      cloudGuid: user.guid,
      token,
    };
  }
}

