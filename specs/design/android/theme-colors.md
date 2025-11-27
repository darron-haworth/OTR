# Android Theme Colors Specification

**Last Updated:** 2024-11-27  
**Platform:** Android  
**Material Design Version:** Material Design 3

---

## Overview

This document specifies the color palette for the Android app, following Material Design 3 (Material You) guidelines.

---

## Color System

### Primary Colors

**Status:** ⚠️ **TODO - Define brand colors**

| Color Name | Hex Code | Usage | Status |
|------------|----------|-------|--------|
| Primary | `#TBD` | Main brand color, buttons, links | ⚠️ TODO |
| Primary Variant | `#TBD` | Lighter shade of primary | ⚠️ TODO |
| On Primary | `#TBD` | Text/icons on primary background | ⚠️ TODO |
| Primary Container | `#TBD` | Container backgrounds | ⚠️ TODO |
| On Primary Container | `#TBD` | Text/icons on primary container | ⚠️ TODO |

### Secondary Colors

| Color Name | Hex Code | Usage | Status |
|------------|----------|-------|--------|
| Secondary | `#TBD` | Secondary actions, accents | ⚠️ TODO |
| Secondary Variant | `#TBD` | Lighter shade of secondary | ⚠️ TODO |
| On Secondary | `#TBD` | Text/icons on secondary background | ⚠️ TODO |
| Secondary Container | `#TBD` | Container backgrounds | ⚠️ TODO |
| On Secondary Container | `#TBD` | Text/icons on secondary container | ⚠️ TODO |

### Tertiary Colors

| Color Name | Hex Code | Usage | Status |
|------------|----------|-------|--------|
| Tertiary | `#TBD` | Tertiary accents | ⚠️ TODO |
| On Tertiary | `#TBD` | Text/icons on tertiary background | ⚠️ TODO |
| Tertiary Container | `#TBD` | Container backgrounds | ⚠️ TODO |
| On Tertiary Container | `#TBD` | Text/icons on tertiary container | ⚠️ TODO |

### Error Colors

| Color Name | Hex Code | Usage | Status |
|------------|----------|-------|--------|
| Error | `#B00020` | Error states, validation | ⚠️ TODO |
| On Error | `#FFFFFF` | Text/icons on error background | ⚠️ TODO |
| Error Container | `#FDEAEA` | Error container backgrounds | ⚠️ TODO |
| On Error Container | `#B00020` | Text/icons on error container | ⚠️ TODO |

### Surface Colors

| Color Name | Hex Code | Usage | Status |
|------------|----------|-------|--------|
| Surface | `#FFFFFF` | Main surface color | ⚠️ TODO |
| On Surface | `#1C1B1F` | Text/icons on surface | ⚠️ TODO |
| Surface Variant | `#E7E0EC` | Variant surfaces | ⚠️ TODO |
| On Surface Variant | `#49454F` | Text/icons on surface variant | ⚠️ TODO |
| Surface Container | `#F7F2FA` | Container surfaces | ⚠️ TODO |
| On Surface Container | `#1C1B1F` | Text/icons on surface container | ⚠️ TODO |

### Background Colors

| Color Name | Hex Code | Usage | Status |
|------------|----------|-------|--------|
| Background | `#FFFBFE` | App background | ⚠️ TODO |
| On Background | `#1C1B1F` | Text/icons on background | ⚠️ TODO |

### Outline Colors

| Color Name | Hex Code | Usage | Status |
|------------|----------|-------|--------|
| Outline | `#79747E` | Borders, dividers | ⚠️ TODO |
| Outline Variant | `#CAC4D0` | Variant borders | ⚠️ TODO |

---

## Dark Theme Colors

**Status:** ⚠️ **TODO - Define dark theme palette**

All colors above should have dark theme variants defined.

**Location:** `mobile/android/app/src/main/res/values-night/colors.xml`

---

## Implementation

### Colors Resource File

**Location:** `mobile/android/app/src/main/res/values/colors.xml`

**Current Status:** ⚠️ **TODO - Create colors.xml**

