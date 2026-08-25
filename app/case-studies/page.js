import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedBlogPosts from '@/components/RelatedBlogPosts';
import { getCaseStudiesData } from '@/lib/data';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = {
  title: 'SEO Case Studies Nepal | Real Results for Real Businesses',
  description: 'See how SEO Agency Nepal has helped 150+ businesses grow their organic traffic and revenue. Real case studies with measurable results from Nepal businesses.',
  alternates: { canonical: 'https://seoagencynepal.com/case-studies' },
};

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudiesData();
  const breadcrumbs = [{ name: 'Home', url: '/' }, { name: 'Case Studies', url: '/case-studies' }];
  const schema = breadcrumbSchema(breadcrumbs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumb items={breadcrumbs} />

      {/* Hero */}
      <section style={{ padding: '80px 0 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(16,185,129,0.12), transparent)', filter: 'blur(80px)' }} aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <span className="eyebrow">Proven Results</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.025em' }}>
            Real Results. Real Businesses. Real Growth.
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Discover how we&apos;ve helped Nepal businesses increase their organic traffic, rankings, and revenue through proven SEO strategies.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section" aria-labelledby="casestudies-heading">
        <div className="container">
          <h2 id="casestudies-heading" className="sr-only">Case Studies</h2>
          <div className="grid-3">
            {caseStudies.filter((cs) => cs.published).map((cs) => (
              <article key={cs.id} style={cardS} className="card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge">{cs.service}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{cs.city}, Nepal</span>
                </div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px' }}>{cs.client}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '16px' }}>{cs.industry}</p>

                {/* Results */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  {cs.results.map((r) => (
                    <div key={r.metric} style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '12px 8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--green)', fontFamily: 'var(--font-heading)' }}>{r.value}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>{r.metric}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <div>
                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Challenge</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>{cs.challenge}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Solution</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>{cs.solution}</p>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{cs.date}</span>
                  <Link href={`/contact?ref=${cs.slug}`} className="btn btn-outline btn-sm" id={`cs-${cs.slug}-cta`}>Get Similar Results</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section section--alt" aria-labelledby="aggregate-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Track Record</span>
            <h2 id="aggregate-heading">Results We&apos;ve Delivered Across Nepal</h2>
          </div>
          <div className="grid-4">
            {[
              { value: '150+', label: 'Businesses Helped' },
              { value: '300%', label: 'Average Traffic Increase' },
              { value: '92%', label: 'Client Retention Rate' },
              { value: '5★', label: 'Average Client Rating' },
            ].map((s) => (
              <div key={s.label} className="card" style={{ textAlign: 'center' }}>
                <div className="stat-number">{s.value}</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '8px' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Blog Posts */}
      <RelatedBlogPosts category="SEO" title="Read Our Latest Case Studies & SEO Guides" />

      {/* CTA */}
      <section style={{ padding: '80px 0', textAlign: 'center', background: 'linear-gradient(135deg, rgba(123,94,167,0.1), transparent)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>Want Results Like These for Your Business?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Get a free SEO audit and let us show you exactly how we can grow your organic traffic.</p>
          <Link href="/contact" className="btn btn-primary btn-lg" id="casestudies-cta">Get My Free SEO Audit</Link>
        </div>
      </section>
    </>
  );
}

const cardS = { display: 'flex', flexDirection: 'column', gap: '12px' };
