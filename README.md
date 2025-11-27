# Our Time Recovered (OTR) Milestone Tracker

A privacy-focused mobile application designed to support individuals in recovery by tracking milestones, facilitating connections with recovery friends, and maintaining motivation throughout their journey.

## Project Overview

The OTR Milestone Tracker prioritizes user anonymity and data security while fostering a supportive recovery community. The app follows a local-first data architecture with minimal cloud storage of PII, ensuring users maintain control of their personal data.

For detailed project information, see [docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md).

## Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js (or similar)
- **Database**: TBD (Firebase/Firestore or PostgreSQL)
- **Authentication**: JWT-based authentication
- **Testing**: Jest, Supertest

### Mobile
- **Framework**: React Native
- **Language**: TypeScript
- **State Management**: Redux Toolkit or Zustand
- **Navigation**: React Navigation v6
- **Local Storage**: React Native Async Storage / Encrypted Storage
- **Testing**: Jest, React Native Testing Library, Detox

### Development Tools
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint, Prettier
- **Documentation**: Markdown

## Folder Structure

```
OTR/
├── backend/                 # Node.js + TypeScript backend
│   ├── src/
│   │   ├── api/            # API layer
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── middleware/
│   │   ├── core/           # Core functionality
│   │   │   ├── config/
│   │   │   ├── logging/
│   │   │   └── security/
│   │   ├── domain/         # Domain logic
│   │   │   ├── entities/
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
│   │   ├── api/
│   │   └── client.ts
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
│   └── testing/
│       ├── backend-tests.md
│       ├── mobile-tests.md
│       └── integration-test-plan.md
│
├── docs/                    # Project documentation
│   ├── PROJECT_OVERVIEW.md
│   ├── TECHNICAL_REQUIREMENTS.md
│   ├── DEVELOPMENT_GUIDELINES.md
│   └── SECURITY_IMPLEMENTATION.md
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

3. For iOS (macOS only):
   ```bash
   cd ios
   pod install
   cd ..
   npm run ios
   ```

4. For Android:
   ```bash
   npm run android
   ```

5. Run tests:
   ```bash
   npm test
   ```

## Spec-Driven Development Workflow (Cursor-Specific)

This project follows a **Spec-Driven Development (SDD)** approach, where specifications are written before implementation. This workflow is optimized for use with Cursor AI.

### Workflow Steps

1. **Write Specifications First**
   - All features start in `/specs/`
   - API endpoints → `/specs/api/endpoints/`
   - Data models → `/specs/data-models/`
   - Feature specs → `/specs/features/`

2. **Use Cursor AI for Implementation**
   - Reference specs when asking Cursor to generate code
   - Example prompt: "Implement the authentication endpoint as specified in `/specs/api/endpoints/auth.md`"
   - Cursor can read your specs and generate compliant code

3. **Iterative Development**
   - Update specs as requirements evolve
   - Use Cursor's codebase search to understand existing patterns
   - Generate tests based on specs in `/specs/testing/`

4. **Spec-to-Code Mapping**
   - API specs → `backend/src/api/`
   - Data model specs → `backend/src/domain/entities/`
   - Feature specs → Implementation across `backend/` and `mobile/`

### Cursor AI Tips

- **Context Awareness**: Cursor can read your entire `/specs/` directory for context
- **Code Generation**: Reference specific spec files when generating code
- **Testing**: Ask Cursor to generate tests based on `/specs/testing/` files
- **Refactoring**: Use Cursor's refactor suggestions to align code with updated specs

### Example Cursor Prompts

```
"Implement the user authentication flow as specified in specs/features/auth/"

"Generate TypeScript interfaces for the data models in specs/data-models/entities/"

"Create API routes matching the endpoints defined in specs/api/endpoints/"

"Write unit tests for the authentication service following specs/testing/backend-tests.md"
```

## Development Guidelines

See [docs/DEVELOPMENT_GUIDELINES.md](docs/DEVELOPMENT_GUIDELINES.md) for detailed development practices, coding standards, and best practices.

## Security

Security is a top priority. See [docs/SECURITY_IMPLEMENTATION.md](docs/SECURITY_IMPLEMENTATION.md) for security requirements and implementation guidelines.

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

