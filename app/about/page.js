import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { getSiteData } from '@/lib/data';
import { breadcrumbSchema, organizationSchema } from '@/lib/schema';

export const metadata = {
  title: 'About Us | SEO Agency Nepal - #1 SEO Company in Nepal',
  description: 'Learn about SEO Agency Nepal — Nepal\'s leading ROI-focused search engine optimization agency. Meet our team and discover our mission to empower Nepali businesses online.',
  alternates: { canonical: 'https://seoagencynepal.com/about' },
};

export default function AboutPage() {
  const site = getSiteData();
  const breadcrumbs = [{ name: 'Home', url: '/' }, { name: 'About Us', url: '/about' }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }} />
      <Breadcrumb items={breadcrumbs} />

      <section style={{ padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <span className="eyebrow">About SEO Agency Nepal</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '24px', letterSpacing: '-0.025em' }}>
            Empowering Nepal Businesses to Dominate Search Engine Rankings
          </h1>
          <div className="prose">
            <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.8 }}>
              {site.aboutContent}
            </p>
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: to help businesses in Nepal unlock organic growth by ranking at the top of Google. We believe every business, from local shops in Kathmandu to nationwide e-commerce stores, deserves access to world-class, ethical SEO strategies that yield measurable ROI.
            </p>
            <h2>Why We Specialize</h2>
            <p>
              Unlike traditional marketing agencies that try to offer everything from print ads to TV commercials, we focus 100% on Search Engine Optimization. Specifically, we specialize in three core areas:
            </p>
            <ul>
              <li><strong>Local SEO:</strong> Helping Nepal businesses dominate Google Maps and local search queries in Kathmandu, Pokhara, Lalitpur, and across all provinces.</li>
              <li><strong>E-commerce SEO:</strong> Driving qualified buyer traffic and revenue to online stores running on Shopify, WooCommerce, and custom platforms.</li>
              <li><strong>Link Building:</strong> Securing high-authority, white-hat backlinks to boost domain authority and long-term search engine trust.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section section--alt">
        <div className="container">
          <div className="grid-4">
            {site.stats.map((s, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div className="stat-number">{s.value}</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '8px' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', textAlign: 'center', background: 'linear-gradient(135deg, rgba(123,94,167,0.12), transparent)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>Let&apos;s Work Together</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>Get a free consultation and SEO audit from our experts.</p>
          <Link href="/contact" className="btn btn-primary btn-lg">Contact Our Team</Link>
        </div>
      </section>
    </>
  );
}
