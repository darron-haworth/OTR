# Cursor AI Prompts for Spec-Driven Development

This document contains optimized prompts for generating code from specifications using Cursor AI.

---

## Step 4: Backend API Code Generation

### ✅ **Cursor Prompt: Backend API Code Generation (Step 4)**

> **BACKEND IMPLEMENTATION PROMPT — START**

> I am ready to begin generating backend code from the specs.

> **Tech stack:**

> * Node.js
> * TypeScript
> * Express
> * Zod for validation
> * Prisma (optional — use interfaces if unsure)

> **Folder structure:**

> * Code lives in `/backend/src`
> * Specs live in `/specs/api` and `/specs/data-models`

> **Your task is to:**

> ### **1. Read all endpoint specs inside `/specs/api/endpoints/`**

> For each endpoint spec:

> * generate a controller
> * generate a service
> * generate a repository interface
> * generate route definitions
> * generate Zod schemas based on the data model specs

> ### **2. Ensure all request/response DTOs match the data models**

> Refer to:

> * `/specs/data-models/entities/`
> * `/specs/data-models/dto/`
> * `/specs/data-models/validation/`

> ### **3. Architect the backend cleanly**

> Use this structure:

> ```
> backend/src/
>   api/
>     controllers/
>     routes/
>     middleware/
>     validators/
>   domain/
>     entities/
>     repositories/
>     services/
>   core/
>     config/
>     logging/
>     security/
>   app.ts
>   server.ts
> ```

> ### **4. Create empty repository implementations for now**

> (I will later specify the ORM layer.)

> ### **5. Do NOT implement business logic beyond what the spec states**

> Stub anything ambiguous so we keep strict SDD alignment.

> ### **6. Start by generating the FIRST endpoint**

> Choose the first alphabetical or logical endpoint in `/specs/api/endpoints/`, show me:

> * Controller
> * Service
> * Repository interface
> * Route definition
> * Zod schema

> **Show me the diff for approval before applying.**

> **BACKEND IMPLEMENTATION PROMPT — END**

---

## What Happens When You Run This

Cursor will:

1. Open your `/specs/api/endpoints/*` files
2. Parse the spec and data model files
3. Auto-create:
   * `/backend/src/api/controllers/...`
   * `/backend/src/api/routes/...`
   * `/backend/src/domain/services/...`
   * `/backend/src/domain/repositories/...`
   * `/backend/src/api/validators/...`
4. Ask you for approval
5. Then implement endpoint-by-endpoint

This is the *ideal* workflow for spec-first development in Cursor.

---

## Alternative: Fastify Version

If you prefer Fastify over Express, use this modified prompt:

> **BACKEND IMPLEMENTATION PROMPT — START (Fastify)**

> I am ready to begin generating backend code from the specs.

> **Tech stack:**

> * Node.js
> * TypeScript
> * **Fastify** (instead of Express)
> * Zod for validation
> * Prisma (optional — use interfaces if unsure)

> [Rest of prompt remains the same...]

> **BACKEND IMPLEMENTATION PROMPT — END (Fastify)**

---

## Next Steps

After completing backend API generation, proceed to:

- **Step 5: Mobile (React Native) Code Generation** - See below
- **Step 6: Integration Testing** - Generate tests from `/specs/testing/`

---

## Step 5: Mobile (React Native) Code Generation

*[To be added when requested: "Give me Step 5 for mobile."]*

---

## Step 6: Mobile Screen Design with Claude/Cursor

### ✅ **Cursor Prompt: Mobile Screen Design**

> **MOBILE SCREEN DESIGN PROMPT — START**
>
> I need to design a [SCREEN_NAME] screen for my React Native Android app "Our Time Recovered".
>
> **App Context:**
> - App Name: Our Time Recovered
> - Purpose: Privacy-focused recovery milestone tracker
> - Design System: Material Design 3
> - Framework: React Native with React Native Paper
> - Tone: Supportive, non-judgmental, privacy-focused
>
> **Screen Requirements:**
> - [DESCRIBE KEY FEATURES/FUNCTIONALITY]
>
> **Design Requirements:**
> - Follow Material Design 3 guidelines
> - Use React Native Paper components
> - Ensure accessibility (WCAG AA compliance)
> - Support light and dark themes
> - Touch targets minimum 48dp
> - Proper spacing (8dp grid system)
> - Clear visual hierarchy
>
> **Please create:**
> 1. React Native component code in `mobile/src/screens/[SCREEN_PATH]/[SCREEN_NAME].tsx`
> 2. TypeScript types if needed
> 3. Brief design rationale explaining Material Design choices
> 4. Accessibility features included
>
> Reference design specs in:
> - `specs/design/android/theme-colors.md`
> - `specs/design/android/brand-assets.md`
> - `docs/DESIGN_ASSISTANCE_GUIDE.md`
>
> **MOBILE SCREEN DESIGN PROMPT — END**

### Quick Design Prompts

**Create any screen:**
```
Create a [SCREEN_NAME] screen for my React Native app following Material Design 3.
Requirements: [LIST]
Use React Native Paper components.
```

**Improve existing screen:**
```
Review and improve this screen for Material Design 3 compliance and accessibility:
[PASTE CODE]
```

**Create design spec first:**
```
Create a design specification for [SCREEN_NAME] screen.
Include layout, components, colors, typography, spacing, states.
Format as markdown.
```

**For more design prompts, see:** `docs/DESIGN_ASSISTANCE_GUIDE.md`

---

## Usage Tips

1. **Copy the entire prompt** between the START/END markers
2. **Paste into Cursor** chat interface
3. **Review the diff** before approving
4. **Iterate endpoint-by-endpoint** for better control
5. **Reference specs** when Cursor asks clarifying questions

---

## Workflow Summary

```
1. Write specs in /specs/
2. Use Cursor prompt to generate code
3. Review and approve diffs
4. Implement business logic
5. Write tests from /specs/testing/
6. Design screens using Claude (see DESIGN_ASSISTANCE_GUIDE.md)
7. Iterate and refine
```

## Additional Resources

- **Design Assistance:** See `docs/DESIGN_ASSISTANCE_GUIDE.md` for comprehensive design prompts and workflows
- **Design Specs:** See `specs/design/` for brand assets, colors, and typography

