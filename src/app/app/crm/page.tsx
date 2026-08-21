'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Users, UserCheck, TrendingUp, DollarSign, Plus, Eye, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function CRMDashboardPage() {
  const { data } = useApp();

  const chartData = [
    { month: 'Jan', leads: 45, won: 12 },
    { month: 'Feb', leads: 52, won: 18 },
    { month: 'Mar', leads: 68, won: 22 },
    { month: 'Apr', leads: 74, won: 28 },
    { month: 'May', leads: 89, won: 34 },
    { month: 'Jun', leads: 112, won: 45 },
    { month: 'Jul', leads: 128, won: 62 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', overflowX: 'auto' }}>
        <Link href="/app/crm" className="btn btn-sm btn-brass">Dashboard</Link>
        <Link href="/app/crm/leads" className="btn btn-sm btn-ghost">Leads Directory</Link>
        <Link href="/app/crm/clients" className="btn btn-sm btn-ghost">Clients</Link>
        <Link href="/app/crm/pipeline" className="btn btn-sm btn-ghost">Deal Pipeline</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="vt-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-dim)', fontWeight: 600 }}>TOTAL LEADS</span>
            <Users size={18} color="var(--green)" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)' }}>{data.crm.stats.totalLeads}</div>
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
            <h3 style={{ fontSize: '16px' }}>Recent Inbound Leads</h3>
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
                <th>Lead / Contact</th>
                <th>Company</th>
                <th>Source</th>
                <th>Status</th>
                <th>Value</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {data.crm.leads.slice(0, 5).map(lead => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
