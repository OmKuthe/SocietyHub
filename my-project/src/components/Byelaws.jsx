// components/Byelaws.jsx - Light Theme Version
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Scale, 
  Car, 
  Wrench, 
  Users as UsersIcon,
  Home,
  Shield,
  FileText,
  Clock,
  CheckCircle
} from "lucide-react";

export default function Byelaws() {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const rules = [
    {
      category: "General Rules",
      icon: Home,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-900",
      items: [
        "Maintain cleanliness in common areas",
        "No loud music after 10 PM",
        "No pets in elevators without leash/muzzle",
        "Proper disposal of garbage"
      ]
    },
    {
      category: "Parking Rules",
      icon: Car,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-900",
      items: [
        "Park only in allocated slots",
        "No blocking of driveways",
        "Speed limit within premises - 10 km/h",
        "Two-wheeler parking in designated area only"
      ]
    },
    {
      category: "Maintenance Rules",
      icon: Wrench,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-900",
      items: [
        "Monthly maintenance must be paid before 10th",
        "No structural changes without permission",
        "Prior notice for plumbing/electrical work",
        "No drying clothes on balcony railings"
      ]
    },
    {
      category: "Visitor Rules",
      icon: UsersIcon,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-900",
      items: [
        "All visitors must be registered at gate",
        "No entry without approval after 11 PM",
        "Domestic help must have ID cards",
        "Contractors only allowed 9 AM - 6 PM"
      ]
    },
    {
      category: "Amenities Rules",
      icon: Shield,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-900",
      items: [
        "Clubhouse booking required in advance",
        "Gym timings: 6 AM - 10 PM",
        "Swimming pool rules: Shower before entry",
        "No parties on terrace after 8 PM"
      ]
    },
    {
      category: "Safety & Security",
      icon: Shield,
      color: "from-rose-500 to-red-500",
      bgColor: "bg-rose-50",
      textColor: "text-rose-900",
      items: [
        "Keep main door locked at all times",
        "Report suspicious activity immediately",
        "No storage of hazardous materials",
        "Fire safety drills mandatory"
      ]
    }
  ];

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <section id="byelaws" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-4">
            <Scale className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-700">Society Guidelines</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Society Bye-Laws
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Know the rules and regulations that keep our community safe, harmonious, and well-maintained
          </p>
        </motion.div>

        {/* Rules Grid - Full width single column */}
        <div className="max-w-4xl mx-auto space-y-6">
          {rules.map((section, idx) => {
            const Icon = section.icon;
            const isExpanded = expandedCategory === section.category;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'shadow-xl' : 'hover:shadow-md'
                }`}
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(section.category)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${section.color} transition-transform group-hover:scale-110 duration-300 shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {section.category}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {section.items.length} regulations
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>

                {/* Category Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="border-t border-gray-100"
                    >
                      <div className="p-6">
                        <div className="space-y-3">
                          {section.items.map((rule, ruleIdx) => (
                            <motion.div
                              key={ruleIdx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: ruleIdx * 0.05 }}
                              className={`${section.bgColor} rounded-xl p-3 hover:bg-opacity-80 transition-all duration-300`}
                            >
                              <div className="flex items-center gap-3">
                                <CheckCircle className={`w-4 h-4 text-blue-500 flex-shrink-0`} />
                                <p className={`${section.textColor} text-sm md:text-base font-medium`}>
                                  {rule}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Important Notice - Light Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-4xl mx-auto bg-blue-50 rounded-2xl p-6 border border-blue-100"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-xl">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-gray-800 font-semibold mb-2">Important Notice</h4>
              <p className="text-gray-600 text-sm">
                These bye-laws are subject to periodic review and updates by the managing committee. 
                Residents will be notified of any changes 30 days in advance. For complete details, 
                please refer to the official society handbook or contact the society office.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats - Light Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Rules", value: "24", icon: FileText, color: "text-blue-600" },
            { label: "Categories", value: "6", icon: Scale, color: "text-emerald-600" },
            { label: "Last Updated", value: "Jan 2024", icon: Clock, color: "text-purple-600" },
            { label: "Compliance Rate", value: "94%", icon: CheckCircle, color: "text-green-600" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <Icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}