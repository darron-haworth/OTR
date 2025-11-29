/**
 * ProgramSelector Component
 * Dropdown selector for recovery programs
 * Generated from specs/design/mobile/ui-components.md
 */

import React, { useState } from 'react';
import { View, Text, Pressable, Modal, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import { colors, borders, spacing, typography, shadows } from '../../theme';
import { recoveryGroups } from '../../theme';

export interface ProgramSelectorProps {
  selectedProgramId?: string;
  onSelect: (programId: string) => void;
  style?: ViewStyle;
}

export const ProgramSelector: React.FC<ProgramSelectorProps> = ({
  selectedProgramId,
  onSelect,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedProgram = selectedProgramId
    ? recoveryGroups[selectedProgramId.toUpperCase() as keyof typeof recoveryGroups] || recoveryGroups.OTHER
    : null;

  const handleSelect = (programId: string) => {
    onSelect(programId);
    setModalVisible(false);
  };

  return (
    <>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={[styles.selector, style]}
        accessibilityRole="button"
        accessibilityLabel={selectedProgram ? `Selected: ${selectedProgram.name}` : 'Select recovery program'}
      >
        <Text style={[styles.selectorText, !selectedProgram && styles.placeholder]}>
          {selectedProgram ? `${selectedProgram.icon} ${selectedProgram.name}` : 'Select a program...'}
        </Text>
        <Text style={styles.chevron}>▼</Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Recovery Program</Text>
            <ScrollView style={styles.optionsList}>
              {Object.values(recoveryGroups).map((program) => (
                <Pressable
                  key={program.id}
                  onPress={() => handleSelect(program.id)}
                  style={[
                    styles.option,
                    selectedProgramId === program.id && styles.optionSelected,
                  ]}
                >
                  <Text style={styles.optionIcon}>{program.icon}</Text>
                  <Text style={[styles.optionText, selectedProgramId === program.id && styles.optionTextSelected]}>
                    {program.name}
                  </Text>
                  {selectedProgramId === program.id && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </Pressable>
              ))}
            </ScrollView>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: borders.width.default,
    borderColor: colors.gray[300],
    borderRadius: borders.radius.input,
    paddingVertical: spacing.padding.input,
    paddingHorizontal: spacing.padding.input,
    minHeight: 44,
  },
  selectorText: {
    ...typography.styles.body,
    flex: 1,
  },
  placeholder: {
    color: colors.gray[500],
  },
  chevron: {
    color: colors.gray[500],
    fontSize: 12,
    marginLeft: spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.xl,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    ...shadows.xl,
  },
  modalTitle: {
    ...typography.styles.h4,
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  optionsList: {
    maxHeight: 400,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
    minHeight: 56,
  },
  optionSelected: {
    backgroundColor: colors.gray[50],
  },
  optionIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  optionText: {
    ...typography.styles.body,
    flex: 1,
  },
  optionTextSelected: {
    fontWeight: '600',
    color: colors.primary,
  },
  checkmark: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    alignItems: 'center',
  },
  cancelButtonText: {
    ...typography.styles.body,
    color: colors.primary,
    fontWeight: '600',
  },
});

