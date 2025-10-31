import { getApiPath } from './apiConfig';

export interface AdminUser {
  email: string;
  isAdmin: boolean;
}

export async function adminLogin(email: string, password: string): Promise<{ token: string }> {
  const response = await fetch(getApiPath('/api/admin/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Admin login failed');
  }

  const result = await response.json();
  return result.data;
}

export async function getCurrentAdmin(): Promise<AdminUser> {
  const response = await fetch(getApiPath('/api/admin/me'), {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Not authenticated as admin');
  }

  const result = await response.json();
  return result.data;
}

export async function adminLogout(): Promise<void> {
  await fetch(getApiPath('/api/admin/logout'), {
    method: 'POST',
    credentials: 'include',
  });
}

