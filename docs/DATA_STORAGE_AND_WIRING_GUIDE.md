# Data Storage and Wiring Guide

## Current State Summary

### ✅ What's Already Built

#### 1. **Local Storage Services** (`mobile/services/`)
- ✅ **LocalStorageService** - Handles encrypted local storage
  - Stores PII encrypted separately from non-PII
  - Uses AsyncStorage for persistence
  - Methods: `saveUserProfile()`, `getUserProfile()`, `saveFriends()`, `getFriends()`
  
- ✅ **EncryptionService** - AES-256-GCM encryption
  - Master key stored in device keychain
  - PBKDF2 key derivation from passphrase
  - Methods: `initializeMasterKey()`, `encrypt()`, `decrypt()`

- ✅ **BackupService** - Encrypted cloud backups
  - Creates periodic encrypted backups
  - Restores from backups
  - Methods: `createBackup()`, `restoreFromBackup()`

- ✅ **CloudSyncService** - Cloud synchronization
  - Registers user and gets cloud GUID
  - Syncs only non-PII metadata
  - Methods: `registerUser()`, `syncUserProfile()`

#### 2. **Backend** (`backend/`)
- ✅ **User Registration** - `/api/users/register`
  - Creates cloud GUID
  - Returns JWT token
  - Stores only non-PII (publicName, deviceId)
  
- ⚠️ **Partially Implemented**:
  - User registration works
  - Backup endpoints exist (from generated API client)
  - Connection endpoints exist (from generated API client)
  - **Missing**: Full implementation of backup/connection services

#### 3. **Screens** (`mobile/src/screens/`)
- ✅ All 4 screens created
- ⚠️ **Not Connected**: Screens use local state, not storage services

### ❌ What's Missing / Needs Wiring

1. **State Management** - No global state management connected
2. **Service Initialization** - Services not initialized in App
3. **Screen Integration** - Screens not connected to storage
4. **Encryption Setup** - No passphrase/encryption initialization flow
5. **Data Loading** - No data loading on app start
6. **Backend Connection** - API client not fully configured

---

## Architecture Overview

### Data Flow

```
App Start
  ↓
Initialize EncryptionService (check for master key)
  ↓
Load User Profile from LocalStorageService
  ↓
Load Friends from LocalStorageService
  ↓
Pass to AppNavigator → Screens
  ↓
User Actions (save profile, add friend, etc.)
  ↓
Update LocalStorageService
  ↓
(Optional) Sync to Cloud via CloudSyncService
  ↓
(Periodic) Create Backup via BackupService
```

### Storage Strategy

**Local-First Architecture**:
- All PII encrypted and stored locally
- Cloud stores only GUIDs and encrypted backups
- Zero-knowledge: Backend cannot decrypt user data

**Data Separation**:
- **PII** (firstName, lastName, birthDate) → Encrypted storage
- **Non-PII** (publicName, recoveryGroups, GUIDs) → Plain text storage
- **Backups** → Fully encrypted before upload

---

## Step-by-Step Wiring Guide

### Step 1: Create State Management Context

Create a context provider to manage app state and services:

