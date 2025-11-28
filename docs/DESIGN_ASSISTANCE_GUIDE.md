# Design Assistance Guide: Using Claude/Cursor for Mobile Screen Design

**Last Updated:** 2024-11-27  
**Purpose:** Guide for non-designers to use Claude/Cursor as a design assistant for mobile app screens

---

## 🎯 Overview

You don't need to be a designer or have design software to create professional mobile screens. **Claude/Cursor can act as your design assistant** by:

1. **Generating React Native code** with proper Material Design components
2. **Creating design specifications** that you can implement
3. **Reviewing and improving** your designs
4. **Providing design guidance** based on Material Design principles

---

## 🚀 Quick Start: Design a Screen with Claude

### Example Prompt Template

```
I need to design a [SCREEN_NAME] screen for my Android app "Our Time Recovered". 

The app is a privacy-focused recovery milestone tracker. 

Please:
1. Create a React Native screen component following Material Design 3 guidelines
2. Use appropriate colors, spacing, and typography
3. Include proper accessibility features
4. Make it feel supportive and non-judgmental
5. Ensure touch targets are at least 48dp
6. Use React Native Paper components where possible

Key features for this screen:
- [FEATURE_1]
- [FEATURE_2]
- [FEATURE_3]

The screen should:
- [BEHAVIOR_1]
- [BEHAVIOR_2]
```

### Real Example: Landing/Onboarding Screen

```
I need to design an onboarding/landing screen for my Android app "Our Time Recovered".

The app is a privacy-focused recovery milestone tracker that stores PII locally and uses Firebase only for GUIDs.

Please create a React Native screen component that:
1. Welcomes users to the app
2. Highlights key privacy features (local storage, encryption)
3. Has a supportive, non-judgmental tone
4. Uses Material Design 3 components
5. Includes a "Get Started" button
6. Has proper spacing and typography
7. Works in both light and dark modes

The screen should feel calming and trustworthy. Use colors that suggest security and support (consider blues, greens, soft tones).

Create the component in mobile/src/screens/onboarding/WelcomeScreen.tsx
```

---

## 📋 Design Prompt Library

### 1. Screen Design Prompts

#### Create a New Screen
```
Create a [SCREEN_NAME] screen for my React Native Android app following these requirements:

**App Context:**
- App Name: Our Time Recovered
- Purpose: Privacy-focused recovery milestone tracker
- Design System: Material Design 3
- Framework: React Native with React Native Paper

**Screen Requirements:**
- [List specific features/functionality]

**Design Requirements:**
- Follow Material Design 3 guidelines
- Use appropriate Material Design components
- Ensure accessibility (WCAG AA compliance)
- Support light and dark themes
- Touch targets minimum 48dp
- Proper spacing (8dp grid system)
- Clear visual hierarchy

**Tone:**
- Supportive, non-judgmental
- Professional but approachable
- Privacy-focused messaging

Please create:
1. The React Native component code
2. TypeScript types if needed
3. Brief design rationale
```

#### Improve an Existing Screen
```
Review and improve this React Native screen component:

[PASTE YOUR CODE]

Please:
1. Identify design issues (spacing, colors, accessibility)
2. Suggest Material Design 3 improvements
3. Provide updated code with improvements
4. Explain the changes and why they're better
```

#### Create Screen Variations
```
I have a [SCREEN_NAME] screen. Please create variations for:
1. Empty state (no data)
2. Loading state
3. Error state
4. Success state

Each should follow Material Design 3 patterns and maintain consistency with the main screen.
```

### 2. Component Design Prompts

#### Design a Custom Component
```
Create a Material Design 3 compliant [COMPONENT_NAME] component for my React Native app.

Requirements:
- Purpose: [WHAT IT DOES]
- Props: [LIST PROPS]
- Accessibility: Screen reader support, keyboard navigation
- States: [NORMAL, DISABLED, LOADING, etc.]
- Variants: [IF ANY]

Use React Native Paper components as base and extend as needed.
```

#### Design a Form Component
```
Create a form component for [FORM_PURPOSE] with:
- Material Design 3 text fields
- Proper validation states
- Error messaging
- Submit button with loading state
- Accessibility labels
- Keyboard handling

Form fields:
- [FIELD_1]: [TYPE, VALIDATION]
- [FIELD_2]: [TYPE, VALIDATION]
```

### 3. Design System Prompts

#### Create Color Palette
```
Help me create a Material Design 3 color palette for "Our Time Recovered" app.

Brand characteristics:
- Privacy-focused
- Supportive recovery community
- Trustworthy and secure
- Calming and non-judgmental

Please:
1. Suggest a primary color (consider blues or greens for trust/calm)
2. Generate a complete Material Design 3 palette from that color
3. Provide hex codes for all colors
4. Include dark theme variants
5. Ensure WCAG AA contrast ratios
6. Document in specs/design/android/theme-colors.md format
```

