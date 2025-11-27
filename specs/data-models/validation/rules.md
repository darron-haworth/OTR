# Validation Rules

## Input Validation Rules

All inputs must be validated against these rules:

```typescript
const VALIDATION_RULES = {
  guid: /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i,
  publicName: /^[a-zA-Z0-9\s]{1,30}$/,
  encryptedData: /^[A-Za-z0-9+/]+=*$/,  // Base64
  checksum: /^[a-f0-9]{64}$/,           // SHA-256
  firstName: /^[a-zA-Z\s]{1,50}$/,
  lastName: /^[a-zA-Z\s]{1,50}$/,
  birthDate: /^\d{4}-\d{2}-\d{2}$/,     // ISO 8601 date format
};
```

## Field Constraints

- **firstName**: 1-50 characters, letters and spaces only
- **lastName**: 1-50 characters, letters and spaces only
- **publicName**: 1-30 characters, alphanumeric and spaces
- **birthDate**: ISO 8601 format (YYYY-MM-DD)
- **guid**: UUID v4 format
- **encryptedData**: Base64 encoded string
- **checksum**: SHA-256 hash (64 hex characters)

