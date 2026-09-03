'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { TrendingUp, DollarSign, Calendar, User } from 'lucide-react';

export default function PipelinePage() {
  const { data, moveDeal } = useApp();

  const stages = [
    { key: 'new', label: 'New Lead', color: 'var(--text-dim)' },
    { key: 'qualification', label: 'Qualification', color: '#2563eb' },
    { key: 'proposal', label: 'Proposal Sent', color: '#c2410c' },
    { key: 'negotiation', label: 'Negotiation', color: '#7c3aed' },
    { key: 'won', label: 'Won Deals', color: 'var(--green-dark)' },
    { key: 'lost', label: 'Lost Deals', color: '#dc2626' }
  ];

  const handleDragStart = (e: React.DragEvent, dealId: string, sourceStage: string) => {
    e.dataTransfer.setData('dealId', dealId);
    e.dataTransfer.setData('sourceStage', sourceStage);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData('dealId');
    const sourceStage = e.dataTransfer.getData('sourceStage');
    if (dealId && sourceStage && sourceStage !== targetStage) {
      moveDeal(dealId, sourceStage, targetStage);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="vt-crm-subnav">
        <Link href="/app/crm" className="btn btn-sm btn-ghost">Dashboard</Link>
        <Link href="/app/crm/leads" className="btn btn-sm btn-ghost">Leads Directory</Link>
        <Link href="/app/crm/clients" className="btn btn-sm btn-ghost">Clients</Link>
        <Link href="/app/crm/pipeline" className="btn btn-sm btn-brass">Deal Pipeline</Link>
        <Link href="/app/crm/invoices" className="btn btn-sm btn-ghost">Invoices</Link>
        <Link href="/app/crm/users" className="btn btn-sm btn-ghost">Registered Users (MySQL)</Link>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(6, minmax(260px, 1fr))', 
        gap: '16px', 
        overflowX: 'auto',
        paddingBottom: '16px' 
      }}>
        {stages.map(stage => {
          const deals = data.crm.dealsPipeline[stage.key] || [];
          return (
            <div 
              key={stage.key}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, stage.key)}
              style={{
                background: 'var(--bg-soft)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                minHeight: '500px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--ink)' }}>{stage.label}</span>
                <span className="badge badge-gray">{deals.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {deals.map(deal => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={e => handleDragStart(e, deal.id, stage.key)}
                    className="vt-card"
                    style={{
                      padding: '14px',
                      cursor: 'grab',
                      boxShadow: 'var(--shadow-sm)',
                      borderLeft: `4px solid ${stage.color}`
                    }}
                  >
                    <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600, marginBottom: '4px' }}>
                      {deal.company}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)', marginBottom: '8px' }}>
                      {deal.title}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '8px', fontSize: '12px' }}>
                      <span style={{ fontWeight: 800, color: 'var(--green-dark)' }}>{deal.amount}</span>
                      <span style={{ color: 'var(--text-dim)' }}>Prob: {deal.prob}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '11px', color: 'var(--text-dim)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={11} /> {deal.owner}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={11} /> {deal.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
