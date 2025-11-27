# API Specifications

## Firebase Cloud Functions Endpoints

### Authentication Services

#### Generate User GUID
```typescript
// POST /api/users/register
interface RegisterRequest {
  deviceId: string;           // Unique device identifier
  publicName: string;         // User's public display name
}

interface RegisterResponse {
  success: boolean;
  cloudGuid: string;          // Unique user identifier
  token: string;              // JWT for authentication
}

// Security: Rate limiting, device fingerprinting
```

#### Generate Friend GUID
```typescript
// POST /api/friends/create
interface CreateFriendRequest {
  userGuid: string;           // Authenticated user's GUID
}

interface CreateFriendResponse {
  success: boolean;
  friendGuid: string;         // Unique friend identifier
}

// Security: Requires valid JWT, rate limiting per user
```

### Connection Management

#### Send Connection Request
```typescript
// POST /api/connections/request
interface ConnectionRequest {
  initiatorGuid: string;      // Requesting user
  targetGuid: string;         // Target user
  encryptedMessage?: string;  // Optional intro message
}

interface ConnectionResponse {
  success: boolean;
  connectionGuid: string;
  status: 'pending' | 'existing';
}
```

#### Accept/Reject Connection
```typescript
// PUT /api/connections/{connectionGuid}/status
interface UpdateConnectionRequest {
  userGuid: string;
  action: 'accept' | 'reject' | 'block';
}

interface UpdateConnectionResponse {
  success: boolean;
  status: string;
  updatedAt: string;
}
```

### Backup Services

#### Upload Encrypted Backup
```typescript
// POST /api/backups/upload
interface BackupUploadRequest {
  cloudGuid: string;
  encryptedData: string;      // Base64 encoded
  checksum: string;           // SHA-256
  deviceId: string;
}

interface BackupUploadResponse {
  success: boolean;
  backupId: string;
  timestamp: string;
}

// Constraints: Max 10MB per backup, 5 backups per day
```

#### Retrieve Backups
```typescript
// GET /api/backups/{cloudGuid}/list
interface BackupListResponse {
  backups: Array<{
    backupId: string;
    createdAt: string;
    deviceId: string;
    size: number;
  }>;
}

// GET /api/backups/{cloudGuid}/{backupId}
interface BackupRetrieveResponse {
  backupId: string;
  encryptedData: string;
  checksum: string;
  createdAt: string;
}
```

## Security Middleware

### JWT Validation
```typescript
interface JWTPayload {
  guid: string;
  deviceId: string;
  iat: number;
  exp: number;
}

// All authenticated endpoints require:
// Header: Authorization: Bearer <token>
// Token expiry: 7 days
// Refresh mechanism required
```

### Rate Limiting Rules
```typescript
const RATE_LIMITS = {
  registration: '5 per hour per IP',
  connectionRequests: '20 per day per user',
  backupUpload: '5 per day per user',
  backupDownload: '20 per day per user',
  general: '100 per minute per user'
};
```

### Input Validation
```typescript
// All inputs must be validated against:
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

// HTTP Status Codes
// 200: Success
// 400: Bad Request (validation errors)
// 401: Unauthorized (invalid token)
// 403: Forbidden (insufficient permissions)
// 429: Too Many Requests (rate limiting)
// 500: Internal Server Error
```
