'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Plus, Download, FileText, CheckCircle, Clock } from 'lucide-react';

export default function InvoicesPage() {
  const { data } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <Link href="/app/finance" className="btn btn-sm btn-ghost">Dashboard</Link>
        <Link href="/app/finance/invoices" className="btn btn-sm btn-brass">Invoices Directory</Link>
        <Link href="/app/finance/invoices/create" className="btn btn-sm btn-ghost">Create Invoice</Link>
        <Link href="/app/finance/expenses" className="btn btn-sm btn-ghost">Expenses Log</Link>
      </div>

      <div className="vt-card" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '16px' }}>Invoice Directory & Ledger</h3>
        <Link href="/app/finance/invoices/create" className="btn btn-brass btn-sm">
          <Plus size={15} /> Create Invoice
        </Link>
      </div>

      <div className="vt-table-container">
        <table className="vt-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Client Name</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.finance.invoices.map(inv => (
              <tr key={inv.id}>
                <td style={{ fontWeight: 700, color: 'var(--ink)' }}>{inv.id}</td>
                <td>{inv.client}</td>
                <td style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>{inv.issueDate}</td>
                <td style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>{inv.dueDate}</td>
                <td style={{ fontWeight: 800, color: 'var(--ink)' }}>{inv.amount}</td>
                <td>
                  <span className={`badge ${inv.status === 'Paid' ? 'badge-green' : inv.status === 'Overdue' ? 'badge-red' : 'badge-orange'}`}>
                    {inv.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-ghost btn-sm" onClick={() => alert(`Simulating PDF Preview for ${inv.id}`)}>
                    <FileText size={13} /> View Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
