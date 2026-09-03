'use client';

import React from 'react';
import Link from 'next/link';
import { InvoicesContent } from '@/components/invoices/invoices-content';

export default function FinanceInvoicesPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="vt-crm-subnav">
        <Link href="/app/finance" className="btn btn-sm btn-ghost">Dashboard</Link>
        <Link href="/app/finance/invoices" className="btn btn-sm btn-brass">Invoices Directory</Link>
        <Link href="/app/finance/expenses" className="btn btn-sm btn-ghost">Expenses Log</Link>
      </div>

      <InvoicesContent />
    </div>
  );
}
