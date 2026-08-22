import React from 'react';
import { Layers, ShieldCheck, Server } from 'lucide-react';
import Link from 'next/link';

export const LandingFooter: React.FC = () => {
  return (
    <footer style={{
      background: '#042f2e', // Deep dark emerald green footer for elegant contrast
      color: '#cbd5e1',
      padding: '70px 0 40px',
      borderTop: '1px solid rgba(226, 232, 240, 0.1)'
    }}>
      <div className="wrap">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Brand Col */}
          <div style={{ maxWidth: '300px' }}>
            <Link href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--display)',
              fontWeight: 800,
              fontSize: '20px',
              color: '#ffffff',
              textDecoration: 'none',
              marginBottom: '16px'
            }}>
              <span style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                color: '#ffffff',
                background: 'linear-gradient(135deg, var(--green) 0%, var(--green-dark) 100%)',
                boxShadow: '0 4px 14px rgba(29, 168, 81, 0.35)'
              }}>
                <Layers size={19} />
              </span>
              VasifyTech <span style={{ color: '#34d399' }}>Suite</span>
            </Link>
            <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
              Replace 5 separate business tools with one platform. HR, CRM, Projects, Finance, and Workspace — 200+ features connected in one unified workspace.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#a7f3d0' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} color="#34d399" /> 256-bit SSL
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Server size={14} color="#34d399" /> 99.9% Uptime
              </span>
            </div>
          </div>

          {/* Col 1: Platform Modules */}
          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#f8fafc', letterSpacing: '0.08em', marginBottom: '18px', fontWeight: 700 }}>
              Platform Modules
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', listStyle: 'none', padding: 0 }}>
              <li><a href="#modules" style={{ color: '#e2e8f0', textDecoration: 'none' }}>CRM & Sales Pipeline</a></li>
              <li><a href="#modules" style={{ color: '#e2e8f0', textDecoration: 'none' }}>HR & Payroll Management</a></li>
              <li><a href="#modules" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Project Management & Gantt</a></li>
              <li><a href="#modules" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Finance & Invoicing Engine</a></li>
              <li><a href="#modules" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Team Workspace & Help Desk</a></li>
            </ul>
          </div>

          {/* Col 2: Product & Compare */}
          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#f8fafc', letterSpacing: '0.08em', marginBottom: '18px', fontWeight: 700 }}>
              Product & Compare
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', listStyle: 'none', padding: 0 }}>
              <li><Link href="/features" style={{ color: '#34d399', fontWeight: 700, textDecoration: 'none' }}>200+ Features Directory →</Link></li>
              <li><a href="/#compare" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Cost Calculator</a></li>
              <li><a href="/#screenshots" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Live Workspace Previews</a></li>
              <li><Link href="/pricing" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Starter & Pro Plans</Link></li>
              <li><Link href="/about" style={{ color: '#e2e8f0', textDecoration: 'none' }}>About VasifyTech Story</Link></li>
              <li><Link href="/contact" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Contact Sales & Support</Link></li>
              <li><Link href="/roadmap" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Product Roadmap & Feature Board</Link></li>
            </ul>
          </div>

          {/* Col 3: Legal & Security */}
          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#f8fafc', letterSpacing: '0.08em', marginBottom: '18px', fontWeight: 700 }}>
              Trust & Governance
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', listStyle: 'none', padding: 0 }}>
              <li><a href="#" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href="#" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Terms of Service</a></li>
              <li><a href="#" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Data Protection (GDPR)</a></li>
              <li><a href="#" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Security Architecture</a></li>
              <li><a href="#" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Status & Uptime Monitor</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '28px',
          borderTop: '1px solid rgba(226, 232, 240, 0.15)',
          fontSize: '12.5px',
          color: '#a7f3d0',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            © 2026 VasifyTech Suite. All rights reserved. Built with VasifyTech White & Green theme.
          </div>
          <div style={{ display: 'flex', gap: '16px', color: '#ffffff' }}>
            <span>5 Modules • 200+ Features</span>
            <span>•</span>
            <span style={{ color: '#34d399', fontWeight: 700 }}>Starting at $39/mo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
