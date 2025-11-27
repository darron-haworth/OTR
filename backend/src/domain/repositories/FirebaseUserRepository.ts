/**
 * Firebase User Repository Implementation
 * Based on specs/data-models/entities/cloud-user.md
 */

import { getFirestoreInstance } from '../../core/config/firebase';
import { IUserRepository } from './IUserRepository';
import { User } from '../entities/User';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../../core/logging/logger';

export class FirebaseUserRepository implements IUserRepository {
  private readonly collectionName = 'users';

  async create(userData: {
    publicName: string;
    deviceId: string;
  }): Promise<User> {
    const db = getFirestoreInstance();
    const guid = uuidv4();
    const now = new Date();

    const user: User = {
      guid,
      publicName: userData.publicName,
      createdAt: now,
      lastActiveAt: now,
    };

    try {
      await db.collection(this.collectionName).doc(guid).set({
        guid: user.guid,
        publicName: user.publicName,
        createdAt: now,
        lastActiveAt: now,
      });

      logger.info(`User created: ${guid}`, 'FirebaseUserRepository');
      return user;
    } catch (error) {
      logger.error(
        `Failed to create user: ${guid}`,
        'FirebaseUserRepository',
        error instanceof Error ? error : undefined
      );
      throw error;
    }
  }

  async findByGuid(guid: string): Promise<User | null> {
    const db = getFirestoreInstance();

    try {
      const doc = await db.collection(this.collectionName).doc(guid).get();

      if (!doc.exists) {
        return null;
      }

      const data = doc.data();
      if (!data) {
        return null;
      }

      return {
        guid: data.guid,
        publicName: data.publicName,
        createdAt: data.createdAt?.toDate() || new Date(),
        lastActiveAt: data.lastActiveAt?.toDate() || new Date(),
        deviceTokens: data.deviceTokens,
        backupKey: data.backupKey,
      };
    } catch (error) {
      logger.error(
        `Failed to find user by GUID: ${guid}`,
        'FirebaseUserRepository',
        error instanceof Error ? error : undefined
      );
      throw error;
    }
  }

  async findByDeviceId(deviceId: string): Promise<User | null> {
    const db = getFirestoreInstance();

    try {
      // Note: This requires an index on deviceId field
      // For now, we'll need to add deviceId to the user document
      // This is a simplified implementation - you may need to adjust based on your schema
      const snapshot = await db
        .collection(this.collectionName)
        .where('deviceId', '==', deviceId)
        .limit(1)
        .get();

      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      const data = doc.data();

      return {
        guid: data.guid,
        publicName: data.publicName,
        createdAt: data.createdAt?.toDate() || new Date(),
        lastActiveAt: data.lastActiveAt?.toDate() || new Date(),
        deviceTokens: data.deviceTokens,
        backupKey: data.backupKey,
      };
    } catch (error) {
      logger.error(
        `Failed to find user by device ID: ${deviceId}`,
        'FirebaseUserRepository',
        error instanceof Error ? error : undefined
      );
      throw error;
    }
  }

  async updateLastActive(guid: string): Promise<void> {
    const db = getFirestoreInstance();

    try {
      await db.collection(this.collectionName).doc(guid).update({
        lastActiveAt: new Date(),
      });

      logger.debug(`Updated last active for user: ${guid}`, 'FirebaseUserRepository');
    } catch (error) {
      logger.error(
        `Failed to update last active for user: ${guid}`,
        'FirebaseUserRepository',
        error instanceof Error ? error : undefined
      );
      throw error;
    }
  }
}

