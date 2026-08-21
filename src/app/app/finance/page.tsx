'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { DollarSign, Plus, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function FinanceDashboardPage() {
  const { data } = useApp();
  const router = useRouter();

  const financialData = [
    { month: 'Jan', revenue: 62000, expense: 28000 },
    { month: 'Feb', revenue: 71000, expense: 29500 },
    { month: 'Mar', revenue: 68000, expense: 31000 },
    { month: 'Apr', revenue: 79000, expense: 30000 },
    { month: 'May', revenue: 84320, expense: 32150 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', overflowX: 'auto' }}>
        <Link href="/app/finance" className="btn btn-sm btn-brass">Dashboard</Link>
        <Link href="/app/finance/invoices/create" className="btn btn-sm btn-ghost">Create Invoice</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>REVENUE (MTD)</div>
          <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px', color: 'var(--ink)' }}>{data.finance.stats.revenueMTD}</div>
          <div style={{ fontSize: '12px', color: 'var(--green-dark)', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <ArrowUpRight size={14} /> +14.2% vs last month
          </div>
        </div>

        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>EXPENSES (MTD)</div>
          <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px', color: 'var(--ink)' }}>{data.finance.stats.expensesMTD}</div>
        </div>

        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>NET PROFIT</div>
          <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px', color: 'var(--green-dark)' }}>{data.finance.stats.netProfit}</div>
        </div>

        <div className="vt-card">
          <div style={{ fontSize: '11.5px', color: 'var(--text-dim)', fontWeight: 600 }}>OUTSTANDING INVOICES</div>
          <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px', color: '#c0472f' }}>{data.finance.stats.outstandingInvoices}</div>
        </div>
      </div>

      <div className="vt-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '16px' }}>Financial Revenue vs Expense Performance</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>Monthly cash flow comparison</p>
          </div>
          <button onClick={() => router.push('/app/finance/invoices/create')} className="btn btn-brass btn-sm">
            <Plus size={14} /> New Invoice
          </button>
        </div>
        <div style={{ width: '100%', height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e9ec" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e4e9ec', borderRadius: '8px' }} />
              <Bar dataKey="revenue" fill="#1DA851" radius={[4, 4, 0, 0]} name="Revenue ($)" />
              <Bar dataKey="expense" fill="#6b7280" radius={[4, 4, 0, 0]} name="Expenses ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
