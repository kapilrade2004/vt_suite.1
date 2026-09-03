'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Users, UserCheck, TrendingUp, DollarSign, Plus, RefreshCw, Calendar, CheckCircle2,
  Clock, PhoneCall, AlertCircle, FileText, Bell, Sparkles, ChevronRight, Activity, ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell 
} from 'recharts';
import { fetchApi } from '@/lib/api';

interface DbUser {
  id: number;
  user_name: string;
  mobile_number: string;
  email: string;
  company_name: string;
  created_at: string;
}

const trendData = [
  { date: '4 Aug', revenue: 0, deals: 0 },
  { date: '9 Aug', revenue: 0, deals: 0 },
  { date: '14 Aug', revenue: 0, deals: 0 },
  { date: '19 Aug', revenue: 0, deals: 0 },
  { date: '24 Aug', revenue: 0, deals: 0 },
  { date: '29 Aug', revenue: 0, deals: 1 },
];

const pieData = [
  { name: 'New Leads', value: 0, color: '#6366f1' },
  { name: 'Demo', value: 0, color: '#3b82f6' },
  { name: 'Proposal', value: 0, color: '#f97316' },
  { name: 'Negotiation', value: 0, color: '#0EA5E9' },
  { name: 'Won', value: 1, color: '#10b981' },
];

