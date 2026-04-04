import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Moon,
  Sun,
  Menu,
  X,
  Home,
  Calendar,
  Mail,
  CheckCircle,
  AlertCircle,
  LayoutDashboard,
  CreditCard,
  MessageSquare,
  Megaphone,
  Users,
  FileText
} from "lucide-react";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const location = useLocation();

  // Get current page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
      case "/dashboard":
        return "Dashboard";
      case "/billing":
        return "Billing";
      case "/complaints":
        return "Complaints";
      case "/notices":
        return "Notices";
      case "/visitors":
        return "Visitors";
      case "/profile":
        return "My Profile";
      case "/settings":
        return "Settings";
      case "/byelaws":
      return "Bye-Laws";
      default:
        return "Dashboard";
    }
  };

  // Get page icon based on route
  const getPageIcon = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
      case "/dashboard":
        return <LayoutDashboard className="w-5 h-5 text-blue-500" />;
      case "/billing":
        return <CreditCard className="w-5 h-5 text-emerald-500" />;
      case "/complaints":
        return <MessageSquare className="w-5 h-5 text-purple-500" />;
      case "/notices":
        return <Megaphone className="w-5 h-5 text-orange-500" />;
      case "/visitors":
        return <Users className="w-5 h-5 text-pink-500" />;
      case "/byelaws":
        return <FileText className="w-5 h-5 text-indigo-500" />;
      default:
        return <LayoutDashboard className="w-5 h-5 text-blue-500" />;
    }
  };

  // Get page description based on route
  const getPageDescription = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
      case "/dashboard":
        return "Welcome back, John • Here's your society overview";
      case "/billing":
        return "Manage payments and view transaction history";
      case "/complaints":
        return "Track and manage resident complaints";
      case "/notices":
        return "View and manage society announcements";
      case "/visitors":
        return "Manage visitor entries and approvals";
      case "/byelaws":
        return "View society rules, policies, and compliance guidelines";
      default:
        return "Welcome back, John • Here's your society overview";
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "Maintenance Fee Due",
      message: "Your monthly maintenance fee of ₹3,500 is due by March 20",
      time: "2 hours ago",
      read: false,
      type: "warning",
      icon: AlertCircle,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      id: 2,
      title: "Complaint Resolved",
      message: "Your complaint #C-123 has been resolved successfully",
      time: "5 hours ago",
      read: false,
      type: "success",
      icon: CheckCircle,
      iconColor: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      title: "Committee Meeting",
      message: "Annual General Meeting scheduled for March 25 at 5 PM",
      time: "1 day ago",
      read: true,
      type: "info",
      icon: Calendar,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      id: 4,
      title: "New Notice Posted",
      message: "Water supply will be suspended on March 22 from 10 AM to 2 PM",
      time: "2 days ago",
      read: true,
      type: "info",
      icon: Mail,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50"
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left Section - Page Title & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            {/* Page Title with Dynamic Content */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl items-center justify-center">
                {getPageIcon()}
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {getPageTitle()}
                </h1>
                <p className="text-xs text-gray-500 hidden md:block">
                  {getPageDescription()}
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Search in ${getPageTitle()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 relative group"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-gray-600 group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 group-hover:rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                      {unreadCount > 0 && (
                        <button className="text-xs text-blue-600 hover:text-blue-700">
                          Mark all as read
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => {
                      const Icon = notification.icon;
                      return (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                            !notification.read ? 'bg-blue-50/30' : ''
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className={`${notification.bgColor} rounded-xl p-2 h-fit`}>
                              <Icon className={`w-4 h-4 ${notification.iconColor}`} />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800 mb-1">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-600 mb-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="p-3 border-t border-gray-100">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown - Single source of truth for user data */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-800">John Doe</p>
                  <p className="text-xs text-gray-500">Resident • 4B</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">John Doe</p>
                    <p className="text-xs text-gray-500">john.doe@example.com</p>
                    <p className="text-xs text-gray-500 mt-1">Apartment 4B, Tower A</p>
                  </div>
                  
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <Link
                      to="/my-apartment"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Home className="w-4 h-4" />
                      My Apartment
                    </Link>
                  </div>
                  
                  <div className="border-t border-gray-100 py-2">
                    <button className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${getPageTitle()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg py-4 px-6 space-y-3">
            <Link to="/dashboard" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
            <Link to="/billing" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Billing</Link>
            <Link to="/complaints" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Complaints</Link>
            <Link to="/notices" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Notices</Link>
            <Link to="/visitors" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Visitors</Link>
            </div>
        )}
      </div>
    </nav>
  );
}