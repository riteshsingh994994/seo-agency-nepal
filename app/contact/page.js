'use client';
import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';

const breadcrumbs = [{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', website: '', service: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // In a real setup, POST to an API route or email service
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <>
      <Breadcrumb items={breadcrumbs} />

      <section style={{ padding: '80px 0 40px' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>

            {/* Left: Info */}
            <div>
              <span className="eyebrow">Get In Touch</span>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.025em', margin: '12px 0 16px' }}>
                Let&apos;s Grow Your Business with SEO
              </h1>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '36px' }}>
                Ready to dominate Google in Nepal? Fill out the form and our SEO experts will get back to you within 24 hours with a free audit and custom strategy.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { icon: '📞', label: 'Phone / WhatsApp', value: '+977-9800000000', href: 'tel:+9779800000000' },
                  { icon: '✉️', label: 'Email', value: 'hello@seoagencynepal.com', href: 'mailto:hello@seoagencynepal.com' },
                  { icon: '📍', label: 'Office Address', value: 'Thamel, Kathmandu, Nepal', href: null },
                  { icon: '🕐', label: 'Office Hours', value: 'Sun–Fri: 9AM – 6PM (NPT)', href: null },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={iconBox}>{item.icon}</div>
                    <div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.value}</a>
                      ) : (
                        <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '40px', background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                <p style={{ fontWeight: 700, marginBottom: '8px' }}>🎁 Free SEO Audit Included</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  Every inquiry comes with a free SEO audit worth NPR 5,000. We&apos;ll analyze your website and show you exactly how to improve your rankings.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div style={formCard}>
              <h2 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '8px' }}>Get Your Free SEO Audit</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '28px' }}>Fill out the form and we&apos;ll get back to you within 24 hours.</p>

              {status === 'success' ? (
                <div style={successBox}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎉</div>
                  <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Thank You!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    We&apos;ve received your inquiry. Our SEO expert will contact you within 24 hours with your free audit.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} noValidate>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">Full Name *</label>
                      <input id="contact-name" name="name" type="text" required className="form-input" placeholder="Rajesh Sharma" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">Email *</label>
                      <input id="contact-email" name="email" type="email" required className="form-input" placeholder="rajesh@company.com" value={form.email} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-phone">Phone / WhatsApp</label>
                      <input id="contact-phone" name="phone" type="tel" className="form-input" placeholder="+977-98XXXXXXXX" value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-website">Website URL</label>
                      <input id="contact-website" name="website" type="url" className="form-input" placeholder="https://yourbusiness.com" value={form.website} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-service">Service Interested In</label>
                    <select id="contact-service" name="service" className="form-input" value={form.service} onChange={handleChange}>
                      <option value="">Select a service...</option>
                      <option value="local-seo">Local SEO</option>
                      <option value="ecommerce-seo">E-commerce SEO</option>
                      <option value="link-building">Link Building</option>
                      <option value="all">Full SEO Package</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Tell Us About Your Goals</label>
                    <textarea id="contact-message" name="message" className="form-input" rows={4} placeholder="Describe your business, current challenges, and what you want to achieve with SEO..." value={form.message} onChange={handleChange} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }} id="contact-form-submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Send & Get Free Audit →'}
                  </button>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    By submitting, you agree to our Privacy Policy. We never spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '2rem' }}>📍</span>
            <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Thamel, Kathmandu, Nepal</p>
            <a href="https://maps.google.com/maps?q=Thamel,Kathmandu,Nepal" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
              Open in Google Maps →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

const iconBox = { width: '44px', height: '44px', background: 'var(--accent-dim)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 };
const formCard = { background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-lg)', padding: '36px', boxShadow: 'var(--shadow-accent)' };
const successBox = { background: 'var(--green-dim)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-md)', padding: '40px', textAlign: 'center' };
