'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Plus, Trash2, Save, Eye, ArrowLeft } from 'lucide-react';

interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  tax: number;
}

export default function CreateInvoicePage() {
  const router = useRouter();
  const { addInvoice } = useApp();

  const [client, setClient] = useState('Kestrel Manufacturing');
  const [issueDate, setIssueDate] = useState('2026-08-21');
  const [dueDate, setDueDate] = useState('2026-09-05');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, description: 'VasifyTech Core License (Annual)', quantity: 1, rate: 1200, tax: 18 },
    { id: 2, description: 'Custom ERP API Integration Service', quantity: 15, rate: 150, tax: 18 }
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: 'Consulting / Engineering Service', quantity: 1, rate: 100, tax: 18 }]);
  };

  const removeItem = (id: number) => {
    if (items.length === 1) return;
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const calculateSubtotal = () => items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const calculateTax = () => items.reduce((sum, item) => sum + (item.quantity * item.rate * (item.tax / 100)), 0);
  const calculateTotal = () => calculateSubtotal() + calculateTax();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedTotal = `$${calculateTotal().toLocaleString()}`;
    addInvoice({
      client,
      issueDate,
      dueDate,
      amount: formattedTotal,
      status: 'Sent'
    });
    router.push('/app/finance/invoices');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link href="/app/finance/invoices" className="btn btn-ghost btn-sm">
          <ArrowLeft size={15} /> Back to Invoices
        </Link>
        <h2 style={{ fontSize: '20px' }}>Create Tax Invoice</h2>
      </div>

      <form onSubmit={handleSave} className="vt-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label className="vt-label">Select Client *</label>
            <select className="vt-input" value={client} onChange={e => setClient(e.target.value)}>
              <option value="Kestrel Manufacturing">Kestrel Manufacturing</option>
              <option value="Everline Retail Corp">Everline Retail Corp</option>
              <option value="Solace Health Group">Solace Health Group</option>
              <option value="Northbridge Logistics">Northbridge Logistics</option>
            </select>
          </div>
          <div>
            <label className="vt-label">Issue Date</label>
            <input type="date" className="vt-input" value={issueDate} onChange={e => setIssueDate(e.target.value)} />
          </div>
          <div>
            <label className="vt-label">Due Date</label>
            <input type="date" className="vt-input" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '15px', marginBottom: '12px' }}>Invoice Line Items</h3>
          <div className="vt-table-container" style={{ marginBottom: '12px' }}>
            <table className="vt-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th style={{ width: '90px' }}>Qty</th>
                  <th style={{ width: '130px' }}>Rate ($)</th>
                  <th style={{ width: '90px' }}>Tax %</th>
                  <th style={{ width: '120px' }}>Amount</th>
                  <th style={{ width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => {
                  const lineAmount = item.quantity * item.rate * (1 + item.tax / 100);
                  return (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="text"
                          className="vt-input"
                          value={item.description}
                          onChange={e => updateItem(item.id, 'description', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="vt-input"
                          value={item.quantity}
                          min={1}
                          onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 1)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="vt-input"
                          value={item.rate}
                          onChange={e => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="vt-input"
                          value={item.tax}
                          onChange={e => updateItem(item.id, 'tax', parseFloat(e.target.value) || 0)}
                        />
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--ink)' }}>
                        ${lineAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td>
                        <button type="button" onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <button type="button" onClick={addItem} className="btn btn-secondary btn-sm">
            <Plus size={14} /> Add Line Item
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
          <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Tax (GST 18%):</span>
              <span>${calculateTax().toLocaleString()}</span>
            </div>
            <div style={{ borderTop: '2px solid var(--border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800 }}>
              <span>Grand Total:</span>
              <span style={{ color: 'var(--green-dark)' }}>${calculateTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
          <button type="button" className="btn btn-ghost" onClick={() => router.push('/app/finance/invoices')}>Cancel</button>
          <button type="submit" className="btn btn-brass">
            <Save size={15} /> Save & Issue Invoice
          </button>
        </div>
      </form>
    </div>
  );
}
