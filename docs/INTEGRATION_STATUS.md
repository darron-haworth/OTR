# Integration Status: JSX to React Native

## ✅ Completed

### 1. Integration Guide Created
- **File**: `docs/INTEGRATION_GUIDE_JSX_TO_RN.md`
- Comprehensive guide explaining the conversion strategy
- Phase-by-phase implementation plan
- Key differences between web and React Native

### 2. Theme System Implemented
- **Location**: `mobile/src/theme/`
- All theme files created from `specs/design/mobile/mobile-theme.md`:
  - ✅ `colors.ts` - Color palette and gradients
  - ✅ `typography.ts` - Font families, sizes, text styles
  - ✅ `spacing.ts` - Spacing tokens
  - ✅ `borders.ts` - Border radius and widths
  - ✅ `shadows.ts` - Shadow definitions
  - ✅ `animations.ts` - Animation configurations
  - ✅ `constants.ts` - Milestones and recovery groups
  - ✅ `index.ts` - Central theme exports

## 📋 Next Steps

### Phase 2: Component Library (Recommended Next)
Create reusable components from `specs/design/mobile/ui-components.md`:

1. **Common Components** (`mobile/src/components/common/`):
   - `GlassCard.tsx` - Glass morphism card component
   - `NeuButton.tsx` - Neumorphic button
   - `MilestoneBadge.tsx` - Milestone badge display

2. **Recovery Components** (`mobile/src/components/recovery/`):
   - `RecoveryProgramCard.tsx` - Recovery program display
   - `RecoveryTimeDisplay.tsx` - Time calculation display

3. **Friends Components** (`mobile/src/components/friends/`):
   - `FriendCard.tsx` - Friend list item
   - `FriendAvatar.tsx` - Avatar with badge overlay

### Phase 3: Screen Conversion
Convert screens from `otr-milestone-tracker.jsx`:

1. **Landing Screen** (`mobile/src/screens/Landing/`)
   - Convert from JSX LandingScreen component
   - Use theme and common components

2. **Profile Screen** (`mobile/src/screens/Profile/`)
   - Convert from JSX ProfileScreen component
   - Integrate with user profile entity types

3. **Friends List Screen** (`mobile/src/screens/Friends/`)
   - Convert from JSX FriendsScreen component
   - Use Friend entity types

4. **Edit Friend Screen** (`mobile/src/screens/Friends/`)
   - Convert from JSX EditFriendScreen component

### Phase 4: Navigation Setup
Set up React Navigation:
- `mobile/src/navigation/AppNavigator.tsx`
- Wire up all screens
- Configure navigation flow

## 📦 Required Dependencies

**⚠️ IMPORTANT**: The components use `react-native-linear-gradient` which needs to be installed.

Add these to `mobile/package.json`:

```json
{
  "dependencies": {
    "react-native-linear-gradient": "^2.8.3",
    "react-native-reanimated": "^3.6.0",
    "@react-native-community/datetimepicker": "^7.6.0"
  }
}
```

Then run:
```bash
cd mobile
npm install

# For iOS (macOS only)
cd ios && pod install && cd ..
```

## 🔄 Spec-Driven Workflow

### Current State
- ✅ Design specs in `specs/design/mobile/`
- ✅ Theme system implemented from specs
- ⏳ Components need to be created from specs
- ⏳ Screens need to be converted from JSX

### Workflow
1. **Reference Specs**: All design decisions come from `specs/design/mobile/`
2. **Use Theme**: Import from `@/theme` (configured in tsconfig.json)
3. **Type Safety**: Use entity types from `mobile/src/types/entities/`
4. **Component First**: Build reusable components before screens

## 📁 File Structure

```
mobile/src/
├── theme/                    ✅ COMPLETE
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── borders.ts
│   ├── shadows.ts
│   ├── animations.ts
│   ├── constants.ts
│   └── index.ts
├── components/               ⏳ TODO
│   ├── common/
│   ├── recovery/
│   └── friends/
├── screens/                  ⏳ TODO
│   ├── Landing/
│   ├── Profile/
│   └── Friends/
└── navigation/               ⏳ TODO
    └── AppNavigator.tsx
```

## 🎯 Quick Start Commands

```bash
# Install dependencies
cd mobile
npm install react-native-linear-gradient react-native-reanimated @react-native-community/datetimepicker

# For iOS (macOS only)
cd ios && pod install && cd ..

# Run the app
npm run android  # or npm run ios
```

## 📚 Reference Files

- **Integration Guide**: `docs/INTEGRATION_GUIDE_JSX_TO_RN.md`
- **Design Specs**: `specs/design/mobile/`
- **Web Component**: `otr-milestone-tracker.jsx` (root)
- **Entity Types**: `mobile/src/types/entities/`
- **Design Assistance**: `docs/DESIGN_ASSISTANCE_GUIDE.md`

## 💡 Tips

1. **Start with Components**: Build reusable components first, then use them in screens
2. **Use Theme**: Always import from `@/theme` instead of hardcoding values
3. **Type Safety**: Use entity types from `mobile/src/types/entities/`
4. **Test Incrementally**: Test each component/screen as you build it
5. **Follow Specs**: Reference `specs/design/mobile/` for all design decisions

