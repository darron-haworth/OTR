/**
 * Zod schema for RegisterRequest
 * Auto-generated from API endpoint spec
 * DO NOT EDIT MANUALLY
 */

import { z } from 'zod';

export const RegisterRequestSchema = z.object({
  deviceId: z.string(),
  publicName: z.string(),
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
