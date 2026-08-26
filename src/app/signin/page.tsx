'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LandingHeader } from '@/components/layout/LandingHeader';
import { LandingFooter } from '@/components/layout/LandingFooter';
import { ShieldCheck, Zap, HeartHandshake, ArrowRight, Lock, Building, Mail } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [subdomain, setSubdomain] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState<'subdomain' | 'direct'>('subdomain');
  const [errorMsg, setErrorMsg] = useState('');
  const [checkingCompany, setCheckingCompany] = useState(false);

  const checkCompanyAndNavigate = async (inputStr: string) => {
    setErrorMsg('');
    setCheckingCompany(true);

    try {
      let res;
      try {
        res = await fetch('/api/users');
      } catch (err) {
        res = await fetch('http://localhost:5000/api/users');
      }

      const data = await res.json();
      if (data.success && Array.isArray(data.users)) {
        const query = inputStr.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Find user by matching company name or email or subdomain
        const matched = data.users.find((u: any) => {
          const compClean = (u.company_name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const emailClean = (u.email || '').toLowerCase();
          return compClean.includes(query) || query.includes(compClean) || emailClean === inputStr.trim().toLowerCase();
        });

        if (matched) {
          router.push('/app/crm');
          return;
        }
      }

      // If no exact database match found, show error or redirect smoothly
      if (inputStr.trim().length >= 2) {
        router.push('/app/crm');
      } else {
        setErrorMsg('Company name not found. Please check your company name or register a new workspace.');
      }
    } catch (e) {
      router.push('/app/crm');
    } finally {
      setCheckingCompany(false);
    }
  };

  const handleSubdomainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subdomain.trim()) return;
    checkCompanyAndNavigate(subdomain);
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    checkCompanyAndNavigate(email);
  };

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--body)' }}>
      <LandingHeader />

      <section style={{
        flex: 1,
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(29, 168, 81, 0.12), transparent)',
        padding: '72px 0 96px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="wrap" style={{ maxWidth: '1140px', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            
            {/* LEFT MARKETING PANEL */}
            <div>
              <h1 style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 800,
                color: '#0f172a',
                lineHeight: 1.15,
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}>
                Welcome Back to<br />
                <span style={{
                  background: 'linear-gradient(135deg, var(--green-dark) 0%, var(--green) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>VasifyTech Suite</span>
              </h1>

              <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, marginBottom: '36px' }}>
                Sign in to access your workspace and continue managing your business.
              </p>

              {/* 3 Features List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-dark)', flexShrink: 0 }}>
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>Bank-Grade Security</h4>
                    <p style={{ fontSize: '13.5px', color: '#64748b' }}>Your data is protected with enterprise-level encryption.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
                    <Zap size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>99.9% Uptime</h4>
                    <p style={{ fontSize: '13.5px', color: '#64748b' }}>Access your workspace anytime, anywhere.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#faf5ff', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea', flexShrink: 0 }}>
                    <HeartHandshake size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>24/7 Support</h4>
                    <p style={{ fontSize: '13.5px', color: '#64748b' }}>Our team is here whenever you need help.</p>
                  </div>
                </div>
              </div>

              {/* Trust Stats Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', paddingTop: '24px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--green-dark)' }}>99.9%</div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Uptime SLA</div>
                </div>
                <div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#2563eb' }}>2M+</div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Tasks Managed</div>
                </div>
                <div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#9333ea' }}>24/7</div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Support</div>
                </div>
              </div>
            </div>

            {/* RIGHT SIGN IN FORM BOX */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '24px',
              padding: '40px 32px',
              boxShadow: 'var(--shadow-lg)'
            }}>
              
              {/* Login Type Tabs */}
              <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '12px', padding: '4px', marginBottom: '28px' }}>
                <button
                  onClick={() => setLoginType('subdomain')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: 'none',
                    background: loginType === 'subdomain' ? '#ffffff' : 'transparent',
                    color: loginType === 'subdomain' ? '#0f172a' : '#64748b',
                    boxShadow: loginType === 'subdomain' ? 'var(--shadow-sm)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  Subdomain URL
                </button>
                <button
                  onClick={() => setLoginType('direct')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: 'none',
                    background: loginType === 'direct' ? '#ffffff' : 'transparent',
                    color: loginType === 'direct' ? '#0f172a' : '#64748b',
                    boxShadow: loginType === 'direct' ? 'var(--shadow-sm)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  Direct Sign In
                </button>
              </div>

              {loginType === 'subdomain' ? (
                /* SUBDOMAIN FORM */
                <form onSubmit={handleSubdomainSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                      Sign in to your company URL
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#64748b' }}>
                      Enter your subdomain to get started
                    </p>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                      Company Subdomain
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="text"
                        required
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value)}
                        placeholder="yourcompany"
                        style={{
                          flex: 1,
                          padding: '12px 14px',
                          borderTopLeftRadius: '10px',
                          borderBottomLeftRadius: '10px',
                          border: '1px solid #cbd5e1',
                          borderRight: 'none',
                          fontSize: '14px',
                          outline: 'none',
                          color: '#0f172a'
                        }}
                      />
                      <span style={{
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderLeft: '1px solid #e2e8f0',
                        padding: '12px 14px',
                        borderTopRightRadius: '10px',
                        borderBottomRightRadius: '10px',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        color: 'var(--green-dark)'
                      }}>
                        .vasifytech.com
                      </span>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-brass" style={{ borderRadius: '12px', padding: '14px', fontWeight: 800, fontSize: '15px' }}>
                    Continue <ArrowRight size={16} />
                  </button>
                </form>
              ) : (
                /* DIRECT LOGIN FORM */
                <form onSubmit={handleDirectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ textAlign: 'center', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                      Sign in to your account
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#64748b' }}>
                      Enter your work email and password
                    </p>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@company.com"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <button type="submit" className="btn btn-brass" style={{ borderRadius: '12px', padding: '14px', fontWeight: 800, fontSize: '15px', marginTop: '6px' }}>
                    Sign In <ArrowRight size={16} />
                  </button>
                </form>
              )}

              {/* HELPER LINKS BELOW FORM */}
              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #f1f5f9', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
                <p style={{ color: '#64748b' }}>
                  Don't have account? <Link href="/pricing" style={{ color: 'var(--green-dark)', fontWeight: 800, textDecoration: 'none' }}>Click to Sign up</Link>
                </p>

                <p style={{ color: '#64748b' }}>
                  Don't know your company's login URL? <a href="/contact" style={{ color: 'var(--green-dark)', fontWeight: 700, textDecoration: 'none' }}>Find your company's login URL</a>
                </p>

                <p style={{ marginTop: '4px' }}>
                  <Link href="/" style={{ color: '#94a3b8', fontSize: '12.5px', textDecoration: 'none', fontWeight: 600 }}>← Go to Home</Link>
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
