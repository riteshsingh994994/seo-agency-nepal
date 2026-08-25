import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedBlogPosts from '@/components/RelatedBlogPosts';
import { getServicesData } from '@/lib/data';
import { serviceSchema, breadcrumbSchema } from '@/lib/schema';

export const metadata = {
  title: 'SEO Services in Nepal | Full 360° SEO, Local, E-commerce, Links & GEO/AEO',
  description: 'Explore our ROI-driven SEO services in Nepal: Full 360° SEO, Local SEO for Google Maps, E-commerce SEO, Link Building, and AI Search Optimization (GEO & AEO). Get a free audit!',
  alternates: { canonical: 'https://seoagencynepal.com/services' },
};

export default function ServicesOverviewPage() {
  const services = getServicesData();
  const breadcrumbs = [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }];

  const list = [
    {
      key: 'seo',
      href: '/seo',
      title: 'Full 360° SEO Services',
      tagline: 'Complete On-Page, Technical, Off-Page, Local & AI Search Optimization',
      desc: services['seo']?.description,
      features: services['seo']?.features?.slice(0, 4) || [],
      icon: '🚀',
      cities: ['Kathmandu', 'Pokhara', 'Lalitpur', 'Bhaktapur', 'Biratnagar', 'Chitwan', 'Butwal', 'Dharan'],
    },
    {
      key: 'local-seo',
      href: '/services/local-seo',
      title: 'Local SEO Services',
      tagline: 'Rank #1 in Google Maps & Local Searches across Nepal',
      desc: services['local-seo']?.description,
      features: services['local-seo']?.features?.slice(0, 4) || [],
      icon: '📍',
      cities: ['Kathmandu', 'Pokhara', 'Lalitpur', 'Bhaktapur', 'Biratnagar', 'Chitwan', 'Butwal', 'Dharan'],
    },
    {
      key: 'ecommerce-seo',
      href: '/services/ecommerce-seo',
      title: 'E-commerce SEO Services',
      tagline: 'Drive Organic Traffic & Boost Online Store Sales',
      desc: services['ecommerce-seo']?.description,
      features: services['ecommerce-seo']?.features?.slice(0, 4) || [],
      icon: '🛒',
      cities: ['Kathmandu', 'Pokhara', 'Lalitpur', 'Bhaktapur', 'Biratnagar', 'Chitwan', 'Butwal', 'Dharan'],
    },
    {
      key: 'link-building',
      href: '/services/link-building',
      title: 'Link Building Services',
      tagline: 'Build Authority with High-Quality Backlinks',
      desc: services['link-building']?.description,
      features: services['link-building']?.features?.slice(0, 4) || [],
      icon: '🔗',
      cities: [], // Standalone
    },
    {
      key: 'geo-aeo',
      href: '/services/geo-aeo',
      title: 'GEO & AEO Services (AI Search)',
      tagline: 'ChatGPT, Google Gemini, Perplexity & Claude AI Search Optimization',
      desc: services['geo-aeo']?.description,
      features: services['geo-aeo']?.features?.slice(0, 4) || [],
      icon: '🤖',
      cities: [], // Standalone targeting Nepal as a whole
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }} />
      <Breadcrumb items={breadcrumbs} />

      <section style={{ padding: '80px 0 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <span className="eyebrow">Services Overview</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.025em' }}>
            Result-Driven SEO Services in Nepal
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7 }}>
            From traditional Google rankings to local map packs and generative AI search recommendations — we offer complete search optimization solutions for Nepal businesses.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {list.map((svc) => (
              <div key={svc.key} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '56px', height: '56px', background: 'var(--accent-dim)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>
                    {svc.icon}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                      <Link href={svc.href} style={{ color: 'inherit' }}>{svc.title}</Link>
                    </h2>
                    <p style={{ color: 'var(--accent-bright)', fontSize: '0.9rem', fontWeight: 600 }}>{svc.tagline}</p>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>{svc.desc}</p>

                <div className="grid-2" style={{ gap: '10px' }}>
                  {svc.features.map((f) => (
                    <div key={f} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--green)' }}>✓</span> {f}
                    </div>
                  ))}
                </div>

                {/* Sub-city internal links */}
                {svc.cities.length > 0 && (
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '8px' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                      City-Specific Sub-Pages:
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {svc.cities.map((city) => (
                        <Link
                          key={city}
                          href={`${svc.href}/${city.toLowerCase()}`}
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.78rem' }}
                        >
                          {city}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Link href={svc.href} className="btn btn-primary btn-sm">
                    View Full {svc.title} Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Blog Posts */}
      <RelatedBlogPosts category="SEO" title="Explore Our Search Engine Optimization Guides" />

      {/* CTA */}
      <section style={{ padding: '80px 0', textAlign: 'center', background: 'linear-gradient(135deg, rgba(123,94,167,0.12), transparent)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>Ready to Improve Your Search Rankings?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>Get a free SEO audit and consultation today.</p>
          <Link href="/contact" className="btn btn-primary btn-lg">Get Free SEO Audit</Link>
        </div>
      </section>
    </>
  );
}
