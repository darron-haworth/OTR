/**
 * Profile Helper Utilities
 * Functions for checking profile completeness and validation
 */

import type { UserProfile, RecoveryGroupMembership } from '../types/entities/UserProfile';

/**
 * Check if profile is complete (has all required fields)
 * Required: firstName, lastName, at least one recoveryGroup with recoveryDate
 */
export function isProfileComplete(profile: UserProfile | null | undefined): boolean {
  if (!profile) {
    return false;
  }

  // Check required fields
  if (!profile.firstName || !profile.lastName) {
    return false;
  }

  // Check for at least one active recovery group with a recovery date
  const hasActiveRecoveryGroup = profile.recoveryGroups.some(
    (group: RecoveryGroupMembership) => group.isActive && group.recoveryDate
  );

  return hasActiveRecoveryGroup;
}

/**
 * Get the primary (active) recovery group
 */
export function getPrimaryRecoveryGroup(profile: UserProfile | null | undefined): RecoveryGroupMembership | null {
  if (!profile) {
    return null;
  }

  const activeGroup = profile.recoveryGroups.find(
    (group: RecoveryGroupMembership) => group.isActive && group.recoveryDate
  );

  return activeGroup || null;
}

