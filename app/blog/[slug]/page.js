import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { getBlogBySlug, getBlogData } from '@/lib/data';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';

export async function generateStaticParams() {
  const posts = getBlogData();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: { canonical: `https://seoagencynepal.com/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post || !post.published) notFound();

  const allPosts = getBlogData();
  const related = allPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${slug}` },
  ];

  const schemas = [articleSchema({ post }), breadcrumbSchema(breadcrumbs)];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <Breadcrumb items={breadcrumbs} />

      <article style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          {/* Header */}
          <header style={{ marginBottom: '40px' }}>
            <span className="badge" style={{ marginBottom: '16px' }}>{post.category}</span>
            <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: '16px' }}>
              {post.title}
            </h1>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <span>By {post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>{post.date}</time>
              {post.tags?.map((tag) => (
                <span key={tag} style={{ padding: '2px 8px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.78rem' }}>#{tag}</span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className="prose">
            <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: '28px' }}>
              {post.excerpt}
            </p>
            <p>{post.content}</p>
            <h2>Key Takeaways</h2>
            <ul>
              <li>Understanding {post.category} is essential for Nepal businesses in 2025.</li>
              <li>Implementing the right strategies can dramatically increase your organic traffic.</li>
              <li>Consistency and patience are key — SEO results compound over time.</li>
              <li>Working with an experienced local SEO agency gives you a competitive edge.</li>
            </ul>
            <h2>Ready to Get Started?</h2>
            <p>
              If you want to implement these strategies for your business in Nepal, our team of SEO experts at SEO Agency Nepal is ready to help. We offer a free SEO audit to get you started.
            </p>
          </div>

          {/* CTA Box */}
          <div style={{ background: 'linear-gradient(135deg, rgba(123,94,167,0.15), rgba(34,211,238,0.06))', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-lg)', padding: '32px', margin: '48px 0', textAlign: 'center' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '10px' }}>Want These Results for Your Business?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.95rem' }}>
              Get a free SEO audit and custom strategy from Nepal&apos;s top SEO experts.
            </p>
            <Link href="/contact" className="btn btn-primary" id={`blog-${slug}-cta`}>Get Free SEO Audit →</Link>
          </div>

          {/* Related Posts */}
          {related.length > 0 && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '40px' }}>
              <h3 style={{ fontWeight: 700, marginBottom: '24px' }}>Related Articles</h3>
              <div className="grid-2">
                {related.map((rp) => (
                  <div key={rp.slug} className="card" style={{ gap: '12px', display: 'flex', flexDirection: 'column' }}>
                    <span className="badge">{rp.category}</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{rp.title}</h4>
                    <Link href={`/blog/${rp.slug}`} style={{ color: 'var(--accent-bright)', fontSize: '0.88rem', fontWeight: 600 }}>Read More →</Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div style={{ marginTop: '40px' }}>
            <Link href="/blog" className="btn btn-secondary btn-sm">← Back to Blog</Link>
          </div>
        </div>
      </article>
    </>
  );
}
