import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Home from "./App.jsx";
import AboutPage from "./components/AboutPage";
import ServicesPage from "./components/ServicesPage";
import ServiceDetailPage from "./components/ServiceDetailPage";
import AIEmployeesPage from "./components/AIEmployeesPage";
import AIEmployeeDetailPage from "./components/AIEmployeeDetailPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import CookiePolicy from "./components/CookiePolicy";
import Disclaimer from "./components/Disclaimer";
import ContactPage from "./components/ContactPage";
import { AuthProvider } from "./admin/AuthContext";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import ProtectedRoute from "./admin/ProtectedRoute";
import NotFound from "./components/NotFound";
import useCopyGuard from "./components/useCopyGuard";
import BackToTop from "./components/BackToTop";
import ChatWidget from "./components/ChatWidget";
import { LoadingProvider } from "./context/LoadingProvider";
import { NavigationTransitionProvider } from "./context/NavigationTransition";

function CopyGuard() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  useCopyGuard(!isAdmin);
  useEffect(() => {
    document.documentElement.classList.toggle("allow-select", isAdmin);
  }, [isAdmin]);
  return null;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LoadingProvider>
          <NavigationTransitionProvider>
            <CopyGuard />
            <BackToTop />
            <ChatWidget />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/ai-employees" element={<AIEmployeesPage />} />
              <Route path="/ai-employees/:slug" element={<AIEmployeeDetailPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NavigationTransitionProvider>
        </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
