/**
 * User Repository Interface
 * Based on specs/data-models/DATA_MODELS.md CloudUser model
 */

import { User } from '../entities/User';

export interface IUserRepository {
  /**
   * Create a new user with a generated GUID
   */
  create(userData: {
    publicName: string;
    deviceId: string;
  }): Promise<User>;

  /**
   * Find user by GUID
   */
  findByGuid(guid: string): Promise<User | null>;

  /**
   * Find user by device ID
   */
  findByDeviceId(deviceId: string): Promise<User | null>;

  /**
   * Update user's last active timestamp
   */
  updateLastActive(guid: string): Promise<void>;
}

