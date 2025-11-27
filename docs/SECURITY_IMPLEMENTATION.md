# Security Implementation Guide

## Encryption Implementation

### Local Data Encryption (React Native)

```javascript
// Using react-native-keychain for secure key storage
// and CryptoJS for encryption

import * as Keychain from 'react-native-keychain';
import CryptoJS from 'crypto-js';

class EncryptionService {
  /**
   * Generate and store master key from user passphrase
   * Following NIST SP 800-132 recommendations
   */
  async initializeMasterKey(passphrase) {
    // Generate random salt (128 bits minimum)
    const salt = CryptoJS.lib.WordArray.random(128/8);
    
    // PBKDF2 with 100,000 iterations (NIST recommendation)
    const masterKey = CryptoJS.PBKDF2(passphrase, salt, {
      keySize: 256/32,
      iterations: 100000,
      hasher: CryptoJS.algo.SHA256
    });
    
    // Store in iOS Keychain / Android Keystore
    await Keychain.setInternetCredentials(
      'ort.masterkey',
      'masterKey',
      masterKey.toString(),
      {
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        authenticatePrompt: 'Authenticate to access recovery data'
      }
    );
    
    return masterKey;
  }

  /**
   * Encrypt sensitive data using AES-256-GCM
   */
  encryptData(plaintext, key) {
    const iv = CryptoJS.lib.WordArray.random(128/8);
    
    const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
      iv: iv,
      mode: CryptoJS.mode.GCM,
      padding: CryptoJS.pad.Pkcs7
    });
    
    // Return IV + Ciphertext for storage
    return {
      iv: iv.toString(),
      ciphertext: encrypted.toString(),
      authTag: encrypted.tag.toString()
    };
  }

  /**
   * Decrypt data with integrity verification
   */
  decryptData(encryptedData, key) {
    try {
      const decrypted = CryptoJS.AES.decrypt(
        encryptedData.ciphertext,
        key,
        {
          iv: CryptoJS.enc.Hex.parse(encryptedData.iv),
          mode: CryptoJS.mode.GCM,
          padding: CryptoJS.pad.Pkcs7,
          tag: CryptoJS.enc.Hex.parse(encryptedData.authTag)
        }
      );
      
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      throw new Error('Decryption failed - data may be tampered');
    }
  }
}
```

### Secure Storage Implementation

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EncryptionService } from './EncryptionService';

class SecureStorage {
  constructor() {
    this.encryption = new EncryptionService();
  }

  /**
   * Store encrypted user profile
   * OWASP MASVS: MSTG-STORAGE-1
   */
  async storeUserProfile(profile) {
    const key = await this.encryption.getDerivedKey('profile');
    
    // Separate PII from non-PII
    const piiData = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      birthDate: profile.birthDate
    };
    
    const nonPiiData = {
      localId: profile.localId,
      cloudGuid: profile.cloudGuid,
      publicName: profile.publicName,
      recoveryGroups: profile.recoveryGroups
    };
    
    // Encrypt PII
    const encryptedPii = this.encryption.encryptData(
      JSON.stringify(piiData),
      key
    );
    
    // Store separately
    await AsyncStorage.multiSet([
      ['@user:pii:encrypted', JSON.stringify(encryptedPii)],
      ['@user:data', JSON.stringify(nonPiiData)]
    ]);
  }

  /**
   * Retrieve and decrypt user profile
   */
  async getUserProfile() {
    const key = await this.encryption.getDerivedKey('profile');
    
    const [[, encryptedPii], [, nonPiiData]] = await AsyncStorage.multiGet([
      '@user:pii:encrypted',
      '@user:data'
    ]);
    
    if (!encryptedPii || !nonPiiData) return null;
    
    const piiData = JSON.parse(
      this.encryption.decryptData(JSON.parse(encryptedPii), key)
    );
    
    return {
      ...JSON.parse(nonPiiData),
      ...piiData
    };
  }
}
```

## Authentication Flow

### Biometric Authentication Setup

```javascript
import TouchID from 'react-native-touch-id';
import * as LocalAuthentication from 'expo-local-authentication';

