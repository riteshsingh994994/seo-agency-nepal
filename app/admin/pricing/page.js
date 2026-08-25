'use client';
import { useState, useEffect } from 'react';

export default function AdminPricing() {
  const [plans, setPlans] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/pricing').then((r) => r.json()).then(setPlans);
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...plans];
    updated[index][field] = value;
    setPlans(updated);
    setSaved(false);
  };

  const handleFeatureChange = (planIndex, featIndex, value) => {
    const updated = [...plans];
    updated[planIndex].features[featIndex] = value;
    setPlans(updated);
    setSaved(false);
  };

  const handleAddFeature = (planIndex) => {
    const updated = [...plans];
    updated[planIndex].features.push('New feature item');
    setPlans(updated);
    setSaved(false);
  };

  const handleDeleteFeature = (planIndex, featIndex) => {
    const updated = [...plans];
    updated[planIndex].features.splice(featIndex, 1);
    setPlans(updated);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/admin/pricing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plans),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Pricing Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Edit pricing tiers and features in NPR.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn btn-primary btn-sm">
          {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save All Changes'}
        </button>
      </div>

      <div className="grid-3" style={{ gap: '20px' }}>
        {plans.map((plan, i) => (
          <div key={plan.id || i} style={cardStyle}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              Plan: {plan.name}
            </h3>

            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">Plan Name</label>
              <input className="form-input" value={plan.name || ''} onChange={(e) => handleChange(i, 'name', e.target.value)} />
            </div>

            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">Tagline</label>
              <input className="form-input" value={plan.tagline || ''} onChange={(e) => handleChange(i, 'tagline', e.target.value)} />
            </div>

            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">Price (NPR)</label>
              <input type="number" className="form-input" value={plan.price || 0} onChange={(e) => handleChange(i, 'price', Number(e.target.value))} />
            </div>

            <div style={{ marginTop: '16px' }}>
              <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Features</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {plan.features?.map((feat, fIdx) => (
                  <div key={fIdx} style={{ display: 'flex', gap: '6px' }}>
                    <input className="form-input" style={{ fontSize: '0.85rem' }} value={feat} onChange={(e) => handleFeatureChange(i, fIdx, e.target.value)} />
                    <button onClick={() => handleDeleteFeature(i, fIdx)} style={smallDeleteBtn}>✕</button>
                  </div>
                ))}
                <button onClick={() => handleAddFeature(i)} className="btn btn-secondary btn-sm" style={{ marginTop: '6px', alignSelf: 'flex-start' }}>+ Add Feature</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px' };
const smallDeleteBtn = { background: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.2)', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer' };
