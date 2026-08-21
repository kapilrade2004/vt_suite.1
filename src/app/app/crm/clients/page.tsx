'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Search, Building, Mail, Phone, MapPin } from 'lucide-react';

export default function ClientsPage() {
  const { data } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const filteredClients = data.crm.clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeClient = data.crm.clients.find(c => c.id === selectedClient) || data.crm.clients[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <Link href="/app/crm" className="btn btn-sm btn-ghost">Dashboard</Link>
        <Link href="/app/crm/leads" className="btn btn-sm btn-ghost">Leads Directory</Link>
        <Link href="/app/crm/clients" className="btn btn-sm btn-brass">Clients</Link>
        <Link href="/app/crm/pipeline" className="btn btn-sm btn-ghost">Deal Pipeline</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedClient ? '1fr 1fr' : '1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="vt-card" style={{ padding: '14px 18px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="text"
                placeholder="Filter clients by name, industry, contact..."
                className="vt-input"
                style={{ paddingLeft: '34px' }}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {filteredClients.map(client => (
              <div 
                key={client.id} 
                className="vt-card" 
                onClick={() => setSelectedClient(client.id)}
                style={{ 
                  cursor: 'pointer', 
                  border: selectedClient === client.id ? '2px solid var(--green)' : '1px solid var(--border)',
                  background: selectedClient === client.id ? 'var(--green-tint)' : '#fff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span className="badge badge-green">{client.industry}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>{client.id}</span>
                </div>
                <h3 style={{ fontSize: '16px', color: 'var(--ink)', marginBottom: '4px' }}>{client.name}</h3>
                <div style={{ fontSize: '12.5px', color: 'var(--text-dim)', marginBottom: '12px' }}>Contact: {client.contact}</div>
                
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <div>Projects: <strong>{client.projectsCount}</strong></div>
                  <div>Invoiced: <strong style={{ color: 'var(--green-dark)' }}>{client.totalInvoiced}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedClient && activeClient && (
          <div className="vt-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
              <div>
                <span className="badge badge-green" style={{ marginBottom: '6px' }}>{activeClient.industry}</span>
                <h2 style={{ fontSize: '22px' }}>{activeClient.name}</h2>
                <div style={{ fontSize: '13px', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <MapPin size={14} color="var(--green)" /> {activeClient.location}
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelectedClient(null)}>Close</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: 'var(--bg-soft)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>PRIMARY CONTACT</div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--ink)', marginTop: '2px' }}>{activeClient.contact}</div>
              </div>
              <div style={{ background: 'var(--bg-soft)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>LIFETIME VALUE</div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--green-dark)', marginTop: '2px' }}>{activeClient.totalInvoiced}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} color="var(--green-dark)" /> {activeClient.email}
              </div>
              <div style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="var(--green-dark)" /> {activeClient.phone}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Client Profile Tabs</h4>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span className="badge badge-green">Overview</span>
                <span className="badge badge-gray">Projects ({activeClient.projectsCount})</span>
                <span className="badge badge-gray">Invoices</span>
                <span className="badge badge-gray">Documents</span>
                <span className="badge badge-gray">Activity</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
