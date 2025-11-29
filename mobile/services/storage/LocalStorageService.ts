/**
 * Local Storage Service
 * 
 * Handles secure local storage of PII data using AsyncStorage
 * All PII is encrypted before storage
 * Only non-PII metadata is stored in plain text
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { EncryptionService } from '../encryption/EncryptionService';
import { UserProfile } from '../../src/types/entities/UserProfile';
import { Friend } from '../../src/types/entities/Friend';

const STORAGE_KEYS = {
  USER_PROFILE: '@otr:user:profile',
  USER_PROFILE_PII: '@otr:user:profile:pii',
  FRIENDS_LIST: '@otr:friends:list',
  FRIENDS_PII: '@otr:friends:pii',
  CLOUD_GUID: '@otr:cloud:guid',
  DEVICE_ID: '@otr:device:id',
  LAST_BACKUP_TIME: '@otr:backup:last_time',
  BACKUP_INTERVAL: '@otr:backup:interval', // in milliseconds
} as const;

export class LocalStorageService {
  private encryption: EncryptionService;

  constructor(encryptionService: EncryptionService) {
    this.encryption = encryptionService;
  }

  /**
   * Store user profile with PII encrypted separately
   */
  async saveUserProfile(profile: UserProfile): Promise<void> {
    // Separate PII from non-PII
    const piiData = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      birthDate: profile.birthDate,
    };

    const nonPiiData: Omit<UserProfile, 'firstName' | 'lastName' | 'birthDate'> = {
      localId: profile.localId,
      cloudGuid: profile.cloudGuid,
      publicName: profile.publicName,
      recoveryGroups: profile.recoveryGroups,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
      lastSyncedAt: profile.lastSyncedAt,
      encryptionVersion: profile.encryptionVersion,
    };

    // Encrypt PII
    const encryptedPii = await this.encryption.encrypt(JSON.stringify(piiData));

    // Store separately
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.USER_PROFILE, JSON.stringify(nonPiiData)],
      [STORAGE_KEYS.USER_PROFILE_PII, encryptedPii],
      [STORAGE_KEYS.CLOUD_GUID, profile.cloudGuid || ''],
    ]);
  }

  /**
   * Retrieve and decrypt user profile
   */
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const [nonPiiJson, encryptedPii, cloudGuid] = await AsyncStorage.multiGet([
        STORAGE_KEYS.USER_PROFILE,
        STORAGE_KEYS.USER_PROFILE_PII,
        STORAGE_KEYS.CLOUD_GUID,
      ]);

      if (!nonPiiJson[1] || !encryptedPii[1]) {
        return null;
      }

      const nonPiiData = JSON.parse(nonPiiJson[1]);
      const decryptedPii = await this.encryption.decrypt(encryptedPii[1]);
      const piiData = JSON.parse(decryptedPii);

      return {
        ...nonPiiData,
        ...piiData,
        cloudGuid: cloudGuid[1] || nonPiiData.cloudGuid,
      } as UserProfile;
    } catch (error) {
      console.error('Error retrieving user profile:', error);
      return null;
    }
  }

  /**
   * Store friends list with PII encrypted separately
   */
  async saveFriends(friends: Friend[]): Promise<void> {
    // Separate PII from non-PII for each friend
    const friendsPii: Record<string, { firstName: string; lastName: string; birthDate?: string }> = {};
    const friendsNonPii: Omit<Friend, 'firstName' | 'lastName' | 'birthDate'>[] = [];

    for (const friend of friends) {
      const { firstName, lastName, birthDate, ...nonPii } = friend;
      friendsPii[friend.localId] = { firstName, lastName, birthDate };
      friendsNonPii.push(nonPii);
    }

    // Encrypt all PII together
    const encryptedPii = await this.encryption.encrypt(JSON.stringify(friendsPii));

    await AsyncStorage.multiSet([
      [STORAGE_KEYS.FRIENDS_LIST, JSON.stringify(friendsNonPii)],
      [STORAGE_KEYS.FRIENDS_PII, encryptedPii],
    ]);
  }

  /**
   * Retrieve and decrypt friends list
   */
  async getFriends(): Promise<Friend[]> {
    try {
      const [friendsJson, encryptedPii] = await AsyncStorage.multiGet([
        STORAGE_KEYS.FRIENDS_LIST,
        STORAGE_KEYS.FRIENDS_PII,
      ]);

      if (!friendsJson[1] || !encryptedPii[1]) {
        return [];
      }

      const friendsNonPii = JSON.parse(friendsJson[1]) as Omit<Friend, 'firstName' | 'lastName' | 'birthDate'>[];
      const decryptedPii = await this.encryption.decrypt(encryptedPii[1]);
      const friendsPii = JSON.parse(decryptedPii) as Record<string, { firstName: string; lastName: string; birthDate?: string }>;

      // Merge PII back into friends
      return friendsNonPii.map(friend => ({
        ...friend,
        ...friendsPii[friend.localId],
      })) as Friend[];
    } catch (error) {
      console.error('Error retrieving friends:', error);
      return [];
    }
  }

  /**
   * Get or create device ID
   */
  async getDeviceId(): Promise<string> {
    const [deviceId] = await AsyncStorage.multiGet([STORAGE_KEYS.DEVICE_ID]);
    
    if (deviceId[1]) {
      return deviceId[1];
    }

    // Generate new device ID (UUID v4)
    const newDeviceId = this.generateUUID();
    await AsyncStorage.setItem(STORAGE_KEYS.DEVICE_ID, newDeviceId);
    return newDeviceId;
  }

  /**
   * Get cloud GUID (if user is registered)
   */
  async getCloudGuid(): Promise<string | null> {
    const [cloudGuid] = await AsyncStorage.multiGet([STORAGE_KEYS.CLOUD_GUID]);
    return cloudGuid[1] || null;
  }

  /**
   * Save last backup timestamp
   */
  async setLastBackupTime(timestamp: number): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_BACKUP_TIME, timestamp.toString());
  }

  /**
   * Get last backup timestamp
   */
  async getLastBackupTime(): Promise<number | null> {
    const [timestamp] = await AsyncStorage.multiGet([STORAGE_KEYS.LAST_BACKUP_TIME]);
    return timestamp[1] ? parseInt(timestamp[1], 10) : null;
  }

  /**
   * Set backup interval (default: 24 hours)
   */
  async setBackupInterval(intervalMs: number): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.BACKUP_INTERVAL, intervalMs.toString());
  }

  /**
   * Get backup interval
   */
  async getBackupInterval(): Promise<number> {
    const [interval] = await AsyncStorage.multiGet([STORAGE_KEYS.BACKUP_INTERVAL]);
    return interval[1] ? parseInt(interval[1], 10) : 24 * 60 * 60 * 1000; // Default: 24 hours
  }

  /**
   * Clear all local data (for logout/reset)
   */
  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER_PROFILE,
      STORAGE_KEYS.USER_PROFILE_PII,
      STORAGE_KEYS.FRIENDS_LIST,
      STORAGE_KEYS.FRIENDS_PII,
      STORAGE_KEYS.LAST_BACKUP_TIME,
    ]);
  }

  /**
   * Generate UUID v4
   */
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

