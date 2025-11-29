/**
 * Navigation Types
 * Type definitions for React Navigation
 */

import type { NavigatorScreenParams } from '@react-navigation/native';
import type { UserProfile } from '@/types/entities/UserProfile';
import type { Friend } from '@/types/entities/Friend';

export type RootStackParamList = {
  Landing: undefined;
  Profile: undefined;
  FriendsList: undefined;
  EditFriend: { friend: Friend };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

