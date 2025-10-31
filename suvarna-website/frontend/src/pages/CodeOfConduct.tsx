import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

const CodeOfConduct = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Code of Conduct</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            This Code of Conduct sets out the standards of behavior expected from all individuals associated 
            with Suvarna Capital Limited ("the Company").
          </p>

          <div className="space-y-8">
            <section className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-primary mr-2" />
                Our Commitments
              </h2>
              <div className="space-y-4">
                <p>
                  Suvarna Capital Limited is committed to maintaining the highest standards of professional 
                  conduct and ethical behavior. We recognize our responsibility to act with integrity, 
                  transparency, and accountability in all our business dealings.
                </p>
                <p>
                  This Code applies to all directors, officers, employees, consultants, and business partners 
                  who represent or act on behalf of the Company.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Integrity and Honesty</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Conduct business with honesty, integrity, and transparency</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Provide accurate and complete information to clients and stakeholders</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Maintain confidentiality of sensitive information</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Respect intellectual property rights</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Client Relations</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Put client interests first and act in their best interest</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Provide expert advice based on thorough analysis and due diligence</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Disclose any conflicts of interest immediately</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Deliver services promptly and maintain clear communication</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Environmental and Social Responsibility</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Promote sustainable and responsible renewable energy practices</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Support the transition to clean energy sources</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Respect human rights in all business operations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Consider environmental and social impacts in all decisions</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Compliance and Legal Requirements</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Comply with all applicable laws and regulations in UK and India</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Adhere to financial services regulations and standards</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Maintain proper records and documentation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Report any suspected violations immediately</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Professional Standards</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Maintain professional competence through continuous learning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Treat colleagues, clients, and partners with respect</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Foster a collaborative and inclusive work environment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Exercise sound judgment in business decisions</span>
                </li>
              </ul>
            </section>

            <section className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <AlertCircle className="h-6 w-6 text-primary mr-2" />
                Reporting Violations
              </h2>
              <p className="mb-4">
                If you become aware of any violation of this Code of Conduct, please report it immediately to:
              </p>
              <p className="font-semibold">
                Email: info@suvarnacapital.com<br />
                Phone: +91 98864 90099
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                All reports will be treated with strict confidence, and the Company will not tolerate 
                retaliation against anyone who reports violations in good faith.
              </p>
            </section>

            <section className="border-t pt-6">
              <p className="text-sm text-muted-foreground">
                <strong>Last Updated:</strong> October 2025<br />
                <strong>Next Review:</strong> October 2026
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                This Code of Conduct is reviewed annually and may be updated to reflect changes in 
                legislation, regulations, or best practices.
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CodeOfConduct;
