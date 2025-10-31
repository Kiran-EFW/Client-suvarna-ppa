#!/bin/bash
# Upload apiConfig.ts correctly

cat > /tmp/apiConfig.ts << 'EOFAPI'
// Centralized API configuration
// In production with Nginx reverse proxy, use relative paths
// In development, use the full backend URL

const getApiBaseUrl = (): string => {
  // Check if we're in production (Nginx proxy)
  if (import.meta.env.PROD) {
    // In production, use relative paths since Nginx proxies /api/ to backend
    return '';
  }
  
  // In development, use the env variable or default to localhost
  return import.meta.env.VITE_APP_BACKEND_API_URL || 'http://localhost:8000';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper to construct API paths
export const getApiPath = (path: string): string => {
  const baseUrl = API_BASE_URL;
  // Remove leading slash if baseUrl is empty (relative path)
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  if (!baseUrl) {
    // Relative path for production
    return cleanPath;
  }
  
  // Full URL for development
  return `${baseUrl}${cleanPath}`;
};
EOFAPI

mv /tmp/apiConfig.ts ~/projects/Client-suvarna-ppa/suvarna-website/frontend/src/lib/apiConfig.ts
echo "apiConfig.ts updated"


