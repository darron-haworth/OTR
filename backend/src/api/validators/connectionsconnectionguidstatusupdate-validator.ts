/**
 * Zod schema for UpdateConnectionRequest
 * Auto-generated from API endpoint spec
 * DO NOT EDIT MANUALLY
 */

import { z } from 'zod';

export const UpdateConnectionRequestSchema = z.object({
  userGuid: z.string(),
  action: z.string(),
});

export type UpdateConnectionRequest = z.infer<typeof UpdateConnectionRequestSchema>;
