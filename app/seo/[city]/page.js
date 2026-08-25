import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQAccordion from '@/components/FAQAccordion';
import RelatedBlogPosts from '@/components/RelatedBlogPosts';
import { getSiteData, getFAQsData, getSiteUrl } from '@/lib/data';
import { getCityData, getAllCities } from '@/lib/cities';
import { localBusinessCitySchema, breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';

export async function generateStaticParams() {
  return getAllCities().map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }) {
  const { city: citySlug } = await params;
  const city = getCityData(citySlug);
  if (!city) return {};
  const siteUrl = getSiteUrl();
  return {
    title: `SEO Services in ${city.name} Nepal | Top SEO Agency ${city.name}`,
    description: `Searching for SEO services in ${city.name}, Nepal? SEO Agency Nepal helps ${city.name} businesses get found on Google, attract local customers, outrank competitors, and generate real leads. Get a free SEO audit!`,
    alternates: { canonical: `${siteUrl}/seo/${citySlug}` },
    openGraph: {
      title: `SEO Services in ${city.name}, Nepal | Get More Customers`,
      description: `Top-rated SEO services in ${city.name}. Rank #1 on Google & AI search engines.`,
      url: `${siteUrl}/seo/${citySlug}`,
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

function getFeatures(cityName) {
  return [
    { title: 'Technical SEO & Core Web Vitals', desc: 'Resolving site speed, mobile usability, crawl errors, and JSON-LD schema for ' + cityName + ' websites.' },
    { title: 'On-Page Content & Intent Mapping', desc: 'Writing meta titles, descriptions, and headings targeted to ' + cityName + ' search behavior.' },
    { title: 'Local Maps & GBP 3-Pack Ranking', desc: 'Dominating Google Maps and local 3-pack searches for customers searching in ' + cityName + '.' },
    { title: 'Authority Backlinks & Digital PR', desc: 'Acquiring high-DA backlinks to strengthen domain trust and search rankings in Nepal.' },
    { title: 'Generative Engine Optimization (GEO)', desc: 'Getting your ' + cityName + ' brand recommended inside ChatGPT, Gemini & Perplexity responses.' },
    { title: 'Answer Engine Optimization (AEO)', desc: 'Structuring content into direct Q&A formats for Google featured snippets and voice search.' },
  ];
}

export default async function SEOCityPage({ params }) {
  const { city: citySlug } = await params;
  const city = getCityData(citySlug);
  if (!city) notFound();

  const site = getSiteData();
  const faqs = getFAQsData('seo');

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'SEO Services', url: '/seo' },
    { name: `SEO Services in ${city.name}`, url: `/seo/${citySlug}` },
  ];

  const schemas = [
    localBusinessCitySchema({
      site,
      city,
      service: 'SEO Services',
      url: `https://seoagencynepal.com/seo/${citySlug}`,
    }),
    serviceSchema({
      name: `SEO Services in ${city.name} Nepal`,
      description: `Complete SEO services in ${city.name}, Nepal. Rank #1 on Google and AI search engines.`,
      url: `https://seoagencynepal.com/seo/${citySlug}`,
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
      <section style={heroS.wrap} aria-label={`SEO Services in ${city.name}`}>
        <div style={heroS.orb} aria-hidden="true" />
        <div className="container" style={heroS.inner}>
          <div>
            <span className="eyebrow">SEO Services in {city.name}, Nepal</span>
            <h1 style={heroS.h1}>
              SEO Services in <span className="gradient-text">{city.name} Nepal</span>: Get More Local Customers & Leads
            </h1>
            <p style={heroS.sub}>
              Running a business in {city.name}? {city.description}. We help businesses in {city.name} dominate Google search results, Google Maps, and AI answer engines like ChatGPT. Turn local search traffic into real calls, visits, and sales.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
              <Link href="/contact" className="btn btn-primary btn-lg" id={`seo-${citySlug}-cta-hero`}>
                Get Free {city.name} SEO Audit
              </Link>
              <Link href="/seo" className="btn btn-secondary">
                ← All SEO Services
              </Link>
            </div>
          </div>

          {/* Snapshot Card */}
          <div style={heroS.card}>
            <div style={heroS.cardTitle}>SEO in {city.name} Snapshot</div>
            {[
              `${city.population} potential buyers in ${city.name}`,
              'On-Page & Technical SEO optimization',
              'Google Maps 3-Pack placement',
              'ChatGPT & Gemini AI recommendations',
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
            <span className="eyebrow">Complete SEO Package</span>
            <h2 id="features-heading">Our SEO Services for {city.name} Businesses</h2>
            <p>From technical audits and keyword research to local map rankings and backlinks, we deliver complete search engine optimization in {city.name}.</p>
          </div>
          <div className="grid-3">
            {getFeatures(city.name).map((f) => (
              <div key={f.title} className="card">
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In-Depth City Content Block */}
      <section className="section" aria-labelledby="citycontent-heading">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="section-head" style={{ textAlign: 'left', margin: '0 0 32px 0', maxWidth: '100%' }}>
            <span className="eyebrow">Local Market Strategy</span>
            <h2 id="citycontent-heading">Why Your Business in {city.name} Needs Professional SEO</h2>
          </div>

          <div className="prose">
            <p>
              {city.name} is {city.description}. With a growing population of {city.population} and increasing smartphone usage, consumers in {city.name} rely heavily on Google to find products, services, hotels, schools, and medical care.
            </p>
            <p>
              When potential customers search for &quot;best [service] in {city.name}&quot; or &quot;[service] near me in {city.name}&quot;, appearing on page 1 of Google is the difference between capturing consistent leads and losing customers to competitors. Over 75% of clicks go to the top 3 organic results and Google Maps listings.
            </p>

            <h3>Our 5-Phase SEO Methodology for {city.name} Businesses</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '24px 0' }}>
              {[
                { title: '1. Local Market & Competitor Audit', text: `We analyze your existing website, technical speed, current keyword rankings in ${city.name}, and your top local competitors.` },
                { title: '2. Intent-Driven Keyword Strategy', text: `We identify high-intent transactional keywords used by customers in ${city.name} when they are ready to purchase.` },
                { title: '3. On-Page & Schema Optimization', text: `We optimize titles, descriptions, headings, internal links, and JSON-LD LocalBusiness schema tailored to ${city.name}.` },
                { title: '4. Google Business Profile & Map Pack', text: `We claim, verify, and optimize your GBP profile to achieve top 3 ranking in ${city.name} Google Maps searches.` },
                { title: '5. AI Search & Content Authority', text: `We structure your content so ChatGPT, Gemini, and Perplexity recommend your ${city.name} business in AI responses.` },
              ].map((phase, pIdx) => (
                <div key={pIdx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
                  <h4 style={{ color: 'var(--accent-bright)', fontWeight: 700, marginBottom: '6px' }}>{phase.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{phase.text}</p>
                </div>
              ))}
            </div>

            <h3>Industries We Help Grow in {city.name}</h3>
            <p>
              Our SEO agency provides tailored campaigns for key sectors in {city.name}, including hospitality & resorts, private colleges & schools, medical clinics, e-commerce stores, real estate developers, and local service providers.
            </p>
          </div>

          <div style={{ marginTop: '36px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" id={`seo-${citySlug}-cta-mid`}>
              Start SEO Campaign in {city.name}
            </Link>
            <Link href="/pricing" className="btn btn-secondary">View Packages & Pricing</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt" aria-labelledby="faq-heading">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2 id="faq-heading">SEO FAQs for {city.name} Businesses</h2>
          </div>
          <FAQAccordion faqs={faqs.slice(0, 4)} />
        </div>
      </section>

      {/* Other Cities - Internal Linking */}
      <section className="section" aria-labelledby="othercities-heading">
        <div className="container">
          <div className="section-head" style={{ marginBottom: '32px' }}>
            <span className="eyebrow">Location Network</span>
            <h2 id="othercities-heading">SEO Services in Other Nepal Cities</h2>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {relatedCities.map((c) => (
              <Link key={c.slug} href={`/seo/${c.slug}`} className="btn btn-secondary btn-sm" aria-label={`SEO services in ${c.name}`}>
                🚀 {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Blog Posts */}
      <RelatedBlogPosts category="SEO" title={`SEO Insights & Guides for ${city.name} Businesses`} />

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, rgba(123,94,167,0.12), rgba(34,211,238,0.05))', borderTop: '1px solid var(--border)', padding: '80px 0' }} aria-label="Contact CTA">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>
            Ready to Outrank Competitors in {city.name}?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Get a free 360° SEO audit and custom growth plan for your {city.name} business.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg" id={`seo-${citySlug}-cta-bottom`}>
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
