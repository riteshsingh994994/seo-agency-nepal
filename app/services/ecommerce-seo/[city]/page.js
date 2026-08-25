import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQAccordion from '@/components/FAQAccordion';
import RelatedBlogPosts from '@/components/RelatedBlogPosts';
import { getSiteData, getFAQsData } from '@/lib/data';
import { getCityData, getAllCities } from '@/lib/cities';
import { localBusinessCitySchema, breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';

export async function generateStaticParams() {
  return getAllCities().map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }) {
  const { city: citySlug } = await params;
  const city = getCityData(citySlug);
  if (!city) return {};
  return {
    title: `E-commerce SEO Services in ${city.name} | Boost Your Online Store`,
    description: `Expert E-commerce SEO in ${city.name}, Nepal. We help online stores rank higher on Google and drive more organic sales. Get a free e-commerce SEO audit!`,
    alternates: { canonical: `https://seoagencynepal.com/services/ecommerce-seo/${citySlug}` },
    openGraph: {
      title: `E-commerce SEO Services in ${city.name}, Nepal`,
      description: `Drive more organic sales with expert E-commerce SEO in ${city.name}. Free audit available.`,
      url: `https://seoagencynepal.com/services/ecommerce-seo/${citySlug}`,
    },
  };
}

const otherCities = [
  { name: 'Kathmandu', slug: 'kathmandu' }, { name: 'Pokhara', slug: 'pokhara' },
  { name: 'Lalitpur', slug: 'lalitpur' }, { name: 'Bhaktapur', slug: 'bhaktapur' },
  { name: 'Biratnagar', slug: 'biratnagar' }, { name: 'Chitwan', slug: 'chitwan' },
  { name: 'Butwal', slug: 'butwal' }, { name: 'Dharan', slug: 'dharan' },
];

const ecomFeatures = [
  { title: 'Product Page SEO', desc: 'Keyword-rich product titles, descriptions, and structured data markup.' },
  { title: 'Category Optimization', desc: 'Proper category hierarchy, internal linking, and on-page optimization.' },
  { title: 'Technical SEO Audit', desc: 'Speed, crawlability, Core Web Vitals, and mobile usability improvements.' },
  { title: 'E-commerce Schema', desc: 'Product, Review, and Offer schema for rich results in Google Search.' },
  { title: 'Internal Linking', desc: 'Strategic product and category interlinking to pass SEO authority.' },
  { title: 'Conversion Optimization', desc: 'SEO changes aligned with improving your store\'s conversion rate.' },
];

export default async function EcomSEOCityPage({ params }) {
  const { city: citySlug } = await params;
  const city = getCityData(citySlug);
  if (!city) notFound();

  const site = getSiteData();
  const faqs = getFAQsData('ecommerce-seo');

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'E-commerce SEO', url: '/services/ecommerce-seo' },
    { name: `E-commerce SEO ${city.name}`, url: `/services/ecommerce-seo/${citySlug}` },
  ];

  const schemas = [
    localBusinessCitySchema({ site, city, service: 'E-commerce SEO', url: `https://seoagencynepal.com/services/ecommerce-seo/${citySlug}` }),
    serviceSchema({ name: `E-commerce SEO Services in ${city.name}`, description: `Professional e-commerce SEO services in ${city.name}, Nepal.`, url: `https://seoagencynepal.com/services/ecommerce-seo/${citySlug}`, areaServed: { '@type': 'City', name: city.name } }),
    breadcrumbSchema(breadcrumbs),
    faqSchema(faqs.slice(0, 4)),
  ];

  const relatedCities = otherCities.filter((c) => c.slug !== citySlug);

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <Breadcrumb items={breadcrumbs} />

      {/* Hero */}
      <section style={{ position: 'relative', padding: '80px 0', overflow: 'hidden' }} aria-label={`E-commerce SEO in ${city.name}`}>
        <div style={{ position: 'absolute', top: '-100px', right: '-60px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(34,211,238,0.15), transparent)', filter: 'blur(60px)' }} aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '680px' }}>
          <span className="eyebrow">E-commerce SEO in {city.name}, Nepal</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.025em' }}>
            E-commerce SEO Services in <span className="gradient-text">{city.name}</span>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Running an online store in {city.name}? Our specialized E-commerce SEO services help your products rank higher on Google, drive more organic traffic, and increase sales without relying on paid ads.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg" id={`ecom-${citySlug}-cta`}>
              Get Free {city.name} Store Audit
            </Link>
            <Link href="/services/ecommerce-seo" className="btn btn-secondary">← All E-commerce SEO</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section--alt" aria-labelledby="ecom-features-heading">
        <div className="container">
          <div className="section-head">
            <h2 id="ecom-features-heading">What&apos;s Included for {city.name} Online Stores</h2>
          </div>
          <div className="grid-3">
            {ecomFeatures.map((f) => (
              <div key={f.title} className="card">
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Block */}
      <section className="section" aria-labelledby="ecom-content-heading">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 id="ecom-content-heading" style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '20px' }}>
            E-commerce SEO for {city.name} Online Businesses
          </h2>
          <div className="prose">
            <p>
              The e-commerce market in Nepal is growing rapidly, with more businesses in {city.name} moving their operations online. However, having an online store is not enough — you need to be visible when customers in {city.name} and across Nepal search for your products.
            </p>
            <p>
              Our E-commerce SEO service for {city.name} businesses focuses on ranking your products for buyer-intent keywords — the searches that lead directly to purchases. We optimize every layer of your store: product pages, category pages, site structure, and technical performance.
            </p>
            <h3>Why E-commerce SEO Matters for {city.name} Stores</h3>
            <p>
              Paid advertising is expensive and stops the moment you stop paying. Organic SEO drives sustainable, long-term traffic that compounds over time. For {city.name} e-commerce businesses, ranking on page one of Google for relevant product searches can mean the difference between a thriving store and a failing one.
            </p>
          </div>
          <div style={{ marginTop: '32px' }}>
            <Link href="/contact" className="btn btn-primary" id={`ecom-${citySlug}-cta-mid`}>
              Start Growing in {city.name}
            </Link>
          </div>
        </div>
      </section>

      {/* Related Blog Posts */}
      <RelatedBlogPosts category="E-commerce SEO" title={`E-commerce SEO Guides for ${city.name} Online Stores`} />

      {/* FAQ */}
      <section className="section section--alt" aria-labelledby="ecom-faq-heading">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-head">
            <h2 id="ecom-faq-heading">E-commerce SEO FAQs for {city.name}</h2>
          </div>
          <FAQAccordion faqs={faqs.slice(0, 4)} />
        </div>
      </section>

      {/* Other Cities */}
      <section className="section" aria-labelledby="othercities-heading">
        <div className="container">
          <div className="section-head" style={{ marginBottom: '28px' }}>
            <h2 id="othercities-heading">E-commerce SEO in Other Nepal Cities</h2>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {relatedCities.map((c) => (
              <Link key={c.slug} href={`/services/ecommerce-seo/${c.slug}`} className="btn btn-secondary btn-sm" aria-label={`E-commerce SEO in ${c.name}`}>
                🛒 {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg, rgba(123,94,167,0.12), rgba(34,211,238,0.05))', borderTop: '1px solid var(--border)', padding: '80px 0' }} aria-label="Footer CTA">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>Ready to Grow Your {city.name} Online Store?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Get a free e-commerce SEO audit and learn how to drive more organic sales.</p>
          <Link href="/contact" className="btn btn-primary btn-lg" id={`ecom-${citySlug}-cta-bottom`}>Get Free Store Audit</Link>
        </div>
      </section>
    </>
  );
}
