import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  ArrowRight,
  Zap,
  Leaf,
  TrendingUp,
  DollarSign,
  Shield,
  CheckCircle2,
  Factory,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { register, type RegisterData } from '@/lib/authApi';
import { indianStates } from '@/data/indianStates';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function LandingAB() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    companyName: '',
    firstName: '',
    lastName: '',
    location: '',
    state: '',
    mobile: '',
  } as RegisterData & { confirmPassword: string });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field: keyof RegisterData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    if (formData.password !== (formData as any).confirmPassword) {
      setSubmitStatus('error');
      setErrorMessage('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 8) {
      setSubmitStatus('error');
      setErrorMessage('Password must be at least 8 characters long');
      setIsSubmitting(false);
      return;
    }

    try {
      await register(formData);
      setSubmitStatus('success');
      setTimeout(() => {
        navigate('/buyer/dashboard');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to register');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                  Zero Investment • Guaranteed Savings
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Achieve Your
                <span className="text-primary block">RE100 Goals</span>
                Without Capital Investment
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Join 200+ corporates already saving millions on electricity costs through our curated renewable energy marketplace. 
                <span className="text-primary font-semibold"> Start saving from Day 1.</span>
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 mb-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>No Setup Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Verified Sellers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>100% Compliant</span>
                </div>
              </div>

              {/* CTA Button */}
              <a href="#register-form">
                <Button size="lg" className="group text-lg px-8 py-6 h-auto">
                  Get Matched with Sellers Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              <Card className="p-6 border-primary/20">
                <div className="text-4xl font-bold text-primary mb-2">₹2.8Cr+</div>
                <div className="text-sm text-muted-foreground">Average Annual Savings</div>
              </Card>
              <Card className="p-6 border-primary/20">
                <div className="text-4xl font-bold text-primary mb-2">200+</div>
                <div className="text-sm text-muted-foreground">Corporate Clients</div>
              </Card>
              <Card className="p-6 border-primary/20">
                <div className="text-4xl font-bold text-primary mb-2">500MW+</div>
                <div className="text-sm text-muted-foreground">Projects Facilitated</div>
              </Card>
              <Card className="p-6 border-primary/20">
                <div className="text-4xl font-bold text-primary mb-2">15-30%</div>
                <div className="text-sm text-muted-foreground">Cost Reduction</div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Leading Corporates Choose Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We've revolutionized how companies access renewable energy in India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: DollarSign,
                title: 'Zero Capital Investment',
                description: 'Start your renewable energy journey with zero upfront costs. We handle all capital requirements while you save from day one.',
                highlight: 'Save ₹50L - ₹5Cr annually'
              },
              {
                icon: Zap,
                title: 'Guaranteed Savings',
                description: 'Lock in lower electricity rates with guaranteed 15-30% savings compared to grid tariffs. Predictable costs for better budgeting.',
                highlight: '15-30% lower than grid rates'
              },
              {
                icon: Leaf,
                title: 'Meet RE100 Goals',
                description: 'Achieve 100% renewable energy targets required by investors and stakeholders. Improve ESG ratings and corporate reputation.',
                highlight: '100% carbon-neutral operations'
              },
              {
                icon: Shield,
                title: 'Verified & Compliant',
                description: 'All sellers are vetted by our team. Every transaction is legally compliant with state regulations and grid connectivity norms.',
                highlight: '100% regulatory compliance'
              },
              {
                icon: TrendingUp,
                title: 'Curated Marketplace',
                description: 'We match you with pre-verified sellers based on your location, capacity needs, and business requirements. No cold calling needed.',
                highlight: 'Quality over quantity'
              },
              {
                icon: Factory,
                title: 'Industrial Expertise',
                description: 'Specialized in serving manufacturing, IT parks, data centers, and large commercial facilities. Proven track record across industries.',
                highlight: '200+ successful projects'
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-shadow border-primary/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-4">{benefit.description}</p>
                  <div className="text-sm font-semibold text-primary">{benefit.highlight}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Use Cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Success Stories from Real Businesses
            </h2>
            <p className="text-xl text-muted-foreground">
              See how companies like yours are saving money and going green
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                company: 'Manufacturing Giant',
                industry: 'Auto Components',
                location: 'Pune, Maharashtra',
                capacity: '25 MW Solar',
                savings: '₹3.2 Cr/year',
                quote: 'Zero investment and immediate savings. We reduced our electricity costs by 28% in the first month itself.',
                metrics: ['28% Cost Reduction', 'Zero Capex', 'RE100 Achieved']
              },
              {
                company: 'IT Park',
                industry: 'Technology',
                location: 'Bangalore, Karnataka',
                capacity: '15 MW Hybrid',
                savings: '₹2.1 Cr/year',
                quote: 'The curated matching saved us months of vendor evaluation. We found the perfect seller in 2 weeks.',
                metrics: ['2 Weeks to Match', '15 MW Capacity', 'Green Certification']
              },
              {
                company: 'Textile Factory',
                industry: 'Manufacturing',
                location: 'Coimbatore, Tamil Nadu',
                capacity: '20 MW Solar',
                savings: '₹2.8 Cr/year',
                quote: 'Finally met our sustainability targets without draining capital reserves. Best decision for our business.',
                metrics: ['20% Lower Rates', 'ESG Improved', 'Quick Setup']
              },
            ].map((caseStudy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full p-6 border-primary/20">
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-primary mb-1">{caseStudy.industry}</div>
                    <h3 className="text-xl font-bold mb-2">{caseStudy.company}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4" />
                      {caseStudy.location}
                    </div>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg mb-4">
                    <p className="text-sm italic text-muted-foreground">"{caseStudy.quote}"</p>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-muted-foreground">Capacity</span>
                      <span className="font-semibold">{caseStudy.capacity}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">Annual Savings</span>
                      <span className="font-bold text-primary text-lg">{caseStudy.savings}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.metrics.map((metric, i) => (
                        <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple 4-step process to start saving
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Register Your Company',
                description: 'Fill in your company details and energy requirements. Takes less than 2 minutes.',
              },
              {
                step: '2',
                title: 'Get Matched',
                description: 'Our experts match you with verified sellers based on location, capacity, and pricing.',
              },
              {
                step: '3',
                title: 'Review & Connect',
                description: 'Review matched sellers and connect directly with the ones that fit your needs.',
              },
              {
                step: '4',
                title: 'Start Saving',
                description: 'Sign PPA agreement and start saving on electricity costs from day one.',
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <Card className="p-6 h-full text-center border-primary/20">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/20">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 md:p-12 border-primary/20 shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Start Saving Today
                </h2>
                <p className="text-xl text-muted-foreground">
                  Join 200+ companies already reducing electricity costs
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="ABC Manufacturing Pvt Ltd"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Business Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="contact@company.com"
                      required
                    />
                  </div>
                </div>

                {/* Contact Person */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Rajesh"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Kumar"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="location">City *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Pune"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => handleInputChange('state', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                {/* Password */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Min. 8 characters"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={(formData as any).confirmPassword || ''}
                      onChange={(e) => handleInputChange('confirmPassword' as any, e.target.value)}
                      placeholder="Re-enter password"
                      required
                    />
                  </div>
                </div>

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {errorMessage}
                  </div>
                )}

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    Registration successful! Redirecting to dashboard...
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg py-6 h-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Create Account & Get Matched
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  By registering, you agree to our{' '}
                  <Link to="/privacy-policy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  {' '}and{' '}
                  <Link to="/code-of-conduct" className="text-primary hover:underline">
                    Terms of Service
                  </Link>
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Questions? Let's Talk
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our renewable energy experts are ready to help you get started
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="mailto:info@suvarnacapital.com" className="flex items-center gap-2 hover:opacity-80">
              <Mail className="h-5 w-5" />
              info@suvarnacapital.com
            </a>
            <a href="tel:+919886490099" className="flex items-center gap-2 hover:opacity-80">
              <Phone className="h-5 w-5" />
              +91 98864 90099
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
