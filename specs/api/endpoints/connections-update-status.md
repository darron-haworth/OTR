# PUT /api/connections/{connectionGuid}/status - Accept/Reject Connection

## Endpoint
`PUT /api/connections/{connectionGuid}/status`

## Description
Accept, reject, or block a connection request.

## Path Parameters
- `connectionGuid` (string) - The connection GUID

## Request

```typescript
interface UpdateConnectionRequest {
  userGuid: string;
  action: 'accept' | 'reject' | 'block';
}
```

## Response

```typescript
interface UpdateConnectionResponse {
  success: boolean;
  status: string;
  updatedAt: string;
}
```

## Security
- Requires valid JWT authentication
- User must be part of the connection

## Status Codes
- `200` - Success
- `400` - Validation error
- `401` - Unauthorized (invalid token)
- `403` - Forbidden (not part of connection)
- `404` - Connection not found
- `500` - Internal server error

