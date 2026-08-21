'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Plus, Ticket as TicketIcon } from 'lucide-react';

export default function TicketsPage() {
  const { data } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <Link href="/app/workspace" className="btn btn-sm btn-ghost">Live Team Chat</Link>
        <Link href="/app/workspace/tickets" className="btn btn-sm btn-brass">Support Tickets</Link>
        <Link href="/app/workspace/calendar" className="btn btn-sm btn-ghost">Shared Calendar</Link>
      </div>

      <div className="vt-card" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '16px' }}>Customer Support Tickets Desk</h3>
        <button className="btn btn-brass btn-sm"><Plus size={14} /> New Ticket</button>
      </div>

      <div className="vt-table-container">
        <table className="vt-table">
          <thead>
            <tr>
              <th>Ticket #</th>
              <th>Subject</th>
              <th>Customer</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.workspace.tickets.map(tck => (
              <tr key={tck.id}>
                <td style={{ fontWeight: 700, color: 'var(--ink)' }}>{tck.id}</td>
                <td style={{ fontWeight: 600 }}>{tck.subject}</td>
                <td>{tck.customer}</td>
                <td><span className="badge badge-orange">{tck.priority}</span></td>
                <td><span className="badge badge-blue">{tck.status}</span></td>
                <td style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>{tck.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
