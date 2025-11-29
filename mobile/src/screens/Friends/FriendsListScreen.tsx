/**
 * Friends List Screen
 * Recovery friends list and management
 * Generated from otr-milestone-tracker.jsx and specs/design/mobile/mobile-screens.md
 */

import React, { useState } from 'react';
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
import { FriendCard } from '../../components/friends/FriendCard';
import { AddFriendForm } from '../../components/friends/AddFriendForm';
import { NeuButton } from '../../components/common/NeuButton';
import { colors, typography, spacing, borders, shadows, gradients } from '../../theme';
import type { Friend } from '../../types/entities/Friend';
import type { RecoveryGroupMembership } from '../../types/entities/UserProfile';

export interface FriendsListScreenProps {
  friends: Friend[];
  onAddFriend: (friend: Omit<Friend, 'localId' | 'addedDate' | 'lastUpdated' | 'connectionStatus'>) => void;
  onEditFriend: (friend: Friend) => void;
  onNavigateBack: () => void;
}

export const FriendsListScreen: React.FC<FriendsListScreenProps> = ({
  friends,
  onAddFriend,
  onEditFriend,
  onNavigateBack,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddFriend = (data: {
    firstName: string;
    lastName: string;
    recoveryGroups: RecoveryGroupMembership[];
    notes?: string;
  }) => {
    const newFriend: Omit<Friend, 'localId' | 'addedDate' | 'lastUpdated' | 'connectionStatus'> = {
      firstName: data.firstName,
      lastName: data.lastName,
      recoveryGroups: data.recoveryGroups,
    };
    onAddFriend(newFriend);
    setShowAddForm(false);
  };

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
          <Text style={styles.headerTitle}>Recovery Friends</Text>
          <Pressable
            onPress={() => setShowAddForm(true)}
            style={styles.addButton}
          >
            <Text style={styles.addIcon}>+</Text>
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Friends Count */}
        <View style={styles.countContainer}>
          <LinearGradient
            colors={[...gradients.warm.colors]}
            start={gradients.warm.start}
            end={gradients.warm.end}
            style={styles.countBadge}
          >
            <Text style={styles.countIcon}>👥</Text>
            <Text style={styles.countText}>
              {friends.length} Recovery {friends.length === 1 ? 'Friend' : 'Friends'}
            </Text>
          </LinearGradient>
        </View>

        {/* Add Friend Form */}
        {showAddForm && (
          <AddFriendForm
            onSubmit={handleAddFriend}
            onCancel={() => setShowAddForm(false)}
            style={styles.addForm}
          />
        )}

        {/* Friends List */}
        {friends.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyEmoji}>❤️</Text>
            </View>
            <Text style={styles.emptyTitle}>No friends yet</Text>
            <Text style={styles.emptyText}>
              Add recovery friends to support each other's journey
            </Text>
            <NeuButton
              onPress={() => setShowAddForm(true)}
              variant="primary"
              style={styles.emptyButton}
            >
              Add Your First Friend
            </NeuButton>
          </View>
        ) : (
          friends.map((friend) => (
            <FriendCard
              key={friend.localId}
              friend={friend}
              onPress={() => onEditFriend(friend)}
              style={styles.friendCard}
            />
          ))
        )}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: borders.radius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  addIcon: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.padding.screen,
  },
  countContainer: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borders.radius.full,
    ...shadows.md,
  },
  countIcon: {
    fontSize: 20,
    marginRight: spacing.xs,
  },
  countText: {
    ...typography.styles.body,
    fontWeight: '600',
    color: colors.surface,
  },
  addForm: {
    marginBottom: spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing.lg,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  emptyEmoji: {
    fontSize: 32,
  },
  emptyTitle: {
    ...typography.styles.h3,
    fontSize: typography.fontSize.xl,
    marginBottom: spacing.sm,
    color: colors.dark,
  },
  emptyText: {
    ...typography.styles.body,
    textAlign: 'center',
    color: colors.dark,
    opacity: 0.6,
    marginBottom: spacing.lg,
  },
  emptyButton: {
    minWidth: 200,
  },
  friendCard: {
    marginBottom: spacing.md,
  },
});