#### Create Typography System
```
Create a typography system for my React Native app following Material Design 3:

Requirements:
- Use Roboto font family (Material Design default)
- Define scale for: headings, body, captions, buttons
- Ensure readability
- Support both light and dark themes
- Document in specs/design/android/typography.md format
```

### 4. Design Review Prompts

#### Review Design for Accessibility
```
Review this React Native screen/component for accessibility issues:

[PASTE CODE]

Check for:
- Color contrast ratios (WCAG AA)
- Touch target sizes (minimum 48dp)
- Screen reader support
- Keyboard navigation
- Focus indicators
- Text sizing

Provide specific fixes for any issues found.
```

#### Review Design for Material Design Compliance
```
Review this React Native screen for Material Design 3 compliance:

[PASTE CODE]

Check:
- Component usage (correct Material components)
- Spacing (8dp grid system)
- Elevation/shadows
- Color usage (Material color system)
- Typography scale
- Motion/animation principles

Provide specific improvements.
```

---

## 🎨 Design Workflow with Claude

### Step 1: Describe Your Screen
Start by describing what the screen needs to do:

```
I need a screen that shows a user's recovery milestones. It should:
- Display a list of milestones (date, type, notes)
- Allow adding new milestones
- Show progress/statistics
- Feel celebratory for achievements
- Be private and secure
```

### Step 2: Get Initial Design
Ask Claude to create the screen:

```
Create a React Native screen component for displaying recovery milestones.

[PASTE YOUR REQUIREMENTS FROM STEP 1]

Use Material Design 3 components and follow the design specs in specs/design/android/
```

### Step 3: Refine the Design
Ask for improvements:

```
The milestone list screen you created is good, but please:
1. Add empty state with encouraging message
2. Improve spacing between items
3. Add pull-to-refresh
4. Make milestone cards more visually distinct
5. Add celebration animation for milestone anniversaries
```

### Step 4: Add States and Variations
Request all necessary states:

```
Please add these states to the milestone screen:
- Loading state (skeleton loaders)
- Empty state (no milestones yet)
- Error state (failed to load)
- Offline state (no connection)
```

### Step 5: Review and Polish
Get a final review:

```
Review this milestone screen for:
- Material Design 3 compliance
- Accessibility
- Performance
- Code quality

[PASTE FINAL CODE]
```

---

## 🛠️ Advanced Design Assistance

### Generate Design Specs First
Before coding, ask Claude to create a design specification:

```
Create a design specification for a [SCREEN_NAME] screen.

Include:
1. Layout structure (wireframe description)
2. Component list
3. Color usage
4. Typography
5. Spacing
6. States and interactions
7. Accessibility considerations

Format as markdown in specs/design/screens/[SCREEN_NAME].md
```

### Create Design System Components
Build reusable components:

```
Create a design system component library for my app. Start with:

1. Button variants (primary, secondary, text, icon)
2. Card component (with elevation, padding)
3. Input field (text, with validation states)
4. List item (for milestones, friends, etc.)
5. Empty state component
6. Loading skeleton component

Each should:
- Follow Material Design 3
- Be fully typed (TypeScript)
- Support light/dark themes
- Be accessible
- Be documented with usage examples
```

### Generate Design Assets Specs
Ask Claude to help with asset specifications:

```
Based on my app design, create specifications for:
1. App icon design (describe what it should look like)
2. Splash screen design
3. Notification icon design

Document in specs/design/android/brand-assets.md format.
```

---

## 📱 Material Design 3 Component Reference

When asking Claude to design screens, reference these Material Design 3 components:

### Common Components to Request
- **Buttons**: `Button`, `FAB` (Floating Action Button), `IconButton`
- **Cards**: `Card`, `Card.Content`, `Card.Actions`
- **Inputs**: `TextInput`, `Searchbar`
- **Navigation**: `BottomNavigation`, `Appbar`
- **Lists**: `List.Item`, `List.Section`, `Divider`
- **Feedback**: `Snackbar`, `Dialog`, `Banner`
- **Progress**: `ProgressBar`, `ActivityIndicator`
- **Surfaces**: `Surface`, `Elevation`

### Example Component Request
```
Use React Native Paper components to create a milestone card:
- Card component with elevation
- Card.Content with title and description
- Card.Actions with action buttons
- Proper spacing and typography
- Material Design 3 styling
```

---

## 🎯 Design Principles to Reference

When working with Claude, mention these principles:

