import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQAccordion from '@/components/FAQAccordion';
import RelatedBlogPosts from '@/components/RelatedBlogPosts';
import { getServicesData, getFAQsData, getSiteData, getSiteUrl } from '@/lib/data';
import { serviceSchema, breadcrumbSchema, faqSchema, howToSchema } from '@/lib/schema';

export async function generateMetadata() {
  const siteUrl = getSiteUrl();
  return {
    title: 'SEO Services in Nepal | Get More Customers & #1 Google Rankings',
    description: 'Searching for SEO services in Nepal? SEO Agency Nepal helps you get found on Google, attract the right customers, outrank competitors, and turn search traffic into real business leads. Get your free audit!',
    alternates: { canonical: `${siteUrl}/seo` },
    openGraph: {
      title: 'SEO Services in Nepal | Get More Customers & #1 Google Rankings',
      description: 'Complete SEO services in Nepal — On-Page, Technical, Off-Page, Local SEO, and AI GEO & AEO.',
      url: `${siteUrl}/seo`,
    },
  };
}

const cities = [
  { name: 'Kathmandu', slug: 'kathmandu', desc: "Nepal's commercial center — highest search competition & revenue potential" },
  { name: 'Pokhara', slug: 'pokhara', desc: 'Tourism, hospitality & resort search optimization' },
  { name: 'Lalitpur', slug: 'lalitpur', desc: 'Patan business district & local service SEO' },
  { name: 'Bhaktapur', slug: 'bhaktapur', desc: 'Heritage, cultural & local retail SEO' },
  { name: 'Biratnagar', slug: 'biratnagar', desc: 'Industrial & B2B trade search optimization' },
  { name: 'Chitwan', slug: 'chitwan', desc: 'Tourism, commercial & agricultural hub' },
  { name: 'Butwal', slug: 'butwal', desc: 'Western Nepal commercial center SEO' },
  { name: 'Dharan', slug: 'dharan', desc: 'Eastern Nepal education & service sector' },
];

const industries = [
  { icon: '🏨', name: 'Hotels, Restaurants & Resorts', desc: 'Attract international tourists and local guests searching for accommodations & dining in Kathmandu, Pokhara & Chitwan.' },
  { icon: '🎓', name: 'Schools, Colleges & Institutes', desc: 'Rank for high-intent academic search queries to drive student admissions across Nepal.' },
  { icon: '🛒', name: 'E-commerce & Online Retailers', desc: 'Drive organic buyers directly to product pages on Shopify, WooCommerce & custom stores.' },
  { icon: '🏥', name: 'Hospitals, Dental & Healthcare', desc: 'Help patients in Nepal find medical clinics, doctors, and healthcare services locally.' },
  { icon: '🏘️', name: 'Real Estate & Construction', desc: 'Generate qualified leads for property listings, land sales, housing projects, and architectural firms.' },
  { icon: '💼', name: 'Professional & B2B Services', desc: 'Dominate search results for IT companies, law firms, accounting agencies, and consultancies.' },
];

