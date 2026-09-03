'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Users, UserCheck, TrendingUp, DollarSign, Download, RefreshCw, 
  Calendar, PhoneCall, FileText, Activity, Target, Layers, 
  CheckCircle2, ArrowUpRight, ArrowDownRight, AlertCircle, PieChart as PieIcon, BarChart2
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const barData = [
  { month: 'Apr', count: 0 },
  { month: 'May', count: 0 },
  { month: 'Jun', count: 0 },
  { month: 'Jul', count: 1 },
  { month: 'Aug', count: 0 },
  { month: 'Sept', count: 0 },
];

export default function CRMReportsPage() {
  const { data } = useApp();
  const [timeRange, setTimeRange] = useState<'7 days' | '30 days' | '90 days'>('30 days');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      
      {/* ── Sub Navigation Tabs ── */}
      <div className="vt-crm-subnav">
        <Link href="/app/crm" className="btn btn-sm btn-ghost">Dashboard</Link>
        <Link href="/app/crm/leads" className="btn btn-sm btn-ghost">Leads Directory</Link>
        <Link href="/app/crm/clients" className="btn btn-sm btn-ghost">Clients</Link>
        <Link href="/app/crm/pipeline" className="btn btn-sm btn-ghost">Deal Pipeline</Link>
        <Link href="/app/crm/invoices" className="btn btn-sm btn-ghost">Invoices</Link>
        <Link href="/app/crm/reports" className="btn btn-sm btn-brass">Reports & Analytics</Link>
        <Link href="/app/crm/users" className="btn btn-sm btn-ghost">Registered Users (MySQL)</Link>
      </div>

      {/* ── Page Header Row ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Reports & Analytics</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>
            Actionable insights, not just numbers
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Time range segmented pill buttons */}
          <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            {(['7 days', '30 days', '90 days'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                style={{
                  background: timeRange === r ? '#fff' : 'transparent',
                  border: 'none', borderRadius: '10px', padding: '5px 14px',
                  fontSize: '12.5px', fontWeight: timeRange === r ? 800 : 600,
                  color: timeRange === r ? 'var(--ink)' : 'var(--text-dim)',
                  cursor: 'pointer',
                  boxShadow: timeRange === r ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {r}
              </button>
            ))}
          </div>

          <button className="btn btn-secondary btn-sm" style={{ height: '36px', borderRadius: '10px' }}>
            <Download size={14} /> Export report
          </button>

          <button onClick={handleRefresh} className="btn btn-secondary btn-sm" style={{ height: '36px', borderRadius: '10px' }}>
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      {/* ── 1. THIS PERIOD STAT CARDS ── */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#6366f1', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }}></span>
          THIS PERIOD
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          
          <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>NEW LEADS</div>
            <div style={{ fontSize: '30px', fontWeight: 800, margin: '8px 0 4px' }}>0</div>
            <div style={{ fontSize: '12px', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowDownRight size={13} /> +100.0% vs prev
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>CONVERSION RATE</div>
            <div style={{ fontSize: '30px', fontWeight: 800, margin: '8px 0 4px' }}>0.0%</div>
            <div style={{ fontSize: '12px', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowUpRight size={13} /> +0.0% vs prev
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.2)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>REVENUE COLLECTED</div>
            <div style={{ fontSize: '30px', fontWeight: 800, margin: '8px 0 4px' }}>₹0</div>
            <div style={{ fontSize: '12px', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowUpRight size={13} /> +0.0% vs prev
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>ACTIVE CLIENTS</div>
            <div style={{ fontSize: '30px', fontWeight: 800, margin: '8px 0 4px' }}>0</div>
            <div style={{ fontSize: '12px', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowUpRight size={13} /> +0.0% vs prev
            </div>
          </div>

        </div>
      </div>

      {/* ── 2. CURRENT PIPELINE STAT CARDS ── */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#64748b' }}></span>
          CURRENT PIPELINE — ALL TIME
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          
          <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>OPEN PIPELINE VALUE</div>
            <div style={{ fontSize: '30px', fontWeight: 800, margin: '8px 0 4px' }}>₹15K</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>OPEN LEADS</div>
            <div style={{ fontSize: '30px', fontWeight: 800, margin: '8px 0 4px' }}>1</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.2)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>AVG. DEAL VALUE</div>
            <div style={{ fontSize: '30px', fontWeight: 800, margin: '8px 0 4px' }}>₹15K</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>REVENUE CONCENTRATION</div>
            <div style={{ fontSize: '30px', fontWeight: 800, margin: '8px 0 4px' }}>0.0%</div>
          </div>

        </div>
      </div>

      {/* ── 3. NEEDS YOUR ATTENTION ── */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#dc2626', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626' }}></span>
          NEEDS YOUR ATTENTION
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          
          <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)', borderTop: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PhoneCall size={16} />
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Overdue follow-ups</h4>
              </div>
              <span className="badge badge-green" style={{ fontSize: '11px' }}>Clear</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: 0 }}>
              No leads are past their follow-up date right now.
            </p>
          </div>

          <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)', borderTop: '4px solid #f97316' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={16} />
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Overdue invoices</h4>
              </div>
              <span className="badge badge-green" style={{ fontSize: '11px' }}>Clear</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: 0 }}>
              All invoices are within their due date.
            </p>
          </div>

          <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)', borderTop: '4px solid #10b981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Activity size={16} />
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Revenue concentration</h4>
              </div>
              <span className="badge badge-green" style={{ fontSize: '11px' }}>0%</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: 0 }}>
              0% of total billed revenue comes from your top 3 clients.
            </p>
          </div>

        </div>
      </div>

      {/* ── 4. MIDDLE CHARTS ROW ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        
        {/* Card A: Leads vs conversions by service */}
        <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)', borderTop: '4px solid #6366f1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#eeef2410', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Leads vs conversions by service</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>This period, by service line</p>
            </div>
          </div>

          <div style={{ padding: '50px 0', textAlign: 'center', color: '#94a3b8' }}>
            <Activity size={32} style={{ margin: '0 auto 8px', opacity: 0.4 }} />
            <div style={{ fontSize: '13px', fontWeight: 600 }}>No leads in this period yet</div>
          </div>
        </div>

        {/* Card B: Lead source performance */}
        <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)', borderTop: '4px solid #0284c7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Lead source performance</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>Share of leads this period</p>
            </div>
          </div>

          <div style={{ padding: '50px 0', textAlign: 'center', color: '#94a3b8' }}>
            <Target size={32} style={{ margin: '0 auto 8px', opacity: 0.4 }} />
            <div style={{ fontSize: '13px', fontWeight: 600 }}>No leads in this period yet</div>
          </div>
        </div>

      </div>

      {/* ── 5. THREE COLUMN CHARTS & FUNNELS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        
        {/* Card 1: Lead volume trend */}
        <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)', borderTop: '4px solid #0284c7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChart2 size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Lead volume trend</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>Last 6 months — independent of the period...</p>
              </div>
            </div>
            <span className="badge badge-green" style={{ fontSize: '11px' }}>1 total</span>
          </div>

          <div style={{ height: '160px', width: '100%', marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Conversion funnel */}
        <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)', borderTop: '4px solid #6366f1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#eeef2410', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Conversion funnel</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>Current pipeline snapshot — all leads, all time</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'New Leads', val: 0, pct: '0%' },
              { label: 'Qualified', val: 1, pct: '100%', bar: true },
              { label: 'Proposal', val: 0, pct: '-100%' },
              { label: 'Negotiation', val: 0, pct: '0%' },
              { label: 'Converted', val: 0, pct: '0%' },
              { label: 'Closed / Lost', val: 0, pct: '0%' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{f.label}</span>
                {f.bar ? (
                  <div style={{ flex: 1, margin: '0 16px', background: '#818cf8', height: '8px', borderRadius: '4px' }}></div>
                ) : null}
                <span style={{ color: f.val > 0 ? '#6366f1' : '#94a3b8', fontWeight: 700 }}>
                  {f.pct === '-100%' ? <span style={{ fontSize: '10px', color: '#94a3b8', marginRight: '4px' }}>-100%</span> : null}
                  {f.val}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
            <span style={{ color: 'var(--text-dim)', fontWeight: 600 }}>Overall conversion</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)' }}>—</span>
          </div>
        </div>

        {/* Card 3: Open-lead priority */}
        <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)', borderTop: '4px solid #f97316' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Open-lead priority</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>Current snapshot — open leads only</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Medium priority</span>
                <span style={{ fontWeight: 800, color: 'var(--ink)' }}>1</span>
              </div>
              <div style={{ background: '#d97706', height: '8px', borderRadius: '4px', width: '100%' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', paddingTop: '10px' }}>
              <span style={{ color: 'var(--text-dim)', fontWeight: 600 }}>Overdue follow-ups</span>
              <span style={{ fontWeight: 800, color: 'var(--ink)' }}>0</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── 6. TOP LEADS & CHANNEL PERFORMANCE GRID ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        
        {/* Card Left: Top open leads by value */}
        <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)', borderTop: '4px solid #6366f1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#eeef2410', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Top open leads by value</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>Current snapshot, ranked by estimated revenue</p>
              </div>
            </div>
            <span className="badge badge-blue" style={{ fontSize: '11px' }}>₹15K pipeline</span>
          </div>

          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: 'var(--text-dim)', textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>
                <th style={{ paddingBottom: '10px', fontWeight: 600 }}>Lead</th>
                <th style={{ paddingBottom: '10px', fontWeight: 600 }}>Service</th>
                <th style={{ paddingBottom: '10px', fontWeight: 600 }}>Est. value</th>
                <th style={{ paddingBottom: '10px', fontWeight: 600 }}>Priority</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ paddingTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#dbeafe', color: '#1d4ed8', fontWeight: 800, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      v
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--ink)' }}>Varby</span>
                  </div>
                </td>
                <td style={{ paddingTop: '12px', color: 'var(--text-dim)' }}>Website</td>
                <td style={{ paddingTop: '12px', fontWeight: 800, color: 'var(--ink)' }}>₹15K</td>
                <td style={{ paddingTop: '12px' }}>
                  <span style={{ background: '#fef3c7', color: '#b45309', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '10px' }}>
                    medium
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Card Right Top: Channel performance */}
          <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)', borderTop: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Target size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Channel performance</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>Conversion %, this period</p>
              </div>
            </div>

            <div style={{ padding: '24px 0', textAlign: 'center', color: '#94a3b8' }}>
              <Target size={28} style={{ margin: '0 auto 6px', opacity: 0.4 }} />
              <div style={{ fontSize: '12.5px', fontWeight: 600 }}>No leads in this period yet</div>
            </div>
          </div>

          {/* Card Right Bottom: Top clients by revenue */}
          <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)', borderTop: '4px solid #f97316' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Top clients by revenue</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>All time, billing-based</p>
              </div>
            </div>

            <div style={{ padding: '24px 0', textAlign: 'center', color: '#94a3b8' }}>
              <Users size={28} style={{ margin: '0 auto 6px', opacity: 0.4 }} />
              <div style={{ fontSize: '12.5px', fontWeight: 600 }}>No client revenue recorded yet</div>
            </div>
          </div>

        </div>

      </div>

      {/* ── 7. CLIENTS BY SERVICE ── */}
      <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)', borderTop: '4px solid #6366f1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#eeef2410', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Clients by service</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>All time — distribution across active service lines</p>
            </div>
          </div>
          <span className="badge badge-blue" style={{ fontSize: '11px' }}>0 clients</span>
        </div>

        <div style={{ padding: '36px 0', textAlign: 'center', color: '#94a3b8' }}>
          <Users size={32} style={{ margin: '0 auto 8px', opacity: 0.4 }} />
          <div style={{ fontSize: '13px', fontWeight: 600 }}>No clients yet</div>
        </div>
      </div>

    </div>
  );
}
