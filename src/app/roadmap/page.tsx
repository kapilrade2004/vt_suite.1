'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LandingHeader } from '@/components/layout/LandingHeader';
import { LandingFooter } from '@/components/layout/LandingFooter';
import { 
  Sparkles, CheckCircle2, Clock, ThumbsUp, Plus, Filter, 
  Layers, ChevronRight, X, Send, AlertCircle, ArrowRight, Zap
} from 'lucide-react';

interface RoadmapCard {
  id: string;
  title: string;
  module: 'HR' | 'CRM' | 'Finance' | 'Projects' | 'Workspace';
  type?: 'Feature' | 'Improvement' | 'Bug Fix';
  description: string;
  votes: number;
  status: 'suggestions' | 'planned' | 'in-progress' | 'testing' | 'shipped';
  quarter?: string;
  communityPick?: boolean;
}

export default function RoadmapPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedCard, setSelectedCard] = useState<RoadmapCard | null>(null);
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const [votedCards, setVotedCards] = useState<Record<string, boolean>>({});
  
  // Suggestion Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [suggestionForm, setSuggestionForm] = useState({
    name: '',
    email: '',
    title: '',
    description: '',
    module: 'HR'
  });

  // Sample Roadmap Items matching pmsuite.co
  const [cards, setCards] = useState<RoadmapCard[]>([
    // Suggestions (Exact items from screenshots)
    { id: 's1', title: 'Collaborative documents', module: 'Workspace', type: 'Feature', description: 'Real-time collaborative docs/notes attached to projects, like a lightweight Google Docs.', votes: 11, status: 'suggestions' },
    { id: 's2', title: 'Shift swap marketplace', module: 'HR', type: 'Feature', description: 'Let employees swap shifts with peer approval.', votes: 11, status: 'suggestions' },
    { id: 's3', title: 'Import boards from Trello', module: 'Projects', type: 'Feature', description: 'One-click import of Trello boards, lists and cards into VasifyTech projects.', votes: 9, status: 'suggestions' },
    { id: 's4', title: 'Multiple cumulative taxes on invoices', module: 'Finance', type: 'Feature', description: 'Support stacking more than one tax (e.g. GST + provincial) cumulatively on a single invoice line.', votes: 9, status: 'suggestions' },
    { id: 's5', title: 'Manage shift types from the shift roster', module: 'HR', type: 'Feature', description: 'Create and edit shift types directly from the roster screen instead of settings.', votes: 6, status: 'suggestions' },
    { id: 's6', title: 'Adjust default question visibility', module: 'HR', type: 'Improvement', description: 'Allow admins to adjust the visibility of default application questions under the Personal Information section.', votes: 2, status: 'suggestions' },
    { id: 's7', title: 'Bookkeeping', module: 'Finance', type: 'Feature', description: 'A dedicated book-keeping feature with bank and tax office integration, especially for Nordic countries.', votes: 1, status: 'suggestions' },
    { id: 's8', title: 'Director of Operation', module: 'Finance', type: 'Feature', description: 'We have QuickBooks Desktop version and need integration to this.', votes: 1, status: 'suggestions' },
    { id: 's9', title: 'Assets Mapping and storage', module: 'Projects', type: 'Feature', description: 'Creative dependant business needs their creative assets mapping so that confusion can be avoided for marketing team.', votes: 0, status: 'suggestions' },
    { id: 's10', title: 'Employee Status', module: 'HR', type: 'Improvement', description: 'Moved to a higher location in profile and be visible on the employee list.', votes: 0, status: 'suggestions' },
    { id: 's11', title: 'Being able to modify', module: 'HR', type: 'Feature', description: 'It should enable to change and customize everything.', votes: 0, status: 'suggestions' },

    // Planned (Exact items from screenshots)
    { id: 'p1', title: 'Native In-App Video Conferencing', module: 'Workspace', type: 'Feature', description: 'Video calls without Zoom dependency.', votes: 34, status: 'planned', quarter: 'Q4 2026' },
    { id: 'p2', title: 'Email Sequence Automation', module: 'CRM', type: 'Feature', description: 'Drip campaigns for leads.', votes: 29, status: 'planned', quarter: 'Q3 2026' },
    { id: 'p3', title: 'Document E-Signature (Native)', module: 'Finance', type: 'Feature', description: 'Sign any document, not just contracts.', votes: 25, status: 'planned', quarter: 'Q3 2026' },
    { id: 'p4', title: 'Project Budget Forecasting', module: 'Projects', type: 'Feature', description: 'Predict budget usage with AI.', votes: 22, status: 'planned', quarter: 'Q3 2026' },
    { id: 'p5', title: 'Salesforce Bi-directional Sync', module: 'CRM', type: 'Feature', description: 'Two-way sync with Salesforce CRM.', votes: 19, status: 'planned', quarter: 'Q4 2026' },
    { id: 'p6', title: 'HubSpot Integration', module: 'CRM', type: 'Feature', description: 'Connect with HubSpot CRM and Marketing.', votes: 16, status: 'planned', quarter: 'Q3 2026' },
    { id: 'p7', title: 'Mailchimp Email Marketing Sync', module: 'CRM', type: 'Feature', description: 'Sync contacts with Mailchimp audiences.', votes: 14, status: 'planned', quarter: 'Q3 2026' },
    { id: 'p8', title: 'AI Chatbot for Internal Support', module: 'Workspace', type: 'Feature', description: 'AI assistant for employee questions.', votes: 12, status: 'planned', quarter: 'Q4 2026' },
    { id: 'p9', title: 'Automated Compliance Alerts', module: 'HR', type: 'Feature', description: 'Visa expiry, certification renewal, policy deadlines.', votes: 10, status: 'planned', quarter: 'Q2 2026' },

    // In Progress (Exact items from screenshots)
    { id: 'ip1', title: 'Zapier Integration Hub', module: 'Workspace', type: 'Feature', description: 'Connect VasifyTech Suite to 5000+ apps via Zapier.', votes: 58, status: 'in-progress', quarter: 'Q2 2026' },
    { id: 'ip2', title: 'Client Self-Service Portal', module: 'CRM', type: 'Improvement', description: 'Clients view projects, invoices, tickets independently.', votes: 45, status: 'in-progress', quarter: 'Q2 2026' },
    { id: 'ip3', title: 'Visual Workflow Automation Builder', module: 'Workspace', type: 'Feature', description: 'Drag-and-drop if/then automation.', votes: 39, status: 'in-progress', quarter: 'Q3 2026' },
    { id: 'ip4', title: 'GPS Geofencing for Time Tracking', module: 'HR', type: 'Feature', description: 'Auto clock-in/out based on location.', votes: 31, status: 'in-progress', communityPick: true },
    { id: 'ip5', title: 'Advanced GDPR Data Mapping', module: 'HR', type: 'Feature', description: 'Visual data flow and processing maps for EU compliance.', votes: 28, status: 'in-progress' },
    { id: 'ip6', title: 'AI-Powered Document Generation', module: 'Workspace', type: 'Feature', description: 'Generate contracts, letters, and reports with AI.', votes: 24, status: 'in-progress' },
    { id: 'ip7', title: 'Multi-Country Payroll Engine', module: 'Finance', type: 'Feature', description: 'Unified payroll for US, UK, DE, AU, CA, Nordics.', votes: 20, status: 'in-progress', communityPick: true },

    // Testing (Exact items from screenshots)
    { id: 't1', title: 'Native Mobile App - iOS', module: 'Workspace', type: 'Feature', description: 'Full-featured iOS app — launching soon.', votes: 89, status: 'testing', quarter: 'Q2 2026', communityPick: true },
    { id: 't2', title: 'Native Mobile App - Android', module: 'Workspace', type: 'Feature', description: 'Submitted to Google Play — in review.', votes: 76, status: 'testing', quarter: 'Q2 2026', communityPick: true },
    { id: 't3', title: 'Built-in VoIP/Click-to-Call', module: 'CRM', type: 'Feature', description: 'Call leads and clients directly from the app.', votes: 41, status: 'testing', quarter: 'Q2 2026' },
    { id: 't4', title: 'Employee Self-Service Kiosk Mode', module: 'HR', type: 'Feature', description: 'Tablet kiosk for clock-in/requests.', votes: 38, status: 'testing' },
    { id: 't5', title: 'Custom Form Builder', module: 'Workspace', type: 'Feature', description: 'Drag-and-drop forms for any workflow.', votes: 33, status: 'testing', quarter: 'Q2 2026' },
    { id: 't6', title: 'Nordic Payroll Tax Integration', module: 'Finance', type: 'Feature', description: 'Tax authority integration for DK, FI, NO, SE.', votes: 29, status: 'testing' },
    { id: 't7', title: 'Smart Notification Center', module: 'Workspace', type: 'Feature', description: 'Unified, filterable notification hub.', votes: 26, status: 'testing' },
    { id: 't8', title: 'Calendar Sync - Outlook & Apple', module: 'Workspace', type: 'Feature', description: 'Bidirectional sync with Outlook and Apple Calendar.', votes: 22, status: 'testing' },

    // Shipped (Exact items from pmsuite.co/roadmap screenshots)
    { id: 'sh1', title: 'Customer Referral Codes', module: 'Workspace', type: 'Feature', description: 'Existing customers get shareable referral codes with tracked rewards.', votes: 124, status: 'shipped' },
    { id: 'sh2', title: 'Admin Setup Checklist', module: 'Workspace', type: 'Improvement', description: 'Guided first-run checklist that walks new admins through core setup.', votes: 118, status: 'shipped' },
    { id: 'sh3', title: 'Google Calendar Two-Way Sync', module: 'Workspace', type: 'Feature', description: 'Events sync both directions with loop prevention and conflict handling.', votes: 115, status: 'shipped' },
    { id: 'sh4', title: 'QuickBooks Sync Status', module: 'Finance', type: 'Improvement', description: 'Invoice sync failures surface as visible warnings instead of silent errors.', votes: 109, status: 'shipped' },
    { id: 'sh5', title: 'Zapier Custom Field Mapping', module: 'Workspace', type: 'Improvement', description: 'The Create Client Zap now maps custom fields.', votes: 102, status: 'shipped' },
    { id: 'sh6', title: 'Credit Notes on Future Invoices', module: 'Finance', type: 'Improvement', description: 'Apply a credit note to any later invoice, not just its origin invoice.', votes: 98, status: 'shipped', communityPick: true },
    { id: 'sh7', title: 'Clean White-Label Login', module: 'Workspace', type: 'Improvement', description: 'Tenant subdomain login pages drop the marketing nav for a clean branded form.', votes: 94, status: 'shipped' },
    { id: 'sh8', title: 'Custom Domains with Auto-SSL', module: 'Workspace', type: 'Feature', description: 'Bring your own domain — DNS verification and SSL certificates handled automatically.', votes: 91, status: 'shipped' },
    { id: 'sh9', title: 'Per-Tenant SMTP + Live Verify', module: 'Workspace', type: 'Feature', description: 'Send from your own mail server, with a real-time verification check.', votes: 88, status: 'shipped' },
    { id: 'sh10', title: 'Email Deliverability Suite', module: 'Workspace', type: 'Feature', description: 'Bounce handling, suppression lists and smart throttling across all outbound mail.', votes: 85, status: 'shipped' },
    { id: 'sh11', title: 'GDPR Consent Management', module: 'Workspace', type: 'Feature', description: 'Consent capture, purpose tracking and per-tenant GDPR controls.', votes: 82, status: 'shipped' },
    { id: 'sh12', title: 'Recruit Question Bank Control', module: 'HR', type: 'Improvement', description: 'Delete or hide default system questions in the Recruit question bank.', votes: 79, status: 'shipped', communityPick: true },
    { id: 'sh13', title: 'Attendance Export with GPS', module: 'HR', type: 'Improvement', description: 'Attendance exports fixed and extended with a GPS location column.', votes: 76, status: 'shipped' },
    { id: 'sh14', title: 'Frictionless Estimate Approval', module: 'CRM', type: 'Improvement', description: 'Clients approve estimates without being forced through unnecessary detail forms.', votes: 73, status: 'shipped', communityPick: true },
    { id: 'sh15', title: 'Lead Call Logs', module: 'CRM', type: 'Feature', description: 'Log calls directly on lead profiles.', votes: 71, status: 'shipped', communityPick: true },
    { id: 'sh16', title: 'Tasks Linked to Clients & Leads', module: 'Projects', type: 'Improvement', description: 'Create tasks tied to a client or lead, not only to projects.', votes: 68, status: 'shipped', communityPick: true },
    { id: 'sh17', title: 'Ongoing vs Completed Charts', module: 'Projects', type: 'Improvement', description: 'The Project Dashboard splits category charts into ongoing and completed work.', votes: 65, status: 'shipped' },
    { id: 'sh18', title: 'Time Log Editing Fixes', module: 'Projects', type: 'Bug Fix', description: 'Fixed date resets, frozen edit windows and timesheet corruption in time logs.', votes: 62, status: 'shipped' },
    { id: 'sh19', title: 'Invoicing & Estimate Fixes', module: 'Finance', type: 'Bug Fix', description: 'Invoice list disappearance, false cancel errors, PDF image sizing and font crashes fixed.', votes: 59, status: 'shipped' },
    { id: 'sh20', title: 'Correct 404 Error Pages', module: 'Workspace', type: 'Bug Fix', description: 'Wrong URLs now return a clean Page Not Found instead of a false server error.', votes: 56, status: 'shipped' },
    { id: 'sh21', title: 'Dynamic-IP Login Protection', module: 'Workspace', type: 'Bug Fix', description: 'Users on rotating ISP/mobile IPs are no longer falsely blacklisted.', votes: 53, status: 'shipped' },
    { id: 'sh22', title: 'Expense Amounts Uncapped', module: 'Finance', type: 'Bug Fix', description: 'Recording an expense is no longer blocked by the bank account balance.', votes: 50, status: 'shipped' },
  ]);

  const handleVote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (votedCards[id]) {
      setCards(prev => prev.map(c => c.id === id ? { ...c, votes: c.votes - 1 } : c));
      setVotedCards(prev => ({ ...prev, [id]: false }));
    } else {
      setCards(prev => prev.map(c => c.id === id ? { ...c, votes: c.votes + 1 } : c));
      setVotedCards(prev => ({ ...prev, [id]: true }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestionForm.title || !suggestionForm.description) return;
    
    const newCard: RoadmapCard = {
      id: 'usr_' + Date.now(),
      title: suggestionForm.title,
      module: suggestionForm.module as any,
      description: suggestionForm.description,
      votes: 1,
      status: 'suggestions'
    };

    setCards(prev => [newCard, ...prev]);
    setFormSubmitted(true);
    setTimeout(() => {
      setIsSuggestModalOpen(false);
      setFormSubmitted(false);
      setSuggestionForm({ name: '', email: '', title: '', description: '', module: 'HR' });
    }, 1500);
  };

  const getFilteredCards = (status: RoadmapCard['status']) => {
    return cards.filter(c => c.status === status && (activeFilter === 'All' || c.module === activeFilter));
  };

  const getModuleBadgeStyle = (module: RoadmapCard['module']) => {
    switch (module) {
      case 'HR': return { bg: '#e6f4ea', color: '#137333', border: '#ceead6' };
      case 'CRM': return { bg: '#e8f0fe', color: '#1a73e8', border: '#d2e3fc' };
      case 'Finance': return { bg: '#fef7e0', color: '#b06000', border: '#feefc3' };
      case 'Projects': return { bg: '#f3e8fd', color: '#8430ce', border: '#e9d5ff' };
      case 'Workspace': return { bg: '#fce8e6', color: '#c5221f', border: '#fad2cf' };
      default: return { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };
    }
  };

  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('all');
  const boardScrollRef = React.useRef<HTMLDivElement>(null);

  const scrollToColumn = (colIndex: number, status: string) => {
    setActiveStatusFilter(status);
    if (boardScrollRef.current) {
      const colWidth = 260; // Approximate column width + gap
      boardScrollRef.current.scrollTo({
        left: colIndex * colWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--body)' }}>
      <LandingHeader />

      {/* ===== HERO SECTION ===== */}
      <section style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(29, 168, 81, 0.15), transparent)',
        padding: '56px 0 48px',
        textAlign: 'center',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="wrap" style={{ maxWidth: '840px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
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
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} /> Public Roadmap
          </span>

          <h1 style={{
            fontSize: 'clamp(34px, 4.4vw, 54px)',
            lineHeight: 1.1,
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            Our Journey to Build the<br />
            <span style={{
              background: 'linear-gradient(135deg, var(--green-dark) 0%, var(--green) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>All-in-One Platform</span>
          </h1>

          <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto 32px' }}>
            Instead of using 5 different tools, we built one platform where your data stays connected and your costs stay low.
          </p>

          {/* Inline Stats Row */}
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '40px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '12px 28px', textAlign: 'center' }}>
              <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--green-dark)' }}>230+</div>
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748b' }}>Features Built</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '12px 28px', textAlign: 'center' }}>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#2563eb' }}>5</div>
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748b' }}>Core Modules</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '12px 28px', textAlign: 'center' }}>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#d97706' }}>50+</div>
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748b' }}>Integrations</div>
            </div>
          </div>

          {/* Horizontal Journey Timeline */}
          <div style={{ overflowX: 'auto', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', minWidth: '880px', justifyContent: 'space-between', position: 'relative', padding: '0 20px' }}>
              {/* Line */}
              <div style={{ position: 'absolute', top: '14px', left: '40px', right: '40px', height: '2px', background: '#cbd5e1', zIndex: 1 }} />

              {[
                { q: 'Q1 2024', label: 'Inception', done: true },
                { q: 'Q2 2024', label: 'HR Module', done: true },
                { q: 'Q3 2024', label: 'Projects & CRM', done: true },
                { q: 'Q4 2024', label: 'Finance', done: true },
                { q: 'Q1 2025', label: 'Workspace', done: true },
                { q: 'Q2 2025', label: 'Adv. HR', done: true },
                { q: 'Q3 2025', label: 'Integrations', done: true },
                { q: 'Q4 2025', label: 'Enterprise', done: true },
                { q: 'Jan 2026', label: 'Beta', done: true },
                { q: 'Feb 2026', label: 'Launch', done: true },
                { q: 'NOW', label: 'Post-Launch', current: true },
              ].map((step, idx) => (
                <div key={idx} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: step.current ? '32px' : '26px',
                    height: step.current ? '32px' : '26px',
                    borderRadius: '50%',
                    background: step.current ? 'var(--green-dark)' : 'var(--green)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 800,
                    boxShadow: step.current ? '0 0 0 4px var(--green-tint-2)' : 'none'
                  }}>
                    {step.current ? '★' : '✓'}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: step.current ? 'var(--green-dark)' : '#64748b' }}>{step.q}</div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#0f172a' }}>{step.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ===== FEATURE BOARD (KANBAN) SECTION ===== */}
      <section style={{ padding: '64px 0 88px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap" style={{ maxWidth: '1280px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Feature Board
            </h2>
            <p style={{ fontSize: '15.5px', color: '#64748b', marginBottom: '20px' }}>
              Track our progress, see what's shipping, and submit your own feature suggestions.
            </p>

            <button 
              onClick={() => setIsSuggestModalOpen(true)}
              className="btn btn-brass"
              style={{ borderRadius: '24px', padding: '10px 24px', fontWeight: 700, fontSize: '14.5px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Plus size={18} /> Submit a Suggestion
            </button>
          </div>

          {/* Module Filter Pills (PLACED ABOVE) */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
            {['All', 'HR', 'CRM', 'Finance', 'Projects', 'Workspace'].map((mod) => (
              <button
                key={mod}
                onClick={() => setActiveFilter(mod)}
                style={{
                  padding: '7px 18px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: activeFilter === mod ? '1px solid #0f172a' : '1px solid #e2e8f0',
                  background: activeFilter === mod ? '#0f172a' : '#ffffff',
                  color: activeFilter === mod ? '#ffffff' : '#475569',
                  boxShadow: activeFilter === mod ? '0 4px 10px rgba(15, 23, 42, 0.2)' : 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {mod}
              </button>
            ))}
          </div>

          {/* STATUS TAB PILLS (PLACED BELOW) */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '36px' }}>
            <button
              onClick={() => scrollToColumn(0, 'all')}
              style={{
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                border: activeStatusFilter === 'all' ? '1px solid var(--green-dark)' : '1px solid #cbd5e1',
                background: activeStatusFilter === 'all' ? 'var(--green-dark)' : '#ffffff',
                color: activeStatusFilter === 'all' ? '#ffffff' : '#475569',
                cursor: 'pointer'
              }}
            >
              All Columns
            </button>

            <button
              onClick={() => scrollToColumn(0, 'suggestions')}
              style={{
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                border: activeStatusFilter === 'suggestions' ? '1px solid #64748b' : '1px solid #cbd5e1',
                background: activeStatusFilter === 'suggestions' ? '#334155' : '#ffffff',
                color: activeStatusFilter === 'suggestions' ? '#ffffff' : '#334155',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Suggestions <span style={{ background: '#f1f5f9', color: '#334155', fontSize: '11px', padding: '1px 7px', borderRadius: '10px', fontWeight: 800 }}>{getFilteredCards('suggestions').length}</span>
            </button>

            <button
              onClick={() => scrollToColumn(1, 'planned')}
              style={{
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                border: activeStatusFilter === 'planned' ? '1px solid #2563eb' : '1px solid #cbd5e1',
                background: activeStatusFilter === 'planned' ? '#2563eb' : '#ffffff',
                color: activeStatusFilter === 'planned' ? '#ffffff' : '#2563eb',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Planned <span style={{ background: '#eff6ff', color: '#2563eb', fontSize: '11px', padding: '1px 7px', borderRadius: '10px', fontWeight: 800 }}>{getFilteredCards('planned').length}</span>
            </button>

            <button
              onClick={() => scrollToColumn(2, 'in-progress')}
              style={{
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                border: activeStatusFilter === 'in-progress' ? '1px solid #d97706' : '1px solid #cbd5e1',
                background: activeStatusFilter === 'in-progress' ? '#d97706' : '#ffffff',
                color: activeStatusFilter === 'in-progress' ? '#ffffff' : '#d97706',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              In Progress <span style={{ background: '#fffbeb', color: '#d97706', fontSize: '11px', padding: '1px 7px', borderRadius: '10px', fontWeight: 800 }}>{getFilteredCards('in-progress').length}</span>
            </button>

            <button
              onClick={() => scrollToColumn(3, 'testing')}
              style={{
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                border: activeStatusFilter === 'testing' ? '1px solid #9333ea' : '1px solid #cbd5e1',
                background: activeStatusFilter === 'testing' ? '#9333ea' : '#ffffff',
                color: activeStatusFilter === 'testing' ? '#ffffff' : '#9333ea',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Testing <span style={{ background: '#faf5ff', color: '#9333ea', fontSize: '11px', padding: '1px 7px', borderRadius: '10px', fontWeight: 800 }}>{getFilteredCards('testing').length}</span>
            </button>

            <button
              onClick={() => scrollToColumn(4, 'shipped')}
              style={{
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                border: activeStatusFilter === 'shipped' ? '1px solid var(--green-dark)' : '1px solid #cbd5e1',
                background: activeStatusFilter === 'shipped' ? 'var(--green-dark)' : '#ffffff',
                color: activeStatusFilter === 'shipped' ? '#ffffff' : 'var(--green-dark)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Shipped <span style={{ background: 'var(--green-tint)', color: 'var(--green-dark)', fontSize: '11px', padding: '1px 7px', borderRadius: '10px', fontWeight: 800 }}>{getFilteredCards('shipped').length + 230}</span>
            </button>
          </div>

          {/* KANBAN BOARD WRAPPER WITH HORIZONTAL SCROLLBAR */}
          <div ref={boardScrollRef} style={{ overflowX: 'auto', paddingBottom: '16px' }} className="custom-scrollbar">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, calc((100% - 60px) / 4))',
              gap: '20px',
              minWidth: '1100px',
              alignItems: 'start'
            }}>
              
              {/* COLUMN 1: SUGGESTIONS */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '2px solid #94a3b8', paddingBottom: '10px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} color="#64748b" /> Suggestions
                  </h3>
                  <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '12px', fontWeight: 800, padding: '2px 8px', borderRadius: '12px' }}>
                    {getFilteredCards('suggestions').length}
                  </span>
                </div>

                <div className="custom-kanban-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {getFilteredCards('suggestions').map(card => (
                    <RoadmapCardItem 
                      key={card.id} 
                      card={card} 
                      onCardClick={() => setSelectedCard(card)} 
                      onVote={(e) => handleVote(card.id, e)}
                      hasVoted={!!votedCards[card.id]}
                      badgeStyle={getModuleBadgeStyle(card.module)} 
                    />
                  ))}
                </div>
              </div>

              {/* COLUMN 2: PLANNED */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '2px solid #2563eb', paddingBottom: '10px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={16} color="#2563eb" /> Planned
                  </h3>
                  <span style={{ background: '#eff6ff', color: '#2563eb', fontSize: '12px', fontWeight: 800, padding: '2px 8px', borderRadius: '12px' }}>
                    {getFilteredCards('planned').length}
                  </span>
                </div>

                <div className="custom-kanban-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {getFilteredCards('planned').map(card => (
                    <RoadmapCardItem 
                      key={card.id} 
                      card={card} 
                      onCardClick={() => setSelectedCard(card)} 
                      onVote={(e) => handleVote(card.id, e)}
                      hasVoted={!!votedCards[card.id]}
                      badgeStyle={getModuleBadgeStyle(card.module)} 
                    />
                  ))}
                </div>
              </div>

              {/* COLUMN 3: IN PROGRESS */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '2px solid #d97706', paddingBottom: '10px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={16} color="#d97706" /> In Progress
                  </h3>
                  <span style={{ background: '#fffbeb', color: '#d97706', fontSize: '12px', fontWeight: 800, padding: '2px 8px', borderRadius: '12px' }}>
                    {getFilteredCards('in-progress').length}
                  </span>
                </div>

                <div className="custom-kanban-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {getFilteredCards('in-progress').map(card => (
                    <RoadmapCardItem 
                      key={card.id} 
                      card={card} 
                      onCardClick={() => setSelectedCard(card)} 
                      onVote={(e) => handleVote(card.id, e)}
                      hasVoted={!!votedCards[card.id]}
                      badgeStyle={getModuleBadgeStyle(card.module)} 
                    />
                  ))}
                </div>
              </div>

              {/* COLUMN 4: TESTING */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '2px solid #9333ea', paddingBottom: '10px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Filter size={16} color="#9333ea" /> Testing
                  </h3>
                  <span style={{ background: '#faf5ff', color: '#9333ea', fontSize: '12px', fontWeight: 800, padding: '2px 8px', borderRadius: '12px' }}>
                    {getFilteredCards('testing').length}
                  </span>
                </div>

                <div className="custom-kanban-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {getFilteredCards('testing').map(card => (
                    <RoadmapCardItem 
                      key={card.id} 
                      card={card} 
                      onCardClick={() => setSelectedCard(card)} 
                      onVote={(e) => handleVote(card.id, e)}
                      hasVoted={!!votedCards[card.id]}
                      badgeStyle={getModuleBadgeStyle(card.module)} 
                    />
                  ))}
                </div>
              </div>

              {/* COLUMN 5: SHIPPED */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '2px solid var(--green-dark)', paddingBottom: '10px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} color="var(--green-dark)" /> Shipped
                  </h3>
                  <span style={{ background: 'var(--green-tint)', color: 'var(--green-dark)', fontSize: '12px', fontWeight: 800, padding: '2px 8px', borderRadius: '12px' }}>
                    {getFilteredCards('shipped').length + 230}
                  </span>
                </div>

                <div className="custom-kanban-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {getFilteredCards('shipped').map(card => (
                    <RoadmapCardItem 
                      key={card.id} 
                      card={card} 
                      onCardClick={() => setSelectedCard(card)} 
                      onVote={(e) => handleVote(card.id, e)}
                      hasVoted={!!votedCards[card.id]}
                      badgeStyle={getModuleBadgeStyle(card.module)} 
                    />
                  ))}
                </div>
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
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: '18px', color: '#dcf3e2', marginBottom: '32px' }}>
            Join 4,500+ businesses saving time and money with VasifyTech Suite. Start your free trial today.
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

      {/* ===== SUGGESTION MODAL ===== */}
      {isSuggestModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            maxWidth: '480px',
            width: '100%',
            padding: '32px',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <button
              onClick={() => setIsSuggestModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Submit a Suggestion</h3>
            <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '20px' }}>Share your feature idea to help us build a better product.</p>

            {formSubmitted ? (
              <div style={{ padding: '24px', background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', borderRadius: '12px', textAlign: 'center' }}>
                <CheckCircle2 size={36} color="var(--green-dark)" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--green-dark)' }}>Suggestion Submitted!</h4>
                <p style={{ fontSize: '13px', color: 'var(--green-dark)', marginTop: '4px' }}>Thank you! Your idea has been added to our public suggestions queue.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Title *</label>
                  <input
                    type="text"
                    required
                    value={suggestionForm.title}
                    onChange={(e) => setSuggestionForm({ ...suggestionForm, title: e.target.value })}
                    placeholder="e.g., Dark mode for mobile app"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Module *</label>
                  <select
                    value={suggestionForm.module}
                    onChange={(e) => setSuggestionForm({ ...suggestionForm, module: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#ffffff' }}
                  >
                    <option value="HR">HR</option>
                    <option value="CRM">CRM</option>
                    <option value="Finance">Finance</option>
                    <option value="Projects">Projects</option>
                    <option value="Workspace">Workspace</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={suggestionForm.description}
                    onChange={(e) => setSuggestionForm({ ...suggestionForm, description: e.target.value })}
                    placeholder="Describe your feature idea in detail..."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', resize: 'none' }}
                  />
                </div>

                <button type="submit" className="btn btn-brass" style={{ borderRadius: '10px', padding: '12px', fontWeight: 800, marginTop: '8px' }}>
                  Submit Suggestion <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ===== CARD DETAIL MODAL ===== */}
      {selectedCard && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            maxWidth: '520px',
            width: '100%',
            padding: '32px',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <button
              onClick={() => setSelectedCard(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{
                background: getModuleBadgeStyle(selectedCard.module).bg,
                color: getModuleBadgeStyle(selectedCard.module).color,
                border: `1px solid ${getModuleBadgeStyle(selectedCard.module).border}`,
                fontSize: '11px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '10px'
              }}>
                {selectedCard.module}
              </span>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'capitalize' }}>
                Status: {selectedCard.status}
              </span>
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
              {selectedCard.title}
            </h3>

            <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
              {selectedCard.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
              <button
                onClick={(e) => handleVote(selectedCard.id, e)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  background: votedCards[selectedCard.id] ? 'var(--green-dark)' : '#f1f5f9',
                  color: votedCards[selectedCard.id] ? '#ffffff' : '#0f172a',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <ThumbsUp size={16} /> {selectedCard.votes} Upvotes
              </button>

              <button onClick={() => setSelectedCard(null)} className="btn btn-secondary btn-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <LandingFooter />
    </div>
  );
}

// Single Roadmap Item Sub-Component
function RoadmapCardItem({ 
  card, 
  onCardClick, 
  onVote, 
  hasVoted, 
  badgeStyle 
}: { 
  card: RoadmapCard; 
  onCardClick: () => void; 
  onVote: (e: React.MouseEvent) => void; 
  hasVoted: boolean; 
  badgeStyle: { bg: string; color: string; border: string; } 
}) {
  const getTypeBadge = (type?: string) => {
    switch (type) {
      case 'Feature': return { bg: '#e6f4ea', color: '#137333', border: '#ceead6' };
      case 'Improvement': return { bg: '#e8f0fe', color: '#1a73e8', border: '#d2e3fc' };
      case 'Bug Fix': return { bg: '#fce8e6', color: '#c5221f', border: '#fad2cf' };
      default: return null;
    }
  };

  const typeStyle = getTypeBadge(card.type);

  return (
    <div
      onClick={onCardClick}
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '14px',
        cursor: 'pointer',
        transition: 'transform 0.15s, box-shadow 0.15s',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}
      className="vt-card-hover"
    >
      <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', lineHeight: 1.35, margin: 0 }}>
        {card.title}
      </h4>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{
          background: badgeStyle.bg,
          color: badgeStyle.color,
          border: `1px solid ${badgeStyle.border}`,
          fontSize: '10.5px',
          fontWeight: 800,
          padding: '1.5px 7px',
          borderRadius: '8px'
        }}>
          {card.module}
        </span>

        {typeStyle && (
          <span style={{
            background: typeStyle.bg,
            color: typeStyle.color,
            border: `1px solid ${typeStyle.border}`,
            fontSize: '10.5px',
            fontWeight: 800,
            padding: '1.5px 7px',
            borderRadius: '8px'
          }}>
            {card.type}
          </span>
        )}

        {card.communityPick && (
          <span style={{ fontSize: '10px', fontWeight: 800, color: '#7e22ce', background: '#f3e8fd', padding: '1.5px 7px', borderRadius: '8px', border: '1px solid #e9d5ff' }}>
            Community pick
          </span>
        )}
      </div>

      <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.4, margin: '2px 0 0' }}>
        {card.description}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
        <button
          onClick={onVote}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 10px',
            borderRadius: '8px',
            fontSize: '11.5px',
            fontWeight: 700,
            border: hasVoted ? '1px solid var(--green-dark)' : '1px solid #e2e8f0',
            background: hasVoted ? 'var(--green-tint)' : '#f8fafc',
            color: hasVoted ? 'var(--green-dark)' : '#475569',
            cursor: 'pointer'
          }}
        >
          <ThumbsUp size={12} /> {card.votes}
        </button>

        {card.quarter && (
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8' }}>
            {card.quarter}
          </span>
        )}
      </div>
    </div>
  );
}
