/**
 * Encrypted backup Entity
 * 
 * Auto-generated from specs/data-models/entities/encrypted-backup.md
 * DO NOT EDIT MANUALLY - This file is generated from specs
 * Run 'npm run generate:types' to regenerate
 */

export interface EncryptedBackup {
  backupId: string;
  cloudGuid: string;
  encryptedData: string;      // AES-256 encrypted JSON
  checksum: string;           // SHA-256 hash for integrity
  createdAt: Timestamp;
  deviceId: string;           // To prevent conflicts
  version: number;            // Schema version
}
