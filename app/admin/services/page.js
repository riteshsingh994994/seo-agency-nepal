'use client';
import { useState, useEffect } from 'react';

const SERVICES = [
  { key: 'seo', label: 'Full SEO Services' },
  { key: 'local-seo', label: 'Local SEO' },
  { key: 'ecommerce-seo', label: 'E-commerce SEO' },
  { key: 'link-building', label: 'Link Building' },
  { key: 'geo-aeo', label: 'GEO & AEO (AI Search)' },
];

export default function AdminServices() {
  const [selectedKey, setSelectedKey] = useState('local-seo');
  const [servicesData, setServicesData] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/services').then((r) => r.json()).then(setServicesData);
  }, []);

  const currentService = servicesData[selectedKey] || {};

  const handleChange = (field, value) => {
    const updated = { ...currentService, [field]: value };
    setServicesData({ ...servicesData, [selectedKey]: updated });
    setSaved(false);
  };

  const handleFeatureChange = (fIdx, value) => {
    const features = [...(currentService.features || [])];
    features[fIdx] = value;
    handleChange('features', features);
  };

  const handleAddFeature = () => {
    const features = [...(currentService.features || []), 'New feature item'];
    handleChange('features', features);
  };

  const handleDeleteFeature = (fIdx) => {
    const features = (currentService.features || []).filter((_, i) => i !== fIdx);
    handleChange('features', features);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/admin/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceKey: selectedKey, updates: currentService }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Services Content Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Edit copy, features, and headlines for the 3 main services.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn btn-primary btn-sm">
          {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Service Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {SERVICES.map((s) => (
          <button
            key={s.key}
            onClick={() => setSelectedKey(s.key)}
            style={{
              padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)',
              background: selectedKey === s.key ? 'var(--accent-dim)' : 'var(--bg-card)',
              color: selectedKey === s.key ? 'var(--accent-bright)' : 'var(--text-secondary)',
              fontWeight: selectedKey === s.key ? 700 : 500, cursor: 'pointer', fontSize: '0.88rem'
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
        <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
          <div className="form-group">
            <label className="form-label">Service Title</label>
            <input className="form-input" value={currentService.title || ''} onChange={(e) => handleChange('title', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Headline</label>
            <input className="form-input" value={currentService.headline || ''} onChange={(e) => handleChange('headline', e.target.value)} />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '16px' }}>
          <label className="form-label">Sub-headline</label>
          <input className="form-input" value={currentService.subheadline || ''} onChange={(e) => handleChange('subheadline', e.target.value)} />
        </div>

        <div className="form-group" style={{ marginBottom: '16px' }}>
          <label className="form-label">Full Description</label>
          <textarea className="form-input" rows={3} value={currentService.description || ''} onChange={(e) => handleChange('description', e.target.value)} />
        </div>

        <div className="grid-2" style={{ gap: '16px', marginBottom: '20px' }}>
          <div className="form-group">
            <label className="form-label">SEO Meta Title</label>
            <input className="form-input" value={currentService.metaTitle || ''} onChange={(e) => handleChange('metaTitle', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">SEO Meta Description</label>
            <input className="form-input" value={currentService.metaDescription || ''} onChange={(e) => handleChange('metaDescription', e.target.value)} />
          </div>
        </div>

        <div>
          <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Features List</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {currentService.features?.map((feat, fIdx) => (
              <div key={fIdx} style={{ display: 'flex', gap: '6px' }}>
                <input className="form-input" value={feat} onChange={(e) => handleFeatureChange(fIdx, e.target.value)} />
                <button onClick={() => handleDeleteFeature(fIdx)} style={{ background: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.2)', width: '36px', borderRadius: '6px', cursor: 'pointer' }}>✕</button>
              </div>
            ))}
            <button onClick={handleAddFeature} className="btn btn-secondary btn-sm" style={{ marginTop: '8px', alignSelf: 'flex-start' }}>+ Add Feature</button>
          </div>
        </div>
      </div>
    </div>
  );
}
