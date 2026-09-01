'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LandingHeader } from '@/components/layout/LandingHeader';
import { LandingFooter } from '@/components/layout/LandingFooter';
import { 
  Database, Server, ShieldCheck, CheckCircle2, AlertCircle, Lock, LogOut, KeyRound, User, RefreshCw,
  Users, Activity, FileText, Layers, Search, Mail, Phone, Calendar, ArrowRight, Eye, Check, Clock
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AdminConsolePage() {
  const { data: appData } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginInput, setLoginInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('vt_admin_authenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
      fetchUsers();
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginInput.trim()) {
      setLoginError('Please enter your admin username or email.');
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError('Please enter your password.');
      return;
    }

    setIsAuthenticated(true);
    sessionStorage.setItem('vt_admin_authenticated', 'true');
    fetchUsers();
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('vt_admin_authenticated');
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      let res;
      try {
        res = await fetch('/api/users');
      } catch (e) {
        res = await fetch('http://localhost:5000/api/users');
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        setError(data.message || 'Failed to fetch registered users from database.');
      }
    } catch (err) {
      setError('Unable to connect to backend server (http://localhost:5000).');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const q = searchTerm.toLowerCase();
    return (
      (u.user_name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.company_name || '').toLowerCase().includes(q) ||
      (u.service_needed || '').toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--body)' }}>
      <LandingHeader />

      <main style={{ flex: 1, padding: '48px 0 80px', background: '#f8fafc' }}>
        <div className="wrap" style={{ maxWidth: '1200px', width: '100%' }}>
          
          {!isAuthenticated ? (
            <div style={{ maxWidth: '440px', margin: '60px auto', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '24px', padding: '36px 32px', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', color: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Lock size={26} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Master Admin Dashboard</h2>
                <p style={{ fontSize: '14px', color: '#64748b' }}>
                  Super Admin portal to monitor all registered companies, user profiles, and active workspace activities.
                </p>
              </div>

              {loginError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px 16px', color: '#991b1b', fontSize: '13.5px', fontWeight: 600, marginBottom: '20px' }}>
                  {loginError}
                </div>
              )}

              <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Admin Email / Username <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      required
                      value={loginInput}
                      onChange={(e) => setLoginInput(e.target.value)}
                      placeholder="admin@vasifytech.com"
                      style={{ width: '100%', padding: '11px 14px 11px 42px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Admin Password <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <KeyRound size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter admin password"
                      style={{ width: '100%', padding: '11px 14px 11px 42px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-brass"
                  style={{ borderRadius: '12px', padding: '13px', fontWeight: 800, fontSize: '15px', marginTop: '4px' }}
                >
                  Access Admin Dashboard
                </button>
              </form>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {/* TOP ADMIN HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px 28px', boxShadow: 'var(--shadow-sm)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ShieldCheck size={32} color="var(--green-dark)" />
                    <div>
                      <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
                        Master Admin Dashboard
                      </h1>
                      <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px', margin: 0 }}>
                        Real-time overview of all registered companies, user activities, and created suite records.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button
                    onClick={fetchUsers}
                    disabled={loading}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      padding: '9px 16px',
                      borderRadius: '10px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      color: '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh Data
                  </button>

                  <button
                    onClick={handleAdminLogout}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      padding: '9px 16px',
                      borderRadius: '10px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      color: '#ef4444',
                      cursor: 'pointer'
                    }}
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>

              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '14px 18px', color: '#991b1b', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AlertCircle size={20} color="#991b1b" />
                  {error}
                </div>
              )}

              {/* STATS OVERVIEW CARDS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Registered Companies</span>
                    <Users size={22} color="var(--green-dark)" />
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{users.length}</div>
                  <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '4px', margin: 0 }}>Live Accounts in Database</p>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>User Created Leads</span>
                    <Layers size={22} color="#2563eb" />
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{appData.crm.leads.length}</div>
                  <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '4px', margin: 0 }}>Active Sales Pipeline Items</p>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>User Created Invoices</span>
                    <FileText size={22} color="#d97706" />
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{appData.finance.invoices.length}</div>
                  <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '4px', margin: 0 }}>Generated Finance Billing</p>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Database Status</span>
                    <Database size={22} color="#16a34a" />
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#16a34a' }}>MySQL Active</div>
                  <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '4px', margin: 0 }}>`vt_suite.users` Synced</p>
                </div>
              </div>

              {/* REGISTERED USERS DATABASE TABLE */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      Registered User Directory ({filteredUsers.length})
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#64748b', marginTop: '4px', margin: 0 }}>
                      Full database list of all registered business accounts and selected services.
                    </p>
                  </div>

                  <div style={{ position: 'relative', width: '280px' }}>
                    <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder="Search company, name, email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px 8px 36px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13.5px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569', fontWeight: 700 }}>
                        <th style={{ padding: '12px 14px' }}>User Name</th>
                        <th style={{ padding: '12px 14px' }}>Company Name</th>
                        <th style={{ padding: '12px 14px' }}>Registered Email</th>
                        <th style={{ padding: '12px 14px' }}>Mobile Number</th>
                        <th style={{ padding: '12px 14px' }}>Selected Services</th>
                        <th style={{ padding: '12px 14px' }}>Registration Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                            No registered users found.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((u, i) => (
                          <tr key={u.id || i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>
                              {u.user_name}
                            </td>
                            <td style={{ padding: '12px 14px', color: 'var(--green-dark)', fontWeight: 700 }}>
                              {u.company_name}
                            </td>
                            <td style={{ padding: '12px 14px', color: '#334155' }}>
                              {u.email}
                            </td>
                            <td style={{ padding: '12px 14px', color: '#64748b' }}>
                              {u.mobile_number || '—'}
                            </td>
                            <td style={{ padding: '12px 14px' }}>
                              <span style={{
                                background: u.service_needed?.toLowerCase().includes('full') ? '#f0fdf4' : '#eff6ff',
                                color: u.service_needed?.toLowerCase().includes('full') ? '#166534' : '#1e40af',
                                border: u.service_needed?.toLowerCase().includes('full') ? '1px solid #bbf7d0' : '1px solid #bfdbfe',
                                padding: '4px 10px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: 700
                              }}>
                                {u.service_needed || 'Full Business Suite'}
                              </span>
                            </td>
                            <td style={{ padding: '12px 14px', color: '#64748b' }}>
                              {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'Active'}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* RECENT WORK ACTIVITIES LOG */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Activity size={22} color="var(--green-dark)" />
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    User Workspace Activity Log
                  </h3>
                </div>
                <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '20px' }}>
                  Live tracking of user actions (created leads, generated invoices, staff onboarding, task assignments).
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {appData.crm.leads.length === 0 && appData.finance.invoices.length === 0 && appData.hr.employees.length === 0 ? (
                    <div style={{ background: '#f8fafc', border: '1px border-dashed #cbd5e1', borderRadius: '12px', padding: '24px', textAlign: 'center', color: '#64748b' }}>
                      <Clock size={28} color="#94a3b8" style={{ marginBottom: '8px' }} />
                      <p style={{ fontWeight: 600, fontSize: '14px', margin: 0 }}>No custom workspace activity yet.</p>
                      <p style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '4px' }}>
                        When users log in and create new leads, invoices, or employees, their work activity will be logged here automatically.
                      </p>
                    </div>
                  ) : (
                    <>
                      {appData.crm.leads.map((l, idx) => (
                        <div key={`lead-${idx}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Layers size={18} color="#166534" />
                            <div>
                              <span style={{ fontWeight: 700, color: '#166534', fontSize: '14px' }}>Lead Created: {l.name} ({l.company})</span>
                              <span style={{ display: 'block', fontSize: '12px', color: '#15803d' }}>Assigned: {l.assigned || 'Admin'} • Value: {l.value}</span>
                            </div>
                          </div>
                          <span style={{ fontSize: '12px', color: '#166534', fontWeight: 600 }}>{l.date || 'Today'}</span>
                        </div>
                      ))}

                      {appData.finance.invoices.map((inv, idx) => (
                        <div key={`inv-${idx}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fffbeb', border: '1px solid #fef08a', borderRadius: '12px', padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <FileText size={18} color="#b45309" />
                            <div>
                              <span style={{ fontWeight: 700, color: '#b45309', fontSize: '14px' }}>Invoice Created: #{inv.id} for {inv.client}</span>
                              <span style={{ display: 'block', fontSize: '12px', color: '#92400e' }}>Amount: {inv.amount} • Status: {inv.status}</span>
                            </div>
                          </div>
                          <span style={{ fontSize: '12px', color: '#b45309', fontWeight: 600 }}>{inv.dueDate || 'Today'}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
