/**
 * API Types for ConnectionsCreate
 * Auto-generated from specs/api/endpoints/connections-request.md
 */

export interface ConnectionRequest {
  initiatorGuid: string;      // Requesting user
  targetGuid: string;         // Target user
  encryptedMessage?: string;  // Optional intro message
}

export interface ConnectionResponse {
  success: boolean;
  connectionGuid: string;
  status: 'pending' | 'existing';
}
