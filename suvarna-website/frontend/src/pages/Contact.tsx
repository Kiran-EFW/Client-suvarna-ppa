import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get in touch with our team to discuss your renewable energy needs
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {[
          {
            icon: MapPin,
            title: 'Registered Office',
            content: (
              <>
                RS No.45, Plot No. 24, Sri Laxmi Nivas<br />
                2nd Cross, Jaynagar, Saptapur<br />
                Dharwad 580001, Karnataka, India
              </>
            ),
          },
          {
            icon: Phone,
            title: 'Phone',
            content: (
              <>
                <a href="tel:+919886490099" className="text-primary hover:underline">
                  +91 98864 90099
                </a>
              </>
            ),
          },
          {
            icon: Mail,
            title: 'Email',
            content: (
              <>
                <a href="mailto:info@suvarnacapital.com" className="text-primary hover:underline">
                  info@suvarnacapital.com
                </a>
              </>
            ),
          },
        ].map((contact, index) => (
          <motion.div
            key={contact.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
              <contact.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{contact.title}</h3>
            <p className="text-muted-foreground">{contact.content}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <LeadCaptureForm />
      </motion.div>
    </div>
  );
};

export default Contact;
