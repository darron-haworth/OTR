/**
 * NeuButton Component
 * Neumorphic button with press state animations
 * Generated from specs/design/mobile/ui-components.md
 */

import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { colors, borders, shadows, spacing, typography } from '../../theme';

export interface NeuButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
}

export const NeuButton: React.FC<NeuButtonProps> = ({
  onPress,
  children,
  variant = 'default',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const [pressed, setPressed] = useState(false);

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: borders.radius.button,
      paddingVertical: spacing.padding.button,
      paddingHorizontal: spacing.xl,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 44, // Accessibility: minimum touch target
    };

    if (variant === 'primary') {
      return {
        ...baseStyle,
        backgroundColor: colors.primary,
        ...shadows.colored(colors.primary),
      };
    }

    if (variant === 'danger') {
      return {
        ...baseStyle,
        backgroundColor: colors.error,
        ...shadows.colored(colors.error),
      };
    }

    // Default neumorphic style
    return {
      ...baseStyle,
      backgroundColor: colors.surface,
      ...shadows.neumorphic.light,
      ...shadows.neumorphic.dark,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle = typography.styles.button;

    if (variant === 'primary' || variant === 'danger') {
      return {
        ...baseStyle,
        color: colors.surface,
      };
    }

    return {
      ...baseStyle,
      color: colors.dark,
    };
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={({ pressed: isPressed }) => [
        getButtonStyle(),
        (isPressed || pressed) && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'danger' ? colors.surface : colors.primary}
          size="small"
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
});

