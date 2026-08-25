import Link from 'next/link';

const services = [
  { label: 'Full SEO Services', href: '/seo' },
  { label: 'Local SEO', href: '/services/local-seo' },
  { label: 'E-commerce SEO', href: '/services/ecommerce-seo' },
  { label: 'Link Building', href: '/services/link-building' },
  { label: 'GEO & AEO Services', href: '/services/geo-aeo' },
];

const cities = [
  { label: 'Local SEO Kathmandu', href: '/services/local-seo/kathmandu' },
  { label: 'Local SEO Pokhara', href: '/services/local-seo/pokhara' },
  { label: 'Local SEO Lalitpur', href: '/services/local-seo/lalitpur' },
  { label: 'Local SEO Bhaktapur', href: '/services/local-seo/bhaktapur' },
  { label: 'Local SEO Biratnagar', href: '/services/local-seo/biratnagar' },
  { label: 'Local SEO Chitwan', href: '/services/local-seo/chitwan' },
  { label: 'Local SEO Butwal', href: '/services/local-seo/butwal' },
  { label: 'Local SEO Dharan', href: '/services/local-seo/dharan' },
];

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer({ site }) {
  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer} role="contentinfo">
      {/* Top CTA Bar */}
      <div style={styles.ctaBar}>
        <div className="container" style={styles.ctaInner}>
          <div>
            <h2 style={styles.ctaTitle}>Ready to Dominate Google in Nepal?</h2>
            <p style={styles.ctaSub}>Get a free SEO audit and discover how we can grow your business.</p>
          </div>
          <Link href="/contact" className="btn btn-primary btn-lg" id="footer-cta-btn">
            Get Free SEO Audit →
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div style={styles.main}>
        <div className="container">
          <div style={styles.grid}>
            {/* Brand */}
            <div style={styles.brand}>
              <Link href="/" style={styles.logoLink} aria-label="SEO Agency Nepal - Home">
                <div style={styles.logoBox}>
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <rect width="32" height="32" rx="8" fill="url(#fLogoGrad)"/>
                    <path d="M8 22L13 10L18 18L21 14L24 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="fLogoGrad" x1="0" y1="0" x2="32" y2="32">
                        <stop offset="0%" stopColor="#7B5EA7"/>
                        <stop offset="100%" stopColor="#22D3EE"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <span style={styles.logoName}>SEO Agency Nepal</span>
                </div>
              </Link>
              <p style={styles.brandDesc}>{site.shortDescription}</p>

              {/* NAP for Local SEO */}
              <address style={styles.nap}>
                <div style={styles.napItem}>
                  <span aria-label="Address">📍</span>
                  <span>{site.address?.street}, {site.address?.city}, Nepal</span>
                </div>
                <div style={styles.napItem}>
                  <span aria-label="Phone">📞</span>
                  <a href={`tel:${site.phone}`} style={styles.napLink}>{site.phone}</a>
                </div>
                <div style={styles.napItem}>
                  <span aria-label="Email">✉️</span>
                  <a href={`mailto:${site.email}`} style={styles.napLink}>{site.email}</a>
                </div>
              </address>

              {/* Social */}
              <div style={styles.social}>
                {site.social?.facebook && site.social.facebook !== '#' && (
                  <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" style={styles.socialLink} aria-label="Facebook">
                    <FacebookIcon />
                  </a>
                )}
                {site.social?.linkedin && site.social.linkedin !== '#' && (
                  <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" style={styles.socialLink} aria-label="LinkedIn">
                    <LinkedInIcon />
                  </a>
                )}
                {site.social?.instagram && site.social.instagram !== '#' && (
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" style={styles.socialLink} aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                )}
                {site.social?.twitter && site.social.twitter !== '#' && (
                  <a href={site.social.twitter} target="_blank" rel="noopener noreferrer" style={styles.socialLink} aria-label="Twitter / X">
                    <TwitterIcon />
                  </a>
                )}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 style={styles.colTitle}>Our Services</h3>
              <ul style={styles.linkList}>
                {services.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} style={styles.footLink}>{s.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Local SEO Cities */}
            <div>
              <h3 style={styles.colTitle}>Local SEO by City</h3>
              <ul style={styles.linkList}>
                {cities.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} style={styles.footLink}>{c.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 style={styles.colTitle}>Quick Links</h3>
              <ul style={styles.linkList}>
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} style={styles.footLink}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottom}>
        <div className="container" style={styles.bottomInner}>
          <p style={styles.copyright}>
            © {year} {site.name}. All Rights Reserved. | SEO Services in Nepal
          </p>
          <div style={styles.bottomLinks}>
            <Link href="/sitemap.xml" style={styles.bottomLink}>Sitemap</Link>
            <Link href="/privacy-policy" style={styles.bottomLink}>Privacy Policy</Link>
            <Link href="/terms-of-service" style={styles.bottomLink}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

const styles = {
  footer: { background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' },
  ctaBar: {
    background: 'linear-gradient(135deg, rgba(123,94,167,0.2), rgba(34,211,238,0.08))',
    borderBottom: '1px solid var(--border)',
    padding: '48px 0',
  },
  ctaInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
    flexWrap: 'wrap',
  },
  ctaTitle: { fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' },
  ctaSub: { color: 'var(--text-secondary)', fontSize: '0.95rem' },
  main: { padding: '64px 0 48px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '40px',
  },
  brand: { maxWidth: '300px' },
  logoLink: { display: 'inline-block', marginBottom: '16px' },
  logoBox: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoName: { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: '#fff' },
  brandDesc: { color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '20px' },
  nap: { fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' },
  napItem: { display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' },
  napLink: { color: 'var(--text-secondary)', transition: 'color 0.2s' },
  social: { display: 'flex', gap: '8px' },
  socialLink: {
    width: '36px', height: '36px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--text-muted)',
    transition: 'all 0.2s',
  },
  colTitle: { fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '16px' },
  linkList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  footLink: { fontSize: '0.9rem', color: 'var(--text-secondary)', transition: 'color 0.2s' },
  bottom: { borderTop: '1px solid var(--border)', padding: '20px 0' },
  bottomInner: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' },
  copyright: { fontSize: '0.85rem', color: 'var(--text-muted)' },
  bottomLinks: { display: 'flex', gap: '20px' },
  bottomLink: { fontSize: '0.85rem', color: 'var(--text-muted)' },
};
