/**
 * Encryption keys Entity
 * 
 * Auto-generated from specs/data-models/entities/encryption-keys.md
 * DO NOT EDIT MANUALLY - This file is generated from specs
 * Run 'npm run generate:types' to regenerate
 */

export interface EncryptionKeys {
  masterKey: string;          // Derived from user passphrase
  dataKey: string;            // For encrypting local data
  backupKey: string;          // For encrypting cloud backups
  messagingKey: string;       // For E2E message encryption
}
