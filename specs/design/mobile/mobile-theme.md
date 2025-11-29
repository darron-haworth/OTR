# Mobile Theme Specification

## Color System

### Primary Palette
```typescript
export const colors = {
  // Brand Colors
  primary: '#E63946',     // Strong red - courage and vitality
  secondary: '#1D3557',   // Deep navy - stability and trust
  accent: '#F77F00',      // Bold orange - energy and optimism
  tertiary: '#06A77D',    // Forest green - growth and renewal
  
  // Neutral Colors
  dark: '#0D1B2A',        // Rich black-blue
  light: '#F1FAEE',       // Clean off-white
  surface: '#FFFFFF',     // Pure white
  
  // Semantic Colors
  error: '#C53030',
  errorLight: '#FEB2B2',
  warning: '#F77F00',
  warningLight: '#FFD4A3',
  success: '#06A77D',
  successLight: '#9AE6B4',
  info: '#1D3557',
  infoLight: '#90CDF4',
  
  // Gray Scale
  gray: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
  
  // Transparency
  overlay: 'rgba(0, 0, 0, 0.5)',
  backdrop: 'rgba(255, 255, 255, 0.95)',
  glassLight: 'rgba(255, 255, 255, 0.9)',
  glassDark: 'rgba(29, 53, 87, 0.1)',
};

// Gradient Definitions (for react-native-linear-gradient)
export const gradients = {
  warm: {
    colors: ['#E63946', '#F77F00'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  cool: {
    colors: ['#1D3557', '#457B9D'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  soft: {
    colors: ['rgba(29,53,87,0.05)', 'rgba(6,167,125,0.05)'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  success: {
    colors: ['#06A77D', '#0FC290'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
};
```

## Typography System

```typescript
import { Platform } from 'react-native';

export const typography = {
  // Font Families
  fontFamily: {
    display: Platform.select({
      ios: 'Playfair Display',
      android: 'PlayfairDisplay-Regular',
      default: 'serif',
    }),
    displayBold: Platform.select({
      ios: 'Playfair Display-Bold',
      android: 'PlayfairDisplay-Bold',
      default: 'serif',
    }),
    body: Platform.select({
      ios: 'DM Sans',
      android: 'DMSans-Regular',
      default: 'sans-serif',
    }),
    bodyMedium: Platform.select({
      ios: 'DM Sans-Medium',
      android: 'DMSans-Medium',
      default: 'sans-serif',
    }),
    bodyBold: Platform.select({
      ios: 'DM Sans-Bold',
      android: 'DMSans-Bold',
      default: 'sans-serif',
    }),
    mono: Platform.select({
      ios: 'Space Mono',
      android: 'SpaceMono-Regular',
      default: 'monospace',
    }),
  },
  
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 2,
  },
  
  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
  
  // Text Styles
  styles: {
    h1: {
      fontFamily: 'displayBold',
      fontSize: 36,
      lineHeight: 1.2,
      letterSpacing: -0.5,
      color: colors.dark,
    },
    h2: {
      fontFamily: 'displayBold',
      fontSize: 30,
      lineHeight: 1.3,
      letterSpacing: -0.3,
      color: colors.dark,
    },
    h3: {
      fontFamily: 'display',
      fontSize: 24,
      lineHeight: 1.4,
      color: colors.dark,
    },
    h4: {
      fontFamily: 'bodyBold',
      fontSize: 20,
      lineHeight: 1.5,
      color: colors.dark,
    },
    body: {
      fontFamily: 'body',
      fontSize: 16,
      lineHeight: 1.6,
      color: colors.dark,
    },
    bodySmall: {
      fontFamily: 'body',
      fontSize: 14,
      lineHeight: 1.5,
      color: colors.gray[600],
    },
    caption: {
      fontFamily: 'body',
      fontSize: 12,
      lineHeight: 1.4,
      color: colors.gray[500],
    },
    button: {
      fontFamily: 'bodyBold',
      fontSize: 16,
      letterSpacing: 0.5,
      textTransform: 'none',
    },
    link: {
      fontFamily: 'bodyMedium',
      fontSize: 16,
      color: colors.primary,
      textDecorationLine: 'underline',
    },
  },
};
```

## Spacing System

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
  
  // Component-specific spacing
  padding: {
    card: 16,
    screen: 20,
    button: 12,
    input: 12,
  },
  
  margin: {
    section: 24,
    element: 16,
    small: 8,
  },
};
```

## Border & Radius System

```typescript
export const borders = {
  width: {
    thin: 1,
    default: 2,
    thick: 3,
  },
  
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    full: 9999,
    
    // Component-specific radius
    card: 20,
    button: 12,
    input: 12,
    badge: 50,
    avatar: 9999,
  },
};
```

## Shadow System

```typescript
export const shadows = {
  sm: {
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  
  // Special shadows
  colored: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  }),
  
  neumorphic: {
    light: {
      shadowColor: '#FFFFFF',
      shadowOffset: { width: -6, height: -6 },
      shadowOpacity: 0.9,
      shadowRadius: 12,
    },
    dark: {
      shadowColor: colors.gray[400],
      shadowOffset: { width: 6, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
    },
  },
};
```

## Animation Configurations

```typescript
import { Easing } from 'react-native-reanimated';

