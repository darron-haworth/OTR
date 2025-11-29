/**
 * Navigation Types
 * Type definitions for React Navigation
 */

import type { NavigatorScreenParams } from '@react-navigation/native';
import type { UserProfile } from '../types/entities/UserProfile';
import type { Friend } from '../types/entities/Friend';

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Friends: undefined;
};

export type RootStackParamList = {
  Landing: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Profile: { initialEditMode?: boolean } | undefined;
  FriendsList: undefined;
  EditFriend: { friend: Friend };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