class BiometricAuth {
  /**
   * Setup biometric authentication
   * NIST SP 800-63B compliance
   */
  async setupBiometric() {
    const optionalConfigObject = {
      title: 'Authentication Required',
      imageColor: '#e00606',
      imageErrorColor: '#ff0000',
      sensorDescription: 'Touch sensor',
      sensorErrorDescription: 'Failed',
      cancelText: 'Cancel',
      fallbackLabel: 'Show Passcode',
      unifiedErrors: false,
      passcodeFallback: true
    };

    try {
      const biometryType = await TouchID.isSupported();
      
      if (biometryType) {
        const authenticated = await TouchID.authenticate(
          'Access your recovery data',
          optionalConfigObject
        );
        
        if (authenticated) {
          // Enable biometric for future logins
          await this.storeBiometricPreference(true);
        }
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
    }
  }
}
```

## Network Security

### Certificate Pinning Implementation

```javascript
import { NetworkingModule } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

class SecureNetworking {
  /**
   * Configure certificate pinning for Firebase
   * OWASP MSTG-NETWORK-2
   */
  configureCertificatePinning() {
    const firebaseCertificates = [
      // Firebase SSL certificate fingerprints (SHA256)
      'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      'sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB='
    ];

    RNFetchBlob.config({
      trusty: true,
      wifiOnly: false,
      certificates: firebaseCertificates
    });
  }

  /**
   * Make secure API request with certificate validation
   */
  async secureRequest(endpoint, data) {
    const response = await RNFetchBlob.fetch('POST', endpoint, {
      'Content-Type': 'application/json',
      'X-Request-ID': this.generateRequestId(),
      'X-Device-ID': await this.getDeviceId()
    }, JSON.stringify(data));

    // Verify response integrity
    if (!this.verifyResponseIntegrity(response)) {
      throw new Error('Response integrity check failed');
    }

    return response.json();
  }
}
```

## Code Obfuscation Configuration

### React Native Obfuscation

```javascript
// metro.config.js for production builds
module.exports = {
  transformer: {
    minifierPath: 'metro-minify-terser',
    minifierConfig: {
      keep_fnames: false,
      mangle: {
        keep_fnames: false,
        toplevel: true,
        reserved: []
      },
      output: {
        ascii_only: true,
        quote_style: 3,
        wrap_iife: true
      },
      sourceMap: {
        includeSources: false
      },
      toplevel: false,
      compress: {
        reduce_vars: true,
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      }
    }
  }
};
```

### Android ProGuard Rules

```proguard
# proguard-rules.pro
-keep class com.ort.** { *; }
-keepclassmembers class com.ort.** { *; }

# Encryption libraries
-keep class org.bouncycastle.** { *; }
-keep class javax.crypto.** { *; }

# Remove logging
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
    public static *** w(...);
    public static *** e(...);
}
```

## Security Monitoring

### Runtime Application Self-Protection (RASP)

```javascript
class SecurityMonitor {
  /**
   * Detect jailbreak/root
   * OWASP MSTG-RESILIENCE-1
   */
  async checkDeviceIntegrity() {
    const jailbreakIndicators = [
      '/Applications/Cydia.app',
      '/Library/MobileSubstrate/MobileSubstrate.dylib',
      '/bin/bash',
      '/usr/sbin/sshd',
      '/etc/apt'
    ];

    // Check for suspicious files (iOS)
    for (const indicator of jailbreakIndicators) {
      if (await this.fileExists(indicator)) {
        this.handleCompromisedDevice();
        return false;
      }
    }

    // Check for root (Android)
    if (await this.checkForRoot()) {
      this.handleCompromisedDevice();
      return false;
    }

    return true;
  }

  /**
   * Detect debugging attempts
   */
  detectDebugging() {
    if (__DEV__) return; // Skip in development

    // Check for debugger attachment
    const startTime = Date.now();
    debugger;
    const endTime = Date.now();

    if (endTime - startTime > 100) {
      this.handleDebuggerDetected();
    }
  }

  /**
   * Monitor for tampering
   */
  async verifyAppIntegrity() {
    // Verify app signature
    const signature = await this.getAppSignature();
    const expectedSignature = process.env.APP_SIGNATURE_HASH;

    if (signature !== expectedSignature) {
      this.handleTampering();
    }
  }
}
```
