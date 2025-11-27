# POST /api/users/register - Generate User GUID

## Endpoint
`POST /api/users/register`

## Description
Generate a unique user GUID for a new user registration.

## Request

```typescript
interface RegisterRequest {
  deviceId: string;           // Unique device identifier
  publicName: string;         // User's public display name
}
```

## Response

```typescript
interface RegisterResponse {
  success: boolean;
  cloudGuid: string;          // Unique user identifier
  token: string;              // JWT for authentication
}
```

## Security
- Rate limiting: 5 per hour per IP
- Device fingerprinting required

## Status Codes
- `200` - Success
- `400` - Validation error
- `429` - Rate limit exceeded
- `500` - Internal server error

