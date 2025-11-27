# Encrypted Backup Entity

## Cloud Storage Model (Firebase Firestore)

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

