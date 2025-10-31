import { getApiPath } from './apiConfig';

export interface Seller {
  id: string;
  companyName: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  projectType: string;
  capacity: number;
  location: string;
  state: string;
  askingPrice: number;
  status: string;
  createdAt: string;
}

export interface Buyer {
  id: string;
  email: string;
  companyName: string;
  firstName: string;
  lastName: string;
  location: string;
  state: string;
  mobile: string;
  createdAt: string;
  _count: {
    matches: number;
    termsAgreements: number;
  };
}

export interface Match {
  id: string;
  userId: string;
  sellerId: string;
  status: string;
  matchedAt: string;
  user: Buyer;
  seller: Seller;
  termsAgreement: any;
}

// Seller Management
export async function getSellers(): Promise<Seller[]> {
  const response = await fetch(getApiPath('/api/admin/sellers'), {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch sellers');
  const result = await response.json();
  return result.data.sellers;
}

export async function createSeller(data: Partial<Seller>): Promise<Seller> {
  const response = await fetch(getApiPath('/api/admin/sellers'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create seller');
  const result = await response.json();
  return result.data.seller;
}

export async function updateSeller(id: string, data: Partial<Seller>): Promise<Seller> {
  const response = await fetch(getApiPath(`/api/admin/sellers/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update seller');
  const result = await response.json();
  return result.data.seller;
}

export async function deleteSeller(id: string): Promise<void> {
  const response = await fetch(getApiPath(`/api/admin/sellers/${id}`), {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to delete seller');
}

// Buyer Management
export async function getBuyers(): Promise<Buyer[]> {
  const response = await fetch(getApiPath('/api/admin/buyers'), {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch buyers');
  const result = await response.json();
  return result.data.buyers;
}

// Matchmaking
export async function getMatches(): Promise<Match[]> {
  const response = await fetch(getApiPath('/api/admin/matches'), {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch matches');
  const result = await response.json();
  return result.data.matches;
}

export async function createMatch(userId: string, sellerId: string): Promise<Match> {
  const response = await fetch(getApiPath('/api/admin/matches'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ userId, sellerId }),
  });
  if (!response.ok) throw new Error('Failed to create match');
  const result = await response.json();
  return result.data.match;
}

export async function deleteMatch(id: string): Promise<void> {
  const response = await fetch(getApiPath(`/api/admin/matches/${id}`), {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to delete match');
}

