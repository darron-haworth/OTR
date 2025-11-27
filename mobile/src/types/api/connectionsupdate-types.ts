/**
 * API Types for ConnectionsUpdate
 * Auto-generated from specs/api/endpoints/connections-update-status.md
 */

export interface UpdateConnectionRequest {
  userGuid: string;
  action: 'accept' | 'reject' | 'block';
}

export interface UpdateConnectionResponse {
  success: boolean;
  status: string;
  updatedAt: string;
}
