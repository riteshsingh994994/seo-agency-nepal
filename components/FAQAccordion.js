'use client';
import { useState } from 'react';

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div style={styles.wrapper} role="list">
      {faqs.map((faq, i) => (
        <div
          key={i}
          style={{
            ...styles.item,
            ...(openIndex === i ? styles.itemOpen : {}),
          }}
          role="listitem"
        >
          <button
            id={`faq-btn-${i}`}
            onClick={() => toggle(i)}
            style={styles.trigger}
            aria-expanded={openIndex === i}
            aria-controls={`faq-panel-${i}`}
          >
            <span style={styles.question}>{faq.q}</span>
            <span style={{ ...styles.icon, ...(openIndex === i ? styles.iconOpen : {}) }} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 7L9 12L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </button>
          <div
            id={`faq-panel-${i}`}
            role="region"
            aria-labelledby={`faq-btn-${i}`}
            style={{
              ...styles.panel,
              ...(openIndex === i ? styles.panelOpen : {}),
            }}
          >
            <p style={styles.answer}>{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', gap: '8px' },
  item: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    transition: 'border-color 220ms ease',
  },
  itemOpen: {
    borderColor: 'var(--accent-border)',
    background: 'var(--bg-card-hover)',
  },
  trigger: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    padding: '20px 24px',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
  },
  question: {
    fontSize: '0.97rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
    flex: 1,
    lineHeight: 1.4,
  },
  icon: {
    color: 'var(--text-muted)',
    transition: 'transform 220ms ease, color 220ms ease',
    flexShrink: 0,
  },
  iconOpen: {
    transform: 'rotate(180deg)',
    color: 'var(--accent-bright)',
  },
  panel: {
    maxHeight: 0,
    overflow: 'hidden',
    transition: 'max-height 300ms ease',
  },
  panelOpen: { maxHeight: '400px' },
  answer: {
    padding: '0 24px 20px',
    color: 'var(--text-secondary)',
    fontSize: '0.93rem',
    lineHeight: 1.75,
  },
};
