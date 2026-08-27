'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LandingHeader } from '@/components/layout/LandingHeader';
import { LandingFooter } from '@/components/layout/LandingFooter';
import { 
  Check, Users, HeartHandshake, Shield, Lock, 
  Sparkles, ArrowRight, CheckCircle2, Building, Mail
} from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  
  // Plan State
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'lifetime'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('starter_monthly');

  // Form State
  const [selectedServices, setSelectedServices] = useState<string[]>(['Full Business Suite']);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-generate subdomain from company name
  const handleCompanyChange = (val: string) => {
    setCompanyName(val);
    const cleaned = val.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 30);
    setSubdomain(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) return;

    setApiError('');
    setIsSubmitting(true);

    try {
      let res;
      try {
        res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_name: name,
            mobile_number: mobileNumber,
            email: email,
            company_name: companyName,
            service_needed: selectedServices.join(', ')
          })
        });
      } catch (err) {
        res = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_name: name,
            mobile_number: mobileNumber,
            email: email,
            company_name: companyName,
            service_needed: selectedServices.join(', ')
          })
        });
      }

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.user) {
          try {
            localStorage.setItem('vt_active_user', JSON.stringify(data.user));
          } catch (e) {}
        }
        setFormSubmitted(true);
        setName('');
        setMobileNumber('');
        setEmail('');
        setCompanyName('');
        setSubdomain('');
        setPassword('');
        setReferralCode('');
      } else {
        if (data.message && data.message.toLowerCase().includes('email')) {
          setApiError('This email is already registered.');
        } else if (data.message && data.message.toLowerCase().includes('mobile')) {
          setApiError('This mobile number is already registered.');
        } else {
          setApiError(data.message || 'Unable to save your information. Please try again.');
        }
      }
    } catch (err) {
      setApiError('Unable to save your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--body)' }}>
      <LandingHeader />

      <section style={{
        flex: 1,
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(29, 168, 81, 0.12), transparent)',
        padding: '64px 0 96px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="wrap" style={{ maxWidth: '1140px', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '48px',
            alignItems: 'start'
          }}>
            
            {/* LEFT MARKETING PANEL */}
            <div style={{ position: 'relative' }}>
              <h1 style={{
                fontSize: 'clamp(30px, 4.2vw, 52px)',
                fontWeight: 800,
                color: '#0f172a',
                lineHeight: 1.12,
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}>
                Start Your <span style={{
                  background: 'linear-gradient(135deg, var(--green-dark) 0%, var(--green) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>7-Day Free Trial</span>
              </h1>

              <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, marginBottom: '36px' }}>
                Join 4,500+ businesses managing everything in one place. No credit card required.
              </p>

              {/* 4 Benefits List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-dark)', flexShrink: 0 }}>
                    <Check size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>5 Modules, 200+ Features</h4>
                    <p style={{ fontSize: '13.5px', color: '#64748b' }}>CRM, HRM, Projects, Finance, and Workspace — all included.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
                    <Users size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>Unlimited Team Members</h4>
                    <p style={{ fontSize: '13.5px', color: '#64748b' }}>Add your entire team at no extra cost.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#faf5ff', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea', flexShrink: 0 }}>
                    <HeartHandshake size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>24/7 Support</h4>
                    <p style={{ fontSize: '13.5px', color: '#64748b' }}>Expert support whenever you need it.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fffbeb', border: '1px solid #fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', flexShrink: 0 }}>
                    <Shield size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>30-Day Money-Back Guarantee</h4>
                    <p style={{ fontSize: '13.5px', color: '#64748b' }}>Not satisfied? Get a full refund, no questions asked.</p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, color: '#475569', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={14} color="var(--green-dark)" /> 256-bit Encryption
                </span>
                <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, color: '#475569', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={14} color="var(--green-dark)" /> 99.9% Uptime
                </span>
                <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, color: '#475569', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Shield size={14} color="var(--green-dark)" /> GDPR Compliant
                </span>
              </div>
            </div>

            {/* RIGHT FORM BOX */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '24px',
              padding: 'clamp(20px, 4vw, 36px) clamp(16px, 4vw, 32px)',
              boxShadow: 'var(--shadow-lg)'
            }}>

              {formSubmitted ? (
                <div style={{ padding: '32px 20px', textAlign: 'center', background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', borderRadius: '16px' }}>
                  <CheckCircle2 size={48} color="var(--green-dark)" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--green-dark)', marginBottom: '8px' }}>Workspace Created Successfully!</h3>
                  <p style={{ fontSize: '15px', color: 'var(--green-dark)', marginBottom: '24px' }}>
                    Welcome to VasifyTech. Your chosen service module is activated and ready.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => {
                        const sStr = selectedServices.join(' ').toLowerCase();
                        const target = sStr.includes('hr') ? '/app/hr' :
                                       sStr.includes('project') || sStr.includes('custom') || sStr.includes('saas') ? '/app/projects' :
                                       sStr.includes('finance') || sStr.includes('invoicing') ? '/app/finance' :
                                       sStr.includes('workspace') || sStr.includes('whatsapp') ? '/app/workspace' : '/app/crm';
                        router.push(target);
                      }} 
                      className="btn btn-brass"
                      style={{ borderRadius: '12px', padding: '12px 24px', fontWeight: 800 }}
                    >
                      🚀 Enter My Activated Workspace
                    </button>
                    <button 
                      onClick={() => setFormSubmitted(false)} 
                      style={{ background: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', padding: '12px 20px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Register Another User
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {apiError && (
                    <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', color: '#991b1b', fontSize: '14px', fontWeight: 600 }}>
                      {apiError}
                    </div>
                  )}

                  {/* Choose Your Plan Section */}
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                      Choose Your Plan
                    </label>

                    {/* Monthly / Lifetime Toggle */}
                    <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '12px', padding: '4px', marginBottom: '16px' }}>
                      <button
                        type="button"
                        onClick={() => { setBillingCycle('monthly'); setSelectedPlan('starter_monthly'); }}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 700,
                          border: 'none',
                          background: billingCycle === 'monthly' ? '#ffffff' : 'transparent',
                          color: billingCycle === 'monthly' ? '#0f172a' : '#64748b',
                          boxShadow: billingCycle === 'monthly' ? 'var(--shadow-sm)' : 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        onClick={() => { setBillingCycle('lifetime'); setSelectedPlan('starter_lifetime'); }}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: 700,
                          border: 'none',
                          background: billingCycle === 'lifetime' ? '#ffffff' : 'transparent',
                          color: billingCycle === 'lifetime' ? '#0f172a' : '#64748b',
                          boxShadow: billingCycle === 'lifetime' ? 'var(--shadow-sm)' : 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Lifetime <span style={{ color: '#d97706', fontSize: '11px' }}>(Best Value)</span>
                      </button>
                    </div>

                    {/* Plan Cards Stack */}
                    {billingCycle === 'monthly' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div
                          onClick={() => setSelectedPlan('starter_monthly')}
                          style={{
                            padding: '14px 16px',
                            borderRadius: '12px',
                            border: selectedPlan === 'starter_monthly' ? '2px solid var(--green-dark)' : '1px solid #e2e8f0',
                            background: selectedPlan === 'starter_monthly' ? 'var(--green-tint)' : '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a' }}>Starter</span>
                              <span style={{ background: 'var(--green-tint)', color: 'var(--green-dark)', border: '1px solid var(--green-tint-2)', fontSize: '11px', fontWeight: 800, padding: '1px 7px', borderRadius: '10px' }}>7 Days Free</span>
                            </div>
                            <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>Up to 10 employees</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>₹2,999<span style={{ fontSize: '12px', color: '#64748b' }}>/mo</span></div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>after trial</div>
                          </div>
                        </div>

                        <div
                          onClick={() => setSelectedPlan('pro_monthly')}
                          style={{
                            padding: '14px 16px',
                            borderRadius: '12px',
                            border: selectedPlan === 'pro_monthly' ? '2px solid var(--green-dark)' : '1px solid #e2e8f0',
                            background: selectedPlan === 'pro_monthly' ? 'var(--green-tint)' : '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a' }}>Professional</span>
                              <span style={{ background: 'var(--green-tint)', color: 'var(--green-dark)', border: '1px solid var(--green-tint-2)', fontSize: '11px', fontWeight: 800, padding: '1px 7px', borderRadius: '10px' }}>7 Days Free</span>
                              <span style={{ background: '#eff6ff', color: '#2563eb', fontSize: '11px', fontWeight: 800, padding: '1px 7px', borderRadius: '10px' }}>Popular</span>
                            </div>
                            <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>Unlimited employees</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>₹7,999<span style={{ fontSize: '12px', color: '#64748b' }}>/mo</span></div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>after trial</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div
                          onClick={() => setSelectedPlan('starter_lifetime')}
                          style={{
                            padding: '14px 16px',
                            borderRadius: '12px',
                            border: selectedPlan === 'starter_lifetime' ? '2px solid var(--green-dark)' : '1px solid #e2e8f0',
                            background: selectedPlan === 'starter_lifetime' ? 'var(--green-tint)' : '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a' }}>Starter Lifetime</span>
                            <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>Up to 5 employees • Pay once, use forever</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>₹3,999</div>
                            <div style={{ fontSize: '11px', color: 'var(--green-dark)', fontWeight: 700 }}>one-time</div>
                          </div>
                        </div>

                        <div
                          onClick={() => setSelectedPlan('pro_lifetime')}
                          style={{
                            padding: '14px 16px',
                            borderRadius: '12px',
                            border: selectedPlan === 'pro_lifetime' ? '2px solid var(--green-dark)' : '1px solid #e2e8f0',
                            background: selectedPlan === 'pro_lifetime' ? 'var(--green-tint)' : '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a' }}>Professional Lifetime</span>
                              <span style={{ background: '#fffbeb', color: '#d97706', fontSize: '11px', fontWeight: 800, padding: '1px 7px', borderRadius: '10px' }}>Best Value</span>
                            </div>
                            <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>Unlimited employees • Pay once, use forever</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>₹11,999</div>
                            <div style={{ fontSize: '11px', color: 'var(--green-dark)', fontWeight: 700 }}>one-time</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* What Services Do You Want Section (Custom Multi-Select Dropdown: Min 1, Max 3) */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>
                        What Services Do You Want? <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: selectedServices.length >= 3 ? '#d97706' : 'var(--green-dark)' }}>
                        {selectedServices.length}/3 selected (Min 1, Max 3)
                      </span>
                    </div>

                    {/* Dropdown Menu Header Button */}
                    <div
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                        {selectedServices.map(s => (
                          <span key={s} style={{ background: 'var(--green-tint)', color: 'var(--green-dark)', border: '1px solid var(--green-tint-2)', padding: '2px 8px', borderRadius: '6px', fontSize: '12.5px', fontWeight: 700 }}>
                            {s}
                          </span>
                        ))}
                      </div>
                      <span style={{ color: '#64748b', fontSize: '12px', fontWeight: 700 }}>
                        {dropdownOpen ? '▲ Close' : '▼ Select Services'}
                      </span>
                    </div>

                    {/* Dropdown Popup Checklist Menu */}
                    {dropdownOpen && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 30,
                        marginTop: '4px',
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '12px',
                        boxShadow: 'var(--shadow-lg)',
                        padding: '8px',
                        maxHeight: '260px',
                        overflowY: 'auto'
                      }}>
                        {[
                          { title: 'Full Business Suite', desc: '🚀 All 5 Essential Modules Included' },
                          { title: 'CRM & Sales', desc: '📈 Sales Pipeline & Lead Management' },
                          { title: 'HR & Payroll', desc: '💼 Staff Attendance & Payroll' },
                          { title: 'Project Management', desc: '📊 Tasks & Project Tracking' },
                          { title: 'Finance & Invoicing', desc: '💳 Invoices & Expense Log' },
                          { title: 'Team Workspace', desc: '💬 Live Chat & Calendar' }
                        ].map((item) => {
                          const isChecked = selectedServices.includes(item.title);
                          const isMaxReached = selectedServices.length >= 3 && !isChecked;

                          return (
                            <div
                              key={item.title}
                              onClick={() => {
                                if (isChecked) {
                                  if (selectedServices.length > 1) {
                                    setSelectedServices(selectedServices.filter(s => s !== item.title));
                                  }
                                } else {
                                  if (selectedServices.length < 3) {
                                    setSelectedServices([...selectedServices, item.title]);
                                  }
                                }
                              }}
                              style={{
                                padding: '9px 12px',
                                borderRadius: '8px',
                                background: isChecked ? 'var(--green-tint)' : isMaxReached ? '#f8fafc' : 'transparent',
                                cursor: isMaxReached ? 'not-allowed' : 'pointer',
                                opacity: isMaxReached ? 0.5 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '4px',
                                transition: 'background 0.15s ease'
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                disabled={isMaxReached}
                                readOnly
                                style={{ accentColor: 'var(--green-dark)', width: '16px', height: '16px', cursor: 'pointer' }}
                              />
                              <div>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{item.title}</div>
                                <div style={{ fontSize: '11px', color: '#64748b' }}>{item.desc}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                      Company Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => handleCompanyChange(e.target.value)}
                      placeholder="Your company name"
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>

                  {/* Workspace URL / Subdomain */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                      Workspace URL <span style={{ color: '#64748b', fontWeight: 400 }}>(Your login address)</span> <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="text"
                        required
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                        placeholder="yourcompany"
                        style={{
                          flex: 1,
                          padding: '11px 14px',
                          borderTopLeftRadius: '8px',
                          borderBottomLeftRadius: '8px',
                          border: '1px solid #cbd5e1',
                          borderRight: 'none',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                      <span style={{
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        padding: '11px 14px',
                        borderTopRightRadius: '8px',
                        borderBottomRightRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--green-dark)'
                      }}>
                        .vasifytech.com
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                      Your team will sign in at: <strong style={{ color: 'var(--green-dark)' }}>{subdomain || 'yourcompany'}.vasifytech.com</strong>
                    </p>
                  </div>

                  {/* Your Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                      Your Name <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Smith"
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                      Mobile Number <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRight: 'none',
                        padding: '11px 12px',
                        borderTopLeftRadius: '8px',
                        borderBottomLeftRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#475569'
                      }}>
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        pattern="[0-9]{10}"
                        value={mobileNumber}
                        onChange={(e) => {
                          const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setMobileNumber(onlyDigits);
                        }}
                        placeholder="9876543210"
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderTopRightRadius: '8px',
                          borderBottomRightRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                      Enter 10-digit mobile number ({mobileNumber.length}/10 digits)
                    </p>
                  </div>

                  {/* Work Email */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                      Work Email <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                      Password <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>

                  {/* Referral Code */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                      Referral Code (optional)
                    </label>
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Referral code (optional)"
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>

                  {/* Terms checkbox */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      style={{ marginTop: '3px', cursor: 'pointer' }}
                    />
                    <label htmlFor="terms" style={{ fontSize: '12.5px', color: '#64748b', cursor: 'pointer' }}>
                      I agree to the <a href="#" style={{ color: 'var(--green-dark)', fontWeight: 700, textDecoration: 'none' }}>Terms of Use</a> and <a href="#" style={{ color: 'var(--green-dark)', fontWeight: 700, textDecoration: 'none' }}>Privacy Policy</a>
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={!agreedTerms || isSubmitting}
                    className="btn btn-brass"
                    style={{
                      borderRadius: '12px',
                      padding: '14px',
                      fontWeight: 800,
                      fontSize: '16px',
                      opacity: (agreedTerms && !isSubmitting) ? 1 : 0.6
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Start My Free Trial'} <ArrowRight size={18} />
                  </button>

                  <p style={{ fontSize: '13.5px', color: '#64748b', textAlign: 'center', marginTop: '4px' }}>
                    Already have an account? <Link href="/signin" style={{ color: 'var(--green-dark)', fontWeight: 800, textDecoration: 'none' }}>Sign In</Link>
                  </p>
                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
