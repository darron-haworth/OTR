/**
 * OTR Milestone Tracker - Main App Component
 * 
 * Entry point for the React Native application
 * Local storage is protected by app sandbox, no encryption needed
 * Encryption will be added later for cloud backups only
 */

import React from 'react';
import { AppProvider, useApp } from './src/providers';
import { AppNavigator } from './src/navigation';
import { LoadingScreen } from './src/screens/Loading';

/**
 * Main app content that uses the app context
 */
function AppContent(): React.JSX.Element {
  const {
    profile,
    friends,
    isLoading,
    updateProfile,
    addFriend,
    updateFriend,
    deleteFriend,
  } = useApp();

  // Show loading screen while initializing
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show main app with navigation (no encryption setup needed)
  return (
    <AppNavigator
      initialProfile={profile || undefined}
      initialFriends={friends}
      onUpdateProfile={updateProfile}
      onAddFriend={addFriend}
      onUpdateFriend={updateFriend}
      onDeleteFriend={deleteFriend}
    />
  );
}

/**
 * Root app component with provider
 */
function App(): React.JSX.Element {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
