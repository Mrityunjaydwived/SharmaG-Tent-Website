import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Crown, Sparkles, PhoneCall } from 'lucide-react';
import { BusinessSettings } from '../../types';

import { Logo } from '../ui/Logo';

interface NavbarProps {
  settings: BusinessSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', hindi: 'होम', path: '/' },
    { name: 'About', hindi: 'परिचय', path: '/about' },
    { name: 'Services', hindi: 'सुविधाएं', path: '/services' },
    { name: 'Panchangam', hindi: 'पंचांग व गुण मिलान', path: '/panchang', isSpecial: true },
    { name: 'Tools', hindi: 'कैलकुलेटर व नोट्स', path: '/tools', isTool: true },
    { name: 'Location', hindi: 'लोकेशन', path: '/location' },
    { name: 'Contact', hindi: 'संपर्क', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-2.5 shadow-md'
          : 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-3'
      }`}
    >
      <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-2 lg:gap-4">
        {/* Brand Logo with Custom Royal Crest (Anchored Left) */}
        <Link to="/" className="group shrink-0 flex items-center">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation Links (Centered / Distributed with no wrap) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-xl text-xs xl:text-[13px] 2xl:text-sm font-extrabold transition-all duration-300 group flex items-center gap-1 xl:gap-1.5 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#1F74BA] bg-blue-50/80 shadow-xs'
                    : link.isSpecial
                    ? 'text-amber-900 bg-amber-50/70 border border-amber-200 hover:bg-amber-100/80'
                    : link.isTool
                    ? 'text-[#1F74BA] bg-blue-50/60 border border-blue-200 hover:bg-blue-100/80'
                    : 'text-gray-700 hover:text-[#1F74BA] hover:bg-blue-50/40'
                }`}
              >
                {link.isSpecial && <span className="text-xs">🪷</span>}
                {link.isTool && <span className="text-xs">🧮</span>}
                <span>{link.name === 'Panchangam' ? 'पंचांग व गुण मिलान' : link.name === 'Tools' ? 'कैलकुलेटर व नोट्स' : link.name}</span>
                {/* Animated underline */}
                <span
                  className={`absolute bottom-1 left-2.5 right-2.5 h-0.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#1F74BA] scale-x-100'
                      : 'bg-[#F8D706] scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA Button & Call Helpline (Anchored Right) */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0 whitespace-nowrap">
          <a
            href="tel:9229903308"
            className="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-[#1F74BA]/20 text-[#1F74BA] font-extrabold text-xs flex items-center gap-1.5 transition shadow-2xs shrink-0"
            title="कॉल करें: +91 9229903308"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#1F74BA]" />
            <span>+91 9229903308</span>
          </a>
          <Link
            to="/quote"
            className="relative group overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFE234] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Get a Quote</span>
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            to="/quote"
            className="px-3 py-1.5 rounded-lg bg-[#F8D706] text-black font-extrabold text-xs shadow-sm"
          >
            Quote
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#1F74BA]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-white border-b border-gray-200 px-6 py-6 shadow-xl flex flex-col gap-2 max-h-[85vh] overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2.5 rounded-xl text-sm font-extrabold transition flex items-center justify-between ${
                  isActive
                    ? 'text-[#1F74BA] bg-blue-50 font-bold'
                    : link.isSpecial
                    ? 'text-amber-950 bg-amber-50/80 border border-amber-200'
                    : link.isTool
                    ? 'text-[#1F74BA] bg-blue-50/60 border border-blue-200'
                    : 'text-gray-700 hover:text-[#1F74BA] hover:bg-gray-50'
                }`}
              >
                <span>{link.hindi}</span>
                {link.isSpecial && <span className="text-xs">🪷 10-Year</span>}
                {link.isTool && <span className="text-xs">🧮 Planner</span>}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
            <Link
              to="/quote"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFE234] to-[#F09120] text-black font-extrabold text-center text-sm shadow-md"
            >
              Plan Your Event — Get a Quote
            </Link>
            <div className="flex items-center justify-between text-xs text-gray-600 px-1 pt-2">
              <a href={`tel:${settings.phone}`} className="flex items-center gap-1 text-[#1F74BA] font-bold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>
              <Link to="/admin" className="hover:text-[#1F74BA] font-medium">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

