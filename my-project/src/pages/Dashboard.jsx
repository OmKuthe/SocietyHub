import { motion } from 'framer-motion';
import { 
  Users, 
  CreditCard, 
  AlertTriangle, 
  Bell, 
  TrendingUp, 
  Calendar,
  Home,
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Building2,
  DollarSign
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  // Stats data with better maintainability
  const stats = [
    {
      title: "Total Residents",
      value: "120",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      trend: "+12%",
      trendUp: true,
      detail: "12 new this month"
    },
    {
      title: "Pending Payments",
      value: "₹45,000",
      icon: CreditCard,
      color: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      trend: "Due this month",
      trendUp: false,
      detail: "8 units pending"
    },
    {
      title: "Active Complaints",
      value: "8",
      icon: AlertTriangle,
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      trend: "3 resolved",
      trendUp: true,
      detail: "Average resolution: 2 days"
    },
    {
      title: "New Notices",
      value: "5",
      icon: Bell,
      color: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      trend: "This week",
      trendUp: true,
      detail: "2 urgent"
    }
  ];

  // Recent activity data with improved structure
  const activities = [
    { 
      id: 1, 
      title: "Maintenance payment received", 
      time: "2 hours ago", 
      amount: "₹5,200", 
      status: "completed",
      unit: "A-304",
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    { 
      id: 2, 
      title: "New complaint registered", 
      time: "5 hours ago", 
      unit: "A-304", 
      status: "pending",
      complaintId: "CMP-123",
      icon: AlertTriangle,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    { 
      id: 3, 
      title: "Annual society meeting", 
      time: "Yesterday", 
      status: "upcoming",
      location: "Club House",
      icon: Calendar,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    { 
      id: 4, 
      title: "Visitor pass approved", 
      time: "Yesterday", 
      unit: "B-102", 
      status: "completed",
      visitorName: "Ramesh Kumar",
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: 5,
      title: "Water supply maintenance",
      time: "3 hours ago",
      status: "warning",
      description: "Scheduled for tomorrow 10 AM - 2 PM",
      icon: Clock,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600"
    }
  ];

  // Upcoming events with more details
  const events = [
    { 
      title: "Society Meeting", 
      date: "April 15, 2024", 
      time: "6:00 PM", 
      location: "Club House",
      attendees: 45,
      status: "upcoming"
    },
    { 
      title: "Maintenance Drive", 
      date: "April 20, 2024", 
      time: "9:00 AM", 
      location: "Parking Area",
      attendees: 12,
      status: "upcoming"
    },
    { 
      title: "Cultural Event", 
      date: "April 25, 2024", 
      time: "7:00 PM", 
      location: "Community Hall",
      attendees: 89,
      status: "upcoming"
    }
  ];

  // Chart data for visual representation
  const paymentTrends = [
    { month: "Jan", amount: 32000 },
    { month: "Feb", amount: 35000 },
    { month: "Mar", amount: 38000 },
    { month: "Apr", amount: 42000 },
    { month: "May", amount: 45000 },
    { month: "Jun", amount: 48000 }
  ];

  const maxAmount = Math.max(...paymentTrends.map(p => p.amount));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 md:p-8 max-w-7xl mx-auto"
    >
      {/* Header Section with improved layout */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Welcome back! Here's what's happening in your society today.
            </p>
          </div>
          
          <div className="flex gap-3">
            {/* Time Range Selector */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              {['day', 'week', 'month'].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedTimeRange === range
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Generate Report
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid with improved cards */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  {stat.trendUp !== undefined && (
                    <span className={`text-sm font-medium ${stat.trendUp ? 'text-green-600' : 'text-orange-600'}`}>
                      {stat.trend}
                    </span>
                  )}
                  {stat.trendUp && <ArrowUpRight className="w-4 h-4 text-green-600" />}
                </div>
              </div>
              
              <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
              <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
              
              {/* Additional Detail */}
              <p className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {stat.detail}
              </p>
            </div>
            
            {/* Hover Border Effect */}
            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Payment Trends Chart */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Payment Trends</h2>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {paymentTrends.map((item, idx) => (
              <div key={item.month} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.month}</span>
                  <span className="font-semibold text-gray-800">₹{item.amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.amount / maxAmount) * 100}%` }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity - Enhanced */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
            <Link to="/activity" className="text-blue-600 text-sm hover:text-blue-700 transition-colors flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {activities.map((activity, idx) => {
              const IconComponent = activity.icon;
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`${activity.iconBg} rounded-full p-2`}>
                      <IconComponent className={`w-4 h-4 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors text-sm">
                        {activity.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{activity.time}</span>
                        {activity.unit && <span>• Unit {activity.unit}</span>}
                        {activity.complaintId && <span>• ID: {activity.complaintId}</span>}
                        {activity.location && <span>• {activity.location}</span>}
                      </div>
                    </div>
                  </div>
                  {activity.amount && (
                    <span className="font-semibold text-gray-700 text-sm">{activity.amount}</span>
                  )}
                  {activity.status === 'pending' && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Upcoming Events and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Upcoming Events - Enhanced */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <h2 className="text-xl font-bold">Upcoming Events</h2>
            </div>
            <Building2 className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {events.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="border-b border-gray-700 last:border-0 pb-3 last:pb-0 hover:bg-white/5 transition-colors rounded-lg p-2"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium">{event.title}</p>
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full">
                    {event.attendees} attending
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </span>
                  <span>•</span>
                  <span>{event.time}</span>
                  <span>•</span>
                  <span>{event.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            View Full Calendar
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">Society Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Total Units</p>
              <p className="text-2xl font-bold text-gray-800">128</p>
              <p className="text-xs text-green-600 mt-2">+2 this year</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Occupancy Rate</p>
              <p className="text-2xl font-bold text-gray-800">94%</p>
              <p className="text-xs text-green-600 mt-2">120/128 units</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Monthly Collection</p>
              <p className="text-2xl font-bold text-gray-800">₹4.2L</p>
              <p className="text-xs text-green-600 mt-2">Target: ₹4.5L</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Staff Members</p>
              <p className="text-2xl font-bold text-gray-800">24</p>
              <p className="text-xs text-blue-600 mt-2">Security: 8</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions - Enhanced */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { icon: Home, label: "Pay Maintenance", color: "from-blue-500 to-cyan-500", path: "/billing", description: "Due this month" },
          { icon: AlertTriangle, label: "Raise Complaint", color: "from-orange-500 to-red-500", path: "/complaints", description: "24/7 support" },
          { icon: Users, label: "Book Facility", color: "from-purple-500 to-pink-500", path: "/facilities", description: "Club, Gym, Pool" },
          { icon: Bell, label: "View Notices", color: "from-emerald-500 to-teal-500", path: "/notices", description: "5 new" }
        ].map((action, idx) => (
          <Link to={action.path} key={idx}>
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-4 bg-gradient-to-r ${action.color} rounded-xl shadow-lg hover:shadow-xl transition-all group`}
            >
              <action.icon className="w-6 h-6 text-white mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-white text-sm font-medium">{action.label}</p>
              <p className="text-white/70 text-xs mt-1">{action.description}</p>
            </motion.button>
          </Link>
        ))}
      </motion.div>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </motion.div>
  );
}