**Structure:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Primary Colors -->
    <color name="primary">#TBD</color>
    <color name="primary_variant">#TBD</color>
    <color name="on_primary">#TBD</color>
    <color name="primary_container">#TBD</color>
    <color name="on_primary_container">#TBD</color>
    
    <!-- Secondary Colors -->
    <color name="secondary">#TBD</color>
    <color name="secondary_variant">#TBD</color>
    <color name="on_secondary">#TBD</color>
    <color name="secondary_container">#TBD</color>
    <color name="on_secondary_container">#TBD</color>
    
    <!-- Error Colors -->
    <color name="error">#B00020</color>
    <color name="on_error">#FFFFFF</color>
    <color name="error_container">#FDEAEA</color>
    <color name="on_error_container">#B00020</color>
    
    <!-- Surface Colors -->
    <color name="surface">#FFFFFF</color>
    <color name="on_surface">#1C1B1F</color>
    <color name="surface_variant">#E7E0EC</color>
    <color name="on_surface_variant">#49454F</color>
    
    <!-- Background Colors -->
    <color name="background">#FFFBFE</color>
    <color name="on_background">#1C1B1F</color>
    
    <!-- Outline Colors -->
    <color name="outline">#79747E</color>
    <color name="outline_variant">#CAC4D0</color>
</resources>
```

### Theme Configuration

**Location:** `mobile/android/app/src/main/res/values/styles.xml`

**Current Status:** ⚠️ **TODO - Update theme with colors**

**Example:**
```xml
<style name="AppTheme" parent="Theme.Material3.DayNight.NoActionBar">
    <!-- Primary Colors -->
    <item name="colorPrimary">@color/primary</item>
    <item name="colorOnPrimary">@color/on_primary</item>
    <item name="colorPrimaryContainer">@color/primary_container</item>
    <item name="colorOnPrimaryContainer">@color/on_primary_container</item>
    
    <!-- Secondary Colors -->
    <item name="colorSecondary">@color/secondary</item>
    <item name="colorOnSecondary">@color/on_secondary</item>
    <item name="colorSecondaryContainer">@color/secondary_container</item>
    <item name="colorOnSecondaryContainer">@color/on_secondary_container</item>
    
    <!-- Error Colors -->
    <item name="colorError">@color/error</item>
    <item name="colorOnError">@color/on_error</item>
    <item name="colorErrorContainer">@color/error_container</item>
    <item name="colorOnErrorContainer">@color/on_error_container</item>
    
    <!-- Surface Colors -->
    <item name="colorSurface">@color/surface</item>
    <item name="colorOnSurface">@color/on_surface</item>
    <item name="colorSurfaceVariant">@color/surface_variant</item>
    <item name="colorOnSurfaceVariant">@color/on_surface_variant</item>
    
    <!-- Background Colors -->
    <item name="android:colorBackground">@color/background</item>
    <item name="colorOnBackground">@color/on_background</item>
    
    <!-- Status Bar -->
    <item name="android:statusBarColor">@color/surface</item>
    <item name="android:windowLightStatusBar">true</item>
</style>
```

---

## Color Accessibility

### Contrast Ratios

All color combinations must meet WCAG 2.1 AA standards:
- **Normal text:** 4.5:1 contrast ratio
- **Large text (18pt+):** 3:1 contrast ratio
- **UI components:** 3:1 contrast ratio

### Color Blindness

Ensure the app is usable for users with:
- Protanopia (red-green color blindness)
- Deuteranopia (red-green color blindness)
- Tritanopia (blue-yellow color blindness)

**Testing Tools:**
- Android Accessibility Scanner
- Color Contrast Analyzer
- Sim Daltonism

---

## Status Bar & Navigation Bar Colors

### Status Bar
- **Light Theme:** Match surface color, dark icons
- **Dark Theme:** Match surface color, light icons
- **Translucent:** Configure per screen if needed

### Navigation Bar
- **Light Theme:** Match surface color, dark icons
- **Dark Theme:** Match surface color, light icons
- **Gesture Navigation:** Support edge-to-edge design

---

## Next Steps

1. **Define Brand Colors**
   - Choose primary brand color
   - Generate Material Design 3 color palette
   - Test accessibility and contrast

2. **Create colors.xml**
   - Add all color definitions
   - Create dark theme variant
   - Test on various devices

3. **Update Theme**
   - Configure Material Design 3 theme
   - Apply colors to theme
   - Test light and dark modes

4. **Test Accessibility**
   - Verify contrast ratios
   - Test with color blindness simulators
   - Use Android Accessibility Scanner

---

## References

- [Material Design 3 Color System](https://m3.material.io/styles/color/the-color-system/overview)
- [Material Theme Builder](https://m3.material.io/theme-builder)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Android Color Resources](https://developer.android.com/guide/topics/resources/color-list-resource)

