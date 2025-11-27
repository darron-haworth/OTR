# API Overview

This document provides high-level API specifications including security middleware, rate limiting, validation rules, and error handling.

## Security Middleware

### JWT Validation

```typescript
interface JWTPayload {
  guid: string;
  deviceId: string;
  iat: number;
  exp: number;
}
```

**Requirements:**
- All authenticated endpoints require: `Authorization: Bearer <token>` header
- Token expiry: 7 days
- Refresh mechanism required

## Rate Limiting Rules

```typescript
const RATE_LIMITS = {
  registration: '5 per hour per IP',
  connectionRequests: '20 per day per user',
  backupUpload: '5 per day per user',
  backupDownload: '20 per day per user',
  general: '100 per minute per user'
};
```

## Input Validation

All inputs must be validated against:

```typescript
const VALIDATION_RULES = {
  guid: /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i,
  publicName: /^[a-zA-Z0-9\s]{1,30}$/,
  encryptedData: /^[A-Za-z0-9+/]+=*$/,  // Base64
  checksum: /^[a-f0-9]{64}$/,           // SHA-256
};
```

## Error Handling

### Standard Error Response

```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;           // e.g., 'INVALID_TOKEN'
    message: string;        // User-friendly message
    details?: any;          // Debug info (dev environment only)
  };
  timestamp: string;
}
```

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `413` - Payload Too Large
- `429` - Too Many Requests (rate limiting)
- `500` - Internal Server Error

## Endpoint Specifications

Individual endpoint specifications are located in `/specs/api/endpoints/`:

- `users-register.md` - POST /api/users/register
- `friends-create.md` - POST /api/friends/create
- `connections-request.md` - POST /api/connections/request
- `connections-update-status.md` - PUT /api/connections/{connectionGuid}/status
- `backups-upload.md` - POST /api/backups/upload
- `backups-list.md` - GET /api/backups/{cloudGuid}/list
- `backups-retrieve.md` - GET /api/backups/{cloudGuid}/{backupId}

