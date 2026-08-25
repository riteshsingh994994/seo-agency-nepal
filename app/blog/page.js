import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { getBlogData } from '@/lib/data';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = {
  title: 'SEO Blog Nepal | Tips, Guides & Insights for Nepal Businesses',
  description: 'Expert SEO tips, guides, and strategies from Nepal\'s #1 SEO agency. Learn how to rank higher on Google, improve your local SEO, and grow your business online.',
  alternates: { canonical: 'https://seoagencynepal.com/blog' },
};

export default function BlogPage() {
  const posts = getBlogData();
  const breadcrumbs = [{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }} />
      <Breadcrumb items={breadcrumbs} />

      <section style={{ padding: '80px 0 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-50px', width: '500px', height: '400px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(123,94,167,0.12), transparent)', filter: 'blur(80px)' }} aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <span className="eyebrow">SEO Blog</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.025em' }}>
            SEO Insights for Nepal Businesses
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
            Expert guides, case studies, and actionable SEO tips to help you rank higher on Google and grow your business in Nepal.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="blog-heading">
        <div className="container">
          <h2 id="blog-heading" className="sr-only">Blog Posts</h2>
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '2rem', marginBottom: '12px' }}>📝</p>
              <p>Blog posts coming soon! Check back shortly.</p>
            </div>
          ) : (
            <div className="grid-3">
              {posts.map((post) => (
                <article key={post.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '32px 20px', textAlign: 'center', fontSize: '2.5rem' }} aria-hidden="true">
                    {post.category === 'Local SEO' ? '📍' : post.category === 'E-commerce SEO' ? '🛒' : '🔗'}
                  </div>
                  <div>
                    <span className="badge" style={{ marginBottom: '10px' }}>{post.category}</span>
                    <h2 style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.4, marginTop: '8px' }}>
                      <Link href={`/blog/${post.slug}`} style={{ color: 'inherit' }}>{post.title}</Link>
                    </h2>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.65, flex: 1 }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{post.date}</span>
                    <Link href={`/blog/${post.slug}`} style={{ color: 'var(--accent-bright)', fontSize: '0.88rem', fontWeight: 600 }}>
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA to services */}
      <section className="section section--alt" aria-label="Services CTA">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.6rem', marginBottom: '12px' }}>Ready to Apply These SEO Strategies?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>Let our experts handle your SEO while you focus on running your business.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" id="blog-cta">Get Free SEO Audit</Link>
            <Link href="/services/local-seo" className="btn btn-secondary">Explore Local SEO</Link>
          </div>
        </div>
      </section>
    </>
  );
}
