/**
 * GlassCard Component
 * Glass morphism card with semi-transparent background and blur effect
 * Generated from specs/design/mobile/ui-components.md
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borders, shadows, spacing } from '@/theme';

export interface GlassCardProps {
  children: React.ReactNode;
  padding?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  padding = spacing.padding.card,
  borderRadius = borders.radius.card,
  style,
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          padding,
          borderRadius,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.glassLight,
    borderWidth: 1,
    borderColor: colors.glassDark,
    ...shadows.md,
  },
});

