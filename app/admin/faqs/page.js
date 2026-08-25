'use client';
import { useState, useEffect } from 'react';

const PAGES = [
  { key: 'home', label: 'Homepage FAQs' },
  { key: 'local-seo', label: 'Local SEO Page FAQs' },
  { key: 'ecommerce-seo', label: 'E-commerce SEO Page FAQs' },
  { key: 'link-building', label: 'Link Building Page FAQs' },
  { key: 'pricing', label: 'Pricing Page FAQs' },
  { key: 'contact', label: 'Contact Page FAQs' },
];

export default function AdminFAQs() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [faqsData, setFaqsData] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/faqs').then((r) => r.json()).then(setFaqsData);
  }, []);

  const currentFaqs = faqsData[selectedPage] || [];

  const handleChange = (index, field, value) => {
    const updated = [...currentFaqs];
    updated[index][field] = value;
    setFaqsData({ ...faqsData, [selectedPage]: updated });
    setSaved(false);
  };

  const handleAdd = () => {
    const updated = [...currentFaqs, { q: 'New Question?', a: 'Answer text...' }];
    setFaqsData({ ...faqsData, [selectedPage]: updated });
    setSaved(false);
  };

  const handleDelete = (index) => {
    const updated = currentFaqs.filter((_, i) => i !== index);
    setFaqsData({ ...faqsData, [selectedPage]: updated });
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/admin/faqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: selectedPage, faqs: currentFaqs }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>FAQs Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Manage page-level FAQs and JSON-LD schema content.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleAdd} className="btn btn-secondary btn-sm">+ Add FAQ</button>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary btn-sm">
            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Page FAQs'}
          </button>
        </div>
      </div>

      {/* Page selector tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {PAGES.map((p) => (
          <button
            key={p.key}
            onClick={() => setSelectedPage(p.key)}
            style={{
              padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)',
              background: selectedPage === p.key ? 'var(--accent-dim)' : 'var(--bg-card)',
              color: selectedPage === p.key ? 'var(--accent-bright)' : 'var(--text-secondary)',
              fontWeight: selectedPage === p.key ? 700 : 500, cursor: 'pointer', fontSize: '0.88rem'
            }}
          >
            {p.label} ({faqsData[p.key]?.length || 0})
          </button>
        ))}
      </div>

      {/* FAQ items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {currentFaqs.map((faq, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-muted)' }}>FAQ #{i + 1}</span>
              <button onClick={() => handleDelete(i)} style={deleteBtnStyle}>Delete</button>
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">Question</label>
              <input className="form-input" value={faq.q || ''} onChange={(e) => handleChange(i, 'q', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Answer</label>
              <textarea className="form-input" rows={3} value={faq.a || ''} onChange={(e) => handleChange(i, 'a', e.target.value)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px' };
const deleteBtnStyle = { background: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.2)', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' };
