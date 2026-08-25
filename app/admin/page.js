'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Incorrect password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={wrap}>
      <div style={card}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={logoBox}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#adminLogoGrad)"/>
              <path d="M8 22L13 10L18 18L21 14L24 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="adminLogoGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#7B5EA7"/>
                  <stop offset="100%" stopColor="#22D3EE"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '16px', marginBottom: '6px' }}>Admin Panel</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>SEO Agency Nepal — Content Management</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Admin Password</label>
            <input
              id="admin-password"
              type="password"
              className="form-input"
              placeholder="Enter your admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
          </div>
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '12px', color: '#F87171', fontSize: '0.88rem' }}>
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }} id="admin-login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login to Admin Panel'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Default password: <code style={{ background: 'var(--bg-elevated)', padding: '2px 6px', borderRadius: '4px' }}>admin@123</code>
          <br />Change this in Settings after login.
        </p>
      </div>
    </div>
  );
}

const wrap = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', padding: '24px' };
const card = { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '48px 40px', width: '100%', maxWidth: '420px', boxShadow: 'var(--shadow-lg)' };
const logoBox = { width: '56px', height: '56px', margin: '0 auto', background: 'var(--accent-dim)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
