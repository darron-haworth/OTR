# Mobile Screen Specifications

## Landing Screen

### Purpose
Initial screen users see when opening the app, providing onboarding and navigation to main features.

### Layout Structure
```
┌─────────────────────────────┐
│      Status Bar             │
├─────────────────────────────┤
│                             │
│     [App Logo/Icon]         │
│                             │
│    "Our Time Recovered"     │
│     (Display Font)          │
│                             │
│   "Your journey, your       │
│    milestones, your         │
│      community"             │
│                             │
├─────────────────────────────┤
│  ┌─────────────────────┐    │
│  │ 🛡️ Complete Privacy │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ ❤️ Supportive       │    │
│  │    Community        │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ 🏆 Track Milestones │    │
│  └─────────────────────┘    │
├─────────────────────────────┤
│                             │
│  [Start Your Journey →]     │
│       (Primary CTA)         │
│                             │
│  [View Recovery Friends]    │
│    (Secondary CTA)          │
│                             │
└─────────────────────────────┘
```

### Components
- **Logo Container**: 120x120px, gradient background with 45° rotation
- **Feature Cards**: Glass morphism effect, icon + text
- **CTA Buttons**: Full width, rounded corners (20px radius)

### Interactions
- Primary CTA → Navigate to Profile Screen
- Secondary CTA → Navigate to Friends List Screen
- Feature cards: Subtle scale animation on press

---

## Profile Screen

### Purpose
Manage user profile information and recovery programs.

### Layout Structure
```
┌─────────────────────────────┐
│  ← My Profile          [✏️] │
├─────────────────────────────┤
│                             │
│        [Avatar]             │
│         [🏆]                │
│                             │
│    [Public Name Field]      │
│                             │
│  [First Name] [Last Name]   │
│                             │
├─────────────────────────────┤
│   Recovery Programs         │
│  ┌─────────────────────┐    │
│  │ 🌟 AA - 365 days    │    │
│  │     [Clock Icon]     │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ 💎 NA - 180 days    │    │
│  │     [Clock Icon]     │    │
│  └─────────────────────┘    │
│                             │
│  [+ Add Program]            │
│                             │
└─────────────────────────────┘
```

### Components
- **Avatar**: 120x120px circle with gradient background
- **Milestone Badge**: 40x40px overlay on avatar for achievements
- **Input Fields**: Bordered with theme colors when active
- **Program Cards**: Display icon, name, and days count
- **Add Program Modal**: Dropdown selector + date picker

### States
- **View Mode**: Fields are read-only with subtle backgrounds
- **Edit Mode**: Fields become editable with highlighted borders
- **Adding Program**: Modal overlay with form

---

## Friends List Screen

### Purpose
View and manage recovery friends with their milestone information.

### Layout Structure
```
┌─────────────────────────────┐
│  ← Recovery Friends    [+]  │
├─────────────────────────────┤
│    [3 Recovery Friends]     │
├─────────────────────────────┤
│  ┌─────────────────────┐    │
│  │ [J]  John D.        >│    │
│  │ 🌟   AA: 6 months   │    │
│  │      NA: 3 months   │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ [S]  Sarah M.      >│    │
│  │ 🎂   AA: 1 year     │    │
│  │      "Sponsor"      │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ [M]  Mike R.       >│    │
│  │ 🌱   AA: 7 days     │    │
│  │      "New member"   │    │
│  └─────────────────────┘    │
└─────────────────────────────┘
```

### Components
- **Friend Card**: 
  - Avatar (60x60px) with initial
  - Milestone badge overlay
  - Program pills showing time
  - Optional notes
  - Chevron indicator for navigation
- **Empty State**: Centered illustration with CTA
- **Add Friend Form**: Expandable form with all fields

### Friend Card Details
```
┌───────────────────────────────┐
│ ┌────┐                        │
│ │ JD │  John Doe              │
│ │[🏆]│  ┌─────────┐ ┌───────┐│
│ └────┘  │AA 6mon🌟│ │NA 3mon││
│         └─────────┘ └───────┘│
│         "Great sponsor"       │
└───────────────────────────────┘
```

---

## Edit Friend Screen

### Purpose
Edit friend's complete profile including recovery programs.

### Layout Structure
```
┌─────────────────────────────┐
│  ← Edit Friend              │
├─────────────────────────────┤
│        [Avatar]             │
│         [🏆]                │
│    "6 Months Clean!"        │
├─────────────────────────────┤
│   Friend Information        │
│  ┌─────────────────────┐    │
│  │ Recovery Name        │    │
│  │ [_______________]    │    │
│  │                      │    │
│  │ First    Last        │    │
│  │ [_____] [______]     │    │
│  │                      │    │
│  │ Notes                │    │
│  │ [_______________]    │    │
│  │ [_______________]    │    │
│  └─────────────────────┘    │
├─────────────────────────────┤
│   Recovery Programs         │
│  ┌─────────────────────┐    │
│  │ Add Program:         │    │
│  │ [Select Program ▼]   │    │
│  │ [Date: ________]     │    │
│  │ [Add Program]        │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │ 🌟 AA               ×│    │
│  │ 365 days            │    │
│  │ Started: 01/01/2024 │    │
│  │ MILESTONE!          │    │
│  └─────────────────────┘    │
├─────────────────────────────┤
│    [Save Changes]           │
│    [Remove Friend]          │
└─────────────────────────────┘
```

