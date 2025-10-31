import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

const Team = () => {
  const teamMember = {
    name: 'Prashant Basanagoudar',
    role: 'Managing Director',
    image: null, // Placeholder - will be replaced with actual image
    bio: 'Prashant is the Founder and Managing Director of Suvarna Capital Limited.',
    qualifications: [
      {
        icon: GraduationCap,
        title: 'MSc in International Securities, Investment & Banking',
        institution: 'ICMA Centre, University of Reading, Henley Business School, United Kingdom',
      },
      {
        icon: Award,
        title: 'Fellow',
        institution: 'Chartered Institute of Securities & Investment (CISI)',
      },
      {
        icon: Briefcase,
        title: 'Member',
        institution: 'Worshipful Company of International Bankers (WCIB)',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Meet the leadership team driving renewable energy transformation in India
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-card border rounded-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image Placeholder */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="h-48 w-48 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">
                  {teamMember.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{teamMember.name}</h2>
              <p className="text-xl text-primary mb-6">{teamMember.role}</p>
              <p className="text-muted-foreground mb-8">
                {teamMember.bio}
              </p>

              <div className="space-y-4">
                {teamMember.qualifications.map((qual, index) => (
                  <motion.div
                    key={qual.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                      <qual.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{qual.title}</h3>
                      <p className="text-sm text-muted-foreground">{qual.institution}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Team;
