/**
 * Local Storage Service
 * 
 * Handles local storage of data using AsyncStorage
 * Data is stored in app sandbox (already protected)
 * Encryption will be added later for cloud backups only
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '../../src/types/entities/UserProfile';
import { Friend } from '../../src/types/entities/Friend';

const STORAGE_KEYS = {
  USER_PROFILE: '@otr:user:profile',
  FRIENDS_LIST: '@otr:friends:list',
  CLOUD_GUID: '@otr:cloud:guid',
  DEVICE_ID: '@otr:device:id',
  LAST_BACKUP_TIME: '@otr:backup:last_time',
  BACKUP_INTERVAL: '@otr:backup:interval', // in milliseconds
} as const;

export class LocalStorageService {
  /**
   * Store user profile
   */
  async saveUserProfile(profile: UserProfile): Promise<void> {
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile)],
      [STORAGE_KEYS.CLOUD_GUID, profile.cloudGuid || ''],
    ]);
  }

  /**
   * Retrieve user profile
   */
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const [profileJson, cloudGuid] = await AsyncStorage.multiGet([
        STORAGE_KEYS.USER_PROFILE,
        STORAGE_KEYS.CLOUD_GUID,
      ]);

      if (!profileJson[1]) {
        return null;
      }

      const profile = JSON.parse(profileJson[1]) as UserProfile;
      if (cloudGuid[1] && !profile.cloudGuid) {
        profile.cloudGuid = cloudGuid[1];
      }

      return profile;
    } catch (error) {
      console.error('Error retrieving user profile:', error);
      return null;
    }
  }

  /**
   * Store friends list
   */
  async saveFriends(friends: Friend[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.FRIENDS_LIST, JSON.stringify(friends));
  }

  /**
   * Retrieve friends list
   */
  async getFriends(): Promise<Friend[]> {
    try {
      const friendsJson = await AsyncStorage.getItem(STORAGE_KEYS.FRIENDS_LIST);
      if (!friendsJson) {
        return [];
      }
      return JSON.parse(friendsJson) as Friend[];
    } catch (error) {
      console.error('Error retrieving friends:', error);
      return [];
    }
  }

  /**
   * Get or generate device ID
   */
  async getDeviceId(): Promise<string> {
    let deviceId = await AsyncStorage.getItem(STORAGE_KEYS.DEVICE_ID);
    if (!deviceId) {
      // Generate a simple device ID
      deviceId = `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await AsyncStorage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId);
    }
    return deviceId;
  }

  /**
   * Get cloud GUID
   */
  async getCloudGuid(): Promise<string | null> {
    const guid = await AsyncStorage.getItem(STORAGE_KEYS.CLOUD_GUID);
    return guid || null;
  }

  /**
   * Set cloud GUID
   */
  async setCloudGuid(guid: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.CLOUD_GUID, guid);
  }

  /**
   * Get last backup time
   */
  async getLastBackupTime(): Promise<number | null> {
    const time = await AsyncStorage.getItem(STORAGE_KEYS.LAST_BACKUP_TIME);
    return time ? parseInt(time, 10) : null;
  }

  /**
   * Set last backup time
   */
  async setLastBackupTime(timestamp: number): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_BACKUP_TIME, timestamp.toString());
  }

  /**
   * Get backup interval
   */
  async getBackupInterval(): Promise<number> {
    const interval = await AsyncStorage.getItem(STORAGE_KEYS.BACKUP_INTERVAL);
    return interval ? parseInt(interval, 10) : 7 * 24 * 60 * 60 * 1000; // Default: 7 days
  }

  /**
   * Set backup interval
   */
  async setBackupInterval(intervalMs: number): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.BACKUP_INTERVAL, intervalMs.toString());
  }

  /**
   * Clear all data (for testing/logout)
   */
  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER_PROFILE,
      STORAGE_KEYS.FRIENDS_LIST,
      STORAGE_KEYS.CLOUD_GUID,
      STORAGE_KEYS.LAST_BACKUP_TIME,
      STORAGE_KEYS.BACKUP_INTERVAL,
    ]);
  }
}
