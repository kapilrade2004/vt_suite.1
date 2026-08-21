'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, Menu, X, ArrowRight } from 'lucide-react';

export const LandingHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="wrap" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Brand Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--display)',
          fontWeight: 700,
          fontSize: '19px',
          color: 'var(--ink)'
        }}>
          <span style={{
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--green)',
            borderRadius: '50%',
            color: 'var(--green)',
            background: 'var(--green-tint)',
            flexShrink: 0
          }}>
            <Layers size={17} />
          </span>
          VasifyTech Suite
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-links" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '34px'
        }}>
          <a href="#modules" style={{ fontSize: '14.5px', fontWeight: 500, color: 'var(--text)' }}>Modules</a>
          <a href="#features" style={{ fontSize: '14.5px', fontWeight: 500, color: 'var(--text)' }}>Features</a>
          <a href="#pricing" style={{ fontSize: '14.5px', fontWeight: 500, color: 'var(--text)' }}>Pricing</a>
          <a href="#faq" style={{ fontSize: '14.5px', fontWeight: 500, color: 'var(--text)' }}>FAQ</a>
        </div>

        {/* CTA Buttons */}
        <div className="nav-cta" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px'
        }}>
          <Link href="/app/crm" style={{ fontSize: '14.5px', fontWeight: 500, color: 'var(--text)' }}>
            Sign in
          </Link>
          <Link href="/app/crm" className="btn btn-brass">
            Start Free Trial <ArrowRight size={14} />
          </Link>
          <button 
            className="nav-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '6px 10px',
              color: 'var(--ink)',
              cursor: 'pointer'
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '76px',
          left: 0,
          right: 0,
          background: '#ffffff',
          flexDirection: 'column',
          padding: '20px 28px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          gap: '16px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <a href="#modules" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: 500, color: 'var(--ink)' }}>Modules</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: 500, color: 'var(--ink)' }}>Features</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: 500, color: 'var(--ink)' }}>Pricing</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: 500, color: 'var(--ink)' }}>FAQ</a>
          <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/app/crm" className="btn btn-brass btn-block">Go to Dashboard</Link>
          </div>
        </div>
      )}
    </header>
  );
};
