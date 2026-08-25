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
    title: `Local SEO Services in ${city.name} | #1 Local SEO Agency ${city.name}`,
    description: `Best Local SEO agency in ${city.name}, Nepal. We help businesses rank higher on Google Maps and local search in ${city.name}. Get a free local SEO audit today!`,
    alternates: { canonical: `https://seoagencynepal.com/services/local-seo/${citySlug}` },
    openGraph: {
      title: `Local SEO Services in ${city.name}, Nepal`,
      description: `Top-rated Local SEO services in ${city.name}. Rank higher on Google Maps and attract more local customers.`,
      url: `https://seoagencynepal.com/services/local-seo/${citySlug}`,
    },
  };
}

const otherCities = [
  { name: 'Kathmandu', slug: 'kathmandu' },
  { name: 'Pokhara', slug: 'pokhara' },
  { name: 'Lalitpur', slug: 'lalitpur' },
  { name: 'Bhaktapur', slug: 'bhaktapur' },
  { name: 'Biratnagar', slug: 'biratnagar' },
  { name: 'Chitwan', slug: 'chitwan' },
  { name: 'Butwal', slug: 'butwal' },
  { name: 'Dharan', slug: 'dharan' },
];

const features = [
  { title: 'Google Business Profile', desc: 'Full setup and optimization of your GBP listing for maximum visibility in Maps.' },
  { title: 'Local Keyword Targeting', desc: 'Identifying and targeting high-intent local keywords specific to your city.' },
  { title: 'Citation Building', desc: 'Building consistent NAP citations across local directories and platforms.' },
  { title: 'On-Page Optimization', desc: 'Optimizing your website content with location-specific signals.' },
  { title: 'Local Link Building', desc: 'Acquiring backlinks from authoritative local websites and organizations.' },
  { title: 'Review Management', desc: 'Strategy to generate positive reviews and manage your online reputation.' },
];

