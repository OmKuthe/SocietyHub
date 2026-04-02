// pages/LandingPage.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  Users, 
  Smartphone,
  ChevronRight,
  Menu,
  X,
  ArrowRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import About from "../components/About";
import Contact from "../components/Contact";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: CreditCard,
      title: "Smart Billing",
      description: "Automated monthly billing, online payments, and detailed expense tracking",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageSquare,
      title: "Complaint Management",
      description: "Raise and track complaints in real-time with automatic escalation",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Visitor Management",
      description: "Secure visitor check-in/out with pre-approval system",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Bell,
      title: "Instant Notices",
      description: "Push notifications for important updates and events",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Connect with neighbors, organize events, and build community",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Fully responsive design that works on all devices",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">SH</span>
              </div>
              <span className="text-xl font-bold text-white">
                SocietyHub
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection("hero")} className="text-white/80 hover:text-white transition-colors">Home</button>
              <button onClick={() => scrollToSection("about")} className="text-white/80 hover:text-white transition-colors">About</button>
              <button onClick={() => scrollToSection("features")} className="text-white/80 hover:text-white transition-colors">Features</button>
              <button onClick={() => scrollToSection("contact")} className="text-white/80 hover:text-white transition-colors">Contact</button>
              <Link 
                to="/dashboard" 
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 flex flex-col gap-3"
            >
              <button onClick={() => scrollToSection("hero")} className="text-white/80 hover:text-white py-2 text-left">Home</button>
              <button onClick={() => scrollToSection("about")} className="text-white/80 hover:text-white py-2 text-left">About</button>
              <button onClick={() => scrollToSection("features")} className="text-white/80 hover:text-white py-2 text-left">Features</button>
              <button onClick={() => scrollToSection("contact")} className="text-white/80 hover:text-white py-2 text-left">Contact</button>
              <Link to="/dashboard" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-center">
                Get Started
              </Link>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div id="hero">
        <Hero />
      </div>

      {/* About Section */}
      <About />

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Everything You Need
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/70 max-w-2xl mx-auto"
            >
              Powerful tools to streamline operations, enhance communication, 
              and build a stronger community
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:-translate-y-2"
                >
                  <div className={`bg-gradient-to-br ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                <span className="text-xl font-bold text-white">SocietyHub</span>
              </div>
              <p className="text-white/60">Making community living better, one society at a time.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-white/60">
                <li><button onClick={() => scrollToSection("features")} className="hover:text-white transition-colors">Features</button></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-white/60">
                <li><button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/60">
            <p>&copy; 2024 SocietyHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}