'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Plus, Download } from 'lucide-react';

export default function ExpensesPage() {
  const { data } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <Link href="/app/finance" className="btn btn-sm btn-ghost">Dashboard</Link>
        <Link href="/app/finance/invoices" className="btn btn-sm btn-ghost">Invoices Directory</Link>
        <Link href="/app/finance/invoices/create" className="btn btn-sm btn-ghost">Create Invoice</Link>
        <Link href="/app/finance/expenses" className="btn btn-sm btn-brass">Expenses Log</Link>
      </div>

      <div className="vt-card" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '16px' }}>Corporate Expense Claims & Subscriptions</h3>
        <button className="btn btn-brass btn-sm"><Plus size={14} /> Log Expense</button>
      </div>

      <div className="vt-table-container">
        <table className="vt-table">
          <thead>
            <tr>
              <th>Expense ID</th>
              <th>Category</th>
              <th>Vendor</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.finance.expenses.map(exp => (
              <tr key={exp.id}>
                <td style={{ fontWeight: 700, color: 'var(--ink)' }}>{exp.id}</td>
                <td><span className="badge badge-gray">{exp.category}</span></td>
                <td>{exp.vendor}</td>
                <td style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>{exp.date}</td>
                <td style={{ fontWeight: 800, color: '#dc2626' }}>{exp.amount}</td>
                <td><span className="badge badge-green">{exp.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
