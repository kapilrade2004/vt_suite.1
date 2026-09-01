'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Search, UserPlus, Mail, Phone, Calendar, Download, Eye, X } from 'lucide-react';
import { Employee } from '@/data/mockData';

export default function EmployeesPage() {
  const { data } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);

  const filteredEmployees = data.hr.employees.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || e.dept === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="vt-crm-subnav">
        <Link href="/app/hr" className="btn btn-sm btn-ghost">Dashboard</Link>
        <Link href="/app/hr/employees" className="btn btn-sm btn-brass">Employees</Link>
        <Link href="/app/hr/attendance" className="btn btn-sm btn-ghost">Attendance</Link>
        <Link href="/app/hr/leave" className="btn btn-sm btn-ghost">Leave Requests</Link>
        <Link href="/app/hr/payroll" className="btn btn-sm btn-ghost">Payroll</Link>
      </div>

      <div className="vt-card" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Search employees by name, role, email..."
              className="vt-input"
              style={{ paddingLeft: '34px' }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="vt-input" style={{ width: '160px' }} value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
            <option value="All">All Departments</option>
            <option value="Operations">Operations</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
          </select>
        </div>

        <button className="btn btn-brass btn-sm"><UserPlus size={15} /> Onboard Employee</button>
      </div>

      <div className="vt-table-container">
        <table className="vt-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Contact Info</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.id}>
                <td style={{ fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%', background: 'var(--green-tint)',
                      border: '1px solid var(--green-tint-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '12px', color: 'var(--green-dark)'
                    }}>
                      {emp.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <div>{emp.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{emp.id}</div>
                    </div>
                  </div>
                </td>
                <td>{emp.role}</td>
                <td><span className="badge badge-gray">{emp.dept}</span></td>
                <td>
                  <div style={{ fontSize: '12.5px' }}>{emp.email}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-dim)' }}>{emp.phone}</div>
                </td>
                <td>
                  <span className={`badge ${emp.status === 'Active' ? 'badge-green' : 'badge-orange'}`}>{emp.status}</span>
                </td>
                <td style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>{emp.joinDate}</td>
                <td>
                  <button className="btn btn-ghost btn-sm" onClick={() => setSelectedEmp(emp)}>
                    <Eye size={14} /> Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEmp && (
        <div className="vt-modal-overlay">
          <div className="vt-modal" style={{ maxWidth: '600px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%', background: 'var(--green)',
                  color: '#fff', fontWeight: 800, fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {selectedEmp.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px' }}>{selectedEmp.name}</h3>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>{selectedEmp.role} • {selectedEmp.dept}</div>
                </div>
              </div>
              <button onClick={() => setSelectedEmp(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div className="vt-card" style={{ background: 'var(--bg-soft)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>EMAIL ADDRESS</div>
                <div style={{ fontSize: '13.5px', fontWeight: 600 }}>{selectedEmp.email}</div>
              </div>
              <div className="vt-card" style={{ background: 'var(--bg-soft)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>COMPENSATION</div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--green-dark)' }}>{selectedEmp.salary}</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', gap: '8px' }}>
              <span className="badge badge-green">Overview</span>
              <span className="badge badge-gray">Attendance Log</span>
              <span className="badge badge-gray">Leave History</span>
              <span className="badge badge-gray">Payslips</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
