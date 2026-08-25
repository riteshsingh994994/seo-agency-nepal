'use client';
import { useState, useEffect } from 'react';

const AdminPageWrapper = ({ title, children }) => (
  <div>
    <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '24px' }}>{title}</h1>
    {children}
  </div>
);

export function AdminSaveBtn({ onClick, saving, saved }) {
  return (
    <button onClick={onClick} disabled={saving} style={saveBtnStyle} id="admin-save-btn">
      {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
    </button>
  );
}

export { AdminPageWrapper };

const saveBtnStyle = {
  background: 'linear-gradient(135deg, var(--accent), #9B6DE8)',
  color: '#fff', border: 'none', borderRadius: '8px',
  padding: '12px 28px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
};
