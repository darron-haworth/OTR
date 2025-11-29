/**
 * App Navigator
 * Main navigation structure for the app
 * Uses bottom tabs when profile is complete, stack navigator for onboarding
 */

import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LandingScreen } from '../screens/Landing';
import { HomeScreen } from '../screens/Home';
import { ProfileScreen } from '../screens/Profile';
import { FriendsListScreen, EditFriendScreen } from '../screens/Friends';
import { isProfileComplete } from '../utils/profileHelpers';
import { colors, typography } from '../theme';
import type { RootStackParamList, MainTabParamList } from './types';
import type { UserProfile } from '../types/entities/UserProfile';
import type { Friend, RecoveryGroupMembership } from '../types/entities/Friend';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

export interface AppNavigatorProps {
  initialProfile?: UserProfile;
  initialFriends?: Friend[];
  onUpdateProfile?: (profile: UserProfile) => void;
  onAddFriend?: (friend: Omit<Friend, 'localId' | 'addedDate' | 'lastUpdated' | 'connectionStatus'>) => void;
  onUpdateFriend?: (friend: Friend) => void;
  onDeleteFriend?: (friendId: string) => void;
}

/**
 * Main Tab Navigator (shown when profile is complete)
 */
const MainTabs: React.FC<{
  profile: UserProfile;
  friends: Friend[];
  onUpdateProfile: (profile: UserProfile) => void;
  onAddFriend: (friend: Omit<Friend, 'localId' | 'addedDate' | 'lastUpdated' | 'connectionStatus'>) => void;
  onEditFriend: (friend: Friend, navigation: any) => void;
}> = ({ profile, friends, onUpdateProfile, onAddFriend, onEditFriend }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[500],
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          borderTopColor: 'transparent',
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: 0,
          borderWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 88 : 60,
          margin: 0,
          paddingHorizontal: 0,
          ...Platform.select({
            android: {
              elevation: 8,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
          }),
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: -4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused, size }) => (
            <Icon 
              name={focused ? 'home' : 'home-outline'} 
              size={size || 24} 
              color={color} 
            />
          ),
        }}
      >
        {({ navigation }) => (
          <HomeScreen
            profile={profile}
            friends={friends}
            onNavigateToProfile={() => navigation.navigate('Profile')}
            onNavigateToFriends={() => navigation.navigate('Friends')}
            onEditFriend={(friend) => onEditFriend(friend, navigation)}
          />
        )}
      </Tab.Screen>
      
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused, size }) => (
            <Icon 
              name={focused ? 'account' : 'account-outline'} 
              size={size || 24} 
              color={color} 
            />
          ),
        }}
      >
        {() => (
          <ProfileScreen
            profile={profile}
            onUpdateProfile={onUpdateProfile}
            onNavigateBack={() => {}}
          />
        )}
      </Tab.Screen>
      
      <Tab.Screen
        name="Friends"
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ color, focused, size }) => (
            <Icon 
              name={focused ? 'account-group' : 'account-group-outline'} 
              size={size || 24} 
              color={color} 
            />
          ),
        }}
      >
        {({ navigation }) => (
          <FriendsListScreen
            friends={friends}
            onAddFriend={onAddFriend}
            onEditFriend={(friend) => onEditFriend(friend, navigation)}
            onNavigateBack={() => {}}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

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
  
  // Update local state when props change
  React.useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
    }
  }, [initialProfile]);
  
  React.useEffect(() => {
    setFriends(initialFriends);
  }, [initialFriends]);

  const handleUpdateProfile = (updatedProfile: UserProfile, navigation?: any) => {
    setProfile(updatedProfile);
    onUpdateProfile?.(updatedProfile);
    // Navigate to Home tab if profile is now complete
    if (navigation && isProfileComplete(updatedProfile)) {
      navigation.navigate('MainTabs', { screen: 'Home' });
    }
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

  // Determine initial route based on profile completeness
  const initialRoute = isProfileComplete(profile) ? 'MainTabs' : 'Landing';

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
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

        <Stack.Screen name="MainTabs">
          {(props) => (
            <MainTabs
              profile={profile || defaultProfile}
              friends={friends}
              onUpdateProfile={(updatedProfile) => handleUpdateProfile(updatedProfile, props.navigation)}
              onAddFriend={handleAddFriend}
              onEditFriend={(friend, tabNavigation) => {
                // Navigate to EditFriend from the parent stack
                props.navigation.navigate('EditFriend', { friend });
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Profile">
          {(props) => (
            <ProfileScreen
              {...props}
              profile={defaultProfile}
              onUpdateProfile={(updatedProfile) => handleUpdateProfile(updatedProfile, props.navigation)}
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
