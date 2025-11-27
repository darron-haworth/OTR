/**
 * Zod schema for BackupUploadRequest
 * Auto-generated from API endpoint spec
 * DO NOT EDIT MANUALLY
 */

import { z } from 'zod';

export const BackupUploadRequestSchema = z.object({
  cloudGuid: z.string(),
  encryptedData: z.string(),
  checksum: z.string(),
  deviceId: z.string(),
});

export type BackupUploadRequest = z.infer<typeof BackupUploadRequestSchema>;
