/**
 * Border & Radius System
 * Generated from specs/design/mobile/mobile-theme.md
 */

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
} as const;

