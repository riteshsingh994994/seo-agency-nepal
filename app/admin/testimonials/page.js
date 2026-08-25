'use client';
import { useState, useEffect } from 'react';

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/testimonials').then((r) => r.json()).then(setItems);
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
    setSaved(false);
  };

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      name: 'Client Name',
      company: 'Company Name',
      city: 'Kathmandu',
      rating: 5,
      text: 'Great SEO services that increased our traffic and rankings!',
      service: 'Local SEO'
    };
    setItems([...items, newItem]);
    setSaved(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this testimonial?')) {
      setItems(items.filter((item) => item.id !== id));
      setSaved(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/admin/testimonials', {
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
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Testimonials Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Manage client reviews displayed on website.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleAdd} className="btn btn-secondary btn-sm">+ Add Testimonial</button>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary btn-sm">
            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save All Changes'}
          </button>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '20px' }}>
        {items.map((t, i) => (
          <div key={t.id || i} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="badge">{t.service}</span>
              <button onClick={() => handleDelete(t.id)} style={deleteBtnStyle}>Delete</button>
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">Client Name</label>
              <input className="form-input" value={t.name || ''} onChange={(e) => handleChange(i, 'name', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">Company</label>
              <input className="form-input" value={t.company || ''} onChange={(e) => handleChange(i, 'company', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">City</label>
              <input className="form-input" value={t.city || ''} onChange={(e) => handleChange(i, 'city', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">Review Text</label>
              <textarea className="form-input" rows={3} value={t.text || ''} onChange={(e) => handleChange(i, 'text', e.target.value)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px' };
const deleteBtnStyle = { background: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.2)', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' };
