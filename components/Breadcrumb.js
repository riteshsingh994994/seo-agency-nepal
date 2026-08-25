import Link from 'next/link';
import { breadcrumbSchema } from '@/lib/schema';

export default function Breadcrumb({ items }) {
  const schema = breadcrumbSchema(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" style={styles.nav}>
        <ol style={styles.list} itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, i) => (
            <li
              key={i}
              style={styles.item}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {i < items.length - 1 ? (
                <>
                  <Link href={item.url} style={styles.link} itemProp="item">
                    <span itemProp="name">{item.name}</span>
                  </Link>
                  <span style={styles.sep} aria-hidden="true">/</span>
                </>
              ) : (
                <span style={styles.current} itemProp="name" aria-current="page">
                  {item.name}
                </span>
              )}
              <meta itemProp="position" content={String(i + 1)} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

const styles = {
  nav: {
    padding: '14px 0',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg-surface)',
  },
  list: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '4px',
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 24px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  link: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    transition: 'color 0.2s',
  },
  sep: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    margin: '0 4px',
  },
  current: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontWeight: 500,
  },
};
