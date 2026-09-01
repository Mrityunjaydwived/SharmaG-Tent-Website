import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, 
  Sparkles, 
  Heart, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  ArrowRight, 
  Sun, 
  Moon, 
  Compass, 
  ShieldCheck, 
  Search,
  Filter,
  Layers,
  Award
} from 'lucide-react';
import { 
  VEDIC_RASHIS, 
  VEDIC_NAKSHATRAS, 
  calculateAshtaKootaMilan, 
  CHOGHADIYA_HOURS 
} from '../data/panchangamData';
import { getYearVivahSummary, PanchangDay } from '../data/panchangData';

export const VedicPanchangamPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'milan' | 'panchang' | 'choghadiya'>('milan');

  // Guna Milan State
  const [groomRashi, setGroomRashi] = useState('mesha');
  const [groomNakshatra, setGroomNakshatra] = useState('ashwini');
  const [brideRashi, setBrideRashi] = useState('karka');
  const [brideNakshatra, setBrideNakshatra] = useState('pushya');

  // 10-Year Panchang Filter
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  const milanResult = calculateAshtaKootaMilan(
    groomRashi,
    groomNakshatra,
    brideRashi,
    brideNakshatra
  );

  const vivahSummary = getYearVivahSummary(selectedYear);

  const filteredMonths = vivahSummary.months.filter((m) => {
    if (selectedMonth === 'all') return true;
    return m.monthName.toLowerCase().includes(selectedMonth.toLowerCase());
  });

  const MONTH_LIST = [
    { key: 'all', label: 'सभी महीने (All Months)' },
    { key: 'जनवरी', label: 'जनवरी (माघ)' },
    { key: 'फरवरी', label: 'फरवरी (फाल्गुन)' },
    { key: 'मार्च', label: 'मार्च (चैत्र)' },
    { key: 'अप्रैल', label: 'अप्रैल (वैशाख)' },
    { key: 'मई', label: 'मई (ज्येष्ठ)' },
    { key: 'जून', label: 'जून (आषाढ़)' },
    { key: 'जुलाई', label: 'जुलाई (श्रावण)' },
    { key: 'नवंबर', label: 'नवंबर (कार्तिक)' },
    { key: 'दिसंबर', label: 'दिसंबर (मार्गशीर्ष)' },
  ];

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 bg-white text-[#111827]">
      {/* Top Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-50 via-blue-50 to-amber-50 border border-[#F8D706]/40 text-[#1F74BA] text-xs font-extrabold uppercase tracking-wider shadow-xs animate-pulse-glow">
          <Crown className="w-4 h-4 text-[#F8D706]" />
          <span>वैदिक पंचांग एवं अष्टकूट 36 गुण मिलान (2026 – 2036)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif-luxury leading-tight text-[#111827]">
          <span>शुभ विवाह लग्न, पंचांग एवं </span>
          <span className="gradient-text-gold">कुंडली गुण मिलान</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal max-w-2xl mx-auto">
          सनातन ज्योतिष के आठों कूटों (वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट, नाड़ी) के अनुसार वर-वधू का गुण मिलान करें और आगामी 10 वर्षों के शुभ मुहूर्तों की सूची देखें।
        </p>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex justify-center">
        <div className="p-1.5 rounded-2xl bg-gray-100 border border-gray-200 inline-flex gap-1.5 max-w-full overflow-x-auto shadow-inner">
          <button
            onClick={() => setActiveTab('milan')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'milan'
                ? 'bg-[#1F74BA] text-white shadow-md'
                : 'text-gray-700 hover:text-[#111827] hover:bg-white/60'
            }`}
          >
            <Heart className="w-4 h-4 text-[#F8D706]" />
            <span>💍 अष्टकूट 36 गुण मिलान (Kundali Milan)</span>
          </button>

          <button
            onClick={() => setActiveTab('panchang')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'panchang'
                ? 'bg-[#1F74BA] text-white shadow-md'
                : 'text-gray-700 hover:text-[#111827] hover:bg-white/60'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#F8D706]" />
            <span>📅 10-वर्षीय पंचांग व विवाह लग्न (2026-2036)</span>
          </button>

          <button
            onClick={() => setActiveTab('choghadiya')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'choghadiya'
                ? 'bg-[#1F74BA] text-white shadow-md'
                : 'text-gray-700 hover:text-[#111827] hover:bg-white/60'
            }`}
          >
            <Sun className="w-4 h-4 text-[#F8D706]" />
            <span>⏳ दैनिक चौघड़िया मुहूर्त (Choghadiya)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ASHTA KOOTA 36 GUNA MILAN */}
      {activeTab === 'milan' && (
        <div className="space-y-10 animate-fade-in">
          {/* Boy & Girl Horoscope Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Groom (वर) Profile */}
            <div className="card-hover-lift rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-blue-50/70 via-white to-blue-50/30 border border-blue-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-blue-100 pb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1F74BA] text-white flex items-center justify-center font-black">
                  👨
                </div>
                <div>
                  <h3 className="text-base font-extrabold font-serif-luxury text-[#111827]">
                    वर का विवरण (Groom Details)
                  </h3>
                  <p className="text-[11px] text-gray-500">राशि व जन्म नक्षत्र चुनें</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-700 block">वर की राशि (Rashi):</label>
                  <select
                    value={groomRashi}
                    onChange={(e) => setGroomRashi(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-xs font-bold text-[#111827] focus:border-[#1F74BA] focus:outline-none"
                  >
                    {VEDIC_RASHIS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.symbol} {r.nameHindi} — वर्ण: {r.varna}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-700 block">वर का जन्म नक्षत्र (Nakshatra):</label>
                  <select
                    value={groomNakshatra}
                    onChange={(e) => setGroomNakshatra(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-xs font-bold text-[#111827] focus:border-[#1F74BA] focus:outline-none"
                  >
                    {VEDIC_NAKSHATRAS.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.number}. {n.nameHindi} ({n.gana} गण, {n.nadi} नाड़ी)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Bride (वधू) Profile */}
            <div className="card-hover-lift rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-rose-50/70 via-white to-amber-50/30 border border-rose-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-rose-100 pb-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black">
                  👰
                </div>
                <div>
                  <h3 className="text-base font-extrabold font-serif-luxury text-[#111827]">
                    वधू का विवरण (Bride Details)
                  </h3>
                  <p className="text-[11px] text-gray-500">राशि व जन्म नक्षत्र चुनें</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-700 block">वधू की राशि (Rashi):</label>
                  <select
                    value={brideRashi}
                    onChange={(e) => setBrideRashi(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-xs font-bold text-[#111827] focus:border-rose-600 focus:outline-none"
                  >
                    {VEDIC_RASHIS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.symbol} {r.nameHindi} — वर्ण: {r.varna}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-700 block">वधू का जन्म नक्षत्र (Nakshatra):</label>
                  <select
                    value={brideNakshatra}
                    onChange={(e) => setBrideNakshatra(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-xs font-bold text-[#111827] focus:border-rose-600 focus:outline-none"
                  >
                    {VEDIC_NAKSHATRAS.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.number}. {n.nameHindi} ({n.gana} गण, {n.nadi} नाड़ी)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Milan Result Score & Verdict Box */}
          <div className="rounded-3xl p-8 bg-gradient-to-b from-[#071A2B] via-[#0B2540] to-[#071A2B] text-white border border-[#1F74BA]/40 shadow-2xl space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-[#F8D706] text-xs font-black uppercase tracking-wider border border-[#F8D706]/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>गुण मिलान परिणाम (Final Compatibility Score)</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="w-32 h-32 rounded-full border-4 border-[#F8D706] bg-white/5 flex flex-col items-center justify-center shadow-lg">
                <span className="text-4xl font-black font-mono text-[#F8D706]">
                  {milanResult.totalScore}
                </span>
                <span className="text-[11px] text-gray-300 font-bold uppercase tracking-widest">
                  / 36 गुण
                </span>
              </div>

              <div className="text-center sm:text-left space-y-2 max-w-lg">
                <div className="inline-block px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/40">
                  {milanResult.verdictCategory}
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-serif-luxury text-white">
                  {milanResult.verdictHindi}
                </h3>
                <p className="text-xs text-gray-300">
                  न्यूनतम आवश्यक गुण: 18 • मध्यम गुण: 18-24 • उत्तम गुण: 25-32 • राजसी अति उत्तम: 33-36
                </p>
              </div>
            </div>

            {/* Dosha & Remedial Advice */}
            {milanResult.doshaWarnings.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-left text-xs space-y-2 max-w-2xl mx-auto">
                <div className="flex items-center gap-2 text-amber-400 font-black">
                  <AlertTriangle className="w-4 h-4" />
                  <span>ज्योतिषीय दोष विश्लेषण व शांति उपाय:</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  {milanResult.doshaWarnings.map((w, i) => (
                    <li key={i} className="text-amber-200">{w}</li>
                  ))}
                  {milanResult.remedies.map((r, i) => (
                    <li key={i} className="text-emerald-300">उपाय: {r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Detailed 8 Kootas Evaluation Cards Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-black font-serif-luxury text-[#111827] text-center sm:text-left">
              अष्टकूटों का विस्तृत 8-पैरामीटर मूल्यांकन:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: '1. वर्ण कूट (Varna)', data: milanResult.varna, max: 1, info: 'आध्यात्मिक, कार्य व स्वभाव अनुकूलता' },
                { title: '2. वश्य कूट (Vashya)', data: milanResult.vashya, max: 2, info: 'पारस्परिक आकर्षण व समर्पण' },
                { title: '3. तारा कूट (Tara)', data: milanResult.tara, max: 3, info: 'स्वास्थ्य, दीर्घायु व भाग्य वृद्धि' },
                { title: '4. योनि कूट (Yoni)', data: milanResult.yoni, max: 4, info: 'शारीरिक व वैवाहिक सुख' },
                { title: '5. ग्रह मैत्री (Maitri)', data: milanResult.grahaMaitri, max: 5, info: 'मानसिक मित्रता व वैचारिक सामंजस्य' },
                { title: '6. गण कूट (Gana)', data: milanResult.gana, max: 6, info: 'व्यवहार व चरित्र संगति' },
                { title: '7. भकूट (Bhakoot)', data: milanResult.bhakoot, max: 7, info: 'संतान सुख, वंश वृद्धि व समृद्धि' },
                { title: '8. नाड़ी कूट (Nadi)', data: milanResult.nadi, max: 8, info: 'आनुवंशिक स्वास्थ्य व जीवन रक्षा' },
              ].map((k, i) => (
                <div
                  key={i}
                  className="card-hover-lift p-4.5 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#111827]">{k.title}</span>
                    <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-[#1F74BA] text-xs font-black border border-blue-200">
                      {k.data.points} / {k.max}
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#1F74BA] to-[#F8D706] h-full rounded-full transition-all duration-500"
                      style={{ width: `${(k.data.points / k.max) * 100}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-gray-600 leading-tight">{k.data.desc}</p>
                  <span className="text-[10px] text-gray-400 font-bold block">{k.info}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CTA to Book Tent for Matched Muhurat */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50 via-amber-50 to-blue-50 border border-[#1F74BA]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-base font-black font-serif-luxury text-[#111827]">
                शुभ गुण मिलान के बाद अपने विवाह लग्न हेतु टेंट व मंडप बुक करें
              </h4>
              <p className="text-xs text-gray-600">
                शर्माजी टेंट हाउस (त्योंथर, रीवा) — वाटरप्रूफ जर्मन हैंगर, 3D स्टेज व संपूर्ण व्यवस्था
              </p>
            </div>
            <Link
              to="/quote"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F8D706] to-[#F09120] text-black font-black text-xs shadow-md hover:scale-105 transition shrink-0"
            >
              कोटेशन बनाएं →
            </Link>
          </div>
        </div>
      )}

      {/* TAB 2: 10-YEAR PANCHANG & SHUBH LAGAN (2026 - 2036) */}
      {activeTab === 'panchang' && (
        <div className="space-y-8 animate-fade-in">
          {/* Year & Month Filter Controls */}
          <div className="card-hover-lift rounded-3xl p-6 bg-white border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-[#1F74BA] uppercase tracking-wider block">
                  10-वर्षीय कैलेंडर फ़िल्टर
                </span>
                <h3 className="text-lg font-black font-serif-luxury text-[#111827]">
                  वर्ष 2026 से 2036 तक के सभी शुभ विवाह मुहूर्त
                </h3>
              </div>

              {/* Year Selector Tabs */}
              <div className="flex gap-1.5 overflow-x-auto max-w-full pb-1">
                {[2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                      selectedYear === yr
                        ? 'bg-[#1F74BA] text-white shadow-xs'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Month Filter Chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {MONTH_LIST.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setSelectedMonth(m.key)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition ${
                    selectedMonth === m.key
                      ? 'bg-[#F8D706] text-black font-black shadow-xs'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Muhurats Grid grouped by Month */}
          <div className="space-y-6">
            {filteredMonths.map((m, idx) => (
              <div key={idx} className="card-hover-lift rounded-3xl p-6 bg-white border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center font-black text-xs">
                      💍
                    </span>
                    <h4 className="text-lg font-black font-serif-luxury text-[#111827]">
                      {m.monthName} {selectedYear} ({m.dates.length} शुभ विवाह मुहूर्त)
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-[#1F74BA] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    वर्ष {selectedYear}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {m.dates.map((d, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/40 via-white to-amber-50/20 border border-gray-200 space-y-2 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500">{d.day}</span>
                        <span className="text-[10px] font-black text-[#1F74BA] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                          {d.nakshatra}
                        </span>
                      </div>

                      <div className="text-xl font-black text-[#111827] font-serif-luxury">
                        {d.dateStr}
                      </div>

                      <div className="text-xs font-bold text-emerald-700 bg-emerald-50/70 p-1.5 rounded-lg border border-emerald-200">
                        {d.lagan}
                      </div>

                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] text-gray-500 font-bold">शर्माजी टेंट बुकिंग:</span>
                        <Link
                          to="/quote"
                          className="px-3 py-1 rounded-lg bg-[#1F74BA] hover:bg-[#185e97] text-white text-xs font-black shadow-xs transition"
                        >
                          बुक करें →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DAILY CHOGHADIYA MUHURAT */}
      {activeTab === 'choghadiya' && (
        <div className="space-y-8 animate-fade-in">
          <div className="card-hover-lift rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-blue-50/50 via-white to-amber-50/40 border border-gray-200 shadow-sm space-y-3 text-center max-w-2xl mx-auto">
            <span className="text-xs font-black text-[#1F74BA] uppercase tracking-wider block">
              दैनिक चौघड़िया समय सारिणी
            </span>
            <h3 className="text-2xl font-black font-serif-luxury text-[#111827]">
              मांगलिक कार्य हेतु शुभ व अशुभ चौघड़िया
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              चौघड़िया सूर्योदय से सूर्यास्त (दिन) और सूर्यास्त से अगले सूर्योदय (रात) के 8-8 भागों में विभाजित होता है।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHOGHADIYA_HOURS.map((c, i) => (
              <div
                key={i}
                className="card-hover-lift p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-[#111827]">{c.name}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                      c.nature.includes('शुभ')
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : c.nature.includes('लाभ')
                        ? 'bg-blue-50 text-[#1F74BA] border border-blue-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {c.nature}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
