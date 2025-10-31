import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  CheckCircle2,
  Zap,
  Building2,
  Mail,
  Phone,
  Sun,
  Wind,
  Loader2,
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { indianStates } from '@/data/indianStates';

const projectTypes = [
  { value: 'Solar', label: 'Solar Power' },
  { value: 'Wind', label: 'Wind Energy' },
  { value: 'Hybrid', label: 'Hybrid (Solar + Wind)' },
];

import { getApiPath } from '@/lib/apiConfig';

export default function SellerLanding() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    projectType: '',
    capacity: '',
    location: '',
    state: '',
    askingPrice: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Validation
    if (!formData.companyName || !formData.contactPerson || !formData.contactEmail || 
        !formData.contactPhone || !formData.projectType || !formData.capacity || 
        !formData.location || !formData.state || !formData.askingPrice) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(getApiPath('/api/sellers/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          capacity: parseFloat(formData.capacity),
          askingPrice: parseFloat(formData.askingPrice),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to register seller');
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        companyName: '',
        contactPerson: '',
        contactEmail: '',
        contactPhone: '',
        projectType: '',
        capacity: '',
        location: '',
        state: '',
        askingPrice: '',
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to register. Please try again or contact us.');
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
                  Verified Buyers • Quality Matches
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Connect Your Renewable
                <span className="text-primary block">Energy Projects</span>
                with Qualified Corporate Buyers
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Join India's trusted PPA marketplace. Get matched with 200+ corporate buyers actively seeking renewable energy solutions.
                <span className="text-primary font-semibold"> Grow your business with quality leads.</span>
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 mb-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Verified Buyers Only</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Free Listing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>No Hidden Fees</span>
                </div>
              </div>

              {/* CTA Button */}
              <a href="#seller-form">
                <Button size="lg" className="group text-lg px-8 py-6 h-auto">
                  List Your Project Now
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
                <div className="text-4xl font-bold text-primary mb-2">200+</div>
                <div className="text-sm text-muted-foreground">Active Buyers</div>
              </Card>
              <Card className="p-6 border-primary/20">
                <div className="text-4xl font-bold text-primary mb-2">500MW+</div>
                <div className="text-sm text-muted-foreground">Projects Listed</div>
              </Card>
              <Card className="p-6 border-primary/20">
                <div className="text-4xl font-bold text-primary mb-2">15 Days</div>
                <div className="text-sm text-muted-foreground">Avg. Time to Match</div>
              </Card>
              <Card className="p-6 border-primary/20">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Verified Buyers</div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why List Your Project with Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join India's most trusted renewable energy marketplace
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Users,
                title: 'Access Qualified Buyers',
                description: 'Connect with 200+ verified corporate buyers actively seeking renewable energy solutions. No cold calling needed.',
                highlight: 'Pre-qualified corporate leads'
              },
              {
                icon: Shield,
                title: 'Verified & Trusted',
                description: 'All buyers are verified corporate entities with real energy needs. We vet every registration to ensure quality.',
                highlight: '100% verified buyers'
              },
              {
                icon: TrendingUp,
                title: 'Faster Sales Cycle',
                description: 'Our curated matching connects you with buyers who match your project specs. Reduce sales cycle by 40-60%.',
                highlight: '15 days avg. time to match'
              },
              {
                icon: Zap,
                title: 'No Upfront Costs',
                description: 'List your projects completely free. Only pay when you successfully connect with buyers through our platform.',
                highlight: 'Zero listing fees'
              },
              {
                icon: Building2,
                title: 'Large Corporate Demand',
                description: 'Access IT parks, manufacturing units, data centers, and large commercial facilities actively seeking renewable energy.',
                highlight: '200+ corporate buyers'
              },
              {
                icon: CheckCircle2,
                title: 'Easy Project Management',
                description: 'Manage your listings, track buyer interest, and communicate directly with qualified leads through our platform.',
                highlight: 'Streamlined process'
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

      {/* Project Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              We Accept All Renewable Energy Projects
            </h2>
            <p className="text-xl text-muted-foreground">
              List your solar, wind, or hybrid projects and connect with buyers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sun,
                title: 'Solar Projects',
                description: 'On-site solar, ground-mounted, rooftop installations, solar parks',
                specs: ['10 MW - 500 MW', 'All locations', 'Grid-connected']
              },
              {
                icon: Wind,
                title: 'Wind Projects',
                description: 'Wind farms, wind-solar hybrid, standalone wind energy projects',
                specs: ['25 MW - 300 MW', 'Wind-rich states', 'Open access']
              },
              {
                icon: Zap,
                title: 'Hybrid Projects',
                description: 'Solar-wind hybrid, battery storage, renewable energy parks',
                specs: ['50 MW - 500 MW', 'Multi-technology', '24/7 Power']
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full p-8 border-primary/20 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-6">
                    <project.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-muted-foreground mb-6">{project.description}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {project.specs.map((spec, i) => (
                      <li key={i} className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {spec}
                      </li>
                    ))}
                  </ul>
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
              Simple 3-step process to connect with buyers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'List Your Project',
                description: 'Fill in your project details - capacity, location, pricing, and specifications. Takes 5 minutes.',
              },
              {
                step: '2',
                title: 'Get Matched',
                description: 'Our team reviews and matches your project with verified corporate buyers based on their requirements.',
              },
              {
                step: '3',
                title: 'Connect & Close',
                description: 'Buyers contact you directly. Negotiate terms and close deals faster with pre-qualified leads.',
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
                {index < 2 && (
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
      <section id="seller-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/20">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 md:p-12 border-primary/20 shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  List Your Project Today
                </h2>
                <p className="text-xl text-muted-foreground">
                  Join 100+ renewable energy projects already listed
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
                      placeholder="Solar Power Solutions Pvt Ltd"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      placeholder="Rajesh Kumar - CEO"
                      required
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      placeholder="contact@solarpower.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Contact Phone *</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="projectType">Project Type *</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => handleInputChange('projectType', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Project Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity (MW) *</Label>
                    <Input
                      id="capacity"
                      type="number"
                      step="0.1"
                      value={formData.capacity}
                      onChange={(e) => handleInputChange('capacity', e.target.value)}
                      placeholder="50"
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

                {/* Pricing */}
                <div>
                  <Label htmlFor="askingPrice">Asking Price (₹/kWh) *</Label>
                  <Input
                    id="askingPrice"
                    type="number"
                    step="0.01"
                    value={formData.askingPrice}
                    onChange={(e) => handleInputChange('askingPrice', e.target.value)}
                    placeholder="4.50"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Enter your preferred price per kWh unit
                  </p>
                </div>

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {errorMessage}
                  </div>
                )}

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    Thank you! Your project has been submitted. Our team will review and contact you within 2-3 business days.
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
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Project Listing
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  By submitting, you agree to our{' '}
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
            Questions About Listing?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our team is ready to help you get started
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

