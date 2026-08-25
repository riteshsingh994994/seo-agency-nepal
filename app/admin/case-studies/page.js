'use client';
import { useState, useEffect } from 'react';

export default function AdminCaseStudies() {
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/case-studies').then((r) => r.json()).then(setItems);
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
    setSaved(false);
  };

  const handleResultChange = (csIndex, resIndex, field, value) => {
    const updated = [...items];
    updated[csIndex].results[resIndex][field] = value;
    setItems(updated);
    setSaved(false);
  };

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      slug: `new-case-study-${items.length + 1}`,
      client: 'New Client Name',
      industry: 'Industry',
      service: 'Local SEO',
      city: 'Kathmandu',
      challenge: 'Describe the client challenge here...',
      solution: 'Describe the solution implemented here...',
      results: [
        { metric: 'Organic Traffic', value: '+100%', period: 'in 3 months' },
        { metric: 'Keyword Rankings', value: '#1 Position', period: 'for main keywords' },
        { metric: 'Lead Generation', value: '+150%', period: 'increase' }
      ],
      image: '/uploads/case-studies/default.jpg',
      published: true,
      date: new Date().toISOString().split('T')[0]
    };
    setItems([...items, newItem]);
    setSaved(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this case study?')) {
      setItems(items.filter((item) => item.id !== id));
      setSaved(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/admin/case-studies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Case Studies Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Manage portfolio and success stories shown on website.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleAdd} className="btn btn-secondary btn-sm">+ Add Case Study</button>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary btn-sm">
            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save All Changes'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {items.map((cs, i) => (
          <div key={cs.id || i} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge">{cs.service}</span>
                <span style={{ fontWeight: 700, fontSize: '1rem' }}>{cs.client || 'Untitled Case Study'}</span>
              </div>
              <button onClick={() => handleDelete(cs.id)} style={deleteBtnStyle}>Delete</button>
            </div>

            <div className="grid-2" style={{ gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Client Name</label>
                <input className="form-input" value={cs.client || ''} onChange={(e) => handleChange(i, 'client', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Slug</label>
                <input className="form-input" value={cs.slug || ''} onChange={(e) => handleChange(i, 'slug', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Industry</label>
                <input className="form-input" value={cs.industry || ''} onChange={(e) => handleChange(i, 'industry', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <input className="form-input" value={cs.city || ''} onChange={(e) => handleChange(i, 'city', e.target.value)} />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '16px' }}>
              <label className="form-label">Challenge</label>
              <textarea className="form-input" rows={2} value={cs.challenge || ''} onChange={(e) => handleChange(i, 'challenge', e.target.value)} />
            </div>

            <div className="form-group" style={{ marginTop: '16px' }}>
              <label className="form-label">Solution</label>
              <textarea className="form-input" rows={2} value={cs.solution || ''} onChange={(e) => handleChange(i, 'solution', e.target.value)} />
            </div>

            <div style={{ marginTop: '16px' }}>
              <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Result Metrics</label>
              <div className="grid-3" style={{ gap: '12px' }}>
                {cs.results?.map((res, rIdx) => (
                  <div key={rIdx} style={{ background: 'var(--bg-elevated)', padding: '12px', borderRadius: '8px' }}>
                    <input className="form-input" style={{ marginBottom: '6px', fontSize: '0.8rem' }} placeholder="Metric" value={res.metric} onChange={(e) => handleResultChange(i, rIdx, 'metric', e.target.value)} />
                    <input className="form-input" style={{ marginBottom: '6px', fontSize: '0.8rem' }} placeholder="Value (e.g. +280%)" value={res.value} onChange={(e) => handleResultChange(i, rIdx, 'value', e.target.value)} />
                    <input className="form-input" style={{ fontSize: '0.8rem' }} placeholder="Period" value={res.period} onChange={(e) => handleResultChange(i, rIdx, 'period', e.target.value)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px' };
const deleteBtnStyle = { background: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.2)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' };
