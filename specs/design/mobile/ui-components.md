# UI Components Specification

## Overview
This document defines the UI components for the OTR Milestone Tracker mobile application screens.

## Component Hierarchy

### Screen Components
- `LandingScreen` - Initial onboarding/welcome screen
- `ProfileScreen` - User profile management and recovery programs
- `FriendsListScreen` - Recovery friends list and management
- `EditFriendScreen` - Friend profile editing interface

## Recommended File Structure

```
mobile/
├── src/
│   ├── screens/
│   │   ├── Landing/
│   │   │   ├── LandingScreen.tsx
│   │   │   ├── LandingScreen.styles.ts
│   │   │   └── index.ts
│   │   ├── Profile/
│   │   │   ├── ProfileScreen.tsx
│   │   │   ├── ProfileScreen.styles.ts
│   │   │   └── index.ts
│   │   ├── Friends/
│   │   │   ├── FriendsListScreen.tsx
│   │   │   ├── EditFriendScreen.tsx
│   │   │   ├── Friends.styles.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── components/
│   │   ├── common/
│   │   │   ├── GlassCard.tsx
│   │   │   ├── NeuButton.tsx
│   │   │   ├── MilestoneBadge.tsx
│   │   │   └── index.ts
│   │   ├── recovery/
│   │   │   ├── RecoveryProgramCard.tsx
│   │   │   ├── RecoveryTimeDisplay.tsx
│   │   │   ├── ProgramSelector.tsx
│   │   │   └── index.ts
│   │   └── friends/
│   │       ├── FriendCard.tsx
│   │       ├── FriendAvatar.tsx
│   │       ├── AddFriendForm.tsx
│   │       └── index.ts
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── animations.ts
│   │   └── index.ts
│   ├── constants/
│   │   ├── recoveryGroups.ts
│   │   ├── milestones.ts
│   │   └── index.ts
│   └── utils/
│       ├── timeCalculations.ts
│       ├── milestoneHelpers.ts
│       └── index.ts
```

## Specification Files Placement

### 1. Design Specifications
**Location**: `specs/design/mobile/`

Create these new files:
- `specs/design/mobile/screens.md` - Screen layouts and navigation
- `specs/design/mobile/components.md` - Reusable component specs
- `specs/design/mobile/theme.md` - Complete theme specification
- `specs/design/mobile/animations.md` - Animation and interaction specs

### 2. Feature Specifications
**Location**: `specs/features/ui/`

Create these new files:
- `specs/features/ui/landing-screen.md` - Landing screen requirements
- `specs/features/ui/profile-management-ui.md` - Profile UI specifications
- `specs/features/ui/friends-management-ui.md` - Friends UI specifications

### 3. Component Documentation
**Location**: `docs/UI_COMPONENTS.md`

Create a comprehensive component guide in the docs folder.

## Implementation Notes

### Converting to React Native

The provided React web components need to be converted to React Native:

1. **Replace HTML elements** with React Native components:
   - `div` → `View`
   - `button` → `TouchableOpacity` or `Pressable`
   - `input` → `TextInput`
   - `select` → `Picker` or custom modal
   - `textarea` → `TextInput` with `multiline`

2. **Replace CSS styles** with React Native StyleSheet:
   - Use `StyleSheet.create()` for performance
   - Convert web CSS to React Native style properties
   - Replace gradients with `react-native-linear-gradient`

3. **Replace web-specific features**:
   - Remove hover effects (use press states instead)
   - Replace CSS animations with React Native Animated API
   - Use `react-native-vector-icons` for icons

4. **Navigation**:
   - Implement with `@react-navigation/native`
   - Use stack navigator for screen transitions

## Theme Specification

```typescript
// mobile/src/theme/colors.ts
export const colors = {
  primary: '#E63946',     // Strong red - courage and vitality
  secondary: '#1D3557',   // Deep navy - stability and trust
  accent: '#F77F00',      // Bold orange - energy and optimism
  tertiary: '#06A77D',    // Forest green - growth and renewal
  dark: '#0D1B2A',        // Rich black-blue
  light: '#F1FAEE',       // Clean off-white
  surface: '#FFFFFF',
  
  // Semantic colors
  error: '#C53030',
  warning: '#F77F00',
  success: '#06A77D',
  info: '#1D3557',
  
  // Gradients (use with LinearGradient component)
  gradients: {
    warm: ['#E63946', '#F77F00'],
    cool: ['#1D3557', '#457B9D'],
    soft: ['rgba(29,53,87,0.05)', 'rgba(6,167,125,0.05)']
  }
};
```

## Data Model Integration

The UI components should integrate with the existing data models defined in:
- `specs/data-models/entities/user-profile.md`
- `specs/data-models/entities/friend.md`

Ensure type safety by creating TypeScript interfaces that match the specifications.

## Next Steps

1. Create the specification files in the recommended locations
2. Set up the React Native project structure in `mobile/src/`
3. Convert the React web components to React Native
4. Implement navigation structure
5. Add state management (Redux Toolkit or Context API)
6. Connect to backend APIs as defined in `specs/api/`
