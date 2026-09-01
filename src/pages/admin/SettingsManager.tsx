import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Phone, Mail, MapPin, Globe, Sparkles, MessageCircle } from 'lucide-react';
import { dataService } from '../../lib/dataService';
import { BusinessSettings } from '../../types';

export const SettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    dataService.getSettings().then(setSettings);
  }, []);

  const handleChange = (field: keyof BusinessSettings, value: string) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setIsSaving(true);
    await dataService.updateSettings(settings);
    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!settings) return <div className="text-gray-400 p-8">कॉन्फ़िगरेशन लोड हो रहा है...</div>;

  return (
    <div className="space-y-8 max-w-4xl bg-white text-[#111827]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#1F74BA] uppercase tracking-wider mb-1">
            <Settings className="w-3.5 h-3.5 text-[#F8D706]" />
            <span>व्यापार सेटिंग्स व सामग्री प्रबंधन (Business Settings CMS)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
            व्यापार विवरण, फ़ोन व <span className="gradient-text-gold">स्थान सेटिंग्स</span>
          </h1>
          <p className="text-xs text-gray-500 font-normal mt-1">
            आधिकारिक फ़ोन नंबर, व्हाट्सएप, पता, गूगल मैप्स और सोशल मीडिया लिंक्स को तुरंत अपडेट करें
          </p>
        </div>
        {isSaved && (
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold shadow-xs animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>सेटिंग्स सफलतापूर्वक सेव हो गईं!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Channels Section */}
        <div className="card-hover-lift rounded-3xl p-6 sm:p-7 border border-gray-200/90 bg-white space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Phone className="w-4 h-4 text-[#1F74BA]" />
            <h3 className="text-sm font-extrabold font-serif-luxury text-[#111827] uppercase tracking-wider">
              संपर्क एवं संचार विवरण (Contact Channels)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#111827]">व्यापार का नाम (Business Name)</label>
              <input
                type="text"
                value={settings.business_name}
                onChange={(e) => handleChange('business_name', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] font-bold focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#111827]">टैगलाइन (Tagline)</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#111827]">आधिकारिक फ़ोन नंबर</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] font-bold focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#111827]">WhatsApp नंबर (फ्लोटिंग चैट के लिए)</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] font-bold focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#111827]">आधिकारिक ईमेल</label>
              <input
                type="text"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#111827]">कार्य समय (Business Hours)</label>
              <input
                type="text"
                value={settings.business_hours}
                onChange={(e) => handleChange('business_hours', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Location & Maps Section */}
        <div className="card-hover-lift rounded-3xl p-6 sm:p-7 border border-gray-200/90 bg-white space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <MapPin className="w-4 h-4 text-[#1F74BA]" />
            <h3 className="text-sm font-extrabold font-serif-luxury text-[#111827] uppercase tracking-wider">
              कार्यालय पता एवं सेवा क्षेत्र (Location & Coverage)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-extrabold text-[#111827]">संपूर्ण पता (Full Address)</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#111827]">प्रमुख लैंडमार्क (Landmark)</label>
              <input
                type="text"
                value={settings.landmark}
                onChange={(e) => handleChange('landmark', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#111827]">सेवा क्षेत्र दायरा (Service Area)</label>
              <input
                type="text"
                value={settings.service_area}
                onChange={(e) => handleChange('service_area', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-extrabold text-[#111827]">Google Maps Embed URL</label>
              <input
                type="text"
                value={settings.google_maps_embed_url}
                onChange={(e) => handleChange('google_maps_embed_url', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Hero Section & Copywriting */}
        <div className="card-hover-lift rounded-3xl p-6 sm:p-7 border border-gray-200/90 bg-white space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Sparkles className="w-4 h-4 text-[#1F74BA]" />
            <h3 className="text-sm font-extrabold font-serif-luxury text-[#111827] uppercase tracking-wider">
              होमपेज व परिचय संदेश (Hero & About Content)
            </h3>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#111827]">होमपेज मुख्य शीर्षक</label>
              <input
                type="text"
                value={settings.hero_title}
                onChange={(e) => handleChange('hero_title', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] font-serif-luxury font-extrabold focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#111827]">होमपेज उप-शीर्षक</label>
              <input
                type="text"
                value={settings.hero_subtitle}
                onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#111827]">परिचय पैराग्राफ (About Page Intro)</label>
              <textarea
                rows={3}
                value={settings.about_intro}
                onChange={(e) => handleChange('about_intro', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="card-hover-lift rounded-3xl p-6 sm:p-7 border border-gray-200/90 bg-white space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Globe className="w-4 h-4 text-[#1F74BA]" />
            <h3 className="text-sm font-extrabold font-serif-luxury text-[#111827] uppercase tracking-wider">
              सोशल मीडिया चैनल्स (Social Links)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#111827]">Instagram Profile URL</label>
              <input
                type="text"
                value={settings.instagram_url}
                onChange={(e) => handleChange('instagram_url', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#111827]">Facebook Page URL</label>
              <input
                type="text"
                value={settings.facebook_url}
                onChange={(e) => handleChange('facebook_url', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#111827]">YouTube Channel URL</label>
              <input
                type="text"
                value={settings.youtube_url}
                onChange={(e) => handleChange('youtube_url', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-black" />
            <span>{isSaving ? 'सेव हो रहा है...' : 'सभी परिवर्तन सेव करें (Save & Publish)'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
