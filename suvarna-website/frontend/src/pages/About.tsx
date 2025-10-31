import { motion } from 'framer-motion';
import { Target, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8">About Us</h1>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Suvarna Capital Limited is a renewable energy-focused investment advisory firm based in India.
            Our services include private equity capital raising, structured finance and M&A advisory to
            mid-market independent power producers operating in the Indian renewable energy sector.
          </p>

          <p className="text-lg text-muted-foreground">
            Suvarna Capital Limited is active in the renewable energy operating asset acquisition space
            in India having successfully advised clients on a number of transactions this year. The firm
            is currently running mandates for wind and solar power assets in Karnataka, Maharashtra,
            Gujarat, Rajasthan and Tamil Nadu relying heavily upon its ability to run an efficient and
            competitive process by leveraging a robust network of investors and operating renewable energy
            asset buyers across the globe.
          </p>

          <p className="text-lg text-muted-foreground">
            Suvarna Capital Advisors LLP, a Limited Liability Partnership firm, [LLP IN: AAK-3567] is registered pursuant to section 58 (1) of the LLP Act of 2008.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              items: [
                'Making Renewable energy accessible',
                'Enabling corporates to meet their RE100 goal',
                'Addressing the global imperative to tackle global warming and Climate Change',
                'Powering towards Sustainability',
              ],
            },
            {
              icon: Award,
              title: 'Excellence',
              description: 'Our business excellence and strength lie in process diligence, access to sophisticated sources of capital and technology, renewable energy market acumen, niche focus and robust execution capabilities.',
            },
            {
              icon: Users,
              title: 'Putting Clients First',
              description: 'Our core value of integrity lies in putting our clients first, building long-lasting relationships with them based on absolute trust and delivering objectives and outcomes on time.',
            },
          ].map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="p-6 rounded-lg border bg-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <section.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
              {section.items ? (
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-muted-foreground flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">{section.description}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 p-8 bg-primary/5 border-l-4 border-primary rounded-lg"
        >
          <blockquote className="text-lg italic text-muted-foreground">
            "Energy is central to nearly every major challenge and opportunity the world faces today. 
            Be it for jobs, security, climate change, food production or increasing incomes, access to 
            energy for all is essential. Transitioning the global economy towards clean and sustainable 
            sources of energy is one of our greatest challenges in the coming decades. Sustainable energy 
            is an opportunity – it transforms lives, economies and the planet."
          </blockquote>
          <p className="mt-4 text-sm font-semibold">— Sustainable Development Goal 7</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
