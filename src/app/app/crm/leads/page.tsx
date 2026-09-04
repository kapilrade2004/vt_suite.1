'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Plus, Search, Download, X, Building, RefreshCw, Filter, Calendar, 
  ChevronDown, Check, ArrowUpRight, Upload, Phone, Mail, FileText, 
  Kanban, List, Sparkles, Trash2, Edit3, UserCheck, AlertCircle, Clock, Bell
} from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  company: string;
  referred_by?: string;
  service: string;
  source: string;
  stage: 'Lead' | 'Demo' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  priority: 'High' | 'Medium' | 'Low';
  totalAmount: number;
  expectedAmount: number;
  expectedClosure?: string;
  followUpDate?: string;
  notes?: string;
  createdAt: string;
}

const initialSampleLeads: LeadItem[] = [
  {
    id: 'lead-varby-1',
    name: 'Varby',
    phone: '+919309154780',
    whatsapp: '+919309154780',
    email: 'varby@shambu.com',
    company: 'Shambu Nagar Enterprises',
    service: 'WhatsApp',
    source: 'WhatsApp',
    stage: 'Won',
    priority: 'Medium',
    totalAmount: 15000,
    expectedAmount: 4500,
    followUpDate: '2026-10-02',
    createdAt: new Date(Date.now() - 43 * 86400000).toISOString()
  }
];

