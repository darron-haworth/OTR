/**
 * Connection Entity
 * 
 * Auto-generated from specs/data-models/entities/connection.md
 * DO NOT EDIT MANUALLY - This file is generated from specs
 * Run 'npm run generate:types' to regenerate
 */

export interface Connection {
  connectionGuid: string;
  user1Guid: string;          // First user's GUID
  user2Guid: string;          // Second user's GUID
  status: 'pending' | 'accepted' | 'blocked';
  initiatorGuid: string;
  createdAt: Timestamp;
  acceptedAt?: Timestamp;
  
  // Encrypted shared data (optional)
  sharedData?: {
    user1Encrypted?: string;  // Data encrypted with user1's key
    user2Encrypted?: string;  // Data encrypted with user2's key
  };
}
