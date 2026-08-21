import React from 'react';
import { Layers } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  return (
    <footer style={{
      padding: '70px 0 40px',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-soft)'
    }}>
      <div className="wrap">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr repeat(3, 1fr)',
          gap: '40px',
          marginBottom: '50px'
        }}>
          <div>
            <a href="#" className="logo" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: 700 }}>
              <span style={{
                width: '32px', height: '32px', borderRadius: '50%', background: 'var(--green-tint)',
                border: '2px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green)'
              }}>
                <Layers size={16} />
              </span>
              VasifyTech Suite
            </a>
            <p style={{ color: 'var(--text-dim)', fontSize: '13.5px', marginTop: '14px', maxWidth: '280px' }}>
              The all-in-one back office platform for growing businesses — CRM, HR, projects, finance, and team workspace connected together.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '16px', fontWeight: 700 }}>Product</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--text-dim)' }}>
              <li><a href="#modules">Modules</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '16px', fontWeight: 700 }}>Solutions</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--text-dim)' }}>
              <li><a href="#modules">CRM & Sales</a></li>
              <li><a href="#modules">HR & Payroll</a></li>
              <li><a href="#modules">Project Management</a></li>
              <li><a href="#modules">Finance & Invoicing</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '16px', fontWeight: 700 }}>Legal & Trust</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--text-dim)' }}>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Data Ledger</a></li>
              <li><a href="#">Security Overview</a></li>
            </ul>
          </div>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '26px', borderTop: '1px solid var(--border)',
          fontSize: '12px', color: 'var(--text-dim)', flexWrap: 'wrap', gap: '12px'
        }}>
          <span>© 2026 VasifyTech Suite. All rights reserved.</span>
          <span>Next.js 14 + Tailwind CSS + TypeScript</span>
        </div>
      </div>
    </footer>
  );
};
