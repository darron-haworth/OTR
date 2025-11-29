/**
 * Typography System
 * Generated from specs/design/mobile/mobile-theme.md
 */

import { Platform, TextStyle } from 'react-native';
import { colors } from './colors';

export const typography = {
  // Font Families
  fontFamily: {
    display: Platform.select({
      ios: 'Playfair Display',
      android: 'PlayfairDisplay-Regular',
      default: 'serif',
    }) || 'serif',
    displayBold: Platform.select({
      ios: 'Playfair Display-Bold',
      android: 'PlayfairDisplay-Bold',
      default: 'serif',
    }) || 'serif',
    body: Platform.select({
      ios: 'DM Sans',
      android: 'DMSans-Regular',
      default: 'sans-serif',
    }) || 'sans-serif',
    bodyMedium: Platform.select({
      ios: 'DM Sans-Medium',
      android: 'DMSans-Medium',
      default: 'sans-serif',
    }) || 'sans-serif',
    bodyBold: Platform.select({
      ios: 'DM Sans-Bold',
      android: 'DMSans-Bold',
      default: 'sans-serif',
    }) || 'sans-serif',
    mono: Platform.select({
      ios: 'Space Mono',
      android: 'SpaceMono-Regular',
      default: 'monospace',
    }) || 'monospace',
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
      fontFamily: Platform.select({
        ios: 'Playfair Display-Bold',
        android: 'PlayfairDisplay-Bold',
        default: 'serif',
      }) || 'serif',
      fontSize: 36,
      lineHeight: 43.2, // 36 * 1.2
      letterSpacing: -0.5,
      color: colors.dark,
    } as TextStyle,
    h2: {
      fontFamily: Platform.select({
        ios: 'Playfair Display-Bold',
        android: 'PlayfairDisplay-Bold',
        default: 'serif',
      }) || 'serif',
      fontSize: 30,
      lineHeight: 39, // 30 * 1.3
      letterSpacing: -0.3,
      color: colors.dark,
    } as TextStyle,
    h3: {
      fontFamily: Platform.select({
        ios: 'Playfair Display',
        android: 'PlayfairDisplay-Regular',
        default: 'serif',
      }) || 'serif',
      fontSize: 24,
      lineHeight: 33.6, // 24 * 1.4
      color: colors.dark,
    } as TextStyle,
    h4: {
      fontFamily: Platform.select({
        ios: 'DM Sans-Bold',
        android: 'DMSans-Bold',
        default: 'sans-serif',
      }) || 'sans-serif',
      fontSize: 20,
      lineHeight: 30, // 20 * 1.5
      color: colors.dark,
    } as TextStyle,
    body: {
      fontFamily: Platform.select({
        ios: 'DM Sans',
        android: 'DMSans-Regular',
        default: 'sans-serif',
      }) || 'sans-serif',
      fontSize: 16,
      lineHeight: 25.6, // 16 * 1.6
      color: colors.dark,
    } as TextStyle,
    bodySmall: {
      fontFamily: Platform.select({
        ios: 'DM Sans',
        android: 'DMSans-Regular',
        default: 'sans-serif',
      }) || 'sans-serif',
      fontSize: 14,
      lineHeight: 21, // 14 * 1.5
      color: colors.gray[600],
    } as TextStyle,
    caption: {
      fontFamily: Platform.select({
        ios: 'DM Sans',
        android: 'DMSans-Regular',
        default: 'sans-serif',
      }) || 'sans-serif',
      fontSize: 12,
      lineHeight: 16.8, // 12 * 1.4
      color: colors.gray[500],
    } as TextStyle,
    button: {
      fontFamily: Platform.select({
        ios: 'DM Sans-Bold',
        android: 'DMSans-Bold',
        default: 'sans-serif',
      }) || 'sans-serif',
      fontSize: 16,
      letterSpacing: 0.5,
    } as TextStyle,
    link: {
      fontFamily: Platform.select({
        ios: 'DM Sans-Medium',
        android: 'DMSans-Medium',
        default: 'sans-serif',
      }) || 'sans-serif',
      fontSize: 16,
      color: colors.primary,
      textDecorationLine: 'underline' as const,
    } as TextStyle,
  },
} as const;

