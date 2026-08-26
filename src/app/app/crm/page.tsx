'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Users, UserCheck, TrendingUp, DollarSign, Plus } from 'lucide-react';

interface DbUser {
  id: number;
  user_name: string;
  mobile_number: string;
  email: string;
  company_name: string;
  created_at: string;
}

export default function CRMDashboardPage() {
  const { data } = useApp();
  const [dbUsers, setDbUsers] = useState<DbUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchDbUsers = async () => {
      setLoadingUsers(true);
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
        console.error('Error loading CRM leads:', err);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchDbUsers();
  }, []);

  // Map MySQL database records to lead format + combine with sample leads
  const dbLeads = dbUsers.map(u => ({
    id: `db-${u.id}`,
    name: u.user_name,
    company: u.company_name,
    email: u.email,
    phone: u.mobile_number,
    source: 'Website',
    status: 'New',
    value: '$25,000',
    assigned: 'VasifyTech System'
  }));

  const combinedLeads = [...dbLeads, ...data.crm.leads];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', overflowX: 'auto' }}>
        <Link href="/app/crm" className="btn btn-sm btn-brass">Dashboard</Link>
        <Link href="/app/crm/leads" className="btn btn-sm btn-ghost">Leads Directory</Link>
        <Link href="/app/crm/clients" className="btn btn-sm btn-ghost">Clients</Link>
        <Link href="/app/crm/pipeline" className="btn btn-sm btn-ghost">Deal Pipeline</Link>
        <Link href="/app/crm/users" className="btn btn-sm btn-ghost">Registered Users (MySQL)</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="vt-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-dim)', fontWeight: 600 }}>TOTAL LEADS</span>
            <Users size={18} color="var(--green)" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)' }}>{combinedLeads.length}</div>
          <div style={{ fontSize: '12px', color: 'var(--green-dark)', fontWeight: 600, marginTop: '4px' }}>↑ 18% vs last month</div>
        </div>

        <div className="vt-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-dim)', fontWeight: 600 }}>QUALIFIED LEADS</span>
            <UserCheck size={18} color="var(--green-2)" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)' }}>{data.crm.stats.qualifiedLeads}</div>
          <div style={{ fontSize: '12px', color: 'var(--green-dark)', fontWeight: 600, marginTop: '4px' }}>56.7% Conversion</div>
        </div>

        <div className="vt-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-dim)', fontWeight: 600 }}>ACTIVE DEALS</span>
            <TrendingUp size={18} color="var(--green-dark)" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)' }}>{data.crm.stats.activeDeals}</div>
          <div style={{ fontSize: '12px', color: 'var(--green-dark)', fontWeight: 600, marginTop: '4px' }}>Value: $182,000</div>
        </div>

        <div className="vt-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-dim)', fontWeight: 600 }}>WON REVENUE (MTD)</span>
            <DollarSign size={18} color="var(--green-deep)" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)' }}>{data.crm.stats.revenueMTD}</div>
          <div style={{ fontSize: '12px', color: 'var(--green-dark)', fontWeight: 600, marginTop: '4px' }}>↑ 24.8% target met</div>
        </div>
      </div>

      <div className="vt-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Recent Inbound Leads</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>Latest prospects from web forms and direct sales</p>
          </div>
          <Link href="/app/crm/leads" className="btn btn-sm btn-brass">
            <Plus size={14} /> All Leads
          </Link>
        </div>

        <div className="vt-table-container">
          <table className="vt-table">
            <thead>
              <tr>
                <th>LEAD / CONTACT</th>
                <th>COMPANY</th>
                <th>SOURCE</th>
                <th>STATUS</th>
                <th>VALUE</th>
                <th>ASSIGNED TO</th>
              </tr>
            </thead>
            <tbody>
              {loadingUsers ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: 'var(--text-dim)' }}>
                    Loading inbound leads...
                  </td>
                </tr>
              ) : (
                combinedLeads.slice(0, 5).map((lead: any) => (
                  <tr key={lead.id}>
                    <td style={{ fontWeight: 600 }}>{lead.name}</td>
                    <td>{lead.company}</td>
                    <td><span className="badge badge-gray">{lead.source}</span></td>
                    <td>
                      <span className={`badge ${lead.status === 'Won' ? 'badge-green' : lead.status === 'Qualified' ? 'badge-blue' : 'badge-orange'}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{lead.value}</td>
                    <td>{lead.assigned}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
