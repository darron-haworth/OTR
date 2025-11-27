# POST /api/backups/upload - Upload Encrypted Backup

## Endpoint
`POST /api/backups/upload`

## Description
Upload an encrypted backup of user data.

## Request

```typescript
interface BackupUploadRequest {
  cloudGuid: string;
  encryptedData: string;      // Base64 encoded
  checksum: string;           // SHA-256
  deviceId: string;
}
```

## Response

```typescript
interface BackupUploadResponse {
  success: boolean;
  backupId: string;
  timestamp: string;
}
```

## Constraints
- Max 10MB per backup
- 5 backups per day per user

## Security
- Requires valid JWT authentication
- Rate limiting: 5 per day per user

## Status Codes
- `200` - Success
- `400` - Validation error (size exceeded, invalid checksum)
- `401` - Unauthorized (invalid token)
- `413` - Payload too large (>10MB)
- `429` - Rate limit exceeded
- `500` - Internal server error

