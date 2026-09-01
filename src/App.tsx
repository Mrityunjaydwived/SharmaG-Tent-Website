import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AdminLayout } from './components/layout/AdminLayout';
import { dataService } from './lib/dataService';
import { BusinessSettings } from './types';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Story } from './pages/Story';
import { Services } from './pages/Services';
import { Events } from './pages/Events';
import { Location } from './pages/Location';
import { Contact } from './pages/Contact';
import { Quote } from './pages/Quote';
import { ShubhMuhurat } from './pages/ShubhMuhurat';
import { VedicPanchangamPage } from './pages/VedicPanchangamPage';
import { CalculatorNotesPage } from './pages/CalculatorNotesPage';

// Admin CMS Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { EnquiryManager } from './pages/admin/EnquiryManager';
import { GalleryManager } from './pages/admin/GalleryManager';
import { EventsManager } from './pages/admin/EventsManager';
import { ServicesManager } from './pages/admin/ServicesManager';
import { TestimonialsManager } from './pages/admin/TestimonialsManager';
import { SettingsManager } from './pages/admin/SettingsManager';

import { CustomCursor } from './components/ui/CustomCursor';
import { ParticleBackground } from './components/ui/ParticleBackground';

// Scroll to top helper on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout wrapper that hides public navbar & footer on /admin routes
const PublicShell: React.FC<{ children: React.ReactNode; settings: BusinessSettings }> = ({
  children,
  settings,
}) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  // Determine page-specific ambient particle mood
  const getParticleMood = () => {
    if (location.pathname.includes('events')) return 'party';
    if (location.pathname.includes('about')) return 'wedding';
    if (location.pathname.includes('services')) return 'corporate';
    return 'default';
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111827] relative selection:bg-[#1F74BA] selection:text-white">
      <CustomCursor />
      <ParticleBackground intensity={getParticleMood()} />
      <Navbar settings={settings} />
      <main className="flex-1 bg-white relative z-10">{children}</main>
      <Footer settings={settings} />
    </div>
  );
};

export function App() {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);

  useEffect(() => {
    dataService.getSettings().then(setSettings);
  }, []);

  if (!settings) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-[#1F74BA] border-t-transparent animate-spin" />
          <span className="text-xs uppercase tracking-widest text-[#1F74BA] font-bold">
            SharmaG Tent House
          </span>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <PublicShell settings={settings}>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/story" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/events" element={<Services />} />
          <Route path="/location" element={<Location />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/muhurat" element={<ShubhMuhurat />} />
          <Route path="/calendar" element={<ShubhMuhurat />} />
          <Route path="/panchang" element={<ShubhMuhurat />} />
          <Route path="/panchangam" element={<ShubhMuhurat />} />
          <Route path="/tools" element={<CalculatorNotesPage />} />
          <Route path="/calculator" element={<CalculatorNotesPage />} />
          <Route path="/notes" element={<CalculatorNotesPage />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin CMS Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="enquiries" element={<EnquiryManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="events" element={<EventsManager />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Route>
        </Routes>
      </PublicShell>
    </BrowserRouter>
  );
}

export default App;

