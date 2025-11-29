/**
 * Edit Friend Screen
 * Friend profile editing interface
 * Generated from otr-milestone-tracker.jsx and specs/design/mobile/mobile-screens.md
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GlassCard } from '@/components/common/GlassCard';
import { NeuButton } from '@/components/common/NeuButton';
import { MilestoneBadge } from '@/components/common/MilestoneBadge';
import { RecoveryProgramCard } from '@/components/recovery/RecoveryProgramCard';
import { ProgramSelector } from '@/components/recovery/ProgramSelector';
import { FriendAvatar } from '@/components/friends/FriendAvatar';
import { colors, typography, spacing, borders, shadows, gradients } from '@/theme';
import { calculateTimeInRecovery } from '@/utils/timeCalculations';
import { getMilestoneForDate } from '@/utils/milestoneHelpers';
import type { Friend, RecoveryGroupMembership } from '@/types/entities/Friend';

export interface EditFriendScreenProps {
  friend: Friend;
  onSave: (friend: Friend) => void;
  onDelete: (friendId: string) => void;
  onNavigateBack: () => void;
}

export const EditFriendScreen: React.FC<EditFriendScreenProps> = ({
  friend,
  onSave,
  onDelete,
  onNavigateBack,
}) => {
  const [tempFriend, setTempFriend] = useState<Friend>({ ...friend });
  const [selectedProgramId, setSelectedProgramId] = useState<string>('');
  const [recoveryDate, setRecoveryDate] = useState('');

  const handleSave = () => {
    onSave({
      ...tempFriend,
      lastUpdated: new Date().toISOString(),
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Remove Friend',
      'Are you sure you want to remove this friend?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            onDelete(friend.localId);
          },
        },
      ]
    );
  };

  const handleAddProgram = () => {
    if (selectedProgramId && recoveryDate) {
      const newGroup: RecoveryGroupMembership = {
        groupId: selectedProgramId,
        recoveryDate,
        isActive: true,
      };
      setTempFriend({
        ...tempFriend,
        recoveryGroups: [...tempFriend.recoveryGroups, newGroup],
      });
      setSelectedProgramId('');
      setRecoveryDate('');
    }
  };

  const handleRemoveProgram = (index: number) => {
    setTempFriend({
      ...tempFriend,
      recoveryGroups: tempFriend.recoveryGroups.filter((_, i) => i !== index),
    });
  };

  // Get longest recovery for main badge
  const getLongestRecovery = () => {
    if (tempFriend.recoveryGroups.length === 0) return null;
    let longestDays = 0;
    let longestGroup: RecoveryGroupMembership | null = null;

    tempFriend.recoveryGroups.forEach((group) => {
      const time = calculateTimeInRecovery(group.recoveryDate);
      if (time.days > longestDays) {
        longestDays = time.days;
        longestGroup = group;
      }
    });

    return longestGroup ? getMilestoneForDate(longestGroup.recoveryDate) : null;
  };

  const mainMilestone = getLongestRecovery();
  const friendName = tempFriend.firstName && tempFriend.lastName
    ? `${tempFriend.firstName} ${tempFriend.lastName}`
    : tempFriend.firstName || 'Friend';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={gradients.soft.colors}
        start={gradients.soft.start}
        end={gradients.soft.end}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Pressable onPress={onNavigateBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Edit Friend</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <FriendAvatar
            name={friendName}
            recoveryGroups={tempFriend.recoveryGroups}
            size={100}
          />
          {mainMilestone && (
            <View style={styles.milestoneBadge}>
              <MilestoneBadge
                days={Math.max(
                  ...tempFriend.recoveryGroups.map((g) => calculateTimeInRecovery(g.recoveryDate).days)
                )}
                size="medium"
              />
            </View>
          )}
        </View>

        {/* Milestone Celebration */}
        {mainMilestone && (
          <View style={styles.milestoneCelebration}>
            <LinearGradient
              colors={gradients.warm.colors}
              start={gradients.warm.start}
              end={gradients.warm.end}
              style={styles.milestoneBadge}
            >
              <Text style={styles.milestoneLabel}>{mainMilestone.label}</Text>
            </LinearGradient>
          </View>
        )}

        {/* Friend Information */}
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Friend Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={tempFriend.firstName}
              onChangeText={(text) =>
                setTempFriend({ ...tempFriend, firstName: text })
              }
              placeholder="First name (optional)"
              placeholderTextColor={colors.gray[400]}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={tempFriend.lastName}
              onChangeText={(text) =>
                setTempFriend({ ...tempFriend, lastName: text })
              }
              placeholder="Last name (optional)"
              placeholderTextColor={colors.gray[400]}
            />
          </View>
        </GlassCard>

        {/* Recovery Programs */}
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Recovery Programs</Text>

          <View style={styles.addProgramSection}>
            <ProgramSelector
              selectedProgramId={selectedProgramId}
              onSelect={setSelectedProgramId}
              style={styles.programSelector}
            />
            <TextInput
              style={styles.input}
              value={recoveryDate}
              onChangeText={setRecoveryDate}
              placeholder="Recovery date (YYYY-MM-DD)"
              placeholderTextColor={colors.gray[400]}
            />
            <NeuButton onPress={handleAddProgram} variant="default" style={styles.addButton}>
              Add Program
            </NeuButton>
          </View>

          {tempFriend.recoveryGroups.map((group, index) => (
            <RecoveryProgramCard
              key={index}
              program={group}
              showMilestone
              onRemove={() => handleRemoveProgram(index)}
              style={styles.programCard}
            />
          ))}

          {tempFriend.recoveryGroups.length === 0 && (
            <Text style={styles.emptyText}>No recovery programs added yet</Text>
          )}
        </GlassCard>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <NeuButton onPress={handleSave} variant="primary" style={styles.saveButton}>
            Save Changes
          </NeuButton>
          <NeuButton onPress={handleDelete} variant="danger" style={styles.deleteButton}>
            Remove Friend
          </NeuButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  header: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.padding.screen,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...shadows.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: colors.dark,
  },
  headerTitle: {
    ...typography.styles.h3,
    fontSize: typography.fontSize['2xl'],
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.padding.screen,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: spacing['2xl'],
    position: 'relative',
  },
  milestoneBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  milestoneCelebration: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  milestoneLabel: {
    ...typography.styles.body,
    fontWeight: '600',
    color: colors.surface,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.styles.h4,
    fontSize: typography.fontSize.xl,
    marginBottom: spacing.md,
    color: colors.primary,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.styles.bodySmall,
    fontWeight: '600',
    marginBottom: spacing.xs,
    color: colors.dark,
    opacity: 0.7,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: borders.width.default,
    borderColor: colors.primary,
    borderRadius: borders.radius.input,
    paddingVertical: spacing.padding.input,
    paddingHorizontal: spacing.padding.input,
    ...typography.styles.body,
    color: colors.dark,
    minHeight: 44,
  },
  addProgramSection: {
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: borders.radius.md,
    marginBottom: spacing.md,
  },
  programSelector: {
    marginBottom: spacing.sm,
  },
  addButton: {
    marginTop: spacing.sm,
  },
  programCard: {
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.styles.bodySmall,
    textAlign: 'center',
    color: colors.gray[500],
    padding: spacing.lg,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  saveButton: {
    marginBottom: spacing.sm,
  },
  deleteButton: {
    borderWidth: borders.width.default,
    borderColor: colors.error,
    backgroundColor: colors.surface,
  },
});

