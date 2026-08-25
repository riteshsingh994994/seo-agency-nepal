'use client';
import { useState, useEffect } from 'react';

export default function AdminSettings() {
  const [site, setSite] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/site').then((r) => r.json()).then(setSite);
  }, []);

  const handleChange = (path, value) => {
    setSite((prev) => {
      const updated = { ...prev };
      if (path.includes('.')) {
        const [parent, child] = path.split('.');
        updated[parent] = { ...updated[parent], [child]: value };
      } else {
        updated[path] = value;
      }
      return updated;
    });
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/admin/site', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(site) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!site) return <div style={{ color: 'var(--text-muted)', padding: '40px' }}>Loading settings...</div>;

  const Field = ({ label, field, type = 'text', placeholder = '' }) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-input"
        value={field.includes('.') ? (site[field.split('.')[0]] || {})[field.split('.')[1]] || '' : site[field] || ''}
        placeholder={placeholder}
        onChange={(e) => handleChange(field, e.target.value)}
      />
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Site Settings</h1>
        <button onClick={handleSave} disabled={saving} style={saveBtn} id="settings-save-btn">
          {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* General */}
        <section style={section}>
          <h2 style={sectionTitle}>General Information & Base Domain</h2>
          <div className="grid-2" style={{ gap: '16px' }}>
            <Field label="Agency Name" field="name" />
            <Field label="Website Base URL (Canonicals & Sitemap)" field="siteUrl" placeholder="https://seoagencynepal.com" />
            <Field label="Tagline" field="tagline" />
            <Field label="Hero Headline" field="heroHeadline" />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            ℹ️ Changing the Website Base URL will automatically update canonical tags, XML sitemap, robots.txt, OpenGraph URLs, and JSON-LD structured schemas across every page.
          </p>
          <div className="form-group" style={{ marginTop: '16px' }}>
            <label className="form-label">Site Description</label>
            <textarea className="form-input" rows={3} value={site.description || ''} onChange={(e) => handleChange('description', e.target.value)} />
          </div>
          <div className="form-group" style={{ marginTop: '16px' }}>
            <label className="form-label">Hero Sub-headline</label>
            <textarea className="form-input" rows={2} value={site.heroSubheadline || ''} onChange={(e) => handleChange('heroSubheadline', e.target.value)} />
          </div>
        </section>

        {/* SEO Analytics & Search Console */}
        <section style={section}>
          <h2 style={sectionTitle}>Google Search Console & Analytics</h2>
          <div className="grid-2" style={{ gap: '16px' }}>
            <Field label="Google Search Console Verification Code" field="googleSiteVerification" placeholder="33cYqTKhmSXG2cG2HAlsNOnfuC8iruFfPaTHgwxox4E" />
            <Field label="Google Analytics Measurement ID (gtag.js)" field="googleAnalyticsId" placeholder="G-CWDVVP86G1" />
          </div>
        </section>

        {/* Contact */}
        <section style={section}>
          <h2 style={sectionTitle}>Contact Information (NAP)</h2>
          <div className="grid-2" style={{ gap: '16px' }}>
            <Field label="Email Address" field="email" type="email" placeholder="hello@yourdomain.com" />
            <Field label="Phone Number" field="phone" placeholder="+977-9800000000" />
            <Field label="WhatsApp Number" field="whatsapp" placeholder="+977-9800000000" />
            <Field label="Street Address" field="address.street" placeholder="Thamel, Kathmandu" />
            <Field label="City" field="address.city" placeholder="Kathmandu" />
            <Field label="State/Province" field="address.state" placeholder="Bagmati Province" />
            <Field label="Country" field="address.country" placeholder="Nepal" />
            <Field label="Postal Code" field="address.postalCode" placeholder="44600" />
          </div>
        </section>

        {/* Social */}
        <section style={section}>
          <h2 style={sectionTitle}>Social Media Links</h2>
          <div className="grid-2" style={{ gap: '16px' }}>
            <Field label="Facebook URL" field="social.facebook" placeholder="https://facebook.com/..." />
            <Field label="Instagram URL" field="social.instagram" placeholder="https://instagram.com/..." />
            <Field label="LinkedIn URL" field="social.linkedin" placeholder="https://linkedin.com/..." />
            <Field label="Twitter/X URL" field="social.twitter" placeholder="https://twitter.com/..." />
            <Field label="YouTube URL" field="social.youtube" placeholder="https://youtube.com/..." />
            <Field label="Google Business Profile URL" field="googleBusinessProfile" />
          </div>
        </section>

        {/* Security */}
        <section style={section}>
          <h2 style={sectionTitle}>Security</h2>
          <div className="grid-2" style={{ gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Admin Password</label>
              <input
                type="password"
                className="form-input"
                value={site.adminPassword || ''}
                onChange={(e) => handleChange('adminPassword', e.target.value)}
                placeholder="Enter new password"
              />
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                Change this to a strong password. You will need it to login.
              </p>
            </div>
          </div>
        </section>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleSave} disabled={saving} style={saveBtn} id="settings-save-bottom">
            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

const saveBtn = { background: 'linear-gradient(135deg, var(--accent), #9B6DE8)', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 28px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' };
const section = { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '28px' };
const sectionTitle = { fontSize: '1rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)', paddingBottom: '12px', borderBottom: '1px solid var(--border)' };