export default async function LocalSEOCityPage({ params }) {
  const { city: citySlug } = await params;
  const city = getCityData(citySlug);
  if (!city) notFound();

  const site = getSiteData();
  const faqs = getFAQsData('local-seo');

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Local SEO', url: '/services/local-seo' },
    { name: `Local SEO ${city.name}`, url: `/services/local-seo/${citySlug}` },
  ];

  const schemas = [
    localBusinessCitySchema({
      site,
      city,
      service: 'Local SEO',
      url: `https://seoagencynepal.com/services/local-seo/${citySlug}`,
    }),
    serviceSchema({
      name: `Local SEO Services in ${city.name}`,
      description: `Professional Local SEO services in ${city.name}, Nepal. Rank higher on Google Maps and attract more customers.`,
      url: `https://seoagencynepal.com/services/local-seo/${citySlug}`,
      areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'Country', name: 'Nepal' } },
    }),
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
      <section style={heroS.wrap} aria-label={`Local SEO in ${city.name}`}>
        <div style={heroS.orb} aria-hidden="true" />
        <div className="container" style={heroS.inner}>
          <div>
            <span className="eyebrow">Local SEO in {city.name}, Nepal</span>
            <h1 style={heroS.h1}>
              Local SEO Services in <span className="gradient-text">{city.name}</span>
            </h1>
            <p style={heroS.sub}>
              We help businesses in {city.name} — {city.description} — dominate local Google search results and Google Maps. Our city-specific Local SEO strategies attract more customers from {city.name} and surrounding areas.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
              <Link href="/contact" className="btn btn-primary btn-lg" id={`city-${citySlug}-cta-hero`}>
                Get Free {city.name} SEO Audit
              </Link>
              <Link href="/services/local-seo" className="btn btn-secondary">
                ← All Local SEO Services
              </Link>
            </div>
          </div>

          {/* Stats Card */}
          <div style={heroS.card}>
            <div style={heroS.cardTitle}>Why Local SEO in {city.name}?</div>
            {[
              `${city.population} potential customers searching locally`,
              'Growing digital adoption in ' + city.name,
              'High competition = high opportunity',
              'Google Maps is the #1 discovery source',
            ].map((point, i) => (
              <div key={i} style={heroS.point}>
                <span style={{ color: 'var(--green)' }}>✓</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section--alt" aria-labelledby="features-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{city.name} Local SEO</span>
            <h2 id="features-heading">What&apos;s Included in Our {city.name} Local SEO Service</h2>
          </div>
          <div className="grid-3">
            {features.map((f) => (
              <div key={f.title} className="card">
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Content Block */}
      <section className="section" aria-labelledby="citycontent-heading">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 id="citycontent-heading" style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '20px' }}>
            Local SEO for Businesses in {city.name}, {city.state}
          </h2>
          <div className="prose">
            <p>
              {city.name} is {city.description}. With a population of {city.population} and growing internet penetration, businesses in {city.name} have a massive opportunity to attract customers through local search.
            </p>
            <p>
              When potential customers in {city.name} search for products or services on Google, they typically use queries like &quot;[service] in {city.name}&quot; or &quot;[service] near me.&quot; Our Local SEO service ensures your business appears prominently in these searches — specifically in the Google Maps 3-Pack where over 70% of clicks go.
            </p>
            <h3>Our {city.name}-Specific SEO Approach</h3>
            <p>
              Unlike generic SEO agencies, we develop a custom strategy based on {city.name}&apos;s unique local market dynamics, competitor landscape, and search behavior. We identify the exact keywords your {city.name} target customers use and create a strategy to rank for them.
            </p>
            <p>
              From optimizing your Google Business Profile with {city.name}-specific information to building citations from local {city.state} directories, every tactic is designed to signal to Google that you are the best local business for your service in {city.name}.
            </p>
          </div>
          <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" id={`city-${citySlug}-cta-mid`}>
              Start Ranking in {city.name}
            </Link>
            <Link href="/pricing" className="btn btn-secondary">View Pricing</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt" aria-labelledby="faq-heading">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2 id="faq-heading">Local SEO FAQs for {city.name} Businesses</h2>
          </div>
          <FAQAccordion faqs={faqs.slice(0, 4)} />
        </div>
      </section>

      {/* Other Cities - Internal Linking */}
      <section className="section" aria-labelledby="othercities-heading">
        <div className="container">
          <div className="section-head" style={{ marginBottom: '32px' }}>
            <span className="eyebrow">We Also Serve</span>
            <h2 id="othercities-heading">Local SEO in Other Nepal Cities</h2>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {relatedCities.map((c) => (
              <Link key={c.slug} href={`/services/local-seo/${c.slug}`} className="btn btn-secondary btn-sm" aria-label={`Local SEO services in ${c.name}`}>
                📍 {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Blog Posts */}
      <RelatedBlogPosts category="Local SEO" title={`Local SEO Articles for ${city.name} Businesses`} />

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, rgba(123,94,167,0.12), rgba(34,211,238,0.05))', borderTop: '1px solid var(--border)', padding: '80px 0' }} aria-label="Contact CTA">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>
            Ready to Dominate Local Search in {city.name}?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Get a free {city.name} Local SEO audit and a custom strategy to outrank your competitors.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg" id={`city-${citySlug}-cta-bottom`}>
            Get Free {city.name} SEO Audit
          </Link>
        </div>
      </section>
    </>
  );
}

const heroS = {
  wrap: { position: 'relative', padding: '80px 0', overflow: 'hidden' },
  orb: { position: 'absolute', top: '-100px', right: 0, width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(123,94,167,0.18), transparent)', filter: 'blur(60px)', zIndex: 0 },
  inner: { position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'center' },
  h1: { fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: '16px', marginTop: '8px' },
  sub: { fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px', maxWidth: '540px' },
  card: { background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-lg)', padding: '28px', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: 'var(--shadow-accent)' },
  cardTitle: { fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '4px' },
  point: { display: 'flex', gap: '10px', alignItems: 'flex-start' },
};
