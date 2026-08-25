import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQAccordion from '@/components/FAQAccordion';
import RelatedBlogPosts from '@/components/RelatedBlogPosts';
import { getServicesData, getFAQsData, getSiteData } from '@/lib/data';
import { serviceSchema, breadcrumbSchema, faqSchema, howToSchema } from '@/lib/schema';

export const metadata = {
  title: 'E-commerce SEO Services in Nepal | Boost Online Store Sales',
  description: 'Expert E-commerce SEO agency in Nepal. We optimize product pages, category pages & site architecture to drive organic revenue for Shopify, WooCommerce & custom online stores. Free audit!',
  alternates: { canonical: 'https://seoagencynepal.com/services/ecommerce-seo' },
  openGraph: {
    title: 'E-commerce SEO Services in Nepal | Boost Online Store Sales',
    description: 'Drive more organic sales with our expert E-commerce SEO services in Nepal.',
    url: 'https://seoagencynepal.com/services/ecommerce-seo',
  },
};

const cities = [
  { name: 'Kathmandu', slug: 'kathmandu' },
  { name: 'Pokhara', slug: 'pokhara' },
  { name: 'Lalitpur', slug: 'lalitpur' },
  { name: 'Bhaktapur', slug: 'bhaktapur' },
  { name: 'Biratnagar', slug: 'biratnagar' },
  { name: 'Chitwan', slug: 'chitwan' },
  { name: 'Butwal', slug: 'butwal' },
  { name: 'Dharan', slug: 'dharan' },
];

const platforms = ['Shopify', 'WooCommerce', 'Magento', 'Custom Built', 'OpenCart', 'Daraz Sellers'];

