'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LandingHeader } from '@/components/layout/LandingHeader';
import { LandingFooter } from '@/components/layout/LandingFooter';
import { 
  Users, UserCheck, Briefcase, DollarSign, MessageSquare, ArrowRight, CheckCircle2, 
  Sparkles, Layers, ShieldCheck, Lock, Globe, Server, Code, Bot, Key, Sliders, 
  Palette, Languages, Smartphone, Clock, BarChart3, Check, HelpCircle
} from 'lucide-react';

// Sub-component for Dashboard Laptop Mockup Frame
const DashboardMockup: React.FC<{ activeModule: string }> = ({ activeModule }) => {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #cbd5e1',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -15px rgba(29, 168, 81, 0.15)',
      overflow: 'hidden'
    }}>
      {/* Top Browser Bar */}
      <div style={{
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ef4444' }}></span>
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#f59e0b' }}></span>
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10b981' }}></span>
        </div>
        <div style={{
          flex: 1,
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '3px 12px',
          fontSize: '11px',
          color: '#64748b',
          textAlign: 'center'
        }}>
          app.vasifytechsuite.com / {activeModule}
        </div>
      </div>

      {/* Main UI Screen Content */}
      <div style={{ padding: '16px', background: '#f8fdf9' }}>
        {/* Top Header Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '14px',
          background: '#ffffff',
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
            John Marketing Agency — <span style={{ color: 'var(--green-dark)' }}>{activeModule.toUpperCase()}</span>
          </div>
          <span style={{ fontSize: '11px', background: 'var(--green-tint)', color: 'var(--green-dark)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
            Live Sync
          </span>
        </div>

        {/* 3 Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '8px' }}>
            <div style={{ fontSize: '10.5px', color: '#64748b' }}>Total Revenue</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>$687,430</div>
            <div style={{ fontSize: '10px', color: 'var(--green-dark)', fontWeight: 600 }}>↑ 18.4% vs last mo</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '8px' }}>
            <div style={{ fontSize: '10.5px', color: '#64748b' }}>Active Staff</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>62 Employees</div>
            <div style={{ fontSize: '10px', color: '#2563eb', fontWeight: 600 }}>100% Active</div>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '8px' }}>
            <div style={{ fontSize: '10.5px', color: '#64748b' }}>Team Health</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--green-dark)' }}>78% Good</div>
            <div style={{ fontSize: '10px', color: '#64748b' }}>Today Score</div>
          </div>
        </div>

        {/* Dynamic Activity List */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>
            {activeModule} Real-Time Activity
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#0f172a', fontWeight: 600 }}>✓ Lead Qualified: Acme Corp ($42,000)</span>
              <span style={{ color: 'var(--green-dark)', fontWeight: 700 }}>Sales</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#0f172a', fontWeight: 600 }}>✓ Payroll Run Approved: 62 Payslips</span>
              <span style={{ color: '#2563eb', fontWeight: 700 }}>HR</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span style={{ color: '#0f172a', fontWeight: 600 }}>✓ Invoice #1089 Paid ($12,340)</span>
              <span style={{ color: '#ca8a04', fontWeight: 700 }}>Finance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FeaturesPage() {
  const router = useRouter();

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--body)' }}>
      <LandingHeader />

      {/* ===== HERO SECTION ===== */}
      <section style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(29, 168, 81, 0.15), transparent)',
        padding: '64px 0 72px',
        textAlign: 'center',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="wrap-content" style={{ maxWidth: '1080px' }}>
          <p style={{
            color: 'var(--green-dark)',
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '16px'
          }}>
            PLATFORM FEATURES
          </p>

          <h1 style={{
            fontSize: 'clamp(36px, 4.6vw, 56px)',
            lineHeight: 1.1,
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '20px',
            letterSpacing: '-0.02em'
          }}>
            Stop Juggling 10 Tools.<br />
            Run Everything From <span style={{
              background: 'linear-gradient(135deg, var(--green-dark) 0%, var(--green) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>One Dashboard.</span>
          </h1>

          <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto 36px' }}>
            CRM + HR + Projects + Finance + Team Chat — finally talking to each other. No more app switching. No more data silos.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button onClick={() => router.push('/signup')} className="btn btn-brass btn-lg vt-pulse-cta" style={{ borderRadius: '12px', fontSize: '16px', fontWeight: 700 }}>
              Start Free Trial
            </button>
            <a href="#pricing" className="btn btn-secondary btn-lg" style={{ borderRadius: '12px', fontSize: '16px', fontWeight: 600 }}>
              See Pricing
            </a>
          </div>

          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', maxWidth: '960px', width: '100%', margin: '0 auto' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px 16px' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--green-dark)' }}>200+</div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Features</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px 16px' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#2563eb' }}>5</div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Core Modules</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px 16px' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#d97706' }}>4,500+</div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Businesses</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px 16px' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#9333ea' }}>99.9%</div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STICKY MODULE NAVIGATION BAR ===== */}
      <nav style={{
        position: 'sticky',
        top: '72px',
        zIndex: 40,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e2e8f0',
        padding: '14px 0'
      }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <a href="#crm" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', padding: '8px 16px', borderRadius: '20px', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none' }}>
            <Users size={16} /> CRM & Sales
          </a>
          <a href="#hrm" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', color: 'var(--green-dark)', padding: '8px 16px', borderRadius: '20px', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none' }}>
            <UserCheck size={16} /> HR & Payroll
          </a>
          <a href="#projects" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fffbeb', border: '1px solid #fef3c7', color: '#b45309', padding: '8px 16px', borderRadius: '20px', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none' }}>
            <Briefcase size={16} /> Projects
          </a>
          <a href="#finance" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#faf5ff', border: '1px solid #e9d5ff', color: '#6b21a8', padding: '8px 16px', borderRadius: '20px', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none' }}>
            <DollarSign size={16} /> Finance
          </a>
          <a href="#workspace" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fdf2f8', border: '1px solid #fbcfe8', color: '#be185d', padding: '8px 16px', borderRadius: '20px', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none' }}>
            <MessageSquare size={16} /> Workspace
          </a>
        </div>
      </nav>

      {/* ===== CRM MODULE SECTION (TEXT LEFT, MOCKUP RIGHT) ===== */}
      <section id="crm" style={{ padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                  <Users size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>Close More Deals, Lose Fewer Leads</h2>
                  <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: 700 }}>20+ features</span>
                </div>
              </div>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '32px' }}>
                Manage your entire sales pipeline from lead to close. Track deals, send proposals, and convert more prospects into paying customers.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#2563eb" /> Lead Pipeline
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Visual kanban boards for tracking leads through your sales funnel</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#2563eb" /> Deal Tracking
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Monitor deal progress, values, and expected close dates</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#2563eb" /> Proposals & Estimates
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Create professional proposals with e-signatures</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#2563eb" /> Client Management
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Complete client profiles with contact history</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#2563eb" /> Product Catalog
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Manage products and services with pricing tiers</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#2563eb" /> Sales Reports
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Revenue forecasts and performance analytics</p>
                </div>
              </div>
            </div>

            <div>
              <DashboardMockup activeModule="Sales CRM & Pipeline" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== HR MODULE SECTION (MOCKUP LEFT, TEXT RIGHT) ===== */}
      <section id="hrm" style={{ background: '#f8fdf9', padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <DashboardMockup activeModule="HR & Payroll Suite" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-dark)' }}>
                  <UserCheck size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>Hire, Pay & Manage People Without The Chaos</h2>
                  <span style={{ fontSize: '13px', color: 'var(--green-dark)', fontWeight: 700 }}>70+ features</span>
                </div>
              </div>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '32px' }}>
                Streamline your entire HR operations — from hiring to payroll. Manage attendance, leaves, performance reviews, and employee data in one place.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="var(--green)" /> Payroll Management
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Automated payroll with tax calculations and direct deposits</p>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="var(--green)" /> Time & Attendance
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>GPS tracking, biometric integration, timesheets</p>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="var(--green)" /> Leave Management
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Custom leave policies, approval workflows, accruals</p>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="var(--green)" /> Recruitment
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Job postings, applicant tracking, interview scheduling</p>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="var(--green)" /> Performance Reviews
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>360° feedback, goal tracking, competency ratings</p>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="var(--green)" /> Employee Onboarding
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Digital paperwork, checklists, training workflows</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS MODULE SECTION (TEXT LEFT, MOCKUP RIGHT) ===== */}
      <section id="projects" style={{ padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fffbeb', border: '1px solid #fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
                  <Briefcase size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>Projects That Don't Derail</h2>
                  <span style={{ fontSize: '13px', color: '#d97706', fontWeight: 700 }}>45+ features</span>
                </div>
              </div>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '32px' }}>
                Plan, track, and deliver projects on time. From Kanban boards to Gantt charts, manage tasks, milestones, and team workload with ease.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#d97706" /> Task Management
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Create, assign, and track tasks with subtasks and dependencies</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#d97706" /> Gantt Charts
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Visual project timelines with drag-and-drop scheduling</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#d97706" /> Kanban Boards
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Flexible boards for agile and visual workflows</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#d97706" /> Time Tracking
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Log hours, set budgets, track billable vs non-billable time</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#d97706" /> Resource Planning
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Workload management and capacity planning</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#d97706" /> Project Templates
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Reusable templates for repeating project types</p>
                </div>
              </div>
            </div>

            <div>
              <DashboardMockup activeModule="Project Management" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINANCE MODULE SECTION (MOCKUP LEFT, TEXT RIGHT) ===== */}
      <section id="finance" style={{ background: '#f8fdf9', padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <DashboardMockup activeModule="Finance & Invoicing" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#faf5ff', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ca8a04' }}>
                  <DollarSign size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>Get Paid Faster. Know Your Numbers.</h2>
                  <span style={{ fontSize: '13px', color: '#ca8a04', fontWeight: 700 }}>35+ features</span>
                </div>
              </div>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '32px' }}>
                Create professional invoices, track expenses, manage payments, and keep your financial activity organized. Advanced accounting and tax-ready reporting are coming soon.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#ca8a04" /> Invoicing
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Professional invoices with custom branding and auto-reminders</p>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#ca8a04" /> Expense Tracking
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Categorize expenses, attach receipts, approve claims</p>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#ca8a04" /> Payment Management
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Track invoice payments and use the payment options currently supported by VasifyTech Suite.</p>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#ca8a04" /> Purchase Orders
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Create POs, track vendor payments, manage inventory</p>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', opacity: 0.85 }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} color="#d97706" /> Accounting <span style={{ fontSize: '10px', background: '#fffbeb', color: '#b45309', padding: '2px 6px', borderRadius: '10px', textTransform: 'uppercase', fontWeight: 700 }}>COMING SOON</span>
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Chart of accounts, journals, and double-entry bookkeeping are planned and are not currently available.</p>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', opacity: 0.85 }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} color="#d97706" /> Tax-Ready Reports <span style={{ fontSize: '10px', background: '#fffbeb', color: '#b45309', padding: '2px 6px', borderRadius: '10px', textTransform: 'uppercase', fontWeight: 700 }}>COMING SOON</span>
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Profit and loss, balance sheet, and cash flow reports are planned and are not currently available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WORKSPACE MODULE SECTION (TEXT LEFT, MOCKUP RIGHT) ===== */}
      <section id="workspace" style={{ padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fdf2f8', border: '1px solid #fbcfe8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea' }}>
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>Keep Your Team Aligned (Even Remote)</h2>
                  <span style={{ fontSize: '13px', color: '#9333ea', fontWeight: 700 }}>30+ features</span>
                </div>
              </div>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '32px' }}>
                Keep your team connected and productive. Chat, tickets, events, and collaboration tools — all in one unified workspace.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#9333ea" /> Team Messaging
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Real-time chat with channels, DMs, and file sharing</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#9333ea" /> Support Tickets
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Internal help desk for IT and HR requests</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#9333ea" /> Events & Calendar
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Company events, meetings, and shared calendars</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#9333ea" /> Zoom Integration
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>One-click video meetings from any project or task</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#9333ea" /> Announcements
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Company-wide notices with read receipts</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#9333ea" /> Asset Tracking
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>Track company equipment and asset assignments</p>
                </div>
              </div>
            </div>

            <div>
              <DashboardMockup activeModule="Team Workspace" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== BUILT-IN SUPERPOWERS GRID ===== */}
      <section style={{ background: '#f8fdf9', padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--green-dark)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>BUILT-IN SUPERPOWERS</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, color: '#0f172a', margin: '10px 0 12px' }}>
              Powerful Features Across Every Module
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b' }}>
              Beyond individual modules, VasifyTech Suite includes powerful cross-cutting capabilities that enhance your entire business.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--green-tint)', color: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <BarChart3 size={24} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>75+ Dashboard Widgets</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b' }}>Customize your dashboard with drag-and-drop widgets for any metric</p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Code size={24} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>REST API</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b' }}>Full API access to integrate with your existing tools and workflows</p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Bot size={24} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>AI-Powered Templates</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b' }}>Smart templates for invoices, contracts, emails, and more</p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#faf5ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Key size={24} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Advanced Permissions</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b' }}>Role-based access control for every feature and data point</p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Sliders size={24} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Custom Fields</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b' }}>Add unlimited custom fields to any module for your unique needs</p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--green-tint)', color: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Palette size={24} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>White Label</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b' }}>Your branding, your domain, your colors — fully customizable</p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fdf2f8', color: '#be185d', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Languages size={24} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Multi-Language</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b' }}>20+ languages supported for global teams</p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Smartphone size={24} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Mobile Apps</h3>
              <p style={{ fontSize: '13.5px', color: '#64748b' }}>iOS and Android apps for managing on the go</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section style={{
        background: 'linear-gradient(135deg, var(--green) 0%, var(--green-dark) 100%)',
        padding: '72px 0',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <div className="wrap-content" style={{ maxWidth: '1080px' }}>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            Ready to Replace 5 Tools With 1?
          </h2>
          <p style={{ fontSize: '18px', color: '#dcf3e2', marginBottom: '32px' }}>
            Join 4,500+ businesses saving time and money with VasifyTech Suite. Start your free trial today — no credit card required.
          </p>
          <button onClick={() => router.push('/signup')} className="btn btn-lg" style={{ background: '#ffffff', color: 'var(--green-dark)', fontWeight: 800, borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
            Start Free Trial
          </button>
          <p style={{ fontSize: '13px', color: '#dcf3e2', marginTop: '14px' }}>
            7-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
