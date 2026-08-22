'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LandingHeader } from '@/components/layout/LandingHeader';
import { LandingFooter } from '@/components/layout/LandingFooter';
import { 
  ArrowRight, Sparkles, ChevronRight, Users, UserCheck, Briefcase, DollarSign, 
  MessageSquare, BarChart3, CheckCircle2, ShieldCheck, Lock, Globe, Server, Play, 
  Check, X as XIcon, HelpCircle, Layers, Clock, Calendar, AlertCircle
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [videoOpen, setVideoOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const replacedTools = [
    {
      category: "HR & People",
      color: "#2563eb",
      tools: [
        { name: "BambooHR", bg: "#7ab800", iconText: "b" },
        { name: "Gusto", bg: "#e11d48", iconText: "g" },
        { name: "Rippling", bg: "#f43f5e", iconText: "R" },
        { name: "Deel", bg: "#2563eb", iconText: "d." },
        { name: "Zenefits", bg: "#7c3aed", iconText: "z" },
        { name: "Personio", bg: "#059669", iconText: "P" }
      ]
    },
    {
      category: "CRM & Sales",
      color: "#16a34a",
      tools: [
        { name: "HubSpot", bg: "#ff7a59", iconText: "H" },
        { name: "Salesforce", bg: "#00a1e0", iconText: "SF" },
        { name: "Pipedrive", bg: "#28a745", iconText: "P" },
        { name: "Freshsales", bg: "#00c9a7", iconText: "F" },
        { name: "Zoho CRM", bg: "#e53935", iconText: "Z" },
        { name: "Close", bg: "#17a2b8", iconText: "C" }
      ]
    },
    {
      category: "Projects",
      color: "#d97706",
      tools: [
        { name: "Monday", bg: "#ff3d57", iconText: "M" },
        { name: "Asana", bg: "#f06a6a", iconText: "A" },
        { name: "ClickUp", bg: "#7b68ee", iconText: "CU" },
        { name: "Trello", bg: "#0079bf", iconText: "T" },
        { name: "Jira", bg: "#0052cc", iconText: "J" },
        { name: "Wrike", bg: "#08753f", iconText: "W" }
      ]
    },
    {
      category: "Finance",
      color: "#ca8a04",
      tools: [
        { name: "QuickBooks", bg: "#2ca01c", iconText: "qb" },
        { name: "FreshBooks", bg: "#0075dd", iconText: "F" },
        { name: "Xero", bg: "#13b5ea", iconText: "xero" },
        { name: "Wave", bg: "#1c69d4", iconText: "W" },
        { name: "Zoho Books", bg: "#e53935", iconText: "ZB" },
        { name: "Sage", bg: "#00d632", iconText: "S" }
      ]
    },
    {
      category: "Workspace",
      color: "#9333ea",
      tools: [
        { name: "Slack", bg: "#4a154b", iconText: "#" },
        { name: "Teams", bg: "#5059c9", iconText: "T" },
        { name: "Notion", bg: "#111827", iconText: "N" },
        { name: "Confluence", bg: "#0052cc", iconText: "C" },
        { name: "Basecamp", bg: "#f8ca00", iconText: "B" },
        { name: "Zoom", bg: "#2d8cff", iconText: "zm" }
      ]
    }
  ];

  const superpowers = [
    "75+ Dashboard Widgets", "REST API Integration", "AI-Powered Templates", "200+ Permissions",
    "Slack & Telegram Sync", "Excel Import/Export", "15+ Languages", "Multi-Level Approvals",
    "Google Calendar Sync", "Mobile App (PWA)", "Custom Fields Engine", "White-Label Branding"
  ];

  const companiesList = [
    "Apex Digital", "Greenfield Solutions", "Hudson & Partners", "Meridian Consulting",
    "Cascade Media Group", "Brightpath Analytics", "Summit HR Group", "Pinnacle Financial",
    "Redwood Staffing", "Lakeside Construction", "Apex Digital", "Greenfield Solutions",
    "Hudson & Partners", "Meridian Consulting", "Cascade Media Group", "Brightpath Analytics"
  ];

  const comparisonRows = [
    { name: "BambooHR", category: "HR & Payroll", monthly: "$130/mo", annual: "$1,560/yr" },
    { name: "Monday.com", category: "Project Management", monthly: "$190/mo", annual: "$2,280/yr" },
    { name: "QuickBooks Online", category: "Finance & Accounting", monthly: "$90/mo", annual: "$1,080/yr" },
    { name: "HubSpot CRM", category: "CRM & Sales Pipeline", monthly: "$180/mo", annual: "$2,160/yr" },
    { name: "Slack Pro", category: "Team Communication", monthly: "$87.50/mo", annual: "$1,050/yr" }
  ];

  const screenshotTabs = [
    { id: 'dashboard', label: 'Main Dashboard', tag: 'Overview' },
    { id: 'sales-dash', label: 'Sales CRM', tag: 'Sales' },
    { id: 'projects-dash', label: 'Projects', tag: 'Projects' },
    { id: 'hr-dash', label: 'HR Suite', tag: 'HR' },
    { id: 'finance-dash', label: 'Finance', tag: 'Finance' },
    { id: 'workspace-dash', label: 'Workspace', tag: 'Workspace' },
    { id: 'employees', label: 'Directory', tag: 'People' },
    { id: 'attendance', label: 'Attendance', tag: 'Time' },
    { id: 'leaves', label: 'Leave', tag: 'Leave' },
    { id: 'projects-list', label: 'Project List', tag: 'Tasks' }
  ];

  const faqs = [
    {
      q: "How does the 7-day free trial work?",
      a: "Sign up and get full access to all 200+ features for 7 days. No credit card required. At the end of your trial, choose a plan to continue — or simply walk away, no charges."
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. Cancel anytime from your account settings — no penalties, no hidden fees. If you cancel, you keep access until the end of your billing period."
    },
    {
      q: "What's the difference between Starter and Professional?",
      a: "Both plans include all 5 modules and 200+ features. Starter supports up to 10 employees and 10 GB storage. Professional gives you unlimited employees and 50 GB storage with priority support."
    },
    {
      q: "What modules are included?",
      a: "All 5: HR & People, CRM & Sales, Projects & Tasks, Finance & Invoicing, and Team Workspace. That's 200+ features included in every plan with zero extra plugin costs."
    },
    {
      q: "Can I manage CRM and HR together in one workspace?",
      a: "Yes! Every module is natively connected. Closed CRM deals can automatically kick off onboarding projects, and staff assigned to projects link directly to HR payroll hours."
    },
    {
      q: "Can I export reports and financial data?",
      a: "Yes, all reports across CRM, HR, Projects, and Finance can be filtered by date range, exported directly to CSV or PDF, or accessed via REST API."
    },
    {
      q: "Is our company data secure?",
      a: "Absolutely. We enforce 256-bit SSL encryption in transit and at rest, daily automated backups, SOC2 compliant cloud infrastructure, and granular role-based permissions."
    }
  ];

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--body)' }}>
      <LandingHeader />

      {/* ===== HERO SECTION (WHITE & GREEN) ===== */}
      <section style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(29, 168, 81, 0.15), transparent)',
        padding: '56px 0 72px',
        position: 'relative',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '52px', alignItems: 'center' }}>
          <div>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--green-tint)',
              border: '1px solid var(--green-tint-2)',
              color: 'var(--green-dark)',
              fontSize: '12px',
              fontWeight: 700,
              padding: '5px 14px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '20px'
            }}>
              <Sparkles size={14} color="var(--green-dark)" /> STOP OVERPAYING FOR TOOLS
            </span>

            <h1 style={{
              fontSize: 'clamp(38px, 4.8vw, 60px)',
              lineHeight: 1.08,
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              5 Tools. 1 Platform.<br />
              One <span style={{
                background: 'linear-gradient(135deg, var(--green-dark) 0%, var(--green) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Subscription.</span>
            </h1>

            {/* Colored Module Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
              <span style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '20px' }}>HR & Payroll</span>
              <span style={{ background: 'var(--green-tint)', color: 'var(--green-dark)', border: '1px solid var(--green-tint-2)', fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '20px' }}>CRM & Sales</span>
              <span style={{ background: '#fffbeb', color: '#b45309', border: '1px solid #fef3c7', fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '20px' }}>Projects</span>
              <span style={{ background: '#faf5ff', color: '#6b21a8', border: '1px solid #e9d5ff', fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '20px' }}>Finance</span>
              <span style={{ background: '#fdf2f8', color: '#be185d', border: '1px solid #fbcfe8', fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '20px' }}>Team Workspace</span>
            </div>

            <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.6, maxWidth: '520px', marginBottom: '26px' }}>
              Replace your scattered subscriptions with one platform. HR, CRM, projects, finance, and payroll — all in one place. Starting at <strong style={{ color: '#0f172a' }}>$39/mo</strong>. No setup fees. Cancel anytime.
            </p>

            {/* Price Anchor Strip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
              <span style={{ fontSize: '24px', textDecoration: 'line-through', color: '#94a3b8', fontWeight: 600 }}>$677/mo</span>
              <ArrowRight size={18} color="#94a3b8" />
              <span style={{ fontSize: '42px', fontWeight: 800, color: 'var(--green)', lineHeight: 1 }}>$39</span>
              <span style={{ color: '#64748b', fontSize: '15px' }}>/mo</span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <button onClick={() => router.push('/app/crm')} className="btn btn-brass btn-lg vt-pulse-cta" style={{ borderRadius: '12px', fontSize: '16px', fontWeight: 700 }}>
                Start Free Trial <ArrowRight size={18} />
              </button>
              <Link href="/features" className="btn btn-secondary btn-lg" style={{ borderRadius: '12px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Explore 200+ Features →
              </Link>
            </div>

            {/* Social Proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#64748b', marginBottom: '28px' }}>
              <div style={{ display: 'flex' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--green-dark)', border: '2px solid #ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 700 }}>A</span>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#2563eb', border: '2px solid #ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 700, marginLeft: '-8px' }}>S</span>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#d97706', border: '2px solid #ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 700, marginLeft: '-8px' }}>J</span>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#7c3aed', border: '2px solid #ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 700, marginLeft: '-8px' }}>F</span>
              </div>
              <span>Trusted by <strong style={{ color: '#0f172a' }}>4,500+</strong> growing businesses across <strong style={{ color: '#0f172a' }}>8 industries</strong> • 30-day money-back guarantee</span>
            </div>

            {/* 4 Security Badges Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', maxWidth: '480px' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155' }}>
                <Lock size={15} color="var(--green)" /> 256-bit Encryption
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155' }}>
                <ShieldCheck size={15} color="var(--green)" /> 99.9% Uptime
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155' }}>
                <Globe size={15} color="var(--green)" /> 24/7 Support
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155' }}>
                <CheckCircle2 size={15} color="var(--green)" /> 7-Day Free Trial
              </div>
            </div>
          </div>

          {/* Right: Dashboard Interactive Live Laptop Frame */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: '#ffffff',
              border: '2px solid var(--green-tint-2)',
              borderRadius: '16px',
              boxShadow: '0 25px 60px -15px rgba(29, 168, 81, 0.15)',
              overflow: 'hidden'
            }}>
              {/* Top Browser Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></span>
                </div>
                <div style={{ flex: 1, fontSize: '12px', color: '#64748b', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '4px 12px', textAlign: 'center' }}>
                  app.vasifytechsuite.com/live-workspace
                </div>
                <button onClick={() => setVideoOpen(true)} style={{ background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', color: 'var(--green-dark)', borderRadius: '6px', padding: '3px 8px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <Play size={10} /> Watch Demo
                </button>
              </div>

              {/* Live Workspace Preview Content */}
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Monthly Revenue</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>$84,320</div>
                    <div style={{ fontSize: '11px', color: 'var(--green-dark)', fontWeight: 600 }}>↑ 14.2% this mo</div>
                  </div>
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Active Employees</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>48 staff</div>
                    <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>100% clocked in</div>
                  </div>
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Projects On Track</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>18 active</div>
                    <div style={{ fontSize: '11px', color: 'var(--green-dark)', fontWeight: 600 }}>88% completed</div>
                  </div>
                </div>

                {/* Simulated Chart & Activity */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '12px', color: '#64748b' }}>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>VasifyTech Unified Suite Pulse</span>
                    <span>Live Auto-Sync</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '110px' }}>
                    <div style={{ flex: 1, background: 'linear-gradient(to top, var(--green-tint-2), var(--green))', borderRadius: '4px 4px 0 0', height: '45%' }}></div>
                    <div style={{ flex: 1, background: 'linear-gradient(to top, var(--green-tint-2), var(--green))', borderRadius: '4px 4px 0 0', height: '62%' }}></div>
                    <div style={{ flex: 1, background: 'linear-gradient(to top, var(--green-tint-2), var(--green))', borderRadius: '4px 4px 0 0', height: '55%' }}></div>
                    <div style={{ flex: 1, background: 'linear-gradient(to top, var(--green-tint-2), var(--green))', borderRadius: '4px 4px 0 0', height: '78%' }}></div>
                    <div style={{ flex: 1, background: 'linear-gradient(to top, var(--green-tint-2), var(--green-2))', borderRadius: '4px 4px 0 0', height: '90%' }}></div>
                    <div style={{ flex: 1, background: 'linear-gradient(to top, var(--green), var(--green-dark))', borderRadius: '4px 4px 0 0', height: '100%' }}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1, background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', borderRadius: '8px', padding: '10px', fontSize: '12px', color: 'var(--green-dark)', fontWeight: 600 }}>
                    ✓ Invoice #1042 Paid ($14,200)
                  </div>
                  <div style={{ flex: 1, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '10px', fontSize: '12px', color: '#1e40af', fontWeight: 600 }}>
                    ✓ 48 Employees Payroll Auto-Approved
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOGO MARQUEE STRIP ===== */}
      <section style={{ background: '#f8fafc', padding: '24px 0', overflow: 'hidden', borderBottom: '1px solid #e2e8f0' }}>
        <p style={{ textAlign: 'center', fontSize: '12.5px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px', fontWeight: 700 }}>
          TRUSTED BY GROWING BUSINESSES ACROSS THE NATION
        </p>
        <div style={{ overflow: 'hidden' }}>
          <div className="vt-marquee-track">
            {companiesList.map((comp, idx) => (
              <React.Fragment key={idx}>
                <span style={{ fontSize: '14.5px', fontWeight: 700, color: '#334155', whiteSpace: 'nowrap' }}>{comp}</span>
                <span style={{ color: '#cbd5e1' }}>|</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEE IT IN ACTION SECTION ===== */}
      <section id="see-it" style={{ background: '#0b1329', padding: '88px 0', color: '#ffffff', borderBottom: '1px solid #1e293b' }}>
        <div className="wrap" style={{ maxWidth: '1240px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
              See VasifyTech Suite in Action
            </h2>
            <p style={{ fontSize: '16.5px', color: '#94a3b8' }}>
              Real screenshots from a live workspace — click any tab to preview
            </p>
          </div>

          {/* Interactive Preview Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginBottom: '44px' }}>
            {[
              { id: 'dashboard', label: 'Dashboard', bg: '#6366f1' },
              { id: 'sales', label: 'Sales', bg: '#059669' },
              { id: 'projects', label: 'Projects', bg: '#7c3aed' },
              { id: 'hr', label: 'HR', bg: '#e11d48' },
              { id: 'finance', label: 'Finance', bg: '#d97706' },
              { id: 'workspace', label: 'Workspace', bg: '#2563eb' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '9px 20px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  border: 'none',
                  background: activeTab === tab.id ? tab.bg : 'rgba(30, 41, 59, 0.8)',
                  color: activeTab === tab.id ? '#ffffff' : '#cbd5e1',
                  cursor: 'pointer',
                  boxShadow: activeTab === tab.id ? `0 6px 18px ${tab.bg}66` : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}

            <span style={{ color: 'rgba(255, 255, 255, 0.2)', padding: '0 4px', fontSize: '18px' }}>|</span>

            {[
              { id: 'employees', label: 'Employees' },
              { id: 'attendance', label: 'Attendance' },
              { id: 'leave', label: 'Leave' },
              { id: 'project-list', label: 'Project List' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  border: activeTab === tab.id ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: activeTab === tab.id ? '#6366f1' : 'rgba(30, 41, 59, 0.5)',
                  color: activeTab === tab.id ? '#ffffff' : '#94a3b8',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Content Display Box */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'center' }}>
            {/* Left Column: Module Description */}
            <div>
              <div style={{
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#818cf8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '10px'
              }}>
                {activeTab === 'dashboard' && 'MAIN DASHBOARD'}
                {activeTab === 'sales' && 'CRM & SALES PIPELINE'}
                {activeTab === 'projects' && 'PROJECT MANAGEMENT'}
                {activeTab === 'hr' && 'HR & PAYROLL'}
                {activeTab === 'finance' && 'FINANCE & INVOICING'}
                {activeTab === 'workspace' && 'TEAM WORKSPACE'}
                {activeTab === 'employees' && 'EMPLOYEE DIRECTORY'}
                {activeTab === 'attendance' && 'ATTENDANCE MONITOR'}
                {activeTab === 'leave' && 'LEAVE MANAGEMENT'}
                {activeTab === 'project-list' && 'PROJECT LIST VIEW'}
              </div>

              <h3 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 800, color: '#ffffff', marginBottom: '20px', lineHeight: 1.25 }}>
                {activeTab === 'dashboard' && 'Your Entire Business at a Glance'}
                {activeTab === 'sales' && 'Close Deals Faster with Automated Pipelines'}
                {activeTab === 'projects' && 'Track Tasks, Gantt Charts & Time Logs'}
                {activeTab === 'hr' && 'Automate Payroll, Attendance & ATS Hiring'}
                {activeTab === 'finance' && 'Invoices, Expenses & Profit Reports'}
                {activeTab === 'workspace' && 'Unified Communication & Help Desk'}
                {activeTab === 'employees' && 'Centralized Staff Directory & Org Chart'}
                {activeTab === 'attendance' && 'Real-Time Clock-in Logs & Geofencing'}
                {activeTab === 'leave' && 'Time Off Requests & Vacation Balances'}
                {activeTab === 'project-list' && 'Spreadsheet-Style Multi-Project View'}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15.5px', color: '#cbd5e1' }}>
                  <CheckCircle2 size={20} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>
                    {activeTab === 'dashboard' && '12 KPIs across all modules in Company Pulse'}
                    {activeTab === 'sales' && 'Visual Kanban drag-and-drop lead stages'}
                    {activeTab === 'projects' && 'Kanban, List, and Timeline Gantt views'}
                    {activeTab === 'hr' && 'One-click multi-country payroll processing'}
                    {activeTab === 'finance' && 'Recurring invoice automation with credit notes'}
                    {activeTab === 'workspace' && 'Team chat channels with direct file attachments'}
                    {activeTab === 'employees' && 'Complete employee profile records with document vault'}
                    {activeTab === 'attendance' && 'Live geolocation map view for field staff'}
                    {activeTab === 'leave' && 'Automated leave accrual calculation engine'}
                    {activeTab === 'project-list' && 'High-density table list view with inline editing'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15.5px', color: '#cbd5e1' }}>
                  <CheckCircle2 size={20} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>
                    {activeTab === 'dashboard' && 'Quick clock-in with live hours and weekly dots'}
                    {activeTab === 'sales' && 'Instant estimate generator with live e-signatures'}
                    {activeTab === 'projects' && 'Built-in time tracker linked to client invoices'}
                    {activeTab === 'hr' && 'GPS geofenced mobile time clocking'}
                    {activeTab === 'finance' && 'QuickBooks & Xero real-time sync status'}
                    {activeTab === 'workspace' && 'Customer support ticket inbox with SLAs'}
                    {activeTab === 'employees' && 'Interactive organizational hierarchy chart'}
                    {activeTab === 'attendance' && 'Biometric & mobile kiosk integration'}
                    {activeTab === 'leave' && 'One-click manager approval workflows'}
                    {activeTab === 'project-list' && 'Filter by status, priority, owner, or budget'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15.5px', color: '#cbd5e1' }}>
                  <CheckCircle2 size={20} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>
                    {activeTab === 'dashboard' && '5 module strips with mini charts and drill-down'}
                    {activeTab === 'sales' && 'Automated lead follow-up drip sequences'}
                    {activeTab === 'projects' && 'Resource allocation & team workload balancing'}
                    {activeTab === 'hr' && 'Complete recruitment pipeline with applicant scoring'}
                    {activeTab === 'finance' && 'Expense tracking with OCR receipt scanner'}
                    {activeTab === 'workspace' && 'Integrated calendar sync with Google & Apple'}
                    {activeTab === 'employees' && 'Role-based permission control across all modules'}
                    {activeTab === 'attendance' && 'Automated overtime calculation for payroll'}
                    {activeTab === 'leave' && 'Shared company holiday & absence calendar'}
                    {activeTab === 'project-list' && 'Bulk status updates and Excel/CSV export'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Mockup Card */}
            <div style={{
              background: '#0f172a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
              {/* Browser Window Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 18px', background: '#1e293b', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></span>
                <div style={{ flex: 1, fontSize: '12px', color: '#94a3b8', background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '4px 12px', margin: '0 12px', textAlign: 'center' }}>
                  app.vasifytechsuite.com/{activeTab}
                </div>
              </div>

              {/* Workspace Inner View */}
              <div style={{ padding: '24px', background: '#0f172a', color: '#ffffff' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8', marginBottom: '4px' }}>Total Revenue</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#34d399' }}>
                      {activeTab === 'sales' ? '$428,450' : activeTab === 'finance' ? '$215,420' : '$687,430'}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8', marginBottom: '4px' }}>Active Employees</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#38bdf8' }}>62 staff</div>
                  </div>
                  <div style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8', marginBottom: '4px' }}>Team Health</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#a78bfa' }}>78% Good</div>
                  </div>
                </div>

                {/* Live Module Card Preview Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>Modules Connected</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>CRM · HR · Projects · Finance · Workspace</div>
                  </div>
                  <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#34d399', marginBottom: '6px' }}>✓ Live Sync Active</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Real-time database auto-update</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ONE PLATFORM REPLACES THEM ALL (WHITE & GREEN) ===== */}
      <section style={{ background: '#ffffff', padding: '80px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap" style={{ maxWidth: '980px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
              One Platform Replaces Them All
            </h2>
            <p style={{ fontSize: '17px', color: '#64748b' }}>
              Cancel the subscriptions. Keep the features.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {replacedTools.map((item, idx) => (
              <div key={idx} style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '150px', flexShrink: 0 }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }}></span>
                  <span style={{ fontWeight: 700, fontSize: '14.5px', color: item.color }}>{item.category}</span>
                </div>

                <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', position: 'relative', padding: '4px 0' }}>
                  {/* Red Horizontal Strikethrough Line */}
                  <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1.5px', background: 'rgba(239, 68, 68, 0.4)', pointerEvents: 'none', transform: 'translateY(-50%)' }}></div>

                  {item.tools.map((t, tIdx) => (
                    <div key={tIdx} style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '5px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      position: 'relative',
                      zIndex: 2,
                      boxShadow: '0 2px 5px rgba(0,0,0,0.04)'
                    }}>
                      <span style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '5px',
                        background: t.bg,
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                      }}>
                        {t.iconText}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                        {t.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <p style={{ fontSize: '18px', color: '#334155', marginBottom: '6px' }}>
              <strong style={{ color: '#0f172a' }}>5 subscriptions</strong> → <strong style={{ color: 'var(--green-dark)' }}>1 platform</strong> → <strong style={{ color: '#0f172a' }}>from $39/mo</strong>
            </p>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
              Why pay for 5 subscriptions when VasifyTech Suite covers it all?
            </p>
            <a href="#pricing" className="btn btn-brass" style={{ borderRadius: '20px' }}>
              See Plans & Savings →
            </a>
          </div>
        </div>
      </section>

      {/* ===== 5 POWERFUL MODULES SHOWCASE ===== */}
      <section id="features" style={{ background: '#f8fdf9', padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 52px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
              5 Powerful Modules. 200+ Features.
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--green-dark)', fontWeight: 700 }}>
              Everything Your Business Needs — In One Unified Platform
            </p>
          </div>

          {/* Module Grid Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', maxWidth: '1100px', margin: '0 auto 36px' }}>
            {/* CRM Module */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Users size={28} color="#2563eb" />
                <div>
                  <h3 style={{ fontSize: '18px', color: '#0f172a', fontWeight: 700 }}>CRM & Sales</h3>
                  <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600 }}>20+ features</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13.5px', color: '#334155' }}>
                <div>✓ Lead pipeline</div>
                <div>✓ Deal stage tracking</div>
                <div>✓ Proposals & estimates</div>
                <div>✓ Client profile accounts</div>
                <div>✓ Pricing catalog</div>
                <div>✓ Revenue forecasting</div>
              </div>
            </div>

            {/* HR & Payroll Module */}
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--green-tint-2)',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <UserCheck size={28} color="var(--green)" />
                <div>
                  <h3 style={{ fontSize: '18px', color: '#0f172a', fontWeight: 700 }}>HR & Payroll</h3>
                  <span style={{ fontSize: '12px', color: 'var(--green-dark)', fontWeight: 600 }}>70+ features</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13.5px', color: '#334155' }}>
                <div>✓ Employee directory</div>
                <div>✓ Automated payslips</div>
                <div>✓ GPS attendance check</div>
                <div>✓ Leave approvals</div>
                <div>✓ ATS recruitment</div>
                <div>✓ Performance reviews</div>
              </div>
            </div>

            {/* Project Management Module */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Briefcase size={28} color="#d97706" />
                <div>
                  <h3 style={{ fontSize: '18px', color: '#0f172a', fontWeight: 700 }}>Project Management</h3>
                  <span style={{ fontSize: '12px', color: '#d97706', fontWeight: 600 }}>35+ features</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13.5px', color: '#334155' }}>
                <div>✓ Kanban task boards</div>
                <div>✓ Visual Gantt chart</div>
                <div>✓ Logged timesheets</div>
                <div>✓ SOW contracts vault</div>
                <div>✓ Team wikis</div>
                <div>✓ Client status portal</div>
              </div>
            </div>

            {/* Finance & Invoicing Module */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <DollarSign size={28} color="#ca8a04" />
                <div>
                  <h3 style={{ fontSize: '18px', color: '#0f172a', fontWeight: 700 }}>Finance & Invoicing</h3>
                  <span style={{ fontSize: '12px', color: '#ca8a04', fontWeight: 600 }}>35+ features</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13.5px', color: '#334155' }}>
                <div>✓ Tax invoice builder</div>
                <div>✓ Expense log & claims</div>
                <div>✓ 30+ Gateways sim</div>
                <div>✓ Purchase orders (PO)</div>
                <div>✓ General ledger</div>
                <div>✓ Tax-ready statements</div>
              </div>
            </div>

            {/* Team Workspace Module */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <MessageSquare size={28} color="#9333ea" />
                <div>
                  <h3 style={{ fontSize: '18px', color: '#0f172a', fontWeight: 700 }}>Team Workspace</h3>
                  <span style={{ fontSize: '12px', color: '#9333ea', fontWeight: 600 }}>30+ features</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13.5px', color: '#334155' }}>
                <div>✓ Team channel chat</div>
                <div>✓ Help desk tickets</div>
                <div>✓ Shared team calendar</div>
                <div>✓ Zoom & Video links</div>
                <div>✓ Notice announcements</div>
                <div>✓ Asset inventory</div>
              </div>
            </div>
          </div>

          {/* Built-in Superpowers Strip */}
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
              Built-In Superpowers Across Every Module
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
              {superpowers.map((sp, idx) => (
                <span key={idx} style={{
                  background: 'var(--green-tint)',
                  border: '1px solid var(--green-tint-2)',
                  color: 'var(--green-dark)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  padding: '6px 14px',
                  borderRadius: '20px'
                }}>
                  {sp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOLUTION BANNER ===== */}
      <section style={{
        background: 'linear-gradient(135deg, var(--green) 0%, var(--green-dark) 100%)',
        padding: '50px 0',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
            One Login. Five Modules. Starting at $39/mo.
          </h2>
          <p style={{ fontSize: '17px', color: '#dcf3e2', marginBottom: '24px' }}>
            HR, CRM, Projects, Finance, Team Workspace — everything your business needs in one platform. 7-day free trial. No credit card required.
          </p>
          <button onClick={() => router.push('/app/crm')} className="btn btn-lg" style={{ background: '#ffffff', color: 'var(--green-dark)', fontWeight: 800, borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
            Start Free Trial →
          </button>
        </div>
      </section>

      {/* ===== INTERACTIVE SCREENSHOTS WALKTHROUGH ===== */}
      <section id="screenshots" style={{ background: '#ffffff', padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
              See VasifyTech Suite in Action
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b' }}>
              Real live previews from our workspace — click any tab below to inspect
            </p>
          </div>

          {/* Screenshot Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '14px', marginBottom: '32px', justifyContent: 'center' }}>
            {screenshotTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeTab === tab.id ? '1px solid var(--green)' : '1px solid #e2e8f0',
                  background: activeTab === tab.id ? 'var(--green)' : '#f8fafc',
                  color: activeTab === tab.id ? '#ffffff' : '#475569',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Dynamic Workspace Panel */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '1100px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--green-dark)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {screenshotTabs.find(t => t.id === activeTab)?.tag} MODULE VIEW
                </span>
                <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: '8px 0 16px' }}>
                  {activeTab === 'dashboard' && 'Your Entire Business at a Glance'}
                  {activeTab === 'sales-dash' && 'CRM, Deals & Revenue Pipeline'}
                  {activeTab === 'projects-dash' && 'Every Project, Task & Milestone'}
                  {activeTab === 'hr-dash' && 'People, Attendance & Automated Payroll'}
                  {activeTab === 'finance-dash' && 'Revenue, Expenses & Tax Invoicing'}
                  {activeTab === 'workspace-dash' && 'Support Tickets & Team Channels'}
                  {activeTab === 'employees' && '48 Employees in One Clean Directory'}
                  {activeTab === 'attendance' && "GPS Clock-In, Attendance & Absences"}
                  {activeTab === 'leaves' && 'Leave Requests, Approvals & Balances'}
                  {activeTab === 'projects-list' && 'Gantt Timelines & Task Tracking'}
                </h3>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0, marginBottom: '24px', fontSize: '14.5px', color: '#334155' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={18} color="var(--green)" /> Real-time status update feeds & key metrics
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={18} color="var(--green)" /> One-click drill down into lead, staff, or invoice records
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={18} color="var(--green)" /> Export views to CSV, PDF, or sync with REST API
                  </li>
                </ul>

                <button onClick={() => router.push('/app/crm')} className="btn btn-brass" style={{ borderRadius: '10px' }}>
                  Launch {screenshotTabs.find(t => t.id === activeTab)?.label} Demo →
                </button>
              </div>

              {/* Mock Screen Representation */}
              <div style={{
                background: '#f8fdf9',
                border: '1px solid var(--green-tint-2)',
                borderRadius: '12px',
                padding: '20px',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '14px' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>VasifyTech Dashboard / {activeTab}</span>
                  <span style={{ fontSize: '11px', background: 'var(--green-tint)', color: 'var(--green-dark)', padding: '3px 8px', borderRadius: '12px', fontWeight: 600 }}>Live Data</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px', fontSize: '12px' }}>
                    <div style={{ color: '#64748b' }}>Module Activity</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--green)', marginTop: '4px' }}>99.8% Sync Rate</div>
                  </div>
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px', fontSize: '12px' }}>
                    <div style={{ color: '#64748b' }}>Active Users</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>42 Online Now</div>
                  </div>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#334155' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span>Pipeline Progress</span>
                    <span style={{ color: 'var(--green-dark)', fontWeight: 700 }}>$142,500 total</span>
                  </div>
                  <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '78%', height: '100%', background: 'linear-gradient(90deg, var(--green), var(--green-dark))' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REAL COST COMPARISON ===== */}
      <section id="compare" style={{ background: '#f8fafc', padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap" style={{ maxWidth: '940px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--green-dark)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>THE NUMBERS DON'T LIE</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, color: '#0f172a', margin: '10px 0 8px' }}>
              The Real Cost of Running Your Business
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b' }}>
              See what you're really paying for 5 separate tools — and what you save with VasifyTech Suite
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', marginBottom: '32px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '14px 20px' }}>Software</th>
                    <th style={{ padding: '14px 20px' }}>Category</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right' }}>Monthly (25 users)</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right' }}>Annual Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 700, color: '#0f172a' }}>{row.name}</td>
                      <td style={{ padding: '14px 20px', color: '#64748b' }}>{row.category}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'right', color: '#dc2626', fontWeight: 600 }}>{row.monthly}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'right', color: '#dc2626', fontWeight: 600 }}>{row.annual}</td>
                    </tr>
                  ))}
                  <tr style={{ background: '#f8fafc', fontWeight: 800, fontSize: '15px' }}>
                    <td style={{ padding: '16px 20px', color: '#0f172a' }} colSpan={2}>Total 5 Separate Subscriptions</td>
                    <td style={{ padding: '16px 20px', textAlign: 'right', color: '#dc2626' }}>$677.50/mo</td>
                    <td style={{ padding: '16px 20px', textAlign: 'right', color: '#dc2626' }}>$8,130/yr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '20px', color: '#334155', marginBottom: '16px' }}>
              Or get all 5 modules in VasifyTech Suite for <strong style={{ color: 'var(--green)', fontSize: '26px' }}>$39/mo</strong>. Cancel anytime.
            </p>
            <button onClick={() => router.push('/app/crm')} className="btn btn-brass btn-lg vt-pulse-cta" style={{ borderRadius: '12px' }}>
              Start Free Trial →
            </button>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS (3 MINUTES) ===== */}
      <section style={{ background: '#ffffff', padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap">
          <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: '56px' }}>
            Set Up in 3 Minutes. Seriously.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px', maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px 24px' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: 'var(--green)', color: '#ffffff', fontSize: '22px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>1</div>
              <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Start Free Trial</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>Sign up in seconds. No credit card required. Full access to all 200+ features.</p>
            </div>

            <div style={{ textAlign: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px 24px' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: 'var(--green)', color: '#ffffff', fontSize: '22px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>2</div>
              <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Set Up Your Company</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>Import employees, clients, proposals, and active projects in minutes.</p>
            </div>

            <div style={{ textAlign: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px 24px' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: 'var(--green)', color: '#ffffff', fontSize: '22px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>3</div>
              <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Run Your Business</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>HR, sales, projects, invoicing — all handled from one unified place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ROADMAP STRIP ===== */}
      <section id="roadmap" style={{ background: '#f8fdf9', padding: '80px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap" style={{ maxWidth: '720px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--green-dark)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>BUILT IN PUBLIC</span>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 38px)', fontWeight: 800, color: '#0f172a', margin: '10px 0 12px' }}>
            Product Road Map
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '40px' }}>
            Track our features development and suggest new ideas in real time.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', marginBottom: '32px', padding: '0 20px' }}>
            <div style={{ position: 'absolute', top: '20px', left: '10%', right: '10%', height: '3px', background: '#e2e8f0' }}></div>
            <div style={{ position: 'absolute', top: '20px', left: '10%', width: '60%', height: '3px', background: 'linear-gradient(90deg, var(--green-tint-2), var(--green))' }}></div>

            <div style={{ zIndex: 2, textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', color: '#fff', fontWeight: 700 }}>✓</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--green-dark)', marginTop: '8px' }}>2024</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Foundation</div>
            </div>

            <div style={{ zIndex: 2, textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', color: '#fff', fontWeight: 700 }}>✓</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--green-dark)', marginTop: '8px' }}>2025</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>80+ Features</div>
            </div>

            <div style={{ zIndex: 2, textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', color: '#ffffff', fontWeight: 800, fontSize: '10px' }}>NOW</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--green-dark)', marginTop: '8px' }}>2026</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>200+ Features</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" style={{ background: '#ffffff', padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b' }}>
              Same 200+ features. Same 5 modules. 7-day free trial on every plan.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 16px', borderRadius: '30px', marginTop: '20px' }}>
              <span style={{ fontSize: '14px', color: !isAnnual ? '#0f172a' : '#64748b', fontWeight: !isAnnual ? 700 : 400 }}>Monthly</span>
              <button onClick={() => setIsAnnual(!isAnnual)} style={{ width: '44px', height: '24px', borderRadius: '20px', background: 'var(--green)', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: isAnnual ? 'flex-end' : 'flex-start' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ffffff' }}></span>
              </button>
              <span style={{ fontSize: '14px', color: isAnnual ? 'var(--green-dark)' : '#64748b', fontWeight: isAnnual ? 700 : 400 }}>
                Annual (Save 20%)
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '900px', margin: '0 auto' }}>
            {/* Starter Plan */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '36px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>Starter</h3>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>For small teams getting started</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '24px' }}>
                <span style={{ fontSize: '48px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{isAnnual ? '$39' : '$49'}</span>
                <span style={{ color: '#64748b', fontSize: '15px' }}>/month</span>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0, marginBottom: '32px', fontSize: '14px', color: '#334155' }}>
                <li>✓ <strong style={{ color: '#0f172a' }}>10 GB</strong> storage</li>
                <li>✓ Up to <strong style={{ color: '#0f172a' }}>10 employees</strong></li>
                <li>✓ All 5 modules (CRM, HR, Projects, Finance, Workspace)</li>
                <li>✓ 200+ features included</li>
                <li>✓ Client portal</li>
                <li>✓ Email support</li>
                <li>✓ 7-day free trial</li>
              </ul>
              <button onClick={() => router.push('/signup')} className="btn btn-secondary" style={{ width: '100%', borderRadius: '12px', fontWeight: 700 }}>
                Start Free Trial
              </button>
            </div>

            {/* Professional Plan */}
            <div style={{ background: '#ffffff', border: '2px solid var(--green)', borderRadius: '20px', padding: '36px', position: 'relative', boxShadow: 'var(--shadow-lg)' }}>
              <span style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--green)', color: '#ffffff', fontSize: '11px', fontWeight: 800, padding: '4px 16px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                MOST POPULAR
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>Professional</h3>
              <p style={{ fontSize: '14px', color: 'var(--green-dark)', fontWeight: 600, marginBottom: '24px' }}>For growing businesses</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '24px' }}>
                <span style={{ fontSize: '48px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{isAnnual ? '$99' : '$119'}</span>
                <span style={{ color: '#64748b', fontSize: '15px' }}>/month</span>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0, marginBottom: '32px', fontSize: '14px', color: '#334155' }}>
                <li>✓ <strong style={{ color: '#0f172a' }}>50 GB</strong> storage</li>
                <li>✓ <strong style={{ color: '#0f172a' }}>Unlimited</strong> employees</li>
                <li>✓ All 5 modules (CRM, HR, Projects, Finance, Workspace)</li>
                <li>✓ 200+ features included</li>
                <li>✓ Client portal</li>
                <li>✓ Priority 24/7 support</li>
                <li>✓ 7-day free trial</li>
              </ul>
              <button onClick={() => router.push('/signup')} className="btn btn-brass vt-pulse-cta" style={{ width: '100%', borderRadius: '12px', fontWeight: 800 }}>
                Start Free Trial
              </button>
              <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--green-dark)', fontWeight: 600, marginTop: '12px' }}>30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 30-DAY MONEY BACK GUARANTEE ===== */}
      <section style={{ background: '#f8fafc', padding: '64px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <div style={{ background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', borderRadius: '20px', padding: '36px', marginBottom: '24px' }}>
            <ShieldCheck size={48} color="var(--green)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
              30-Day Money-Back Guarantee
            </h3>
            <p style={{ fontSize: '15px', color: '#475569', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
              Zero risk. Try every feature for 30 days — if VasifyTech Suite is not for you, get a full refund. No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" style={{ background: '#ffffff', padding: '88px 0' }}>
        <div className="wrap" style={{ maxWidth: '780px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: '44px' }}>
            Got Questions? We've Got Answers
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div onClick={() => toggleFaq(idx)} style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 700, fontSize: '16px', color: '#0f172a' }}>
                  <span>{faq.q}</span>
                  <span style={{ color: 'var(--green)', fontSize: '20px', fontWeight: 700 }}>{openFaq === idx ? '−' : '+'}</span>
                </div>
                {openFaq === idx && (
                  <div style={{ padding: '0 24px 20px', color: '#475569', fontSize: '14.5px', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Demo Modal */}
      {videoOpen && (
        <div className="vt-modal-overlay" onClick={() => setVideoOpen(false)}>
          <div className="vt-modal" style={{ background: '#ffffff', color: '#0f172a', border: '1px solid var(--green)', padding: '24px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', color: '#0f172a', fontWeight: 700 }}>VasifyTech Suite — Platform Walkthrough</h3>
              <button onClick={() => setVideoOpen(false)} style={{ background: 'none', border: 'none', color: '#0f172a', cursor: 'pointer' }}><XIcon size={20} /></button>
            </div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px' }}>
              <iframe style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '12px' }} src="https://www.youtube-nocookie.com/embed/1iQcLuvGU5o?autoplay=1" title="Demo Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      )}

      <LandingFooter />
    </div>
  );
}
