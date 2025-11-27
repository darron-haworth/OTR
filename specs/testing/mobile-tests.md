# Mobile Testing Specifications

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