const seoPillars = [
  {
    title: '1. On-Page SEO',
    subtitle: 'Building the Foundation Inside Your Website',
    desc: 'On-page work covers everything inside your website that influences how search engines understand and rank your content.',
    items: [
      'Writing click-worthy meta titles, meta descriptions, and semantic H1-H6 headings.',
      'Structuring clean, keyword-consistent URL hierarchies.',
      'Building internal links to pass PageRank authority across strategic pages.',
      'Matching content precisely with user search intent and semantic keywords.',
    ]
  },
  {
    title: '2. Off-Page SEO & Backlinks',
    subtitle: 'Establishing Domain Trust & Web Authority',
    desc: 'Off-page SEO is about what the web says about your business. We build sustainable authority that Google trusts.',
    items: [
      'Earning high-DA backlinks from niche-relevant, trustworthy websites.',
      'Executing digital PR and brand mentions across news and media platforms.',
      'Raising Domain Rating (DR) and Domain Authority (DA) safely.',
      'Disavowing spammy or toxic links that could trigger Google penalties.',
    ]
  },
  {
    title: '3. Local SEO & Maps',
    subtitle: 'Connecting With Nearby Customers Ready to Buy',
    desc: 'If your customers are in Kathmandu, Pokhara, or any city in Nepal, local SEO ensures you get found first.',
    items: [
      'Setting up and fully optimizing your Google Business Profile (GBP).',
      'Injecting location-focused keywords and geo-targeted schema markup.',
      'Building consistent NAP (Name, Address, Phone) citations across local directories.',
      'Dominating Google Maps 3-Pack searches that drive direct calls & visits.',
    ]
  },
  {
    title: '4. Technical SEO & Performance',
    subtitle: 'Ensuring Search Engines & Users Enjoy a Fast Site',
    desc: "A website with technical flaws won't rank, no matter how good the copy is. We fix underlying code issues.",
    items: [
      'Resolving crawl errors, 404 broken links, and indexing blockages.',
      'Optimizing PageSpeed scores and Core Web Vitals for mobile users.',
      'Deploying JSON-LD structured data (Organization, LocalBusiness, FAQ).',
      'Implementing SSL, HTTPS, XML sitemaps, and robots.txt rules.',
    ]
  },
  {
    title: '5. Content Strategy & Keyword Research',
    subtitle: 'Creating Authority Content That Converts Visitors',
    desc: 'Strong, valuable content is the engine that drives your entire SEO strategy and builds long-term brand authority.',
    items: [
      'In-depth keyword research matching transactional and informational search behavior in Nepal.',
      'Creating comprehensive service pages, pillar pages, and blog guides.',
      'Refreshing old content to maintain freshness and topical authority.',
      'Integrating rich media, custom graphics, and video elements.',
    ]
  },
  {
    title: '6. GEO & AEO (AI Search Engine Optimization)',
    subtitle: 'Getting Found on ChatGPT, Google Gemini & Perplexity',
    desc: 'Search is evolving. We optimize your brand to get recommended inside AI conversational tools.',
    items: [
      'Structuring content into direct Q&A formats that AI bots extract.',
      'Building brand entity presence in Knowledge Graphs and Wikidata.',
      'Optimizing for Google AI Overviews & Gemini generative snippets.',
      'Tracking AI prompt recommendations and source citations monthly.',
    ]
  }
];

