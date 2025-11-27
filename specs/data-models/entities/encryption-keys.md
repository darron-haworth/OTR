# Encryption Keys Entity

## Encryption Schema

```typescript
interface EncryptionKeys {
  masterKey: string;          // Derived from user passphrase
  dataKey: string;            // For encrypting local data
  backupKey: string;          // For encrypting cloud backups
  messagingKey: string;       // For E2E message encryption
}
```

## Key Derivation

```
masterKey = PBKDF2(passphrase, salt, iterations: 100000)
dataKey = HKDF(masterKey, "local-data")
backupKey = HKDF(masterKey, "cloud-backup")
messagingKey = HKDF(masterKey, "messaging")
```