### Components
- **Program Management**: Add/remove programs with visual feedback
- **Milestone Display**: Prominent celebration for achievements
- **Action Buttons**: Primary (save) and destructive (remove)

---

## Component Library

### Common Components

#### GlassCard
```typescript
interface GlassCardProps {
  children: React.ReactNode;
  padding?: number;
  borderRadius?: number;
}
```
- Semi-transparent background
- Blur effect (10px)
- Subtle border and shadow

#### NeuButton
```typescript
interface NeuButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'danger';
}
```
- Neumorphic design
- Press state animations
- Haptic feedback

#### MilestoneBadge
```typescript
interface MilestoneBadgeProps {
  timeValue: number;
  timeUnit: 'days' | 'months' | 'years';
  size?: 'small' | 'medium' | 'large';
}
```
- Automatic badge selection
- Animation on achievement
- Overlay positioning

### Recovery Components

#### RecoveryProgramCard
```typescript
interface RecoveryProgramCardProps {
  program: RecoveryGroup;
  recoveryDate: string;
  showMilestone?: boolean;
  onRemove?: () => void;
}
```
- Program icon and name
- Time calculation display
- Milestone celebration
- Optional remove action

#### RecoveryTimeDisplay
```typescript
interface RecoveryTimeDisplayProps {
  startDate: string;
  format?: 'short' | 'long' | 'detailed';
  showBadge?: boolean;
}
```
- Intelligent time formatting
- Milestone detection
- Color coding by duration

---

## Home Screen

### Purpose
Main dashboard screen shown when user profile is complete. Displays user's recovery milestones and sorted friends list.

### Layout Structure
```
┌─────────────────────────────┐
│      Status Bar             │
├─────────────────────────────┤
│  ┌─────────────────────┐    │
│  │   [Brand Card]       │    │
│  │   [Logo + Title]     │    │
│  │  "Our Time Recovered"│    │
│  └─────────────────────┘    │
├─────────────────────────────┤
│  ┌─────────────────────┐    │
│  │  [User Name]        │    │
│  │  [PROGRAM NAME]     │    │
│  │  ─────────────────   │    │
│  │  [Days Count] [🏆]  │    │
│  │      Days            │    │
│  └─────────────────────┘    │
├─────────────────────────────┤
│  Recovery Friends    [+Add] │
│  ┌─────────────────────┐    │
│  │ [Friend Card]        │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ [Friend Card]        │    │
│  └─────────────────────┘    │
├─────────────────────────────┤
│  [Home] [Profile] [Friends] │
└─────────────────────────────┘
```

### Components
- **Brand Card**: Logo with gradient background, app title "Our Time Recovered"
- **Profile Card**: Compressed card showing:
  - User name (centered)
  - Recovery program name (uppercase)
  - Days count with milestone badge
- **Friends List**: Sorted by next upcoming milestone
- **Bottom Tab Navigation**: Home, Profile, Friends tabs

### States
- **Profile Complete**: Shows Home screen with tabs
- **Profile Incomplete**: Shows Landing screen (no tabs)

### Interactions
- Profile card → Navigate to Profile tab
- Friend card → Navigate to Edit Friend screen
- Tab navigation → Switch between Home, Profile, Friends

---

## Navigation Flow

```
Landing Screen (Profile Incomplete)
    ├── Profile Screen
    │   └── Edit Mode
    └── Friends List Screen
        ├── Add Friend Form
        └── Edit Friend Screen

Home Screen (Profile Complete) [Bottom Tabs]
    ├── Home Tab (default)
    ├── Profile Tab
    └── Friends Tab
        ├── Add Friend Form
        └── Edit Friend Screen
```

## Animation Specifications

### Screen Transitions
- **Navigation**: Slide from right (300ms ease-in-out)
- **Modal**: Fade in with scale (200ms ease-out)
- **Back Navigation**: Slide to right (250ms ease-in)

### Component Animations
- **Card Press**: Scale to 0.98 (100ms)
- **Badge Appearance**: Scale + rotate (600ms spring)
- **Form Expansion**: Height animation (300ms ease-in-out)
- **Delete Swipe**: Translate X with opacity (200ms)

## Accessibility

### Requirements
- Minimum touch target: 44x44px
- Color contrast ratio: 4.5:1 minimum
- Screen reader labels for all interactive elements
- Haptic feedback for important actions

### Voice Over Labels
- Avatar: "[Name]'s profile picture with [milestone] badge"
- Program Card: "[Program name], [time] in recovery, [milestone status]"
- CTA Buttons: Clear action descriptions

## Performance Considerations

### Optimization Strategies
- Use FlatList for friends list (virtualization)
- Lazy load friend details
- Cache milestone calculations
- Optimize image sizes (avatars max 200x200)
- Debounce form inputs (300ms)

### Memory Management
- Limit friends list to 50 items initially
- Implement pagination for larger lists
- Clear unused screen data on navigation
- Use React.memo for expensive components
