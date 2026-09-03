/**
 * API Utility for VasifyTech Suite
 * Centralizes API endpoint construction and fetch calls with support for environment variables
 * and local development fallback.
 */

export const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '');
  }
  return '';
};

export const getApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const baseUrl = getApiBaseUrl();
  
  if (baseUrl) {
    // If NEXT_PUBLIC_API_URL is set, prepend it if path starts with /api
    if (cleanEndpoint.startsWith('/api')) {
      return `${baseUrl}${cleanEndpoint}`;
    }
    return `${baseUrl}/api${cleanEndpoint}`;
  }
  
  return cleanEndpoint;
};

export const fetchApi = async (endpoint: string, options?: RequestInit): Promise<Response> => {
  const primaryUrl = getApiUrl(endpoint);
  
  try {
    const res = await fetch(primaryUrl, options);
    if (res.ok) {
      return res;
    }
    
    // In local browser dev without NEXT_PUBLIC_API_URL, retry via direct localhost:5000 if relative fetch returned non-ok
    if (
      typeof window !== 'undefined' &&
      window.location.hostname === 'localhost' &&
      !process.env.NEXT_PUBLIC_API_URL &&
      !primaryUrl.startsWith('http')
    ) {
      const cleanPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      const fallbackUrl = `http://localhost:5000${cleanPath}`;
      const fallbackRes = await fetch(fallbackUrl, options);
      if (fallbackRes.ok) return fallbackRes;
    }
    
    return res;
  } catch (err) {
    // Fallback attempt for local environment network error
    if (
      typeof window !== 'undefined' &&
      window.location.hostname === 'localhost' &&
      !process.env.NEXT_PUBLIC_API_URL &&
      !primaryUrl.startsWith('http')
    ) {
      const cleanPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      const fallbackUrl = `http://localhost:5000${cleanPath}`;
      return await fetch(fallbackUrl, options);
    }
    throw err;
  }
};
