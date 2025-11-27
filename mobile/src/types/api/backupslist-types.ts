/**
 * API Types for BackupsList
 * Auto-generated from specs/api/endpoints/backups-list.md
 */

export interface BackupListResponse {
  backups: Array<{
    backupId: string;
    createdAt: string;
    deviceId: string;
    size: number;
  }>;
}
