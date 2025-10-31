import { motion } from 'framer-motion';
import { Lock, Eye, Database, Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            This Privacy Policy explains how Suvarna Capital Limited collects, uses, and protects
            your personal information in compliance with Indian data protection laws and applicable regulations.
          </p>

          <div className="space-y-8">
            <section className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Eye className="h-6 w-6 text-primary mr-2" />
                Overview
              </h2>
              <p className="mb-4">
                Suvarna Capital Advisors LLP ("we", "our", or "us") is committed to protecting and respecting
                your privacy. This policy sets out the basis on which any personal data we collect from
                you, or that you provide to us, will be processed by us.
              </p>
            <p className="font-semibold">
              Data Controller: Suvarna Capital Advisors LLP<br />
              LLP Registration: LLP IN: AAK-3567<br />
              Registered Office: Dharwad, Karnataka, India<br />
              Contact: info@suvarnacapital.com
            </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3 mt-4">1.1 Information You Provide</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Company name, location, and contact details</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Personal details (name, email, phone number)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Professional information (designation, role)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Credit rating and financial information (when relevant)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Communication preferences and inquiries</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-4">1.2 Information We Automatically Collect</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Website usage data (IP address, browser type, pages visited)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Device information and technical identifiers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Cookie data (see Cookie Policy section)</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use your personal information for the following purposes:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Service Delivery:</strong> To provide renewable energy advisory and M&A services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Communication:</strong> To respond to your inquiries and maintain business relationships</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Lead Management:</strong> To process and manage your interest in our services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Legal Compliance:</strong> To comply with regulatory obligations and legal requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Business Improvement:</strong> To analyze website usage and improve our services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Marketing:</strong> To send you information about relevant services (with your consent)</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Legal Basis for Processing</h2>
              <p className="mb-4">We process your personal data based on:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Consent:</strong> When you voluntarily provide information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Contractual Necessity:</strong> To perform services you've requested</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Legal Obligations:</strong> To comply with applicable Indian laws</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Legitimate Interests:</strong> For business operations and service improvement</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Sharing and Disclosure</h2>
              <p className="mb-4">We may share your information with:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Service Providers:</strong> Third-party vendors who assist in operations (CRM, IT services)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Business Partners:</strong> When necessary to deliver requested services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Legal Authorities:</strong> When required by law or to protect rights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Professional Advisors:</strong> Legal, financial, or accounting professionals</span>
                </li>
              </ul>
              <p className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Database className="h-6 w-6 text-primary mr-2" />
                5. Data Storage and Security
              </h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your personal data:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Encrypted data transmission and storage</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Access controls and authentication</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Regular security assessments and updates</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Employee training on data protection</span>
                </li>
              </ul>
              <p className="mt-4">
                Your data may be transferred and stored outside India. When this occurs, we ensure
                appropriate safeguards are in place to protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <p className="mb-4">Under Indian data protection laws, you have the following rights:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Right to Access:</strong> Request copies of your personal data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Right to Erasure:</strong> Request deletion of your data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Right to Restrict Processing:</strong> Limit how we use your data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Right to Data Portability:</strong> Receive your data in a structured format</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Right to Object:</strong> Object to processing based on legitimate interests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span><strong>Right to Withdraw Consent:</strong> Where processing is based on consent</span>
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at info@suvarnacapital.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
              <p className="mb-4">
                We retain your personal data only for as long as necessary to fulfill the purposes 
                for which it was collected, including:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Legal obligations and regulatory requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Ongoing business relationships</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Dispute resolution and legal claims</span>
                </li>
              </ul>
              <p className="mt-4">
                Typically, we retain client data for 7 years after the end of the business relationship 
                or as required by applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Cookies</h2>
              <p className="mb-4">
                Our website uses cookies to enhance user experience and analyze website traffic. 
                For detailed information about our use of cookies, please see our Cookie Policy.
              </p>
              <p>
                You can control cookies through your browser settings, though this may affect website functionality.
              </p>
            </section>

            <section className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">9. Contact and Complaints</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact:
              </p>
              <p className="font-semibold mb-4">
                Email: info@suvarnacapital.com<br />
                Phone: +91 98864 90099<br />
                Address: RS No.45, Plot No. 24, Sri Laxmi Nivas, 2nd Cross, Jaynagar, Saptapur, 
                Dharwad 580001, Karnataka, India
              </p>
              <p className="text-sm text-muted-foreground">
                You also have the right to lodge a complaint with the relevant data protection authority
                in India if you believe your data protection rights have been violated.
              </p>
            </section>

            <section className="border-t pt-6">
              <p className="text-sm text-muted-foreground">
                <strong>Policy Version:</strong> 1.0<br />
                <strong>Last Updated:</strong> October 2025<br />
                <strong>Next Review:</strong> October 2026
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                We may update this Privacy Policy from time to time. Material changes will be notified 
                on our website or via email.
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
