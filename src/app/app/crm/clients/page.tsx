'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Users, UserCheck, TrendingUp, DollarSign, Plus, Search, Download, X, 
  Building, Calendar, Filter, Clock, Phone, Mail, FileText, CheckCircle2, 
  ArrowUpRight, Trash2, Edit3, Sparkles, ChevronDown, Layers
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface ClientRecord {
  id: string;
  name: string;
  company: string;
  phone: string;
  email?: string;
  service: string;
  assignedUser: string;
  status: 'Active' | 'Prospect' | 'Inactive';
  closureDate?: string;
  dealValue: number;
  paidAmount: number;
  dueAmount: number;
  createdAt: string;
}

export default function ClientsPage() {
  const { data } = useApp();
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusTab, setStatusTab] = useState<'All' | 'Active' | 'Prospect' | 'Inactive'>('All');
  const [selectedService, setSelectedService] = useState('All Services');
  const [selectedUser, setSelectedUser] = useState('All Users');
  const [selectedMonth, setSelectedMonth] = useState('All Months');

  // Add Client Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: 'Web Development',
    assignedUser: 'VasifyTech Member',
    status: 'Active' as const,
    closureDate: new Date().toISOString().split('T')[0],
    dealValue: '0',
    paidAmount: '0'
  });

  // Load registered MySQL users as clients if available
  const fetchDbClients = async () => {
    setLoading(true);
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
            const dbList: ClientRecord[] = result.users.map((u: any) => ({
              id: `client-db-${u.id}`,
              name: u.user_name,
              company: u.company_name,
              phone: u.mobile_number,
              email: u.email,
              service: u.service_needed || 'Full Suite',
              assignedUser: 'System Admin',
              status: 'Active',
              closureDate: new Date().toISOString().split('T')[0],
              dealValue: 50000,
              paidAmount: 50000,
              dueAmount: 0,
              createdAt: u.created_at || new Date().toISOString()
            }));
            setClients(dbList);
          }
        } catch (e) {}
      }
    } catch (err) {
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDbClients();
  }, []);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusTab('All');
    setSelectedService('All Services');
    setSelectedUser('All Users');
    setSelectedMonth('All Months');
  };

  const isFiltered = searchTerm || statusTab !== 'All' || selectedService !== 'All Services' || selectedUser !== 'All Users' || selectedMonth !== 'All Months';

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.phone.includes(searchTerm) ||
                          (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusTab === 'All' || c.status === statusTab;
    const matchesService = selectedService === 'All Services' || c.service === selectedService;
    const matchesUser = selectedUser === 'All Users' || c.assignedUser === selectedUser;

    return matchesSearch && matchesStatus && matchesService && matchesUser;
  });

  // Calculate Metrics
  const totalClientsCount = clients.length;
  const activeCount = clients.filter(c => c.status === 'Active').length;
  const prospectCount = clients.filter(c => c.status === 'Prospect').length;
  const inactiveCount = clients.filter(c => c.status === 'Inactive').length;
  const totalDealValue = clients.reduce((sum, c) => sum + (c.dealValue || 0), 0);
  const totalPayments = clients.reduce((sum, c) => sum + (c.paidAmount || 0), 0);

  const handleAddClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name || !addForm.company) return;

    const dealVal = Number(addForm.dealValue) || 0;
    const paidVal = Number(addForm.paidAmount) || 0;

    const newClient: ClientRecord = {
      id: `client-${Date.now()}`,
      name: addForm.name,
      company: addForm.company,
      phone: addForm.phone,
      email: addForm.email,
      service: addForm.service,
      assignedUser: addForm.assignedUser,
      status: addForm.status,
      closureDate: addForm.closureDate,
      dealValue: dealVal,
      paidAmount: paidVal,
      dueAmount: Math.max(0, dealVal - paidVal),
      createdAt: new Date().toISOString()
    };

    setClients(prev => [newClient, ...prev]);
    setIsAddModalOpen(false);
    setAddForm({
      name: '',
      company: '',
      phone: '',
      email: '',
      service: 'Web Development',
      assignedUser: 'VasifyTech Member',
      status: 'Active',
      closureDate: new Date().toISOString().split('T')[0],
      dealValue: '0',
      paidAmount: '0'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingBottom: '40px' }}>
      
      {/* ── Sub Navigation Tabs ── */}
      <div className="vt-crm-subnav">
        <Link href="/app/crm" className="btn btn-sm btn-ghost">Dashboard</Link>
        <Link href="/app/crm/leads" className="btn btn-sm btn-ghost">Leads Directory</Link>
        <Link href="/app/crm/clients" className="btn btn-sm btn-brass">Clients</Link>
        <Link href="/app/crm/pipeline" className="btn btn-sm btn-ghost">Deal Pipeline</Link>
        <Link href="/app/crm/invoices" className="btn btn-sm btn-ghost">Invoices</Link>
        <Link href="/app/crm/users" className="btn btn-sm btn-ghost">Registered Users (MySQL)</Link>
      </div>

      {/* ── Page Title Row ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Client Directory</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>
            {totalClientsCount} clients registered
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn btn-secondary btn-sm" style={{ height: '36px', borderRadius: '10px' }}>
            <Download size={14} /> Export
          </button>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-brass btn-sm" 
            style={{ height: '36px', borderRadius: '10px', background: '#2563eb', borderColor: '#2563eb', color: '#fff' }}
          >
            <Plus size={15} /> Add Client
          </button>
        </div>
      </div>

      {/* ── Top Summary Stat Cards (5 Pill Cards) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        
        <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
            <span style={{ fontSize: '11px', fontWeight: 700 }}>TOTAL CLIENTS</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={16} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>{totalClientsCount}</div>
          <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ all clients</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
            <span style={{ fontSize: '11px', fontWeight: 700 }}>ACTIVE</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={16} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>{activeCount}</div>
          <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ {totalClientsCount > 0 ? ((activeCount / totalClientsCount) * 100).toFixed(0) : 0}% of total</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(234, 88, 12, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
            <span style={{ fontSize: '11px', fontWeight: 700 }}>PROSPECTS</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={16} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>{prospectCount}</div>
          <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ {inactiveCount} inactive</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
            <span style={{ fontSize: '11px', fontWeight: 700 }}>TOTAL DEAL VALUE</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={16} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>₹{totalDealValue.toLocaleString()}</div>
          <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ no payments yet</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderRadius: '16px', padding: '18px 20px', color: '#fff', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.9 }}>
            <span style={{ fontSize: '11px', fontWeight: 700 }}>PAYMENTS</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={16} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 4px' }}>₹{totalPayments.toLocaleString()}</div>
          <div style={{ fontSize: '12px', opacity: 0.85 }}>↗ fully collected ✓</div>
        </div>

      </div>

      {/* ── Monthly Payment Tracker Card ── */}
      <div className="vt-card" style={{ padding: '20px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Calendar size={18} color="#6366f1" />
          <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Monthly Payment Tracker</h4>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>· by Payment Date</span>
        </div>

        <div style={{ padding: '30px 20px', textAlign: 'center', color: '#94a3b8', fontSize: '13px', background: '#f8fafc', borderRadius: '12px', border: '1px border-dashed #e2e8f0' }}>
          No payments recorded yet — use a client's Deal Value column → "Add Payment" to log a dated payment, and it'll show up here.
        </div>
      </div>

      {/* ── Filter Toolbar Card ── */}
      <div className="vt-card" style={{ padding: '18px', borderRadius: '18px', background: '#fff', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Top Controls Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Search name, phone, company..."
              className="vt-input"
              style={{ paddingLeft: '34px', height: '38px', fontSize: '13px', borderRadius: '10px' }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Segmented Pill Tabs */}
          <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            {[
              { label: 'All', count: totalClientsCount },
              { label: 'Active', count: activeCount },
              { label: 'Prospect', count: prospectCount },
              { label: 'Inactive', count: inactiveCount },
            ].map(tabItem => (
              <button
                key={tabItem.label}
                onClick={() => setStatusTab(tabItem.label as any)}
                style={{
                  background: statusTab === tabItem.label ? '#fff' : 'transparent',
                  border: 'none', borderRadius: '16px', padding: '5px 14px',
                  fontSize: '12.5px', fontWeight: statusTab === tabItem.label ? 800 : 600,
                  color: statusTab === tabItem.label ? 'var(--ink)' : 'var(--text-dim)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                  boxShadow: statusTab === tabItem.label ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {tabItem.label} <span style={{ fontSize: '11px', color: '#64748b' }}>{tabItem.count}</span>
              </button>
            ))}
          </div>

          <span style={{ fontSize: '12.5px', color: '#94a3b8', fontWeight: 600 }}>
            {filteredClients.length} of {totalClientsCount} clients
          </span>
        </div>

        {/* Dropdown Filters Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={13} /> Filters:
          </span>

          {/* Service Dropdown */}
          <select
            value={selectedService}
            onChange={e => setSelectedService(e.target.value)}
            className="vt-input"
            style={{ height: '36px', fontSize: '12.5px', borderRadius: '10px', width: '160px', background: selectedService !== 'All Services' ? '#eff6ff' : '#fff', color: selectedService !== 'All Services' ? '#2563eb' : 'inherit', fontWeight: 600 }}
          >
            <option value="All Services">All Services</option>
            <option value="WhatsApp API">WhatsApp API</option>
            <option value="Web Development">Web Development</option>
            <option value="SEO / Marketing">SEO / Marketing</option>
            <option value="Social Media">Social Media</option>
            <option value="CRM Development">CRM Development</option>
            <option value="App Development">App Development</option>
            <option value="Cloud & Hosting">Cloud & Hosting</option>
            <option value="IT Support">IT Support</option>
            <option value="Other">Other</option>
          </select>

          {/* User Dropdown */}
          <select
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
            className="vt-input"
            style={{ height: '36px', fontSize: '12.5px', borderRadius: '10px', width: '130px', background: selectedUser !== 'All Users' ? '#eff6ff' : '#fff', color: selectedUser !== 'All Users' ? '#2563eb' : 'inherit', fontWeight: 600 }}
          >
            <option value="All Users">All Users</option>
            <option value="Unassigned">Unassigned</option>
            <option value="System Admin">System Admin</option>
          </select>

          {/* Month Dropdown */}
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="vt-input"
            style={{ height: '36px', fontSize: '12.5px', borderRadius: '10px', width: '130px', background: selectedMonth !== 'All Months' ? '#eff6ff' : '#fff', color: selectedMonth !== 'All Months' ? '#2563eb' : 'inherit', fontWeight: 600 }}
          >
            <option value="All Months">All Months</option>
            {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          {isFiltered && (
            <button 
              onClick={clearFilters}
              style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', padding: '0 8px', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>

      </div>

      {/* ── Client Data Table ── */}
      <div className="vt-table-container">
        <table className="vt-table">
          <thead>
            <tr>
              <th>CLIENT / COMPANY</th>
              <th>SERVICE</th>
              <th>USER</th>
              <th>STATUS</th>
              <th>CLOSURE DATE</th>
              <th>DEAL VALUE</th>
              <th>DUE</th>
              <th style={{ textAlign: 'center' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-dim)' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#94a3b8' }}>
                    <Building size={24} />
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 4px 0' }}>
                    {isFiltered ? 'No clients match your filters' : 'No clients yet'}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-dim)', margin: 0 }}>
                    {isFiltered ? 'Try clearing your filters or changing search keywords.' : 'Add your first client to get started.'}
                  </p>
                  {isFiltered && (
                    <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, marginTop: '10px', cursor: 'pointer' }}>
                      Clear filters
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: '#2563eb', color: '#fff', fontWeight: 800, fontSize: '14px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}>
                        {client.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '14px' }}>{client.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{client.company}</div>
                        <div style={{ fontSize: '11.5px', color: '#2563eb', fontWeight: 600 }}>{client.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-green" style={{ fontSize: '11.5px', fontWeight: 700 }}>
                      {client.service}
                    </span>
                  </td>
                  <td style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 600 }}>
                    {client.assignedUser}
                  </td>
                  <td>
                    <span style={{
                      padding: '4px 10px', borderRadius: '12px', fontSize: '11.5px', fontWeight: 700,
                      background: client.status === 'Active' ? '#ecfdf5' : client.status === 'Prospect' ? '#fffbeb' : '#f1f5f9',
                      color: client.status === 'Active' ? '#047857' : client.status === 'Prospect' ? '#b45309' : '#64748b'
                    }}>
                      {client.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '12.5px', color: 'var(--text-dim)', fontWeight: 600 }}>
                    {client.closureDate || '—'}
                  </td>
                  <td style={{ fontWeight: 800, color: 'var(--ink)' }}>
                    ₹{client.dealValue.toLocaleString()}
                  </td>
                  <td style={{ fontWeight: 700, color: client.dueAmount > 0 ? '#dc2626' : '#047857' }}>
                    ₹{client.dueAmount.toLocaleString()}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => setClients(prev => prev.filter(c => c.id !== client.id))}
                      className="btn btn-sm btn-ghost"
                      style={{ color: '#ef4444', padding: '4px 8px' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── ADD NEW CLIENT MODAL ── */}
      {isAddModalOpen && (
        <div className="vt-modal-overlay">
          <div className="vt-modal" style={{ padding: '24px', maxWidth: '520px', width: '90%' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Add New Client Account</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>
                  Register a client record into your CRM portfolio.
                </p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddClientSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="vt-label">CLIENT NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="vt-input"
                  value={addForm.name}
                  onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                />
              </div>

              <div>
                <label className="vt-label">COMPANY / BUSINESS NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sharma Tech Solutions"
                  className="vt-input"
                  value={addForm.company}
                  onChange={e => setAddForm({ ...addForm, company: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="vt-label">PHONE NUMBER *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="vt-input"
                    value={addForm.phone}
                    onChange={e => setAddForm({ ...addForm, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="vt-label">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    className="vt-input"
                    value={addForm.email}
                    onChange={e => setAddForm({ ...addForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="vt-label">SERVICE</label>
                  <select
                    className="vt-input"
                    value={addForm.service}
                    onChange={e => setAddForm({ ...addForm, service: e.target.value })}
                  >
                    <option value="WhatsApp API">WhatsApp API</option>
                    <option value="Web Development">Web Development</option>
                    <option value="SEO / Marketing">SEO / Marketing</option>
                    <option value="Social Media">Social Media</option>
                    <option value="CRM Development">CRM Development</option>
                    <option value="App Development">App Development</option>
                    <option value="Cloud & Hosting">Cloud & Hosting</option>
                    <option value="IT Support">IT Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="vt-label">STATUS</label>
                  <select
                    className="vt-input"
                    value={addForm.status}
                    onChange={e => setAddForm({ ...addForm, status: e.target.value as any })}
                  >
                    <option value="Active">Active</option>
                    <option value="Prospect">Prospect</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="vt-label">DEAL VALUE (₹)</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="vt-input"
                    value={addForm.dealValue}
                    onChange={e => setAddForm({ ...addForm, dealValue: e.target.value })}
                  />
                </div>

                <div>
                  <label className="vt-label">PAID AMOUNT (₹)</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="vt-input"
                    value={addForm.paidAmount}
                    onChange={e => setAddForm({ ...addForm, paidAmount: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-brass" style={{ background: '#2563eb', borderColor: '#2563eb', color: '#fff', padding: '10px 20px' }}>
                  Create Client
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
