'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export const LandingHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 2px 10px rgba(20, 24, 31, 0.03)'
    }}>
      <div className="wrap" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px'
      }}>
        {/* Brand Logo & Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--display)',
            fontWeight: 800,
            fontSize: '20px',
            color: '#0f172a',
            textDecoration: 'none'
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
              boxShadow: '0 4px 14px rgba(29, 168, 81, 0.35)',
              flexShrink: 0
            }}>
              <Layers size={19} />
            </span>
            VasifyTech <span style={{ color: 'var(--green)' }}>Suite</span>
          </Link>
          <span style={{
            background: 'var(--green-tint)',
            border: '1px solid var(--green-tint-2)',
            color: 'var(--green-dark)',
            fontSize: '11px',
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: '20px'
          }}>
            Complete Business Solution
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px'
        }}>
          {!isHomePage && (
            <Link href="/" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link>
          )}
          <Link href="/features" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', transition: 'color 0.2s' }}>Features</Link>
          <Link href="/#see-it" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', transition: 'color 0.2s' }}>See It</Link>
          <Link href={isHomePage ? "/#pricing" : "/pricing"} style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', transition: 'color 0.2s' }}>Pricing</Link>
          <Link href="/#faq" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', transition: 'color 0.2s' }}>FAQ</Link>
          <Link href="/roadmap" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', transition: 'color 0.2s' }}>Roadmap</Link>
          {!isHomePage && (
            <>
              <Link href="/about" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', transition: 'color 0.2s' }}>About</Link>
              <Link href="/contact" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', transition: 'color 0.2s' }}>Contact</Link>
            </>
          )}
        </div>

        {/* CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/signin" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none' }}>Sign In</Link>
          <Link href="/signup" className="btn btn-sm btn-brass vt-pulse-cta" style={{ borderRadius: '50px', textDecoration: 'none' }}>
            Start Free Trial
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '6px 10px',
              color: '#0f172a',
              cursor: 'pointer',
              display: 'none'
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
          background: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          padding: '16px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {!isHomePage && (
            <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Home</Link>
          )}
          <Link href="/features" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Features</Link>
          <Link href="/#see-it" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>See It</Link>
          <Link href={isHomePage ? "/#pricing" : "/pricing"} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Pricing</Link>
          <Link href="/#faq" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>FAQ</Link>
          <Link href="/roadmap" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Roadmap</Link>
          {!isHomePage && (
            <>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>About</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Contact</Link>
            </>
          )}
          <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/signin" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="btn btn-brass btn-block" style={{ textAlign: 'center' }}>
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
