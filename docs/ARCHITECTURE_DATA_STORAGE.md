# Data Storage Architecture

## Overview

The OTR Milestone Tracker app uses a **local-first, cloud-backup** architecture designed to maximize privacy and security while enabling device migration.

## Core Principles

1. **PII Stays Local**: All personally identifiable information (PII) is stored and encrypted locally on the device
2. **Cloud for Identifiers Only**: Firebase stores only GUIDs, connection metadata, and encrypted backups
3. **Encrypted Backups**: Periodic encrypted backups enable device migration without exposing PII to cloud
4. **Zero-Knowledge**: The backend cannot decrypt user data - only the device can

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    MOBILE DEVICE                             │
│                                                              │
│  ┌────────────────────────────────────────────────────┐   │
│  │         Local Storage (AsyncStorage)                │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  User Profile (Encrypted PII)                 │  │   │
│  │  │  - firstName, lastName, birthDate            │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  Friends List (Encrypted PII)                │  │   │
│  │  │  - Friend profiles with PII                    │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  Non-PII Metadata                            │  │   │
│  │  │  - localId, cloudGuid, publicName            │  │   │
│  │  │  - recoveryGroups, connectionStatus          │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌────────────────────────────────────────────────────┐   │
│  │      Encryption Service (Keychain)                  │   │
│  │  - Master key derived from passphrase               │   │
│  │  - AES-256-GCM encryption                           │   │
│  │  - Stored in iOS Keychain / Android Keystore        │   │
│  └────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Encrypted Backups Only
                            │ (Periodic)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    FIREBASE BACKEND                          │
│                                                              │
│  ┌────────────────────────────────────────────────────┐   │
│  │  /users/{cloudGuid}                                 │   │
│  │  - guid: string                                     │   │
│  │  - publicName: string (non-PII)                    │   │
│  │  - createdAt, lastActiveAt                         │   │
│  │  - deviceTokens[] (encrypted)                      │   │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌────────────────────────────────────────────────────┐   │
│  │  /backups/{cloudGuid}/userBackups/{backupId}       │   │
│  │  - backupId: string                                │   │
│  │  - encryptedData: string (AES-256 encrypted)      │   │
│  │  - checksum: string (SHA-256)                      │   │
│  │  - createdAt, deviceId, version                   │   │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌────────────────────────────────────────────────────┐   │
│  │  /connections/{connectionGuid}                     │   │
│  │  - connectionGuid, user1Guid, user2Guid          │   │
│  │  - status: 'pending' | 'accepted' | 'blocked'      │   │
│  │  - No PII - only GUIDs and status                 │   │
│  └────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Initial Setup

1. User creates profile locally
2. User registers with backend → receives `cloudGuid`
3. Backend stores only `cloudGuid` and `publicName` in Firebase
4. All PII remains encrypted on device

### Daily Usage

1. User interacts with app
2. All PII read/written from local encrypted storage
3. Only non-PII metadata synced to cloud (if needed)
4. Periodic encrypted backups created automatically

### Device Migration

1. User installs app on new device
2. User logs in with credentials
3. App retrieves latest encrypted backup from cloud
4. App decrypts backup using master key (derived from passphrase)
5. All PII restored to new device
6. User continues seamlessly

## Services

### LocalStorageService

**Purpose**: Manages local storage of encrypted PII data

**Key Methods**:
- `saveUserProfile(profile)` - Store encrypted user profile
- `getUserProfile()` - Retrieve and decrypt user profile
- `saveFriends(friends)` - Store encrypted friends list
- `getFriends()` - Retrieve and decrypt friends list

**Storage Strategy**:
- PII encrypted separately from non-PII
- Non-PII stored in plain text for quick access
- PII encrypted with AES-256-GCM

### EncryptionService

**Purpose**: Handles encryption/decryption using device keychain

**Key Methods**:
- `initializeMasterKey(passphrase)` - Derive master key from passphrase
- `encrypt(plaintext)` - Encrypt data with AES-256-GCM
- `decrypt(encryptedData)` - Decrypt with integrity verification
- `generateChecksum(data)` - SHA-256 checksum for integrity

**Security**:
- PBKDF2 with 100,000 iterations (NIST SP 800-132)
- Master key stored in iOS Keychain / Android Keystore
- Biometric authentication required for key access

### BackupService

**Purpose**: Manages periodic encrypted backups to cloud

**Key Methods**:
- `createBackup()` - Create and upload encrypted backup
- `restoreFromBackup(backupId?)` - Download and restore from backup
- `listBackups()` - List all available backups
- `startAutomaticBackups()` - Enable periodic backups

**Backup Strategy**:
- Default interval: 24 hours
- Includes: User profile + Friends list
- Encrypted before upload
- SHA-256 checksum for integrity verification
- Max 5 backups per day per user

### CloudSyncService

**Purpose**: Syncs non-PII metadata with cloud

**Key Methods**:
- `registerUser(publicName)` - Register and get cloud GUID
- `syncUserProfile()` - Update sync timestamp
- `syncFriends()` - Update friend sync timestamps

**Sync Strategy**:
- Only syncs GUIDs, connection status, timestamps
- No PII ever sent to cloud
- Timestamps updated for tracking

## Security Considerations

### Encryption

- **Algorithm**: AES-256-GCM (authenticated encryption)
- **Key Derivation**: PBKDF2 with 100,000 iterations
- **Key Storage**: iOS Keychain / Android Keystore
- **Key Access**: Biometric authentication required

### Data Separation

- **PII**: Always encrypted, never sent to cloud
- **Non-PII**: Stored in plain text locally, synced to cloud
- **Backups**: Fully encrypted before upload

### Integrity

- **Checksums**: SHA-256 for backup integrity
- **Auth Tags**: GCM mode provides authentication
- **Verification**: All backups verified on restore

## Backup Strategy

### Automatic Backups

- **Interval**: Configurable (default: 24 hours)
- **Trigger**: Background task or app foreground
- **Conditions**: Only if user is registered and data has changed

### Manual Backups

- User can trigger backup anytime
- Shows backup status and last backup time
- Can restore from any previous backup

### Backup Limits

- **Size**: Max 10MB per backup
- **Frequency**: Max 5 backups per day
- **Retention**: All backups retained (user can delete)

## Migration Flow

### New Device Setup

1. User installs app
2. User enters passphrase
3. Master key derived from passphrase
4. App checks if user is registered (by cloudGuid)
5. If registered, prompts to restore from backup
6. Downloads latest backup
7. Decrypts and restores all data
8. User continues seamlessly

### Backup Selection

- User can choose which backup to restore
- Shows backup date, device ID, and size
- Latest backup recommended by default

## Benefits

1. **Privacy**: PII never leaves device unencrypted
2. **Security**: Zero-knowledge architecture
3. **Portability**: Easy device migration via backups
4. **Performance**: Fast local access, no network dependency
5. **Compliance**: Meets NIST and OWASP requirements

## Future Enhancements

- [ ] Incremental backups (only changed data)
- [ ] Backup compression
- [ ] Multi-device sync (encrypted peer-to-peer)
- [ ] Backup encryption key rotation
- [ ] Backup expiration policies

