# Cloud User Entity

## Cloud Storage Model (Firebase Firestore)

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

