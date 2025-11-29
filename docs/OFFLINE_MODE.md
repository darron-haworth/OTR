# Offline Mode Configuration

## ✅ App Runs Fully Offline

The app is configured to run **completely offline** with **no API calls**. All data is stored locally and encrypted on the device.

## Current Configuration

### API Calls Disabled
- ✅ **API_BASE_URL** is empty by default (`''`)
- ✅ All API functions have guards that throw errors if `API_BASE_URL` is not configured
- ✅ No automatic API calls are made
- ✅ Cloud sync is commented out in AppProvider
- ✅ Backup service exists but is not called automatically

### Local Storage Only
- ✅ All data stored in AsyncStorage (encrypted)
- ✅ Profile and friends persist locally
- ✅ No network dependency
- ✅ Works completely offline

## Services Status

### ✅ Active Services (Local Only)
- **LocalStorageService** - Saves/loads encrypted data locally
- **EncryptionService** - Encrypts/decrypts PII data
- **AppProvider** - Manages state and data persistence

### ⏸️ Available But Not Used (For Future)
- **CloudSyncService** - Initialized but not called
- **BackupService** - Initialized but not called
- **API Client** - Functions exist but throw errors if called

## How It Works

### Data Flow (Current - Offline)
```
User Action
  ↓
AppProvider method (updateProfile, addFriend, etc.)
  ↓
LocalStorageService.save*() (encrypted)
  ↓
AsyncStorage (local device storage)
  ↓
Data persists across app restarts
```

### No Network Calls
- ❌ No user registration calls
- ❌ No backup uploads
- ❌ No connection sync
- ❌ No API requests of any kind

## Verification

### Check API Configuration
```typescript
// mobile/services/client.ts
export const API_BASE_URL = process.env.API_BASE_URL || '';
// Empty string = offline mode
```

### Check AppProvider
```typescript
// mobile/src/providers/AppProvider.tsx
// Cloud sync disabled - app runs fully offline
// To enable later: await cloudSync.syncUserProfile();
```

### API Function Guards
All API functions in `mobile/services/api/client.ts` have:
```typescript
function ensureApiConfigured(): void {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL not configured. App is running in offline mode.');
  }
}
```

## Enabling Cloud Features Later

When you're ready to add cloud backup functionality:

### Step 1: Configure API URL
```typescript
// mobile/services/client.ts
export const API_BASE_URL = process.env.API_BASE_URL || 'https://api.ourtimerecovered.com/api';
```

### Step 2: Enable Cloud Sync (Optional)
```typescript
// mobile/src/providers/AppProvider.tsx
const updateProfile = async (updatedProfile: UserProfile) => {
  await storage.saveUserProfile(updatedProfile);
  setProfile(updatedProfile);
  // Uncomment to enable:
  // await cloudSync.syncUserProfile();
};
```

### Step 3: Add Backup Functionality
```typescript
// In a screen or service
const { backup } = useApp();
await backup.createBackup();
```

## Testing Offline Mode

### Verify No Network Calls
1. Run app with network disabled
2. All features should work normally
3. Check network tab - no requests should be made
4. Data should persist after app restart

### Test Data Persistence
1. Add profile data
2. Add friends
3. Close app completely
4. Reopen app
5. All data should be present

## Current Behavior

### ✅ What Works (Offline)
- Profile creation and editing
- Friends management
- Recovery programs tracking
- Milestone calculations
- Data encryption
- Local data persistence

### ⏸️ What's Available But Not Used
- Cloud user registration
- Encrypted backup uploads
- Backup restoration
- Connection sync
- Friend GUID generation

## Summary

**The app is fully functional offline with no API dependencies.**

- All data is encrypted and stored locally
- No network calls are made
- Everything works without internet connection
- Cloud features can be enabled later when ready

The architecture supports cloud features, but they are **completely disabled** and will not be called unless explicitly enabled.

