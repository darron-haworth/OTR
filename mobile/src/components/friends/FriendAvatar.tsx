/**
 * FriendAvatar Component
 * Avatar with initial and milestone badge overlay
 * Generated from specs/design/mobile/ui-components.md
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, borders, shadows, typography } from '../../theme';
import { gradients } from '../../theme';
import { MilestoneBadge } from '../common/MilestoneBadge';
import { calculateTimeInRecovery } from '../../utils/timeCalculations';
import { getMilestoneForDate } from '../../utils/milestoneHelpers';
import type { RecoveryGroupMembership } from '../../types/entities/UserProfile';

export interface FriendAvatarProps {
  name: string;
  recoveryGroups?: RecoveryGroupMembership[];
  size?: number;
  style?: ViewStyle;
  showBadge?: boolean;
}

export const FriendAvatar: React.FC<FriendAvatarProps> = ({
  name,
  recoveryGroups = [],
  size = 60,
  style,
  showBadge = true,
}) => {
  // Get initial from name
  const getInitial = (): string => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  // Find the longest recovery time for badge
  const getLongestRecovery = (): { days: number; milestone: ReturnType<typeof getMilestoneForDate> } | null => {
    if (recoveryGroups.length === 0) return null;

    let longestDays = 0;
    let longestMilestone = null;

    recoveryGroups.forEach((group) => {
      const time = calculateTimeInRecovery(group.recoveryDate);
      if (time.days > longestDays) {
        longestDays = time.days;
        longestMilestone = getMilestoneForDate(group.recoveryDate);
      }
    });

    return longestMilestone ? { days: longestDays, milestone: longestMilestone } : null;
  };

  const longestRecovery = getLongestRecovery();
  const initial = getInitial();

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <LinearGradient
        colors={[...gradients.cool.colors]}
        start={gradients.cool.start}
        end={gradients.cool.end}
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <Text
          style={[
            styles.initial,
            {
              fontSize: size * 0.4,
            },
          ]}
        >
          {initial}
        </Text>
      </LinearGradient>
      {showBadge && longestRecovery && longestRecovery.milestone && (
        <View style={styles.badgeContainer}>
          <MilestoneBadge days={longestRecovery.days} size="small" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  initial: {
    color: colors.surface,
    fontWeight: '700',
    fontFamily: typography.fontFamily.bodyBold,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
});

