// Schema markup generators for JSON-LD structured data

function getBaseUrl(site) {
  let url = (site?.siteUrl || 'https://seoagencynepal.com').trim();
  return url.replace(/\/+$/, '');
}

export function organizationSchema(site) {
  const base = getBaseUrl(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${base}/#organization`,
    name: site.name,
    url: base,
    logo: {
      '@type': 'ImageObject',
      url: `${base}${site.logo || '/uploads/logo.png'}`,
    },
    description: site.description,
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address?.street,
      addressLocality: site.address?.city,
      addressRegion: site.address?.state,
      postalCode: site.address?.postalCode,
      addressCountry: 'NP',
    },
    sameAs: Object.values(site.social || {}).filter(Boolean),
  };
}

export function localBusinessSchema(site) {
  const base = getBaseUrl(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${base}/#local-business`,
    name: site.name,
    image: `${base}${site.heroImage || '/uploads/hero-banner.jpg'}`,
    url: base,
    telephone: site.phone,
    email: site.email,
    priceRange: '₨₨₨',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address?.street,
      addressLocality: site.address?.city,
      addressRegion: site.address?.state,
      postalCode: site.address?.postalCode,
      addressCountry: 'NP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 27.7172,
      longitude: 85.324,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    hasMap: 'https://maps.google.com/maps?q=Thamel,Kathmandu,Nepal',
    areaServed: {
      '@type': 'Country',
      name: 'Nepal',
    },
  };
}

export function websiteSchema(site) {
  const base = getBaseUrl(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${base}/#website`,
    name: site.name,
    url: base,
    description: site.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${base}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function webPageSchema({ title, description, url, dateModified, site }) {
  const base = getBaseUrl(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url ? (url.startsWith('http') ? url : `${base}${url}`) : base,
    dateModified: dateModified || new Date().toISOString().split('T')[0],
    isPartOf: { '@id': `${base}/#website` },
    publisher: { '@id': `${base}/#organization` },
  };
}

export function serviceSchema({ name, description, url, areaServed, provider, site }) {
  const base = getBaseUrl(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    url: url ? (url.startsWith('http') ? url : `${base}${url}`) : base,
    provider: provider || { '@id': `${base}/#organization` },
    areaServed: areaServed || { '@type': 'Country', name: 'Nepal' },
    serviceType: name,
  };
}

export function localBusinessCitySchema({ site, city, service, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${site.name} - ${service} in ${city.name}`,
    url: url,
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: 'NP',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service,
    },
  };
}

export function breadcrumbSchema(items, site) {
  const base = getBaseUrl(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? (item.url.startsWith('http') ? item.url : `${base}${item.url}`) : undefined,
    })),
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export function reviewSchema(testimonials, site) {
  const base = getBaseUrl(site);
  const avgRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / (testimonials.length || 1);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: base,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: testimonials.length,
      bestRating: '5',
      worstRating: '1',
    },
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: '5' },
      reviewBody: t.text,
    })),
  };
}

export function pricingSchema(plans, site) {
  const base = getBaseUrl(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    seller: { '@id': `${base}/#organization` },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'SEO Service Packages',
      itemListElement: plans.map((plan) => ({
        '@type': 'Offer',
        name: `${plan.name} SEO Package`,
        description: plan.tagline,
        price: plan.price,
        priceCurrency: 'NPR',
        eligibleDuration: {
          '@type': 'QuantitativeValue',
          value: 1,
          unitCode: 'MON',
        },
      })),
    },
  };
}

export function howToSchema({ name, description, steps }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      name: step.title,
      text: step.desc,
    })),
  };
}

export function articleSchema({ post, site }) {
  const base = getBaseUrl(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${base}${post.image}`,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@id': `${base}/#organization`,
    },
    datePublished: post.date,
    dateModified: post.date,
    url: `${base}/blog/${post.slug}`,
    mainEntityOfPage: `${base}/blog/${post.slug}`,
  };
}
