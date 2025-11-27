/**
 * User Entity
 * Based on specs/data-models/DATA_MODELS.md
 */

export interface User {
  guid: string; // Primary identifier (UUID v4)
  publicName: string; // User's public display name (1-30 chars)
  createdAt: Date;
  lastActiveAt: Date;
  deviceTokens?: string[]; // For push notifications (encrypted)
  backupKey?: string; // Encrypted backup encryption key
}

