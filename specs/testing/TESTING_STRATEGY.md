# Testing Strategy

## Test Coverage Requirements
- Unit Tests: 80% minimum coverage
- Integration Tests: Critical user flows
- E2E Tests: Core functionality
- Security Tests: All authentication and encryption flows

## Unit Testing Examples

### Profile Service Tests
```javascript
// __tests__/services/ProfileService.test.js
import { ProfileService } from '../services/ProfileService';
import { EncryptionService } from '../services/EncryptionService';

jest.mock('../services/EncryptionService');

describe('ProfileService', () => {
  let profileService;
  let mockEncryption;

  beforeEach(() => {
    mockEncryption = new EncryptionService();
    profileService = new ProfileService(mockEncryption);
  });

  describe('createProfile', () => {
    test('should validate required fields', async () => {
      const invalidProfile = {
        firstName: '',
        lastName: 'Doe'
      };

      await expect(profileService.createProfile(invalidProfile))
        .rejects.toThrow('First name is required');
    });

    test('should encrypt PII before storage', async () => {
      const profile = {
        firstName: 'John',
        lastName: 'Doe',
        publicName: 'JD',
        birthDate: '1990-01-01',
        recoveryGroups: [
          {
            groupId: 'aa',
            recoveryDate: '2020-01-01',
            isActive: true
          }
        ]
      };

      mockEncryption.encryptData.mockResolvedValue({
        iv: 'test-iv',
        ciphertext: 'encrypted-data',
        authTag: 'test-tag'
      });

      await profileService.createProfile(profile);

      expect(mockEncryption.encryptData).toHaveBeenCalledWith(
        expect.stringContaining('firstName'),
        expect.any(String)
      );
    });

    test('should generate valid GUID', async () => {
      const profile = createValidProfile();
      const result = await profileService.createProfile(profile);

      expect(result.localId).toMatch(
        /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
      );
    });
  });

  describe('calculateMilestones', () => {
    test('should identify 30-day milestone', () => {
      const recoveryDate = new Date();
      recoveryDate.setDate(recoveryDate.getDate() - 29);

      const milestones = profileService.calculateMilestones(recoveryDate);

      expect(milestones).toContainEqual(
        expect.objectContaining({
          type: '30-days',
          date: expect.any(Date),
          daysUntil: 1
        })
      );
    });
  });
});
```

### Security Testing
```javascript
// __tests__/security/EncryptionService.test.js
describe('EncryptionService Security Tests', () => {
  test('should use sufficient key derivation iterations', async () => {
    const service = new EncryptionService();
    const spy = jest.spyOn(CryptoJS, 'PBKDF2');
    
    await service.initializeMasterKey('testpassphrase');
    
    expect(spy).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object),
      expect.objectContaining({
        iterations: expect.toBeGreaterThanOrEqual(100000)
      })
    );
  });

  test('should detect data tampering', async () => {
    const service = new EncryptionService();
    const key = 'test-key';
    const plaintext = 'sensitive data';
    
    const encrypted = service.encryptData(plaintext, key);
    
    // Tamper with ciphertext
    encrypted.ciphertext = encrypted.ciphertext.replace('a', 'b');
    
    expect(() => service.decryptData(encrypted, key))
      .toThrow('Decryption failed - data may be tampered');
  });
});
```

## Integration Testing

### API Integration Tests
```javascript
// __tests__/integration/BackupService.test.js
describe('Backup Service Integration', () => {
  test('should successfully backup and restore friend list', async () => {
    // Create test data
    const friends = [
      createTestFriend('Alice'),
      createTestFriend('Bob')
    ];
    
    // Backup
    const backupService = new BackupService();
    const backupId = await backupService.createBackup(friends);
    
    expect(backupId).toBeDefined();
    
    // Clear local data
    await AsyncStorage.clear();
    
    // Restore
    const restoredFriends = await backupService.restoreBackup(backupId);
    
    expect(restoredFriends).toHaveLength(2);
    expect(restoredFriends[0].firstName).toBe('Alice');
  });
});
```

## E2E Testing with Detox

### Core User Flow Tests
```javascript
// e2e/userFlows.test.js
describe('Core User Flows', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: {
        notifications: 'YES',
        camera: 'NO',
        location: 'NO'
      }
    });
  });

  test('New user onboarding flow', async () => {
    // Welcome screen
    await expect(element(by.id('welcome-screen'))).toBeVisible();
    await element(by.id('get-started-button')).tap();
    
    // Profile creation
    await element(by.id('first-name-input')).typeText('John');
    await element(by.id('last-name-input')).typeText('Doe');
    await element(by.id('public-name-input')).typeText('JD');
    
    // Select recovery group
    await element(by.id('recovery-group-aa')).tap();
    await element(by.id('recovery-date-picker')).setDate('2020-01-01');
    
    // Complete profile
    await element(by.id('create-profile-button')).tap();
    
    // Verify dashboard
    await expect(element(by.id('dashboard-screen'))).toBeVisible();
    await expect(element(by.text('Welcome, JD'))).toBeVisible();
  });

  test('Add friend and view milestone', async () => {
    // Navigate to friends
    await element(by.id('friends-tab')).tap();
    
    // Add friend
    await element(by.id('add-friend-button')).tap();
    await element(by.id('friend-first-name')).typeText('Jane');
    await element(by.id('friend-last-name')).typeText('Smith');
    
    // Set recovery info
    await element(by.id('friend-group-na')).tap();
    await element(by.id('friend-recovery-date')).setDate('2023-01-01');
    
    // Save friend
    await element(by.id('save-friend-button')).tap();
    
    // Verify friend appears
    await expect(element(by.text('Jane Smith'))).toBeVisible();
    
    // Check milestones
    await element(by.id('milestones-tab')).tap();
    await expect(element(by.text('Jane - 2 years'))).toBeVisible();
  });
});
```

## Security Testing Checklist

```markdown
## Pre-Release Security Checklist

### Data Protection
- [ ] All PII is encrypted at rest
- [ ] Encryption keys are properly derived (PBKDF2 100k+ iterations)
- [ ] Sensitive data is cleared from memory after use
- [ ] No sensitive data in logs or crash reports
- [ ] Clipboard is disabled for sensitive fields

### Authentication
- [ ] Biometric authentication implemented
- [ ] Session timeout configured (15 minutes)
- [ ] Failed authentication attempts limited (5 max)
- [ ] Account lockout mechanism in place
- [ ] JWT tokens expire appropriately

### Network Security
- [ ] Certificate pinning implemented
- [ ] All connections use TLS 1.3+
- [ ] No sensitive data in URL parameters
- [ ] Request/response integrity verification
- [ ] API rate limiting configured

### Code Security
- [ ] No hardcoded secrets or keys
- [ ] Code obfuscation enabled for production
- [ ] Debug logging disabled in production
- [ ] Anti-tampering checks in place
- [ ] Root/jailbreak detection enabled

### Privacy
- [ ] Minimal data collection
- [ ] User consent for all data collection
- [ ] Data retention policies implemented
- [ ] Right to deletion supported
- [ ] Analytics anonymized

### Compliance
- [ ] OWASP Mobile Top 10 addressed
- [ ] NIST framework implemented
- [ ] Privacy policy updated
- [ ] Terms of service reviewed
- [ ] Third-party dependencies audited
```
