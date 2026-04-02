import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import Hero from "./Hero";

export default function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100/80">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8 max-w-7xl">
            {/* Show carousel only on homepage */}
            {isHomePage && (
              <div className="mb-8">
                <Hero />
              </div>
            )}
            
            {/* Regular content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}