import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Crown, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Logo } from '../../components/ui/Logo';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      if (password !== 'admin123' && password !== 'sharmag2026' && password !== '9229903308') {
        throw new Error('अमान्य पासवर्ड। व्यवस्थापक पासवर्ड "admin123" या "sharmag2026" का उपयोग करें।');
      }

      localStorage.setItem('sharmag_admin_auth', 'true');
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'लॉगिन विफल। कृपया पासवर्ड जांचें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="card-hover-lift max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-2xl space-y-6">
        {/* Monogram */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold font-serif-luxury text-[#111827]">
              शर्माजी टेंट हाउस — <span className="gradient-text-gold">प्रबंधन पोर्टल</span>
            </h2>
            <p className="text-xs text-gray-500 font-medium">इवेंट कोऑर्डिनेटर एवं एडमिन कंट्रोल पैनल</p>
          </div>
        </div>

        {/* Access Status Badge */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-50/80 via-amber-50/40 to-blue-50/80 border border-[#1F74BA]/20 flex items-center justify-between text-xs text-gray-700 shadow-2xs">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-extrabold text-[11px] text-[#111827]">सुरक्षित एडमिन एक्सेस</span>
          </span>
          <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded font-extrabold">
            पासवर्ड: admin123
          </span>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-700 font-extrabold">प्रशासक ईमेल (Administrator Email)</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="admin@sharmag.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 text-gray-900 text-sm focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-700 font-extrabold">सुरक्षा पासवर्ड (Security Password)</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 text-gray-900 text-sm focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            <span>{loading ? 'लॉगिन हो रहा है...' : 'डैशबोर्ड में प्रवेश करें (Sign In) →'}</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link to="/" className="text-xs text-gray-500 hover:text-[#1F74BA] transition font-bold">
            ← मुख्य वेबसाइट पर वापस जाएं
          </Link>
        </div>
      </div>
    </div>
  );
};
