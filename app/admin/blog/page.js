'use client';
import { useState, useEffect } from 'react';

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/blog').then((r) => r.json()).then(setPosts);
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...posts];
    updated[index][field] = value;
    setPosts(updated);
    setSaved(false);
  };

  const handleAdd = () => {
    const newPost = {
      id: Date.now(),
      slug: `seo-guide-nepal-${posts.length + 1}`,
      title: 'New SEO Guide Title',
      excerpt: 'Short summary of the blog post...',
      content: 'Full article content here...',
      category: 'Local SEO',
      tags: ['seo', 'nepal'],
      image: '/uploads/blog/default.jpg',
      author: 'SEO Agency Nepal Team',
      date: new Date().toISOString().split('T')[0],
      published: true,
      metaTitle: 'New SEO Guide Title | SEO Agency Nepal',
      metaDescription: 'Short meta description for SEO.'
    };
    setPosts([newPost, ...posts]);
    setSaved(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this blog post?')) {
      setPosts(posts.filter((p) => p.id !== id));
      setSaved(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(posts),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Blog Posts Manager</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Create, edit, or publish blog articles.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleAdd} className="btn btn-secondary btn-sm">+ New Post</button>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary btn-sm">
            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save All Changes'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {posts.map((post, i) => (
          <div key={post.id || i} style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span className="badge">{post.category}</span>
                <span style={{ fontWeight: 700 }}>{post.title || 'Untitled Post'}</span>
              </div>
              <button onClick={() => handleDelete(post.id)} style={deleteBtnStyle}>Delete</button>
            </div>

            <div className="grid-2" style={{ gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Post Title</label>
                <input className="form-input" value={post.title || ''} onChange={(e) => handleChange(i, 'title', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Slug</label>
                <input className="form-input" value={post.slug || ''} onChange={(e) => handleChange(i, 'slug', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <input className="form-input" value={post.category || ''} onChange={(e) => handleChange(i, 'category', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Publish Date</label>
                <input type="date" className="form-input" value={post.date || ''} onChange={(e) => handleChange(i, 'date', e.target.value)} />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '14px' }}>
              <label className="form-label">Excerpt</label>
              <textarea className="form-input" rows={2} value={post.excerpt || ''} onChange={(e) => handleChange(i, 'excerpt', e.target.value)} />
            </div>

            <div className="form-group" style={{ marginTop: '14px' }}>
              <label className="form-label">Full Article Content</label>
              <textarea className="form-input" rows={5} value={post.content || ''} onChange={(e) => handleChange(i, 'content', e.target.value)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px' };
const deleteBtnStyle = { background: 'rgba(239,68,68,0.1)', color: '#F87171', border: '1px solid rgba(239,68,68,0.2)', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' };
