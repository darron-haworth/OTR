# Connection Entity

## Cloud Storage Model (Firebase Firestore)

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

