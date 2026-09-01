import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Inbox, 
  Image as GalleryIcon, 
  Calendar, 
  Layers, 
  MessageSquareQuote, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Crown,
  Database,
  Menu,
  X
} from 'lucide-react';

import { Logo } from '../ui/Logo';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const isAuthed = localStorage.getItem('sharmag_admin_auth');
    if (!isAuthed && location.pathname !== '/admin/login') {
      navigate('/admin/login');
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('sharmag_admin_auth');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'डैशबोर्ड (Dashboard)', path: '/admin', icon: LayoutDashboard },
    { label: 'पूछताछ व CRM (Enquiries)', path: '/admin/enquiries', icon: Inbox },
    { label: 'सेवा व कार्ड प्रबंधक (Services)', path: '/admin/services', icon: Layers },
    { label: 'गैलरी स्टूडियो (Gallery)', path: '/admin/gallery', icon: GalleryIcon },
    { label: 'ग्राहक समीक्षाएं (Testimonials)', path: '/admin/testimonials', icon: MessageSquareQuote },
    { label: 'व्यापार सेटिंग्स (Settings)', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex flex-col md:flex-row">
      {/* Mobile Admin Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <Logo size="sm" />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg bg-gray-100 border border-gray-200 text-[#111827]"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#1F74BA]" />}
        </button>
      </div>

      {/* Sidebar - Pure White & Clean Slate */}
      <aside
        className={`w-full md:w-64 bg-white border-r border-gray-200 flex flex-col justify-between shrink-0 p-5 shadow-sm ${
          mobileOpen ? 'block' : 'hidden md:flex'
        }`}
      >
        <div>
          {/* Logo & Status */}
          <div className="hidden md:flex items-center gap-3 pb-5 border-b border-gray-100">
            <Logo size="sm" />
          </div>

          {/* Storage status pill */}
          <div className="my-4 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-amber-50/40 to-blue-50/80 border border-[#1F74BA]/20 flex items-center justify-between text-xs shadow-2xs">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-gray-800 font-extrabold text-[11px]">
                लोकल स्टोरेज सक्रिय
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1F74BA] to-[#0B4F8A] text-white shadow-md shadow-blue-500/20 scale-102'
                      : 'text-gray-700 hover:text-[#1F74BA] hover:bg-blue-50/70 hover:scale-101'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#1F74BA]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-gray-100 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-gray-700 hover:text-[#1F74BA] hover:bg-blue-50/60 transition-all hover:scale-101"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#1F74BA]" />
              लाइव वेबसाइट देखें
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-200 px-1.5 py-0.5 rounded font-extrabold">Live</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-red-600 hover:text-red-700 hover:bg-red-50 transition font-bold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>लॉगआउट (Sign Out)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-5 md:p-8 overflow-y-auto max-h-screen bg-white">
        <Outlet />
      </main>
    </div>
  );
};
