# Android Brand Assets Specification

**Last Updated:** 2024-11-27  
**Platform:** Android  
**App Name:** Our Time Recovered  
**Package:** `com.ourtimerecovered.app`

---

## Overview

This document specifies all Android brand assets required for the app, including app icons, splash screens, adaptive icons, and notification assets.

---

## App Icon

### Standard Launcher Icons

**Location:** `mobile/android/app/src/main/res/mipmap-{density}/ic_launcher.png`

| Density | Size (px) | Status |
|---------|-----------|--------|
| mdpi    | 48×48     | ✅ Created |
| hdpi    | 72×72     | ✅ Created |
| xhdpi   | 96×96     | ✅ Created |
| xxhdpi  | 144×144   | ✅ Created |
| xxxhdpi | 192×192   | ✅ Created |

**Design Requirements:**
- Square icon with safe zone (inner 80% for content)
- No transparency (use solid background)
- Material Design guidelines compliant
- High contrast for visibility on various backgrounds

### Round Launcher Icons

**Location:** `mobile/android/app/src/main/res/mipmap-{density}/ic_launcher_round.png`

| Density | Size (px) | Status |
|---------|-----------|--------|
| mdpi    | 48×48     | ✅ Created |
| hdpi    | 72×72     | ✅ Created |
| xhdpi   | 96×96     | ✅ Created |
| xxhdpi  | 144×144   | ✅ Created |
| xxxhdpi | 192×192   | ✅ Created |

**Design Requirements:**
- Circular icon optimized for round launchers
- Same design as standard icon, adjusted for circular frame
- Content should work well in circular format

---

## Adaptive Icon (Android 8.0+)

**Status:** ⚠️ **TODO - Not yet implemented**

**Location:** `mobile/android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml`

### Requirements

Adaptive icons consist of two layers:
1. **Foreground Layer** (`ic_launcher_foreground.png`)
   - Size: 108×108 dp (432×432 px for xxxhdpi)
   - Safe zone: Inner 66×66 dp (264×264 px for xxxhdpi)
   - Content should be centered
   - Can have transparency

2. **Background Layer** (`ic_launcher_background.png`)
   - Size: 108×108 dp (432×432 px for xxxhdpi)
   - No transparency (solid color or pattern)
   - Can be a gradient or image

**Densities Required:**
- mdpi: 108×108 px
- hdpi: 162×162 px
- xhdpi: 216×216 px
- xxhdpi: 324×324 px
- xxxhdpi: 432×432 px

**XML Configuration:**
```xml
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
```

---

## Splash Screen / Launch Screen

**Status:** ⚠️ **TODO - Not yet implemented**

### Android 12+ Splash Screen API

**Location:** `mobile/android/app/src/main/res/values/styles.xml` and drawable resources

**Requirements:**
- Splash screen icon (centered)
- Background color
- Animation (optional)
- Brand colors consistent with app theme

**Implementation:**
- Use `androidx.core:core-splashscreen` library
- Configure in `styles.xml` with `Theme.SplashScreen`
- Icon: 200×200 dp (800×800 px for xxxhdpi)
- Background: Solid color or gradient

### Legacy Splash Screen (Pre-Android 12)

**Location:** `mobile/android/app/src/main/res/drawable/splash_screen.xml`

**Requirements:**
- Full-screen drawable
- App logo centered
- Brand colors
- Simple, fast-loading design

---

## Notification Icons

**Status:** ⚠️ **TODO - Not yet implemented**

**Location:** `mobile/android/app/src/main/res/drawable/ic_notification.png`

### Requirements

| Type | Size | Color | Status |
|------|------|-------|--------|
| Small icon | 24×24 dp (96×96 px xxxhdpi) | White/Transparent | ⚠️ TODO |
| Large icon | 256×256 dp (1024×1024 px xxxhdpi) | Full color | ⚠️ TODO |

**Design Guidelines:**
- Small icon: White silhouette on transparent background
- Material Design notification icon guidelines
- High contrast for visibility
- Simple, recognizable shape

---

## Shortcut Icons

**Status:** ⚠️ **TODO - Not yet implemented**

**Location:** `mobile/android/app/src/main/res/mipmap-{density}/ic_shortcut_*.png`

### Requirements

For app shortcuts (long-press on launcher icon):
- Size: 48×48 dp (192×192 px for xxxhdpi)
- All densities required
- Can be monochrome or colored
- Should represent the shortcut action

**Potential Shortcuts:**
- Add Milestone
- View Friends
- View Profile
- (Add more as features are implemented)

---

## Status Bar & Navigation Bar

**Status:** ⚠️ **TODO - Configure in theme**

**Configuration Location:** `mobile/android/app/src/main/res/values/styles.xml`

### Status Bar
- Color: Match app theme
- Icons: Light or dark based on background
- Translucent: Configure per screen

### Navigation Bar
- Color: Match app theme
- Icons: Light or dark based on background
- Gesture navigation support

---

## Asset Generation Guidelines

### Tools
- **Design Tool:** Figma, Sketch, or Adobe XD
- **Export:** Use Android Asset Studio or manual export
- **Format:** PNG (24-bit with alpha channel where needed)

### Naming Convention
- Use lowercase with underscores: `ic_launcher.png`
- Prefix with `ic_` for icons
- Include density in folder name, not filename

### Quality Checklist
- [ ] All densities created
- [ ] No compression artifacts
- [ ] Proper safe zones respected
- [ ] High contrast for visibility
- [ ] Tested on various Android launchers
- [ ] Adaptive icon layers properly separated
- [ ] Notification icons are white/transparent

---

## Current Status

| Asset Type | Status | Notes |
|------------|--------|-------|
| Standard Launcher Icons | ✅ Complete | Default React Native icons (need custom design) |
| Round Launcher Icons | ✅ Complete | Default React Native icons (need custom design) |
| Adaptive Icon | ❌ Not Implemented | Required for Android 8.0+ |
| Splash Screen | ❌ Not Implemented | Required for Android 12+ |
| Notification Icons | ❌ Not Implemented | Needed for notifications |
| Shortcut Icons | ❌ Not Implemented | Optional, but recommended |

---

## Next Steps

1. **Design Custom App Icon**
   - Create icon design following Material Design guidelines
   - Export all density variants
   - Replace default React Native icons

2. **Create Adaptive Icon**
   - Design foreground and background layers
   - Export all densities
   - Configure `ic_launcher.xml`

3. **Design Splash Screen**
   - Create splash screen design
   - Implement Android 12+ Splash Screen API
   - Add legacy support for older Android versions

4. **Create Notification Icons**
   - Design white/transparent notification icon
   - Export all densities
   - Add to drawable resources

---

## References

- [Material Design Icons](https://material.io/design/iconography/product-icons.html)
- [Android Adaptive Icons](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive)
- [Android Splash Screen API](https://developer.android.com/develop/ui/views/launch/splash-screen)
- [Android Notification Icons](https://material.io/design/iconography/product-icons.html#notification-icons)

