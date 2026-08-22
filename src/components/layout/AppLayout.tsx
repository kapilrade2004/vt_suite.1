'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Layers, Users, UserCheck, Briefcase, DollarSign, 
  MessageSquare, BarChart3, Settings, LogOut,
  Search, Bell, Plus, ExternalLink
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useApp();

  const navigation = [
    {
      group: "MAIN MODULES",
      items: [
        { name: "CRM & Sales", path: "/app/crm", icon: Users, badge: `${data.crm.stats.totalLeads} Leads` },
        { name: "HR & Payroll", path: "/app/hr", icon: UserCheck, badge: `${data.hr.stats.totalEmployees} Staff` },
        { name: "Projects", path: "/app/projects", icon: Briefcase, badge: `${data.projects.stats.activeProjects} Active` },
        { name: "Finance", path: "/app/finance", icon: DollarSign, badge: `${data.finance.invoices.length} Invoices` },
        { name: "Workspace", path: "/app/workspace", icon: MessageSquare, badge: "Live" }
      ]
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
    if (p.includes('/crm/products')) return 'CRM & Sales — Products & Services';
    if (p.includes('/crm/proposals')) return 'CRM & Sales — Proposals & Estimates';
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

        {/* User Card */}
        <div style={{
          padding: '16px 14px',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-soft)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'var(--green)', color: '#fff',
                fontFamily: 'var(--display)', fontWeight: 700, fontSize: '13px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                RN
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ink)' }}>Rhea Nair</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-dim)' }}>Admin • Growth Plan</div>
              </div>
            </div>
            <Link href="/" title="Exit to Landing Page" style={{ color: 'var(--text-dim)', padding: '6px' }}>
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
                      <span style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Invoice #1042 Paid</span>
                      <div style={{ color: 'var(--text-dim)', fontSize: '11px' }}>Kestrel Mfg paid $32,000 via Gateway</div>
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

        <main style={{ flex: 1, padding: '24px 28px' }}>
          {children}
        </main>
      </div>
    </div>
  );
};
