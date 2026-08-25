import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQAccordion from '@/components/FAQAccordion';
import RelatedBlogPosts from '@/components/RelatedBlogPosts';
import { getServicesData, getFAQsData, getSiteData } from '@/lib/data';
import { serviceSchema, breadcrumbSchema, faqSchema, howToSchema } from '@/lib/schema';

export const metadata = {
  title: 'Local SEO Services in Nepal | Google Maps 3-Pack Ranking Experts',
  description: 'Top Local SEO agency in Nepal. We help businesses rank #1 on Google Maps and local search in Kathmandu, Pokhara, Lalitpur & across Nepal. Get your free local SEO audit!',
  alternates: { canonical: 'https://seoagencynepal.com/services/local-seo' },
  openGraph: {
    title: 'Local SEO Services in Nepal | Google Maps Ranking Experts',
    description: 'Top Local SEO services in Nepal — helping businesses rank on Google Maps and attract more local customers.',
    url: 'https://seoagencynepal.com/services/local-seo',
  },
};

const cities = [
  { name: 'Kathmandu', slug: 'kathmandu', desc: "Nepal's capital — highest local competition & customer density" },
  { name: 'Pokhara', slug: 'pokhara', desc: 'Tourism hub with high searches for hotels, cafes & adventures' },
  { name: 'Lalitpur', slug: 'lalitpur', desc: 'Patan city with thriving local services & heritage business' },
  { name: 'Bhaktapur', slug: 'bhaktapur', desc: 'Heritage city with unique local retail & craft opportunities' },
  { name: 'Biratnagar', slug: 'biratnagar', desc: "Eastern Nepal's premier commercial & trade center" },
  { name: 'Chitwan', slug: 'chitwan', desc: 'Tourism, safari, healthcare & agricultural business hub' },
  { name: 'Butwal', slug: 'butwal', desc: 'Western Nepal commerce, transport & trading hub' },
  { name: 'Dharan', slug: 'dharan', desc: 'Eastern Nepal education, health & service center' },
];

