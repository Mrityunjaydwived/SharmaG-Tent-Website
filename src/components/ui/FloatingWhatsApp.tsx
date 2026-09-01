import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BusinessSettings } from '../../types';

interface FloatingWhatsAppProps {
  settings: BusinessSettings;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ settings }) => {
  const whatsappNum = settings.whatsapp || '[WHATSAPP NUMBER]';
  const cleanNumber = whatsappNum.replace(/[^0-9]/g, '');
  const whatsappUrl = cleanNumber.length >= 7 
    ? `https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hello SharmaG Tent House, I would like to inquire about event decor and tent arrangements.')}`
    : `https://wa.me/?text=${encodeURIComponent('Hello SharmaG Tent House, I would like to inquire about event decor and tent arrangements.')}`;

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-40 flex items-center group">
      <div className="hidden md:flex items-center mr-3 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-emerald-500/30 text-xs font-semibold text-emerald-400 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
        Chat With Us on WhatsApp
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-emerald-300/40 relative"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-black animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-black" />
        <MessageCircle className="w-7 h-7" />
      </a>
    </aside>
  );
};
