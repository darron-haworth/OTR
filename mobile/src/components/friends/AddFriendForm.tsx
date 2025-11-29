/**
 * AddFriendForm Component
 * Form for adding a new recovery friend
 * Generated from specs/design/mobile/ui-components.md
 */

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import { colors, borders, spacing, typography, shadows } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { NeuButton } from '../common/NeuButton';
import { ProgramSelector } from '../recovery/ProgramSelector';
import { RecoveryProgramCard } from '../recovery/RecoveryProgramCard';
import type { RecoveryGroupMembership } from '../../types/entities/UserProfile';

export interface AddFriendFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    recoveryGroups: RecoveryGroupMembership[];
    notes?: string;
  }) => void;
  onCancel?: () => void;
  style?: ViewStyle;
}

export const AddFriendForm: React.FC<AddFriendFormProps> = ({
  onSubmit,
  onCancel,
  style,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedProgramId, setSelectedProgramId] = useState<string>('');
  const [recoveryDate, setRecoveryDate] = useState('');
  const [recoveryGroups, setRecoveryGroups] = useState<RecoveryGroupMembership[]>([]);

  const handleAddProgram = () => {
    if (selectedProgramId && recoveryDate) {
      const newGroup: RecoveryGroupMembership = {
        groupId: selectedProgramId,
        recoveryDate,
        isActive: true,
      };
      setRecoveryGroups([...recoveryGroups, newGroup]);
      setSelectedProgramId('');
      setRecoveryDate('');
    }
  };

  const handleRemoveProgram = (index: number) => {
    setRecoveryGroups(recoveryGroups.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (firstName.trim() || lastName.trim()) {
      onSubmit({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        recoveryGroups,
        notes: notes.trim() || undefined,
      });
      // Reset form
      setFirstName('');
      setLastName('');
      setNotes('');
      setRecoveryGroups([]);
      setSelectedProgramId('');
      setRecoveryDate('');
    }
  };

  const isValid = (firstName.trim() || lastName.trim()) && recoveryGroups.length > 0;

  return (
    <GlassCard style={[styles.container, style]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add Recovery Friend</Text>

        <View style={styles.section}>
          <Text style={styles.label}>First Name (optional)</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
            placeholderTextColor={colors.gray[400]}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Last Name (optional)</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
            placeholderTextColor={colors.gray[400]}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Recovery Programs</Text>
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
            keyboardType="default"
          />
          <NeuButton
            onPress={handleAddProgram}
            variant="default"
            style={styles.addButton}
          >
            Add Program
          </NeuButton>

          {recoveryGroups.map((group, index) => (
            <RecoveryProgramCard
              key={index}
              program={group}
              onRemove={() => handleRemoveProgram(index)}
              style={styles.programCard}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Notes (optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add notes about your friend..."
            placeholderTextColor={colors.gray[400]}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <View style={styles.actions}>
        {onCancel && (
          <NeuButton
            onPress={onCancel}
            variant="default"
            style={[styles.button, styles.cancelButton]}
          >
            Cancel
          </NeuButton>
        )}
        <NeuButton
          onPress={handleSubmit}
          variant="primary"
          disabled={!isValid}
          style={styles.button}
        >
          Add Friend
        </NeuButton>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: '80%',
  },
  scrollView: {
    maxHeight: 500,
  },
  title: {
    ...typography.styles.h4,
    marginBottom: spacing.lg,
    color: colors.secondary,
  },
  section: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.styles.bodySmall,
    fontWeight: '600',
    marginBottom: spacing.xs,
    color: colors.dark,
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
  textArea: {
    minHeight: 100,
    paddingTop: spacing.padding.input,
  },
  programSelector: {
    marginBottom: spacing.md,
  },
  addButton: {
    marginTop: spacing.sm,
  },
  programCard: {
    marginTop: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    flex: 0.5,
  },
});