export default function LocalSEOPage() {
  const allServices = getServicesData();
  const svc = allServices['local-seo'];
  const faqs = getFAQsData('local-seo');
  const site = getSiteData();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Local SEO', url: '/services/local-seo' },
  ];

  const schemas = [
    serviceSchema({
      name: 'Local SEO Services in Nepal',
      description: svc.description,
      url: 'https://seoagencynepal.com/services/local-seo',
      areaServed: { '@type': 'Country', name: 'Nepal' },
    }),
    breadcrumbSchema(breadcrumbs),
    howToSchema({ name: 'How Our Local SEO Process Works', description: 'Step-by-step Local SEO methodology for Nepal', steps: svc.process }),
    faqSchema(faqs),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <Breadcrumb items={breadcrumbs} />

      {/* Hero */}
      <section style={heroS.wrap}>
        <div style={heroS.orbA} aria-hidden="true" />
        <div className="container" style={heroS.inner}>
          <span className="eyebrow">Local SEO Services in Nepal</span>
          <h1 style={heroS.h1}>
            Dominate <span className="gradient-text">Google Maps 3-Pack</span> & Local Searches in Nepal
          </h1>
          <p style={heroS.sub}>{svc.subheadline}</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg" id="localseo-hero-cta">Get Free Local SEO Audit</Link>
            <Link href="#cities" className="btn btn-secondary btn-lg">View City Services ↓</Link>
          </div>
          <div style={heroS.badges}>
            {['Google Maps Specialists', 'GBP Optimization', 'NAP Citation Audit', 'Results in 90 Days'].map((b) => (
              <span key={b} className="badge badge-cyan">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* In-Depth Explanation Section */}
      <section className="section" aria-labelledby="why-local-heading">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="section-head" style={{ textAlign: 'left', margin: '0 0 32px 0', maxWidth: '100%' }}>
            <span className="eyebrow">Why Local SEO Matters</span>
            <h2 id="why-local-heading">How Local SEO Drives Real Walk-Ins, Calls & Inquiries in Nepal</h2>
          </div>

          <div className="prose">
            <p>
              Over 82% of smartphone users in Nepal perform &quot;near me&quot; searches when looking for local services, restaurants, dental clinics, hotels, or educational institutes. When a user in Kathmandu or Pokhara searches for a service on Google, Google displays the <strong>Map 3-Pack</strong> at the top of the search results — above standard website listings.
            </p>
            <p>
              If your business isn&apos;t in that top 3 Map Pack, you are losing over 70% of potential local customers directly to your competitors. Our Local SEO service is engineered specifically to get your Google Business Profile verified, optimized, and ranked at the top of Google Maps across Nepali cities.
            </p>

            <div className="grid-2" style={{ gap: '20px', margin: '32px 0' }}>
              <div style={cardBox}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-bright)', marginBottom: '8px' }}>Google Business Profile (GBP) Mastery</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  We optimize your profile categories, geo-tagged photo uploads, service descriptions, weekly Google Posts, Q&A sections, and implement review collection workflows to boost your star rating.
                </p>
              </div>
              <div style={cardBox}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--cyan)', marginBottom: '8px' }}>NAP Citation Consistency</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  We build and clean up your Name, Address, and Phone number (NAP) data across online directories in Nepal (Yellow Pages, Facebook, Google Maps) to send bulletproof trust signals to Google.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is included */}
      <section className="section section--alt" aria-labelledby="features-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What&apos;s Included</span>
            <h2 id="features-heading">Complete Local SEO Package Deliverables</h2>
            <p>Everything your business needs to rank #1 locally and convert local searchers into paying clients.</p>
          </div>
          <div className="grid-4">
            {svc.features.map((f, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '24px 20px' }}>
                <div style={featureIconStyle} aria-hidden="true">✓</div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '12px' }}>{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Proven Roadmap</span>
            <h2 id="process-heading">How We Rank Your Business Locally</h2>
            <p>A proven 6-step process that delivers consistent local SEO results for Nepal businesses.</p>
          </div>
          <div className="grid-3">
            {svc.process.map((step) => (
              <div key={step.step} className="card" style={{ position: 'relative', paddingTop: '48px' }}>
                <div style={stepNumStyle}>{step.step}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities - Internal Links */}
      <section className="section section--alt" id="cities" aria-labelledby="cities-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Local SEO by City</span>
            <h2 id="cities-heading">Local SEO Services Across Nepal</h2>
            <p>We provide specialized Local SEO for businesses in every major city in Nepal. Click your city to view local strategies.</p>
          </div>
          <div className="grid-4">
            {cities.map((city) => (
              <Link key={city.slug} href={`/services/local-seo/${city.slug}`} style={cityCardStyle} aria-label={`Local SEO services in ${city.name}, Nepal`}>
                <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '6px' }}>📍 {city.name}</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{city.desc}</p>
                <span style={{ color: 'var(--accent-bright)', fontSize: '0.82rem', fontWeight: 600, marginTop: '12px', display: 'block' }}>
                  Local SEO in {city.name} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2 id="faq-heading">Local SEO FAQs</h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Related Blog Posts */}
      <RelatedBlogPosts category="Local SEO" title="Related Local SEO & Google Maps Articles" />

      {/* CTA */}
      <section style={ctaS} aria-label="Contact CTA">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>
            Ready to Dominate Local Search in Nepal?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Get a free Local SEO audit and see exactly how we can help your business rank higher on Google Maps.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg" id="localseo-footer-cta">Get My Free Local SEO Audit</Link>
        </div>
      </section>
    </>
  );
}

const heroS = {
  wrap: { position: 'relative', padding: '90px 0 80px', overflow: 'hidden' },
  orbA: { position: 'absolute', top: '-100px', right: '-50px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(123,94,167,0.2), transparent)', filter: 'blur(60px)', zIndex: 0 },
  inner: { position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '720px' },
  h1: { fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.025em' },
  sub: { fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.75 },
  badges: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
};
const cardBox = { background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '24px', borderRadius: 'var(--radius-md)' };
const featureIconStyle = { width: '40px', height: '40px', background: 'var(--green-dim)', color: 'var(--green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700, margin: '0 auto' };
const stepNumStyle = { position: 'absolute', top: '20px', left: '24px', width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-dim)', color: 'var(--accent-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 800 };
const cityCardStyle = { display: 'block', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px', transition: 'all 220ms ease' };
const ctaS = { background: 'linear-gradient(135deg, rgba(123,94,167,0.12), rgba(34,211,238,0.05))', borderTop: '1px solid var(--border)', padding: '80px 0' };
