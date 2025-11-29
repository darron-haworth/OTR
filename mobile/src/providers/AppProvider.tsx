/**
 * App Provider
 * Global state management and service initialization
 * Connects storage services to the app
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LocalStorageService, EncryptionService, CloudSyncService, BackupService } from '../../services';
import type { UserProfile } from '../types/entities/UserProfile';
import type { Friend } from '../types/entities/Friend';

interface AppContextType {
  // Services
  storage: LocalStorageService;
  encryption: EncryptionService;
  cloudSync: CloudSyncService;
  backup: BackupService;
  
  // State
  profile: UserProfile | null;
  friends: Friend[];
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  
  // Actions
  updateProfile: (profile: UserProfile) => Promise<void>;
  addFriend: (friend: Omit<Friend, 'localId' | 'addedDate' | 'lastUpdated' | 'connectionStatus'>) => Promise<void>;
  updateFriend: (friend: Friend) => Promise<void>;
  deleteFriend: (friendId: string) => Promise<void>;
  initializeEncryption: (passphrase: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Initialize services (singleton pattern)
  // NOTE: cloudSync and backup are initialized but NOT used automatically
  // They are available for future cloud features but make NO API calls by default
  const [encryption] = useState(() => new EncryptionService());
  const [storage] = useState(() => new LocalStorageService(encryption));
  const [cloudSync] = useState(() => new CloudSyncService(storage));
  const [backup] = useState(() => new BackupService(storage, encryption));
  
  // App state
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  /**
   * Load data from storage
   */
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check if encryption is initialized
      const hasEncryption = await encryption.isInitialized();
      if (!hasEncryption) {
        setIsInitialized(false);
        setIsLoading(false);
        return;
      }
      
      // Load profile and friends
      const loadedProfile = await storage.getUserProfile();
      const loadedFriends = await storage.getFriends();
      
      setProfile(loadedProfile);
      setFriends(loadedFriends || []);
      setIsInitialized(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
      console.error('Error loading data:', err);
      setError(errorMessage);
      setIsInitialized(false);
    } finally {
      setIsLoading(false);
    }
  }, [encryption, storage]);
  
  /**
   * Initialize encryption with passphrase
   */
  const initializeEncryption = useCallback(async (passphrase: string) => {
    try {
      setError(null);
      await encryption.initializeMasterKey(passphrase);
      setIsInitialized(true);
      // Reload data after encryption is initialized
      await loadData();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize encryption';
      console.error('Error initializing encryption:', err);
      setError(errorMessage);
      throw err;
    }
  }, [encryption, loadData]);
  
  /**
   * Update user profile
   * NOTE: This only saves locally. No API calls are made.
   * Cloud sync can be added later when backend is ready.
   */
  const updateProfile = useCallback(async (updatedProfile: UserProfile) => {
    try {
      setError(null);
      await storage.saveUserProfile(updatedProfile);
      setProfile(updatedProfile);
      // Cloud sync disabled - app runs fully offline
      // To enable later: await cloudSync.syncUserProfile();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save profile';
      console.error('Error saving profile:', err);
      setError(errorMessage);
      throw err;
    }
  }, [storage]);
  
  /**
   * Add a new friend
   */
  const addFriend = useCallback(async (
    friendData: Omit<Friend, 'localId' | 'addedDate' | 'lastUpdated' | 'connectionStatus'>
  ) => {
    try {
      setError(null);
      const newFriend: Friend = {
        ...friendData,
        localId: `friend-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        addedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        connectionStatus: 'local',
      };
      
      const updatedFriends = [...friends, newFriend];
      await storage.saveFriends(updatedFriends);
      setFriends(updatedFriends);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add friend';
      console.error('Error adding friend:', err);
      setError(errorMessage);
      throw err;
    }
  }, [friends, storage]);
  
  /**
   * Update an existing friend
   */
  const updateFriend = useCallback(async (updatedFriend: Friend) => {
    try {
      setError(null);
      const updatedFriends = friends.map(f => 
        f.localId === updatedFriend.localId ? {
          ...updatedFriend,
          lastUpdated: new Date().toISOString(),
        } : f
      );
      await storage.saveFriends(updatedFriends);
      setFriends(updatedFriends);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update friend';
      console.error('Error updating friend:', err);
      setError(errorMessage);
      throw err;
    }
  }, [friends, storage]);
  
  /**
   * Delete a friend
   */
  const deleteFriend = useCallback(async (friendId: string) => {
    try {
      setError(null);
      const updatedFriends = friends.filter(f => f.localId !== friendId);
      await storage.saveFriends(updatedFriends);
      setFriends(updatedFriends);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete friend';
      console.error('Error deleting friend:', err);
      setError(errorMessage);
      throw err;
    }
  }, [friends, storage]);
  
  /**
   * Refresh data from storage
   */
  const refreshData = useCallback(async () => {
    await loadData();
  }, [loadData]);
  
  // Load data on mount
  useEffect(() => {
    loadData();
  }, [loadData]);
  
  const value: AppContextType = {
    storage,
    encryption,
    cloudSync,
    backup,
    profile,
    friends,
    isLoading,
    isInitialized,
    error,
    updateProfile,
    addFriend,
    updateFriend,
    deleteFriend,
    initializeEncryption,
    refreshData,
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Hook to access app context
 */
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

