'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Plus, Search, Download, X, Building, RefreshCw } from 'lucide-react';

interface DbUser {
  id: number;
  user_name: string;
  mobile_number: string;
  email: string;
  company_name: string;
  created_at: string;
}

export default function LeadsDirectoryPage() {
  const { data, addLead } = useApp();
  const [dbUsers, setDbUsers] = useState<DbUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    source: 'Website',
    value: '₹1,00,000',
    assigned: 'Rhea Nair'
  });

  const fetchDbUsers = async () => {
    setLoading(true);
    try {
      let res;
      try {
        res = await fetch('/api/users');
      } catch (e) {
        res = await fetch('http://localhost:5000/api/users');
      }
      const result = await res.json();
      if (result.success && Array.isArray(result.users)) {
        setDbUsers(result.users);
      }
    } catch (err) {
      console.error('Error fetching database users for leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDbUsers();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company) return;
    addLead(formData);
    setFormData({ name: '', company: '', email: '', phone: '', source: 'Website', value: '₹1,00,000', assigned: 'Rhea Nair' });
    setIsAddModalOpen(false);
  };

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

  const filteredLeads = combinedLeads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <Link href="/app/crm" className="btn btn-sm btn-ghost">Dashboard</Link>
        <Link href="/app/crm/leads" className="btn btn-sm btn-brass">Leads Directory</Link>
        <Link href="/app/crm/clients" className="btn btn-sm btn-ghost">Clients</Link>
        <Link href="/app/crm/pipeline" className="btn btn-sm btn-ghost">Deal Pipeline</Link>
        <Link href="/app/crm/users" className="btn btn-sm btn-ghost">Registered Users (MySQL)</Link>
      </div>

      <div className="vt-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Search leads by name, company, email..."
              className="vt-input"
              style={{ paddingLeft: '34px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="vt-input" 
            style={{ width: '150px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Won">Won</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary btn-sm"><Download size={14} /> Export CSV</button>
          <button className="btn btn-brass btn-sm" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={15} /> Add Lead
          </button>
        </div>
      </div>

      <div className="vt-table-container">
        <table className="vt-table">
          <thead>
            <tr>
              <th>Lead Name</th>
              <th>Company</th>
              <th>Email & Phone</th>
              <th>Source</th>
              <th>Status</th>
              <th>Deal Value</th>
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead: any) => (
              <tr key={lead.id}>
                <td style={{ fontWeight: 600 }}>{lead.name}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building size={14} color="var(--text-dim)" />
                    {lead.company}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '12.5px', color: 'var(--text)' }}>{lead.email}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-dim)' }}>{lead.phone}</div>
                </td>
                <td><span className="badge badge-gray">{lead.source}</span></td>
                <td>
                  <span className={`badge ${lead.status === 'Won' ? 'badge-green' : lead.status === 'Qualified' ? 'badge-blue' : lead.status === 'Proposal' ? 'badge-gray' : 'badge-orange'}`}>
                    {lead.status}
                  </span>
                </td>
                <td style={{ fontWeight: 700, color: 'var(--ink)' }}>{lead.value}</td>
                <td>{lead.assigned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="vt-modal-overlay">
          <div className="vt-modal" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px' }}>Add New Inbound Lead</h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="vt-label">Contact Name *</label>
                <input 
                  type="text" 
                  className="vt-input" 
                  required 
                  placeholder="e.g. Vikram Mehta"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="vt-label">Company Name *</label>
                <input 
                  type="text" 
                  className="vt-input" 
                  required 
                  placeholder="e.g. Solace Health Group"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="vt-label">Email Address</label>
                  <input 
                    type="email" 
                    className="vt-input" 
                    placeholder="v.mehta@solace.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="vt-label">Phone Number</label>
                  <input 
                    type="text" 
                    className="vt-input" 
                    placeholder="+91 98000 11223"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-brass">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
