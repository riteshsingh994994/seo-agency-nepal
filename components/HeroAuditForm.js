'use client';
import { useState } from 'react';
import { openAuditModal } from '@/components/AuditModal';

export default function HeroAuditForm() {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    openAuditModal(url);
  };

  return (
    <form onSubmit={handleSubmit} style={heroStyles.form} aria-label="Free SEO audit request form">
      <input
        type="text"
        name="website"
        placeholder="Enter your website URL (e.g. yourbusiness.com.np)"
        style={heroStyles.input}
        aria-label="Your website URL"
        id="hero-url-input"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit" className="btn btn-primary" id="hero-audit-btn" style={{ flexShrink: 0 }}>
        Get Free Audit →
      </button>
    </form>
  );
}

const heroStyles = {
  form: {
    display: 'flex', gap: '10px', width: '100%', maxWidth: '580px',
    background: 'var(--bg-card)', border: '1px solid var(--border-strong)',
    borderRadius: '999px', padding: '6px 6px 6px 20px', flexWrap: 'wrap',
  },
  input: {
    flex: 1, minWidth: '200px', background: 'none', border: 'none',
    color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none',
  },
};
