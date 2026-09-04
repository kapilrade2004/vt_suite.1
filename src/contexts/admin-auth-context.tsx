'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminAuthContextType {
  adminToken: string | null;
  adminUser: any | null;
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  adminToken: null,
  adminUser: null,
  logout: () => {},
  isLoading: true
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token') || localStorage.getItem('admin_token') || sessionStorage.getItem('vt_admin_token') || localStorage.getItem('vt_admin_token');
    const isAuth = sessionStorage.getItem('vt_admin_authenticated') || localStorage.getItem('vt_admin_authenticated');

    if (!token || isAuth !== 'true') {
      router.replace('/admin/login');
      return;
    }

    setAdminToken(token);
    setAdminUser({ name: 'Master Super Admin', email: 'admin@vasifytech.com', role: 'super_admin' });
    setIsLoading(false);
  }, [router]);

  const logout = () => {
    sessionStorage.removeItem('admin_token');
    localStorage.removeItem('admin_token');
    sessionStorage.removeItem('vt_admin_token');
    localStorage.removeItem('vt_admin_token');
    sessionStorage.removeItem('vt_admin_authenticated');
    localStorage.removeItem('vt_admin_authenticated');

    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.replace('/admin/login');
  };

  return (
    <AdminAuthContext.Provider value={{ adminToken, adminUser, logout, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
