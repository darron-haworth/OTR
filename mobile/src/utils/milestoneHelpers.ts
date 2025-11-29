/**
 * Milestone Helper Utilities
 * Functions for determining and displaying milestones
 */

import { milestones } from '../theme';
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
  const milestoneKeys = ['1day', '7days', '14days', '30days', '90days', '180days', '270days', '365days', '730days', '1095days', '1460days', '1825days'];
  const milestoneDays = [1, 7, 14, 30, 90, 180, 270, 365, 730, 1095, 1460, 1825];
  
  // Find the highest milestone achieved
  for (let i = milestoneDays.length - 1; i >= 0; i--) {
    if (days >= milestoneDays[i]) {
      const badge = milestones.badges[milestoneKeys[i] as keyof typeof milestones.badges];
      if (badge) {
        return {
          ...badge,
          days: milestoneDays[i],
        };
      }
    }
  }
  
  // For years beyond 5, generate a dynamic badge
  if (days >= 1825) {
    const years = Math.floor(days / 365);
    return {
      emoji: '🌟',
      label: `${years} Years!`,
      color: milestones.badges['1825days'].color,
      days: years * 365,
    };
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
  if (!next) {
    // If beyond all defined milestones, calculate next year milestone
    if (days >= 1825) {
      const currentYears = Math.floor(days / 365);
      const nextYear = (currentYears + 1) * 365;
      return {
        days: nextYear,
        label: `${currentYears + 1} Years!`,
      };
    }
    return null;
  }
  
  const milestoneKeys = ['1day', '7days', '14days', '30days', '90days', '180days', '270days', '365days', '730days', '1095days', '1460days', '1825days'];
  const milestoneDays = [1, 7, 14, 30, 90, 180, 270, 365, 730, 1095, 1460, 1825];
  const index = milestoneDays.indexOf(next);
  
  if (index >= 0) {
    const badge = milestones.badges[milestoneKeys[index] as keyof typeof milestones.badges];
    if (badge) {
      return {
        days: next,
        label: badge.label,
      };
    }
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

