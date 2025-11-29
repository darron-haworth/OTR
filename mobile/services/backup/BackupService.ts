/**
 * Backup Service
 * 
 * Handles periodic encrypted backups of PII data to cloud
 * Supports automatic and manual backups
 * Manages backup scheduling and restore operations
 */

import { LocalStorageService } from '../storage/LocalStorageService';
import { EncryptionService } from '../encryption/EncryptionService';
import { backupsCreate, backupsList, backupsGet } from '../api/client';
import { UserProfile } from '../../src/types/entities/UserProfile';
import { Friend } from '../../src/types/entities/Friend';

export interface BackupData {
  userProfile: UserProfile;
  friends: Friend[];
  version: number;
  timestamp: number;
}

export class BackupService {
  private storage: LocalStorageService;
  private encryption: EncryptionService;
  private backupIntervalId: NodeJS.Timeout | null = null;

  constructor(storage: LocalStorageService, encryption: EncryptionService) {
    this.storage = storage;
    this.encryption = encryption;
  }

  /**
   * Create encrypted backup of all local PII data
   */
  async createBackup(): Promise<{ backupId: string; timestamp: string }> {
    const cloudGuid = await this.storage.getCloudGuid();
    if (!cloudGuid) {
      throw new Error('User must be registered before creating backup');
    }

    // Get all local data
    const userProfile = await this.storage.getUserProfile();
    const friends = await this.storage.getFriends();

    if (!userProfile) {
      throw new Error('No user profile found to backup');
    }

    // Create backup payload
    const backupData: BackupData = {
      userProfile,
      friends,
      version: 1, // Schema version for future migrations
      timestamp: Date.now(),
    };

    // Encrypt backup data
    const plaintext = JSON.stringify(backupData);
    const encryptedData = await this.encryption.encrypt(plaintext);
    const checksum = this.encryption.generateChecksum(plaintext);

    // Get device ID
    const deviceId = await this.storage.getDeviceId();

    // Convert to base64 (React Native compatible)
    const base64Data = this.base64Encode(encryptedData);

    // Upload to cloud
    const response = await backupsCreate({
      cloudGuid,
      encryptedData: base64Data,
      checksum,
      deviceId,
    });

    // Update last backup time
    await this.storage.setLastBackupTime(Date.now());

    return {
      backupId: response.backupId,
      timestamp: response.timestamp,
    };
  }

  /**
   * Restore from latest backup
   */
  async restoreFromBackup(backupId?: string): Promise<void> {
    const cloudGuid = await this.storage.getCloudGuid();
    if (!cloudGuid) {
      throw new Error('User must be registered to restore from backup');
    }

    // Get backup ID (use latest if not specified)
    let targetBackupId = backupId;
    if (!targetBackupId) {
      const backups = await backupsList(cloudGuid);
      if (backups.backups.length === 0) {
        throw new Error('No backups found');
      }
      // Get most recent backup
      const latest = backups.backups.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];
      targetBackupId = latest.backupId;
    }

    // Retrieve backup
    const backup = await backupsGet(cloudGuid, targetBackupId);

    // Decode base64 (React Native compatible)
    const encryptedData = this.base64Decode(backup.encryptedData);

    // Decrypt backup data
    const decryptedData = await this.encryption.decrypt(encryptedData);
    const backupData: BackupData = JSON.parse(decryptedData);

    // Verify checksum
    const expectedChecksum = backup.checksum;
    const actualChecksum = this.encryption.generateChecksum(decryptedData);
    if (actualChecksum !== expectedChecksum) {
      throw new Error('Backup integrity check failed - data may be corrupted');
    }

    // Restore to local storage
    await this.storage.saveUserProfile(backupData.userProfile);
    await this.storage.saveFriends(backupData.friends);