export const animations = {
  duration: {
    instant: 0,
    fast: 200,
    normal: 300,
    slow: 500,
    verySlow: 1000,
  },
  
  easing: {
    linear: Easing.linear,
    easeIn: Easing.ease,
    easeOut: Easing.out(Easing.ease),
    easeInOut: Easing.inOut(Easing.ease),
    spring: {
      damping: 15,
      mass: 1,
      stiffness: 150,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    },
  },
  
  // Predefined animations
  presets: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: 300,
    },
    slideInRight: {
      from: { translateX: 100, opacity: 0 },
      to: { translateX: 0, opacity: 1 },
      duration: 300,
    },
    scaleIn: {
      from: { scale: 0.8, opacity: 0 },
      to: { scale: 1, opacity: 1 },
      duration: 200,
    },
    celebrate: {
      0: { transform: [{ scale: 1 }, { rotate: '0deg' }] },
      0.1: { transform: [{ scale: 1.1 }, { rotate: '-5deg' }] },
      0.2: { transform: [{ scale: 0.95 }, { rotate: '5deg' }] },
      0.3: { transform: [{ scale: 1.05 }, { rotate: '-3deg' }] },
      0.4: { transform: [{ scale: 1 }, { rotate: '0deg' }] },
      1: { transform: [{ scale: 1 }, { rotate: '0deg' }] },
      duration: 600,
    },
  },
};
```

## Component Style Presets

```typescript
export const componentStyles = {
  // Glass Card
  glassCard: {
    backgroundColor: colors.glassLight,
    borderRadius: borders.radius.card,
    borderWidth: 1,
    borderColor: colors.glassDark,
    ...shadows.md,
  },
  
  // Neumorphic Button
  neuButton: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.button,
    padding: spacing.padding.button,
    ...shadows.neumorphic.light,
    ...shadows.neumorphic.dark,
  },
  
  // Primary Button
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: borders.radius.button,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    ...shadows.colored(colors.primary),
  },
  
  // Input Field
  inputField: {
    backgroundColor: colors.surface,
    borderWidth: borders.width.default,
    borderColor: colors.gray[300],
    borderRadius: borders.radius.input,
    paddingVertical: spacing.padding.input,
    paddingHorizontal: spacing.padding.input,
    fontSize: typography.fontSize.base,
    color: colors.dark,
  },
  
  // Avatar
  avatar: {
    width: 60,
    height: 60,
    borderRadius: borders.radius.avatar,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Badge
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 28,
    height: 28,
    borderRadius: borders.radius.badge,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
    ...shadows.sm,
  },
};
```

## Milestone Badge Configurations

```typescript
export const milestones = {
  badges: {
    '1day': { emoji: '🌱', label: 'First Day!', color: colors.success },
    '7days': { emoji: '📅', label: 'One Week!', color: colors.success },
    '14days': { emoji: '💪', label: 'Two Weeks!', color: colors.tertiary },
    '30days': { emoji: '⭐', label: 'One Month!', color: colors.accent },
    '90days': { emoji: '🏆', label: '3 Months!', color: colors.primary },
    '180days': { emoji: '🎖️', label: '6 Months!', color: colors.secondary },
    '270days': { emoji: '🌟', label: '9 Months!', color: colors.accent },
    '365days': { emoji: '🎂', label: 'One Year!', color: colors.primary },
    '730days': { emoji: '👑', label: 'Two Years!', color: colors.secondary },
  },
  
  getNextMilestone: (days: number) => {
    const milestoneKeys = [1, 7, 14, 30, 90, 180, 270, 365, 730];
    return milestoneKeys.find(key => key > days) || null;
  },
};
```

## Recovery Group Configurations

```typescript
export const recoveryGroups = {
  AA: { 
    id: 'aa', 
    name: 'Alcoholics Anonymous', 
    icon: '🌟',
    color: colors.primary,
  },
  NA: { 
    id: 'na', 
    name: 'Narcotics Anonymous', 
    icon: '💎',
    color: colors.secondary,
  },
  GA: { 
    id: 'ga', 
    name: 'Gamblers Anonymous', 
    icon: '🎲',
    color: colors.tertiary,
  },
  OA: { 
    id: 'oa', 
    name: 'Overeaters Anonymous', 
    icon: '🍎',
    color: colors.success,
  },
  OTHER: { 
    id: 'other', 
    name: 'Other Recovery Program', 
    icon: '💪',
    color: colors.accent,
  },
};
```

## Usage Example

```typescript
import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borders, shadows } from '@/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: spacing.padding.screen,
  },
  
  card: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.card,
    padding: spacing.padding.card,
    marginBottom: spacing.margin.element,
    ...shadows.md,
  },
  
  title: {
    ...typography.styles.h2,
    marginBottom: spacing.md,
  },
  
  button: {
    backgroundColor: colors.primary,
    borderRadius: borders.radius.button,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    ...shadows.colored(colors.primary),
  },
  
  buttonText: {
    ...typography.styles.button,
    color: colors.surface,
    textAlign: 'center',
  },
});
```
