# React Native CLI Setup Guide

This project uses **React Native CLI** (not Expo). The native iOS and Android projects have been initialized and the app is ready to run.

## Prerequisites

- Node.js 18+
- React Native CLI: `npm install -g react-native-cli` (optional, but helpful)
- **For iOS (macOS only):**
  - Xcode 14+
  - CocoaPods: `sudo gem install cocoapods`
- **For Android:**
  - Android Studio
  - Android SDK
  - Java Development Kit (JDK) 17+

## Project Status

✅ **Native projects initialized**
- iOS project: `ios/` directory created
- Android project: `android/` directory created
- Bundle identifiers configured: `com.ourtimerecovered.app`
- App name: "Our Time Recovered"

## Running the App

### Android

```bash
cd mobile
npm run android
```

**Note:** Make sure you have:
- Android SDK configured (see `android/local.properties`)
- Android emulator running or device connected
- Metro bundler running (`npm start`)

### iOS (macOS only)

```bash
cd mobile/ios
pod install
cd ..
npm run ios
```

## Initialization (Already Complete)

The native projects were initialized using:

```bash
# Create a temporary React Native project to get native files
npx @react-native-community/cli@latest init TempProject --version 0.73.0 --skip-install

# Copy iOS and Android projects
cp -r TempProject/ios ./
cp -r TempProject/android ./

# Clean up
rm -rf TempProject
```

### Manual Native Project Creation (If Needed)

If you prefer to create the native projects manually or the above doesn't work:

#### iOS (macOS only)

1. Open Xcode
2. Create a new project → iOS → App
3. Product Name: `OurTimeRecovered`
4. Bundle Identifier: `com.ourtimerecovered.app`
5. Language: Objective-C (or Swift if preferred)
6. Copy the generated `ios/` folder to `mobile/ios/`

#### Android

1. Open Android Studio
2. Create New Project → Empty Activity
3. Name: `OurTimeRecovered`
4. Package name: `com.ourtimerecovered.app`
5. Language: Java (or Kotlin if preferred)
6. Copy the generated `android/` folder to `mobile/android/`

## After Native Projects Are Created

### iOS Setup (macOS only)

```bash
cd mobile/ios
pod install
cd ..
```

### Install Dependencies

```bash
cd mobile
npm install
```

### Update Native Configuration

#### iOS: Update `ios/OurTimeRecovered/Info.plist`

Add Face ID permission:
```xml
<key>NSFaceIDUsageDescription</key>
<string>Use Face ID to securely access your recovery data</string>
```

Update bundle identifier to: `com.ourtimerecovered.app`

#### Android: Update `android/app/build.gradle`

Update applicationId to: `com.ourtimerecovered.app`

Add biometric permission to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
<uses-permission android:name="android.permission.USE_FINGERPRINT" />
```

## Verify Setup

### Start Metro Bundler

```bash
cd mobile
npm start
```

### Run on iOS (macOS only)

```bash
npm run ios
```

### Run on Android

```bash
npm run android
```

## Troubleshooting

### Metro bundler issues
- Clear cache: `npm start -- --reset-cache`
- Clear watchman: `watchman watch-del-all`

### iOS issues
- Clean build folder in Xcode: Product → Clean Build Folder
- Reinstall pods: `cd ios && pod install && cd ..`

### Android issues
- Clean gradle: `cd android && ./gradlew clean && cd ..`
- Invalidate caches in Android Studio: File → Invalidate Caches

## Next Steps

Once the native projects are initialized:
1. The app should run with the basic `App.tsx` component
2. Start implementing screens and navigation
3. Integrate the services (LocalStorage, Encryption, Backup, Sync)
4. Build out the UI components