export default function CRMDashboardPage() {
  const { data } = useApp();
  const [dbUsers, setDbUsers] = useState<DbUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [dateRange, setDateRange] = useState('Last 30 days');

  const fetchDbUsers = async () => {
    setLoadingUsers(true);
    try {
      let res;
      try {
        res = await fetchApi('/api/users');
      } catch (e) {
        res = null;
      }
      if (res) {
        try {
          const result = await res.json();
          if (result && result.success && Array.isArray(result.users)) {
            setDbUsers(result.users);
          }
        } catch (e) {}
      }
    } catch (err) {
      console.error('Error loading CRM leads:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchDbUsers();
  }, []);

  const dbLeads = dbUsers.map(u => ({
    id: `db-${u.id}`,
    name: u.user_name,
    company: u.company_name,
    email: u.email,
    phone: u.mobile_number,
    source: 'Website',
    status: 'New',
    value: '₹2,50,000',
    assigned: 'VasifyTech System'
  }));

  const combinedLeads = [...dbLeads, ...data.crm.leads];
  const totalLeadsCount = Math.max(1, combinedLeads.length);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      {/* ── Sub Navigation Tabs ── */}
      <div className="vt-crm-subnav">
        <Link href="/app/crm" className="btn btn-sm btn-brass">Dashboard</Link>
        <Link href="/app/crm/leads" className="btn btn-sm btn-ghost">Leads Directory</Link>
        <Link href="/app/crm/clients" className="btn btn-sm btn-ghost">Clients</Link>
        <Link href="/app/crm/pipeline" className="btn btn-sm btn-ghost">Deal Pipeline</Link>
        <Link href="/app/crm/invoices" className="btn btn-sm btn-ghost">Invoices</Link>
        <Link href="/app/crm/users" className="btn btn-sm btn-ghost">Registered Users (MySQL)</Link>
      </div>

      {/* ── Overview Top Bar ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Overview</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select 
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className="vt-input"
            style={{ height: '36px', fontSize: '13px', borderRadius: '10px', padding: '0 12px', background: '#fff' }}
          >
            <option value="Last 30 days">📅 Last 30 days</option>
            <option value="This Month">📅 This Month</option>
            <option value="Last Quarter">📅 Last Quarter</option>
          </select>

          <span style={{ 
            fontSize: '12px', fontWeight: 700, padding: '6px 12px', borderRadius: '20px', 
            background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
            Live
          </span>

          <button onClick={fetchDbUsers} className="btn btn-secondary btn-sm" style={{ height: '36px', width: '36px', padding: 0, display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
            <RefreshCw size={15} className={loadingUsers ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* ── 1. LEAD PIPELINE ── */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#6366f1', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '16px', height: '3px', background: '#6366f1', borderRadius: '2px' }}></span>
          LEAD PIPELINE
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          
          <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>TOTAL LEADS</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={16} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>{totalLeadsCount}</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ all leads</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>WON DEALS</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle2 size={16} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>1</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ closed</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>PIPELINE VALUE</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrendingUp size={16} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>₹15,000</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ total amount</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(234, 88, 12, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>EXPECTED VALUE</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DollarSign size={16} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>₹4,500</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ what you'll collect</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>FOLLOW-UPS</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bell size={16} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>0</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ all clear ✓</div>
          </div>

        </div>
      </div>

      {/* ── 2. CLIENT PORTFOLIO ── */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#059669', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '16px', height: '3px', background: '#059669', borderRadius: '2px' }}></span>
          CLIENT PORTFOLIO
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          
          <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>TOTAL CLIENTS</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={16} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>0</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ all clients</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>ACTIVE</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserCheck size={16} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>0</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ 0% of total</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>PROSPECTS</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Clock size={16} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>0</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ 0 inactive</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #075985 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>TOTAL DEAL VALUE</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrendingUp size={16} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>₹0</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ no payments yet</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #059669 0%, #065f46 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>PAYMENTS</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DollarSign size={16} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>₹0</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ fully collected ✓</div>
          </div>

        </div>
      </div>

      {/* ── 3. INVOICES & RETAINERS (PLACED DIRECTLY BELOW CLIENT PORTFOLIO) ── */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#d97706', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '16px', height: '3px', background: '#d97706', borderRadius: '2px' }}></span>
          INVOICES & RETAINERS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '20px' }}>
          
          <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>REVENUE</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrendingUp size={16} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>₹0</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ +0.0%</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>MONTHLY RECURRING</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Activity size={16} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>₹0</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ ARR ₹0</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>AVG. INVOICE VALUE</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={16} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>₹0</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ 0 paid invoices</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>OVERDUE INVOICES</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={16} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>0</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ All clear</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>RETAINER RENEWALS</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bell size={16} /></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>0</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ All clear ✓</div>
          </div>

        </div>

        {/* REVENUE & DEALS CLOSED CHARTS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
          
          <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Revenue & deals closed</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>Last 30 days</p>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#6366f1' }}>✨ ₹0</span>
            </div>

            <div style={{ height: '180px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="deals" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4, fill: '#0284c7' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '12px', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6366f1' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }}></span> Revenue collected
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284c7' }}></span> Deals closed (count ×1000)
              </span>
            </div>
          </div>

          <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Sales pipeline</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>Leads by current stage</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '140px', height: '140px', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>1</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>total leads</span>
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {pieData.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink)', fontWeight: 600 }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}></span>
                      {item.name}
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--text-dim)' }}>{item.value > 0 ? '100%' : '0%'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── 4. NEEDS YOUR ATTENTION ── */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#dc2626', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '16px', height: '3px', background: '#dc2626', borderRadius: '2px' }}></span>
          NEEDS YOUR ATTENTION
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          
          <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#94a3b8' }}>0</div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                <PhoneCall size={18} />
              </div>
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: '0 0 4px 0' }}>Overdue follow-ups</h4>
            <p style={{ fontSize: '12.5px', color: 'var(--text-dim)', margin: '0 0 16px 0' }}>Leads that missed scheduled callback</p>
            <Link href="/app/crm/leads" className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center', borderRadius: '10px' }}>
              View leads →
            </Link>
          </div>

          <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#94a3b8' }}>0</div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                <FileText size={18} />
              </div>
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: '0 0 4px 0' }}>Overdue invoices</h4>
            <p style={{ fontSize: '12.5px', color: 'var(--text-dim)', margin: '0 0 16px 0' }}>All invoices collected</p>
            <Link href="/app/crm/invoices" className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center', borderRadius: '10px' }}>
              View invoices →
            </Link>
          </div>

          <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#94a3b8' }}>0</div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                <Bell size={18} />
              </div>
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: '0 0 4px 0' }}>Retainer renewals due</h4>
            <p style={{ fontSize: '12.5px', color: 'var(--text-dim)', margin: '0 0 16px 0' }}>Within next 7 days</p>
            <Link href="/app/crm/clients" className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center', borderRadius: '10px' }}>
              Manage retainers →
            </Link>
          </div>

        </div>
      </div>

      {/* ── 5. LEAD VOLUME & ACTIVITY ── */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#0284c7', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '16px', height: '3px', background: '#0284c7', borderRadius: '2px' }}></span>
          LEAD VOLUME & ACTIVITY
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          
          <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Lead volume</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>New leads - Last 30 days</p>
              </div>
              <span className="badge badge-green" style={{ fontSize: '11px' }}>0 total</span>
            </div>

            <div style={{ height: '140px', width: '100%', marginBottom: '16px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="deals" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4, fill: '#0284c7' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#0284c7' }}>LATEST BUCKET</span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)', marginTop: '2px' }}>0</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>AVG / PERIOD</span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)', marginTop: '2px' }}>0</div>
              </div>
            </div>
          </div>

          <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Pipeline funnel</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>Stage-by-stage volume</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'New Leads', count: 0 },
                { label: 'Demo', count: 0 },
                { label: 'Proposal', count: 0 },
                { label: 'Negotiation', count: 0 },
                { label: 'Won', count: 1 },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: item.count > 0 ? '#10b981' : 'var(--text-dim)' }}>{item.count}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>Lead → Won rate</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#10b981' }}>100%</span>
            </div>
          </div>

          <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Recent activity</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>Latest leads & conversions</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#dbeafe', color: '#1d4ed8', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  V
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--ink)' }}>Varby</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>New lead · whatsapp</div>
                </div>
                <span style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600 }}>43d ago</span>
              </div>

              {dbUsers.slice(0, 2).map((u) => (
                <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ecfdf5', color: '#047857', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {u.user_name.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--ink)' }}>{u.user_name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{u.company_name} · registered</div>
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600 }}>Recently</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── 6. RECURRING BUSINESS ── */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#7c3aed', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '16px', height: '3px', background: '#7c3aed', borderRadius: '2px' }}></span>
          RECURRING BUSINESS
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
          
          <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Upcoming retainer renewals</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>Active clients renewing within 30 days</p>
              </div>
              <span className="badge badge-green" style={{ fontSize: '11px' }}>All clear</span>
            </div>

            <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-dim)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#10b981' }}>
                <CheckCircle2 size={20} />
              </div>
              <p style={{ fontSize: '13px', fontWeight: 600, margin: 0 }}>No renewals due in 30 days</p>
            </div>
          </div>

          <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>Clients by service</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>Share of your active service lines</p>
              </div>
              <span className="badge badge-green" style={{ fontSize: '11px' }}>0 clients</span>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-dim)', textAlign: 'center', margin: '16px 0 24px' }}>No clients yet</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '12px', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#6366f1' }}>MRR</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', marginTop: '2px' }}>₹0</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '12px', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#6366f1' }}>ARR</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', marginTop: '2px' }}>₹0</div>
              </div>
              <div style={{ background: '#ecfdf5', padding: '10px 12px', borderRadius: '12px', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#047857' }}>WIN RATE</span>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#047857', marginTop: '2px' }}>100.0%</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
