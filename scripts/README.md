# Type Generation Scripts

This directory contains scripts for automatically generating TypeScript types, API clients, and validation schemas from markdown specification files.

## Scripts

### `generate-types.ts`

Generates TypeScript entity types from markdown spec files.

**Input:** `/specs/data-models/entities/*.md`  
**Output:**
- `backend/src/domain/entities/*.ts`
- `mobile/src/types/entities/*.ts`

**Usage:**
```bash
npm run generate:types
```

**What it does:**
- Parses markdown files in the entities directory
- Extracts TypeScript interfaces from code blocks
- Generates TypeScript files with proper exports
- Maintains comments and structure from specs

### `generate-api-client.ts`

Generates API client functions, Zod validation schemas, and TypeScript types from endpoint specifications.

**Input:** `/specs/api/endpoints/*.md`  
**Output:**
- `backend/src/api/validators/*.ts` (Zod schemas)
- `mobile/services/api/client.ts` (API client functions)
- `mobile/src/types/api/*-types.ts` (Request/Response types)

**Usage:**
```bash
npm run generate:api
```

**What it does:**
- Parses endpoint specification markdown files
- Extracts request/response interfaces
- Generates Zod validation schemas for backend
- Generates TypeScript API client functions for mobile
- Generates TypeScript types for requests and responses
- Automatically imports types in the API client

## Running Scripts

From the project root:

```bash
# Generate entity types only
npm run generate:types

# Generate API clients and validators only
npm run generate:api

# Generate everything
npm run generate:all
```

## How It Works

### Entity Type Generation

1. Scans `/specs/data-models/entities/` for `.md` files
2. Extracts TypeScript interfaces from `\`\`\`typescript` code blocks
3. Generates TypeScript files with:
   - Auto-generated header comments
   - All interfaces from the spec
   - Proper export statements

### API Client Generation

1. Scans `/specs/api/endpoints/` for `.md` files
2. Parses endpoint information:
   - HTTP method and path
   - Request/Response interfaces
   - Path parameters
   - Status codes
3. Generates:
   - **Backend:** Zod validation schemas for request validation
   - **Mobile:** TypeScript API client functions with fetch calls
   - **Mobile:** TypeScript type definitions for requests/responses

## Spec File Format

### Entity Specs

Entity spec files should contain TypeScript interfaces in code blocks:

```markdown
# Entity Name

## Description

```typescript
interface EntityName {
  field1: string;
  field2?: number;
}
```
```

### Endpoint Specs

Endpoint spec files should follow this structure:

```markdown
# METHOD /api/path - Endpoint Name

## Endpoint
`METHOD /api/path`

## Description
Endpoint description

## Request

```typescript
interface RequestName {
  field: string;
}
```

## Response

```typescript
interface ResponseName {
  result: boolean;
}
```

## Status Codes
- `200` - Success
- `400` - Bad request
```

## Regenerating Types

**Important:** Generated files should not be edited manually. They are overwritten each time the scripts run.

To regenerate after spec changes:
```bash
npm run generate:all
```

## CI Integration

These scripts should be run in CI to ensure:
- Types stay in sync with specs
- No manual type definitions drift from specs
- Validation schemas match endpoint definitions

Add to CI pipeline:
```yaml
- name: Generate types
  run: npm run generate:all
  
- name: Check for changes
  run: git diff --exit-code
```

## Troubleshooting

### Types not generating
- Check that spec files have valid TypeScript interfaces in code blocks
- Ensure interfaces are properly formatted with matching braces

### API client missing functions
- Verify endpoint spec files follow the expected format
- Check that request/response interfaces are defined

### Import errors
- Run `npm run generate:api` to regenerate imports
- Ensure all type files are generated before building

