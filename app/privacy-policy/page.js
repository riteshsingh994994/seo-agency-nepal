import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: 'Privacy Policy | SEO Agency Nepal',
  description: 'Privacy policy for SEO Agency Nepal. Learn how we handle and protect your personal information.',
  alternates: { canonical: 'https://seoagencynepal.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  const breadcrumbs = [{ name: 'Home', url: '/' }, { name: 'Privacy Policy', url: '/privacy-policy' }];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <section style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '24px' }}>Privacy Policy</h1>
          <div className="prose">
            <p>Last updated: January 2025</p>
            <p>SEO Agency Nepal (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>
            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us when submitting lead forms, requesting free audits, or contacting us, including: name, email address, phone number, website URL, and project details.</p>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To provide, maintain, and deliver our SEO services and free website audits.</li>
              <li>To respond to your inquiries and support requests.</li>
              <li>To send administrative information, updates, and service notifications.</li>
            </ul>
            <h2>Data Protection</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or alteration. We never sell your personal information to third parties.</p>
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at hello@seoagencynepal.com.</p>
          </div>
        </div>
      </section>
    </>
  );
}
