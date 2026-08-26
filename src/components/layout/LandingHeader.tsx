'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export const LandingHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isFeaturesPage = pathname === '/features';
  const isPricingPage = pathname === '/pricing';
  const isAboutPage = pathname === '/about';
  const isRoadmapPage = pathname === '/roadmap';

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255, 255, 255, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
      boxShadow: '0 4px 20px -2px rgba(20, 24, 31, 0.05)'
    }}>
      <div className="wrap" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '68px',
        paddingTop: '10px',
        paddingBottom: '10px'
      }}>
        {/* Brand Logo & Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          <Link href="/" className="vt-brand-logo" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--display)',
            fontWeight: 800,
            fontSize: '19px',
            color: '#0f172a',
            textDecoration: 'none',
            whiteSpace: 'nowrap'
          }}>
            <span style={{
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '11px',
              color: '#ffffff',
              background: 'linear-gradient(135deg, var(--green) 0%, var(--green-dark) 100%)',
              boxShadow: '0 6px 16px -2px rgba(29, 168, 81, 0.4)',
              flexShrink: 0
            }}>
              <Layers size={20} />
            </span>
            <span>VasifyTech <span style={{ color: 'var(--green-dark)' }}>Suite</span></span>
          </Link>
          <span className="vt-header-badge" style={{
            background: 'linear-gradient(135deg, var(--green-tint) 0%, #e6f7ec 100%)',
            border: '1px solid var(--green-tint-2)',
            color: 'var(--green-dark)',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 12px',
            borderRadius: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)' }}></span>
            IT & SaaS Solutions
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="vt-desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          {(isFeaturesPage || isRoadmapPage) ? (
            <>
              <Link href="/" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>Home</Link>
              <Link href="/features" style={{ fontSize: '14.5px', fontWeight: isFeaturesPage ? 700 : 600, color: isFeaturesPage ? 'var(--green-dark)' : '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>Features</Link>
              <Link href="/pricing" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>Pricing</Link>
              <Link href="/roadmap" style={{ fontSize: '14.5px', fontWeight: isRoadmapPage ? 700 : 600, color: isRoadmapPage ? 'var(--green-dark)' : '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>Roadmap</Link>
              <Link href="/contact" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>Contact</Link>
            </>
          ) : (isPricingPage || isAboutPage) ? (
            <>
              <Link href="/" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>Home</Link>
              <Link href="/features" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>Features</Link>
              <Link href="/pricing" style={{ fontSize: '14.5px', fontWeight: isPricingPage ? 700 : 600, color: isPricingPage ? 'var(--green-dark)' : '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>Pricing</Link>
              <Link href="/roadmap" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>Roadmap</Link>
              <Link href="/about" style={{ fontSize: '14.5px', fontWeight: isAboutPage ? 700 : 600, color: isAboutPage ? 'var(--green-dark)' : '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>About</Link>
              <Link href="/contact" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>Contact</Link>
            </>
          ) : (
            <>
              {!isHomePage && (
                <Link href="/" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>Home</Link>
              )}
              <Link href="/features" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>Features</Link>
              <Link href="/#see-it" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>See It</Link>
              <Link href={isHomePage ? "/#pricing" : "/pricing"} style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>Pricing</Link>
              <Link href="/#faq" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>FAQ</Link>
              <Link href="/roadmap" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>Roadmap</Link>
              {!isHomePage && (
                <>
                  <Link href="/about" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>About</Link>
                  <Link href="/contact" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>Contact</Link>
                </>
              )}
            </>
          )}
        </div>

        {/* CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#25D36615',
              border: '1px solid #25D36640',
              color: '#128C7E',
              fontSize: '13px',
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: '20px',
              textDecoration: 'none'
            }}
          >
            💬 Support & Chat
          </Link>

          <Link href="/signin" className="vt-header-signin" style={{ fontSize: '14.5px', fontWeight: 600, color: '#334155', textDecoration: 'none', whiteSpace: 'nowrap' }}>Sign In</Link>
          <Link href="/signup" className="btn btn-sm btn-brass vt-pulse-cta" style={{ borderRadius: '50px', textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 700 }}>
            Start Free Trial
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="vt-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '6px 10px',
              color: '#0f172a',
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
          background: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          padding: '16px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {(isFeaturesPage || isRoadmapPage) ? (
            <>
              <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Home</Link>
              <Link href="/features" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: isFeaturesPage ? 'var(--green-dark)' : '#0f172a', fontWeight: isFeaturesPage ? 700 : 600, textDecoration: 'none' }}>Features</Link>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Pricing</Link>
              <Link href="/roadmap" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: isRoadmapPage ? 'var(--green-dark)' : '#0f172a', fontWeight: isRoadmapPage ? 700 : 600, textDecoration: 'none' }}>Roadmap</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Contact</Link>
            </>
          ) : (isPricingPage || isAboutPage) ? (
            <>
              <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Home</Link>
              <Link href="/features" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Features</Link>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: isPricingPage ? 'var(--green-dark)' : '#0f172a', fontWeight: isPricingPage ? 700 : 600, textDecoration: 'none' }}>Pricing</Link>
              <Link href="/roadmap" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Roadmap</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: isAboutPage ? 'var(--green-dark)' : '#0f172a', fontWeight: isAboutPage ? 700 : 600, textDecoration: 'none' }}>About</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>Contact</Link>
            </>
          ) : (
            <>
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
