import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardLayout from "./components/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import Complaints from "./pages/Complaints";
import Notices from "./pages/Notices";
import Visitors from "./pages/Visitors";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Landing Page without Dashboard Layout */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Protected Routes - With Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/visitors" element={<Visitors />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;