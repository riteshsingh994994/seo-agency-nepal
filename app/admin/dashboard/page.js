import Link from 'next/link';
import { getSiteData, getCaseStudiesData, getTestimonialsData, getBlogData, getPricingData, getAuditsData } from '@/lib/data';

export default function AdminDashboard() {
  const site = getSiteData();
  const caseStudies = getCaseStudiesData();
  const testimonials = getTestimonialsData();
  const blog = getBlogData();
  const pricing = getPricingData();
  const audits = getAuditsData();

  const stats = [
    { label: 'Audit Leads', value: audits.length, href: '/admin/audits', color: 'var(--cyan)' },
    { label: 'Blog Posts', value: blog.length, href: '/admin/blog', color: 'var(--accent-bright)' },
    { label: 'Case Studies', value: caseStudies.length, href: '/admin/case-studies', color: 'var(--green)' },
    { label: 'Testimonials', value: testimonials.length, href: '/admin/testimonials', color: '#F59E0B' },
  ];

  const quickLinks = [
    { label: 'View Audit Leads', desc: 'Manage website SEO audit requests', href: '/admin/audits', icon: '📋' },
    { label: 'Edit Site Settings', desc: 'Update name, contact info, phone, email', href: '/admin/settings', icon: '⚙️' },
    { label: 'Manage Images', desc: 'Upload and replace website images', href: '/admin/images', icon: '🖼️' },
    { label: 'Add Case Study', desc: 'Add a new portfolio/case study entry', href: '/admin/case-studies', icon: '📊' },
    { label: 'Add Blog Post', desc: 'Create new SEO blog content', href: '/admin/blog', icon: '📝' },
    { label: 'Edit Pricing', desc: 'Update your service pricing plans', href: '/admin/pricing', icon: '💰' },
    { label: 'Manage FAQs', desc: 'Add or edit FAQ items per page', href: '/admin/faqs', icon: '❓' },
    { label: 'Edit Services', desc: 'Update service descriptions and features', href: '/admin/services', icon: '🔧' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px' }}>Welcome back, Admin 👋</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Managing: <strong style={{ color: 'var(--text-primary)' }}>{site.name}</strong> &mdash;
          Contact: <a href={`tel:${site.phone}`} style={{ color: 'var(--accent-bright)' }}>{site.phone}</a>
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {stats.map((s) => (
          <Link key={s.href} href={s.href} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', textDecoration: 'none', display: 'block', transition: 'border-color 200ms' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: s.color, fontFamily: 'var(--font-heading)' }}>{s.value}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quick Actions</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {quickLinks.map((ql) => (
          <Link key={ql.href} href={ql.href} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px', transition: 'border-color 200ms', textDecoration: 'none' }}>
            <span style={{ fontSize: '1.3rem' }} aria-hidden="true">{ql.icon}</span>
            <div>
              <p style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '2px' }}>{ql.label}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ql.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Info */}
      <div style={{ marginTop: '32px', background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px' }}>ℹ️ Admin Info</p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <li>• All changes are saved to JSON files and take effect immediately on the website.</li>
          <li>• Uploaded images are stored in <code>/public/uploads/</code> and served statically.</li>
          <li>• Change your admin password in <Link href="/admin/settings" style={{ color: 'var(--accent-bright)' }}>Site Settings</Link>.</li>
          <li>• The website is visible to the public at <Link href="/" target="_blank" style={{ color: 'var(--accent-bright)' }}>seoagencynepal.com</Link>.</li>
        </ul>
      </div>
    </div>
  );
}
