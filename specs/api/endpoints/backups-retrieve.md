# GET /api/backups/{cloudGuid}/{backupId} - Retrieve Backup

## Endpoint
`GET /api/backups/{cloudGuid}/{backupId}`

## Description
Retrieve a specific backup by ID.

## Path Parameters
- `cloudGuid` (string) - The user's cloud GUID
- `backupId` (string) - The backup ID

## Response

```typescript
interface BackupRetrieveResponse {
  backupId: string;
  encryptedData: string;
  checksum: string;
  createdAt: string;
}
```

## Security
- Requires valid JWT authentication
- User must match the cloudGuid
- Rate limiting: 20 per day per user

## Status Codes
- `200` - Success
- `401` - Unauthorized (invalid token)
- `403` - Forbidden (not authorized for this user)
- `404` - Backup not found
- `429` - Rate limit exceeded
- `500` - Internal server error

