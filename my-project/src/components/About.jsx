// components/About.jsx
import { motion } from "framer-motion";
import { Award, Heart, Globe, Users2, TrendingUp, Clock, Shield } from "lucide-react";

const stats = [
  { icon: Award, value: "5+", label: "Years of Excellence" },
  { icon: Users2, value: "500+", label: "Happy Societies" },
  { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
  { icon: Clock, value: "24/7", label: "Support Available" },
];

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "Building stronger communities through technology and connection",
  },
  {
    icon: Globe,
    title: "Innovation Driven",
    description: "Constantly evolving to meet modern society needs",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Bank-grade security for all your society data",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About SocietyHub
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to revolutionize how residential societies operate, 
            making community living seamless, transparent, and enjoyable for everyone.
          </p>
        </motion.div>

        {/* Stats Grid - Light Theme */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Values Section - Light Theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Mission Statement - Light Theme */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-1 shadow-xl"
        >
          <div className="relative bg-white rounded-3xl p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Our Mission
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To empower residential societies with cutting-edge technology that simplifies 
              management, enhances security, and fosters genuine community connections.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}