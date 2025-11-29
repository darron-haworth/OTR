/**
 * RecoveryTimeDisplay Component
 * Intelligent time formatting with milestone detection
 * Generated from specs/design/mobile/ui-components.md
 */

import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { colors, typography } from '../../theme';
import { formatTimeInRecovery, calculateTimeInRecovery } from '../../utils/timeCalculations';
import { getMilestoneForDate } from '../../utils/milestoneHelpers';
import { MilestoneBadge } from '../common/MilestoneBadge';

export interface RecoveryTimeDisplayProps {
  startDate: string;
  format?: 'short' | 'long' | 'detailed';
  showBadge?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const RecoveryTimeDisplay: React.FC<RecoveryTimeDisplayProps> = ({
  startDate,
  format = 'short',
  showBadge = false,
  style,
  textStyle,
}) => {
  const time = calculateTimeInRecovery(startDate);
  const milestone = getMilestoneForDate(startDate);
  const formattedTime = formatTimeInRecovery(startDate, format);

  // Color coding by duration
  const getColor = (): string => {
    if (time.days < 30) return colors.success;
    if (time.days < 90) return colors.tertiary;
    if (time.days < 180) return colors.accent;
    if (time.days < 365) return colors.primary;
    return colors.secondary;
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.timeContainer}>
        <Text style={[styles.time, { color: getColor() }, textStyle]}>
          {formattedTime}
        </Text>
        {showBadge && milestone && (
          <MilestoneBadge days={time.days} size="small" style={styles.badge} />
        )}
      </View>
      {milestone && time.isMilestone && (
        <Text style={styles.milestoneLabel}>{milestone.label}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    ...typography.styles.bodyBold,
    fontSize: typography.fontSize.base,
    fontWeight: '700',
  },
  badge: {
    marginLeft: 8,
  },
  milestoneLabel: {
    ...typography.styles.caption,
    marginTop: 4,
    color: colors.accent,
    fontWeight: '600',
  },
});