    console.log(`Restored backup from ${new Date(backup.createdAt).toISOString()}`);
  }

  /**
   * List all available backups
   */
  async listBackups(): Promise<Array<{ backupId: string; createdAt: string; deviceId: string; size: number }>> {
    const cloudGuid = await this.storage.getCloudGuid();
    if (!cloudGuid) {
      throw new Error('User must be registered to list backups');
    }

    const response = await backupsList(cloudGuid);
    return response.backups;
  }

  /**
   * Start automatic periodic backups
   */
  async startAutomaticBackups(): Promise<void> {
    // Stop existing interval if running
    if (this.backupIntervalId) {
      clearInterval(this.backupIntervalId);
    }

    const interval = await this.storage.getBackupInterval();

    // Check if backup is needed immediately
    await this.checkAndBackupIfNeeded();

    // Set up periodic backup
    this.backupIntervalId = setInterval(() => {
      this.checkAndBackupIfNeeded().catch((error) => {
        console.error('Automatic backup failed:', error);
      });
    }, interval);
  }

  /**
   * Stop automatic backups
   */
  stopAutomaticBackups(): void {
    if (this.backupIntervalId) {
      clearInterval(this.backupIntervalId);
      this.backupIntervalId = null;
    }
  }

  /**
   * Check if backup is needed and create one if so
   */
  private async checkAndBackupIfNeeded(): Promise<void> {
    try {
      const lastBackupTime = await this.storage.getLastBackupTime();
      const interval = await this.storage.getBackupInterval();
      const now = Date.now();

      // Check if backup is needed
      if (!lastBackupTime || now - lastBackupTime >= interval) {
        console.log('Creating automatic backup...');
        await this.createBackup();
        console.log('Automatic backup completed');
      }
    } catch (error) {
      // Don't throw - we don't want to break the app if backup fails
      console.error('Backup check failed:', error);
    }
  }

  /**
   * Check if backup is needed (without creating one)
   */
  async isBackupNeeded(): Promise<boolean> {
    const lastBackupTime = await this.storage.getLastBackupTime();
    const interval = await this.storage.getBackupInterval();
    const now = Date.now();

    return !lastBackupTime || now - lastBackupTime >= interval;
  }

  /**
   * Get time until next backup
   */
  async getTimeUntilNextBackup(): Promise<number | null> {
    const lastBackupTime = await this.storage.getLastBackupTime();
    const interval = await this.storage.getBackupInterval();
    const now = Date.now();

    if (!lastBackupTime) {
      return 0; // Backup needed immediately
    }

    const timeSinceLastBackup = now - lastBackupTime;
    const timeUntilNext = interval - timeSinceLastBackup;

    return timeUntilNext > 0 ? timeUntilNext : 0;
  }

  /**
   * Base64 encode (React Native compatible)
   */
  private base64Encode(str: string): string {
    // Use TextEncoder/TextDecoder if available, otherwise fallback
    if (typeof btoa !== 'undefined') {
      return btoa(str);
    }
    // React Native compatible base64 encoding
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    for (let i = 0; i < str.length; i += 3) {
      const a = str.charCodeAt(i);
      const b = i + 1 < str.length ? str.charCodeAt(i + 1) : 0;
      const c = i + 2 < str.length ? str.charCodeAt(i + 2) : 0;
      const bitmap = (a << 16) | (b << 8) | c;
      output += chars.charAt((bitmap >> 18) & 63);
      output += chars.charAt((bitmap >> 12) & 63);
      output += i + 1 < str.length ? chars.charAt((bitmap >> 6) & 63) : '=';
      output += i + 2 < str.length ? chars.charAt(bitmap & 63) : '=';
    }
    return output;
  }

  /**
   * Base64 decode (React Native compatible)
   */
  private base64Decode(str: string): string {
    // Use TextEncoder/TextDecoder if available, otherwise fallback
    if (typeof atob !== 'undefined') {
      return atob(str);
    }
    // React Native compatible base64 decoding
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    str = str.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    for (let i = 0; i < str.length; i += 4) {
      const enc1 = chars.indexOf(str.charAt(i));
      const enc2 = chars.indexOf(str.charAt(i + 1));
      const enc3 = chars.indexOf(str.charAt(i + 2));
      const enc4 = chars.indexOf(str.charAt(i + 3));
      const bitmap = (enc1 << 18) | (enc2 << 12) | (enc3 << 6) | enc4;
      if (enc3 !== 64) output += String.fromCharCode((bitmap >> 16) & 255);
      if (enc4 !== 64) output += String.fromCharCode((bitmap >> 8) & 255);
    }
    return output;
  }
}

