'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function ReportsPage() {
  const { data } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="vt-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '17px' }}>Analytics & Suite Performance Reports</h3>
        <button className="btn btn-secondary btn-sm"><Download size={14} /> Export Executive PDF</button>
      </div>

      <div className="vt-card">
        <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>Quarterly Performance Summary</h3>
        <p style={{ fontSize: '12.5px', color: 'var(--text-dim)', marginBottom: '16px' }}>Aggregate growth metrics across suite modules</p>
        <div style={{ width: '100%', height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { qtr: 'Q1 2026', crm: 42000, hr: 21000, proj: 34000 },
              { qtr: 'Q2 2026', crm: 58000, hr: 24000, proj: 45000 },
              { qtr: 'Q3 2026 (Est)', crm: 84000, hr: 29000, proj: 64000 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e9ec" />
              <XAxis dataKey="qtr" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e4e9ec', borderRadius: '8px' }} />
              <Bar dataKey="crm" fill="#1DA851" radius={[4, 4, 0, 0]} name="CRM Revenue" />
              <Bar dataKey="proj" fill="#17c15c" radius={[4, 4, 0, 0]} name="Project Billing" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
