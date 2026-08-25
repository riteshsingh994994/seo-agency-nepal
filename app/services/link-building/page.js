import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQAccordion from '@/components/FAQAccordion';
import RelatedBlogPosts from '@/components/RelatedBlogPosts';
import { getServicesData, getFAQsData } from '@/lib/data';
import { serviceSchema, breadcrumbSchema, faqSchema, howToSchema } from '@/lib/schema';

export const metadata = {
  title: 'Link Building Services in Nepal | High-Quality Backlinks',
  description: 'Professional white-hat link building agency in Nepal. We build high-quality backlinks from authoritative websites to boost your domain authority and Google rankings. Free audit!',
  alternates: { canonical: 'https://seoagencynepal.com/services/link-building' },
  openGraph: {
    title: 'Link Building Services in Nepal | High-Quality Backlinks',
    description: 'White-hat link building services in Nepal — building authority through quality backlinks.',
    url: 'https://seoagencynepal.com/services/link-building',
  },
};

const linkTypes = [
  { title: 'Guest Post Links', desc: 'High-DA guest posts on real, niche-relevant websites with editorial links.', icon: '✍️' },
  { title: 'Broken Link Building', desc: 'Finding broken links on authority sites and replacing them with your content.', icon: '🔗' },
  { title: 'Resource Link Building', desc: 'Getting your site listed on resource pages and curated directories.', icon: '📚' },
  { title: 'Digital PR', desc: 'Brand mentions and backlinks from news sites, industry publications, and blogs.', icon: '📰' },
  { title: 'Skyscraper Technique', desc: 'Creating better content than top-ranked pages and acquiring their backlinks.', icon: '🏙️' },
  { title: 'Competitor Analysis', desc: 'Replicating your competitors\' best backlinks and finding new opportunities.', icon: '🔍' },
];

export default function LinkBuildingPage() {
  const allServices = getServicesData();
  const svc = allServices['link-building'];
  const faqs = getFAQsData('link-building');

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Link Building', url: '/services/link-building' },
  ];

  const schemas = [
    serviceSchema({ name: 'Link Building Services in Nepal', description: svc.description, url: 'https://seoagencynepal.com/services/link-building' }),
    breadcrumbSchema(breadcrumbs),
    howToSchema({ name: 'How Our Link Building Process Works', description: 'Step-by-step link building methodology', steps: svc.process }),
    faqSchema(faqs),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <Breadcrumb items={breadcrumbs} />

      {/* Hero */}
      <section style={{ position: 'relative', padding: '90px 0 80px', overflow: 'hidden' }} aria-label="Link Building Hero">
        <div style={{ position: 'absolute', top: '-80px', left: '-50px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(123,94,167,0.2), transparent)', filter: 'blur(60px)', zIndex: 0 }} aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '680px' }}>
          <span className="eyebrow">Link Building Services in Nepal</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.025em' }}>{svc.headline}</h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{svc.subheadline}</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg" id="linkbuilding-hero-cta">Get Free Backlink Audit</Link>
            <Link href="/pricing" className="btn btn-secondary btn-lg">View Packages</Link>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['DA 30+ Links', 'White-Hat Only', 'Monthly Reports', 'Niche Relevant'].map((b) => (
              <span key={b} className="badge">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Link Types */}
      <section className="section section--alt" aria-labelledby="linktypes-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Link Types</span>
            <h2 id="linktypes-heading">Our Link Building Strategies</h2>
            <p>We use a diversified mix of white-hat link building techniques to build a natural, powerful backlink profile.</p>
          </div>
          <div className="grid-3">
            {linkTypes.map((lt) => (
              <div key={lt.title} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }} aria-hidden="true">{lt.icon}</span>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>{lt.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>{lt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" aria-labelledby="features-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What&apos;s Included</span>
            <h2 id="features-heading">Full Link Building Package Includes</h2>
          </div>
          <div className="grid-4">
            {svc.features.map((f, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '24px 20px' }}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section--alt" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Process</span>
            <h2 id="process-heading">How We Build Your Authority</h2>
          </div>
          <div className="grid-3">
            {svc.process.map((step) => (
              <div key={step.step} className="card" style={{ position: 'relative', paddingTop: '48px' }}>
                <div style={{ position: 'absolute', top: '20px', left: '24px', width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-dim)', color: 'var(--accent-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 800 }}>{step.step}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Also see other services */}
      <section className="section" aria-labelledby="related-heading">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="eyebrow">Related Services</span>
          <h2 id="related-heading" style={{ marginBottom: '32px' }}>Complement Your Link Building</h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/services/local-seo" className="btn btn-secondary">📍 Local SEO</Link>
            <Link href="/services/ecommerce-seo" className="btn btn-secondary">🛒 E-commerce SEO</Link>
            <Link href="/pricing" className="btn btn-secondary">💰 View All Packages</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt" aria-labelledby="faq-heading">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2 id="faq-heading">Link Building FAQs</h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Related Blog Posts */}
      <RelatedBlogPosts category="Link Building" title="Related Link Building & Authority Articles" />

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, rgba(123,94,167,0.12), rgba(34,211,238,0.05))', borderTop: '1px solid var(--border)', padding: '80px 0' }} aria-label="Footer CTA">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>Ready to Build Your Website&apos;s Authority?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Get a free backlink audit and a custom link building strategy for your website.</p>
          <Link href="/contact" className="btn btn-primary btn-lg" id="linkbuilding-footer-cta">Get Free Backlink Audit</Link>
        </div>
      </section>
    </>
  );
}
