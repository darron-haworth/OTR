/**
 * Encryption Setup Screen
 * First-time setup for encryption passphrase
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
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useApp } from '@/providers/AppProvider';
import { NeuButton } from '@/components/common/NeuButton';
import { GlassCard } from '@/components/common/GlassCard';
import { colors, typography, spacing, borders, shadows, gradients } from '@/theme';

export const EncryptionSetupScreen: React.FC = () => {
  const { initializeEncryption } = useApp();
  const [passphrase, setPassphrase] = useState('');
  const [confirmPassphrase, setConfirmPassphrase] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassphrase, setShowPassphrase] = useState(false);

  const handleSetup = async () => {
    // Validation
    if (!passphrase || passphrase.length < 8) {
      Alert.alert('Invalid Passphrase', 'Passphrase must be at least 8 characters long');
      return;
    }

    if (passphrase !== confirmPassphrase) {
      Alert.alert('Passphrase Mismatch', 'Passphrases do not match. Please try again.');
      return;
    }

    try {
      setIsLoading(true);
      await initializeEncryption(passphrase);
      // Navigation will happen automatically via App.tsx when isInitialized becomes true
    } catch (error) {
      Alert.alert(
        'Setup Failed',
        error instanceof Error ? error.message : 'Failed to initialize encryption. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={[colors.light, colors.surface]}
        style={styles.background}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoEmoji}>🔐</Text>
            </View>
            <Text style={styles.title}>Secure Your Data</Text>
            <Text style={styles.subtitle}>
              Create a passphrase to encrypt your personal information
            </Text>
          </View>

          {/* Setup Form */}
          <GlassCard style={styles.card}>
            <Text style={styles.cardTitle}>Create Passphrase</Text>
            <Text style={styles.cardDescription}>
              Your passphrase is used to encrypt all personal data. Make sure it's something you'll remember, as you'll need it to restore your data on a new device.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Passphrase</Text>
              <TextInput
                style={styles.input}
                value={passphrase}
                onChangeText={setPassphrase}
                placeholder="Enter passphrase (min 8 characters)"
                placeholderTextColor={colors.gray[400]}
                secureTextEntry={!showPassphrase}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Passphrase</Text>
              <TextInput
                style={styles.input}
                value={confirmPassphrase}
                onChangeText={setConfirmPassphrase}
                placeholder="Confirm passphrase"
                placeholderTextColor={colors.gray[400]}
                secureTextEntry={!showPassphrase}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.toggleContainer}>
              <NeuButton
                onPress={() => setShowPassphrase(!showPassphrase)}
                variant="default"
                style={styles.toggleButton}
              >
                {showPassphrase ? '👁️ Hide' : '👁️ Show'} Passphrase
              </NeuButton>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>🔒 Security Information</Text>
              <Text style={styles.infoText}>
                • Your passphrase is never stored or sent to servers{'\n'}
                • All personal data is encrypted before storage{'\n'}
                • You'll need this passphrase to restore data on a new device{'\n'}
                • Choose a strong, memorable passphrase
              </Text>
            </View>

            <NeuButton
              onPress={handleSetup}
              variant="primary"
              loading={isLoading}
              disabled={!passphrase || !confirmPassphrase || isLoading}
              style={styles.setupButton}
            >
              {isLoading ? 'Setting Up...' : 'Complete Setup'}
            </NeuButton>
          </GlassCard>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.padding.screen,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  logoEmoji: {
    fontSize: 48,
  },
  title: {
    ...typography.styles.h2,
    fontSize: typography.fontSize['3xl'],
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.styles.body,
    fontSize: typography.fontSize.base,
    textAlign: 'center',
    color: colors.gray[600],
    maxWidth: 300,
  },
  card: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    ...typography.styles.h4,
    marginBottom: spacing.sm,
    color: colors.primary,
  },
  cardDescription: {
    ...typography.styles.bodySmall,
    marginBottom: spacing.lg,
    color: colors.gray[600],
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: spacing.md,
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
  toggleContainer: {
    marginBottom: spacing.md,
  },
  toggleButton: {
    borderWidth: borders.width.default,
    borderColor: colors.gray[300],
  },
  infoBox: {
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: borders.radius.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  infoTitle: {
    ...typography.styles.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
    color: colors.dark,
  },
  infoText: {
    ...typography.styles.bodySmall,
    color: colors.gray[600],
    lineHeight: 20,
  },
  setupButton: {
    marginTop: spacing.sm,
  },
});

