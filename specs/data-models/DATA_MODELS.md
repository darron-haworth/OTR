# Data Models Specification

## Local Storage Models

### User Profile Model
```typescript
interface UserProfile {
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

interface RecoveryGroupMembership {
  groupId: string;            // From RECOVERY_GROUPS enum
  recoveryDate: string;       // ISO 8601 format
  isActive: boolean;          // Currently in this program
  notes?: string;             // Optional encrypted notes
}
```

### Friend Model
```typescript
interface Friend {
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
```

## Cloud Storage Models (Firebase Firestore)

### Users Collection
```typescript
// /users/{cloudGuid}
interface CloudUser {
  guid: string;               // Primary identifier
  publicName: string;         // Only non-PII field
  createdAt: Timestamp;
  lastActiveAt: Timestamp;
  deviceTokens?: string[];    // For push notifications (encrypted)
  backupKey?: string;         // Encrypted backup encryption key
}
```

### Connections Collection
```typescript
// /connections/{connectionGuid}
interface Connection {
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
```

### Backups Collection
```typescript
// /backups/{cloudGuid}/userBackups/{backupId}
interface EncryptedBackup {
  backupId: string;
  cloudGuid: string;
  encryptedData: string;      // AES-256 encrypted JSON
  checksum: string;           // SHA-256 hash for integrity
  createdAt: Timestamp;
  deviceId: string;           // To prevent conflicts
  version: number;            // Schema version
}
```

## Encryption Schema

### Encryption Keys Management
```typescript
interface EncryptionKeys {
  masterKey: string;          // Derived from user passphrase
  dataKey: string;            // For encrypting local data
  backupKey: string;          // For encrypting cloud backups
  messagingKey: string;       // For E2E message encryption
}

// Key Derivation
// masterKey = PBKDF2(passphrase, salt, iterations: 100000)
// dataKey = HKDF(masterKey, "local-data")
// backupKey = HKDF(masterKey, "cloud-backup")
// messagingKey = HKDF(masterKey, "messaging")
```
