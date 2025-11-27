# Backend Testing Specifications

## Test Coverage Requirements
- Unit Tests: 80% minimum coverage
- Integration Tests: Critical user flows
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
