'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LandingHeader } from '@/components/layout/LandingHeader';
import { LandingFooter } from '@/components/layout/LandingFooter';
import { 
  Building2, Zap, DollarSign, Users, Shield, HeartHandshake, 
  MessageSquare, Check, Sparkles, Clock, Globe, Lock
} from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();

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
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--green-tint)',
            border: '1px solid var(--green-tint-2)',
            color: 'var(--green-dark)',
            fontSize: '12px',
            fontWeight: 700,
            padding: '5px 16px',
            borderRadius: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '20px'
          }}>
            <Building2 size={14} color="var(--green-dark)" /> Based in San Francisco, USA
          </span>

          <h1 style={{
            fontSize: 'clamp(36px, 4.6vw, 56px)',
            lineHeight: 1.1,
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '20px',
            letterSpacing: '-0.02em'
          }}>
            Built for American Businesses,<br />
            <span style={{
              background: 'linear-gradient(135deg, var(--green-dark) 0%, var(--green) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>By People Who Get It</span>
          </h1>

          <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto' }}>
            We started VasifyTech Suite because we were tired of juggling 10 different tools to run our business. So we built one platform that does it all — designed specifically for US small and mid-size businesses.
          </p>
        </div>
      </section>

      {/* ===== OUR STORY SECTION ===== */}
      <section style={{ padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap" style={{ maxWidth: '1140px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-dark)' }}>
                  <Building2 size={24} />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>Our Story</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '16px', color: '#475569', lineHeight: 1.6 }}>
                <p>
                  In 2019, our founding team was running a growing consulting firm in Austin, Texas. Like many American businesses, we were drowning in software subscriptions — one tool for CRM, another for HR, separate apps for invoicing, project management, and team communication.
                </p>
                <p>
                  We were spending over <strong style={{ color: '#0f172a' }}>$800/month</strong> on software alone, and none of it talked to each other. Our data was scattered across a dozen platforms. Simple tasks like generating a client invoice that included project hours required manual exports, copy-pasting, and way too much coffee.
                </p>
                <p>
                  That's when we asked ourselves: <strong style={{ color: '#0f172a' }}>What if there was one platform that did everything?</strong> Not a watered-down "all-in-one" that does nothing well, but a genuinely powerful suite of tools designed to work together seamlessly.
                </p>
                <p>
                  VasifyTech Suite was born from that frustration. Today, we help 4,500+ businesses save time, money, and sanity by consolidating their operations into one intuitive platform.
                </p>
              </div>
            </div>

            {/* QUOTE BLOCK */}
            <div style={{
              background: '#f8fdf9',
              border: '1px solid var(--green-tint-2)',
              borderRadius: '24px',
              padding: '40px 32px',
              boxShadow: 'var(--shadow-md)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--green) 0%, var(--green-dark) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '20px', fontWeight: 800 }}>
                  VT
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>VasifyTech Suite</h3>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Est. 2019</p>
                </div>
              </div>

              <blockquote style={{ fontSize: '17px', fontStyle: 'italic', color: '#334155', lineHeight: 1.6, borderLeft: '4px solid var(--green)', paddingLeft: '16px', margin: 0 }}>
                "We didn't set out to build software. We set out to solve our own problem. That's why VasifyTech Suite works — it was built by operators, for operators."
              </blockquote>
              <p style={{ marginTop: '16px', fontSize: '13.5px', fontWeight: 700, color: 'var(--green-dark)' }}>— VasifyTech Founding Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR MISSION SECTION ===== */}
      <section style={{ background: '#f8fafc', padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap" style={{ maxWidth: '1140px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
              Our Mission
            </h2>
            <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6 }}>
              To give every American business access to the same powerful tools that Fortune 500 companies have — without the enterprise price tag or the complexity.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px 24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--green-tint)', color: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Zap size={28} />
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Simplify Operations</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>Replace your scattered tool stack with one unified platform. Less chaos, more clarity, better results.</p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px 24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <DollarSign size={28} />
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Cut Software Costs</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>Stop paying for 10 separate subscriptions. Our customers save an average of $400/month on software.</p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px 24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#faf5ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Empower Teams</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>Give your team the tools they need to collaborate, communicate, and get things done — all in one place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR VALUES SECTION ===== */}
      <section style={{ padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap" style={{ maxWidth: '1140px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
              Our Values
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b' }}>
              The principles that guide everything we build, every decision we make, and every customer we serve.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Shield size={22} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>We Ship Fast and Fix Faster</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5 }}>Weekly releases, not yearly. We move fast, and when something breaks, we fix it in hours — not weeks.</p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfeff', color: '#0891b2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Zap size={22} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Your Feedback Shapes Our Roadmap</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5 }}>We actually read your emails. Customer requests become features — often within weeks, not quarters.</p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <HeartHandshake size={22} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>No Corporate BS — Ever</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5 }}>No buzzwords, no hidden fees, no runaround. We're direct, honest, and allergic to corporate speak.</p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--green-tint)', color: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <MessageSquare size={22} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>24/7 Real Human Support</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.5 }}>Real people, real answers. Not chatbots, not ticket queues — humans who actually help, whenever you need it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATISTICS SECTION ===== */}
      <section style={{ background: '#f8fdf9', padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap" style={{ maxWidth: '1140px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
              VasifyTech by the Numbers
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b' }}>
              Real impact for real businesses across America.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '28px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--green-dark)' }}>4,500+</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>Active Customers</div>
              <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '2px' }}>Businesses worldwide</div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '28px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '42px', fontWeight: 800, color: '#2563eb' }}>200+</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>Features Built</div>
              <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '2px' }}>Across 5 modules</div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '28px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '42px', fontWeight: 800, color: '#d97706' }}>$400</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>Avg. Monthly Savings</div>
              <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '2px' }}>Per customer</div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '28px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '42px', fontWeight: 800, color: '#9333ea' }}>99.9%</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>Uptime SLA</div>
              <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '2px' }}>Enterprise-grade reliability</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BUILT FOR AMERICAN BUSINESS SECTION ===== */}
      <section style={{ padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap" style={{ maxWidth: '1140px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
                Built for American Business
              </h2>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '28px' }}>
                We understand the unique challenges facing US small and mid-size businesses. From navigating complex payroll tax compliance to managing multi-state operations, VasifyTech Suite is designed with American business realities in mind.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--green-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={14} color="var(--green-dark)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>US Tax Compliance</h4>
                    <p style={{ fontSize: '13.5px', color: '#64748b' }}>Built-in support for federal and state tax calculations, 1099 reporting, and payroll compliance.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--green-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={14} color="var(--green-dark)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>US-Based Support</h4>
                    <p style={{ fontSize: '13.5px', color: '#64748b' }}>Real humans, based in the USA, available during your business hours — not a chatbot at 3am.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--green-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={14} color="var(--green-dark)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>USD Pricing, No Surprises</h4>
                    <p style={{ fontSize: '13.5px', color: '#64748b' }}>Transparent USD pricing with no currency conversion fees or hidden international charges.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--green-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={14} color="var(--green-dark)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Data Stored in USA</h4>
                    <p style={{ fontSize: '13.5px', color: '#64748b' }}>Your business data stays on US servers, compliant with US data protection standards.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 BADGES GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>🇺🇸</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>50 States</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>Customers nationwide</div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>💼</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>SMBs</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>Our core focus</div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>⏰</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>EST to PST</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>Live support hours</div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>🔒</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>SOC 2</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>Compliant security</div>
              </div>
            </div>
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
            Ready to Simplify Your Business?
          </h2>
          <p style={{ fontSize: '18px', color: '#dcf3e2', marginBottom: '32px' }}>
            Join 4,500+ businesses that have consolidated their tools, cut costs, and boosted productivity with VasifyTech Suite.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => router.push('/app/crm')} className="btn btn-lg" style={{ background: '#ffffff', color: 'var(--green-dark)', fontWeight: 800, borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
              Start Free Trial
            </button>
            <Link href="/pricing" className="btn btn-secondary btn-lg" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '12px', textDecoration: 'none' }}>
              View Pricing
            </Link>
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
