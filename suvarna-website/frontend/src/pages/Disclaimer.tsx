import { motion } from 'framer-motion';
import { AlertCircle, FileText, Info } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Disclaimer</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Please read this disclaimer carefully before using the Suvarna Capital Limited website and services.
          </p>

          <div className="space-y-8">
            <section className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Website Disclaimer</h2>
              <p className="mb-4">
                The information on this website is provided by Suvarna Capital Limited ("the Company") 
                for general informational purposes only. While we endeavor to keep the information up 
                to date and correct, we make no representations or warranties of any kind, express or 
                implied, about the completeness, accuracy, reliability, suitability, or availability 
                of the website or the information, products, services, or related graphics contained 
                on the website.
              </p>
              <p>
                Any reliance you place on such information is strictly at your own risk. We are not 
                liable for any loss or damage arising from the use of this website or reliance on the 
                information provided herein.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <AlertCircle className="h-6 w-6 text-primary mr-2" />
                1. Financial and Investment Disclaimer
              </h2>
              <p className="mb-4">
                Suvarna Capital Limited is not authorized to provide financial advice or regulated 
                financial services in all jurisdictions. The information on this website is not intended 
                to constitute:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Investment, financial, or tax advice</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>A recommendation to buy, sell, or hold any securities or financial products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>An offer or solicitation to make an investment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>A substitute for professional financial advice tailored to your circumstances</span>
                </li>
              </ul>
              <p className="mt-4">
                Past performance is not indicative of future results. All investments carry risk, and 
                you should seek independent professional advice before making any investment decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Advisory Services</h2>
              <p className="mb-4">
                Suvarna Capital Limited provides investment advisory and M&A advisory services for 
                renewable energy projects and assets. Please note:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Our advisory services are subject to specific engagement agreements and terms of service</span>
                </li>
                <li className="flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>We do not guarantee the outcome of any transaction or advisory engagement</span>
                </li>
                <li className="flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>All services are provided based on publicly available information and client-provided data</span>
                </li>
                <li className="flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Clients should conduct their own due diligence before making decisions</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Renewable Energy Projects</h2>
              <p className="mb-4">
                Information provided regarding renewable energy projects, solar installations, and 
                energy solutions:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Is for general guidance purposes only</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Does not account for specific site conditions, regulations, or local requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>May be subject to regulatory changes and market conditions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Should be verified with qualified professionals before implementation</span>
                </li>
              </ul>
              <p className="mt-4">
                Actual savings, performance, and outcomes may vary based on numerous factors including 
                geographic location, energy consumption patterns, installation quality, and maintenance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Third-Party Links and Content</h2>
              <p className="mb-4">
                This website may contain links to third-party websites. We do not endorse, control, 
                or assume responsibility for:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Content of any third-party websites</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Services, products, or information offered by third parties</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Privacy practices or policies of other websites</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Any transactions or dealings with third parties</span>
                </li>
              </ul>
              <p className="mt-4">
                Your use of any linked websites is at your own risk and subject to the terms of 
                use of those websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
              <p className="mb-4">
                To the fullest extent permitted by law, Suvarna Capital Limited and its directors, 
                officers, employees, and agents shall not be liable for:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Any direct, indirect, incidental, consequential, or punitive damages arising 
                    from use of this website or services</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Loss of profits, revenue, data, or other intangible losses</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Errors, omissions, or inaccuracies in information provided</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Interruption of business or website availability</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Unauthorized access to or alterations of your data</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
              <p className="mb-4">
                This website and its content, including but not limited to text, graphics, logos, 
                images, and software, are the property of Suvarna Capital Limited and are protected 
                by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, or create derivative works from any content 
                on this website without prior written consent from the Company.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Jurisdiction and Governing Law</h2>
              <p className="mb-4">
                This disclaimer and website use are governed by the laws of India.
                Any disputes arising from the use of this website shall be subject to the exclusive
                jurisdiction of the courts of India.
              </p>
              <p>
                Suvarna Capital Advisors LLP, a Limited Liability Partnership firm, [LLP IN: AAK-3567] is registered pursuant to section 58 (1) of the LLP Act of 2008.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Changes to This Disclaimer</h2>
              <p className="mb-4">
                We reserve the right to update or modify this disclaimer at any time without prior 
                notice. Your continued use of the website following any changes constitutes acceptance 
                of the revised disclaimer.
              </p>
              <p>
                We encourage you to review this disclaimer periodically for any updates.
              </p>
            </section>

            <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <h2 className="text-2xl font-bold mb-4">9. Professional Advice</h2>
              <p className="mb-4">
                The information provided on this website is not a substitute for professional advice. 
                You should always:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">✓</span>
                  <span>Consult qualified professionals for legal, financial, tax, or technical advice</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">✓</span>
                  <span>Verify all information independently before making decisions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">✓</span>
                  <span>Consider your specific circumstances and requirements</span>
                </li>
              </ul>
            </section>

            <section className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
              <p className="mb-4">
                For questions about this disclaimer or our services, please contact:
              </p>
              <p className="font-semibold">
                Suvarna Capital Advisors LLP<br />
                Email: info@suvarnacapital.com<br />
                Phone: +91 98864 90099<br />
                Registered Office: RS No.45, Plot No. 24, Sri Laxmi Nivas, 2nd Cross,
                Jaynagar, Saptapur, Dharwad 580001, Karnataka, India<br />
                LLP Registration: LLP IN: AAK-3567
              </p>
            </section>

            <section className="border-t pt-6">
              <p className="text-sm text-muted-foreground">
                <strong>Disclaimer Version:</strong> 1.0<br />
                <strong>Last Updated:</strong> October 2025<br />
                <strong>Effective Date:</strong> October 2025
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Disclaimer;
