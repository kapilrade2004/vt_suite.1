'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Clock, CheckCircle2, AlertCircle, MapPin } from 'lucide-react';

export default function AttendancePage() {
  const { data } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="vt-crm-subnav">
        <Link href="/app/hr" className="btn btn-sm btn-ghost">Dashboard</Link>
        <Link href="/app/hr/employees" className="btn btn-sm btn-ghost">Employees</Link>
        <Link href="/app/hr/attendance" className="btn btn-sm btn-brass">Attendance</Link>
        <Link href="/app/hr/leave" className="btn btn-sm btn-ghost">Leave Requests</Link>
        <Link href="/app/hr/payroll" className="btn btn-sm btn-ghost">Payroll</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>PRESENT TODAY</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--green-dark)', marginTop: '4px' }}>38</div>
        </div>
        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>LATE ARRIVALS</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#c0472f', marginTop: '4px' }}>2</div>
        </div>
        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>ON APPROVED LEAVE</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginTop: '4px' }}>3</div>
        </div>
        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>ABSENT / UNEXCUSED</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#dc2626', marginTop: '4px' }}>1</div>
        </div>
      </div>

      <div className="vt-card">
        <h3 style={{ fontSize: '16px', marginBottom: '14px' }}>Today's Employee Check-In Log</h3>
        <div className="vt-table-container">
          <table className="vt-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Check-In Time</th>
                <th>Check-Out Time</th>
                <th>Location / Device</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.hr.attendanceToday.map((rec, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{rec.name}</td>
                  <td><Clock size={13} color="var(--green)" style={{ verticalAlign: 'middle', marginRight: '6px' }} />{rec.timeIn}</td>
                  <td>{rec.timeOut}</td>
                  <td><MapPin size={13} color="var(--text-dim)" style={{ verticalAlign: 'middle', marginRight: '6px' }} />{rec.location}</td>
                  <td><span className="badge badge-green">{rec.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
