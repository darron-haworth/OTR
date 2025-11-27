/**
 * Zod validation schemas for user registration
 * Based on specs/api/API_SPECIFICATIONS.md validation rules
 */

import { z } from 'zod';

// Validation rules from API_SPECIFICATIONS.md
const VALIDATION_RULES = {
  publicName: /^[a-zA-Z0-9\s]{1,30}$/,
};

export const registerRequestSchema = z.object({
  deviceId: z
    .string()
    .min(1, 'Device ID is required')
    .max(255, 'Device ID is too long'),
  publicName: z
    .string()
    .min(1, 'Public name is required')
    .max(30, 'Public name must be 30 characters or less')
    .regex(
      VALIDATION_RULES.publicName,
      'Public name can only contain letters, numbers, and spaces'
    ),
});

export type RegisterRequestInput = z.infer<typeof registerRequestSchema>;

