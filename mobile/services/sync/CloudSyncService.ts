/**
 * Cloud Sync Service
 * 
 * Handles synchronization between local data and cloud
 * Only syncs non-PII metadata (GUIDs, connection status, etc.)
 * PII remains local-only
 */

import { LocalStorageService } from '../storage/LocalStorageService';
import { UserProfile } from '../../types/entities/UserProfile';
import { Friend } from '../../types/entities/Friend';
import { usersRegisterCreate } from '../api/client';

export class CloudSyncService {
  private storage: LocalStorageService;

  constructor(storage: LocalStorageService) {
    this.storage = storage;
  }

  /**
   * Register user and get cloud GUID
   * This is the only time we send minimal data to cloud
   */
  async registerUser(publicName: string): Promise<string> {
    const deviceId = await this.storage.getDeviceId();

    const response = await usersRegisterCreate({
      deviceId,
      publicName,
    });

    // Update local profile with cloud GUID
    const profile = await this.storage.getUserProfile();
    if (profile) {
      profile.cloudGuid = response.cloudGuid;
      profile.lastSyncedAt = new Date().toISOString();
      await this.storage.saveUserProfile(profile);
    }

    return response.cloudGuid;
  }

  /**
   * Sync user profile metadata (non-PII only)
   * Updates lastSyncedAt timestamp
   */
  async syncUserProfile(): Promise<void> {
    const profile = await this.storage.getUserProfile();
    if (!profile) {
      throw new Error('No user profile found');
    }

    if (!profile.cloudGuid) {
      // User not registered yet
      return;
    }

    // Update sync timestamp
    profile.lastSyncedAt = new Date().toISOString();
    await this.storage.saveUserProfile(profile);

    // In the future, this could sync non-PII metadata to cloud
    // For now, we just update the timestamp
  }

  /**
   * Sync friends metadata (GUIDs, connection status)
   * PII remains local-only
   */
  async syncFriends(): Promise<void> {
    const friends = await this.storage.getFriends();
    const profile = await this.storage.getUserProfile();

    if (!profile || !profile.cloudGuid) {
      return; // Not registered yet
    }

    // Update sync timestamps for friends
    const now = new Date().toISOString();
    for (const friend of friends) {
      friend.lastSyncedAt = now;
    }

    await this.storage.saveFriends(friends);

    // In the future, this could sync connection status to cloud
    // For now, we just update timestamps
  }

  /**
   * Check if user is registered (has cloud GUID)
   */
  async isRegistered(): Promise<boolean> {
    const cloudGuid = await this.storage.getCloudGuid();
    return !!cloudGuid;
  }

  /**
   * Get sync status
   */
  async getSyncStatus(): Promise<{
    isRegistered: boolean;
    cloudGuid: string | null;
    lastSyncedAt: string | null;
  }> {
    const profile = await this.storage.getUserProfile();
    return {
      isRegistered: !!profile?.cloudGuid,
      cloudGuid: profile?.cloudGuid || null,
      lastSyncedAt: profile?.lastSyncedAt || null,
    };
  }
}

