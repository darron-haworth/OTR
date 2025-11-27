# GET /api/backups/{cloudGuid}/list - List Backups

## Endpoint
`GET /api/backups/{cloudGuid}/list`

## Description
Retrieve a list of all backups for a user.

## Path Parameters
- `cloudGuid` (string) - The user's cloud GUID

## Response

```typescript
interface BackupListResponse {
  backups: Array<{
    backupId: string;
    createdAt: string;
    deviceId: string;
    size: number;
  }>;
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
- `429` - Rate limit exceeded
- `500` - Internal server error

