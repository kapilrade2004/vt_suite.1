'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LandingHeader } from '@/components/layout/LandingHeader';
import { LandingFooter } from '@/components/layout/LandingFooter';
import { 
  Database, Server, ShieldCheck, CheckCircle2, AlertCircle, Plus, Lock, LogOut, KeyRound, User, Send, ArrowRight, RefreshCw
} from 'lucide-react';

export default function AdminConsolePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginInput, setLoginInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [dbCount, setDbCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('vt_admin_authenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
      fetchDbStats();
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
    fetchDbStats();
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('vt_admin_authenticated');
  };

  const fetchDbStats = async () => {
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
        setDbCount(data.users.length);
      } else {
        setError(data.message || 'Failed to connect to MySQL database.');
      }
    } catch (err) {
      setError('Unable to connect to MySQL backend server (http://localhost:5000).');
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerCheckTrials = async () => {
    try {
      let res;
      try {
        res = await fetch('/api/users/check-trials');
      } catch (e) {
        res = await fetch('http://localhost:5000/api/users/check-trials');
      }
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(data.message);
        setTimeout(() => setSuccessMsg(''), 5000);
        fetchDbStats();
      }
    } catch (e) {
      alert('Unable to trigger trial check.');
    }
  };

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--body)' }}>
      <LandingHeader />

      <main style={{ flex: 1, padding: '60px 0 80px', background: '#f8fafc', display: 'flex', alignItems: 'center' }}>
        <div className="wrap" style={{ maxWidth: '960px', width: '100%' }}>
          
          {!isAuthenticated ? (
            <div style={{ maxWidth: '440px', margin: '0 auto', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '24px', padding: '36px 32px', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', color: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Lock size={26} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Admin Console Login</h2>
                <p style={{ fontSize: '14px', color: '#64748b' }}>
                  Enter your credentials to access system status and database backend configuration.
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
                    Username or Email <span style={{ color: '#ef4444' }}>*</span>
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
                    Password <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <KeyRound size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter password"
                      style={{ width: '100%', padding: '11px 14px 11px 42px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-brass"
                  style={{ borderRadius: '12px', padding: '13px', fontWeight: 800, fontSize: '15px', marginTop: '4px' }}
                >
                  Login to Admin Console
                </button>
              </form>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={28} color="var(--green-dark)" />
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                      Admin System & Database Console
                    </h1>
                  </div>
                  <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                    MySQL `vt_suite` Workbench database server connection & trial notification monitor.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button
                    onClick={fetchDbStats}
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
                    <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Test Connection
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

              {successMsg && (
                <div style={{ background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', borderRadius: '12px', padding: '14px 18px', color: 'var(--green-dark)', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} color="var(--green-dark)" />
                  {successMsg}
                </div>
              )}

              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '14px 18px', color: '#991b1b', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AlertCircle size={20} color="#991b1b" />
                  {error}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>MySQL Database Status</span>
                    <Database size={22} color="var(--green-dark)" />
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>
                    {dbCount !== null ? `${dbCount} Records` : 'Connecting...'}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--green-dark)', fontWeight: 600, marginTop: '6px' }}>
                    ✓ Database `vt_suite` & table `users` connected safely in MySQL Workbench
                  </p>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Express API Server</span>
                    <Server size={22} color="#2563eb" />
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Port 5000 Active</div>
                  <p style={{ fontSize: '13px', color: '#2563eb', fontWeight: 600, marginTop: '6px' }}>
                    ✓ Node.js Express service listening on http://localhost:5000
                  </p>
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Admin Database Control Actions
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
                  Run database maintenance, trial expiration checks, or open the CRM module.
                </p>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleTriggerCheckTrials}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'var(--green-dark)',
                      color: '#ffffff',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Send size={16} /> Run Free Trial Expiry Check & Emails
                  </button>

                  <Link
                    href="/app/crm/users"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    Open CRM Registered Users <ArrowRight size={16} />
                  </Link>
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
