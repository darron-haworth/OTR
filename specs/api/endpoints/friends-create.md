# POST /api/friends/create - Generate Friend GUID

## Endpoint
`POST /api/friends/create`

## Description
Generate a unique friend GUID for creating a friend profile.

## Request

```typescript
interface CreateFriendRequest {
  userGuid: string;           // Authenticated user's GUID
}
```

## Response

```typescript
interface CreateFriendResponse {
  success: boolean;
  friendGuid: string;         // Unique friend identifier
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

