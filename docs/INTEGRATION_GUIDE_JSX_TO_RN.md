# Integration Guide: Converting JSX Design to React Native

This guide explains how to integrate the `otr-milestone-tracker.jsx` file and design specs into the React Native project following the spec-driven development workflow.

## Overview

You have:
1. **Web Component**: `otr-milestone-tracker.jsx` - A React web component created with Claude.ai
2. **Design Specs**: `specs/design/mobile/` - Comprehensive design specifications
3. **Existing Project**: React Native CLI project with spec-driven development workflow

## Integration Strategy

### Phase 1: Theme System Setup
Convert the theme from `mobile-theme.md` into React Native theme files.

**Location**: `mobile/src/theme/`

**Files to create**:
- `colors.ts` - Color palette from spec
- `typography.ts` - Typography system
- `spacing.ts` - Spacing tokens
- `borders.ts` - Border radius and widths
- `shadows.ts` - Shadow definitions
- `animations.ts` - Animation configurations
- `index.ts` - Theme exports

### Phase 2: Component Library
Create reusable components from `ui-components.md` spec.

**Location**: `mobile/src/components/`

**Components to create**:
- `common/GlassCard.tsx` - Glass morphism card
- `common/NeuButton.tsx` - Neumorphic button
- `common/MilestoneBadge.tsx` - Milestone badge component
- `recovery/RecoveryProgramCard.tsx` - Recovery program display
- `recovery/RecoveryTimeDisplay.tsx` - Time calculation display
- `friends/FriendCard.tsx` - Friend list item
- `friends/FriendAvatar.tsx` - Avatar with badge

### Phase 3: Screen Conversion
Convert each screen from the JSX file to React Native.

**Location**: `mobile/src/screens/`

**Screens to create**:
1. `Landing/LandingScreen.tsx` - Welcome/onboarding screen
2. `Profile/ProfileScreen.tsx` - User profile management
3. `Friends/FriendsListScreen.tsx` - Friends list
4. `Friends/EditFriendScreen.tsx` - Edit friend details

### Phase 4: Navigation Setup
Set up React Navigation with the screen flow.

**Location**: `mobile/src/navigation/`

**Files to create**:
- `AppNavigator.tsx` - Main navigation structure
- `types.ts` - Navigation type definitions

## Key Conversion Differences

### Web → React Native

| Web (JSX) | React Native |
|-----------|--------------|
| `div` | `View` |
| `button` | `Pressable` or `TouchableOpacity` |
| `input` | `TextInput` |
| `select` | `Picker` or custom modal |
| `textarea` | `TextInput` with `multiline` |
| CSS classes | `StyleSheet.create()` |
| `onClick` | `onPress` |
| `onMouseEnter` | Not available (use press states) |
| CSS gradients | `react-native-linear-gradient` |
| CSS animations | `react-native-reanimated` or `Animated` API |
| `lucide-react` icons | `react-native-vector-icons` |

### Dependencies Needed

Add to `mobile/package.json`:
```json
{
  "dependencies": {
    "react-native-linear-gradient": "^2.8.3",
    "react-native-reanimated": "^3.6.0",
    "@react-native-community/datetimepicker": "^7.6.0"
  }
}
```

## Spec-Driven Workflow Integration

### 1. Design Specs as Source of Truth
- All design decisions come from `specs/design/mobile/`
- Theme values from `mobile-theme.md`
- Component specs from `ui-components.md`
- Screen layouts from `mobile-screens.md`

### 2. Type Generation
- Use existing entity types from `mobile/src/types/entities/`
- Generate new types if needed from specs
- Keep types in sync with backend

### 3. Implementation Order

1. **Theme System** (Foundation)
   - Create theme files
   - Test theme values match spec

2. **Common Components** (Building blocks)
   - GlassCard, NeuButton, MilestoneBadge
   - Test components in isolation

3. **Recovery Components** (Domain-specific)
   - RecoveryProgramCard, RecoveryTimeDisplay
   - Use entity types

4. **Screens** (Full features)
   - Convert one screen at a time
   - Use components and theme
   - Connect to navigation

5. **Navigation** (Integration)
   - Wire up all screens
   - Test navigation flow

## File Structure

```
mobile/src/
├── theme/                    # Theme system (from mobile-theme.md)
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── borders.ts
│   ├── shadows.ts
│   ├── animations.ts
│   └── index.ts
├── components/               # Reusable components (from ui-components.md)
│   ├── common/
│   │   ├── GlassCard.tsx
│   │   ├── NeuButton.tsx
│   │   └── MilestoneBadge.tsx
│   ├── recovery/
│   │   ├── RecoveryProgramCard.tsx
│   │   └── RecoveryTimeDisplay.tsx
│   └── friends/
│       ├── FriendCard.tsx
│       └── FriendAvatar.tsx
├── screens/                  # Screen components (from JSX)
│   ├── Landing/
│   │   ├── LandingScreen.tsx
│   │   └── LandingScreen.styles.ts
│   ├── Profile/
│   │   ├── ProfileScreen.tsx
│   │   └── ProfileScreen.styles.ts
│   └── Friends/
│       ├── FriendsListScreen.tsx
│       ├── EditFriendScreen.tsx
│       └── Friends.styles.ts
├── navigation/               # Navigation setup
│   ├── AppNavigator.tsx
│   └── types.ts
└── utils/                    # Helper functions
    ├── timeCalculations.ts
    └── milestoneHelpers.ts
```

## Next Steps

1. ✅ Review this guide
2. Set up theme system
3. Create common components
4. Convert screens one by one
5. Set up navigation
6. Test and iterate

## Reference Files

- **Design Specs**: `specs/design/mobile/`
- **Web Component**: `otr-milestone-tracker.jsx` (root directory)
- **Entity Types**: `mobile/src/types/entities/`
- **Design Guide**: `docs/DESIGN_ASSISTANCE_GUIDE.md`