export default function GeneralSEOPage() {
  const allServices = getServicesData();
  const svc = allServices['seo'];
  const faqs = getFAQsData('seo');
  const site = getSiteData();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'SEO Services', url: '/seo' },
  ];

  const schemas = [
    serviceSchema({
      name: 'SEO Services in Nepal',
      description: svc.description,
      url: 'https://seoagencynepal.com/seo',
      areaServed: { '@type': 'Country', name: 'Nepal' },
    }),
    breadcrumbSchema(breadcrumbs),
    howToSchema({ name: 'Our Complete SEO Process', description: 'Step-by-step SEO methodology for Nepal businesses', steps: svc.process }),
    faqSchema(faqs),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <Breadcrumb items={breadcrumbs} />

      {/* ── HERO SECTION ── */}
      <section style={styles.heroWrap}>
        <div style={styles.orbA} aria-hidden="true" />
        <div className="container" style={styles.heroInner}>
          <span className="eyebrow">SEO Service in Nepal</span>
          <h1 style={styles.h1}>
            Get Found on Google & Turn Search Traffic Into <span className="gradient-text">Real Business Leads</span>
          </h1>
          <p style={styles.sub}>
            Built a great website but still stuck on Google&apos;s third or fourth page? We help businesses across Nepal improve their visibility on Google, reach the right customers, bring more targeted visitors, and generate consistent leads and sales through search.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '8px' }}>
            <Link href="/contact" className="btn btn-primary btn-lg" id="seo-hero-audit-btn">Get Free 360° SEO Audit</Link>
            <Link href="#pillars" className="btn btn-secondary btn-lg">Explore SEO Pillars ↓</Link>
          </div>
          <div style={styles.heroBadges}>
            {['100% White-Hat Only', 'Data-Driven Keyword Strategy', 'Google Maps 3-Pack', 'ChatGPT & Gemini AEO'].map((b) => (
              <span key={b} className="badge badge-cyan">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="section section--alt" aria-label="Key Performance Indicators">
        <div className="container">
          <div className="grid-4">
            {[
              { value: '150+', label: 'Successful SEO Projects in Nepal' },
              { value: '5+ Yrs', label: 'Dedicated Search Marketing Expertise' },
              { value: '300%', label: 'Average Organic Traffic Growth' },
              { value: '92%', label: 'Client Retention & Satisfaction' },
            ].map((st, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div className="stat-number">{st.value}</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT TO LOOK FOR IN AN SEO AGENCY IN NEPAL ── */}
      <section className="section" aria-labelledby="choose-heading">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="section-head" style={{ marginBottom: '40px' }}>
            <span className="eyebrow">Choosing The Right Partner</span>
            <h2 id="choose-heading">What Businesses Should Look for When Choosing an SEO Agency in Nepal</h2>
            <p>
              When choosing an SEO agency in Nepal, look for a team that understands your business, uses a transparent approach, keeps you updated, and focuses on bringing the right visitors and qualified leads — not just vanity keyword rankings.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-lg)', padding: '36px', boxShadow: 'var(--shadow-accent)' }}>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: '24px' }}>
              With years of experience providing SEO services in Nepal, <strong>SEO Agency Nepal</strong> has become a search agency businesses can rely on. Before we start working on your website, we first understand your business, target audience, local competition, and revenue goals. This enables us to create a customized SEO roadmap to get your business found by customers ready to buy.
            </p>

            <div className="grid-2" style={{ gap: '20px' }}>
              {[
                { title: 'Customized SEO Roadmap', desc: 'A clear SEO plan based on your unique business goals, budget, and local market competition in Nepal.' },
                { title: 'Intent-Driven Keyword Research', desc: 'Identifying the exact search terms your customers use when they are ready to make a purchase.' },
                { title: 'Technical Site Optimization', desc: 'Fixing crawl errors, slow page speeds, mobile issues, and site architecture that harm rankings.' },
                { title: 'On-Page & Off-Page Authority', desc: 'Optimizing web pages, meta tags, and securing high-DA backlinks to build search engine trust.' },
                { title: 'AEO & GEO Optimization', desc: 'Ensuring your business appears in AI answers (ChatGPT, Gemini) and local map search results.' },
                { title: 'Transparent Monthly Reports', desc: 'Clear, straightforward reports so you always know your exact rankings, traffic, and lead growth.' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={styles.checkIcon}>✓</div>
                  <div>
                    <h3 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '4px' }}>{item.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE HELP YOUR BUSINESS GET FOUND ONLINE (PROCESS) ── */}
      <section className="section section--alt" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Proven Process</span>
            <h2 id="process-heading">How We Help Your Business Get Found Online</h2>
            <p>We follow a systematic 5-step SEO methodology that turns search visibility into measurable revenue.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { num: '01', title: 'Site Audit and Analysis', desc: 'We start by taking a close look at your website, spotting technical problems, content weaknesses, missing schema markup, and anything slowing down search performance. This gives us a clear baseline.' },
              { num: '02', title: 'Intent-Based Keyword Research', desc: "We find the exact keywords your target audience in Nepal is using when they're ready to buy. The goal is to bring in visitors who are genuinely interested, not just passing through." },
              { num: '03', title: 'Strategic Content Roadmap', desc: 'Using keyword insights, we map out a content plan built around what your audience is actively searching for. We focus on pages that answer real questions and build your authority over time.' },
              { num: '04', title: 'On-Page & Technical Optimization', desc: 'We optimize every page: structure, title tags, heading hierarchy, internal linking, schema markup, and mobile speed so search engines can read and rank your content with confidence.' },
              { num: '05', title: 'Performance Tracking & Continuous Growth', desc: 'SEO requires ongoing refinement. We keep a close eye on rankings, traffic, and lead conversions, making regular adjustments to keep your search performance growing month after month.' },
            ].map((st) => (
              <div key={st.num} className="card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={styles.processNum}>{st.num}</div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '6px' }}>{st.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLETE 360° SEO PILLARS BREAKDOWN ── */}
      <section className="section" id="pillars" aria-labelledby="pillars-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Full Service Breakdown</span>
            <h2 id="pillars-heading">Complete SEO Services Under One Roof</h2>
            <p>From technical SEO and keyword research to content optimization, local search, and link building — get a complete SEO solution from one expert team in Nepal.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {seoPillars.map((p, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: idx % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-surface)' }}>
                <div>
                  <span className="badge" style={{ marginBottom: '8px' }}>{p.subtitle}</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{p.title}</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>{p.desc}</p>
                <div className="grid-2" style={{ gap: '12px', marginTop: '4px' }}>
                  {p.items.map((item, itemIdx) => (
                    <div key={itemIdx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent-bright)', fontWeight: 700 }}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY VERTICALS TARGETED ── */}
      <section className="section section--alt" aria-labelledby="industries-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Industry Expertise</span>
            <h2 id="industries-heading">Tailored SEO Solutions for Nepal Industries</h2>
            <p>We build industry-specific SEO strategies tailored to how customers search in your business domain.</p>
          </div>

          <div className="grid-3">
            {industries.map((ind, i) => (
              <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '2rem' }}>{ind.icon}</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{ind.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, flex: 1 }}>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION-BASED TIER 2 INTERLINKING GRID ── */}
      <section className="section" id="cities" aria-labelledby="cities-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Location-Based Sub-Pages</span>
            <h2 id="cities-heading">SEO Services Across Major Cities in Nepal</h2>
            <p>We provide specialized full-suite SEO services tailored for local business markets in every major city in Nepal.</p>
          </div>

          <div className="grid-4">
            {cities.map((city) => (
              <Link key={city.slug} href={`/seo/${city.slug}`} style={styles.cityCard} aria-label={`SEO services in ${city.name}, Nepal`}>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '6px' }}>📍 SEO in {city.name}</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{city.desc}</p>
                <span style={{ color: 'var(--accent-bright)', fontSize: '0.82rem', fontWeight: 700, marginTop: '12px', display: 'block' }}>
                  SEO Services in {city.name} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section section--alt" aria-labelledby="faq-heading">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-head">
            <span className="eyebrow">Frequently Asked Questions</span>
            <h2 id="faq-heading">Common Questions About SEO Services in Nepal</h2>
            <p>Transparency is our core value. Here are answers to the most common questions our partners ask us.</p>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── RELATED BLOG POSTS ── */}
      <RelatedBlogPosts category="SEO" title="Related Search Engine Optimization Articles" />

      {/* ── FINAL CTA SECTION ── */}
      <section style={styles.ctaS} aria-label="Contact CTA">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px' }}>
            Ready to Turn Search Engine Traffic Into <span className="gradient-text">Real Business Growth</span>?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px', fontSize: '1.05rem' }}>
            Book a free consultation or get a comprehensive 360° SEO audit to see how we can outrank your competitors in Nepal.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg" id="seo-footer-audit-btn">Get My Free SEO Audit</Link>
            <Link href="/pricing" className="btn btn-secondary btn-lg">View Pricing Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}

const styles = {
  heroWrap: { position: 'relative', padding: '90px 0 80px', overflow: 'hidden' },
  orbA: { position: 'absolute', top: '-100px', right: '-50px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(123,94,167,0.2), transparent)', filter: 'blur(60px)', zIndex: 0 },
  heroInner: { position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '760px' },
  h1: { fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.15 },
  sub: { fontSize: '1.08rem', color: 'var(--text-secondary)', lineHeight: 1.75 },
  heroBadges: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  checkIcon: { width: '22px', height: '22px', borderRadius: '50%', background: 'var(--green-dim)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', fontWeight: 800, flexShrink: 0, marginTop: '2px' },
  processNum: { width: '44px', height: '44px', borderRadius: '12px', background: 'var(--accent-dim)', color: 'var(--accent-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', flexShrink: 0, fontFamily: 'var(--font-heading)' },
  cityCard: { display: 'block', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px', transition: 'all 220ms ease' },
  ctaS: { background: 'linear-gradient(135deg, rgba(123,94,167,0.14), rgba(34,211,238,0.06))', borderTop: '1px solid var(--border)', padding: '90px 0' },
};
