'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { DollarSign, FileText, Download, CheckCircle, Eye, X } from 'lucide-react';
import { PayrollRecord } from '@/data/mockData';

export default function PayrollPage() {
  const { data } = useApp();
  const [selectedPayslip, setSelectedPayslip] = useState<PayrollRecord | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <Link href="/app/hr" className="btn btn-sm btn-ghost">Dashboard</Link>
        <Link href="/app/hr/employees" className="btn btn-sm btn-ghost">Employees</Link>
        <Link href="/app/hr/attendance" className="btn btn-sm btn-ghost">Attendance</Link>
        <Link href="/app/hr/leave" className="btn btn-sm btn-ghost">Leave Requests</Link>
        <Link href="/app/hr/payroll" className="btn btn-sm btn-brass">Payroll</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>TOTAL PAYROLL (MONTHLY)</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginTop: '4px' }}>{data.hr.stats.payrollThisMonth}</div>
        </div>
        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>PROCESSED SALARIES</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--green-dark)', marginTop: '4px' }}>42 / 42</div>
        </div>
      </div>

      <div className="vt-card">
        <h3 style={{ fontSize: '16px', marginBottom: '14px' }}>Monthly Salary Disbursement Sheet</h3>
        <div className="vt-table-container">
          <table className="vt-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Basic Pay</th>
                <th>Allowances</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.hr.payroll.map((pay, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{pay.name}</td>
                  <td><span className="badge badge-gray">{pay.dept}</span></td>
                  <td>{pay.basic}</td>
                  <td>{pay.allowance}</td>
                  <td style={{ color: '#dc2626' }}>{pay.deduction}</td>
                  <td style={{ fontWeight: 800, color: 'var(--green-dark)' }}>{pay.net}</td>
                  <td><span className="badge badge-green">{pay.status}</span></td>
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => setSelectedPayslip(pay)}>
                      <FileText size={13} /> View Payslip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPayslip && (
        <div className="vt-modal-overlay">
          <div className="vt-modal" style={{ maxWidth: '540px', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '14px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px' }}>Official Salary Payslip</h3>
                <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Month: August 2026 • VasifyTech Suite</div>
              </div>
              <button onClick={() => setSelectedPayslip(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Employee Name:</span>
                <strong>{selectedPayslip.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Department:</span>
                <strong>{selectedPayslip.dept}</strong>
              </div>
              <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Basic Salary:</span>
                <span>{selectedPayslip.basic}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Allowances:</span>
                <span>{selectedPayslip.allowance}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#dc2626' }}>
                <span>Deductions:</span>
                <span>{selectedPayslip.deduction}</span>
              </div>
              <div style={{ borderTop: '2px solid var(--border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 800 }}>
                <span>Net Salary Payable:</span>
                <span style={{ color: 'var(--green-dark)' }}>{selectedPayslip.net}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => alert("Simulating PDF Payslip Download...")}>
                <Download size={14} /> Download PDF
              </button>
              <button className="btn btn-brass btn-sm" onClick={() => setSelectedPayslip(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
