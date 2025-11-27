# Development Guidelines

## Code Standards

### File Structure
```
ort-milestone-tracker/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   ├── profile/         # Profile-related components
│   │   ├── friends/         # Friends management components
│   │   └── milestones/      # Milestone tracking components
│   ├── screens/
│   │   ├── auth/           # Authentication screens
│   │   ├── onboarding/     # Onboarding flow
│   │   └── main/           # Main app screens
│   ├── services/
│   │   ├── encryption/     # Encryption services
│   │   ├── storage/        # Secure storage
│   │   ├── api/           # API communication
│   │   └── backup/        # Backup/restore
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── constants/          # App constants
│   └── types/              # TypeScript definitions
├── __tests__/              # Test files
├── e2e/                    # E2E tests
├── ios/                    # iOS specific code
├── android/                # Android specific code
└── docs/                   # Documentation
```

### Coding Conventions

```typescript
/**
 * Component Template
 * Follow this structure for all components
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useEncryption } from '@hooks/useEncryption';
import { UserProfile } from '@types/models';

interface ProfileCardProps {
  profile: UserProfile;
  onEdit?: (profile: UserProfile) => void;
}

/**
 * ProfileCard - Displays user profile information
 * @param {UserProfile} profile - User profile data
 * @param {Function} onEdit - Optional edit callback
 */
export const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  onEdit 
}) => {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  
  // Custom hooks
  const { decrypt } = useEncryption();
  
  // Effects
  useEffect(() => {
    // Effect logic here
  }, [profile]);
  
  // Handlers
  const handleEdit = () => {
    if (onEdit) {
      onEdit(profile);
    }
  };
  
  // Render
  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {profile.publicName}
      </Text>
      {/* Component content */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

### Security-First Development

```typescript
/**
 * ALWAYS follow these security practices
 */

// ❌ NEVER do this
const apiKey = "sk-1234567890abcdef";
const password = "hardcoded-password";

// ✅ ALWAYS do this
const apiKey = process.env.API_KEY;
const password = await SecureStore.getItem('user-password');

// ❌ NEVER log sensitive data
console.log('User data:', userData);

// ✅ ALWAYS sanitize logs
console.log('User action:', { 
  action: 'login', 
  userId: userData.guid 
});

// ❌ NEVER store unencrypted PII
await AsyncStorage.setItem('profile', JSON.stringify(profile));

// ✅ ALWAYS encrypt PII
const encrypted = await encryptionService.encrypt(profile);
await SecureStorage.setItem('profile', encrypted);
```

## Git Workflow

### Branch Strategy
```bash
main                 # Production-ready code
├── develop         # Integration branch
│   ├── feature/*   # New features
│   ├── bugfix/*    # Bug fixes
│   ├── security/*  # Security updates
│   └── hotfix/*    # Emergency fixes
```

### Commit Message Format
```bash
# Format: <type>(<scope>): <subject>

feat(profile): add biometric authentication
fix(friends): resolve duplicate GUID generation
security(encryption): upgrade to AES-256-GCM
docs(api): update backup endpoint documentation
test(milestones): add unit tests for calculations
refactor(storage): optimize encryption performance
```

### Pre-commit Checklist
```bash
# Run before every commit
npm run lint           # ESLint check
npm run type-check     # TypeScript validation
npm run test:unit      # Unit tests
npm run test:security  # Security tests
npm run audit         # Dependency audit
```

## Environment Configuration

### .env.example
```bash
# API Configuration
API_BASE_URL=https://api.ourtimerecovered.com
API_VERSION=v1

# Firebase Configuration
FIREBASE_API_KEY=your-api-key-here
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id

# Security Configuration
ENCRYPTION_ALGORITHM=AES-256-GCM
PBKDF2_ITERATIONS=100000
JWT_EXPIRY=7d
SESSION_TIMEOUT=900000  # 15 minutes

# Feature Flags
ENABLE_BIOMETRIC_AUTH=true
ENABLE_CRASH_REPORTING=true
ENABLE_ANALYTICS=false  # Disabled by default for privacy

# Development
DEV_MODE=false
ENABLE_FLIPPER=false
```

### Security Configuration
```javascript
// config/security.js
export const securityConfig = {
  encryption: {
    algorithm: 'aes-256-gcm',
    keyDerivation: {
      algorithm: 'pbkdf2',
      iterations: parseInt(process.env.PBKDF2_ITERATIONS || '100000'),
      keyLength: 256,
      digest: 'sha256'
    }
  },
  
  authentication: {
    biometric: {
      enabled: process.env.ENABLE_BIOMETRIC_AUTH === 'true',
      fallbackToPasscode: true,
      maxAttempts: 3
    },
    session: {
      timeout: parseInt(process.env.SESSION_TIMEOUT || '900000'),
      extendOnActivity: true
    }
  },
  
  network: {
    certificatePinning: true,
    minTlsVersion: '1.3',
    timeout: 30000
  }
};
```

## Performance Optimization

### React Native Performance
```javascript
// Use React.memo for expensive components
export const ExpensiveComponent = React.memo(({ data }) => {
  return <ComplexVisualization data={data} />;
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.data.id === nextProps.data.id;
});

// Optimize list rendering
import { FlatList } from 'react-native';

export const FriendsList = ({ friends }) => {
  return (
    <FlatList
      data={friends}
      keyExtractor={item => item.localId}
      renderItem={renderFriend}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={10}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index
      })}
    />
  );
};
```

## Accessibility Guidelines

```javascript
// Always include accessibility props
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Add new friend"
  accessibilityHint="Opens form to add a friend to your recovery network"
  accessibilityRole="button"
  onPress={handleAddFriend}
>
  <Text>Add Friend</Text>
</TouchableOpacity>

// Support screen readers
<Text
  accessibilityLiveRegion="polite"
  importantForAccessibility="yes"
>
  {daysInRecovery} days in recovery
</Text>
```

## Release Checklist

```markdown
### Pre-Release Tasks
- [ ] Version bump in package.json
- [ ] Update CHANGELOG.md
- [ ] Run full test suite
- [ ] Security audit passed
- [ ] Performance benchmarks met
- [ ] Accessibility audit completed
- [ ] Privacy policy updated
- [ ] App store descriptions updated
- [ ] Screenshots updated
- [ ] Release notes prepared

### Build Configuration
- [ ] Production environment variables set
- [ ] Debug code removed
- [ ] Console.log statements removed
- [ ] Code obfuscation enabled
- [ ] Certificates valid
- [ ] App signing configured

### Post-Release
- [ ] Monitor crash reports
- [ ] Track user feedback
- [ ] Performance metrics review
- [ ] Security alerts monitoring
- [ ] Update roadmap
```
