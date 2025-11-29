/**
 * Home Screen
 * Main screen shown when profile is complete
 * Shows user's recovery milestones and friends list
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GlassCard } from '../../components/common/GlassCard';
import { MilestoneBadge } from '../../components/common/MilestoneBadge';
import { FriendCard } from '../../components/friends/FriendCard';
import { colors, typography, spacing, borders, shadows, gradients, recoveryGroups } from '../../theme';
import { calculateTimeInRecovery, formatTimeInRecovery } from '../../utils/timeCalculations';
import { getMilestoneForDate } from '../../utils/milestoneHelpers';
import { getPrimaryRecoveryGroup } from '../../utils/profileHelpers';
import type { UserProfile } from '../../types/entities/UserProfile';
import type { Friend } from '../../types/entities/Friend';

export interface HomeScreenProps {
  profile: UserProfile;
  friends: Friend[];
  onNavigateToProfile: () => void;
  onNavigateToFriends: () => void;
  onEditFriend: (friend: Friend) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  friends,
  onNavigateToProfile,
  onNavigateToFriends,
  onEditFriend,
}) => {
  const primaryGroup = getPrimaryRecoveryGroup(profile);
  const recoveryDate = primaryGroup?.recoveryDate || '';
  
  // Calculate detailed time breakdown
  const timeBreakdown = useMemo(() => {
    if (!recoveryDate) {
      console.log('HomeScreen - No recovery date found');
      return { days: 0, years: 0, months: 0, daysRemainder: 0, hours: 0 };
    }
    
    try {
      const start = new Date(recoveryDate);
      const now = new Date();
      
      // Validate date
      if (isNaN(start.getTime())) {
        console.warn('Invalid recovery date:', recoveryDate);
        return { days: 0, years: 0, months: 0, daysRemainder: 0, hours: 0 };
      }
      
      const diffMs = now.getTime() - start.getTime();
      const totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
      const years = Math.floor(totalDays / 365);
      const months = Math.floor((totalDays % 365) / 30);
      const daysRemainder = totalDays % 30;
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      return { days: totalDays, years, months, daysRemainder, hours };
    } catch (error) {
      console.error('Error calculating time breakdown:', error);
      return { days: 0, years: 0, months: 0, daysRemainder: 0, hours: 0 };
    }
  }, [recoveryDate]);
  
  const milestone = recoveryDate ? getMilestoneForDate(recoveryDate) : null;
  const timeInRecovery = recoveryDate ? calculateTimeInRecovery(recoveryDate) : null;
  
  // Sort friends by next upcoming milestone
  const sortedFriends = useMemo(() => {
    return [...friends].sort((a, b) => {
      const aGroup = a.recoveryGroups.find(g => g.isActive && g.recoveryDate);
      const bGroup = b.recoveryGroups.find(g => g.isActive && g.recoveryDate);
      
      if (!aGroup || !aGroup.recoveryDate) return 1;
      if (!bGroup || !bGroup.recoveryDate) return -1;
      
      const aTime = calculateTimeInRecovery(aGroup.recoveryDate);
      const bTime = calculateTimeInRecovery(bGroup.recoveryDate);
      
      // Sort by days ascending (most recent upcoming milestone first)
      return aTime.days - bTime.days;
    });
  }, [friends]);
  
  const publicName = profile.firstName && profile.lastName
    ? `${profile.firstName} ${profile.lastName}`
    : profile.publicName || 'You';
  
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
          <View style={styles.brandCard}>
            <View style={styles.logoSection}>
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={[...gradients.warm.colors]}
                  start={gradients.warm.start}
                  end={gradients.warm.end}
                  style={styles.logoGradient}
                >
                  <Text style={styles.logoEmoji}>✨</Text>
                </LinearGradient>
              </View>
              <Text style={styles.title}>
                Our Time Recovered
              </Text>
            </View>
          </View>

          {/* User Profile Card - Compressed */}
          <GlassCard style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{publicName}</Text>
                {primaryGroup && (
                  <Text style={styles.profileProgram}>
                    {recoveryGroups[primaryGroup.groupId as keyof typeof recoveryGroups]?.name?.toUpperCase() || primaryGroup.groupId.toUpperCase()}
                  </Text>
                )}
              </View>
            </View>
            
            {recoveryDate ? (
              <View style={styles.milestoneRow}>
                <View style={styles.milestoneItem}>
                  <Text style={styles.milestoneValue}>
                    {timeBreakdown.days || 0}
                  </Text>
                  <Text style={styles.milestoneLabel}>Days</Text>
                </View>
                {milestone && timeBreakdown.days > 0 && (
                  <MilestoneBadge days={timeBreakdown.days} size="small" />
                )}
              </View>
            ) : (
              <View style={styles.milestoneRow}>
                <Text style={styles.noDateText}>No recovery date set</Text>
              </View>
            )}
          </GlassCard>
          
          {/* Friends Section */}
          <View style={styles.friendsSection}>
            <View style={styles.friendsHeader}>
              <Text style={styles.friendsTitle}>Recovery Friends</Text>
              <Pressable onPress={onNavigateToFriends}>
                <Text style={styles.addFriendButton}>+ Add Friend</Text>
              </Pressable>
            </View>
            
            {sortedFriends.length === 0 ? (
              <GlassCard style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No friends yet. Add your first recovery friend!
                </Text>
                <Pressable onPress={onNavigateToFriends} style={styles.emptyStateButton}>
                  <Text style={styles.emptyStateButtonText}>Add Friend</Text>
                </Pressable>
              </GlassCard>
            ) : (
              sortedFriends.map((friend) => (
                <FriendCard
                  key={friend.localId}
                  friend={friend}
                  onPress={() => onEditFriend(friend)}
                  style={styles.friendCard}
                />
              ))
            )}
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
    padding: spacing.padding.screen,
    paddingBottom: spacing['2xl'],
  },
  brandCard: {
    marginBottom: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: borders.radius.card,
    borderWidth: 1,
    borderColor: colors.glassDark,
    ...shadows.md,
    minHeight: 200,
  },
  logoSection: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  logoGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoEmoji: {
    fontSize: 40,
  },
  title: {
    ...typography.styles.h1,
    fontSize: typography.fontSize['3xl'],
    textAlign: 'center',
    color: colors.dark,
    lineHeight: typography.fontSize['3xl'] * 1.2,
    fontWeight: '700',
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  profileCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  profileHeader: {
    marginBottom: spacing.sm,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    ...typography.styles.h3,
    fontSize: typography.fontSize.xl,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  profileProgram: {
    ...typography.styles.body,
    color: colors.gray[600],
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  milestoneItem: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  milestoneValue: {
    fontSize: 36,
    color: colors.primary,
    lineHeight: 43,
    fontWeight: '700',
    minWidth: 100,
    textAlign: 'center',
    includeFontPadding: false,
  },
  milestoneLabel: {
    ...typography.styles.caption,
    color: colors.gray[600],
    marginTop: spacing.xs,
    fontSize: typography.fontSize.xs,
  },
  noDateText: {
    ...typography.styles.body,
    color: colors.gray[500],
    textAlign: 'center',
    fontStyle: 'italic',
  },
  friendsSection: {
    marginTop: spacing.sm,
  },
  friendsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  friendsTitle: {
    ...typography.styles.h4,
    fontSize: typography.fontSize.xl,
  },
  addFriendButton: {
    ...typography.styles.body,
    color: colors.primary,
    fontWeight: '600',
  },
  friendCard: {
    marginBottom: spacing.md,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyStateText: {
    ...typography.styles.body,
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  emptyStateButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borders.radius.button,
    ...shadows.sm,
  },
  emptyStateButtonText: {
    ...typography.styles.body,
    fontWeight: '700',
    color: colors.surface,
  },
});

