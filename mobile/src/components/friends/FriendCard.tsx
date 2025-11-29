/**
 * FriendCard Component
 * Friend list item with avatar, name, and recovery programs
 * Generated from specs/design/mobile/ui-components.md
 */

import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors, borders, spacing, typography, shadows } from '../../theme';
import { recoveryGroups } from '../../theme';
import { FriendAvatar } from './FriendAvatar';
import { RecoveryTimeDisplay } from '../recovery/RecoveryTimeDisplay';
import { calculateTimeInRecovery } from '../../utils/timeCalculations';
import { getMilestoneBadge } from '../../utils/milestoneHelpers';
import type { Friend } from '../../types/entities/Friend';

export interface FriendCardProps {
  friend: Friend;
  onPress?: () => void;
  style?: ViewStyle;
}

export const FriendCard: React.FC<FriendCardProps> = ({
  friend,
  onPress,
  style,
}) => {
  const publicName = friend.firstName && friend.lastName
    ? `${friend.firstName} ${friend.lastName}`
    : friend.firstName || 'Friend';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${publicName}, ${friend.recoveryGroups.length} recovery program${friend.recoveryGroups.length !== 1 ? 's' : ''}`}
    >
      <View style={styles.content}>
        <FriendAvatar
          name={publicName}
          recoveryGroups={friend.recoveryGroups}
          size={60}
        />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {publicName}
          </Text>
          {friend.recoveryGroups.length > 0 && (
            <View style={styles.programs}>
              {friend.recoveryGroups.slice(0, 3).map((group, index) => {
                const programInfo = recoveryGroups[group.groupId.toUpperCase() as keyof typeof recoveryGroups] || recoveryGroups.OTHER;
                const time = calculateTimeInRecovery(group.recoveryDate);
                const milestone = getMilestoneBadge(time.days);
                
                // Calculate years for badge display
                const years = Math.floor(time.days / 365);
                const showYearsBadge = years > 1;
                
                // Format time consistently: show Years and Months for all friends
                let timeDisplay = '';
                if (time.days >= 365) {
                  const remainingDays = time.days % 365;
                  const months = Math.floor(remainingDays / 30);
                  if (months > 0) {
                    timeDisplay = `${years}y ${months}m`;
                  } else {
                    timeDisplay = `${years}y`;
                  }
                } else if (time.days >= 30) {
                  const months = Math.floor(time.days / 30);
                  timeDisplay = `${months}m`;
                } else {
                  timeDisplay = `${time.days}d`;
                }

                return (
                  <View key={index} style={styles.programRow}>
                    <View style={styles.programPill}>
                      <Text style={styles.programIcon}>{programInfo.icon}</Text>
                      <Text style={styles.programTime}>{timeDisplay}</Text>
                      {milestone && (
                        showYearsBadge ? (
                          <Text style={styles.programBadge}></Text>
                        ) : (
                          <Text style={styles.programBadge}>{milestone.emoji}</Text>
                        )
                      )}
                    </View>
                  </View>
                );
              })}
              {friend.recoveryGroups.length > 3 && (
                <Text style={styles.morePrograms}>
                  +{friend.recoveryGroups.length - 3} more
                </Text>
              )}
            </View>
          )}
        </View>
        {onPress && (
          <View style={styles.rightSection}>
            {friend.recoveryGroups.length > 0 && friend.recoveryGroups[0]?.recoveryDate && (
              <Text style={styles.recoveryDateRight}>
                {(() => {
                  const formatRecoveryDate = (dateString: string): string => {
                    try {
                      const dateParts = dateString.split('-');
                      if (dateParts.length === 3) {
                        const year = parseInt(dateParts[0], 10);
                        const month = parseInt(dateParts[1], 10) - 1;
                        const day = parseInt(dateParts[2], 10);
                        const localDate = new Date(year, month, day);
                        return localDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                      }
                      return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    } catch {
                      return dateString;
                    }
                  };
                  return formatRecoveryDate(friend.recoveryGroups[0].recoveryDate);
                })()}
              </Text>
            )}
            <Text style={styles.chevron}>›</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.card,
    padding: spacing.padding.card,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: spacing.sm,
  },
  name: {
    ...typography.styles.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  programs: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  programRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    width: '100%',
  },
  programPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borders.radius.full,
    marginRight: spacing.sm,
  },
  programIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  programTime: {
    fontSize: typography.fontSize.xs,
    color: colors.secondary,
    fontWeight: '600',
  },
  programBadge: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
  recoveryDate: {
    ...typography.styles.caption,
    fontSize: typography.fontSize.xs,
    color: colors.gray[600],
    textAlign: 'right',
  },
  recoveryDateRight: {
    ...typography.styles.caption,
    fontSize: typography.fontSize.xs,
    color: colors.gray[600],
    marginRight: spacing.xs,
    marginTop: 2,
  },
  morePrograms: {
    ...typography.styles.caption,
    color: colors.gray[500],
  },
  chevron: {
    fontSize: 24,
    color: colors.gray[400],
    marginLeft: spacing.sm,
  },
});

