/**
 * API Client
 * Auto-generated from specs/api/endpoints/*.md
 * DO NOT EDIT MANUALLY - This file is generated from specs
 * Run 'npm run generate:api' to regenerate
 * 
 * NOTE: App currently runs fully offline. These functions will throw
 * an error if API_BASE_URL is not configured. They are available for
 * future cloud features but are NOT called automatically.
 */

import { getAuthHeaders, API_BASE_URL } from '../client';

/**
 * Guard to prevent API calls when offline
 */
function ensureApiConfigured(): void {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL not configured. App is running in offline mode. Configure API_BASE_URL to enable cloud features.');
  }
}

import { BackupUploadRequest, BackupUploadResponse } from '../../src/types/api/backupscreate-types';
import { BackupRetrieveResponse } from '../../src/types/api/backupsget-types';
import { BackupListResponse } from '../../src/types/api/backupslist-types';
import { ConnectionRequest, ConnectionResponse } from '../../src/types/api/connectionscreate-types';
import { UpdateConnectionRequest, UpdateConnectionResponse } from '../../src/types/api/connectionsupdate-types';
import { CreateFriendRequest, CreateFriendResponse } from '../../src/types/api/friendscreate-types';
import { RegisterRequest, RegisterResponse } from '../../src/types/api/userscreate-types';


/**
 * Retrieve a list of all backups for a user.
 * GET /api/backups/{cloudGuid}/list
 */
export async function backupsList(cloudGuid: string): Promise<BackupListResponse> {
  ensureApiConfigured();
  const url = `${API_BASE_URL}/api/backups/${cloudGuid}/list`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
    
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  return response.json();
}


/**
 * Retrieve a specific backup by ID.
 * GET /api/backups/{cloudGuid}/{backupId}
 */
export async function backupsGet(cloudGuid: string, backupId: string): Promise<BackupRetrieveResponse> {
  ensureApiConfigured();
  const url = `${API_BASE_URL}/api/backups/${cloudGuid}/${backupId}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
    
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  return response.json();
}


/**
 * Upload an encrypted backup of user data.
 * POST /api/backups/upload
 */
export async function backupsCreate(data: BackupUploadRequest): Promise<BackupUploadResponse> {
  ensureApiConfigured();
  const url = `${API_BASE_URL}/api/backups/upload`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  return response.json();
}


/**
 * Send a connection request to another user.
 * POST /api/connections/request
 */
export async function connectionsCreate(data: ConnectionRequest): Promise<ConnectionResponse> {
  ensureApiConfigured();
  const url = `${API_BASE_URL}/api/connections/request`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  return response.json();
}


/**
 * Accept, reject, or block a connection request.
 * PUT /api/connections/{connectionGuid}/status
 */
export async function connectionsUpdate(connectionGuid: string, data: UpdateConnectionRequest): Promise<UpdateConnectionResponse> {
  ensureApiConfigured();
  const url = `${API_BASE_URL}/api/connections/${connectionGuid}/status`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  return response.json();
}


/**
 * Generate a unique friend GUID for creating a friend profile.
 * POST /api/friends/create
 */
export async function friendsCreate(data: CreateFriendRequest): Promise<CreateFriendResponse> {
  ensureApiConfigured();
  const url = `${API_BASE_URL}/api/friends/create`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  return response.json();
}


/**
 * Generate a unique user GUID for a new user registration.
 * POST /api/users/register
 */
export async function usersCreate(data: RegisterRequest): Promise<RegisterResponse> {
  ensureApiConfigured();
  const url = `${API_BASE_URL}/api/users/register`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthHeaders()),
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  return response.json();
}

