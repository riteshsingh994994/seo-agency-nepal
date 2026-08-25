import Link from 'next/link';
import {
  getSiteData, getServicesData, getPricingData,
  getTestimonialsData, getCaseStudiesData, getFAQsData, getSiteUrl
} from '@/lib/data';
import FAQAccordion from '@/components/FAQAccordion';
import HeroAuditForm from '@/components/HeroAuditForm';
import RelatedBlogPosts from '@/components/RelatedBlogPosts';
import {
  webPageSchema, serviceSchema, reviewSchema,
  faqSchema, pricingSchema
} from '@/lib/schema';

export async function generateMetadata() {
  const siteUrl = getSiteUrl();
  return {
    title: '#1 SEO Agency in Nepal | Local SEO, E-commerce SEO & Link Building',
    description: 'SEO Agency Nepal is Nepal\'s top-rated SEO company. We specialize in Local SEO, E-commerce SEO & Link Building for businesses in Kathmandu, Pokhara & across Nepal. Get your free audit!',
    alternates: { canonical: siteUrl },
    openGraph: {
      title: '#1 SEO Agency in Nepal | Local SEO, E-commerce SEO & Link Building',
      description: 'Top-rated SEO agency in Nepal helping businesses rank #1 on Google. Free SEO audit available.',
      url: siteUrl,
    },
  };
}

