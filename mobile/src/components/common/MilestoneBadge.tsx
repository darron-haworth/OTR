/**
 * MilestoneBadge Component
 * Displays milestone badge with automatic selection and animation
 * Generated from specs/design/mobile/ui-components.md
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ViewStyle } from 'react-native';
import { colors, borders, shadows } from '@/theme';
import { getMilestoneBadge } from '@/utils/milestoneHelpers';

export interface MilestoneBadgeProps {
  days: number;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  showLabel?: boolean;
}

const SIZE_MAP = {
  small: { width: 24, height: 24, fontSize: 12 },
  medium: { width: 32, height: 32, fontSize: 16 },
  large: { width: 40, height: 40, fontSize: 20 },
};

export const MilestoneBadge: React.FC<MilestoneBadgeProps> = ({
  days,
  size = 'medium',
  style,
  showLabel = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const milestone = getMilestoneBadge(days);
  const sizeConfig = SIZE_MAP[size];

  useEffect(() => {
    if (milestone) {
      // Celebrate animation on mount
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 150,
          friction: 8,
        }),
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: -5,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 5,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [milestone, scaleAnim, rotateAnim]);

  if (!milestone) {
    return null;
  }

  const rotate = rotateAnim.interpolate({
    inputRange: [-5, 5],
    outputRange: ['-5deg', '5deg'],
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.badge,
          {
            width: sizeConfig.width,
            height: sizeConfig.height,
            borderRadius: sizeConfig.width / 2,
            transform: [
              { scale: scaleAnim },
              { rotate },
            ],
          },
        ]}
      >
        <Text style={[styles.emoji, { fontSize: sizeConfig.fontSize }]}>
          {milestone.emoji}
        </Text>
      </Animated.View>
      {showLabel && (
        <Text style={styles.label}>{milestone.label}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  badge: {
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
    ...shadows.sm,
  },
  emoji: {
    textAlign: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 10,
    color: colors.dark,
    fontWeight: '600',
  },
});

