'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Check, X, Calendar, Plus } from 'lucide-react';

export default function LeavePage() {
  const { data, updateLeaveStatus } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <Link href="/app/hr" className="btn btn-sm btn-ghost">Dashboard</Link>
        <Link href="/app/hr/employees" className="btn btn-sm btn-ghost">Employees</Link>
        <Link href="/app/hr/attendance" className="btn btn-sm btn-ghost">Attendance</Link>
        <Link href="/app/hr/leave" className="btn btn-sm btn-brass">Leave Requests</Link>
        <Link href="/app/hr/payroll" className="btn btn-sm btn-ghost">Payroll</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>PENDING REQUESTS</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#c2410c', marginTop: '4px' }}>
            {data.hr.leaves.filter(l => l.status === 'Pending').length}
          </div>
        </div>
        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>APPROVED THIS MONTH</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--green-dark)', marginTop: '4px' }}>
            {data.hr.leaves.filter(l => l.status === 'Approved').length}
          </div>
        </div>
      </div>

      <div className="vt-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px' }}>Employee Leave Requests</h3>
          <button className="btn btn-brass btn-sm"><Plus size={14} /> Request Leave</button>
        </div>

        <div className="vt-table-container">
          <table className="vt-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>Duration</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.hr.leaves.map(req => (
                <tr key={req.id}>
                  <td style={{ fontWeight: 600 }}>{req.employee}</td>
                  <td><span className="badge badge-gray">{req.type}</span></td>
                  <td style={{ fontSize: '12.5px' }}>{req.startDate} to {req.endDate}</td>
                  <td style={{ fontWeight: 700 }}>{req.days} days</td>
                  <td style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>{req.reason}</td>
                  <td>
                    <span className={`badge ${req.status === 'Approved' ? 'badge-green' : req.status === 'Rejected' ? 'badge-red' : 'badge-orange'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === 'Pending' ? (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button 
                          onClick={() => updateLeaveStatus(req.id, 'Approved')}
                          className="btn btn-sm" 
                          style={{ background: 'var(--green-tint)', color: 'var(--green-dark)', padding: '4px 10px' }}
                        >
                          <Check size={13} /> Approve
                        </button>
                        <button 
                          onClick={() => updateLeaveStatus(req.id, 'Rejected')}
                          className="btn btn-sm" 
                          style={{ background: '#fef2f2', color: '#dc2626', padding: '4px 10px' }}
                        >
                          <X size={13} /> Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
