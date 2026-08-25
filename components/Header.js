'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { openAuditModal } from '@/components/AuditModal';

const navLinks = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Full SEO Services', href: '/seo', desc: 'On-Page, Technical, Off-Page & Local SEO' },
      { label: 'Local SEO', href: '/services/local-seo', desc: 'Dominate local search & Google Maps' },
      { label: 'E-commerce SEO', href: '/services/ecommerce-seo', desc: 'Drive more sales to your online store' },
      { label: 'Link Building', href: '/services/link-building', desc: 'Build authority with quality backlinks' },
      { label: 'GEO & AEO', href: '/services/geo-aeo', desc: 'ChatGPT, Gemini & AI search engine optimization' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
];

export default function Header({ site }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
        <div className="container">
          <nav className={styles.nav} aria-label="Main navigation">
            {/* Logo */}
            <Link href="/" className={styles.logo} aria-label={`${site.name} - Home`}>
              <span className={styles.logoIcon} aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="url(#logoGrad)"/>
                  <path d="M8 22L13 10L18 18L21 14L24 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                      <stop offset="0%" stopColor="#7B5EA7"/>
                      <stop offset="100%" stopColor="#22D3EE"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className={styles.logoText}>
                <span className={styles.logoMain}>SEO Agency</span>
                <span className={styles.logoSub}>Nepal</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <ul className={styles.navLinks} role="menubar">
              {navLinks.map((link) => (
                <li
                  key={link.href}
                  className={styles.navItem}
                  onMouseEnter={() => link.children && setActiveDropdown(link.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  role="none"
                >
                  <Link href={link.href} className={styles.navLink} role="menuitem">
                    {link.label}
                    {link.children && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    )}
                  </Link>
                  {link.children && activeDropdown === link.href && (
                    <div className={styles.dropdown} role="menu" aria-label={`${link.label} submenu`}>
                      {link.children.map((child) => (
                        <Link key={child.href} href={child.href} className={styles.dropdownItem} role="menuitem">
                          <span className={styles.dropdownItemTitle}>{child.label}</span>
                          <span className={styles.dropdownItemDesc}>{child.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA + Toggle */}
            <div className={styles.navRight}>
              <button
                type="button"
                onClick={() => openAuditModal()}
                className="btn btn-primary btn-sm"
                id="header-cta-btn"
              >
                Get Free Audit
              </button>
              <button
                className={styles.menuToggle}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label="Toggle mobile menu"
                id="mobile-menu-toggle"
              >
                <span className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`} aria-hidden="true">
                  <span/><span/><span/>
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        id="mobile-nav-menu"
      >
        <div className={styles.mobileMenuInner}>
          {navLinks.map((link) => (
            <div key={link.href} className={styles.mobileSection}>
              <Link
                href={link.href}
                className={styles.mobilePrimary}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className={styles.mobileChildren}>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={styles.mobileChild}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{child.label}</span>
                      <small>{child.desc}</small>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
            onClick={() => setMenuOpen(false)}
            id="mobile-cta-btn"
          >
            Get Free SEO Audit
          </Link>
        </div>
      </div>
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}
    </>
  );
}