export default function EcommerceSEOPage() {
  const allServices = getServicesData();
  const svc = allServices['ecommerce-seo'];
  const faqs = getFAQsData('ecommerce-seo');
  const site = getSiteData();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'E-commerce SEO', url: '/services/ecommerce-seo' },
  ];

  const schemas = [
    serviceSchema({
      name: 'E-commerce SEO Services in Nepal',
      description: svc.description,
      url: 'https://seoagencynepal.com/services/ecommerce-seo',
    }),
    breadcrumbSchema(breadcrumbs),
    howToSchema({ name: 'How Our E-commerce SEO Process Works', description: 'Step-by-step e-commerce SEO methodology', steps: svc.process }),
    faqSchema(faqs),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <Breadcrumb items={breadcrumbs} />

      {/* Hero */}
      <section style={heroS.wrap} aria-label="E-commerce SEO Hero">
        <div style={heroS.orbA} aria-hidden="true" />
        <div style={heroS.orbB} aria-hidden="true" />
        <div className="container" style={heroS.inner}>
          <span className="eyebrow">E-commerce SEO Services in Nepal</span>
          <h1 style={heroS.h1}>
            Turn Organic Search Visitors Into <span className="gradient-text">Paying Customers</span>
          </h1>
          <p style={heroS.sub}>{svc.subheadline}</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg" id="ecom-hero-cta">Get Free E-commerce SEO Audit</Link>
            <Link href="#cities" className="btn btn-secondary btn-lg">View City Services ↓</Link>
          </div>
          <div style={heroS.platforms}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>E-commerce platforms we optimize:</span>
            {platforms.map((p) => (
              <span key={p} style={heroS.platformBadge}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* In-Depth Explanation Section */}
      <section className="section" aria-labelledby="why-ecom-heading">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="section-head" style={{ textAlign: 'left', margin: '0 0 32px 0', maxWidth: '100%' }}>
            <span className="eyebrow">Organic Revenue Growth</span>
            <h2 id="why-ecom-heading">Why E-commerce Stores in Nepal Need Specialized Search Optimization</h2>
          </div>

          <div className="prose">
            <p>
              Paid digital ads (Facebook Ads, Instagram Ads, Google Ads) are becoming increasingly expensive for online stores in Nepal. The moment you pause your ad budget, your customer traffic stops completely.
            </p>
            <p>
              <strong>E-commerce SEO</strong> creates a sustainable, recurring acquisition channel. When shoppers in Nepal search for specific products like &quot;buy handicraft items in Kathmandu&quot; or &quot;organic tea online Nepal&quot;, we ensure your product pages rank at the top of Google — capturing high-intent shoppers right when they are ready to purchase.
            </p>

            <div className="grid-2" style={{ gap: '20px', margin: '32px 0' }}>
              <div style={cardBox}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--cyan)', marginBottom: '8px' }}>Product & Category Page Optimization</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  We optimize product titles, meta descriptions, image alt tags, canonical tags, and internal category linking so Google ranks your individual products for high-converting transactional searches.
                </p>
              </div>
              <div style={cardBox}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-bright)', marginBottom: '8px' }}>E-commerce Rich Snippets & Schema</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  We deploy structured Product, AggregateRating, Offer, and BreadcrumbList JSON-LD schemas so your search listings display star ratings, product prices (in NPR), and stock availability directly on Google.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section--alt" aria-labelledby="features-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What&apos;s Included</span>
            <h2 id="features-heading">Complete E-commerce SEO Package</h2>
            <p>From product page optimization to technical crawl fixes — everything your store needs to rank and convert.</p>
          </div>
          <div className="grid-4">
            {svc.features.map((f, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '24px 20px' }}>
                <div style={featureIcon} aria-hidden="true">✓</div>
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
            <span className="eyebrow">Our Methodology</span>
            <h2 id="process-heading">How We Grow Your Online Store&apos;s Revenue</h2>
            <p>A systematic, data-driven approach to ranking your products higher and driving organic sales.</p>
          </div>
          <div className="grid-3">
            {svc.process.map((step) => (
              <div key={step.step} className="card" style={{ position: 'relative', paddingTop: '48px' }}>
                <div style={stepNum}>{step.step}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="section section--alt" id="cities" aria-labelledby="cities-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">E-commerce SEO by City</span>
            <h2 id="cities-heading">E-commerce SEO Services Across Nepal</h2>
            <p>We provide city-specific e-commerce SEO for online stores based in all major Nepal cities.</p>
          </div>
          <div className="grid-4">
            {cities.map((city) => (
              <Link key={city.slug} href={`/services/ecommerce-seo/${city.slug}`} style={cityCard} aria-label={`E-commerce SEO services in ${city.name}`}>
                <span style={{ fontWeight: 700 }}>🛒 E-commerce SEO</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>in {city.name}</span>
                <span style={{ color: 'var(--accent-bright)', fontSize: '0.82rem', fontWeight: 600, marginTop: '8px' }}>Learn More →</span>
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
            <h2 id="faq-heading">E-commerce SEO FAQs</h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Related Blog Posts */}
      <RelatedBlogPosts category="E-commerce SEO" title="Related E-commerce SEO Articles" />

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, rgba(123,94,167,0.12), rgba(34,211,238,0.05))', borderTop: '1px solid var(--border)', padding: '80px 0' }} aria-label="Contact CTA">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>
            Ready to Grow Your Online Store&apos;s Organic Revenue?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Get a free e-commerce SEO audit and discover exactly what&apos;s holding your store back from ranking #1.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg" id="ecom-footer-cta">Get Free E-commerce SEO Audit</Link>
        </div>
      </section>
    </>
  );
}

const heroS = {
  wrap: { position: 'relative', padding: '90px 0 80px', overflow: 'hidden' },
  orbA: { position: 'absolute', top: '-120px', right: '-60px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(34,211,238,0.15), transparent)', filter: 'blur(60px)', zIndex: 0 },
  orbB: { position: 'absolute', bottom: '-80px', left: '-40px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(123,94,167,0.15), transparent)', filter: 'blur(60px)', zIndex: 0 },
  inner: { position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '720px' },
  h1: { fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.025em' },
  sub: { fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 },
  platforms: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '8px' },
  platformBadge: { padding: '4px 12px', borderRadius: '999px', background: 'var(--bg-card)', border: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text-secondary)' },
};
const cardBox = { background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '24px', borderRadius: 'var(--radius-md)' };
const featureIcon = { width: '40px', height: '40px', background: 'var(--cyan-dim)', color: 'var(--cyan)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700, margin: '0 auto' };
const stepNum = { position: 'absolute', top: '20px', left: '24px', width: '32px', height: '32px', borderRadius: '50%', background: 'var(--cyan-dim)', color: 'var(--cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 800 };
const cityCard = { display: 'flex', flexDirection: 'column', gap: '4px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', transition: 'all 220ms ease' };
