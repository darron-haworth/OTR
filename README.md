# Our Time Recovered (OTR) Milestone Tracker

A privacy-focused mobile application designed to support individuals in recovery by tracking milestones, facilitating connections with recovery friends, and maintaining motivation throughout their journey.

## Project Overview

The OTR Milestone Tracker prioritizes user anonymity and data security while fostering a supportive recovery community. The app follows a local-first data architecture with minimal cloud storage of PII, ensuring users maintain control of their personal data.

For detailed project information, see [docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md).

## Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: Firebase Firestore
- **Authentication**: JWT-based authentication
- **Validation**: Zod schemas (auto-generated from specs)
- **Testing**: Jest, Supertest

### Mobile
- **Framework**: React Native
- **Language**: TypeScript
- **State Management**: Zustand
- **Navigation**: React Navigation v6
- **Local Storage**: React Native Async Storage with encryption
- **Encryption**: AES-256-GCM via react-native-keychain
- **API Client**: Auto-generated from endpoint specs
- **Testing**: Jest, React Native Testing Library, Detox

### Development Tools
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint, Prettier
- **Documentation**: Markdown
- **Type Generation**: Automated scripts (specs → TypeScript)
- **API Client Generation**: Automated scripts (specs → API client)

## Folder Structure

```
OTR/
├── backend/                 # Node.js + TypeScript backend
│   ├── src/
│   │   ├── api/            # API layer
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── middleware/
│   │   │   ├── validators/ # Auto-generated Zod schemas
│   │   │   └── dto/
│   │   ├── core/           # Core functionality
│   │   │   ├── config/
│   │   │   ├── logging/
│   │   │   └── security/
│   │   ├── domain/         # Domain logic
│   │   │   ├── entities/   # Auto-generated from specs
│   │   │   ├── repositories/
│   │   │   └── services/
│   │   ├── app.ts
│   │   └── server.ts
│   └── tests/
│       ├── unit/
│       └── integration/
│
├── mobile/                  # React Native mobile app
│   ├── app/
│   │   ├── navigation/
│   │   ├── state/
│   │   └── providers/
│   ├── components/
│   ├── screens/
│   ├── services/
│   │   ├── api/            # Auto-generated API client
│   │   ├── backup/         # Backup service
│   │   ├── encryption/     # Encryption service
│   │   ├── storage/       # Local storage service
│   │   ├── sync/          # Cloud sync service
│   │   ├── client.ts      # API client config
│   │   └── index.ts       # Service exports
│   ├── src/
│   │   └── types/         # Auto-generated types
│   │       ├── api/       # API request/response types
│   │       └── entities/  # Entity types
│   ├── hooks/
│   ├── assets/
│   └── utils/
│
├── specs/                   # Specification-driven development
│   ├── api/
│   │   ├── endpoints/
│   │   └── errors.md
│   ├── data-models/
│   │   ├── entities/
│   │   ├── dto/
│   │   └── validation/
│   ├── features/
│   │   ├── auth/
│   │   ├── messaging/
│   │   ├── user-profile/
│   │   ├── notifications/
│   │   └── security/
│   ├── architecture/
│   │   ├── module-overview.md
│   │   ├── diagrams/
│   │   └── flows/
│   ├── design/              # Design & brand specifications
│   │   ├── android/         # Android brand assets & theme
│   │   ├── ios/             # iOS brand assets & theme
│   │   └── shared/          # Shared design tokens
│   └── testing/
│       ├── backend-tests.md
│       ├── mobile-tests.md
│       └── integration-test-plan.md
│
├── docs/                    # Project documentation
│   ├── PROJECT_OVERVIEW.md
│   ├── PROJECT_ASSESSMENT.md
│   ├── TECHNICAL_REQUIREMENTS.md
│   ├── DEVELOPMENT_GUIDELINES.md
│   ├── SECURITY_IMPLEMENTATION.md
│   ├── ARCHITECTURE_DATA_STORAGE.md
│   └── CURSOR_PROMPTS.md
│
├── scripts/                 # Type generation scripts
│   ├── generate-types.ts    # Generate entity types from specs
│   ├── generate-api-client.ts # Generate API clients from specs
│   └── README.md
│
├── package.json             # Root package.json (type generation scripts)
├── tsconfig.json            # Root TypeScript config
│
└── .github/
    ├── workflows/
    │   ├── backend-ci.yml
    │   ├── mobile-ci.yml
    │   └── release.yml
    └── ISSUE_TEMPLATE.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- For mobile development:
  - React Native CLI
  - iOS: Xcode (macOS only)
  - Android: Android Studio

### Initial Setup

1. **Install root dependencies** (for type generation scripts):
   ```bash
   npm install
   ```

2. **Generate types from specs** (run this after updating specs):
   ```bash
   npm run generate:all
   ```
   
   This will:
   - Generate TypeScript entity types from `/specs/data-models/entities/`
   - Generate API client functions from `/specs/api/endpoints/`
   - Generate Zod validation schemas for backend

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your configuration:
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Run tests:
   ```bash
   npm test
   ```

### Mobile Setup

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **For Android:**
   ```bash
   # Make sure Android SDK is configured in android/local.properties
   # Start Metro bundler (in a separate terminal):
   npm start
   
   # Run the app:
   npm run android
   ```
   
   **Note:** The Android project is initialized and ready. Ensure you have:
   - Android SDK installed and configured
   - Android emulator running or device connected via USB
   - `android/local.properties` file with `sdk.dir` set

4. **For iOS (macOS only):**
   ```bash
   cd ios
   pod install
   cd ..
   npm run ios
   ```

5. Run tests:
   ```bash
   npm test
   ```

## Spec-Driven Development Workflow

This project follows a **Spec-Driven Development (SDD)** approach, where specifications are written before implementation. This workflow is optimized for use with Cursor AI and includes automated type generation.

### Workflow Steps

1. **Write Specifications First**
   - All features start in `/specs/`
   - API endpoints → `/specs/api/endpoints/`
   - Data models → `/specs/data-models/entities/`
   - Feature specs → `/specs/features/`

2. **Generate Types from Specs**
   ```bash
   npm run generate:types    # Generate entity types
   npm run generate:api      # Generate API clients
   npm run generate:all      # Generate everything
   ```
   - Types are automatically generated from markdown specs
   - No manual type definitions needed
   - Types stay in sync with specs

3. **Use Cursor AI for Implementation**
   - Reference specs when asking Cursor to generate code
   - Example prompt: "Implement the authentication endpoint as specified in `/specs/api/endpoints/auth.md`"
   - Cursor can read your specs and generate compliant code
   - Generated types are available for use

4. **Iterative Development**
   - Update specs as requirements evolve
   - Regenerate types: `npm run generate:all`
   - Use Cursor's codebase search to understand existing patterns
   - Generate tests based on specs in `/specs/testing/`

5. **Spec-to-Code Mapping**
   - API specs → `backend/src/api/validators/` (Zod schemas)
   - API specs → `mobile/services/api/client.ts` (API functions)
   - Data model specs → `backend/src/domain/entities/` & `mobile/src/types/entities/`
   - Feature specs → Implementation across `backend/` and `mobile/`

### Cursor AI Tips

- **Context Awareness**: Cursor can read your entire `/specs/` directory for context
- **Code Generation**: Reference specific spec files when generating code
- **Testing**: Ask Cursor to generate tests based on `/specs/testing/` files
- **Refactoring**: Use Cursor's refactor suggestions to align code with updated specs

### Type Generation

The project includes automated type generation from markdown specifications:

- **Entity Types**: Generated from `/specs/data-models/entities/*.md`
- **API Types**: Generated from `/specs/api/endpoints/*.md`
- **Zod Schemas**: Generated for backend validation
- **API Client**: Generated TypeScript functions for mobile

See [scripts/README.md](scripts/README.md) for detailed documentation.

### Example Cursor Prompts

```
"Implement the user authentication flow as specified in specs/features/auth/"

"Generate TypeScript interfaces for the data models in specs/data-models/entities/"
(Note: Types are auto-generated - use npm run generate:types instead)

"Create API routes matching the endpoints defined in specs/api/endpoints/"

"Write unit tests for the authentication service following specs/testing/backend-tests.md"

"Implement the backup service using the LocalStorageService and EncryptionService"
```

## Architecture

The app follows a **local-first, privacy-focused architecture**:

- **PII Stays Local**: All personally identifiable information is encrypted and stored locally
- **Cloud for Identifiers Only**: Firebase stores only GUIDs and minimal metadata
- **Encrypted Backups**: Periodic encrypted backups enable device migration
- **Zero-Knowledge**: Backend cannot decrypt user data

See [docs/ARCHITECTURE_DATA_STORAGE.md](docs/ARCHITECTURE_DATA_STORAGE.md) for detailed architecture documentation.

## Development Guidelines

See [docs/DEVELOPMENT_GUIDELINES.md](docs/DEVELOPMENT_GUIDELINES.md) for detailed development practices, coding standards, and best practices.

## Security

Security is a top priority. See [docs/SECURITY_IMPLEMENTATION.md](docs/SECURITY_IMPLEMENTATION.md) for security requirements and implementation guidelines.

The app implements:
- AES-256-GCM encryption for all PII
- Master key stored in iOS Keychain / Android Keystore
- Biometric authentication for key access
- Local-first data architecture
- Encrypted backups with integrity verification

## Testing

- **Backend Tests**: `backend/tests/`
- **Mobile Tests**: `mobile/__tests__/` (to be created)
- **Test Specifications**: `specs/testing/`

## Contributing

1. Read the development guidelines in `/docs/DEVELOPMENT_GUIDELINES.md`
2. Follow the spec-driven development workflow
3. Write tests for all new features
4. Ensure all CI checks pass before submitting PRs

## License

[To be determined]

