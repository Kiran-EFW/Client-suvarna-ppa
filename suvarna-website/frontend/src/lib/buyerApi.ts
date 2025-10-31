const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_API_URL || 'http://localhost:8000';

export interface MaskedSeller {
  id: string;
  companyName: string;
  contactPerson: string;
  contactEmail: string | null;
  contactPhone: string | null;
  projectType: string;
  capacity: number;
  location: string;
  state: string;
  askingPrice: number;
}

export interface Match {
  id: string;
  sellerId: string;
  status: string;
  matchedAt: string;
  seller: MaskedSeller;
  termsAgreed: boolean;
  termsAgreedAt: string | null;
}

export interface SellerDetails {
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
  createdAt: string;
}

export interface MatchesResponse {
  success: boolean;
  data: {
    matches: Match[];
  };
}

export interface SellerResponse {
  success: boolean;
  data: {
    seller: SellerDetails;
  };
}

export async function getMatches(): Promise<Match[]> {
  const response = await fetch(`${API_BASE_URL}/api/buyer/matches`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch matches');
  }

  const result: MatchesResponse = await response.json();
  return result.data.matches;
}

export async function agreeToTerms(matchId: string): Promise<SellerDetails> {
  const response = await fetch(`${API_BASE_URL}/api/buyer/terms/${matchId}`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to agree to terms');
  }

  const result = await response.json();
  return result.data.seller;
}

export async function getSellerDetails(matchId: string): Promise<SellerDetails> {
  const response = await fetch(`${API_BASE_URL}/api/buyer/seller/${matchId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch seller details');
  }

  const result: SellerResponse = await response.json();
  return result.data.seller;
}

