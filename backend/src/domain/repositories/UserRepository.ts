/**
 * User Repository Implementation (Stub)
 * Will be implemented with actual ORM layer later
 */

import { IUserRepository } from './IUserRepository';
import { User } from '../entities/User';

export class UserRepository implements IUserRepository {
  async create(userData: {
    publicName: string;
    deviceId: string;
  }): Promise<User> {
    // TODO: Implement with actual database/ORM
    // For now, return a stub
    throw new Error('UserRepository.create() not yet implemented');
  }

  async findByGuid(guid: string): Promise<User | null> {
    // TODO: Implement with actual database/ORM
    throw new Error('UserRepository.findByGuid() not yet implemented');
  }

  async findByDeviceId(deviceId: string): Promise<User | null> {
    // TODO: Implement with actual database/ORM
    throw new Error('UserRepository.findByDeviceId() not yet implemented');
  }

  async updateLastActive(guid: string): Promise<void> {
    // TODO: Implement with actual database/ORM
    throw new Error('UserRepository.updateLastActive() not yet implemented');
  }
}

