'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, LayoutDashboard, Building2, FileText, Ticket, History, LogOut, Users, ExternalLink
} from 'lucide-react';
import { AdminAuthProvider, useAdminAuth } from '@/contexts/admin-auth-context';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { adminUser, logout, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0f172a', color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>
        Authenticating Master Admin Session...
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Companies', path: '/admin/companies', icon: Building2 },
    { name: 'User Directory', path: '/admin/users', icon: Users },
    { name: 'Invoices Audit', path: '/admin/invoices', icon: FileText },
    { name: 'Support Queue', path: '/admin/tickets', icon: Ticket },
    { name: 'Audit Logs', path: '/admin/audit-logs', icon: History }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#090d16', color: '#f8fafc' }}>
      {/* SIDEBAR NAVIGATION */}
      <aside style={{ width: '260px', background: '#0f172a', borderRight: '1px solid #1e293b', display: 'flex', flexDirection: 'column' }}>
        {/* LOGO */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>VasifyTech</div>
            <div style={{ fontSize: '10.5px', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Master Admin</div>
          </div>
        </div>

        {/* NAV LINKS */}
        <nav style={{ padding: '20px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || (item.path !== '/admin/dashboard' && pathname?.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 16px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  background: isActive ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
                  boxShadow: isActive ? '0 4px 12px rgba(16, 185, 129, 0.25)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* USER FOOTER */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {adminUser?.name || 'Super Admin'}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>super_admin</div>
          </div>
          <button
            onClick={logout}
            title="Sign Out of Admin Console"
            style={{ background: '#1e293b', border: '1px solid #334155', color: '#ef4444', padding: '8px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* MAIN BODY */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* HEADER */}
        <header style={{ height: '64px', background: '#0f172a', borderBottom: '1px solid #1e293b', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8' }}>
            Platform Master Console
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" target="_blank" style={{ fontSize: '12.5px', color: '#10b981', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Main Site</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  );
}
