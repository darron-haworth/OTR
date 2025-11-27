/**
 * API Types for BackupsGet
 * Auto-generated from specs/api/endpoints/backups-retrieve.md
 */

export interface BackupRetrieveResponse {
  backupId: string;
  encryptedData: string;
  checksum: string;
  createdAt: string;
}
