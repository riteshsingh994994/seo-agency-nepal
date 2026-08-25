'use client';
import { useState, useEffect } from 'react';

export default function AuditModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ website: '', name: '', email: '', phone: '', service: 'Full 360° SEO' });
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState('input'); // 'input', 'scanning', 'success'
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    // Listen for custom trigger event open-audit-modal
    const handleOpen = (e) => {
      const initialUrl = e?.detail?.url || '';
      setForm((prev) => ({ ...prev, website: initialUrl }));
      setStep('input');
      setIsOpen(true);
    };

    window.addEventListener('open-audit-modal', handleOpen);
    return () => window.removeEventListener('open-audit-modal', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStep('scanning');

    // Simulate audit scan progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 300);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      setTimeout(() => {
        setSubmitting(false);
        if (res.ok) {
          setStep('success');
        } else {
          alert('Submission failed. Please try again.');
          setStep('input');
        }
      }, 1800);
    } catch (err) {
      setSubmitting(false);
      alert('Network error. Please try again.');
      setStep('input');
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={() => setIsOpen(false)} role="dialog" aria-modal="true" aria-labelledby="audit-modal-title">
      <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button onClick={() => setIsOpen(false)} style={styles.closeBtn} aria-label="Close modal" id="close-audit-modal-btn">
          ✕
        </button>

        {step === 'input' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={styles.iconCircle}>🔍</div>
              <h2 id="audit-modal-title" style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '12px' }}>
                Get Your Free 360° SEO Audit
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '6px' }}>
                Enter your details below and our SEO team in Kathmandu will generate a complete technical & local SEO report for your website.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="modal-website">Website URL *</label>
                <input
                  id="modal-website"
                  name="website"
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. yourbusiness.com.np"
                  value={form.website}
                  onChange={handleChange}
                  autoFocus
                />
              </div>

              <div className="grid-2" style={{ gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="modal-name">Full Name *</label>
                  <input
                    id="modal-name"
                    name="name"
                    type="text"
                    required
                    className="form-input"
                    placeholder="Rajesh Sharma"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="modal-phone">Phone / WhatsApp *</label>
                  <input
                    id="modal-phone"
                    name="phone"
                    type="tel"
                    required
                    className="form-input"
                    placeholder="+977-98XXXXXXXX"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="modal-email">Email Address *</label>
                <input
                  id="modal-email"
                  name="email"
                  type="email"
                  required
                  className="form-input"
                  placeholder="rajesh@company.com.np"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="modal-service">Primary Goal</label>
                <select id="modal-service" name="service" className="form-input" value={form.service} onChange={handleChange}>
                  <option value="Full 360° SEO">Full 360° SEO Audit</option>
                  <option value="Local SEO">Local SEO & Google Maps Ranking</option>
                  <option value="E-commerce SEO">E-commerce Store SEO</option>
                  <option value="Link Building">Link Building & Domain Authority</option>
                  <option value="GEO & AEO">AI Search (ChatGPT / Gemini) Optimization</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ justifyContent: 'center', marginTop: '10px' }} id="submit-audit-btn">
                🚀 Scan My Website Now
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                100% Free · No credit card required · Audit sent within 24 hours
              </p>
            </form>
          </div>
        )}

        {step === 'scanning' && (
          <div style={{ textAlign: 'center', padding: '40px 10px' }}>
            <div style={styles.spinner}>⚙️</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '20px' }}>
              Scanning <span className="gradient-text">{form.website || 'website'}</span>...
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '8px', marginBottom: '24px' }}>
              Analyzing Core Web Vitals, On-Page SEO, Schema Markup & Local Citations...
            </p>

            <div style={styles.progressBarBg}>
              <div style={{ ...styles.progressBarFill, width: `${scanProgress}%` }} />
            </div>
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-bright)', fontWeight: 700 }}>{scanProgress}% Completed</span>
          </div>
        )}

        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Audit Request Submitted!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginTop: '12px', marginBottom: '24px' }}>
              Thank you, <strong style={{ color: 'var(--text-primary)' }}>{form.name}</strong>. We are generating the complete SEO audit report for <code style={{ color: 'var(--accent-bright)', background: 'var(--bg-elevated)', padding: '2px 8px', borderRadius: '4px' }}>{form.website}</code>.
            </p>
            <div style={{ background: 'var(--green-dim)', border: '1px solid rgba(16,185,129,0.3)', padding: '16px', borderRadius: '8px', marginBottom: '24px', textAlign: 'left', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <p style={{ color: 'var(--green)', fontWeight: 700, marginBottom: '4px' }}>What happens next?</p>
              <ul style={{ paddingLeft: '18px', listStyle: 'disc' }}>
                <li>Our SEO specialist in Kathmandu will complete your audit report.</li>
                <li>We will email the full report to <strong>{form.email}</strong>.</li>
                <li>We will follow up via WhatsApp at <strong>{form.phone}</strong>.</li>
              </ul>
            </div>
            <button onClick={() => setIsOpen(false)} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} id="close-success-audit-btn">
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Global helper function to trigger the audit modal from anywhere
export function openAuditModal(url = '') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-audit-modal', { detail: { url } }));
  }
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 9999,
    background: 'rgba(6, 6, 12, 0.85)',
    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '20px', animation: 'fadeIn 200ms ease',
  },
  modalCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-accent)',
    borderRadius: 'var(--radius-xl)',
    padding: '36px',
    maxWidth: '520px', width: '100%',
    position: 'relative',
    boxShadow: 'var(--shadow-accent)',
  },
  closeBtn: {
    position: 'absolute', top: '16px', right: '16px',
    background: 'var(--bg-elevated)', border: '1px solid var(--border)',
    color: 'var(--text-muted)', width: '32px', height: '32px',
    borderRadius: '50%', cursor: 'pointer', fontSize: '0.9rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 200ms ease',
  },
  iconCircle: {
    width: '48px', height: '48px', background: 'var(--accent-dim)',
    borderRadius: '50%', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '1.4rem', margin: '0 auto',
  },
  spinner: { fontSize: '2.5rem', animation: 'spin 2s linear infinite' },
  progressBarBg: { width: '100%', height: '8px', background: 'var(--bg-elevated)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' },
  progressBarFill: { height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--cyan))', transition: 'width 300ms ease' },
};
