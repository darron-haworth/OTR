/**
 * Animation Configurations
 * Generated from specs/design/mobile/mobile-theme.md
 * 
 * Note: For react-native-reanimated, import Easing from 'react-native-reanimated'
 * For react-native Animated API, import Easing from 'react-native'
 */

export const animations = {
  duration: {
    instant: 0,
    fast: 200,
    normal: 300,
    slow: 500,
    verySlow: 1000,
  },
  
  // Easing functions - import from react-native-reanimated when using
  easing: {
    // These will be imported from react-native-reanimated
    // linear: Easing.linear,
    // easeIn: Easing.ease,
    // easeOut: Easing.out(Easing.ease),
    // easeInOut: Easing.inOut(Easing.ease),
    spring: {
      damping: 15,
      mass: 1,
      stiffness: 150,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    },
  },
  
  // Predefined animation configurations
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
      keyframes: [
        { transform: [{ scale: 1 }, { rotate: '0deg' }] },
        { transform: [{ scale: 1.1 }, { rotate: '-5deg' }] },
        { transform: [{ scale: 0.95 }, { rotate: '5deg' }] },
        { transform: [{ scale: 1.05 }, { rotate: '-3deg' }] },
        { transform: [{ scale: 1 }, { rotate: '0deg' }] },
      ],
      duration: 600,
    },
  },
} as const;

