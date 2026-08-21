'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Users, UserCheck, Calendar, DollarSign } from 'lucide-react';

export default function HRDashboardPage() {
  const { data } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', overflowX: 'auto' }}>
        <Link href="/app/hr" className="btn btn-sm btn-brass">Dashboard</Link>
        <Link href="/app/hr/employees" className="btn btn-sm btn-ghost">Employees</Link>
        <Link href="/app/hr/attendance" className="btn btn-sm btn-ghost">Attendance</Link>
        <Link href="/app/hr/leave" className="btn btn-sm btn-ghost">Leave Requests ({data.hr.leaves.filter(l=>l.status==='Pending').length})</Link>
        <Link href="/app/hr/payroll" className="btn btn-sm btn-ghost">Payroll</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="vt-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-dim)', fontWeight: 600 }}>HEADCOUNT</span>
            <Users size={18} color="var(--green)" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)' }}>{data.hr.stats.totalEmployees}</div>
          <div style={{ fontSize: '12px', color: 'var(--green-dark)', fontWeight: 600, marginTop: '4px' }}>Across 6 Departments</div>
        </div>

        <div className="vt-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-dim)', fontWeight: 600 }}>PRESENT TODAY</span>
            <UserCheck size={18} color="var(--green-2)" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)' }}>{data.hr.stats.presentToday}</div>
          <div style={{ fontSize: '12px', color: 'var(--green-dark)', fontWeight: 600, marginTop: '4px' }}>90.4% Attendance</div>
        </div>

        <div className="vt-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-dim)', fontWeight: 600 }}>ON LEAVE</span>
            <Calendar size={18} color="var(--green-dark)" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)' }}>{data.hr.stats.onLeave}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600, marginTop: '4px' }}>Approved Leaves</div>
        </div>

        <div className="vt-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-dim)', fontWeight: 600 }}>MONTHLY PAYROLL</span>
            <DollarSign size={18} color="var(--green-deep)" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)' }}>{data.hr.stats.payrollThisMonth}</div>
          <div style={{ fontSize: '12px', color: 'var(--green-dark)', fontWeight: 600, marginTop: '4px' }}>Processed on schedule</div>
        </div>
      </div>

      <div className="vt-card">
        <h3 style={{ fontSize: '16px', marginBottom: '14px' }}>Pending Leave Approvals</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.hr.leaves.map(req => (
            <div key={req.id} style={{ background: 'var(--bg-soft)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--ink)' }}>{req.employee}</div>
                <span className={`badge ${req.status === 'Approved' ? 'badge-green' : req.status === 'Rejected' ? 'badge-red' : 'badge-orange'}`}>{req.type} ({req.status})</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '4px' }}>
                {req.startDate} to {req.endDate} ({req.days} days) • Reason: {req.reason}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
