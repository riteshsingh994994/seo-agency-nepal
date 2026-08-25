import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

function readJSON(filename) {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function writeJSON(filename, data) {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function getSiteData() {
  return readJSON('site.json');
}

export function getSiteUrl() {
  const site = getSiteData();
  let url = (site.siteUrl || 'https://seoagencynepal.com').trim();
  return url.replace(/\/+$/, '');
}

export function updateSiteData(updates) {
  const current = readJSON('site.json');
  const updated = { ...current, ...updates };
  writeJSON('site.json', updated);
  return updated;
}

export function getServicesData() {
  return readJSON('services.json');
}

export function updateServiceData(serviceKey, updates) {
  const current = readJSON('services.json');
  current[serviceKey] = { ...current[serviceKey], ...updates };
  writeJSON('services.json', current);
  return current;
}

export function getPricingData() {
  return readJSON('pricing.json');
}

export function updatePricingData(plans) {
  writeJSON('pricing.json', plans);
  return plans;
}

export function getTestimonialsData() {
  return readJSON('testimonials.json');
}

export function updateTestimonialsData(testimonials) {
  writeJSON('testimonials.json', testimonials);
  return testimonials;
}

export function getCaseStudiesData() {
  return readJSON('case-studies.json');
}

export function getCaseStudyBySlug(slug) {
  const all = readJSON('case-studies.json');
  return all.find((cs) => cs.slug === slug) || null;
}

export function updateCaseStudiesData(caseStudies) {
  writeJSON('case-studies.json', caseStudies);
  return caseStudies;
}

export function getFAQsData(page = null) {
  const all = readJSON('faqs.json');
  if (page) return all[page] || [];
  return all;
}

export function updateFAQsData(page, faqs) {
  const all = readJSON('faqs.json');
  all[page] = faqs;
  writeJSON('faqs.json', all);
  return all;
}

export function getBlogData() {
  const posts = readJSON('blog.json');
  return posts.filter((p) => p.published);
}

export function getAllBlogData() {
  return readJSON('blog.json');
}

export function getBlogBySlug(slug) {
  const all = readJSON('blog.json');
  return all.find((p) => p.slug === slug) || null;
}

export function updateBlogData(posts) {
  writeJSON('blog.json', posts);
  return posts;
}

export function getAuditsData() {
  return readJSON('audits.json');
}

export function addAuditRequest(entry) {
  const audits = readJSON('audits.json');
  const newAudit = {
    id: Date.now(),
    website: entry.website || '',
    name: entry.name || '',
    email: entry.email || '',
    phone: entry.phone || '',
    service: entry.service || 'General SEO',
    status: 'Pending',
    date: new Date().toISOString()
  };
  audits.unshift(newAudit);
  writeJSON('audits.json', audits);
  return newAudit;
}

export function updateAuditsData(audits) {
  writeJSON('audits.json', audits);
  return audits;
}
