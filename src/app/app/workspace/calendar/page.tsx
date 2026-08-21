'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';

export default function CalendarPage() {
  const { data } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <Link href="/app/workspace" className="btn btn-sm btn-ghost">Live Team Chat</Link>
        <Link href="/app/workspace/tickets" className="btn btn-sm btn-ghost">Support Tickets</Link>
        <Link href="/app/workspace/calendar" className="btn btn-sm btn-brass">Shared Calendar</Link>
      </div>

      <div className="vt-card" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '16px' }}>Shared Company & Meeting Calendar</h3>
        <button className="btn btn-brass btn-sm"><Plus size={14} /> Schedule Event</button>
      </div>

      <div className="vt-card">
        <h4 style={{ fontSize: '14px', marginBottom: '14px' }}>Upcoming Schedule Events</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.workspace.events.map(evt => (
            <div key={evt.id} style={{ background: 'var(--bg-soft)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="badge badge-green" style={{ marginBottom: '4px' }}>{evt.type}</span>
                <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--ink)' }}>{evt.title}</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-dim)', marginTop: '2px' }}>Host: {evt.host}</div>
              </div>
              <div style={{ textAlign: 'right', fontWeight: 600, fontSize: '13px', color: 'var(--green-dark)' }}>
                <div>{evt.date}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{evt.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
