/**
 * RecoveryProgramCard Component
 * Displays recovery program with time calculation and milestone celebration
 * Generated from specs/design/mobile/ui-components.md
 */

import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors, borders, spacing, typography, shadows } from '../../theme';
import { recoveryGroups } from '../../theme';
import { RecoveryTimeDisplay } from './RecoveryTimeDisplay';
import { MilestoneBadge } from '../common/MilestoneBadge';
import { calculateTimeInRecovery } from '../../utils/timeCalculations';
import { getMilestoneForDate } from '../../utils/milestoneHelpers';
import type { RecoveryGroupMembership } from '../../types/entities/UserProfile';

export interface RecoveryProgramCardProps {
  program: RecoveryGroupMembership;
  showMilestone?: boolean;
  onRemove?: () => void;
  style?: ViewStyle;
}

export const RecoveryProgramCard: React.FC<RecoveryProgramCardProps> = ({
  program,
  showMilestone = true,
  onRemove,
  style,
}) => {
  const programInfo = recoveryGroups[program.groupId.toUpperCase() as keyof typeof recoveryGroups] || recoveryGroups.OTHER;
  const time = calculateTimeInRecovery(program.recoveryDate);
  const milestone = getMilestoneForDate(program.recoveryDate);

  return (
    <View style={[styles.card, style]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{programInfo.icon}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.programName}>{programInfo.name}</Text>
          <RecoveryTimeDisplay
            startDate={program.recoveryDate}
            format="short"
            showBadge={false}
            textStyle={styles.timeText}
          />
          {program.notes && (
            <Text style={styles.notes} numberOfLines={2}>
              {program.notes}
            </Text>
          )}
        </View>
        {showMilestone && milestone && (
          <View style={styles.milestoneContainer}>
            <MilestoneBadge days={time.days} size="medium" />
            {time.isMilestone && (
              <Text style={styles.milestoneLabel}>Milestone!</Text>
            )}
          </View>
        )}
        {onRemove && (
          <Pressable
            onPress={onRemove}
            style={styles.removeButton}
            accessibilityRole="button"
            accessibilityLabel="Remove program"
          >
            <Text style={styles.removeIcon}>×</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.lg,
    padding: spacing.padding.card,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gray[200],
    ...shadows.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borders.radius.md,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  programName: {
    ...typography.styles.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  timeText: {
    fontSize: typography.fontSize.sm,
  },
  notes: {
    ...typography.styles.bodySmall,
    marginTop: spacing.xs,
    color: colors.gray[600],
  },
  milestoneContainer: {
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  milestoneLabel: {
    ...typography.styles.caption,
    marginTop: 4,
    color: colors.accent,
    fontWeight: '600',
  },
  removeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  removeIcon: {
    fontSize: 24,
    color: colors.error,
    fontWeight: 'bold',
  },
});

