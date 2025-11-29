/**
 * Theme Constants - Milestones and Recovery Groups
 * Generated from specs/design/mobile/mobile-theme.md
 */

import { colors } from './colors';

export const milestones = {
  badges: {
    '1day': { emoji: '🌱', label: 'First Day!', color: colors.success },
    '7days': { emoji: '📅', label: 'One Week!', color: colors.success },
    '14days': { emoji: '💪', label: 'Two Weeks!', color: colors.tertiary },
    '30days': { emoji: '⭐', label: 'One Month!', color: colors.accent },
    '90days': { emoji: '🏆', label: '3 Months!', color: colors.primary },
    '180days': { emoji: '🎖️', label: '6 Months!', color: colors.secondary },
    '270days': { emoji: '🌟', label: '9 Months!', color: colors.accent },
    '365days': { emoji: '🎂', label: 'One Year!', color: colors.primary },
    '730days': { emoji: '👑', label: 'Two Years!', color: colors.secondary },
    '1095days': { emoji: '💎', label: 'Three Years!', color: colors.secondary },
    '1460days': { emoji: '🏅', label: 'Four Years!', color: colors.secondary },
    '1825days': { emoji: '🎖️', label: 'Five Years!', color: colors.secondary },
  },
  
  getNextMilestone: (days: number): number | null => {
    const milestoneKeys = [1, 7, 14, 30, 90, 180, 270, 365, 730, 1095, 1460, 1825];
    return milestoneKeys.find(key => key > days) || null;
  },
} as const;

export const recoveryGroups = {
  AA: { 
    id: 'aa', 
    name: 'Alcoholics Anonymous', 
    icon: '🌟',
    color: colors.primary,
  },
  NA: { 
    id: 'na', 
    name: 'Narcotics Anonymous', 
    icon: '💎',
    color: colors.secondary,
  },
  GA: { 
    id: 'ga', 
    name: 'Gamblers Anonymous', 
    icon: '🎲',
    color: colors.tertiary,
  },
  OA: { 
    id: 'oa', 
    name: 'Overeaters Anonymous', 
    icon: '🍎',
    color: colors.success,
  },
  OTHER: { 
    id: 'other', 
    name: 'Other Recovery Program', 
    icon: '💪',
    color: colors.accent,
  },
} as const;

