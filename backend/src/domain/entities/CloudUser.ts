/**
 * Cloud user Entity
 * 
 * Auto-generated from specs/data-models/entities/cloud-user.md
 * DO NOT EDIT MANUALLY - This file is generated from specs
 * Run 'npm run generate:types' to regenerate
 */

export interface CloudUser {
  guid: string;               // Primary identifier
  publicName: string;         // Only non-PII field
  createdAt: Timestamp;
  lastActiveAt: Timestamp;
  deviceTokens?: string[];    // For push notifications (encrypted)
  backupKey?: string;         // Encrypted backup encryption key
}
