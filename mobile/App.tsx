/**
 * OTR Milestone Tracker - Main App Component
 * 
 * Entry point for the React Native application
 * Handles initialization, encryption setup, and navigation
 */

import React from 'react';
import { AppProvider, useApp } from './src/providers';
import { AppNavigator } from './src/navigation';
import { LoadingScreen } from './src/screens/Loading';
import { EncryptionSetupScreen } from './src/screens/EncryptionSetup';

/**
 * Main app content that uses the app context
 */
function AppContent(): React.JSX.Element {
  const {
    profile,
    friends,
    isLoading,
    isInitialized,
    updateProfile,
    addFriend,
    updateFriend,
    deleteFriend,
  } = useApp();

  // Show loading screen while initializing
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show encryption setup if not initialized
  if (!isInitialized) {
    return <EncryptionSetupScreen />;
  }

  // Show main app with navigation
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
