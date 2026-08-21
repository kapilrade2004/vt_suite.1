'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Save, RefreshCw } from 'lucide-react';

export default function SettingsPage() {
  const { showToast, resetData } = useApp();
  const [appName, setAppName] = useState('VasifyTech Suite (Next.js 14)');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Settings updated successfully!");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '780px' }}>
      <div className="vt-card">
        <h3 style={{ fontSize: '17px', marginBottom: '4px' }}>Platform Workspace Settings</h3>
        <p style={{ fontSize: '12.5px', color: 'var(--text-dim)', marginBottom: '20px' }}>Next.js 14 App Router Environment Configuration</p>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="vt-label">Platform Name</label>
            <input 
              type="text" 
              className="vt-input" 
              value={appName}
              onChange={e => setAppName(e.target.value)}
            />
          </div>

          <div style={{ background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', padding: '16px', borderRadius: '8px' }}>
            <div style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--green-dark)' }}>Theme & Tech Stack</div>
            <div style={{ fontSize: '12px', color: 'var(--text)', marginTop: '4px' }}>
              Stack: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Lucide Icons + Recharts
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <button type="button" onClick={resetData} className="btn btn-ghost btn-sm" style={{ color: '#dc2626' }}>
              <RefreshCw size={14} /> Reset Demo Data
            </button>
            <button type="submit" className="btn btn-brass">
              <Save size={15} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
