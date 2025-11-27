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
 */
export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

