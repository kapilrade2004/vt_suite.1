'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  RefreshCw, Plus, Search, Filter, Calendar, CheckCircle2, TrendingUp, 
  Clock, AlertCircle, DollarSign, X, ChevronDown, Bell, CreditCard, ChevronLeft, ChevronRight
} from 'lucide-react';

interface RetainerRecord {
  id: string;
  client: string;
  service: string;
  monthlyAmount: number;
  startDate: string;
  renewalDate: string;
  daysLeft: number;
  status: 'Active' | 'Inactive' | 'Expired';
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
}

export default function RetainersPage() {
  const { data } = useApp();
  const [retainers, setRetainers] = useState<RetainerRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'retainers' | 'tracker'>('retainers');
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusTab, setStatusTab] = useState<'All' | 'Active' | 'Inactive' | 'Expired'>('All');

  // Add Retainer Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    client: '',
    service: 'WhatsApp Marketing',
    monthlyAmount: '0',
    startDate: new Date().toISOString().split('T')[0],
    renewalDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    status: 'Active' as const,
    paymentStatus: 'Pending' as const
  });

  const filteredRetainers = retainers.filter(r => {
    const matchesSearch = r.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusTab === 'All' || r.status === statusTab;
    return matchesSearch && matchesStatus;
  });

  const totalCount = retainers.length;
  const activeCount = retainers.filter(r => r.status === 'Active').length;
  const inactiveCount = retainers.filter(r => r.status === 'Inactive').length;
  const expiredCount = retainers.filter(r => r.status === 'Expired').length;
  const mrrTotal = retainers.reduce((sum, r) => sum + (r.monthlyAmount || 0), 0);

  const handleAddRetainerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.client) return;

    const amt = Number(addForm.monthlyAmount) || 0;
    const newRetainer: RetainerRecord = {
      id: `ret-${Date.now()}`,
      client: addForm.client,
      service: addForm.service,
      monthlyAmount: amt,
      startDate: addForm.startDate,
      renewalDate: addForm.renewalDate,
      daysLeft: 30,
      status: addForm.status,
      paymentStatus: addForm.paymentStatus
    };

    setRetainers(prev => [newRetainer, ...prev]);
    setIsAddModalOpen(false);
    setAddForm({
      client: '',
      service: 'WhatsApp Marketing',
      monthlyAmount: '0',
      startDate: new Date().toISOString().split('T')[0],
      renewalDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      status: 'Active',
      paymentStatus: 'Pending'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      
      {/* ── Sub Navigation Tabs ── */}
      <div className="vt-crm-subnav">
        <Link href="/app/crm" className="btn btn-sm btn-ghost">Dashboard</Link>
        <Link href="/app/crm/leads" className="btn btn-sm btn-ghost">Leads Directory</Link>
        <Link href="/app/crm/clients" className="btn btn-sm btn-ghost">Clients</Link>
        <Link href="/app/crm/retainers" className="btn btn-sm btn-brass">Retainers</Link>
        <Link href="/app/crm/pipeline" className="btn btn-sm btn-ghost">Deal Pipeline</Link>
        <Link href="/app/crm/invoices" className="btn btn-sm btn-ghost">Invoices</Link>
        <Link href="/app/crm/reports" className="btn btn-sm btn-ghost">Reports</Link>
        <Link href="/app/crm/users" className="btn btn-sm btn-ghost">Registered Users (MySQL)</Link>
      </div>

      {/* ── Page Header Row ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Retainer Management</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>
            {activeCount} active retainers · MRR ₹{mrrTotal.toLocaleString()}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="vt-input"
            style={{ height: '36px', fontSize: '13px', borderRadius: '10px', padding: '0 12px', background: '#fff' }}
          >
            <option value="September 2026">📅 September 2026</option>
            <option value="August 2026">📅 August 2026</option>
            <option value="July 2026">📅 July 2026</option>
          </select>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-brass btn-sm" 
            style={{ height: '36px', borderRadius: '10px', background: '#2563eb', borderColor: '#2563eb', color: '#fff' }}
          >
            <Plus size={15} /> Add Retainer
          </button>
        </div>
      </div>

      {/* ── Stat Summary Row 1 (4 Stat Cards) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px' }}>
        
        <div className="vt-card" style={{ padding: '18px 20px', borderRadius: '16px', background: '#fff', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: 'var(--ink)' }}>{activeCount}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', marginTop: '2px' }}>Active Retainers</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="vt-card" style={{ padding: '18px 20px', borderRadius: '16px', background: '#fff', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: 'var(--ink)' }}>₹{mrrTotal.toLocaleString()}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', marginTop: '2px' }}>Monthly Recurring Revenue</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={20} />
          </div>
        </div>

        <div className="vt-card" style={{ padding: '18px 20px', borderRadius: '16px', background: '#fff', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: 'var(--ink)' }}>0</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', marginTop: '2px' }}>Renewing Soon (30d)</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} />
          </div>
        </div>

        <div className="vt-card" style={{ padding: '18px 20px', borderRadius: '16px', background: '#fff', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: 'var(--ink)' }}>0</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', marginTop: '2px' }}>Expired / Overdue</div>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#f8fafc', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertCircle size={20} />
          </div>
        </div>

      </div>

      {/* ── Payment Summary Card Row ── */}
      <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <CreditCard size={18} color="#10b981" />
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
            Payment Summary <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>— {selectedMonth}</span>
          </h4>
          <span style={{ fontSize: '11px', fontWeight: 700, background: '#ecfdf5', color: '#047857', padding: '3px 10px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
            0 of 0 paid
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          
          <div style={{ background: '#f8fafc', padding: '16px 18px', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ink)' }}>₹0</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', marginTop: '2px' }}>Expected This Month</div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>0 active retainers</div>
          </div>

          <div style={{ background: '#f0fdf4', padding: '16px 18px', borderRadius: '14px', border: '1px solid #dcfce7' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#16a34a' }}>₹0</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', marginTop: '2px' }}>Received This Month</div>
            <div style={{ fontSize: '11px', color: '#16a34a', marginTop: '2px' }}>0 paid</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px 18px', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ink)' }}>₹0</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginTop: '2px' }}>Pending Collection</div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>0 not paid yet</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px 18px', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#6366f1' }}>0%</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#4f46e5', marginTop: '2px' }}>Collection Rate</div>
            <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', marginTop: '8px' }}></div>
          </div>

        </div>
      </div>

      {/* ── Main Tab Switcher ── */}
      <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '16px', border: '1px solid #e2e8f0', width: 'fit-content' }}>
        <button
          onClick={() => setActiveTab('retainers')}
          style={{
            background: activeTab === 'retainers' ? '#fff' : 'transparent',
            border: 'none', borderRadius: '12px', padding: '8px 18px',
            fontSize: '13px', fontWeight: 800, color: activeTab === 'retainers' ? 'var(--ink)' : 'var(--text-dim)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: activeTab === 'retainers' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <RefreshCw size={14} /> Retainers
        </button>

        <button
          onClick={() => setActiveTab('tracker')}
          style={{
            background: activeTab === 'tracker' ? '#fff' : 'transparent',
            border: 'none', borderRadius: '12px', padding: '8px 18px',
            fontSize: '13px', fontWeight: 800, color: activeTab === 'tracker' ? 'var(--ink)' : 'var(--text-dim)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: activeTab === 'tracker' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <CreditCard size={14} /> Payment Tracker
        </button>
      </div>

      {/* ── MAIN CONTENT (GRID: LEFT TABLE + RIGHT SIDE PANEL) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '18px' }}>
        
        {/* Left Side: Table Card */}
        <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RefreshCw size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Monthly Retainer Clients</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>WhatsApp · Website · CRM · LMS · Digital Marketing</p>
              </div>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)' }}>{totalCount} total</span>
          </div>

          {/* Filters Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="text"
                placeholder="Search by client name..."
                className="vt-input"
                style={{ paddingLeft: '34px', height: '36px', fontSize: '12.5px', borderRadius: '10px' }}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                {[
                  { label: 'All', count: totalCount },
                  { label: 'Active', count: activeCount },
                  { label: 'Inactive', count: inactiveCount },
                  { label: 'Expired', count: expiredCount }
                ].map(t => (
                  <button
                    key={t.label}
                    onClick={() => setStatusTab(t.label as any)}
                    style={{
                      background: statusTab === t.label ? '#fff' : 'transparent',
                      border: 'none', borderRadius: '10px', padding: '4px 10px',
                      fontSize: '12px', fontWeight: statusTab === t.label ? 700 : 500,
                      color: statusTab === t.label ? 'var(--ink)' : 'var(--text-dim)',
                      cursor: 'pointer'
                    }}
                  >
                    {t.label} {t.count}
                  </button>
                ))}
              </div>

              <button className="btn btn-secondary btn-sm" style={{ height: '36px', borderRadius: '10px' }}>
                <Filter size={13} /> Filters
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="vt-table-container">
            <table className="vt-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Monthly Amt</th>
                  <th>Start Date</th>
                  <th>Renewal Date</th>
                  <th>Days Left</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRetainers.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-dim)' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#94a3b8' }}>
                        <RefreshCw size={24} />
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 4px 0' }}>
                        No retainers yet. Add your first recurring client!
                      </h4>
                    </td>
                  </tr>
                ) : (
                  filteredRetainers.map(r => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 800, color: 'var(--ink)' }}>{r.client}</td>
                      <td>
                        <span className="badge badge-green" style={{ fontSize: '11px' }}>{r.service}</span>
                      </td>
                      <td style={{ fontWeight: 800, color: 'var(--ink)' }}>₹{r.monthlyAmount.toLocaleString()}</td>
                      <td style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>{r.startDate}</td>
                      <td style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>{r.renewalDate}</td>
                      <td style={{ fontWeight: 700, color: '#2563eb' }}>{r.daysLeft}d</td>
                      <td>
                        <span style={{ padding: '3px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 700, background: '#ecfdf5', color: '#047857' }}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '12.5px', color: 'var(--text-dim)' }}>
            <div>Showing 0-0 of {totalCount} retainers</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <select className="vt-input" style={{ height: '30px', fontSize: '12px', padding: '0 8px' }}>
                <option value="10">10 / p</option>
                <option value="25">25 / p</option>
              </select>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button className="btn btn-secondary btn-sm" disabled style={{ padding: '4px 8px' }}><ChevronLeft size={14} /></button>
                <button className="btn btn-brass btn-sm" style={{ padding: '4px 10px', background: '#2563eb', color: '#fff' }}>1</button>
                <button className="btn btn-secondary btn-sm" disabled style={{ padding: '4px 8px' }}><ChevronRight size={14} /></button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Upcoming Renewals Side Panel */}
        <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Bell size={18} color="#f97316" />
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Upcoming Renewals</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>Next 30 days</p>
            </div>
          </div>

          <div style={{ background: '#ecfdf5', padding: '12px 14px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #a7f3d0' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#047857', letterSpacing: '0.05em' }}>MONTHLY RECURRING REVENUE</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#047857', marginTop: '2px' }}>₹{mrrTotal.toLocaleString()}</div>
          </div>

          <div style={{ padding: '30px 10px', textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#10b981' }}>
              <CheckCircle2 size={20} />
            </div>
            <p style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-dim)', margin: 0 }}>
              No renewals due in the next 30 days
            </p>
          </div>
        </div>

      </div>

      {/* ── ADD NEW RETAINER MODAL ── */}
      {isAddModalOpen && (
        <div className="vt-modal-overlay">
          <div className="vt-modal" style={{ padding: '24px', maxWidth: '500px', width: '90%' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Add Recurring Retainer Client</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>
                  Register a monthly retainer agreement to track MRR & renewals.
                </p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddRetainerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="vt-label">CLIENT NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corporation"
                  className="vt-input"
                  value={addForm.client}
                  onChange={e => setAddForm({ ...addForm, client: e.target.value })}
                />
              </div>

              <div>
                <label className="vt-label">SERVICE LINE</label>
                <select
                  className="vt-input"
                  value={addForm.service}
                  onChange={e => setAddForm({ ...addForm, service: e.target.value })}
                >
                  <option value="WhatsApp Marketing">WhatsApp Marketing</option>
                  <option value="Website Maintenance">Website Maintenance</option>
                  <option value="CRM Support">CRM Support</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Cloud Hosting">Cloud Hosting</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="vt-label">MONTHLY AMOUNT (₹)</label>
                  <input
                    type="number"
                    placeholder="15000"
                    className="vt-input"
                    value={addForm.monthlyAmount}
                    onChange={e => setAddForm({ ...addForm, monthlyAmount: e.target.value })}
                  />
                </div>

                <div>
                  <label className="vt-label">START DATE</label>
                  <input
                    type="date"
                    className="vt-input"
                    value={addForm.startDate}
                    onChange={e => setAddForm({ ...addForm, startDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="vt-label">RENEWAL DATE</label>
                <input
                  type="date"
                  className="vt-input"
                  value={addForm.renewalDate}
                  onChange={e => setAddForm({ ...addForm, renewalDate: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-brass" style={{ background: '#2563eb', borderColor: '#2563eb', color: '#fff', padding: '10px 20px' }}>
                  Create Retainer
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
