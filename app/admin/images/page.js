'use client';
import { useState, useRef } from 'react';

const IMAGE_SLOTS = [
  { key: 'hero-banner', label: 'Hero Banner (Homepage)', path: '/uploads/hero-banner.jpg', desc: 'Main hero image on the homepage', recommended: '1920×700px' },
  { key: 'about-team', label: 'About Us Image', path: '/uploads/about-team.jpg', desc: 'Team photo on the About page', recommended: '800×600px' },
  { key: 'local-seo-hero', label: 'Local SEO Hero Image', path: '/uploads/local-seo-hero.jpg', desc: 'Hero image on the Local SEO page', recommended: '1200×500px' },
  { key: 'ecommerce-seo-hero', label: 'E-commerce SEO Hero', path: '/uploads/ecommerce-seo-hero.jpg', desc: 'Hero image on E-commerce SEO page', recommended: '1200×500px' },
  { key: 'link-building-hero', label: 'Link Building Hero', path: '/uploads/link-building-hero.jpg', desc: 'Hero image on Link Building page', recommended: '1200×500px' },
  { key: 'logo', label: 'Site Logo', path: '/uploads/logo.png', desc: 'Main site logo (transparent background preferred)', recommended: '300×80px' },
  { key: 'og-image', label: 'OG / Social Share Image', path: '/og-image.jpg', desc: 'Default Open Graph image for social sharing', recommended: '1200×630px' },
];

export default function AdminImages() {
  const [uploading, setUploading] = useState({});
  const [messages, setMessages] = useState({});
  const inputRefs = useRef({});

  const handleUpload = async (slotKey, slotPath, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading((prev) => ({ ...prev, [slotKey]: true }));
    setMessages((prev) => ({ ...prev, [slotKey]: '' }));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetPath', slotPath);

    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });

    if (res.ok) {
      setMessages((prev) => ({ ...prev, [slotKey]: '✓ Uploaded successfully!' }));
    } else {
      const err = await res.json();
      setMessages((prev) => ({ ...prev, [slotKey]: `Error: ${err.error}` }));
    }
    setUploading((prev) => ({ ...prev, [slotKey]: false }));
    // Reset input
    if (inputRefs.current[slotKey]) inputRefs.current[slotKey].value = '';
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px' }}>Image Manager</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Upload or replace any image on the website. Changes take effect immediately.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {IMAGE_SLOTS.map((slot) => (
          <div key={slot.key} style={cardStyle}>
            {/* Current image preview */}
            <div style={previewBox}>
              <img
                src={slot.path}
                alt={slot.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }}
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div style={placeholderStyle}>🖼️<br /><span style={{ fontSize: '0.7rem' }}>No image</span></div>
            </div>

            {/* Info + Upload */}
            <div style={{ flex: 1 }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>{slot.label}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '4px' }}>{slot.desc}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '14px' }}>
                Recommended size: <code style={codeStyle}>{slot.recommended}</code> · Saved to: <code style={codeStyle}>{slot.path}</code>
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <label style={uploadBtn} htmlFor={`upload-${slot.key}`}>
                  {uploading[slot.key] ? 'Uploading...' : '📁 Choose File'}
                </label>
                <input
                  id={`upload-${slot.key}`}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={(el) => (inputRefs.current[slot.key] = el)}
                  onChange={(e) => handleUpload(slot.key, slot.path, e)}
                />
                {messages[slot.key] && (
                  <span style={{ fontSize: '0.85rem', color: messages[slot.key].startsWith('✓') ? 'var(--green)' : '#F87171' }}>
                    {messages[slot.key]}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '24px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '0.9rem' }}>ℹ️ Additional Images</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
          For case study images, testimonial photos, and blog images, manage them from their respective sections (Case Studies, Testimonials, Blog Posts). Images for those sections can be uploaded there directly.
        </p>
      </div>
    </div>
  );
}

const cardStyle = { display: 'flex', gap: '20px', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px' };
const previewBox = { width: '100px', height: '70px', borderRadius: '8px', background: 'var(--bg-elevated)', flexShrink: 0, overflow: 'hidden', position: 'relative' };
const placeholderStyle = { display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center' };
const uploadBtn = { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'var(--accent-dim)', color: 'var(--accent-bright)', border: '1px solid var(--accent-border)', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' };
const codeStyle = { background: 'var(--bg-elevated)', padding: '1px 6px', borderRadius: '4px', fontSize: '0.75rem' };
