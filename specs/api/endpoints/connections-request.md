# POST /api/connections/request - Send Connection Request

## Endpoint
`POST /api/connections/request`

## Description
Send a connection request to another user.

## Request

```typescript
interface ConnectionRequest {
  initiatorGuid: string;      // Requesting user
  targetGuid: string;         // Target user
  encryptedMessage?: string;  // Optional intro message
}
```

## Response

```typescript
interface ConnectionResponse {
  success: boolean;
  connectionGuid: string;
  status: 'pending' | 'existing';
}
```

## Security
- Requires valid JWT authentication
- Rate limiting: 20 per day per user

## Status Codes
- `200` - Success
- `400` - Validation error
- `401` - Unauthorized (invalid token)
- `429` - Rate limit exceeded
- `500` - Internal server error