### Material Design 3 Principles
- **Motion**: Smooth, meaningful transitions
- **Material**: Surfaces with elevation and depth
- **Color**: Dynamic color system, theming
- **Typography**: Clear hierarchy, readable scales
- **Layout**: 8dp grid system, responsive design

### App-Specific Principles
- **Privacy-First**: Visual cues for security
- **Supportive**: Non-judgmental, encouraging tone
- **Accessible**: WCAG AA compliance
- **Inclusive**: Works for all users

---

## 💡 Pro Tips

### 1. Start with Wireframes
Ask Claude to create a text-based wireframe first:

```
Create a wireframe description for a [SCREEN_NAME] screen:
- Layout structure
- Component placement
- Navigation flow
- Key interactions

Use ASCII art or text description.
```

### 2. Iterate in Small Steps
Don't ask for everything at once. Build incrementally:

1. Basic layout
2. Add components
3. Add interactions
4. Add states
5. Polish and refine

### 3. Reference Existing Specs
Point Claude to your existing design specs:

```
Create a screen following the design system defined in:
- specs/design/android/theme-colors.md
- specs/design/android/brand-assets.md
- [ANY OTHER RELEVANT SPECS]
```

### 4. Ask for Explanations
Understand the design decisions:

```
Why did you choose [DESIGN_ELEMENT]? 
What Material Design principle does it follow?
How does it improve accessibility?
```

### 5. Get Multiple Options
Ask for design alternatives:

```
Provide 3 different layout options for this screen:
1. List-based layout
2. Card-based grid layout
3. Tabbed interface

Explain pros/cons of each.
```

---

## 🔄 Design Iteration Workflow

```
1. Describe need → Claude generates initial design
2. Review code → Test in app
3. Identify issues → Ask Claude for improvements
4. Refine → Get updated code
5. Review again → Final polish
6. Document → Update specs
```

---

## 📚 Example: Complete Screen Design Session

### Initial Request
```
Create a "Friends List" screen for my recovery app. It should:
- Show a list of recovery friends
- Allow searching/filtering
- Show connection status
- Allow adding new friends
- Be privacy-focused (minimal data shown)
- Use Material Design 3
```

### Follow-up: Add Features
```
Add to the friends list screen:
- Pull-to-refresh
- Empty state with "Add your first friend" message
- Loading skeleton while fetching
- Error state with retry button
```

### Follow-up: Improve Design
```
The friends list needs:
- Better visual hierarchy
- More spacing between items
- Avatar placeholders for friends
- Status indicators (online/offline)
- Swipe actions (archive, delete)
```

### Final Review
```
Review the friends list screen for:
- Material Design 3 compliance
- Accessibility (screen readers, keyboard nav)
- Performance (list optimization)
- Code quality and best practices
```

---

## 🎓 Learning with Claude

Ask Claude to explain design concepts:

```
Explain Material Design 3 [CONCEPT] and how to apply it in React Native.

Examples:
- Elevation and shadows
- Color system
- Typography scale
- Motion principles
- Responsive design
```

---

## ✅ Checklist: Using Claude for Design

Before asking Claude to design a screen:
- [ ] Describe the screen's purpose clearly
- [ ] List key features/functionality
- [ ] Mention any design constraints
- [ ] Reference existing design specs
- [ ] Specify Material Design 3 compliance

After Claude generates code:
- [ ] Review the code structure
- [ ] Test in your app
- [ ] Check accessibility
- [ ] Verify Material Design compliance
- [ ] Ask for refinements if needed
- [ ] Document in specs

---

## 🚀 Quick Reference: Copy-Paste Prompts

### Create Any Screen
```
Create a [SCREEN_NAME] screen for my React Native Android app "Our Time Recovered".

Requirements:
- [REQUIREMENT_1]
- [REQUIREMENT_2]
- [REQUIREMENT_3]

Use Material Design 3 components from React Native Paper.
Follow specs in specs/design/android/
```

### Improve Existing Screen
```
Improve this screen for Material Design 3 compliance and accessibility:

[PASTE CODE]

Focus on:
- Spacing and layout
- Color usage
- Typography
- Touch targets
- Screen reader support
```

### Create Component Library
```
Create a reusable [COMPONENT_NAME] component following Material Design 3.

Props: [LIST]
States: [LIST]
Accessibility: [REQUIREMENTS]

Use React Native Paper as base.
```

---

**Remember:** Claude/Cursor is your design assistant. Don't hesitate to ask for:
- Multiple design options
- Explanations of design decisions
- Improvements and refinements
- Design system components
- Accessibility reviews
- Material Design compliance checks

You're not alone in the design process - Claude can guide you every step of the way!

