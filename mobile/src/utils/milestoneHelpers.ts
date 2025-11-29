/**
 * Milestone Helper Utilities
 * Functions for determining and displaying milestones
 */

import { milestones } from '@/theme';
import { calculateTimeInRecovery } from './timeCalculations';

export interface MilestoneInfo {
  emoji: string;
  label: string;
  color: string;
  days: number;
}

/**
 * Get milestone badge info for a given number of days
 */
export function getMilestoneBadge(days: number): MilestoneInfo | null {
  const milestoneKeys = ['1day', '7days', '14days', '30days', '90days', '180days', '270days', '365days', '730days'];
  const milestoneDays = [1, 7, 14, 30, 90, 180, 270, 365, 730];
  
  // Find the highest milestone achieved
  for (let i = milestoneDays.length - 1; i >= 0; i--) {
    if (days >= milestoneDays[i]) {
      const badge = milestones.badges[milestoneKeys[i] as keyof typeof milestones.badges];
      return {
        ...badge,
        days: milestoneDays[i],
      };
    }
  }
  
  return null;
}

/**
 * Get milestone badge for a recovery date
 */
export function getMilestoneForDate(recoveryDate: string): MilestoneInfo | null {
  const time = calculateTimeInRecovery(recoveryDate);
  return getMilestoneBadge(time.days);
}

/**
 * Get the next milestone for a given number of days
 */
export function getNextMilestone(days: number): { days: number; label: string } | null {
  const next = milestones.getNextMilestone(days);
  if (!next) return null;
  
  const milestoneKeys = ['1day', '7days', '14days', '30days', '90days', '180days', '270days', '365days', '730days'];
  const index = [1, 7, 14, 30, 90, 180, 270, 365, 730].indexOf(next);
  
  if (index >= 0) {
    const badge = milestones.badges[milestoneKeys[index] as keyof typeof milestones.badges];
    return {
      days: next,
      label: badge.label,
    };
  }
  
  return null;
}

/**
 * Check if a date represents a milestone
 */
export function isMilestone(recoveryDate: string): boolean {
  const time = calculateTimeInRecovery(recoveryDate);
  return time.isMilestone;
}

