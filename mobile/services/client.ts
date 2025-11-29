/**
 * API Client Configuration
 * Base configuration and utilities for API requests
 */

/**
 * Get authentication headers for API requests
 */
export async function getAuthHeaders(): Promise<Record<string, string>> {
  // TODO: Implement token retrieval from secure storage
  // For now, return empty object
  const token = ''; // await getStoredToken();
  
  if (!token) {
    return {};
  }
  
  return {
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Base API URL
 * 
 * NOTE: App currently runs fully offline. API calls are disabled.
 * Set this when ready to enable cloud features.
 * 
 * To enable API calls later:
 * 1. Set API_BASE_URL environment variable
 * 2. Configure backend
 * 3. Uncomment cloud sync calls in AppProvider
 */
export const API_BASE_URL = process.env.API_BASE_URL || '';

