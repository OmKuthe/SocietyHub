import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  CreditCard, 
  MessageSquare, 
  Megaphone, 
  Users,
  Home,
  ChevronLeft,
  ChevronRight,
  FileText,
  Building2
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/billing", icon: CreditCard, label: "Billing" },
    { path: "/complaints", icon: MessageSquare, label: "Complaints" },
    { path: "/notices", icon: Megaphone, label: "Notices" },
    { path: "/visitors", icon: Users, label: "Visitors" },
  ];

  return (
    <>
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed left-64 z-50 top-20 -ml-3 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
        style={{ left: isCollapsed ? "80px" : "256px" }}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      <div 
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-xl transition-all duration-300 ease-in-out flex flex-col h-screen sticky top-0`}
      >
        {/* Logo Section */}
        <div className={`p-6 border-b border-gray-100 ${isCollapsed ? "px-4" : ""}`}>
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  SocietyHub
                </h1>
                <p className="text-xs text-gray-500">Premium Living</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Home className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-sm" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"}`} />
                {!isCollapsed && (
                  <span className={`font-medium ${isActive ? "text-blue-600" : ""}`}>
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Section - Removed duplicate user info, only showing society info */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-100">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
              <p className="text-xs text-blue-600 mb-2 font-semibold">Greenfield Society</p>
              <p className="text-xs text-gray-600">Total Units: 128</p>
              <p className="text-xs text-gray-600">Occupancy: 94%</p>
            </div>
          </div>
        )}
        
        {isCollapsed && (
          <div className="p-4 border-t border-gray-100">
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full flex items-center justify-center">
                <Building2 className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}