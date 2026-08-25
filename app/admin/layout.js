'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '🏠' },
  { label: 'Audit Leads', href: '/admin/audits', icon: '📋' },
  { label: 'Site Settings', href: '/admin/settings', icon: '⚙️' },
  { label: 'Images', href: '/admin/images', icon: '🖼️' },
  { label: 'Case Studies', href: '/admin/case-studies', icon: '📊' },
  { label: 'Testimonials', href: '/admin/testimonials', icon: '⭐' },
  { label: 'Pricing Plans', href: '/admin/pricing', icon: '💰' },
  { label: 'Blog Posts', href: '/admin/blog', icon: '📝' },
  { label: 'FAQs', href: '/admin/faqs', icon: '❓' },
  { label: 'Services', href: '/admin/services', icon: '🔧' },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  // Don't show sidebar on login page
  if (pathname === '/admin') return <>{children}</>;

  return (
    <div style={layoutStyles.wrap}>
      {/* Sidebar */}
      <aside style={layoutStyles.sidebar} aria-label="Admin navigation">
        <div style={layoutStyles.sidebarHead}>
          <Link href="/" style={layoutStyles.logo}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="url(#sideLogoGrad)"/>
              <path d="M8 22L13 10L18 18L21 14L24 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="sideLogoGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#7B5EA7"/>
                  <stop offset="100%" stopColor="#22D3EE"/>
                </linearGradient>
              </defs>
            </svg>
            <span style={layoutStyles.logoText}>SEO Admin</span>
          </Link>
        </div>
        <nav style={{ flex: 1, padding: '8px 12px' }} aria-label="Admin navigation links">
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{ ...layoutStyles.navLink, ...(active ? layoutStyles.navLinkActive : {}) }}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div style={layoutStyles.sidebarFoot}>
          <Link href="/" target="_blank" style={layoutStyles.viewSite}>
            🌐 View Website
          </Link>
          <button onClick={handleLogout} disabled={loggingOut} style={layoutStyles.logoutBtn} id="admin-logout-btn">
            {loggingOut ? 'Logging out...' : '🚪 Logout'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={layoutStyles.main} id="admin-main">
        {children}
      </main>
    </div>
  );
}

const layoutStyles = {
  wrap: { display: 'flex', minHeight: '100vh', background: 'var(--bg-base)' },
  sidebar: { width: '240px', background: 'var(--bg-surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', flexShrink: 0 },
  sidebarHead: { padding: '20px 16px', borderBottom: '1px solid var(--border)' },
  logo: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoText: { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: '#fff' },
  navLink: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-secondary)', transition: 'all 200ms ease', textDecoration: 'none' },
  navLinkActive: { background: 'var(--accent-dim)', color: 'var(--accent-bright)', fontWeight: 600 },
  sidebarFoot: { padding: '12px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px' },
  viewSite: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', transition: 'color 200ms ease' },
  logoutBtn: { width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', color: '#F87171', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', cursor: 'pointer', transition: 'all 200ms ease' },
  main: { flex: 1, padding: '32px', overflow: 'auto' },
};
