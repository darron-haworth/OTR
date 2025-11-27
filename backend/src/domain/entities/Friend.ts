/**
 * Friend Entity
 * 
 * Auto-generated from specs/data-models/entities/friend.md
 * DO NOT EDIT MANUALLY - This file is generated from specs
 * Run 'npm run generate:types' to regenerate
 */

export interface Friend {
  // Identifiers
  localId: string;            // UUID v4, generated locally
  friendGuid?: string;        // GUID from backend
  connectionGuid?: string;    // GUID linking friends together
  
  // Personal Information (Encrypted)
  firstName: string;          // Required, 1-50 chars
  lastName: string;           // Required, 1-50 chars
  birthDate?: string;         // Optional, ISO 8601
  
  // Recovery Information
  recoveryGroups: RecoveryGroupMembership[];
  
  // Relationship Metadata
  addedDate: string;          // ISO 8601
  connectionStatus: 'local' | 'pending' | 'connected';
  isSponsee?: boolean;        // Optional relationship type
  isSponsor?: boolean;        // Optional relationship type
  
  // Sync Metadata
  lastUpdated: string;        // ISO 8601
  lastSyncedAt?: string;      // ISO 8601
}
