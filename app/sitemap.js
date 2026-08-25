import { getAllCities } from '@/lib/cities';
import { getBlogData, getSiteUrl } from '@/lib/data';

export default async function sitemap() {
  const baseUrl = getSiteUrl();
  const cities = getAllCities();
  const blogPosts = getBlogData();

  const staticPages = [
    '',
    '/seo',
    '/services',
    '/services/local-seo',
    '/services/ecommerce-seo',
    '/services/link-building',
    '/services/geo-aeo',
    '/pricing',
    '/case-studies',
    '/about',
    '/blog',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/seo' || route.startsWith('/services') ? 0.9 : 0.8,
  }));

  const seoCityPages = cities.map((city) => ({
    url: `${baseUrl}/seo/${city.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const localSeoCityPages = cities.map((city) => ({
    url: `${baseUrl}/services/local-seo/${city.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const ecommerceCityPages = cities.map((city) => ({
    url: `${baseUrl}/services/ecommerce-seo/${city.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date || new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...seoCityPages, ...localSeoCityPages, ...ecommerceCityPages, ...blogPages];
}