**File**: `mobile/src/providers/AppProvider.tsx`

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocalStorageService } from '../services/storage/LocalStorageService';
import { EncryptionService } from '../services/encryption/EncryptionService';
import { CloudSyncService } from '../services/sync/CloudSyncService';
import { BackupService } from '../services/backup/BackupService';
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
  
  // Actions
  updateProfile: (profile: UserProfile) => Promise<void>;
  addFriend: (friend: Omit<Friend, 'localId' | 'addedDate' | 'lastUpdated' | 'connectionStatus'>) => Promise<void>;
  updateFriend: (friend: Friend) => Promise<void>;
  deleteFriend: (friendId: string) => Promise<void>;
  initializeEncryption: (passphrase: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize services
  const encryption = new EncryptionService();
  const storage = new LocalStorageService(encryption);
  const cloudSync = new CloudSyncService(storage);
  const backup = new BackupService(storage, encryption);
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    try {
      setIsLoading(true);
      
      // Check if encryption is initialized
      const hasMasterKey = await encryption.hasMasterKey();
      if (!hasMasterKey) {
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
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateProfile = async (updatedProfile: UserProfile) => {
    await storage.saveUserProfile(updatedProfile);
    setProfile(updatedProfile);
    // Optionally sync to cloud
    // await cloudSync.syncUserProfile();
  };
  
  const addFriend = async (friendData: Omit<Friend, 'localId' | 'addedDate' | 'lastUpdated' | 'connectionStatus'>) => {
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
  };
  
  const updateFriend = async (updatedFriend: Friend) => {
    const updatedFriends = friends.map(f => 
      f.localId === updatedFriend.localId ? updatedFriend : f
    );
    await storage.saveFriends(updatedFriends);
    setFriends(updatedFriends);
  };
  
  const deleteFriend = async (friendId: string) => {
    const updatedFriends = friends.filter(f => f.localId !== friendId);
    await storage.saveFriends(updatedFriends);
    setFriends(updatedFriends);
  };
  
  const initializeEncryption = async (passphrase: string) => {
    await encryption.initializeMasterKey(passphrase);
    setIsInitialized(true);
    // Reload data after encryption is initialized
    await loadData();
  };
  
  return (
    <AppContext.Provider
      value={{
        storage,
        encryption,
        cloudSync,
        backup,
        profile,
        friends,
        isLoading,
        isInitialized,
        updateProfile,
        addFriend,
        updateFriend,
        deleteFriend,
        initializeEncryption,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
```

### Step 2: Update App.tsx to Use Provider

**File**: `mobile/App.tsx`

```typescript
import React from 'react';
import { AppProvider } from './src/providers/AppProvider';
import { AppNavigator } from './src/navigation';
import { useApp } from './src/providers/AppProvider';

function AppContent(): React.JSX.Element {
  const { profile, friends, isLoading, isInitialized, updateProfile, addFriend, updateFriend, deleteFriend } = useApp();
  
  if (isLoading) {
    return <LoadingScreen />; // Create a loading screen
  }
  
  if (!isInitialized) {
    return <EncryptionSetupScreen />; // Create encryption setup screen
  }
  
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

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
```

### Step 3: Create Encryption Setup Screen

**File**: `mobile/src/screens/EncryptionSetup/EncryptionSetupScreen.tsx`

```typescript
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useApp } from '@/providers/AppProvider';
import { NeuButton } from '@/components/common/NeuButton';
// ... (full implementation with passphrase input, confirmation, etc.)
```

### Step 4: Update AppNavigator to Remove Local State

The `AppNavigator` already accepts props, so it should work as-is. The state management is now in the provider.

### Step 5: Configure API Client

**File**: `mobile/services/api/client.ts`

Update `API_BASE_URL` to point to your backend:

```typescript
export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api'  // Development
  : 'https://api.ourtimerecovered.com/api';  // Production
```

### Step 6: Initialize Backend

**Backend Setup**:

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Configure Firebase**:
   - Create Firebase project
   - Add Firebase config to `.env`
   - See `backend/.env.example`

3. **Start backend**:
   ```bash
   npm run dev
   ```

---

## Implementation Checklist

### Phase 1: Basic Wiring (Required for App to Work)
- [ ] Create `AppProvider` with state management
- [ ] Create `EncryptionSetupScreen` for first-time setup
- [ ] Create `LoadingScreen` component
- [ ] Update `App.tsx` to use provider
- [ ] Test: Load and save profile
- [ ] Test: Add and save friends

### Phase 2: Cloud Integration (Optional for MVP)
- [ ] Configure API client with backend URL
- [ ] Implement user registration flow
- [ ] Test: Register user and get cloud GUID
- [ ] Implement backup creation
- [ ] Test: Create and restore backup

### Phase 3: Advanced Features (Future)
- [ ] Automatic periodic backups
- [ ] Connection sync between friends
- [ ] Biometric authentication
- [ ] Error handling and retry logic
- [ ] Offline mode handling

---

## Quick Start: Minimal Wiring

If you want to get the app working quickly without cloud features:

1. **Create AppProvider** (simplified version without cloud services)
2. **Update App.tsx** to use provider
3. **Skip encryption setup** for now (or use a default key)
4. **Test locally** - everything should work with local storage only

The app will work fully offline with local storage. Cloud features can be added later.

---

## File Structure After Wiring

```
mobile/src/
├── providers/
│   └── AppProvider.tsx          # NEW - State management
├── screens/
│   ├── EncryptionSetup/          # NEW - First-time setup
│   │   └── EncryptionSetupScreen.tsx
│   ├── Loading/                  # NEW - Loading state
│   │   └── LoadingScreen.tsx
│   ├── Landing/
│   ├── Profile/
│   └── Friends/
├── services/                      # EXISTS - Storage services
│   ├── storage/
│   ├── encryption/
│   ├── backup/
│   └── sync/
└── navigation/
    └── AppNavigator.tsx          # EXISTS - Already accepts props
```

---

## Testing the Wiring

1. **Test Profile Save**:
   - Open Profile screen
   - Edit profile
   - Save
   - Close and reopen app
   - Profile should persist

2. **Test Friends**:
   - Add a friend
   - Close and reopen app
   - Friend should persist

3. **Test Encryption**:
   - Clear app data
   - Open app
   - Should prompt for encryption setup
   - After setup, data should be encrypted

---

## Next Steps

1. **Start with Phase 1** - Get basic local storage working
2. **Test thoroughly** - Make sure data persists
3. **Add Phase 2** - Connect to backend when ready
4. **Iterate** - Add features as needed

The architecture is solid - you just need to wire the pieces together!

