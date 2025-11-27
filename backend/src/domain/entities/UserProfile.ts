/**
 * User profile Entity
 * 
 * Auto-generated from specs/data-models/entities/user-profile.md
 * DO NOT EDIT MANUALLY - This file is generated from specs
 * Run 'npm run generate:types' to regenerate
 */

export interface UserProfile {
  // Local identifiers
  localId: string;           // UUID v4, generated locally
  cloudGuid?: string;         // GUID from backend, optional until sync
  
  // Personal Information (Encrypted)
  firstName: string;          // Required, 1-50 chars
  lastName: string;           // Required, 1-50 chars
  publicName: string;         // Required, 1-30 chars, displayed to friends
  birthDate: string;          // ISO 8601 format, encrypted
  
  // Recovery Information
  recoveryGroups: RecoveryGroupMembership[];
  
  // Metadata
  createdAt: string;          // ISO 8601
  updatedAt: string;          // ISO 8601
  lastSyncedAt?: string;      // ISO 8601, null if never synced
  encryptionVersion: number;  // For migration purposes
}

export interface RecoveryGroupMembership {
  groupId: string;            // From RECOVERY_GROUPS enum
  recoveryDate: string;       // ISO 8601 format
  isActive: boolean;          // Currently in this program
  notes?: string;             // Optional encrypted notes
}
