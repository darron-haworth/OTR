/**
 * API Types for FriendsCreate
 * Auto-generated from specs/api/endpoints/friends-create.md
 */

export interface CreateFriendRequest {
  userGuid: string;           // Authenticated user's GUID
}

export interface CreateFriendResponse {
  success: boolean;
  friendGuid: string;         // Unique friend identifier
}
