import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQAccordion from '@/components/FAQAccordion';
import RelatedBlogPosts from '@/components/RelatedBlogPosts';
import { getServicesData, getFAQsData } from '@/lib/data';
import { serviceSchema, breadcrumbSchema, faqSchema, howToSchema } from '@/lib/schema';

export const metadata = {
  title: 'GEO & AEO Services in Nepal | ChatGPT, Gemini & Perplexity Optimization',
  description: 'Generative Engine Optimization (GEO) & Answer Engine Optimization (AEO) agency in Nepal. Get your brand recommended by ChatGPT, Google Gemini, Perplexity & Claude.',
  alternates: { canonical: 'https://seoagencynepal.com/services/geo-aeo' },
  openGraph: {
    title: 'GEO & AEO Services in Nepal | ChatGPT & Gemini AI Search Optimization',
    description: 'Optimize your brand to get recommended inside AI search tools across Nepal.',
    url: 'https://seoagencynepal.com/services/geo-aeo',
  },
};

const aiEngines = [
  { name: 'ChatGPT / OpenAI', desc: 'Get recommended in conversational AI responses for industry queries.' },
  { name: 'Google Gemini', desc: 'Optimize for Google AI Overviews & Gemini generative search snippets.' },
  { name: 'Perplexity AI', desc: 'Secure direct source citations & web link references in Perplexity answers.' },
  { name: 'Claude / Anthropic', desc: 'Establish brand entity trust in Claude knowledge & reasoning datasets.' },
  { name: 'Bing Copilot', desc: 'Dominate Microsoft AI web summaries and conversational search.' },
];

export default function GEOAEOPage() {
  const allServices = getServicesData();
  const svc = allServices['geo-aeo'];
  const faqs = getFAQsData('geo-aeo');

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'GEO & AEO', url: '/services/geo-aeo' },
  ];

  const schemas = [
    serviceSchema({ name: 'GEO & AEO Services in Nepal', description: svc.description, url: 'https://seoagencynepal.com/services/geo-aeo' }),
    breadcrumbSchema(breadcrumbs),
    howToSchema({ name: 'Our GEO & AEO Process', description: 'Step-by-step AI search engine optimization methodology', steps: svc.process }),
    faqSchema(faqs),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <Breadcrumb items={breadcrumbs} />

      {/* Hero */}
      <section style={{ position: 'relative', padding: '90px 0 80px', overflow: 'hidden' }} aria-label="GEO & AEO Hero">
        <div style={{ position: 'absolute', top: '-80px', right: '-50px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(34,211,238,0.2), transparent)', filter: 'blur(60px)', zIndex: 0 }} aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '680px' }}>
          <span className="eyebrow">AI Search Engine Optimization</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.025em' }}>{svc.headline}</h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{svc.subheadline}</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg" id="geoaeo-hero-cta">Get Free AI Search Audit</Link>
            <Link href="/pricing" className="btn btn-secondary btn-lg">View SEO Packages</Link>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['ChatGPT', 'Google Gemini', 'Perplexity AI', 'Claude', 'Microsoft Copilot'].map((b) => (
              <span key={b} className="badge badge-cyan">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* AI Engines Grid */}
      <section className="section section--alt" aria-labelledby="ai-engines-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">AI Platforms We Target</span>
            <h2 id="ai-engines-heading">Optimized for Leading Generative Search Engines</h2>
            <p>We ensure your business is recommended whenever users ask AI assistants for services in Nepal.</p>
          </div>
          <div className="grid-3">
            {aiEngines.map((engine) => (
              <div key={engine.name} className="card">
                <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>🤖</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>{engine.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>{engine.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section" aria-labelledby="features-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What&apos;s Included</span>
            <h2 id="features-heading">Comprehensive GEO & AEO Strategy</h2>
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
            <span className="eyebrow">Our Methodology</span>
            <h2 id="process-heading">How We Rank Your Brand in AI Models</h2>
          </div>
          <div className="grid-3">
            {svc.process.map((step) => (
              <div key={step.step} className="card" style={{ position: 'relative', paddingTop: '48px' }}>
                <div style={{ position: 'absolute', top: '20px', left: '24px', width: '32px', height: '32px', borderRadius: '50%', background: 'var(--cyan-dim)', color: 'var(--cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 800 }}>{step.step}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section" aria-labelledby="related-heading">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="eyebrow">Complementary Services</span>
          <h2 id="related-heading" style={{ marginBottom: '32px' }}>Combine GEO & AEO With Traditional SEO</h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/services/seo" className="btn btn-secondary">🚀 Full SEO Services</Link>
            <Link href="/services/local-seo" className="btn btn-secondary">📍 Local SEO</Link>
            <Link href="/services/link-building" className="btn btn-secondary">🔗 Link Building</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt" aria-labelledby="faq-heading">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2 id="faq-heading">GEO & AEO FAQs</h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Related Blog Posts */}
      <RelatedBlogPosts category="GEO & AEO" title="Related AI Search & GEO Articles" />

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, rgba(123,94,167,0.12), rgba(34,211,238,0.05))', borderTop: '1px solid var(--border)', padding: '80px 0' }} aria-label="Footer CTA">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>Ready to Get Recommended by ChatGPT & Gemini?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Get a free AI Search Audit and see how AI answer engines currently view your brand in Nepal.</p>
          <Link href="/contact" className="btn btn-primary btn-lg" id="geoaeo-footer-cta">Get Free AI Search Audit</Link>
        </div>
      </section>
    </>
  );
}
