/**
 * Landing Screen
 * Initial onboarding/welcome screen
 * Generated from otr-milestone-tracker.jsx and specs/design/mobile/mobile-screens.md
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GlassCard } from '../../components/common/GlassCard';
import { NeuButton } from '../../components/common/NeuButton';
import { colors, typography, spacing, borders, shadows, gradients } from '../../theme';

export interface LandingScreenProps {
  onNavigateToProfile: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onNavigateToProfile,
}) => {
  const features = [
    { icon: '🔒', text: 'Privacy First for Anonymity', color: colors.primary },
    { icon: '❤️', text: 'Focus on Connection', color: colors.secondary },
    { icon: '🎯', text: 'Milestone Tracking', color: colors.accent },
  ];

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
          {/* Logo and Title */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={[...gradients.warm.colors]}
                start={gradients.warm.start}
                end={gradients.warm.end}
                style={styles.logoGradient}
              >
                <Text style={styles.logoEmoji}>⏰</Text>
              </LinearGradient>
            </View>

            <Text style={styles.title}>
              Our Time{'\n'}Recovered
            </Text>

            <Text style={styles.subtitle}>
              Tracking your recovery and making connections with others in recovery.
            </Text>
          </View>

          {/* Feature Cards */}
          <View style={styles.featuresSection}>
            {features.map((feature, index) => (
              <GlassCard
                key={index}
                style={styles.featureCard}
              >
                <View style={styles.featureContent}>
                  <View
                    style={[
                      styles.featureIconContainer,
                      { backgroundColor: `${feature.color}22` },
                    ]}
                  >
                    <Text style={styles.featureIcon}>{feature.icon}</Text>
                  </View>
                  <Text style={styles.featureText}>{feature.text}</Text>
                </View>
              </GlassCard>
            ))}
          </View>

          {/* CTA Buttons */}
          <View style={styles.ctaSection}>
            <NeuButton
              onPress={onNavigateToProfile}
              variant="primary"
              style={styles.primaryButton}
            >
              Start Your Journey →
            </NeuButton>
          </View>
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
  logoSection: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    marginBottom: spacing.lg,
    transform: [{ rotate: '45deg' }],
    ...shadows.lg,
  },
  logoGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoEmoji: {
    fontSize: 48,
    transform: [{ rotate: '-45deg' }],
  },
  title: {
    ...typography.styles.h1,
    fontSize: typography.fontSize['4xl'],
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: spacing.sm,
    color: colors.primary,
  },
  subtitle: {
    ...typography.styles.body,
    fontSize: typography.fontSize.lg,
    textAlign: 'center',
    color: colors.dark,
    opacity: 0.7,
    maxWidth: 300,
  },
  featuresSection: {
    marginBottom: spacing['2xl'],
  },
  featureCard: {
    marginBottom: spacing.md,
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureText: {
    ...typography.styles.body,
    fontSize: typography.fontSize.lg,
    fontWeight: '500',
    color: colors.dark,
  },
  ctaSection: {
    gap: spacing.md,
  },
  primaryButton: {
    marginBottom: spacing.md,
  },
});

