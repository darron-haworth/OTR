/**
 * Color System
 * Generated from specs/design/mobile/mobile-theme.md
 */

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
} as const;

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
} as const;