const services = [
  {
    key: 'local-seo',
    href: '/services/local-seo',
    label: 'Local SEO',
    desc: 'Get found by customers searching in your city. We optimize your Google Business Profile, build local citations, and dominate the 3-Pack.',
    features: ['Google Maps Optimization', 'GBP Management', 'Local Citation Building'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 2C8.477 2 4 6.477 4 12c0 7 10 16 10 16s10-9 10-16c0-5.523-4.477-10-10-10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: 'ecommerce-seo',
    href: '/services/ecommerce-seo',
    label: 'E-commerce SEO',
    desc: 'Drive more organic sales to your online store. We optimize product pages, categories, and technical structure for maximum revenue.',
    features: ['Product Page Optimization', 'E-commerce Schema', 'Technical SEO Audit'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 4h2l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L24 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="23" r="1.5" fill="currentColor"/>
        <circle cx="20" cy="23" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    key: 'link-building',
    href: '/services/link-building',
    label: 'Link Building',
    desc: 'Build domain authority with high-quality, white-hat backlinks from authoritative websites relevant to your niche.',
    features: ['Guest Post Placements', 'Broken Link Building', 'Digital PR Outreach'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 15a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const citiesForSection = [
  { name: 'Kathmandu', slug: 'kathmandu' },
  { name: 'Pokhara', slug: 'pokhara' },
  { name: 'Lalitpur', slug: 'lalitpur' },
  { name: 'Bhaktapur', slug: 'bhaktapur' },
  { name: 'Biratnagar', slug: 'biratnagar' },
  { name: 'Chitwan', slug: 'chitwan' },
  { name: 'Butwal', slug: 'butwal' },
  { name: 'Dharan', slug: 'dharan' },
];

const whyUs = [
  { icon: '📊', title: 'Data-Driven Strategies', desc: 'Every decision backed by real data from Ahrefs, SEMrush, and Search Console.' },
  { icon: '🇳🇵', title: 'Deep Nepal Market Knowledge', desc: 'We understand Nepali search behavior, competition, and consumer psychology.' },
  { icon: '🔍', title: '100% White-Hat SEO', desc: 'No risky tactics that could harm your site. We build sustainable, long-term rankings.' },
  { icon: '📈', title: 'Transparent Monthly Reports', desc: 'Clear reports showing your rankings, traffic growth, and ROI every month.' },
  { icon: '🎯', title: 'Conversion-Focused', desc: "We don't just drive traffic — we drive traffic that converts into real customers." },
  { icon: '🤝', title: 'Dedicated Account Manager', desc: 'Your own SEO expert available via call, email, and WhatsApp anytime.' },
];

export default function HomePage() {
  const site = getSiteData();
  const pricing = getPricingData();
  const testimonials = getTestimonialsData();
  const caseStudies = getCaseStudiesData().slice(0, 3);
  const faqs = getFAQsData('home');

  const siteUrl = getSiteUrl();
  const schemas = [
    webPageSchema({ title: site.name, description: site.description, url: siteUrl, site }),
    ...services.map((s) => serviceSchema({ name: s.label + ' Services in Nepal', description: s.desc, url: `${siteUrl}${s.href}`, site })),
    reviewSchema(testimonials, site),
    faqSchema(faqs),
    pricingSchema(pricing, site),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* ── HERO ── */}
      <section style={heroStyles.section} aria-label="Hero">
        <div style={heroStyles.orbA} aria-hidden="true" />
        <div style={heroStyles.orbB} aria-hidden="true" />
        <div style={heroStyles.grid} aria-hidden="true" />
        <div className="container" style={heroStyles.inner}>
          <div style={heroStyles.badge}>
            <span className="glow-dot" /> &nbsp;Nepal&apos;s Most Trusted SEO Agency
          </div>
          <h1 style={heroStyles.h1}>
            Nepal&apos;s <span className="gradient-text">#1 SEO Agency</span> That Delivers Real Rankings
          </h1>
          <p style={heroStyles.sub}>{site.heroSubheadline}</p>

          {/* Audit Form */}
          <HeroAuditForm />

          {/* Trust Bar */}
          <div style={heroStyles.trust} role="list" aria-label="Trust indicators">
            <div style={heroStyles.trustItem} role="listitem">
              <span style={heroStyles.stars} aria-label="5 stars rating">★★★★★</span>
              <span style={heroStyles.trustText}>5.0 Google Rating</span>
            </div>
            <span style={heroStyles.dot} aria-hidden="true">•</span>
            <div style={heroStyles.trustItem} role="listitem">
              <span style={heroStyles.trustNum}>150+</span>
              <span style={heroStyles.trustText}>Clients Served</span>
            </div>
            <span style={heroStyles.dot} aria-hidden="true">•</span>
            <div style={heroStyles.trustItem} role="listitem">
              <span style={heroStyles.trustNum}>300%</span>
              <span style={heroStyles.trustText}>Avg. Traffic Growth</span>
            </div>
            <span style={heroStyles.dot} aria-hidden="true">•</span>
            <div style={heroStyles.trustItem} role="listitem">
              <span style={heroStyles.trustNum}>#1</span>
              <span style={heroStyles.trustText}>SEO Agency in Nepal</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section section--alt" aria-label="Key statistics">
        <div className="container">
          <div className="grid-4" role="list">
            {site.stats.map((stat, i) => (
              <div key={i} style={statStyles.card} className="card" role="listitem">
                <div className="stat-number">{stat.value}</div>
                <p style={statStyles.label}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section" id="services" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Services</span>
            <h2 id="services-heading">Everything You Need to Rank #1 in Nepal</h2>
            <p>From local search dominance to national e-commerce authority — we have the expertise to grow your organic traffic and revenue.</p>
          </div>
          <div className="grid-3" role="list">
            {services.map((svc) => (
              <article key={svc.key} className="card" style={svcStyles.card} role="listitem">
                <div style={svcStyles.iconWrap} aria-hidden="true">{svc.icon}</div>
                <h3 style={svcStyles.title}>{svc.label}</h3>
                <p style={svcStyles.desc}>{svc.desc}</p>
                <ul className="check-list" style={{ marginBottom: '24px' }}>
                  {svc.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <Link href={svc.href} style={svcStyles.link} aria-label={`Learn more about ${svc.label}`}>
                  Learn More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section section--alt" aria-labelledby="why-heading">
        <div className="container">
          <div style={whyStyles.grid}>
            <div>
              <span className="eyebrow">Why Choose Us</span>
              <h2 id="why-heading" style={{ marginBottom: '16px' }}>Why 150+ Nepal Businesses Trust Us</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.7 }}>
                We combine deep local expertise with proven SEO methodologies to deliver results that actually move the needle for your business.
              </p>
              <div style={whyStyles.featureGrid}>
                {whyUs.map((item) => (
                  <div key={item.title} style={whyStyles.featureItem}>
                    <span style={whyStyles.featureIcon} aria-hidden="true">{item.icon}</span>
                    <div>
                      <h4 style={whyStyles.featureTitle}>{item.title}</h4>
                      <p style={whyStyles.featureDesc}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '40px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary" id="whyus-cta-btn">Get Free SEO Audit</Link>
                <Link href="/case-studies" className="btn btn-secondary">See Our Results</Link>
              </div>
            </div>
            <div style={whyStyles.visual} aria-hidden="true">
              <div style={whyStyles.visualCard}>
                <div style={whyStyles.visualBadge}>Live Ranking Report</div>
                {['#1 — SEO Agency Nepal', '#2 — Local SEO Kathmandu', '#1 — E-commerce SEO Nepal'].map((r, i) => (
                  <div key={i} style={whyStyles.rankRow}>
                    <span style={{ ...whyStyles.rankNum, color: i === 0 || i === 2 ? 'var(--green)' : 'var(--accent-bright)' }}>
                      #{i === 0 ? 1 : i === 1 ? 2 : 1}
                    </span>
                    <span style={whyStyles.rankKeyword}>{r.split('—')[1]}</span>
                  </div>
                ))}
                <div style={whyStyles.visualChart} aria-label="Traffic growth chart">
                  {[30, 45, 35, 60, 50, 75, 65, 90, 80, 100, 88, 110].map((h, i) => (
                    <div key={i} style={{ ...whyStyles.bar, height: `${h * 0.8}px`, opacity: 0.3 + i * 0.06 }} />
                  ))}
                </div>
                <p style={{ color: 'var(--green)', fontSize: '0.8rem', textAlign: 'center', marginTop: '8px' }}>
                  📈 +300% Organic Traffic Growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="section" aria-labelledby="casestudies-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Proven Results</span>
            <h2 id="casestudies-heading">Case Studies That Speak for Themselves</h2>
            <p>Real businesses. Real results. See how we&apos;ve helped Nepal businesses grow their organic traffic and revenue.</p>
          </div>
          <div className="grid-3">
            {caseStudies.map((cs) => (
              <article key={cs.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <span className="badge">{cs.service}</span>
                  <h3 style={{ marginTop: '12px', fontSize: '1.1rem' }}>{cs.client}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>{cs.industry} · {cs.city}</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {cs.results.map((r) => (
                    <div key={r.metric} style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '12px 8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--green)', fontFamily: 'var(--font-heading)', lineHeight: 1.25, overflowWrap: 'anywhere' }}>{r.value}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{r.metric}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{r.period}</div>
                    </div>
                  ))}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', flex: 1 }}>{cs.challenge}</p>
                <Link href={`/case-studies`} style={{ color: 'var(--accent-bright)', fontSize: '0.9rem', fontWeight: 600 }} aria-label={`View case study for ${cs.client}`}>
                  View Case Study →
                </Link>
              </article>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/case-studies" className="btn btn-secondary" id="all-case-studies-btn">View All Case Studies</Link>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section section--alt" id="pricing" aria-labelledby="pricing-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Pricing</span>
            <h2 id="pricing-heading">Transparent SEO Pricing in Nepal</h2>
            <p>No hidden fees. No long-term lock-ins. Choose the plan that fits your business goals.</p>
          </div>
          <div className="grid-3">
            {pricing.map((plan) => (
              <div key={plan.id} style={{ ...pricingStyles.card, ...(plan.highlight ? pricingStyles.highlighted : {}) }}>
                {plan.badge && <div style={pricingStyles.badge}>{plan.badge}</div>}
                <div>
                  <h3 style={pricingStyles.name}>{plan.name}</h3>
                  <p style={pricingStyles.tagline}>{plan.tagline}</p>
                </div>
                <div style={pricingStyles.priceWrap}>
                  <span style={pricingStyles.currency}>NPR</span>
                  <span style={pricingStyles.price}>{plan.price.toLocaleString()}</span>
                  <span style={pricingStyles.period}>/{plan.period}</span>
                </div>
                <ul className="check-list" style={{ flex: 1 }}>
                  {plan.features.map((f) => <li key={f} style={{ fontSize: '0.88rem' }}>{f}</li>)}
                </ul>
                <Link href={plan.ctaLink} className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'center' }} id={`pricing-cta-${plan.id}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '24px', fontSize: '0.88rem' }}>
            * Prices are in Nepali Rupees (NPR). Custom packages available for larger projects.{' '}
            <Link href="/pricing" style={{ color: 'var(--accent-bright)' }}>View full pricing details →</Link>
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Client Reviews</span>
            <h2 id="testimonials-heading">What Our Clients Say</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '12px' }}>
              <span style={{ color: '#F59E0B', fontSize: '1.2rem' }}>★★★★★</span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>5.0</span>
              <span style={{ color: 'var(--text-muted)' }}>from {testimonials.length} reviews</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {testimonials.map((t) => (
              <div key={t.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '4px', color: '#F59E0B' }} aria-label={`${t.rating} stars`}>
                  {'★'.repeat(t.rating)}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, flex: 1 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.company} · {t.city}</div>
                  </div>
                  <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>{t.service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITIES ── */}
      <section className="section section--alt" aria-labelledby="cities-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Local SEO Services</span>
            <h2 id="cities-heading">We Serve Businesses Across Nepal</h2>
            <p>Our Local SEO experts help businesses in every major city in Nepal rank higher and get more customers.</p>
          </div>
          <div className="grid-4" role="list">
            {citiesForSection.map((city) => (
              <Link
                key={city.slug}
                href={`/services/local-seo/${city.slug}`}
                style={cityStyles.card}
                role="listitem"
                aria-label={`Local SEO services in ${city.name}`}
              >
                <span style={cityStyles.pin} aria-hidden="true">📍</span>
                <span style={cityStyles.name}>Local SEO in {city.name}</span>
                <span style={cityStyles.arrow} aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2 id="faq-heading">Frequently Asked Questions</h2>
            <p>Everything you need to know about our SEO services in Nepal.</p>
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── RELATED BLOG POSTS ── */}
      <RelatedBlogPosts category="SEO" title="SEO Insights & Growth Guides for Nepal Businesses" />

      {/* ── FINAL CTA ── */}
      <section style={ctaStyles.section} aria-labelledby="finalcta-heading">
        <div className="container" style={ctaStyles.inner}>
          <div style={ctaStyles.orbA} aria-hidden="true" />
          <div style={ctaStyles.orbB} aria-hidden="true" />
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <h2 id="finalcta-heading" style={ctaStyles.h2}>Start Ranking Higher Today</h2>
            <p style={ctaStyles.sub}>
              Join 150+ Nepal businesses that trust us to grow their organic traffic. Get your free SEO audit and custom strategy.
            </p>
            <div style={ctaStyles.btns}>
              <Link href="/contact" className="btn btn-primary btn-lg" id="final-cta-primary">Get Free SEO Audit</Link>
              <Link href="/pricing" className="btn btn-secondary btn-lg" id="final-cta-pricing">View Pricing</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── INLINE STYLES ── */
const heroStyles = {
  section: {
    position: 'relative', overflow: 'hidden',
    padding: '120px 0 100px', isolation: 'isolate',
  },
  orbA: {
    position: 'absolute', top: '-150px', left: '-100px',
    width: '600px', height: '600px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(123,94,167,0.25), transparent)',
    filter: 'blur(60px)', zIndex: -1,
  },
  orbB: {
    position: 'absolute', bottom: '-100px', right: '-80px',
    width: '500px', height: '500px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(34,211,238,0.12), transparent)',
    filter: 'blur(60px)', zIndex: -1,
  },
  grid: {
    position: 'absolute', inset: 0, zIndex: -1,
    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
    backgroundSize: '60px 60px',
    WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)',
    maskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)',
  },
  inner: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '28px' },
  badge: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    padding: '6px 16px', borderRadius: '999px',
    background: 'rgba(123,94,167,0.12)', border: '1px solid rgba(123,94,167,0.3)',
    fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-bright)',
  },
  h1: { fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, letterSpacing: '-0.03em', maxWidth: '820px', lineHeight: 1.1 },
  sub: { fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '620px', lineHeight: 1.7 },
  form: {
    display: 'flex', gap: '10px', width: '100%', maxWidth: '580px',
    background: 'var(--bg-card)', border: '1px solid var(--border-strong)',
    borderRadius: '999px', padding: '6px 6px 6px 20px', flexWrap: 'wrap',
  },
  input: {
    flex: 1, minWidth: '200px', background: 'none', border: 'none',
    color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none',
  },
  trust: { display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' },
  trustItem: { display: 'flex', alignItems: 'center', gap: '6px' },
  stars: { color: '#F59E0B', fontSize: '0.95rem' },
  trustText: { fontSize: '0.85rem', color: 'var(--text-muted)' },
  trustNum: { fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' },
  dot: { color: 'var(--border-strong)' },
};

const statStyles = {
  card: { textAlign: 'center', padding: '28px 20px' },
  label: { color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '8px' },
};

const svcStyles = {
  card: { display: 'flex', flexDirection: 'column', gap: '16px' },
  iconWrap: {
    width: '52px', height: '52px', borderRadius: '12px',
    background: 'var(--accent-dim)', color: 'var(--accent-bright)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  title: { fontSize: '1.15rem', fontWeight: 700 },
  desc: { color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65, flex: 1 },
  link: { color: 'var(--accent-bright)', fontWeight: 600, fontSize: '0.9rem', marginTop: 'auto' },
};

const whyStyles = {
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' },
  featureGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  featureItem: { display: 'flex', gap: '12px', alignItems: 'flex-start' },
  featureIcon: { fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' },
  featureTitle: { fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' },
  featureDesc: { fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 },
  visual: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  visualCard: {
    background: 'var(--bg-card)', border: '1px solid var(--border-accent)',
    borderRadius: 'var(--radius-lg)', padding: '28px', width: '100%', maxWidth: '340px',
    boxShadow: 'var(--shadow-accent)',
  },
  visualBadge: {
    display: 'inline-block', padding: '4px 12px', borderRadius: '999px',
    background: 'var(--green-dim)', color: 'var(--green)', fontSize: '0.75rem',
    fontWeight: 600, marginBottom: '16px', border: '1px solid rgba(16,185,129,0.3)',
  },
  rankRow: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid var(--border)' },
  rankNum: { fontWeight: 800, fontSize: '1.1rem', fontFamily: 'var(--font-heading)', width: '28px', flexShrink: 0 },
  rankKeyword: { fontSize: '0.85rem', color: 'var(--text-secondary)' },
  visualChart: { display: 'flex', alignItems: 'flex-end', gap: '4px', height: '80px', marginTop: '16px', padding: '0 4px' },
  bar: { flex: 1, background: 'linear-gradient(180deg, var(--accent), var(--cyan))', borderRadius: '3px 3px 0 0' },
};

const pricingStyles = {
  card: {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)', padding: '32px',
    display: 'flex', flexDirection: 'column', gap: '20px',
    position: 'relative',
  },
  highlighted: {
    borderColor: 'var(--accent-border)',
    background: 'linear-gradient(135deg, var(--bg-card), rgba(123,94,167,0.08))',
    boxShadow: 'var(--shadow-accent)',
  },
  badge: {
    position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, var(--accent), #9B6DE8)',
    color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '4px 16px',
    borderRadius: '999px', whiteSpace: 'nowrap',
  },
  name: { fontSize: '1.2rem', fontWeight: 800 },
  tagline: { color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' },
  priceWrap: { display: 'flex', alignItems: 'baseline', gap: '4px' },
  currency: { fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 },
  price: { fontSize: '2.4rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' },
  period: { fontSize: '0.88rem', color: 'var(--text-muted)' },
};

const cityStyles = {
  card: {
    display: 'flex', alignItems: 'center', gap: '10px',
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)', padding: '18px 20px',
    transition: 'all 220ms ease', color: 'var(--text-secondary)',
    fontSize: '0.9rem',
  },
  pin: { fontSize: '1rem', flexShrink: 0 },
  name: { flex: 1, fontWeight: 500 },
  arrow: { color: 'var(--accent-bright)', marginLeft: 'auto' },
};

const ctaStyles = {
  section: {
    position: 'relative', overflow: 'hidden', padding: '100px 0',
    background: 'linear-gradient(135deg, rgba(123,94,167,0.15), rgba(34,211,238,0.06))',
    borderTop: '1px solid var(--border)',
  },
  inner: { position: 'relative' },
  orbA: {
    position: 'absolute', top: '-100px', left: '-50px',
    width: '400px', height: '400px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(123,94,167,0.3), transparent)',
    filter: 'blur(60px)',
  },
  orbB: {
    position: 'absolute', bottom: '-80px', right: '-60px',
    width: '350px', height: '350px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(34,211,238,0.15), transparent)',
    filter: 'blur(60px)',
  },
  h2: { fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '16px' },
  sub: { color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '36px', maxWidth: '560px', margin: '0 auto 36px' },
  btns: { display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' },
};
