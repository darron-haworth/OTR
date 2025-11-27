/**
 * Zod schema for ConnectionRequest
 * Auto-generated from API endpoint spec
 * DO NOT EDIT MANUALLY
 */

import { z } from 'zod';

export const ConnectionRequestSchema = z.object({
  initiatorGuid: z.string(),
  targetGuid: z.string(),
  encryptedMessage: z.string().optional(),
});

export type ConnectionRequest = z.infer<typeof ConnectionRequestSchema>;
