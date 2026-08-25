import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: 'Terms of Service | SEO Agency Nepal',
  description: 'Terms of Service for SEO Agency Nepal.',
  alternates: { canonical: 'https://seoagencynepal.com/terms-of-service' },
};

export default function TermsPage() {
  const breadcrumbs = [{ name: 'Home', url: '/' }, { name: 'Terms of Service', url: '/terms-of-service' }];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <section style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '24px' }}>Terms of Service</h1>
          <div className="prose">
            <p>Last updated: January 2025</p>
            <p>By accessing or using the services provided by SEO Agency Nepal, you agree to be bound by these Terms of Service.</p>
            <h2>Services</h2>
            <p>We provide Search Engine Optimization (SEO) services including Local SEO, E-commerce SEO, and Link Building as described on our website and in client agreements.</p>
            <h2>Payment & Terms</h2>
            <p>All prices listed on the website are in Nepali Rupees (NPR) unless specified otherwise. Invoices are billed monthly in advance unless a custom contract states otherwise.</p>
            <h2>Disclaimer</h2>
            <p>While we apply industry-leading, white-hat SEO techniques, search engine algorithms are controlled solely by search engine providers (e.g., Google). We do not guarantee specific numerical position rankings on Google.</p>
            <h2>Contact Us</h2>
            <p>For any questions regarding these terms, contact us at hello@seoagencynepal.com.</p>
          </div>
        </div>
      </section>
    </>
  );
}
