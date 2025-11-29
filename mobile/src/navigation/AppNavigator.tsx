/**
 * App Navigator
 * Main navigation structure for the app
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LandingScreen } from '@/screens/Landing';
import { ProfileScreen } from '@/screens/Profile';
import { FriendsListScreen, EditFriendScreen } from '@/screens/Friends';
import type { RootStackParamList } from './types';
import type { UserProfile } from '@/types/entities/UserProfile';
import type { Friend, RecoveryGroupMembership } from '@/types/entities/Friend';

const Stack = createNativeStackNavigator<RootStackParamList>();

export interface AppNavigatorProps {
  initialProfile?: UserProfile;
  initialFriends?: Friend[];
  onUpdateProfile?: (profile: UserProfile) => void;
  onAddFriend?: (friend: Omit<Friend, 'localId' | 'addedDate' | 'lastUpdated' | 'connectionStatus'>) => void;
  onUpdateFriend?: (friend: Friend) => void;
  onDeleteFriend?: (friendId: string) => void;
}

export const AppNavigator: React.FC<AppNavigatorProps> = ({
  initialProfile,
  initialFriends = [],
  onUpdateProfile,
  onAddFriend,
  onUpdateFriend,
  onDeleteFriend,
}) => {
  // In a real app, these would come from state management (Redux, Zustand, etc.)
  const [profile, setProfile] = React.useState<UserProfile | undefined>(initialProfile);
  const [friends, setFriends] = React.useState<Friend[]>(initialFriends);

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    onUpdateProfile?.(updatedProfile);
  };

  const handleAddFriend = (friendData: Omit<Friend, 'localId' | 'addedDate' | 'lastUpdated' | 'connectionStatus'>) => {
    const newFriend: Friend = {
      ...friendData,
      localId: `friend-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      addedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      connectionStatus: 'local',
    };
    setFriends([...friends, newFriend]);
    onAddFriend?.(friendData);
  };

  const handleUpdateFriend = (updatedFriend: Friend) => {
    setFriends(friends.map((f) => (f.localId === updatedFriend.localId ? updatedFriend : f)));
    onUpdateFriend?.(updatedFriend);
  };

  const handleDeleteFriend = (friendId: string) => {
    setFriends(friends.filter((f) => f.localId !== friendId));
    onDeleteFriend?.(friendId);
  };

  // Default profile if none provided
  const defaultProfile: UserProfile = profile || {
    localId: 'user-default',
    firstName: '',
    lastName: '',
    publicName: '',
    birthDate: '',
    recoveryGroups: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    encryptionVersion: 1,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Landing">
          {(props) => (
            <LandingScreen
              {...props}
              onNavigateToProfile={() => props.navigation.navigate('Profile')}
              onNavigateToFriends={() => props.navigation.navigate('FriendsList')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Profile">
          {(props) => (
            <ProfileScreen
              {...props}
              profile={defaultProfile}
              onUpdateProfile={handleUpdateProfile}
              onNavigateBack={() => props.navigation.goBack()}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="FriendsList">
          {(props) => (
            <FriendsListScreen
              {...props}
              friends={friends}
              onAddFriend={handleAddFriend}
              onEditFriend={(friend) => props.navigation.navigate('EditFriend', { friend })}
              onNavigateBack={() => props.navigation.goBack()}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="EditFriend">
          {(props) => (
            <EditFriendScreen
              {...props}
              friend={props.route.params.friend}
              onSave={handleUpdateFriend}
              onDelete={handleDeleteFriend}
              onNavigateBack={() => props.navigation.goBack()}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

