import Link from 'next/link';
import { getBlogData } from '@/lib/data';

export default function RelatedBlogPosts({ category = '', title = 'Latest Search Engine & Digital Marketing Guides' }) {
  const allPosts = getBlogData();

  // Filter by category match first
  let filtered = [];
  if (category) {
    filtered = allPosts.filter((p) =>
      p.category.toLowerCase().includes(category.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(category.toLowerCase())))
    );
  }

  // Fill up to 3 posts with other published posts
  if (filtered.length < 3) {
    const existingIds = new Set(filtered.map((p) => p.id));
    for (const post of allPosts) {
      if (!existingIds.has(post.id)) {
        filtered.push(post);
        existingIds.add(post.id);
      }
      if (filtered.length === 3) break;
    }
  }

  const postsToShow = filtered.slice(0, 3);

  if (postsToShow.length === 0) return null;

  return (
    <section className="section section--alt" aria-labelledby="related-blog-heading">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Knowledge & Insights</span>
          <h2 id="related-blog-heading">{title}</h2>
          <p>Read our latest expert articles, case studies, and SEO strategies for Nepal businesses.</p>
        </div>

        <div className="grid-3" style={{ gap: '24px', marginBottom: '40px' }}>
          {postsToShow.map((post) => (
            <article key={post.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge badge-cyan">{post.category}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{post.date}</span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, lineHeight: 1.35 }}>
                <Link href={`/blog/${post.slug}`} style={{ color: 'var(--text-primary)', transition: 'color 200ms' }}>
                  {post.title}
                </Link>
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.6, flex: 1 }}>
                {post.excerpt}
              </p>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>By {post.author}</span>
                <Link href={`/blog/${post.slug}`} style={{ color: 'var(--accent-bright)', fontSize: '0.85rem', fontWeight: 700 }}>
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Read Our Blog Button */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/blog" className="btn btn-secondary btn-lg" id="read-our-blog-btn">
            📚 Read Our Blog →
          </Link>
        </div>
      </div>
    </section>
  );
}
