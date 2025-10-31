import { motion } from 'framer-motion';
import { Shield, AlertTriangle, FileCheck } from 'lucide-react';

const AntiBriberyPolicy = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <FileCheck className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Anti-Bribery and Corruption Policy</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            This policy outlines Suvarna Capital Advisors LLP's commitment to preventing bribery and
            corruption in all business activities in compliance with Indian laws and regulations.
          </p>

          <div className="space-y-8">
            <section className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Shield className="h-6 w-6 text-primary mr-2" />
                Policy Statement
              </h2>
              <p className="mb-4">
                Suvarna Capital Advisors LLP is committed to conducting business with integrity,
                transparency, and in compliance with all applicable Indian anti-bribery and corruption
                laws and regulations.
              </p>
              <p>
                The Company has a zero-tolerance approach to bribery and corruption and is committed
                to preventing these practices from occurring in any form within its organization or
                business relationships.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Scope</h2>
              <p className="mb-4">
                This policy applies to all directors, officers, employees, consultants, contractors, 
                agents, business partners, and any third parties acting on behalf of or in connection 
                with Suvarna Capital Limited.
              </p>
              <p>
                It covers all business activities, including transactions in the UK, India, and any 
                other jurisdictions where the Company operates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Prohibited Conduct</h2>
              <p className="mb-4">The following activities are strictly prohibited:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Bribes:</strong> Offering, giving, requesting, or accepting any 
                    financial or other advantage to improperly influence business decisions</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Kickbacks:</strong> Any form of unauthorized commission or reward 
                    for business referrals</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Facilitation Payments:</strong> Small payments made to expedite 
                    routine government actions (not permitted even if local custom)</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Extortion:</strong> Forcing payments or favors through threat or 
                    coercion</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Gifts and Hospitality:</strong> Excessive or inappropriate gifts, 
                    meals, or entertainment that could be construed as attempting to influence decisions</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Acceptable Gifts and Hospitality</h2>
              <p className="mb-4">
                The Company recognizes that reasonable business entertainment and gifts are acceptable, 
                provided they:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">✓</span>
                  <span>Are modest in value (not exceeding £100)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">✓</span>
                  <span>Are appropriate for the business context</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">✓</span>
                  <span>Are given openly and transparently</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">✓</span>
                  <span>Do not create a sense of obligation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">✓</span>
                  <span>Are properly recorded and approved</span>
                </li>
              </ul>
              <p className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <strong>Note:</strong> When in doubt, always consult management before accepting 
                or offering any gift or hospitality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Third Parties</h2>
              <p className="mb-4">
                Suvarna Capital Limited requires all third parties (agents, consultants, contractors) 
                to comply with this policy. Before engaging with any third party, the Company will:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Conduct appropriate due diligence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Include anti-bribery clauses in contracts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Monitor relationships on an ongoing basis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Terminate relationships if violations are discovered</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Political and Charitable Contributions</h2>
              <p className="mb-4">
                The Company may make charitable contributions and political donations in compliance 
                with applicable laws and regulations. All such contributions must be:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Transparent and properly recorded</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Made for legitimate business or charitable purposes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Approved by senior management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 font-bold">•</span>
                  <span>Unrelated to obtaining any improper business advantage</span>
                </li>
              </ul>
            </section>

            <section className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">6. Reporting and Whistleblowing</h2>
              <p className="mb-4">
                All persons covered by this policy are required to report any actual or suspected 
                bribery or corruption immediately. Reports can be made to:
              </p>
              <p className="font-semibold mb-4">
                Email: info@suvarnacapital.com<br />
                Phone: +91 98864 90099
              </p>
              <p className="text-sm text-muted-foreground">
                The Company guarantees confidentiality and protection against retaliation for anyone 
                who reports violations in good faith.
              </p>
            </section>

            <section className="bg-red-50 border-l-4 border-red-500 rounded p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                Consequences of Violation
              </h2>
              <p className="mb-4">
                Violation of this policy will result in disciplinary action, up to and including 
                termination of employment or business relationship. Legal action may also be pursued 
                where appropriate.
              </p>
              <p>
                Criminal penalties under Indian anti-bribery laws can include substantial fines and
                imprisonment depending on the severity of the offense.
              </p>
            </section>

            <section className="border-t pt-6">
              <p className="text-sm text-muted-foreground">
                <strong>Policy Version:</strong> 1.0<br />
                <strong>Last Updated:</strong> October 2025<br />
                <strong>Next Review:</strong> October 2026<br />
                <strong>Policy Owner:</strong> Suvarna Capital Limited Board of Directors
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AntiBriberyPolicy;
