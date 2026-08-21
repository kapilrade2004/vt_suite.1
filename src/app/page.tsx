'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LandingHeader } from '@/components/layout/LandingHeader';
import { LandingFooter } from '@/components/layout/LandingFooter';
import { 
  ArrowRight, Sparkles, ChevronRight
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<number | null>(0);
  const [isAnnual, setIsAnnual] = useState(true);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({ 0: true });

  const modules = [
    {
      id: "01",
      name: "CRM & Sales",
      color: "var(--green)",
      desc: "Leads, pipeline, proposals, and client accounts in one unified view.",
      count: "20+ features",
      bullets: [
        "Lead capture, scoring & status pipeline",
        "Deal stage tracking & drag-and-drop Kanban",
        "Client profile history & activity timeline",
        "Automated proposals & interactive estimates",
        "Product & service pricing catalog",
        "Sales revenue forecasting & conversion reports"
      ]
    },
    {
      id: "02",
      name: "HR & Payroll",
      color: "var(--green-2)",
      desc: "Employee directory, attendance check-ins, leaves, and automated payroll.",
      count: "70+ features",
      bullets: [
        "Complete employee digital records & document vault",
        "Attendance tracking with GPS office check-in",
        "Applicant tracking system (ATS) & recruitment pipeline",
        "Automated monthly payroll runs & PDF payslip generation",
        "Leave balance tracker with multi-level approvals",
        "Employee performance review cycles"
      ]
    },
    {
      id: "03",
      name: "Project Management",
      color: "var(--green-dark)",
      desc: "Kanban boards, Gantt timelines, milestones, and real-time timesheets.",
      count: "35+ features",
      bullets: [
        "Interactive Kanban task boards & List views",
        "Visual Gantt chart timeline & dependency mapping",
        "Logged hours timesheet approval workflows",
        "Client contracts & SOW document repository",
        "Team project knowledge base & wikis",
        "Client portal status updates & milestone tracking"
      ]
    },
    {
      id: "04",
      name: "Finance & Invoicing",
      color: "var(--green-deep)",
      desc: "Recurring invoices, expense logging, purchase orders, and tax reports.",
      count: "35+ features",
      bullets: [
        "Professional tax invoice generator & printable PDF preview",
        "30+ integrated online payment gateway simulation",
        "Employee expense claim logging & receipt upload",
        "Vendor purchase order (PO) tracking",
        "Core accounting general ledger",
        "Tax-ready financial statements & profit/loss reports"
      ]
    },
    {
      id: "05",
      name: "Team Workspace",
      color: "var(--green)",
      desc: "Team channel chat, shared calendar events, and support desk inbox.",
      count: "30+ features",
      bullets: [
        "Team messaging channels & direct messages",
        "Shared company calendar for meetings & leave dates",
        "Company-wide official announcements feed",
        "Customer support ticket inbox with priority statuses",
        "Video meeting room quick links",
        "Company hardware & software asset inventory"
      ]
    }
  ];

  const faqs = [
    {
      q: "What is VasifyTech Suite?",
      a: "VasifyTech Suite is an all-in-one business management platform that unifies CRM & Sales, HR & Payroll, Project Management, Finance & Invoicing, and Team Workspace into a single subscription with one shared database."
    },
    {
      q: "Can I manage CRM and HR together in one workspace?",
      a: "Yes! Every module is natively connected. Closed CRM deals can automatically kick off onboarding projects, and staff assigned to projects link directly to HR payroll hours."
    },
    {
      q: "Can I create and send professional tax invoices?",
      a: "Absolutely. The Finance module features a full-featured invoice creator with line items, tax calculations, status tracking (Sent, Paid, Overdue), and clean printable PDF styling."
    },
    {
      q: "Can I manage projects and view Gantt charts?",
      a: "Yes, Project Management includes List, Kanban, and interactive Gantt timeline views, allowing you to track project progress, budgets, and team workloads effortlessly."
    },
    {
      q: "Can I manage employee attendance and approve leave requests?",
      a: "Yes. Employees can log attendance, request casual/sick leaves, and managers can approve or reject leave requests in real-time with automatic balance deduction."
    },
    {
      q: "Can I export reports and financial data?",
      a: "Yes, all reports across CRM, HR, Projects, and Finance can be filtered by date or department and exported directly."
    },
    {
      q: "Is the platform mobile responsive?",
      a: "Yes, VasifyTech Suite is engineered with a mobile-first responsive layout, featuring responsive drawers, scrollable tables, and touch-friendly controls."
    },
    {
      q: "Can the platform be customized for our company?",
      a: "Yes! You can configure white-label branding, custom domain settings, custom fields, and granular role-based permissions."
    }
  ];

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingHeader />

      {/* Hero Section */}
      <section style={{ padding: '88px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '56px', alignItems: 'center' }}>
          <div>
            <span className="eyebrow">
              <Sparkles size={14} color="var(--green-dark)" /> ALL-IN-ONE BUSINESS PLATFORM
            </span>
            <h1 style={{ fontSize: 'clamp(34px, 4.4vw, 54px)', lineHeight: 1.1, margin: '18px 0 20px' }}>
              One platform for your entire business. <em style={{ fontStyle: 'normal', color: 'var(--green)' }}>CRM, HR, Projects & Finance.</em>
            </h1>
            <p style={{ fontSize: '17px', color: 'var(--text-dim)', maxWidth: '480px', marginBottom: '30px' }}>
              Manage customers, employees, projects, invoices, and your entire operational workflow from one powerful workspace designed with clean green aesthetics.
            </p>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
              <button onClick={() => router.push('/app/crm')} className="btn btn-brass btn-lg">
                Start Free Trial <ArrowRight size={16} />
              </button>
              <a href="#modules" className="btn btn-ghost btn-lg">
                Explore Platform
              </a>
            </div>
            <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', paddingTop: '22px', borderTop: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '20px', color: 'var(--green-dark)', fontWeight: 700 }}>4,500+</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>Businesses onboard</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '20px', color: 'var(--green-dark)', fontWeight: 700 }}>200+</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>Built-in features</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '20px', color: 'var(--green-dark)', fontWeight: 700 }}>30-day</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>Money-back guarantee</div>
              </div>
            </div>
          </div>

          {/* Right Hero Dashboard Preview */}
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', background: 'var(--bg-soft)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--border)' }}></span>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--border)' }}></span>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--border)' }}></span>
              </div>
              <div style={{ flex: 1, fontSize: '12px', color: 'var(--text-dim)', background: '#fff', border: '1px solid var(--border)', borderRadius: '20px', padding: '6px 12px', textAlign: 'center' }}>
                app.vasifytechsuite.com/dashboard
              </div>
            </div>
            <div style={{ padding: '22px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '18px' }}>
                <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', marginBottom: '8px' }}>Revenue (MTD)</div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '17px', fontWeight: 700, color: 'var(--ink)' }}>$84,320</div>
                  <div style={{ fontSize: '11px', color: 'var(--green-dark)', fontWeight: 600, marginTop: '4px' }}>↑ 12.4%</div>
                </div>
                <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', marginBottom: '8px' }}>Open leads</div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '17px', fontWeight: 700, color: 'var(--ink)' }}>128</div>
                  <div style={{ fontSize: '11px', color: 'var(--green-dark)', fontWeight: 600, marginTop: '4px' }}>↑ 6</div>
                </div>
                <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', marginBottom: '8px' }}>Employees</div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '17px', fontWeight: 700, color: 'var(--ink)' }}>42</div>
                  <div style={{ fontSize: '11px', color: 'var(--green-dark)', fontWeight: 600, marginTop: '4px' }}>↑ 2</div>
                </div>
                <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', marginBottom: '8px' }}>Invoices due</div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '17px', fontWeight: 700, color: 'var(--ink)' }}>6</div>
                  <div style={{ fontSize: '11px', color: '#c0472f', fontWeight: 600, marginTop: '4px' }}>$14,200</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginBottom: '14px', fontWeight: 600 }}>Monthly Revenue Trend</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '100px' }}>
                    <div style={{ flex: 1, background: 'linear-gradient(to top, var(--green), var(--green-2))', borderRadius: '4px 4px 0 0', height: '38%' }}></div>
                    <div style={{ flex: 1, background: 'linear-gradient(to top, var(--green), var(--green-2))', borderRadius: '4px 4px 0 0', height: '52%' }}></div>
                    <div style={{ flex: 1, background: 'var(--border)', borderRadius: '4px 4px 0 0', height: '44%' }}></div>
                    <div style={{ flex: 1, background: 'linear-gradient(to top, var(--green), var(--green-2))', borderRadius: '4px 4px 0 0', height: '68%' }}></div>
                    <div style={{ flex: 1, background: 'linear-gradient(to top, var(--green), var(--green-2))', borderRadius: '4px 4px 0 0', height: '84%' }}></div>
                    <div style={{ flex: 1, background: 'linear-gradient(to top, var(--green), var(--green-2))', borderRadius: '4px 4px 0 0', height: '100%' }}></div>
                  </div>
                </div>
                <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginBottom: '14px', fontWeight: 600 }}>Live Suite Activity</div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', marginTop: '6px', flexShrink: 0 }}></span>
                    <div style={{ fontSize: '12.5px', color: 'var(--ink)' }}>Invoice #1042 paid <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-dim)' }}>Kestrel Manufacturing</span></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 0' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green-2)', marginTop: '6px', flexShrink: 0 }}></span>
                    <div style={{ fontSize: '12.5px', color: 'var(--ink)' }}>New lead qualified <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-dim)' }}>Bright Path Realty</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Strip */}
      <div style={{ padding: '34px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-soft)' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 600, fontSize: '12px', color: 'var(--text-dim)', letterSpacing: '0.08em' }}>TRUSTED BY GROWING BUSINESSES</span>
          <div style={{ display: 'flex', gap: '34px', flexWrap: 'wrap', fontFamily: 'var(--display)', fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>
            <span>Northbridge Logistics</span>
            <span>Everline Retail</span>
            <span>Solace Health Group</span>
            <span>Kestrel Manufacturing</span>
            <span>Bright Path Realty</span>
          </div>
        </div>
      </div>

      {/* Modules Ledger Section */}
      <section id="modules" style={{ padding: '96px 0' }}>
        <div className="wrap">
          <div style={{ maxWidth: '600px', margin: '0 auto 52px', textAlign: 'center' }}>
            <span className="eyebrow">The Platform Modules</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', margin: '16px 0 12px' }}>Five modules. One balance sheet.</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '16px' }}>Connect sales, people, projects, and finance through one unified workspace ledger.</p>
          </div>

          <div style={{ border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
            {modules.map((mod, idx) => {
              const isExpanded = activeModule === idx;
              return (
                <React.Fragment key={mod.id}>
                  <div 
                    onClick={() => setActiveModule(isExpanded ? null : idx)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '28px 200px 1fr 130px 20px',
                      gap: '22px',
                      alignItems: 'center',
                      padding: '26px 20px',
                      borderBottom: '1px solid var(--border)',
                      cursor: 'pointer',
                      background: isExpanded ? 'var(--green-tint)' : '#fff'
                    }}
                  >
                    <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: mod.color }}></span>
                    <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '19px', color: 'var(--ink)' }}>{mod.id} {mod.name}</span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '14.5px' }}>{mod.desc}</span>
                    <span style={{ fontWeight: 600, fontSize: '12.5px', color: 'var(--green-dark)', textAlign: 'right' }}>{mod.count}</span>
                    <span style={{ fontWeight: 700, color: isExpanded ? 'var(--green)' : 'var(--text-dim)' }}>{isExpanded ? '−' : '+'}</span>
                  </div>
                  {isExpanded && (
                    <div style={{ background: 'var(--bg-soft)', padding: '20px 24px 24px 70px', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px 24px' }}>
                        {mod.bullets.map((b, bIdx) => (
                          <div key={bIdx} style={{ fontSize: '14px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: 'var(--green)', fontWeight: 700 }}>—</span> {b}
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: '20px' }}>
                        <Link href="/app/crm" className="btn btn-brass btn-sm">
                          Explore {mod.name} Module <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '96px 0', background: 'var(--bg-soft)' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <span className="eyebrow">Transparent Pricing</span>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 36px)', margin: '16px 0' }}>One invoice replaces all software subscriptions.</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '15.5px', marginBottom: '22px' }}>Every module, seat role, and report is included from day one.</p>
            
            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: !isAnnual ? 700 : 400 }}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                style={{
                  width: '48px', height: '26px', borderRadius: '20px',
                  background: 'var(--green)', border: 'none', padding: '3px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: isAnnual ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#fff' }}></div>
              </button>
              <span style={{ fontSize: '14px', fontWeight: isAnnual ? 700 : 400, color: 'var(--green-dark)' }}>
                Annual (Save 20%)
              </span>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '16px', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
            <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--display)', fontSize: '22px', fontWeight: 700, color: 'var(--ink)' }}>Growth Plan</span>
              <span className="badge badge-green">Most Popular</span>
            </div>
            <div style={{ padding: '26px 32px 10px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--display)', fontSize: '48px', fontWeight: 800, color: 'var(--ink)' }}>{isAnnual ? '$39' : '$49'}</span>
              <span style={{ fontSize: '13.5px', color: 'var(--text-dim)' }}>/ month, billed {isAnnual ? 'annually' : 'monthly'}</span>
            </div>
            <div style={{ padding: '10px 32px 28px' }}>
              <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px 20px' }}>
                <li style={{ fontSize: '13.5px', color: 'var(--text-dim)' }}>✓ CRM & sales pipeline</li>
                <li style={{ fontSize: '13.5px', color: 'var(--text-dim)' }}>✓ HR & payroll suite</li>
                <li style={{ fontSize: '13.5px', color: 'var(--text-dim)' }}>✓ Project management</li>
                <li style={{ fontSize: '13.5px', color: 'var(--text-dim)' }}>✓ Finance & invoicing</li>
                <li style={{ fontSize: '13.5px', color: 'var(--text-dim)' }}>✓ Team workspace</li>
                <li style={{ fontSize: '13.5px', color: 'var(--text-dim)' }}>✓ Up to 25 team members</li>
              </ul>
            </div>
            <div style={{ background: 'var(--bg-soft)', padding: '22px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Cancel anytime • 30-day guarantee</span>
              <button onClick={() => router.push('/app/crm')} className="btn btn-brass">
                Start Free Trial →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '96px 0' }}>
        <div className="wrap">
          <div style={{ maxWidth: '600px', margin: '0 auto 52px', textAlign: 'center' }}>
            <span className="eyebrow">Frequently Asked Questions</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', margin: '16px 0 12px' }}>Before you start your free trial</h2>
          </div>
          <div style={{ maxWidth: '760px', margin: '0 auto', borderTop: '1px solid var(--border)' }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <div 
                  onClick={() => toggleFaq(i)} 
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '20px 4px', cursor: 'pointer', fontFamily: 'var(--display)',
                    fontWeight: 600, fontSize: '17px', color: 'var(--ink)'
                  }}
                >
                  <span>{f.q}</span>
                  <span style={{ color: 'var(--green)', fontSize: '20px', fontWeight: 700 }}>
                    {faqOpen[i] ? '−' : '+'}
                  </span>
                </div>
                {faqOpen[i] && (
                  <div style={{ padding: '0 4px 24px', color: 'var(--text-dim)', fontSize: '14.5px' }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
