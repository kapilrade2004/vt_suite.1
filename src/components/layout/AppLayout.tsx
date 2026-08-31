'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Layers, Users, UserCheck, Briefcase, DollarSign, 
  MessageSquare, BarChart3, Settings, LogOut,
  Search, Bell, Plus, ExternalLink, ShieldAlert, Sparkles, Clock, CheckCircle2
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface ActiveUserInfo {
  id?: number;
  user_name: string;
  email: string;
  company_name: string;
  service_needed?: string;
  trial_ends_at?: string;
  trial_status?: string;
  days_left?: number;
}

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<ActiveUserInfo | null>(null);
  const [upgrading, setUpgrading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useApp();

  const loadUser = async () => {
    try {
      // 1. Check logged-in user in local session storage first
      const stored = localStorage.getItem('vt_active_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          setActiveUser(parsed);
          return;
        }
      }

      // 2. Fallback to API user database
      let res;
      try {
        res = await fetch('/api/users');
      } catch (e) {
        res = await fetch('http://localhost:5000/api/users');
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.users) && data.users.length > 0) {
        setActiveUser(data.users[0]);
      } else {
        // Fallback default user with Full Business Suite unlocked
        setActiveUser({
          user_name: 'VasifyTech Member',
          email: 'user@company.com',
          company_name: 'My Business',
          service_needed: 'Full Business Suite',
          trial_status: 'active',
          days_left: 7
        });
      }
    } catch (e) {
      setActiveUser({
        user_name: 'VasifyTech Member',
        email: 'user@company.com',
        company_name: 'My Business',
        service_needed: 'Full Business Suite',
        trial_status: 'active',
        days_left: 7
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Access Control Guard: All 5 modules enabled
  useEffect(() => {
    if (!activeUser || !pathname) return;
  }, [activeUser, pathname]);

  const handleUpgradeToPremium = async () => {
    if (!activeUser || !activeUser.id) {
      router.push('/pricing');
      return;
    }
    setUpgrading(true);
    try {
      let res;
      try {
        res = await fetch(`/api/users/${activeUser.id}/upgrade`, { method: 'POST' });
      } catch (err) {
        res = await fetch(`http://localhost:5000/api/users/${activeUser.id}/upgrade`, { method: 'POST' });
      }
      const result = await res.json();
      if (result.success && result.user) {
        setActiveUser(result.user);
      }
    } catch (err) {
      console.error('Error upgrading plan:', err);
    } finally {
      setUpgrading(false);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return 'VT';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  // Filter modules strictly based on user's chosen service_needed
  const userModule = (activeUser?.service_needed || '').toLowerCase();
  const isFullSuite = userModule.includes('full') || userModule.includes('suite');

  const allModules = [
    { key: 'crm', name: "CRM & Sales", path: "/app/crm", icon: Users, badge: `${data.crm.stats.totalLeads} Leads`, match: ['crm', 'sales'] },
    { key: 'hr', name: "HR & Payroll", path: "/app/hr", icon: UserCheck, badge: `${data.hr.stats.totalEmployees} Staff`, match: ['hr', 'payroll', 'attendance'] },
    { key: 'projects', name: "Projects", path: "/app/projects", icon: Briefcase, badge: `${data.projects.stats.activeProjects} Active`, match: ['project', 'task', 'custom', 'saas', 'software'] },
    { key: 'finance', name: "Finance", path: "/app/finance", icon: DollarSign, badge: `${data.finance.invoices.length} Invoices`, match: ['finance', 'invoicing', 'expense'] },
    { key: 'workspace', name: "Workspace", path: "/app/workspace", icon: MessageSquare, badge: "Live", match: ['workspace', 'chat', 'whatsapp', 'team'] }
  ];

  // Display all 5 platform modules for every signed-in user
  const activeNavigationModules = allModules;

  const navigation = [
    {
      group: "ACTIVATED MODULES (FULL BUSINESS SUITE)",
      items: activeNavigationModules
    },
    {
      group: "ANALYTICS & CONTROL",
      items: [
        { name: "Reports", path: "/app/reports", icon: BarChart3 },
        { name: "Settings", path: "/app/settings", icon: Settings }
      ]
    }
  ];

  const getPageTitle = () => {
    const p = pathname || '';
    if (p.includes('/crm/leads')) return 'CRM & Sales — Leads Directory';
    if (p.includes('/crm/clients')) return 'CRM & Sales — Client Accounts';
    if (p.includes('/crm/pipeline')) return 'CRM & Sales — Deal Pipeline';
    if (p.includes('/crm/users')) return 'CRM & Sales — Registered Users (MySQL)';
    if (p.includes('/crm')) return 'CRM & Sales Overview';

    if (p.includes('/hr/employees')) return 'HR & Payroll — Employee Directory';
    if (p.includes('/hr/attendance')) return 'HR & Payroll — Attendance Tracker';
    if (p.includes('/hr/leave')) return 'HR & Payroll — Leave Requests';
    if (p.includes('/hr/payroll')) return 'HR & Payroll — Payroll Management';
    if (p.includes('/hr')) return 'HR & Payroll Dashboard';

    if (p.includes('/projects/tasks')) return 'Project Management — Task Workspace';
    if (p.includes('/projects')) return 'Project Management Overview';

    if (p.includes('/finance/invoices/create')) return 'Finance — Create New Invoice';
    if (p.includes('/finance/invoices')) return 'Finance — Invoice Directory';
    if (p.includes('/finance/expenses')) return 'Finance — Expense Log';
    if (p.includes('/finance')) return 'Finance & Invoicing Dashboard';

    if (p.includes('/workspace/messages')) return 'Team Workspace — Live Chat';
    if (p.includes('/workspace/tickets')) return 'Team Workspace — Support Tickets';
    if (p.includes('/workspace/calendar')) return 'Team Workspace — Shared Calendar';
    if (p.includes('/workspace')) return 'Team Workspace Overview';

    if (p.includes('/reports')) return 'Analytics & Business Reports';
    if (p.includes('/settings')) return 'Platform Settings & Config';

    return 'VasifyTech Suite Dashboard';
  };

  const daysLeft = activeUser?.days_left !== undefined ? Number(activeUser.days_left) : 7;
  const isPremium = activeUser?.trial_status === 'premium';
  const isWarning = daysLeft <= 2 && daysLeft > 0 && !isPremium;
  const isExpired = daysLeft <= 0 && !isPremium;
  const endDateFormatted = activeUser?.trial_ends_at 
    ? new Date(activeUser.trial_ends_at).toLocaleDateString()
    : 'in 7 days';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-app)' }}>
      {/* Sidebar Desktop */}
      <aside style={{
        width: '260px',
        background: 'var(--white)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 40
      }}>
        {/* Brand Header */}
        <div style={{
          height: '70px',
          padding: '0 22px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderBottom: '1px solid var(--border)'
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <span style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'var(--green-tint)', border: '2px solid var(--green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green)'
            }}>
              <Layers size={16} />
            </span>
            <div>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '16px', color: 'var(--ink)', lineHeight: 1.1 }}>
                VasifyTech
              </div>
              <div style={{ fontSize: '11px', color: 'var(--green-dark)', fontWeight: 600 }}>
                NEXT.JS 14 SUITE
              </div>
            </div>
          </Link>
        </div>

        {/* Sidebar Nav */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 14px' }}>
          {navigation.map((group, idx) => (
            <div key={idx} style={{ marginBottom: '24px' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-dim)',
                letterSpacing: '0.08em',
                padding: '0 12px 10px',
                textTransform: 'uppercase'
              }}>
                {group.group}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname?.startsWith(item.path);
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? 'var(--green-dark)' : 'var(--text)',
                        background: isActive ? 'var(--green-tint)' : 'transparent',
                        border: isActive ? '1px solid var(--green-tint-2)' : '1px solid transparent',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Icon size={18} color={isActive ? 'var(--green-dark)' : 'var(--text-dim)'} />
                        <span>{item.name}</span>
                      </div>
                      {('badge' in item && item.badge) ? (
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: '12px',
                          background: isActive ? 'var(--white)' : 'var(--bg-soft)',
                          color: isActive ? 'var(--green-dark)' : 'var(--text-dim)',
                          border: '1px solid var(--border)'
                        }}>
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Profile Card */}
        <div style={{
          padding: '16px 14px',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-soft)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: isPremium ? 'linear-gradient(135deg, #d97706, #f59e0b)' : 'var(--green)', color: '#fff',
                fontFamily: 'var(--display)', fontWeight: 700, fontSize: '13px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                {getInitials(activeUser ? activeUser.user_name : 'Rhea Nair')}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {activeUser ? activeUser.user_name : 'Rhea Nair'}
                </div>
                <div style={{ fontSize: '11px', color: isPremium ? '#d97706' : 'var(--green-dark)', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {isPremium ? '⭐ Premium Account' : `${daysLeft > 0 ? `${daysLeft} Days Free Trial` : 'Trial Expired'}`}
                </div>
              </div>
            </div>
            <Link href="/admin/users" title="Switch User in Admin Panel" style={{ color: 'var(--green-dark)', padding: '6px', flexShrink: 0 }}>
              <LogOut size={16} />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header Bar */}
        <header style={{
          height: '70px',
          background: 'var(--white)',
          borderBottom: '1px solid var(--border)',
          padding: '0 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 30
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <h1 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}>
              {getPageTitle()}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="text"
                placeholder="Search leads, clients..."
                className="vt-input"
                style={{ paddingLeft: '34px', height: '36px', fontSize: '13px', borderRadius: '20px' }}
              />
            </div>

            <button 
              className="btn btn-brass btn-sm"
              onClick={() => router.push('/app/finance/invoices/create')}
            >
              <Plus size={15} /> Create Invoice
            </button>

            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  border: '1px solid var(--border)', background: 'var(--bg-soft)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', position: 'relative'
                }}
              >
                <Bell size={17} color="var(--ink)" />
                <span style={{
                  position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px',
                  borderRadius: '50%', background: 'var(--green)'
                }} />
              </button>

              {notificationsOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: '46px', width: '300px',
                  background: '#fff', border: '1px solid var(--border)', borderRadius: '12px',
                  boxShadow: 'var(--shadow-lg)', padding: '14px', zIndex: 50
                }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '10px', color: 'var(--ink)' }}>Recent Notifications</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '12.5px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Free Trial Reminder</span>
                      <div style={{ color: 'var(--text-dim)', fontSize: '11px' }}>
                        Your trial ends on {endDateFormatted}. Upgrade to Premium to retain full access.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/" className="btn btn-ghost btn-sm" title="Landing Page">
              <ExternalLink size={14} /> Website
            </Link>
          </div>
        </header>

        {/* FREE TRIAL STATUS BANNER */}
        <main style={{ flex: 1, padding: '24px 28px' }}>
          {isPremium ? (
            <div style={{ background: '#fffdf5', border: '1px solid #fef3c7', borderRadius: '12px', padding: '10px 18px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={18} color="#d97706" />
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#92400e' }}>
                  Premium Plan Active — Full unlimited access unlocked!
                </span>
              </div>
              <span className="badge badge-amber" style={{ fontSize: '11px', fontWeight: 800 }}>PRO UNLIMITED</span>
            </div>
          ) : isExpired ? (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '12px 18px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldAlert size={20} color="#dc2626" />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#991b1b' }}>Your 7-Day Free Trial Has Ended</h4>
                  <p style={{ fontSize: '12.5px', color: '#991b1b', marginTop: '2px' }}>
                    Your free trial ended on <strong>{endDateFormatted}</strong>. Upgrade to Premium to continue using all VT Suite features.
                  </p>
                </div>
              </div>
              <button 
                onClick={handleUpgradeToPremium}
                disabled={upgrading}
                style={{ background: '#dc2626', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}
              >
                {upgrading ? 'Upgrading...' : 'Upgrade to Premium Now'}
              </button>
            </div>
          ) : isWarning ? (
            <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '12px', padding: '12px 18px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={20} color="#d97706" />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#92400e' }}>
                    Free Trial Ending Soon ({daysLeft} Day{daysLeft === 1 ? '' : 's'} Remaining)
                  </h4>
                  <p style={{ fontSize: '12.5px', color: '#b45309', marginTop: '2px' }}>
                    Your 7-Day Free Trial ends on <strong>{endDateFormatted}</strong>. Upgrade to Premium now to keep uninterrupted access.
                  </p>
                </div>
              </div>
              <button 
                onClick={handleUpgradeToPremium}
                disabled={upgrading}
                style={{ background: 'linear-gradient(135deg, #d97706, #b45309)', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.25)' }}
              >
                {upgrading ? 'Upgrading...' : 'Upgrade to Premium'}
              </button>
            </div>
          ) : (
            <div style={{ background: '#f0fdf4', border: '1px solid var(--green-tint-2)', borderRadius: '12px', padding: '10px 18px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} color="var(--green-dark)" />
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--green-dark)' }}>
                  7-Day Free Trial Active ({daysLeft} Days Left • Ends on {endDateFormatted})
                </span>
              </div>
              <button 
                onClick={handleUpgradeToPremium}
                disabled={upgrading}
                style={{ background: 'var(--green-dark)', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer' }}
              >
                {upgrading ? 'Upgrading...' : 'Upgrade to Premium'}
              </button>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
};
