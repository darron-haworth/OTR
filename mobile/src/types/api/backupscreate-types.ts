/**
 * API Types for BackupsCreate
 * Auto-generated from specs/api/endpoints/backups-upload.md
 */

export interface BackupUploadRequest {
  cloudGuid: string;
  encryptedData: string;      // Base64 encoded
  checksum: string;           // SHA-256
  deviceId: string;
}

export interface BackupUploadResponse {
  success: boolean;
  backupId: string;
  timestamp: string;
}