export default function LeadsDirectoryPage() {
  const { data } = useApp();
  const [leads, setLeads] = useState<LeadItem[]>(initialSampleLeads);
  const [viewMode, setViewMode] = useState<'list' | 'board'>('board');
  const [loading, setLoading] = useState(false);

  // Drag & Drop States
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('All Stages');
  const [selectedService, setSelectedService] = useState<string>('All Services');
  const [selectedPriority, setSelectedPriority] = useState<string>('All Priority');

  // Add Lead Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    company: '',
    referred_by: '',
    service: 'Website',
    source: 'Manual / Direct',
    stage: 'Lead' as LeadItem['stage'],
    priority: 'Medium' as LeadItem['priority'],
    totalAmount: '0',
    expectedAmount: '0',
    expectedClosure: '',
    followUpDate: '',
    notes: ''
  });

  // Fetch Users from Database to populate leads
  const fetchDbUsers = async () => {
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
            const fetchedLeads: LeadItem[] = result.users.map((u: any) => ({
              id: `db-lead-${u.id}`,
              name: u.user_name,
              phone: u.mobile_number,
              email: u.email,
              company: u.company_name,
              service: u.service_needed || 'CRM & Sales',
              source: 'Website Registration',
              stage: 'Lead',
              priority: 'Medium',
              totalAmount: 25000,
              expectedAmount: 12500,
              followUpDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
              createdAt: u.created_at || new Date().toISOString()
            }));

            // Merge with local sample leads avoiding duplicates
            setLeads(prev => {
              const combined = [...initialSampleLeads];
              fetchedLeads.forEach(fl => {
                if (!combined.some(c => c.id === fl.id || c.email === fl.email)) {
                  combined.push(fl);
                }
              });
              return combined;
            });
          }
        } catch (e) {}
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDbUsers();
  }, []);

  const clearAllFilters = () => {
    setSearchTerm('');
    setFromDate('');
    setToDate('');
    setSelectedStage('All Stages');
    setSelectedService('All Services');
    setSelectedPriority('All Priority');
  };

  const isFiltered = searchTerm || fromDate || toDate || selectedStage !== 'All Stages' || selectedService !== 'All Services' || selectedPriority !== 'All Priority';

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (l.email && l.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (l.phone && l.phone.includes(searchTerm));

    const matchesStage = selectedStage === 'All Stages' || l.stage === selectedStage;
    const matchesService = selectedService === 'All Services' || l.service === selectedService;
    const matchesPriority = selectedPriority === 'All Priority' || l.priority === selectedPriority;

    return matchesSearch && matchesStage && matchesService && matchesPriority;
  });

  // Calculate Summary Stats
  const totalLeadsCount = leads.length;
  const wonDealsCount = leads.filter(l => l.stage === 'Won').length;
  const pipelineValue = leads.reduce((acc, l) => acc + (Number(l.totalAmount) || 0), 0);
  const expectedValue = leads.reduce((acc, l) => acc + (Number(l.expectedAmount) || 0), 0);
  const followUpsCount = leads.filter(l => l.followUpDate).length;

  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const newLeadItem: LeadItem = {
      id: `custom-lead-${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      email: formData.email,
      company: formData.company || 'Individual Account',
      referred_by: formData.referred_by,
      service: formData.service,
      source: formData.source,
      stage: formData.stage,
      priority: formData.priority,
      totalAmount: Number(formData.totalAmount) || 0,
      expectedAmount: Number(formData.expectedAmount) || 0,
      expectedClosure: formData.expectedClosure,
      followUpDate: formData.followUpDate,
      notes: formData.notes,
      createdAt: new Date().toISOString()
    };

    setLeads(prev => [newLeadItem, ...prev]);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      phone: '',
      whatsapp: '',
      email: '',
      company: '',
      referred_by: '',
      service: 'Website',
      source: 'Manual / Direct',
      stage: 'Lead',
      priority: 'Medium',
      totalAmount: '0',
      expectedAmount: '0',
      expectedClosure: '',
      followUpDate: '',
      notes: ''
    });
  };

  const handleUpdateStage = (id: string, newStage: LeadItem['stage']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, stage: newStage } : l));
  };

  const handleUpdatePriority = (id: string, newPriority: LeadItem['priority']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, priority: newPriority } : l));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px' }}>
      {/* ── Sub Navigation Bar ── */}
      <div className="vt-crm-subnav">
        <Link href="/app/crm" className="btn btn-sm btn-ghost">Dashboard</Link>
        <Link href="/app/crm/leads" className="btn btn-sm btn-brass">Leads Directory</Link>
        <Link href="/app/crm/clients" className="btn btn-sm btn-ghost">Clients</Link>
        <Link href="/app/crm/pipeline" className="btn btn-sm btn-ghost">Deal Pipeline</Link>
        <Link href="/app/crm/invoices" className="btn btn-sm btn-ghost">Invoices</Link>
        <Link href="/app/crm/users" className="btn btn-sm btn-ghost">Registered Users (MySQL)</Link>
      </div>

      {/* ── Page Header Row ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Leads Pipeline</h2>
          <span style={{
            background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe',
            fontSize: '12px', fontWeight: 700, padding: '2px 10px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '4px'
          }}>
            <Filter size={12} /> {filteredLeads.length}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 500 }}>
            {filteredLeads.length} of {totalLeadsCount} leads
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <button
              onClick={() => setViewMode('board')}
              style={{
                background: viewMode === 'board' ? '#fff' : 'transparent',
                border: 'none', borderRadius: '8px', padding: '5px 12px',
                fontSize: '13px', fontWeight: 600, color: viewMode === 'board' ? 'var(--ink)' : 'var(--text-dim)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: viewMode === 'board' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <Kanban size={14} /> Board
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                background: viewMode === 'list' ? '#fff' : 'transparent',
                border: 'none', borderRadius: '8px', padding: '5px 12px',
                fontSize: '13px', fontWeight: 600, color: viewMode === 'list' ? 'var(--ink)' : 'var(--text-dim)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <List size={14} /> List
            </button>
          </div>

          <button className="btn btn-secondary btn-sm" style={{ height: '36px', borderRadius: '10px' }}>
            <Upload size={14} /> Bulk Upload
          </button>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-brass btn-sm" 
            style={{ height: '36px', borderRadius: '10px', background: '#2563eb', borderColor: '#2563eb', color: '#fff' }}
          >
            <Plus size={15} /> Add Lead
          </button>
        </div>
      </div>

      {/* ── Filter & Search Toolbar ── */}
      <div className="vt-card" style={{ padding: '14px 18px', borderRadius: '16px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search leads..."
            className="vt-input"
            style={{ paddingLeft: '34px', height: '38px', fontSize: '13px', borderRadius: '10px' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Date Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', padding: '0 10px', height: '38px' }}>
          <Calendar size={14} color="var(--text-dim)" />
          <input 
            type="date"
            className="vt-input"
            style={{ border: 'none', background: 'transparent', padding: 0, height: 'auto', fontSize: '12px', width: '110px' }}
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
          />
          <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>→</span>
          <input 
            type="date"
            className="vt-input"
            style={{ border: 'none', background: 'transparent', padding: 0, height: 'auto', fontSize: '12px', width: '110px' }}
            value={toDate}
            onChange={e => setToDate(e.target.value)}
          />
        </div>

        {/* Stage Filter */}
        <select
          value={selectedStage}
          onChange={e => setSelectedStage(e.target.value)}
          className="vt-input"
          style={{ height: '38px', fontSize: '13px', borderRadius: '10px', width: '130px', background: selectedStage !== 'All Stages' ? '#eff6ff' : '#fff', color: selectedStage !== 'All Stages' ? '#2563eb' : 'inherit', fontWeight: 600 }}
        >
          <option value="All Stages">All Stages</option>
          <option value="Lead">🌱 Lead</option>
          <option value="Demo">🎯 Demo</option>
          <option value="Proposal">📄 Proposal</option>
          <option value="Negotiation">🤝 Negotiation</option>
          <option value="Won">🎉 Won</option>
          <option value="Lost">❌ Lost</option>
        </select>

        {/* Service Filter */}
        <select
          value={selectedService}
          onChange={e => setSelectedService(e.target.value)}
          className="vt-input"
          style={{ height: '38px', fontSize: '13px', borderRadius: '10px', width: '130px', background: selectedService !== 'All Services' ? '#eff6ff' : '#fff', color: selectedService !== 'All Services' ? '#2563eb' : 'inherit', fontWeight: 600 }}
        >
          <option value="All Services">All Services</option>
          <option value="Website">Website</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="LMS">LMS</option>
          <option value="CRM">CRM</option>
          <option value="Social Media">Social Media</option>
          <option value="Other">Other</option>
        </select>

        {/* Priority Filter */}
        <select
          value={selectedPriority}
          onChange={e => setSelectedPriority(e.target.value)}
          className="vt-input"
          style={{ height: '38px', fontSize: '13px', borderRadius: '10px', width: '120px', background: selectedPriority !== 'All Priority' ? '#eff6ff' : '#fff', color: selectedPriority !== 'All Priority' ? '#2563eb' : 'inherit', fontWeight: 600 }}
        >
          <option value="All Priority">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {isFiltered && (
          <button 
            onClick={clearAllFilters}
            style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '13px', fontWeight: 700, cursor: 'pointer', padding: '0 8px', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {/* ── Summary Stat Cards Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
        <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', borderRadius: '14px', padding: '16px 18px', color: '#fff' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>TOTAL LEADS</div>
          <div style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0 2px' }}>{totalLeadsCount}</div>
          <div style={{ fontSize: '11.5px', opacity: 0.85 }}>↗ of {totalLeadsCount} total</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', borderRadius: '14px', padding: '16px 18px', color: '#fff' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>WON DEALS</div>
          <div style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0 2px' }}>{wonDealsCount}</div>
          <div style={{ fontSize: '11.5px', opacity: 0.85 }}>↗ closed</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', borderRadius: '14px', padding: '16px 18px', color: '#fff' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>PIPELINE VALUE</div>
          <div style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0 2px' }}>₹{pipelineValue.toLocaleString()}</div>
          <div style={{ fontSize: '11.5px', opacity: 0.85 }}>↗ total amount</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)', borderRadius: '14px', padding: '16px 18px', color: '#fff' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>EXPECTED VALUE</div>
          <div style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0 2px' }}>₹{expectedValue.toLocaleString()}</div>
          <div style={{ fontSize: '11.5px', opacity: 0.85 }}>↗ what you'll collect</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderRadius: '14px', padding: '16px 18px', color: '#fff' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>FOLLOW-UPS</div>
          <div style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0 2px' }}>{followUpsCount}</div>
          <div style={{ fontSize: '11.5px', opacity: 0.85 }}>↗ all clear ✓</div>
        </div>
      </div>

      {/* ── LIST VIEW OR BOARD VIEW ── */}
      {viewMode === 'list' ? (
        <div className="vt-table-container">
          <table className="vt-table">
            <thead>
              <tr>
                <th>CLIENT</th>
                <th>SERVICE</th>
                <th>STAGE</th>
                <th>TOTAL AMT</th>
                <th>EXPECTED</th>
                <th>PRIORITY</th>
                <th>FOLLOW-UP</th>
                <th style={{ textAlign: 'center' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-dim)' }}>
                    <div style={{ fontSize: '40px', marginBottom: '8px', opacity: 0.6 }}>👥</div>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>No leads match your filters.</p>
                    {isFiltered && (
                      <button onClick={clearAllFilters} style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, marginTop: '8px', cursor: 'pointer' }}>
                        ✕ Clear filters
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '38px', height: '38px', borderRadius: '50%',
                          background: '#2563eb', color: '#fff', fontWeight: 800, fontSize: '15px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '14px' }}>{lead.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{lead.company}</div>
                          <div style={{ fontSize: '11.5px', color: '#2563eb', fontWeight: 600 }}>{lead.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-green" style={{ fontSize: '11.5px', fontWeight: 700 }}>
                        {lead.service}
                      </span>
                    </td>
                    <td>
                      <select
                        value={lead.stage}
                        onChange={(e) => handleUpdateStage(lead.id, e.target.value as any)}
                        style={{
                          padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--border)',
                          fontSize: '12px', fontWeight: 700,
                          background: lead.stage === 'Won' ? '#ecfdf5' : lead.stage === 'Lost' ? '#fef2f2' : '#f8fafc',
                          color: lead.stage === 'Won' ? '#047857' : lead.stage === 'Lost' ? '#dc2626' : '#2563eb',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="Lead">🌱 Lead</option>
                        <option value="Demo">🎯 Demo</option>
                        <option value="Proposal">📄 Proposal</option>
                        <option value="Negotiation">🤝 Negotiation</option>
                        <option value="Won">🎉 Won</option>
                        <option value="Lost">❌ Lost</option>
                      </select>
                    </td>
                    <td style={{ fontWeight: 800, color: 'var(--ink)' }}>
                      ₹{lead.totalAmount.toLocaleString()}
                    </td>
                    <td style={{ fontWeight: 700, color: '#047857' }}>
                      ₹{lead.expectedAmount.toLocaleString()}
                    </td>
                    <td>
                      <select
                        value={lead.priority}
                        onChange={(e) => handleUpdatePriority(lead.id, e.target.value as any)}
                        style={{
                          padding: '4px 8px', borderRadius: '12px', border: 'none',
                          fontSize: '11.5px', fontWeight: 700,
                          background: lead.priority === 'High' ? '#fef2f2' : lead.priority === 'Medium' ? '#fef3c7' : '#f1f5f9',
                          color: lead.priority === 'High' ? '#dc2626' : lead.priority === 'Medium' ? '#d97706' : '#64748b',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="High">🔴 High</option>
                        <option value="Medium">🟡 Medium</option>
                        <option value="Low">⚪ Low</option>
                      </select>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>
                      {lead.followUpDate ? `📅 ${lead.followUpDate}` : '—'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => setLeads(prev => prev.filter(l => l.id !== lead.id))}
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
      ) : (
        /* KANBAN BOARD VIEW WITH INTERACTIVE DRAG & DROP */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px', alignItems: 'start' }}>
          {(['Lead', 'Demo', 'Proposal', 'Negotiation', 'Won', 'Lost'] as const).map((colStage) => {
            const colLeads = filteredLeads.filter(l => l.stage === colStage);
            const isOver = dragOverStage === colStage;
            const colTotalAmount = colLeads.reduce((acc, l) => acc + (l.totalAmount || 0), 0);

            const stageIcons: Record<string, string> = {
              Lead: '🌱',
              Demo: '🎯',
              Proposal: '📄',
              Negotiation: '🤝',
              Won: '🎉',
              Lost: '❌'
            };

            return (
              <div 
                key={colStage} 
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                  if (dragOverStage !== colStage) setDragOverStage(colStage);
                }}
                onDragLeave={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setDragOverStage(null);
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (draggedLeadId) {
                    handleUpdateStage(draggedLeadId, colStage);
                    setDraggedLeadId(null);
                    setDragOverStage(null);
                  }
                }}
                style={{ 
                  background: isOver ? '#eff6ff' : '#f8fafc', 
                  borderRadius: '16px', 
                  padding: '16px', 
                  border: isOver ? '2px solid #2563eb' : '1px solid #e2e8f0', 
                  minHeight: '380px',
                  transition: 'all 0.15s ease',
                  boxShadow: isOver ? '0 4px 14px rgba(37, 99, 235, 0.15)' : 'none'
                }}
              >
                {/* Column Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '15px' }}>{stageIcons[colStage]}</span>
                    <span style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--ink)' }}>{colStage}</span>
                  </div>
                  <span style={{ 
                    fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '12px',
                    background: isOver ? '#2563eb' : '#e2e8f0', color: isOver ? '#fff' : '#475569'
                  }}>
                    {colLeads.length}
                  </span>
                </div>

                {/* Column Total Value */}
                {colTotalAmount > 0 ? (
                  <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 600, marginBottom: '14px' }}>
                    ₹{colTotalAmount.toLocaleString()} total
                  </div>
                ) : (
                  <div style={{ height: '18px', marginBottom: '8px' }}></div>
                )}

                {/* Drop Indicator Placeholder when dragging */}
                {isOver && (
                  <div style={{
                    border: '2px dashed #3b82f6',
                    borderRadius: '14px',
                    background: 'rgba(239, 246, 255, 0.8)',
                    padding: '18px',
                    marginBottom: '12px',
                    textAlign: 'center',
                    color: '#2563eb',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      📥
                    </span>
                    Drop here
                  </div>
                )}

                {/* Cards List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {colLeads.map(l => {
                    const isBeingDragged = draggedLeadId === l.id;

                    return (
                      <div 
                        key={l.id} 
                        draggable={true}
                        onDragStart={(e) => {
                          setDraggedLeadId(l.id);
                          e.dataTransfer.setData('text/plain', l.id);
                          e.dataTransfer.effectAllowed = 'move';
                        }}
                        onDragEnd={() => {
                          setDraggedLeadId(null);
                          setDragOverStage(null);
                        }}
                        className="vt-card" 
                        style={{ 
                          padding: '14px 16px', 
                          borderRadius: '14px', 
                          background: '#fff', 
                          border: isBeingDragged ? '2px dashed #93c5fd' : '1px solid var(--border)', 
                          opacity: isBeingDragged ? 0.4 : 1,
                          cursor: 'grab',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                          transition: 'all 0.15s ease',
                          userSelect: 'none'
                        }}
                      >
                        {/* Card Top Row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ 
                              width: '34px', height: '34px', borderRadius: '50%', 
                              background: '#dbeafe', color: '#1d4ed8', fontWeight: 800, fontSize: '14px',
                              display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                              {l.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontWeight: 800, fontSize: '13.5px', color: 'var(--ink)' }}>{l.name}</div>
                              <div style={{ fontSize: '11.5px', color: 'var(--text-dim)' }}>{l.company}</div>
                            </div>
                          </div>
                          <span style={{ fontSize: '14px', color: '#94a3b8', cursor: 'grab' }} title="Drag lead">⋮⋮</span>
                        </div>

                        {/* Service Tag */}
                        <div style={{ marginBottom: '10px' }}>
                          <span style={{ 
                            fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', 
                            background: '#eff6ff', color: '#2563eb', border: '1px solid #dbeafe'
                          }}>
                            {l.service}
                          </span>
                        </div>

                        {/* Financial Amounts */}
                        <div style={{ marginBottom: '10px' }}>
                          <div style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--ink)' }}>
                            ₹{l.totalAmount.toLocaleString()}
                          </div>
                          {l.expectedAmount > 0 && (
                            <div style={{ fontSize: '11.5px', color: '#d97706', fontWeight: 600 }}>
                              ₹{l.expectedAmount.toLocaleString()} expected
                            </div>
                          )}
                        </div>

                        {/* Follow Up Date */}
                        {l.followUpDate && (
                          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={12} color="#94a3b8" /> Follow-up: {l.followUpDate}
                          </div>
                        )}

                        {/* Bottom Actions Row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                          <div style={{ display: 'flex', gap: '8px', color: '#94a3b8' }}>
                            <span title={`Call ${l.phone}`}><Phone size={13} style={{ cursor: 'pointer' }} /></span>
                            <span title={`Email ${l.email || 'client'}`}><Mail size={13} style={{ cursor: 'pointer' }} /></span>
                            <span title="Set reminder"><Bell size={13} style={{ cursor: 'pointer' }} /></span>
                          </div>
                          <span style={{ 
                            fontSize: '10.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px',
                            background: l.priority === 'High' ? '#fef2f2' : l.priority === 'Medium' ? '#fef3c7' : '#f1f5f9',
                            color: l.priority === 'High' ? '#dc2626' : l.priority === 'Medium' ? '#d97706' : '#64748b'
                          }}>
                            {l.priority}
                          </span>
                        </div>

                      </div>
                    );
                  })}

                  {colLeads.length === 0 && !isOver && (
                    <div style={{
                      border: '1px dashed #cbd5e1',
                      borderRadius: '14px',
                      padding: '30px 14px',
                      textAlign: 'center',
                      color: '#94a3b8',
                      fontSize: '12.5px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <div style={{ fontSize: '24px', opacity: 0.5 }}>👥</div>
                      No leads
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── ADD NEW LEAD MODAL (Screenshots 4 & 5) ── */}
      {isAddModalOpen && (
        <div className="vt-modal-overlay">
          <div className="vt-modal" style={{ padding: '24px', maxWidth: '640px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Add New Lead</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>
                  Fill in the client details to create a new lead.
                </p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* SECTION: CONTACT DETAILS */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  CONTACT DETAILS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label className="vt-label">CLIENT NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="vt-input"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="vt-label">PHONE NUMBER *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="vt-input"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="vt-label">WHATSAPP</label>
                    <input
                      type="tel"
                      placeholder="If different from phone"
                      className="vt-input"
                      value={formData.whatsapp}
                      onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="vt-label">EMAIL</label>
                    <input
                      type="email"
                      placeholder="client@example.com"
                      className="vt-input"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="vt-label">COMPANY / BUSINESS</label>
                    <input
                      type="text"
                      placeholder="Company name"
                      className="vt-input"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="vt-label">REFERRED BY</label>
                    <input
                      type="text"
                      placeholder="Who referred this lead?"
                      className="vt-input"
                      value={formData.referred_by}
                      onChange={e => setFormData({ ...formData, referred_by: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: SERVICE & SOURCE */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  SERVICE & SOURCE
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label className="vt-label">SERVICE *</label>
                    <select
                      className="vt-input"
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="Website">Website</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="LMS">LMS</option>
                      <option value="CRM">CRM</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="vt-label">LEAD SOURCE</label>
                    <select
                      className="vt-input"
                      value={formData.source}
                      onChange={e => setFormData({ ...formData, source: e.target.value })}
                    >
                      <option value="Manual / Direct">Manual / Direct</option>
                      <option value="Website">Website</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Referral">Referral</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION: PRIORITY */}
              <div>
                <label className="vt-label">PRIORITY</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  {(['High', 'Medium', 'Low'] as const).map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData({ ...formData, priority: p })}
                      style={{
                        padding: '10px', borderRadius: '10px',
                        border: formData.priority === p ? '2px solid #d97706' : '1px solid #e2e8f0',
                        background: formData.priority === p ? '#fffbeb' : '#f8fafc',
                        color: formData.priority === p ? '#b45309' : '#64748b',
                        fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s ease'
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION: DEAL AMOUNT */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  DEAL AMOUNT
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label className="vt-label">TOTAL AMOUNT (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="vt-input"
                      value={formData.totalAmount}
                      onChange={e => setFormData({ ...formData, totalAmount: e.target.value })}
                    />
                    <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Gross deal value</span>
                  </div>

                  <div>
                    <label className="vt-label">EXPECTED AMOUNT (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="vt-input"
                      value={formData.expectedAmount}
                      onChange={e => setFormData({ ...formData, expectedAmount: e.target.value })}
                    />
                    <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>What you expect to receive</span>
                  </div>
                </div>
              </div>

              {/* SECTION: DATES */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                  DATES
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label className="vt-label">EXPECTED CLOSURE</label>
                    <input
                      type="date"
                      className="vt-input"
                      value={formData.expectedClosure}
                      onChange={e => setFormData({ ...formData, expectedClosure: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="vt-label">FOLLOW-UP DATE</label>
                    <input
                      type="date"
                      className="vt-input"
                      value={formData.followUpDate}
                      onChange={e => setFormData({ ...formData, followUpDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION: NOTES */}
              <div>
                <label className="vt-label">NOTES</label>
                <textarea
                  rows={3}
                  placeholder="Requirements, budget discussed, next steps..."
                  className="vt-input"
                  style={{ height: 'auto', padding: '10px' }}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              {/* FOOTER BUTTONS */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-brass" style={{ background: '#2563eb', borderColor: '#2563eb', color: '#fff', padding: '10px 24px' }}>
                  Add Lead
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
