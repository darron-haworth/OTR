/**
 * Encryption Service
 * 
 * Handles encryption/decryption of PII data using AES-256
 * Uses device keychain for master key storage
 * Follows NIST SP 800-132 recommendations
 */

import * as Keychain from 'react-native-keychain';
import CryptoJS from 'crypto-js';

const KEYCHAIN_SERVICE = 'com.otr.masterkey';
const KEYCHAIN_USERNAME = 'masterKey';

export interface EncryptedData {
  iv: string;
  ciphertext: string;
  authTag?: string; // HMAC for authentication (using CBC mode)
}

export class EncryptionService {
  /**
   * Initialize master key from user passphrase
   * Following NIST SP 800-132 recommendations
   */
  async initializeMasterKey(passphrase: string): Promise<void> {
    // Generate random salt (128 bits minimum)
    const salt = CryptoJS.lib.WordArray.random(128 / 8);

    // PBKDF2 with 100,000 iterations (NIST recommendation)
    const masterKey = CryptoJS.PBKDF2(passphrase, salt, {
      keySize: 256 / 32, // 256 bits
      iterations: 100000,
      hasher: CryptoJS.algo.SHA256,
    });

    // Store in iOS Keychain / Android Keystore
    await Keychain.setInternetCredentials(
      KEYCHAIN_SERVICE,
      KEYCHAIN_USERNAME,
      masterKey.toString(),
      {
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        authenticationPrompt: {
          title: 'Authenticate to access recovery data',
          subtitle: 'Biometric authentication required',
          description: 'Use your fingerprint or face to decrypt your data',
        },
      }
    );
  }

  /**
   * Get master key from keychain
   */
  private async getMasterKey(): Promise<string> {
    const credentials = await Keychain.getInternetCredentials(KEYCHAIN_SERVICE);
    
    if (!credentials || !credentials.password) {
      throw new Error('Master key not found. User must initialize encryption first.');
    }

    return credentials.password;
  }

  /**
   * Encrypt data using AES-256-CBC (GCM not available in crypto-js)
   * Using CBC mode with HMAC for authentication
   */
  async encrypt(plaintext: string): Promise<string> {
    const masterKey = await this.getMasterKey();
    const key = CryptoJS.enc.Hex.parse(masterKey);
    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    // Use AES-256 in CBC mode (GCM is not available in crypto-js)
    const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Generate HMAC for authentication
    const hmac = CryptoJS.HmacSHA256(encrypted.ciphertext.toString(), key);

    // Return IV + Ciphertext + HMAC as JSON string
    const encryptedData: EncryptedData = {
      iv: iv.toString(CryptoJS.enc.Hex),
      ciphertext: encrypted.ciphertext.toString(),
      authTag: hmac.toString(CryptoJS.enc.Hex), // Using HMAC instead of GCM auth tag
    };

    return JSON.stringify(encryptedData);
  }

  /**
   * Decrypt data with integrity verification using HMAC
   */
  async decrypt(encryptedDataJson: string): Promise<string> {
    try {
      const masterKey = await this.getMasterKey();
      const key = CryptoJS.enc.Hex.parse(masterKey);
      const encryptedData: EncryptedData = JSON.parse(encryptedDataJson);

      // Verify HMAC before decrypting
      if (encryptedData.authTag) {
        const expectedHmac = CryptoJS.HmacSHA256(encryptedData.ciphertext, key);
        const providedHmac = CryptoJS.enc.Hex.parse(encryptedData.authTag);
        
        if (expectedHmac.toString() !== providedHmac.toString()) {
          throw new Error('HMAC verification failed - data may have been tampered with');
        }
      }

      // Decrypt using AES-256-CBC
      const decrypted = CryptoJS.AES.decrypt(
        encryptedData.ciphertext,
        key,
        {
          iv: CryptoJS.enc.Hex.parse(encryptedData.iv),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );

      const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!plaintext) {
        throw new Error('Decryption failed - invalid data or tampering detected');
      }

      return plaintext;
    } catch (error) {
      throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate SHA-256 checksum for data integrity
   */
  generateChecksum(data: string): string {
    return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
  }

  /**
   * Verify checksum
   */
  verifyChecksum(data: string, expectedChecksum: string): boolean {
    const actualChecksum = this.generateChecksum(data);
    return actualChecksum === expectedChecksum;
  }

  /**
   * Check if master key is initialized
   */
  async isInitialized(): Promise<boolean> {
    try {
      const credentials = await Keychain.getInternetCredentials(KEYCHAIN_SERVICE);
      return !!credentials && !!credentials.password;
    } catch {
      return false;
    }
  }

  /**
   * Clear master key (for logout/reset)
   */
  async clearMasterKey(): Promise<void> {
    await Keychain.resetInternetCredentials(KEYCHAIN_SERVICE);
  }
}

