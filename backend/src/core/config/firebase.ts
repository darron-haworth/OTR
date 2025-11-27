/**
 * Firebase configuration and initialization
 * Based on specs/data-models/DATA_MODELS.md - Cloud Storage Models
 */

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';
import { config } from './config';
import * as path from 'path';
import * as fs from 'fs';

let firebaseApp: App | null = null;
let firestore: Firestore | null = null;
let auth: Auth | null = null;

/**
 * Initialize Firebase Admin SDK
 * Uses service account key for server-side operations
 */
export function initializeFirebase(): void {
  if (firebaseApp) {
    return; // Already initialized
  }

  try {
    // Check if Firebase is already initialized
    const existingApps = getApps();
    if (existingApps.length > 0) {
      firebaseApp = existingApps[0];
      firestore = getFirestore(firebaseApp);
      auth = getAuth(firebaseApp);
      return;
    }

    // Initialize with service account key
    const serviceAccountPath =
      config.firebase.serviceAccountKeyPath ||
      path.join(__dirname, '../../config/firebase-service-account.json');

    if (!fs.existsSync(serviceAccountPath)) {
      throw new Error(
        `Firebase service account key not found at ${serviceAccountPath}. ` +
          'Please download it from Firebase Console and place it in backend/config/'
      );
    }

    const serviceAccount = JSON.parse(
      fs.readFileSync(serviceAccountPath, 'utf8')
    );

    firebaseApp = initializeApp({
      credential: cert(serviceAccount),
      projectId: config.firebase.projectId,
    });

    firestore = getFirestore(firebaseApp);
    auth = getAuth(firebaseApp);
  } catch (error) {
    throw new Error(
      `Failed to initialize Firebase: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Get Firestore instance
 */
export function getFirestoreInstance(): Firestore {
  if (!firestore) {
    initializeFirebase();
  }
  if (!firestore) {
    throw new Error('Firestore not initialized');
  }
  return firestore;
}

/**
 * Get Auth instance
 */
export function getAuthInstance(): Auth {
  if (!auth) {
    initializeFirebase();
  }
  if (!auth) {
    throw new Error('Auth not initialized');
  }
  return auth;
}

/**
 * Get Firebase App instance
 */
export function getFirebaseApp(): App {
  if (!firebaseApp) {
    initializeFirebase();
  }
  if (!firebaseApp) {
    throw new Error('Firebase App not initialized');
  }
  return firebaseApp;
}

