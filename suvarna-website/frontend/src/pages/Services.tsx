import { motion } from 'framer-motion';
import { Sun, Wind, TrendingUp, Check } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Sun,
      title: 'On-Site Solar (Rooftop and Ground-mounted)',
      description: 'We have teamed up with world class On-Site Solar power developers in India to provide renewable energy solutions.',
      features: [
        'Zero Capital investment',
        'Zero effort',
        'Zero Maintenance Costs',
        'Guaranteed Savings from Day 1',
      ],
    },
    {
      icon: Wind,
      title: 'Off-Site Renewable Energy',
      description: 'Through open access route we bring renewable energy to you from a distant solar or wind park.',
      features: [
        'Sourcing from solar or wind parks',
        'Larger capacity generation',
        'Meeting majority power consumption',
        'Scalable solutions',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Mergers & Acquisitions',
      description: 'We take up mandates for Mergers & Acquisitions of renewable energy assets on both buy and sell side.',
      features: [
        'Wind & Solar asset acquisition',
        'Complete transaction advisory',
        'Due diligence and valuation',
        'End-to-end support',
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Comprehensive renewable energy solutions to help your business achieve its sustainability goals
        </p>
      </motion.div>

      <div className="space-y-12">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground mb-6 text-lg">
                    {service.description}
                  </p>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Renewable Energy Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img
                src="/images/solar-project.jpg"
                alt="Large-Scale Solar Installation"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Large-Scale Solar Installation</h3>
              <p className="text-sm text-muted-foreground">100 MW solar power plant delivering clean energy to industrial users</p>
            </div>
          </div>
          <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img
                src="/images/wind-farm.jpg"
                alt="Onshore Wind Farm"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Onshore Wind Farm</h3>
              <p className="text-sm text-muted-foreground">50 MW wind energy facility providing sustainable power solutions</p>
            </div>
          </div>
          <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img
                src="/images/rooftop-solar.jpg"
                alt="Commercial Rooftop Installation"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Commercial Rooftop Installation</h3>
              <p className="text-sm text-muted-foreground">Zero-investment solar solutions for corporate buildings</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-20 bg-primary/5 rounded-lg p-8 border"
      >
        <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Guaranteed Savings</h3>
            <p className="text-muted-foreground">
              Lower electricity bill from day 1 owing to lower tariff per unit of electricity
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Zero Investment</h3>
            <p className="text-muted-foreground">
              No investment required from your end with no technical or financial risk
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Hassle-free</h3>
            <p className="text-muted-foreground">
              Hassle-free maintenance of the plant with full support from our team
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Services;
