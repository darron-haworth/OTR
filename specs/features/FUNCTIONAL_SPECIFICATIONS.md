# Functional Specifications

## User Stories and Acceptance Criteria

### Epic: User Profile Management

#### User Story: Profile Creation
**As a** new user  
**I want to** create a local profile with my recovery information  
**So that I** can track my recovery milestones

**Acceptance Criteria:**
- [ ] User can enter First Name, Last Name, and Public Name
- [ ] Birth date picker validates age (must be 13+)
- [ ] User can select one or more recovery groups
- [ ] User can set recovery date for each selected group
- [ ] Recovery date cannot be in the future
- [ ] All data is encrypted and stored locally
- [ ] GUID is generated and stored upon profile completion
- [ ] Profile creation works offline

### Epic: Friends Management

#### User Story: Add Recovery Friend
**As a** user in recovery  
**I want to** add friends to my recovery network  
**So that I** can support and be supported by others in recovery

**Acceptance Criteria:**
- [ ] User can add friend with all required fields
- [ ] Friend GUID is generated upon creation
- [ ] Friend data is encrypted locally
- [ ] User can tag friend with multiple recovery groups
- [ ] User can set individual recovery dates per group for friend
- [ ] Friend list is searchable by name or recovery group
- [ ] User can edit friend information
- [ ] User can remove friends with confirmation

### Epic: Milestone Tracking

#### User Story: View Recovery Milestones
**As a** user  
**I want to** see upcoming recovery milestones  
**So that I** can celebrate achievements and support friends

**Acceptance Criteria:**
- [ ] Dashboard shows user's days/months/years in recovery
- [ ] Upcoming milestones highlighted (30, 60, 90 days, yearly)
- [ ] Friends' upcoming milestones visible (with permission)
- [ ] Milestone notifications (optional, customizable)
- [ ] Visual celebration for milestone achievements

## Recovery Groups Configuration

### Supported 12-Step Programs
```javascript
const RECOVERY_GROUPS = {
  AA: {
    id: 'aa',
    name: 'Alcoholics Anonymous',
    abbreviation: 'AA',
    description: 'For alcohol addiction recovery',
    primaryColor: '#0066CC',
    icon: 'aa-icon'
  },
  NA: {
    id: 'na',
    name: 'Narcotics Anonymous',
    abbreviation: 'NA',
    description: 'For drug addiction and substance abuse',
    primaryColor: '#FF6B35',
    icon: 'na-icon'
  },
  AL_ANON: {
    id: 'al-anon',
    name: 'Al-Anon/Alateen',
    abbreviation: 'Al-Anon',
    description: 'For families affected by alcoholism',
    primaryColor: '#28A745',
    icon: 'al-anon-icon'
  },
  GA: {
    id: 'ga',
    name: 'Gamblers Anonymous',
    abbreviation: 'GA',
    description: 'For compulsive gambling',
    primaryColor: '#FFC107',
    icon: 'ga-icon'
  },
  OA: {
    id: 'oa',
    name: 'Overeaters Anonymous',
    abbreviation: 'OA',
    description: 'For compulsive eating',
    primaryColor: '#9C27B0',
    icon: 'oa-icon'
  },
  SAA: {
    id: 'saa',
    name: 'Sex Addicts Anonymous',
    abbreviation: 'SAA',
    description: 'For compulsive sexual behavior',
    primaryColor: '#795548',
    icon: 'saa-icon'
  },
  CA: {
    id: 'ca',
    name: 'Cocaine Anonymous',
    abbreviation: 'CA',
    description: 'For cocaine and substance abuse',
    primaryColor: '#E91E63',
    icon: 'ca-icon'
  },
  DA: {
    id: 'da',
    name: 'Debtors Anonymous',
    abbreviation: 'DA',
    description: 'For compulsive debting',
    primaryColor: '#00BCD4',
    icon: 'da-icon'
  },
  CODA: {
    id: 'coda',
    name: 'Codependents Anonymous',
    abbreviation: 'CoDA',
    description: 'For codependent relationships',
    primaryColor: '#FF5722',
    icon: 'coda-icon'
  },
  EA: {
    id: 'ea',
    name: 'Emotions Anonymous',
    abbreviation: 'EA',
    description: 'For emotional and mental health',
    primaryColor: '#3F51B5',
    icon: 'ea-icon'
  },
  OTHER: {
    id: 'other',
    name: 'Other/Unaffiliated',
    abbreviation: 'Other',
    description: 'Other recovery programs',
    primaryColor: '#607D8B',
    icon: 'other-icon'
  }
};
```
