/**
 * Profile Screen
 * User profile management and recovery programs
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GlassCard } from '../../components/common/GlassCard';
import { NeuButton } from '../../components/common/NeuButton';
import { MilestoneBadge } from '../../components/common/MilestoneBadge';
import { RecoveryProgramCard } from '../../components/recovery/RecoveryProgramCard';
import { ProgramSelector } from '../../components/recovery/ProgramSelector';
import { colors, typography, spacing, borders, shadows, gradients } from '../../theme';
import { calculateTimeInRecovery } from '../../utils/timeCalculations';
import { getMilestoneForDate } from '../../utils/milestoneHelpers';
import type { UserProfile, RecoveryGroupMembership } from '../../types/entities/UserProfile';

export interface ProfileScreenProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onNavigateBack: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  onUpdateProfile,
  onNavigateBack,
}) => {
  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>({ ...profile });
  const [selectedProgramId, setSelectedProgramId] = useState<string>('');
  const [recoveryDate, setRecoveryDate] = useState('');

  const handleSave = () => {
    onUpdateProfile({
      ...tempProfile,
      updatedAt: new Date().toISOString(),
    });
    setEditing(false);
  };

  const handleAddProgram = () => {
    if (selectedProgramId && recoveryDate) {
      const newGroup: RecoveryGroupMembership = {
        groupId: selectedProgramId,
        recoveryDate,
        isActive: true,
      };
      setTempProfile({
        ...tempProfile,
        recoveryGroups: [...tempProfile.recoveryGroups, newGroup],
      });
      setSelectedProgramId('');
      setRecoveryDate('');
    }
  };

  const handleRemoveProgram = (index: number) => {
    setTempProfile({
      ...tempProfile,
      recoveryGroups: tempProfile.recoveryGroups.filter((_, i) => i !== index),
    });
  };

  const currentProfile = editing ? tempProfile : profile;
  const hasMilestone = profile.recoveryGroups.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
              <LinearGradient
                colors={[...gradients.soft.colors]}
        start={gradients.soft.start}
        end={gradients.soft.end}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Pressable onPress={onNavigateBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>My Profile</Text>
          <Pressable
            onPress={() => {
              if (editing) {
                handleSave();
              } else {
                setEditing(true);
              }
            }}
            style={styles.editButton}
          >
            <Text style={styles.editIcon}>{editing ? '✓' : '✏️'}</Text>
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
              <LinearGradient
                colors={[...gradients.warm.colors]}
            start={gradients.warm.start}
            end={gradients.warm.end}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>
              {currentProfile.publicName.charAt(0).toUpperCase() || 'U'}
            </Text>
          </LinearGradient>
          {hasMilestone && (
            <View style={styles.badgeContainer}>
              <MilestoneBadge
                days={Math.max(
                  ...profile.recoveryGroups.map((g) => calculateTimeInRecovery(g.recoveryDate).days)
                )}
                size="medium"
              />
            </View>
          )}
        </View>

        {/* Personal Information */}
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Public Name (shown to friends)</Text>
            <TextInput
              style={[
                styles.input,
                editing && styles.inputActive,
                !editing && styles.inputDisabled,
              ]}
              value={currentProfile.publicName}
              onChangeText={(text) =>
                setTempProfile({ ...tempProfile, publicName: text })
              }
              editable={editing}
              placeholder="Your recovery name"
              placeholderTextColor={colors.gray[400]}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={[
                  styles.input,
                  editing && styles.inputActive,
                  !editing && styles.inputDisabled,
                ]}
                value={currentProfile.firstName}
                onChangeText={(text) =>
                  setTempProfile({ ...tempProfile, firstName: text })
                }
                editable={editing}
                placeholder="First name"
                placeholderTextColor={colors.gray[400]}
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={[
                  styles.input,
                  editing && styles.inputActive,
                  !editing && styles.inputDisabled,
                ]}
                value={currentProfile.lastName}
                onChangeText={(text) =>
                  setTempProfile({ ...tempProfile, lastName: text })
                }
                editable={editing}
                placeholder="Last name"
                placeholderTextColor={colors.gray[400]}
              />
            </View>
          </View>

          {editing && (
            <NeuButton onPress={handleSave} variant="primary" style={styles.saveButton}>
              Save Changes
            </NeuButton>
          )}
        </GlassCard>

        {/* Recovery Programs */}
        <GlassCard style={styles.section}>
          <Text style={styles.sectionTitle}>Recovery Programs</Text>

          {editing && (
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
          )}

          {currentProfile.recoveryGroups.map((group, index) => (
            <RecoveryProgramCard
              key={index}
              program={group}
              showMilestone
              onRemove={editing ? () => handleRemoveProgram(index) : undefined}
              style={styles.programCard}
            />
          ))}

          {currentProfile.recoveryGroups.length === 0 && (
            <Text style={styles.emptyText}>No recovery programs added yet</Text>
          )}
        </GlassCard>
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
  editButton: {
    width: 40,
    height: 40,
    borderRadius: borders.radius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  editIcon: {
    fontSize: 18,
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
  avatarText: {
    fontSize: 48,
    color: colors.surface,
    fontWeight: '700',
  },
  badgeContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
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
    borderColor: colors.gray[300],
    borderRadius: borders.radius.input,
    paddingVertical: spacing.padding.input,
    paddingHorizontal: spacing.padding.input,
    ...typography.styles.body,
    color: colors.dark,
    minHeight: 44,
  },
  inputActive: {
    borderColor: colors.primary,
  },
  inputDisabled: {
    backgroundColor: colors.gray[100],
    borderColor: colors.gray[200],
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  saveButton: {
    marginTop: spacing.md,
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
});

