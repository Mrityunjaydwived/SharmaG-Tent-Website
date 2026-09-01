import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Send,
  Truck,
  Flame,
  Lightbulb,
  UtensilsCrossed,
  ShieldCheck
} from 'lucide-react';
import { BusinessSettings } from '../../types';
import { Logo } from '../ui/Logo';
import { Footer3DCanvas } from '../3d/Footer3DCanvas';
import { dataService } from '../../lib/dataService';
import { sendNotificationEmail } from '../../lib/notificationService';

interface FooterProps {
  settings: BusinessSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();
  const [quickPhone, setQuickPhone] = useState('');
  const [quickSent, setQuickSent] = useState(false);
  const [quickLoading, setQuickLoading] = useState(false);

  const handleQuickCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone.trim()) return;
    setQuickLoading(true);
    try {
      await dataService.submitEnquiry({
        customer_name: 'Footer Quick Callback',
        phone: quickPhone,
        email: 'N/A',
        event_type: 'Weddings',
        event_date: 'TBD',
        event_location: 'TBD',
        guest_count: 'Flexible',
        required_services: ['Immediate Phone Callback Request'],
        budget_range: 'Flexible',
        message: 'Client requested an instant phone callback from footer widget.',
        status: 'New',
        admin_notes: 'Urgent callback requested from footer.',
      });

      // Dispatch direct email notification to owner
      await sendNotificationEmail({
        subject: `⚡ तत्काल कॉल अनुरोध (Quick Callback): ${quickPhone}`,
        name: 'Footer Quick Callback User',
        phone: quickPhone,
        message: 'ग्राहक ने फुटर से 15 मिनट के अंदर तत्काल कॉल बैक का अनुरोध किया है।',
        source: 'फुटर क्विक हेल्पलाइन विजेट (Footer Widget)',
      });

      setQuickSent(true);
      setQuickPhone('');
    } catch (err) {
      console.error(err);
    } finally {
      setQuickLoading(false);
    }
  };

  return (
    <footer className="border-t border-gray-200 bg-white text-[#111827] relative overflow-hidden">
      {/* Top Ambient Glow & Decorative Golden Latkan Garland Accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#1F74BA] via-[#F8D706] to-[#F09120]" />

      {/* Quick Action Callback & Assistance Banner */}
      <div className="border-b border-gray-100 bg-gradient-to-b from-blue-50/50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white border border-[#1F74BA]/20 text-[#1F74BA] text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              तुरंत सहायता व सलाह (Quick Callback)
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#111827]">
              अपने आयोजन की तिथि के लिए उपलब्धता जांचें
            </h3>
            <p className="text-xs text-gray-600">
              अपना मोबाइल नंबर दर्ज करें, हमारे वरिष्ठ इवेंट प्लानर 15 मिनट में आपसे संपर्क करेंगे।
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {quickSent ? (
              <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>धन्यवाद! हमारे प्रतिनिधि शीघ्र ही आपको कॉल करेंगे।</span>
              </div>
            ) : (
              <form onSubmit={handleQuickCallback} className="flex items-center gap-2 max-w-md mx-auto">
                <input
                  type="tel"
                  required
                  placeholder="अपना 10-अंकीय मोबाइल नंबर..."
                  value={quickPhone}
                  onChange={(e) => setQuickPhone(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white border border-gray-300 text-xs text-[#111827] focus:border-[#1F74BA] focus:outline-none shadow-xs w-60 sm:w-72"
                />
                <button
                  type="submit"
                  disabled={quickLoading}
                  className="px-5 py-3 rounded-xl bg-[#1F74BA] hover:bg-[#185e97] text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5 shrink-0 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{quickLoading ? 'भेज रहे हैं...' : 'कॉल प्राप्त करें'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Compound */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Interactive 3D Mandap Chhatri Element */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" />
            <p className="text-xs leading-relaxed text-gray-600">
              {settings.tagline || 'हम बनाते हैं राजसी पंडाल, आप बनाते हैं अनमोल यादें।'} 25+ वर्षों का विश्वास, आधुनिक वाटरप्रूफ जर्मन हैंगर्स, बरात डीजे गाड़ी, और पूर्ण भारतीय मांगलिक उत्सव व्यवस्था।
            </p>

            {/* 3D Royal Kalash Chhatri Interactive Canvas */}
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white shadow-inner p-1 overflow-hidden">
              <Footer3DCanvas />
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-2 pt-1">
              {settings.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-1.5 text-emerald-700 hover:bg-emerald-600 hover:text-white transition text-xs font-bold shadow-xs"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              )}
              {settings.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-1.5 text-[#1F74BA] hover:bg-[#1F74BA] hover:text-white transition text-xs font-bold shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>कॉल करें</span>
                </a>
              )}
              <Link
                to="/quote"
                className="px-3 py-1.5 rounded-xl bg-[#F8D706] hover:bg-[#ebd005] text-black transition text-xs font-extrabold shadow-xs"
              >
                कोटेशन →
              </Link>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider font-serif-luxury border-b border-gray-100 pb-2">
              पेज नेविगेशन
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600 font-medium">
              <li>
                <Link to="/" className="hover:text-[#1F74BA] transition flex items-center gap-1.5">
                  <span className="text-[#1F74BA] font-bold">›</span> मुख्य पृष्ठ (Home)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#1F74BA] transition flex items-center gap-1.5">
                  <span className="text-[#1F74BA] font-bold">›</span> हमारे बारे में (About)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#1F74BA] transition flex items-center gap-1.5">
                  <span className="text-[#1F74BA] font-bold">›</span> सेवाएं (Services)
                </Link>
              </li>
              <li>
                <Link to="/panchang" className="hover:text-[#1F74BA] transition flex items-center gap-1.5 font-bold text-amber-900">
                  <span className="text-[#F8D706]">🪷</span> वैदिक पंचांग व गुण मिलान (2026-2036)
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-[#1F74BA] transition flex items-center gap-1.5 font-bold text-[#1F74BA]">
                  <span className="text-[#F8D706]">🧮</span> इवेंट कैलकुलेटर व नोट्स
                </Link>
              </li>
              <li>
                <Link to="/location" className="hover:text-[#1F74BA] transition flex items-center gap-1.5">
                  <span className="text-[#1F74BA] font-bold">›</span> सेवा क्षेत्र व पता (Location)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Specialties & Amenities */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider font-serif-luxury border-b border-gray-100 pb-2">
              प्रमुख सेवाएं एवं सुविधाएं
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600 font-medium">
              <li className="flex items-center gap-2">
                <Crown className="w-3.5 h-3.5 text-[#1F74BA] shrink-0" />
                <span>वाटरप्रूफ जर्मन हैंगर व शामियाना</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#1F74BA] shrink-0" />
                <span>बरात डीजे गाड़ी व साउंड रथ</span>
              </li>
              <li className="flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-[#1F74BA] shrink-0" />
                <span>फैंसी रोड लाइट व बाराती छतरी</span>
              </li>
              <li className="flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-[#1F74BA] shrink-0" />
                <span>शाही आतिशबाजी व स्टेज पायरो</span>
              </li>
              <li className="flex items-center gap-2">
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#1F74BA] shrink-0" />
                <span>फूड स्टॉल्स व बफे इंफ्रास्ट्रक्चर</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% आंधी-तूफान सुरक्षा गारंटी</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact & Timings */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider font-serif-luxury border-b border-gray-100 pb-2">
              संपर्क सूत्र (Official Contact)
            </h4>
            <ul className="space-y-3 text-xs text-gray-700">
              <li className="p-2 rounded-xl bg-amber-50/60 border border-amber-200/60">
                <span className="text-[10px] font-extrabold text-amber-800 uppercase block">संस्थापक व संचालक (Founder & Owner):</span>
                <span className="font-extrabold text-gray-900 text-xs">श्री प्रदीप शर्मा (Pradeep Sharma)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1F74BA] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#111827] block">प्रधान कार्यालय:</span>
                  <span className="text-gray-600">{settings.address || 'वार्ड नं. 1, त्योंथर, रीवा, मध्य प्रदेश'}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#1F74BA] shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-500 text-[10px] block">फ़ोन नंबर (Call Helpline):</span>
                  <div className="flex flex-col gap-0.5">
                    <a href="tel:9229903308" className="hover:text-[#1F74BA] font-bold text-gray-900 transition">
                      +91 9229903308
                    </a>
                    <a href="tel:7489467539" className="hover:text-[#1F74BA] font-bold text-gray-900 transition">
                      +91 7489467539
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#1F74BA] shrink-0" />
                <div>
                  <span className="text-gray-500 text-[10px] block">ईमेल संपर्क:</span>
                  <a href={`mailto:${settings.email || 'dwivedibandhavesh@gmail.com'}`} className="hover:text-[#1F74BA] font-semibold text-gray-900 transition break-all">
                    {settings.email || 'dwivedibandhavesh@gmail.com'}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-gray-500 text-[10px] block">संपर्क समय:</span>
                  <span className="font-bold text-emerald-700">24x7 सदैव उपलब्ध (All Day All Week Open)</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Legal */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© {currentYear} {settings.business_name || 'SharmaG Tent House'}. सर्वाधिकार सुरक्षित (All Rights Reserved).</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <Link to="/contact" className="hover:text-[#1F74BA] transition">नियम एवं शर्तें</Link>
            <span className="text-gray-300">•</span>
            <Link to="/location" className="hover:text-[#1F74BA] transition">सेवा क्षेत्र</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

