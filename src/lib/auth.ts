import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';

// Server-side authentication check
export async function isAuthenticated() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token')?.value;
  return !!token;
}

// Client-side authentication check
export function isClientAuthenticated() {
  if (typeof window === 'undefined') return false;
  const token = getCookie('auth-token');
  return !!token;
}

// Logout function
export async function logout() {
  'use server';
  
  const cookieStore = cookies();
  cookieStore.delete('auth-token');
  
  // Redirect to login page
  return { success: true };
}

// Get user info from token (basic implementation)
export function getUserFromToken(token: string) {
  try {
    const decoded = atob(token);
    const [email] = decoded.split(':');
    return { email };
  } catch {
    return null;
  }
}