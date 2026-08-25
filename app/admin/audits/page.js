'use client';
import { useState, useEffect } from 'react';

export default function AdminAudits() {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchAudits = () => {
    setLoading(true);
    fetch('/api/admin/audits')
      .then((r) => r.json())
      .then((data) => {
        setAudits(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const updated = audits.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
    setAudits(updated);
    await fetch('/api/admin/audits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this audit lead?')) {
      const updated = audits.filter((a) => a.id !== id);
      setAudits(updated);
      await fetch('/api/admin/audits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    }
  };

  const filtered = audits.filter((a) => {
    if (filter === 'pending') return a.status === 'Pending';
    if (filter === 'completed') return a.status === 'Completed';
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Audit Leads Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>View and manage all free website SEO audit requests submitted by potential clients.</p>
        </div>
        <button onClick={fetchAudits} className="btn btn-secondary btn-sm" id="refresh-audits-btn">
          🔄 Refresh Leads
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[
          { key: 'all', label: `All Leads (${audits.length})` },
          { key: 'pending', label: `Pending (${audits.filter((a) => a.status === 'Pending').length})` },
          { key: 'completed', label: `Completed (${audits.filter((a) => a.status === 'Completed').length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)',
              background: filter === tab.key ? 'var(--accent-dim)' : 'var(--bg-card)',
              color: filter === tab.key ? 'var(--accent-bright)' : 'var(--text-secondary)',
              fontWeight: filter === tab.key ? 700 : 500, cursor: 'pointer', fontSize: '0.88rem'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ color: 'var(--text-muted)', padding: '40px', textAlign: 'center' }}>Loading audit leads...</div>
      ) : filtered.length === 0 ? (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '40px', textAlign: 'center' }}>
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>📋</span>
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>No Audit Leads Found</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>When users fill out the &quot;Get Free Audit&quot; popup form on your site, leads will appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map((item) => (
            <div key={item.id} style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span className={`badge ${item.status === 'Completed' ? 'badge-green' : 'badge-cyan'}`}>
                      {item.status}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {item.date ? new Date(item.date).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                    <a href={item.website.startsWith('http') ? item.website : `https://${item.website}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>
                      {item.website}
                    </a>
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {item.status === 'Pending' ? (
                    <button onClick={() => handleStatusChange(item.id, 'Completed')} className="btn btn-secondary btn-sm" style={{ borderColor: 'var(--green)', color: 'var(--green)' }}>
                      ✓ Mark Completed
                    </button>
                  ) : (
                    <button onClick={() => handleStatusChange(item.id, 'Pending')} className="btn btn-secondary btn-sm">
                      Mark Pending
                    </button>
                  )}
                  <button onClick={() => handleDelete(item.id)} style={deleteBtnStyle}>
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid-3" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)', gap: '12px' }}>
                <div>
                  <span style={labelStyle}>Client Name:</span>
                  <p style={valueStyle}>{item.name || 'N/A'}</p>
                </div>
                <div>
                  <span style={labelStyle}>Email:</span>
                  <p style={valueStyle}>
                    <a href={`mailto:${item.email}`} style={{ color: 'var(--accent-bright)' }}>{item.email}</a>
                  </p>
                </div>
                <div>
                  <span style={labelStyle}>Phone / WhatsApp:</span>
                  <p style={valueStyle}>
                    <a href={`tel:${item.phone}`} style={{ color: 'var(--text-primary)' }}>{item.phone || 'N/A'}</a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const cardStyle = { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px' };
const labelStyle = { fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '2px' };
const valueStyle = { fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' };
const deleteBtnStyle = { background: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.2)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' };
