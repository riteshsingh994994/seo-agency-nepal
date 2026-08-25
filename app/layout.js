import './globals.css';
import Script from 'next/script';
import { getSiteData } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuditModal from '@/components/AuditModal';
import { organizationSchema, websiteSchema, localBusinessSchema } from '@/lib/schema';

export async function generateMetadata() {
  const site = getSiteData();
  const siteUrl = (site.siteUrl || 'https://seoagencynepal.com').replace(/\/+$/, '');
  return {
    title: {
      default: `${site.name} - Nepal's #1 ROI-Driven SEO Agency`,
      template: `%s ${site.metaTitleSuffix}`,
    },
    description: site.description,
    keywords: ['SEO Nepal', 'SEO Agency Nepal', 'Local SEO Nepal', 'SEO Company Kathmandu', 'E-commerce SEO Nepal', 'Link Building Nepal'],
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    robots: { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName: site.name,
      title: `${site.name} - Nepal's #1 ROI-Driven SEO Agency`,
      description: site.description,
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} - Nepal's #1 ROI-Driven SEO Agency`,
      description: site.description,
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: siteUrl,
    },
    verification: {
      google: site.googleSiteVerification || '33cYqTKhmSXG2cG2HAlsNOnfuC8iruFfPaTHgwxox4E',
    },
  };
}

export default function RootLayout({ children }) {
  const site = getSiteData();
  const orgSchema = organizationSchema(site);
  const webSchema = websiteSchema(site);
  const bizSchema = localBusinessSchema(site);
  const gaId = site.googleAnalyticsId || 'G-CWDVVP86G1';

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#06060C" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bizSchema) }}
        />
      </head>
      <body>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header site={site} />
        <main id="main-content">{children}</main>
        <Footer site={site} />
        <AuditModal />
      </body>
    </html>
  );
}
