import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQAccordion from '@/components/FAQAccordion';
import { getPricingData, getFAQsData } from '@/lib/data';
import { pricingSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';

export const metadata = {
  title: 'SEO Pricing in Nepal | Affordable SEO Packages Starting NPR 15,000/month',
  description: 'Transparent SEO pricing for Nepal businesses. Starter from NPR 15,000/month, Growth from NPR 30,000/month, Enterprise from NPR 60,000/month. No hidden fees. Get a free audit!',
  alternates: { canonical: 'https://seoagencynepal.com/pricing' },
};

export default function PricingPage() {
  const plans = getPricingData();
  const faqs = getFAQsData('pricing');

  const breadcrumbs = [{ name: 'Home', url: '/' }, { name: 'Pricing', url: '/pricing' }];
  const schemas = [pricingSchema(plans, {}), breadcrumbSchema(breadcrumbs), faqSchema(faqs)];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <Breadcrumb items={breadcrumbs} />

      {/* Hero */}
      <section style={{ padding: '80px 0 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }} aria-label="Pricing Hero">
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(123,94,167,0.18), transparent)', filter: 'blur(80px)' }} aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <span className="eyebrow">Pricing</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.025em' }}>
            Transparent SEO Pricing in Nepal
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto 12px', lineHeight: 1.7 }}>
            No hidden fees. No long-term lock-ins. Choose the plan that matches your growth goals.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>All prices are in Nepali Rupees (NPR) · Billed monthly</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section section--alt" aria-labelledby="plans-heading">
        <div className="container">
          <h2 id="plans-heading" className="sr-only">SEO Pricing Plans</h2>
          <div className="grid-3">
            {plans.map((plan) => (
              <div key={plan.id} style={{ ...cardStyle, ...(plan.highlight ? highlightStyle : {}) }}>
                {plan.badge && (
                  <div style={badgeStyle}>{plan.badge}</div>
                )}
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '4px' }}>{plan.name}</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{plan.tagline}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', padding: '20px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>NPR</span>
                  <span style={{ fontSize: '2.8rem', fontWeight: 900, fontFamily: 'var(--font-heading)' }}>{plan.price.toLocaleString()}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/{plan.period}</span>
                </div>
                <ul className="check-list" style={{ flex: 1 }}>
                  {plan.features.map((f) => <li key={f} style={{ fontSize: '0.88rem' }}>{f}</li>)}
                </ul>
                <Link href={plan.ctaLink} className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'center' }} id={`pricing-page-${plan.id}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section" aria-labelledby="compare-heading">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="section-head">
            <span className="eyebrow">Comparison</span>
            <h2 id="compare-heading">What&apos;s Included in Each Plan?</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle} role="table">
              <thead>
                <tr>
                  <th style={{ ...thStyle, textAlign: 'left' }}>Feature</th>
                  {plans.map((p) => <th key={p.id} style={{ ...thStyle, color: p.highlight ? 'var(--accent-bright)' : 'var(--text-primary)' }}>{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Target Keywords', '10', '25', '50+'],
                  ['Locations Targeted', '1', '3', 'Unlimited'],
                  ['On-Page Optimization', '5 pages', '15 pages', 'Unlimited'],
                  ['Google Business Profile', '✓', '✓ + Management', '✓ Full Management'],
                  ['Monthly Backlinks', '—', '5 Guest Posts', 'Custom Campaign'],
                  ['Technical SEO Audit', '—', '✓', '✓ Advanced'],
                  ['Schema Markup', '—', '✓', '✓ Full'],
                  ['Reporting Frequency', 'Monthly', 'Weekly', 'Daily'],
                  ['Account Manager', '—', '✓', '✓ Dedicated'],
                  ['WhatsApp Support', '—', '✓', '✓ Priority'],
                ].map(([feature, ...vals]) => (
                  <tr key={feature}>
                    <td style={tdStyle}>{feature}</td>
                    {vals.map((v, i) => (
                      <td key={i} style={{ ...tdStyle, textAlign: 'center', color: v === '—' ? 'var(--text-muted)' : 'var(--text-primary)', fontWeight: v.startsWith('✓') ? 600 : 400 }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt" aria-labelledby="pricingfaq-heading">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2 id="pricingfaq-heading">Pricing FAQs</h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, rgba(123,94,167,0.12), transparent)', borderTop: '1px solid var(--border)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>Not Sure Which Plan Is Right for You?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Get a free consultation and we&apos;ll recommend the best plan for your specific goals and budget.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg" id="pricing-page-contact">Get Free Consultation</Link>
            <Link href="/case-studies" className="btn btn-secondary btn-lg">See Our Results</Link>
          </div>
        </div>
      </section>
    </>
  );
}

const cardStyle = { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' };
const highlightStyle = { borderColor: 'var(--accent-border)', boxShadow: 'var(--shadow-accent)', background: 'linear-gradient(135deg, var(--bg-card), rgba(123,94,167,0.06))' };
const badgeStyle = { position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, var(--accent), #9B6DE8)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '4px 16px', borderRadius: '999px', whiteSpace: 'nowrap' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' };
const thStyle = { padding: '14px 16px', background: 'var(--bg-elevated)', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center', borderBottom: '1px solid var(--border)' };
const tdStyle = { padding: '12px 16px', fontSize: '0.88rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' };
