'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LandingHeader } from '@/components/layout/LandingHeader';
import { LandingFooter } from '@/components/layout/LandingFooter';
import { 
  Check, X, ChevronDown, ChevronUp, Sparkles, 
  ShieldCheck, ArrowRight, HelpCircle, MessageSquare
} from 'lucide-react';

export default function PricingPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Can I switch plans later?",
      a: "Yes! You can upgrade or downgrade your plan at any time. When you upgrade, you'll get immediate access to the new features. When you downgrade, changes take effect at the end of your current billing period. No penalties or fees for switching."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards (Visa, MasterCard, American Express, Discover) as well as PayPal. For Professional plan customers, we also offer invoice-based payment with NET-30 terms for annual subscriptions."
    },
    {
      q: "Do I need a credit card for the free trial?",
      a: "No! Start your 7-day free trial without entering any payment information. You'll only be asked for payment details when you decide to continue with a paid plan after your trial ends."
    },
    {
      q: "What happens to my data if I cancel?",
      a: "Your data remains accessible for 30 days after cancellation, giving you time to export everything you need. After 30 days, your data is permanently deleted from our servers. You can request a full data export at any time while your account is active."
    },
    {
      q: "Is there a discount for annual billing?",
      a: "Yes! When you choose annual billing, you get 2 months free (save ~17%). Contact our sales team for annual billing options or look for the toggle on our checkout page."
    },
    {
      q: "Can I add more employees to my Starter plan?",
      a: "The Starter plan includes up to 10 employees. If you need more, you can either upgrade to the Professional plan (unlimited employees) or add additional employee seats to your Starter plan at $5 per employee per month."
    },
    {
      q: "Do you offer refunds?",
      a: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied within the first 30 days, contact our support team for a full refund — no questions asked."
    },
    {
      q: "Is my data secure?",
      a: "Absolutely. We use 256-bit SSL encryption for all data transfers, and your data is stored in SOC 2 compliant data centers. We also perform regular security audits and offer two-factor authentication on all accounts. Your business data is safe with us."
    }
  ];

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--body)' }}>
      <LandingHeader />

      {/* ===== HERO SECTION ===== */}
      <section style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(29, 168, 81, 0.15), transparent)',
        padding: '64px 0 64px',
        textAlign: 'center',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="wrap" style={{ maxWidth: '840px' }}>
          <p style={{
            color: 'var(--green-dark)',
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '16px'
          }}>
            ONE PRICE. EVERYTHING INCLUDED.
          </p>

          <h1 style={{
            fontSize: 'clamp(36px, 4.6vw, 56px)',
            lineHeight: 1.1,
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '20px',
            letterSpacing: '-0.02em'
          }}>
            No 'Add-On' Surprises.<br />
            <span style={{
              background: 'linear-gradient(135deg, var(--green-dark) 0%, var(--green) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Ever.</span>
          </h1>

          <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto 32px' }}>
            Not sure? Start free. Upgrade when you're ready. All plans include our 5 core modules with no hidden fees.
          </p>

          {/* Trust Badges */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '20px', fontSize: '13.5px', color: '#334155', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={16} color="var(--green)" /> 7-day free trial
            </span>
            <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '20px', fontSize: '13.5px', color: '#334155', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={16} color="var(--green)" /> No credit card required
            </span>
            <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '20px', fontSize: '13.5px', color: '#334155', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={16} color="var(--green)" /> Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* ===== 3 PRICING CARDS SECTION ===== */}
      <section style={{ padding: '72px 0 88px', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', alignItems: 'stretch' }}>
            
            {/* FREE PLAN */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Free</h3>
                <p style={{ fontSize: '13.5px', color: '#64748b' }}>Perfect for testing everything before you commit</p>
              </div>

              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontSize: '44px', fontWeight: 800, color: '#0f172a' }}>₹0</span>
                <span style={{ fontSize: '15px', color: '#64748b' }}>/month</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#94a3b8', marginBottom: '28px' }}>Free forever. No credit card needed.</p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px 0', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Check size={18} color="var(--green)" /> Up to 3 employees
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Check size={18} color="var(--green)" /> All 5 core modules
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Check size={18} color="var(--green)" /> Basic features
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Check size={18} color="var(--green)" /> Community support
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#94a3b8', textDecoration: 'line-through' }}>
                  <X size={18} color="#cbd5e1" /> API access
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#94a3b8', textDecoration: 'line-through' }}>
                  <X size={18} color="#cbd5e1" /> Priority support
                </li>
              </ul>

              <button onClick={() => router.push('/signup')} className="btn btn-secondary btn-block" style={{ borderRadius: '12px', padding: '14px', fontWeight: 700 }}>
                Get Started Free
              </button>
            </div>

            {/* STARTER PLAN (MOST POPULAR) */}
            <div style={{
              background: '#ffffff',
              border: '2px solid var(--green)',
              borderRadius: '20px',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              boxShadow: '0 20px 40px -15px rgba(29, 168, 81, 0.25)',
              transform: 'scale(1.02)'
            }}>
              <span style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--green-dark)',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 16px',
                borderRadius: '20px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}>
                MOST POPULAR
              </span>

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Starter</h3>
                <p style={{ fontSize: '13.5px', color: '#64748b' }}>Most popular — best value for teams under 25</p>
              </div>

              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontSize: '44px', fontWeight: 800, color: 'var(--green-dark)' }}>₹2,999</span>
                <span style={{ fontSize: '15px', color: '#64748b' }}>/month</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#94a3b8', marginBottom: '28px' }}>Billed monthly. Cancel anytime.</p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px 0', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Check size={18} color="var(--green)" /> Up to 10 employees
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Check size={18} color="var(--green)" /> All 5 core modules
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Check size={18} color="var(--green)" /> 100+ features included
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Check size={18} color="var(--green)" /> Email support
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Check size={18} color="var(--green)" /> Basic reporting
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#94a3b8', textDecoration: 'line-through' }}>
                  <X size={18} color="#cbd5e1" /> API access
                </li>
              </ul>

              <button onClick={() => router.push('/signup')} className="btn btn-brass btn-block vt-pulse-cta" style={{ borderRadius: '12px', padding: '14px', fontWeight: 800 }}>
                Start Free Trial
              </button>
            </div>

            {/* PROFESSIONAL PLAN */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Professional</h3>
                <p style={{ fontSize: '13.5px', color: '#64748b' }}>Built for 25-100+ person companies with API access</p>
              </div>

              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontSize: '44px', fontWeight: 800, color: '#0f172a' }}>₹7,999</span>
                <span style={{ fontSize: '15px', color: '#64748b' }}>/month</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#94a3b8', marginBottom: '28px' }}>Billed monthly. Cancel anytime.</p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px 0', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Check size={18} color="var(--green)" /> Unlimited employees
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Check size={18} color="var(--green)" /> All 5 core modules
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Check size={18} color="var(--green)" /> 200+ features included
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Check size={18} color="var(--green)" /> Priority support
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Check size={18} color="var(--green)" /> API access
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#334155' }}>
                  <Check size={18} color="var(--green)" /> Advanced reporting & analytics
                </li>
              </ul>

              <button onClick={() => router.push('/signup')} className="btn btn-secondary btn-block" style={{ borderRadius: '12px', padding: '14px', fontWeight: 700 }}>
                Start Free Trial
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ===== COMPARE PLANS FEATURE MATRIX TABLE ===== */}
      <section style={{ background: '#f8fdf9', padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
              Compare Plans
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b' }}>
              See exactly what's included in each plan to make the right choice for your business.
            </p>
          </div>

          <div style={{ overflowX: 'auto', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '680px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '18px 24px', fontSize: '14px', fontWeight: 700, color: '#334155', width: '40%' }}>Feature</th>
                  <th style={{ padding: '18px 20px', fontSize: '14px', fontWeight: 700, color: '#0f172a', textAlign: 'center' }}>Free</th>
                  <th style={{ padding: '18px 20px', fontSize: '14px', fontWeight: 800, color: 'var(--green-dark)', textAlign: 'center', background: 'var(--green-tint)' }}>Starter</th>
                  <th style={{ padding: '18px 20px', fontSize: '14px', fontWeight: 700, color: '#0f172a', textAlign: 'center' }}>Professional</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Team Size</td>
                  <td style={{ padding: '16px 20px', fontSize: '14px', color: '#64748b', textAlign: 'center' }}>Up to 3</td>
                  <td style={{ padding: '16px 20px', fontSize: '14px', color: '#0f172a', fontWeight: 700, textAlign: 'center', background: 'var(--green-tint)' }}>Up to 10</td>
                  <td style={{ padding: '16px 20px', fontSize: '14px', color: '#0f172a', fontWeight: 700, textAlign: 'center' }}>Unlimited</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>CRM & Sales Module</td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><Check size={20} color="var(--green)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center', background: 'var(--green-tint)' }}><Check size={20} color="var(--green-dark)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><Check size={20} color="var(--green)" style={{ margin: '0 auto' }} /></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>HR & Payroll Module</td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><Check size={20} color="var(--green)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center', background: 'var(--green-tint)' }}><Check size={20} color="var(--green-dark)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><Check size={20} color="var(--green)" style={{ margin: '0 auto' }} /></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Project Management Module</td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><Check size={20} color="var(--green)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center', background: 'var(--green-tint)' }}><Check size={20} color="var(--green-dark)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><Check size={20} color="var(--green)" style={{ margin: '0 auto' }} /></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Finance & Invoicing Module</td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><Check size={20} color="var(--green)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center', background: 'var(--green-tint)' }}><Check size={20} color="var(--green-dark)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><Check size={20} color="var(--green)" style={{ margin: '0 auto' }} /></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Team Workspace Module</td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><Check size={20} color="var(--green)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center', background: 'var(--green-tint)' }}><Check size={20} color="var(--green-dark)" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><Check size={20} color="var(--green)" style={{ margin: '0 auto' }} /></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Total Features</td>
                  <td style={{ padding: '16px 20px', fontSize: '14px', color: '#64748b', textAlign: 'center' }}>50+</td>
                  <td style={{ padding: '16px 20px', fontSize: '14px', color: '#0f172a', fontWeight: 700, textAlign: 'center', background: 'var(--green-tint)' }}>100+</td>
                  <td style={{ padding: '16px 20px', fontSize: '14px', color: '#0f172a', fontWeight: 700, textAlign: 'center' }}>200+</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Support Level</td>
                  <td style={{ padding: '16px 20px', fontSize: '14px', color: '#64748b', textAlign: 'center' }}>Community</td>
                  <td style={{ padding: '16px 20px', fontSize: '14px', color: '#0f172a', fontWeight: 700, textAlign: 'center', background: 'var(--green-tint)' }}>Email</td>
                  <td style={{ padding: '16px 20px', fontSize: '14px', color: '#0f172a', fontWeight: 700, textAlign: 'center' }}>Priority (24/7)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>API Access</td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><X size={18} color="#cbd5e1" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center', background: 'var(--green-tint)' }}><X size={18} color="#cbd5e1" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><Check size={20} color="var(--green)" style={{ margin: '0 auto' }} /></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Advanced Analytics</td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><X size={18} color="#cbd5e1" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center', background: 'var(--green-tint)' }}><X size={18} color="#cbd5e1" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><Check size={20} color="var(--green)" style={{ margin: '0 auto' }} /></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Custom Branding (White Label)</td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><X size={18} color="#cbd5e1" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center', background: 'var(--green-tint)' }}><X size={18} color="#cbd5e1" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><Check size={20} color="var(--green)" style={{ margin: '0 auto' }} /></td>
                </tr>
                <tr>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>Dedicated Account Manager</td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><X size={18} color="#cbd5e1" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center', background: 'var(--green-tint)' }}><X size={18} color="#cbd5e1" style={{ margin: '0 auto' }} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}><Check size={20} color="var(--green)" style={{ margin: '0 auto' }} /></td>
                </tr>
              </tbody>
              <tfoot>
                <tr style={{ background: '#f8fafc', borderTop: '2px solid #e2e8f0' }}>
                  <td style={{ padding: '20px 24px' }}></td>
                  <td style={{ padding: '20px 16px', textAlign: 'center' }}>
                    <button onClick={() => router.push('/signup')} className="btn btn-secondary btn-sm" style={{ borderRadius: '8px' }}>Get Started</button>
                  </td>
                  <td style={{ padding: '20px 16px', textAlign: 'center', background: 'var(--green-tint)' }}>
                    <button onClick={() => router.push('/signup')} className="btn btn-brass btn-sm" style={{ borderRadius: '8px', fontWeight: 700 }}>Start Free Trial</button>
                  </td>
                  <td style={{ padding: '20px 16px', textAlign: 'center' }}>
                    <button onClick={() => router.push('/signup')} className="btn btn-secondary btn-sm" style={{ borderRadius: '8px' }}>Start Free Trial</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* ===== FAQ ACCORDION SECTION ===== */}
      <section style={{ padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap" style={{ maxWidth: '780px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b' }}>
              Got questions? We've got answers.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    textAlign: 'left',
                    background: openFaq === idx ? '#f8fafc' : '#ffffff',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#0f172a',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp size={20} color="var(--green-dark)" />
                  ) : (
                    <ChevronDown size={20} color="#64748b" />
                  )}
                </button>

                {openFaq === idx && (
                  <div style={{ padding: '0 24px 20px', fontSize: '14.5px', color: '#475569', lineHeight: 1.6, background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '8px' }}>Still have questions?</p>
            <a href="mailto:support@vasifytech.com" style={{ color: 'var(--green-dark)', fontWeight: 700, textDecoration: 'none', fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Contact our team →
            </a>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA BANNER ===== */}
      <section style={{
        background: 'linear-gradient(135deg, var(--green) 0%, var(--green-dark) 100%)',
        padding: '72px 0',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <div className="wrap" style={{ maxWidth: '760px' }}>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            Ready to Streamline Your Business?
          </h2>
          <p style={{ fontSize: '18px', color: '#dcf3e2', marginBottom: '32px' }}>
            Join 4,500+ businesses already using VasifyTech Suite to manage their entire business in one place.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => router.push('/signup')} className="btn btn-lg" style={{ background: '#ffffff', color: 'var(--green-dark)', fontWeight: 800, borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
              Start Your Free Trial
            </button>
            <button onClick={() => router.push('/contact')} className="btn btn-secondary btn-lg" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '12px' }}>
              Talk to Sales
            </button>
          </div>
          <p style={{ fontSize: '13px', color: '#dcf3e2', marginTop: '16px' }}>
            7-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
