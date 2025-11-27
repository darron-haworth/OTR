/**
 * Zod schema for CreateFriendRequest
 * Auto-generated from API endpoint spec
 * DO NOT EDIT MANUALLY
 */

import { z } from 'zod';

export const CreateFriendRequestSchema = z.object({
  userGuid: z.string(),
});

export type CreateFriendRequest = z.infer<typeof CreateFriendRequestSchema>;
