'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LandingHeader } from '@/components/layout/LandingHeader';
import { LandingFooter } from '@/components/layout/LandingFooter';
import { 
  Mail, MapPin, Clock, BookOpen, Tag, Layers, 
  Send, CheckCircle2, ChevronDown, ChevronUp, Sparkles
} from 'lucide-react';

export default function ContactPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactFaqs = [
    {
      q: "How quickly can I get started with VasifyTech Suite?",
      a: "You can sign up and start using VasifyTech Suite in minutes. Our 7-day free trial includes full access to all features. Most teams are up and running within the first day, and our onboarding team is available to help with data migration if needed."
    },
    {
      q: "Do you offer demos or consultations?",
      a: "Yes! We offer personalized demos for teams interested in seeing how VasifyTech Suite can work for their specific use case. Just select 'Sales Inquiry' in the contact form above and mention you'd like a demo. Our team will schedule a call at your convenience."
    },
    {
      q: "What support options are available?",
      a: "All plans include email support with 24-hour response times during business hours. Professional plan members also get priority support with faster response times and access to our API documentation. We also have an extensive Help Center with guides and tutorials."
    },
    {
      q: "Can I migrate data from my current tools?",
      a: "Absolutely. VasifyTech Suite supports data import from most popular business tools including spreadsheets (CSV/Excel), QuickBooks, HubSpot, and more. Our support team can assist with complex migrations to ensure a smooth transition with no data loss."
    }
  ];

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--body)' }}>
      <LandingHeader />

      {/* ===== HERO SECTION ===== */}
      <section style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(29, 168, 81, 0.15), transparent)',
        padding: '64px 0 56px',
        textAlign: 'center',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="wrap" style={{ maxWidth: '840px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--green-tint)',
            border: '1px solid var(--green-tint-2)',
            color: 'var(--green-dark)',
            fontSize: '12px',
            fontWeight: 700,
            padding: '5px 16px',
            borderRadius: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '20px'
          }}>
            <Mail size={14} color="var(--green-dark)" /> Get in Touch
          </span>

          <h1 style={{
            fontSize: 'clamp(36px, 4.6vw, 56px)',
            lineHeight: 1.1,
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '20px',
            letterSpacing: '-0.02em'
          }}>
            Got Questions? <span style={{
              background: 'linear-gradient(135deg, var(--green-dark) 0%, var(--green) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Get Answers in 24 Hours.</span>
          </h1>

          <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto' }}>
            Whether you need help, want a demo, or just have questions — we respond within 24 hours. Promise.
          </p>
        </div>
      </section>

      {/* ===== MAIN CONTACT SECTION (INFO LEFT, FORM RIGHT) ===== */}
      <section style={{ padding: '72px 0 88px', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap" style={{ maxWidth: '1140px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
            
            {/* LEFT COLUMN: CONTACT INFORMATION & QUICK LINKS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Contact Information</h2>
                <p style={{ fontSize: '14.5px', color: '#64748b', lineHeight: 1.5 }}>
                  Reach out to us through any of these channels. We typically respond within 24 business hours.
                </p>
              </div>

              {/* Email Card */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--green-tint)', border: '1px solid var(--green-tint-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-dark)', flexShrink: 0 }}>
                  <Mail size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>Email Us</h3>
                  <a href="mailto:info@vasifytech.com" style={{ fontSize: '14px', color: 'var(--green-dark)', fontWeight: 700, textDecoration: 'none' }}>
                    info@vasifytech.com
                  </a>
                  <p style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '2px' }}>For general inquiries and support</p>
                </div>
              </div>

              {/* Office Location Card */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>Office Location</h3>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>VasifyTech LLC</p>
                  <p style={{ fontSize: '13.5px', color: '#64748b' }}>42 Broadway, Suite 12-694</p>
                  <p style={{ fontSize: '13.5px', color: '#64748b' }}>New York, NY 10004</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>United States</p>
                </div>
              </div>

              {/* Business Hours Card */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fffbeb', border: '1px solid #fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', flexShrink: 0 }}>
                  <Clock size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>Business Hours</h3>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Monday - Friday</p>
                  <p style={{ fontSize: '13.5px', color: '#64748b' }}>9:00 AM - 6:00 PM EST</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>We cover EST to PST time zones</p>
                </div>
              </div>

              {/* Quick Resources */}
              <div style={{ background: '#f8fdf9', border: '1px solid var(--green-tint-2)', borderRadius: '16px', padding: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Quick Resources</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
                  <Link href="/features" style={{ color: 'var(--green-dark)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layers size={16} /> Explore Features
                  </Link>
                  <Link href="/pricing" style={{ color: 'var(--green-dark)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Tag size={16} /> View Pricing Plans
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CONTACT FORM */}
            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '36px 32px', boxShadow: 'var(--shadow-md)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Send Us a Message</h2>
              <p style={{ fontSize: '14.5px', color: '#64748b', marginBottom: '28px' }}>
                Fill out the form below and we'll get back to you within 24 business hours.
              </p>

              {formSubmitted && (
                <div style={{
                  background: 'var(--green-tint)',
                  border: '1px solid var(--green-tint-2)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <CheckCircle2 size={24} color="var(--green-dark)" />
                  <div>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--green-dark)' }}>Message Sent Successfully!</h4>
                    <p style={{ fontSize: '13px', color: 'var(--green-dark)' }}>Thank you for reaching out. We'll get back to you within 24 business hours.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label htmlFor="name" style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Full Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Smith"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                      color: '#0f172a'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Email Address <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                      color: '#0f172a'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="subject" style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Subject <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                      color: '#0f172a',
                      background: '#ffffff'
                    }}
                  >
                    <option value="">Select a subject</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Product Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Message <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                      color: '#0f172a',
                      resize: 'none'
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-brass btn-block vt-pulse-cta" style={{ borderRadius: '12px', padding: '14px', fontWeight: 800, fontSize: '15px' }}>
                  Send Message <Send size={16} />
                </button>

                <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
                  By submitting this form, you agree to our Privacy Policy.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section style={{ background: '#f8fdf9', padding: '88px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="wrap" style={{ maxWidth: '780px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b' }}>
              Quick answers to common questions. Can't find what you need? Send us a message above.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {contactFaqs.map((faq, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    textAlign: 'left',
                    background: openFaq === idx ? '#f8fafc' : '#ffffff',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#0f172a',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp size={20} color="var(--green-dark)" />
                  ) : (
                    <ChevronDown size={20} color="#64748b" />
                  )}
                </button>

                {openFaq === idx && (
                  <div style={{ padding: '0 24px 20px', fontSize: '14.5px', color: '#475569', lineHeight: 1.6, background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA BANNER ===== */}
      <section style={{
        background: 'linear-gradient(135deg, var(--green) 0%, var(--green-dark) 100%)',
        padding: '72px 0',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <div className="wrap" style={{ maxWidth: '760px' }}>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: '18px', color: '#dcf3e2', marginBottom: '32px' }}>
            Join 4,500+ businesses saving time and money with VasifyTech Suite. Start your free trial today.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => router.push('/app/crm')} className="btn btn-lg" style={{ background: '#ffffff', color: 'var(--green-dark)', fontWeight: 800, borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
              Start Free Trial
            </button>
            <Link href="/pricing" className="btn btn-secondary btn-lg" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '12px', textDecoration: 'none' }}>
              View Pricing
            </Link>
          </div>
          <p style={{ fontSize: '13px', color: '#dcf3e2', marginTop: '16px' }}>
            7-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
