import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Shield, Users } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Suvarna Capital Advisors LLP Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-bold">Suvarna Capital Advisors LLP</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Renewable energy-focused investment advisory firm helping corporates achieve their sustainability goals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-sm text-muted-foreground hover:text-primary">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">On-Site Solar</li>
              <li className="text-sm text-muted-foreground">Off-Site Renewable Energy</li>
              <li className="text-sm text-muted-foreground">M&A Advisory</li>
              <li className="text-sm text-muted-foreground">Capital Raising</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  RS No.45, Plot No. 24, Sri Laxmi Nivas<br />
                  2nd Cross, Jaynagar, Saptapur<br />
                  Dharwad 580001, Karnataka, India
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+919886490099" className="text-sm text-muted-foreground hover:text-primary">
                  +91 98864 90099
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@suvarnacapital.com" className="text-sm text-muted-foreground hover:text-primary">
                  info@suvarnacapital.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Access Links Section */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Link 
              to="/admin/login" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Shield className="h-4 w-4" />
              <span>Admin Login</span>
            </Link>
            <span className="hidden md:inline text-muted-foreground">|</span>
            <Link 
              to="/employee/login" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Employee Login</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Suvarna Capital Advisors LLP. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/code-of-conduct" className="text-sm text-muted-foreground hover:text-primary">
                Code of Conduct
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link to="/anti-bribery-policy" className="text-sm text-muted-foreground hover:text-primary">
                Anti-Bribery Policy
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link to="/disclaimer" className="text-sm text-muted-foreground hover:text-primary">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;