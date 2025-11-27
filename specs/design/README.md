# Design Specifications

This directory contains design specifications, brand guidelines, and platform-specific UI requirements.

## Structure

```
design/
├── README.md              # This file
├── android/               # Android-specific brand assets and guidelines
│   ├── brand-assets.md    # App icons, splash screens, adaptive icons
│   ├── theme-colors.md    # Material Design color palette
│   └── typography.md      # Font specifications
├── ios/                   # iOS-specific brand assets and guidelines
│   ├── brand-assets.md    # App icons, launch screens, assets
│   ├── colors.md          # iOS color palette
│   └── typography.md      # Font specifications
└── shared/                # Shared design tokens
    ├── colors.md          # Shared color palette
    ├── typography.md      # Shared typography system
    ├── spacing.md         # Spacing and layout tokens
    └── components.md      # Component design specifications
```

## Purpose

These specifications ensure:
- **Consistency**: Brand assets are consistent across platforms
- **Completeness**: All required assets are documented and created
- **Maintainability**: Design decisions are documented for future reference
- **Onboarding**: New designers/developers understand brand requirements

## Usage

1. **Before creating assets**: Review the relevant platform spec
2. **When updating assets**: Update the spec to reflect changes
3. **For implementation**: Reference these specs when configuring native projects

## Platform-Specific Notes

### Android
- Material Design 3 guidelines
- Adaptive icons (foreground + background layers)
- Multiple density requirements (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi)
- Notification icons (white/transparent)
- Splash screen API (Android 12+)

### iOS
- Human Interface Guidelines compliance
- App icon sizes (all required sizes)
- Launch screen (storyboard or static)
- Asset catalog organization
- Dark mode support

