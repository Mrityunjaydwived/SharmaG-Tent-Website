import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  Crown, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Flower2, 
  Home as HomeIcon, 
  Heart, 
  Sun, 
  Moon, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  Info,
  CheckCircle2,
  X,
  Filter,
  AlertTriangle
} from 'lucide-react';
import { getPanchangForMonth, getYearVivahSummary, PanchangDay } from '../data/panchangData';
import { 
  VEDIC_RASHIS, 
  VEDIC_NAKSHATRAS, 
  calculateAshtaKootaMilan, 
  CHOGHADIYA_HOURS 
} from '../data/panchangamData';

export const ShubhMuhurat: React.FC = () => {
  // Page Tab: 'calendar' (Default previous calendar), 'milan' (Ashta Koota Guna Milan), 'choghadiya' (Choghadiya Muhurat)
  const [activeMainTab, setActiveMainTab] = useState<'calendar' | 'milan' | 'choghadiya'>('calendar');

  // Calendar State
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [filterType, setFilterType] = useState<'all' | 'wedding' | 'festival' | 'grihapravesh'>('all');
  const [selectedDay, setSelectedDay] = useState<PanchangDay | null>(null);
  const [showYearSummary, setShowYearSummary] = useState<boolean>(false);

  // Guna Milan State
  const [groomRashi, setGroomRashi] = useState('mesha');
  const [groomNakshatra, setGroomNakshatra] = useState('ashwini');
  const [brideRashi, setBrideRashi] = useState('karka');
  const [brideNakshatra, setBrideNakshatra] = useState('pushya');

  const availableYears = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036];

  const monthNames = [
    { num: 0, nameHindi: 'जनवरी', nameEng: 'January' },
    { num: 1, nameHindi: 'फरवरी', nameEng: 'February' },
    { num: 2, nameHindi: 'मार्च', nameEng: 'March' },
    { num: 3, nameHindi: 'अप्रैल', nameEng: 'April' },
    { num: 4, nameHindi: 'मई', nameEng: 'May' },
    { num: 5, nameHindi: 'जून', nameEng: 'June' },
    { num: 6, nameHindi: 'जुलाई', nameEng: 'July' },
    { num: 7, nameHindi: 'अगस्त', nameEng: 'August' },
    { num: 8, nameHindi: 'सितंबर', nameEng: 'September' },
    { num: 9, nameHindi: 'अक्टूबर', nameEng: 'October' },
    { num: 10, nameHindi: 'नवंबर', nameEng: 'November' },
    { num: 11, nameHindi: 'दिसंबर', nameEng: 'December' },
  ];

  const daysOfWeekHeader = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];

  const monthDays = useMemo(() => {
    return getPanchangForMonth(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  const yearVivahSummary = useMemo(() => {
    return getYearVivahSummary(selectedYear);
  }, [selectedYear]);

  // Leading empty cells for first day of month
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  const filteredMonthDays = useMemo(() => {
    if (filterType === 'wedding') return monthDays.filter(d => d.isWeddingMuhurat);
    if (filterType === 'festival') return monthDays.filter(d => d.isFestival);
    if (filterType === 'grihapravesh') return monthDays.filter(d => d.isGrihaPravesh);
    return monthDays;
  }, [monthDays, filterType]);

  const nextMonth = () => {
    if (selectedMonth === 11) {
      if (selectedYear < 2036) {
        setSelectedYear(selectedYear + 1);
        setSelectedMonth(0);
      }
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const prevMonth = () => {
    if (selectedMonth === 0) {
      if (selectedYear > 2026) {
        setSelectedYear(selectedYear - 1);
        setSelectedMonth(11);
      }
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const weddingCountThisMonth = monthDays.filter(d => d.isWeddingMuhurat).length;
  const festivalCountThisMonth = monthDays.filter(d => d.isFestival).length;

  const milanResult = useMemo(() => {
    return calculateAshtaKootaMilan(
      groomRashi,
      groomNakshatra,
      brideRashi,
      brideNakshatra
    );
  }, [groomRashi, groomNakshatra, brideRashi, brideNakshatra]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 bg-white text-[#111827]">
      {/* Header Banner */}
      <div className="text-center max-w-4xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-50 via-blue-50 to-amber-50 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase tracking-wider shadow-xs animate-pulse-glow">
          <Sparkles className="w-3.5 h-3.5 text-[#F8D706]" />
          <span>10-वर्षीय हिंदू वैदिक पंचांग एवं अष्टकूट 36 गुण मिलान (2026 - 2036)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif-luxury leading-tight text-[#111827]">
          <span>शुभ मुहूर्त, विवाह सावे एवं </span>
          <span className="gradient-text-gold block sm:inline">कुंडली गुण मिलान</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal max-w-3xl mx-auto">
          आगामी 10 वर्षों (2026 से 2036) की <span className="font-bold text-[#1F74BA]">शुभ विवाह लग्न तारीखें, हिंदू तिथियां, नक्षत्र, प्रमुख पर्व, चौघड़िया मुहूर्त एवं 36 गुण मिलान</span> देखें और अपने उत्सव के लिए अग्रिम टेंट व पंडाल बुक करें।
        </p>

        {/* Quick Highlights Summary Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold">
          <span className="px-4 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 shadow-2xs flex items-center gap-1.5">
            <span>💍</span>
            <span>वर्ष {selectedYear} में कुल {yearVivahSummary.totalWeddingDates} विवाह लग्न</span>
          </span>
          <span className="px-4 py-1.5 rounded-full bg-blue-50 text-[#1F74BA] border border-blue-200 shadow-2xs flex items-center gap-1.5">
            <span>🪔</span>
            <span>इस माह {festivalCountThisMonth} प्रमुख त्योहार व व्रत</span>
          </span>
          <button
            onClick={() => setShowYearSummary(true)}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold shadow-sm hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <span>📜 पूरे {selectedYear} के विवाह सावे देखें</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Section Tabs: Calendar | Guna Milan | Choghadiya */}
      <div className="flex justify-center">
        <div className="p-1.5 rounded-2xl bg-gray-100 border border-gray-200 inline-flex gap-1.5 max-w-full overflow-x-auto shadow-inner">
          <button
            onClick={() => setActiveMainTab('calendar')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeMainTab === 'calendar'
                ? 'bg-[#1F74BA] text-white shadow-md'
                : 'text-gray-700 hover:text-[#111827] hover:bg-white/60'
            }`}
          >
            <CalendarIcon className="w-4 h-4 text-[#F8D706]" />
            <span>📅 10-वर्षीय पंचांग व कैलेंडर (Calendar 2026-2036)</span>
          </button>

          <button
            onClick={() => setActiveMainTab('milan')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeMainTab === 'milan'
                ? 'bg-[#1F74BA] text-white shadow-md'
                : 'text-gray-700 hover:text-[#111827] hover:bg-white/60'
            }`}
          >
            <Heart className="w-4 h-4 text-[#F8D706]" />
            <span>💍 अष्टकूट 36 गुण मिलान (Kundali Milan)</span>
          </button>

          <button
            onClick={() => setActiveMainTab('choghadiya')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeMainTab === 'choghadiya'
                ? 'bg-[#1F74BA] text-white shadow-md'
                : 'text-gray-700 hover:text-[#111827] hover:bg-white/60'
            }`}
          >
            <Sun className="w-4 h-4 text-[#F8D706]" />
            <span>⏳ दैनिक चौघड़िया मुहूर्त (Choghadiya)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: EXACT ORIGINAL 10-YEAR INTERACTIVE CALENDAR                        */}
      {/* ========================================================================= */}
      {activeMainTab === 'calendar' && (
        <div className="space-y-10 animate-fade-in">
          {/* Year Selector Tabs (2026 to 2036) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-extrabold text-[#111827] px-1">
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-[#1F74BA]" />
                <span>वर्ष चुनें (Select Year 2026 - 2036):</span>
              </span>
              <span className="text-[#1F74BA]">{selectedYear} (विक्रम संवत {selectedYear + 57})</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {availableYears.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold shrink-0 transition-all duration-300 transform active:scale-95 ${
                    selectedYear === yr
                      ? 'bg-gradient-to-r from-[#1F74BA] to-[#0B4F8A] text-white shadow-md shadow-blue-500/25 scale-105'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Month Navigator Header & Filter Controls */}
          <div className="card-hover-lift rounded-3xl p-6 sm:p-8 bg-white border border-gray-200/90 shadow-md space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-6">
              {/* Month Switcher */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
                <button
                  onClick={prevMonth}
                  className="p-2.5 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition active:scale-95"
                  title="पिछला महीना"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="text-center min-w-[200px]">
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
                    {monthNames[selectedMonth].nameHindi} {selectedYear}
                  </h2>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
                    {monthNames[selectedMonth].nameEng} • {weddingCountThisMonth} विवाह लग्न
                  </span>
                </div>

                <button
                  onClick={nextMonth}
                  className="p-2.5 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition active:scale-95"
                  title="अगला महीना"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Month Fast-Select Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-thin">
                {monthNames.map((m) => (
                  <button
                    key={m.num}
                    onClick={() => setSelectedMonth(m.num)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold shrink-0 transition-all ${
                      selectedMonth === m.num
                        ? 'bg-[#1F74BA] text-white shadow-xs'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200'
                    }`}
                  >
                    {m.nameHindi}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Chips & Legend */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
                <span className="text-gray-400 font-bold flex items-center gap-1 shrink-0">
                  <Filter className="w-3.5 h-3.5" />
                  <span>दिखाएं:</span>
                </span>
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition shrink-0 ${
                    filterType === 'all'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  सभी दिन ({monthDays.length})
                </button>
                <button
                  onClick={() => setFilterType('wedding')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1.5 ${
                    filterType === 'wedding'
                      ? 'bg-amber-400 text-amber-950 shadow-xs'
                      : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  <span>💍 केवल विवाह लग्न ({weddingCountThisMonth})</span>
                </button>
                <button
                  onClick={() => setFilterType('festival')}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1.5 ${
                    filterType === 'festival'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-[#1F74BA] hover:bg-blue-100 border border-blue-200'
                  }`}
                >
                  <span>🪔 त्योहार व पर्व ({festivalCountThisMonth})</span>
                </button>
              </div>

              {/* Legend Badges */}
              <div className="flex items-center gap-3 text-[11px] text-gray-600 font-medium shrink-0">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span>विवाह लग्न (Wedding)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                  <span>पर्व (Festival)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span>गृह प्रवेश</span>
                </span>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="space-y-2">
              {/* Day of week headers */}
              <div className="grid grid-cols-7 gap-1.5 sm:gap-3 text-center">
                {daysOfWeekHeader.map((d, idx) => (
                  <div
                    key={idx}
                    className={`py-2 text-xs font-black uppercase tracking-wider rounded-xl ${
                      idx === 0
                        ? 'bg-rose-50 text-rose-600 border border-rose-100'
                        : 'bg-gray-50 text-gray-700 border border-gray-100'
                    }`}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Days Matrix */}
              <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
                {/* Empty cells for starting day offset */}
                {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
                  <div
                    key={`empty-${idx}`}
                    className="min-h-[90px] sm:min-h-[110px] rounded-2xl bg-gray-50/40 border border-gray-100/50 opacity-40"
                  />
                ))}

                {/* Actual Days */}
                {monthDays.map((day) => {
                  const isFilteredOut = filterType !== 'all' && (
                    (filterType === 'wedding' && !day.isWeddingMuhurat) ||
                    (filterType === 'festival' && !day.isFestival) ||
                    (filterType === 'grihapravesh' && !day.isGrihaPravesh)
                  );

                  return (
                    <div
                      key={day.date}
                      onClick={() => setSelectedDay(day)}
                      className={`min-h-[95px] sm:min-h-[115px] p-2 sm:p-2.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden ${
                        isFilteredOut
                          ? 'opacity-25 bg-gray-50 border-gray-200'
                          : day.isWeddingMuhurat
                          ? 'bg-gradient-to-br from-amber-50/90 via-amber-50/40 to-white border-amber-300 hover:border-amber-500 shadow-xs hover:shadow-lg hover:scale-[1.02]'
                          : day.isFestival
                          ? 'bg-gradient-to-br from-blue-50/90 via-white to-blue-50/40 border-blue-200 hover:border-blue-400 shadow-2xs hover:shadow-md hover:scale-[1.01]'
                          : 'bg-white hover:bg-gray-50/80 border-gray-200/80 hover:border-gray-300'
                      }`}
                    >
                      {/* Top Bar: Date Num & Tithi */}
                      <div className="flex items-start justify-between gap-1">
                        <span
                          className={`text-base sm:text-lg font-black leading-none ${
                            day.isWeddingMuhurat
                              ? 'text-amber-950 font-serif-luxury'
                              : day.dayOfWeek === 'रविवार'
                              ? 'text-rose-600'
                              : 'text-gray-900'
                          }`}
                        >
                          {day.dayNum}
                        </span>

                        <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold truncate max-w-[55px] text-right">
                          {day.tithi.split(' ')[1]}
                        </span>
                      </div>

                      {/* Middle: Badges / Highlights */}
                      <div className="space-y-1 my-1">
                        {day.isWeddingMuhurat && (
                          <div className="px-1.5 py-0.5 rounded-md bg-amber-400 text-amber-950 text-[9px] sm:text-[10px] font-black flex items-center gap-1 shadow-2xs">
                            <span>💍</span>
                            <span className="truncate">विवाह लग्न</span>
                          </div>
                        )}

                        {day.festivalName && (
                          <div className="px-1.5 py-0.5 rounded-md bg-blue-100 text-[#1F74BA] text-[9px] font-bold truncate flex items-center gap-0.5">
                            <span>🪔</span>
                            <span className="truncate">{day.festivalName}</span>
                          </div>
                        )}

                        {day.isGrihaPravesh && (
                          <div className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[9px] font-bold truncate flex items-center gap-0.5">
                            <span>🏠</span>
                            <span className="truncate">गृह प्रवेश</span>
                          </div>
                        )}
                      </div>

                      {/* Bottom Info: Nakshatra */}
                      <div className="text-[8px] sm:text-[9px] text-gray-400 font-medium truncate flex items-center justify-between">
                        <span>{day.nakshatra}</span>
                        {day.isWeddingMuhurat && (
                          <span className="text-amber-800 font-bold hidden sm:inline">शुभ</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ASHTA KOOTA 36 GUNA & VARNA MILAN CALCULATOR                       */}
      {/* ========================================================================= */}
      {activeMainTab === 'milan' && (
        <div className="space-y-10 animate-fade-in">
          {/* Boy & Girl Profile Selection */}
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
                { title: '1. वर्ण कूट (Varna)', data: milanResult.varna, max: 1, info: 'आध्यात्मिक, कार्य व स्वभाव संतुलन' },
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
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: DAILY CHOGHADIYA MUHURAT                                           */}
      {/* ========================================================================= */}
      {activeMainTab === 'choghadiya' && (
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

      {/* ========================================================================= */}
      {/* MODAL 1: DAY DETAILS POPUP MODAL                                          */}
      {/* ========================================================================= */}
      {selectedDay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in"
          onClick={() => setSelectedDay(null)}
        >
          <div
            className="max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Banner */}
            <div className="p-6 bg-gradient-to-r from-[#071A2B] via-[#0B2540] to-[#071A2B] text-white flex items-center justify-between shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#F8D706] font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>दैनिक पंचांग विवरण (Panchang Details)</span>
                </div>
                <h3 className="text-2xl font-extrabold font-serif-luxury text-white">
                  {selectedDay.dayNum} {monthNames[selectedDay.monthNum].nameHindi} {selectedDay.year}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Info */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs sm:text-sm">
              {/* Event Specific Card */}
              {selectedDay.isWeddingMuhurat && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-amber-900">
                    <span>💍</span>
                    <span>शुभ विवाह लग्न (Auspicious Wedding Muhurat)</span>
                  </div>
                  <p className="font-semibold text-xs">
                    लग्न समय: <span className="font-extrabold text-[#111827]">{selectedDay.weddingLaganTime}</span>
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    यह तिथि वर-वधू परिणय संस्कार, शाही वरमाला एवं सात फेरों हेतु शास्त्रीय दृष्टिकोण से अति उत्तम है।
                  </p>
                </div>
              )}

              {selectedDay.festivalName && (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-[#1F74BA]">
                    <Flower2 className="w-4 h-4" />
                    <span>{selectedDay.festivalName}</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    धार्मिक अनुष्ठान, श्रीमद् भागवत कथा, सुंदरकांड पाठ एवं भंडारा आयोजन हेतु पावन अवसर।
                  </p>
                </div>
              )}

              {selectedDay.isGrihaPravesh && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                  <div className="flex items-center gap-2 font-extrabold text-sm text-emerald-700">
                    <HomeIcon className="w-4 h-4" />
                    <span>शुभ गृह प्रवेश एवं वास्तु शांति मुहूर्त</span>
                  </div>
                  <p className="font-semibold text-xs">
                    मुहूर्त बेला: <span className="font-extrabold text-[#111827]">{selectedDay.grihaPraveshTime}</span>
                  </p>
                </div>
              )}

              {/* Panchang Grid Specs */}
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <div>
                  <span className="text-gray-400 text-[11px] block">पक्ष (Paksha):</span>
                  <span className="font-extrabold text-[#111827]">{selectedDay.paksha} पक्ष</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[11px] block">तिथि (Tithi):</span>
                  <span className="font-extrabold text-[#111827]">{selectedDay.tithi.split(' ')[1]}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[11px] block">नक्षत्र (Nakshatra):</span>
                  <span className="font-extrabold text-[#1F74BA]">{selectedDay.nakshatra}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[11px] block">वार (Day):</span>
                  <span className="font-extrabold text-[#111827]">{selectedDay.dayOfWeek}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-gray-200">
                  <span className="text-gray-400 text-[11px] block">अभिजित मुहूर्त (दैनिक):</span>
                  <span className="font-semibold text-gray-800">दोपहर 11:48 से 12:38 तक (सर्वकार्य सिद्धि)</span>
                </div>
              </div>

              {/* Suggested Setup Advice */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-1">
                <span className="text-xs font-extrabold text-[#1F74BA] uppercase tracking-wider block">
                  🎪 शर्माजी टेंट हाउस सुझाव (Tent & Setup Recommendation):
                </span>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  शुभ विवाह लग्न एवं त्योहार की तिथियों पर पंडाल व डीजे की मांग अत्यधिक रहती है। असुविधा से बचने हेतु कम से कम 15-30 दिन पूर्व अपनी बुकिंग सुरक्षित करें।
                </p>
              </div>
            </div>

            {/* Modal Bottom CTAs */}
            <div className="p-5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-center sm:text-left">
                <span className="text-[11px] text-gray-500 font-bold block">तारीख: {selectedDay.dayNum} {monthNames[selectedDay.monthNum].nameHindi} {selectedDay.year}</span>
                <span className="text-xs font-extrabold text-[#111827]">वाटरप्रूफ जर्मन हैंगर व सम्पूर्ण तैयारी</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={`https://wa.me/919229903308?text=${encodeURIComponent(`नमस्ते SharmaG Tent House, मुझे ${selectedDay.dayNum} ${monthNames[selectedDay.monthNum].nameHindi} ${selectedDay.year} (${selectedDay.tithi}) के लिए टेंट, मंडप व डेकोरेशन की बुकिंग करनी है।`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:bg-emerald-500 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp बुकिंग</span>
                </a>

                <Link
                  to={`/quote?date=${selectedDay.date}`}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>कोटेशन बनाएं →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: FULL YEAR SHUBH VIVAH LAGAN SUMMARY                              */}
      {/* ========================================================================= */}
      {showYearSummary && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fade-in"
          onClick={() => setShowYearSummary(false)}
        >
          <div
            className="max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#071A2B] via-[#0B2540] to-[#071A2B] text-white flex items-center justify-between shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#F8D706] font-extrabold uppercase tracking-wider">
                  <Crown className="w-4 h-4" />
                  <span>वार्षिक विवाह लग्न सूची (Shubh Vivah Lagan Summary)</span>
                </div>
                <h3 className="text-2xl font-extrabold font-serif-luxury text-white">
                  वर्ष {selectedYear} के सम्पूर्ण शुभ विवाह सावे ({yearVivahSummary.totalWeddingDates} तारीखें)
                </h3>
              </div>
              <button
                onClick={() => setShowYearSummary(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              {yearVivahSummary.months.map((m, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-base font-extrabold font-serif-luxury text-[#111827] flex items-center gap-2 border-b border-gray-200 pb-2">
                    <span className="w-2 h-2 rounded-full bg-[#F09120]" />
                    <span>{m.monthName} {selectedYear} ({m.dates.length} सावे)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {m.dates.map((d, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1 hover:bg-amber-100/60 transition"
                      >
                        <div className="flex items-center justify-between font-extrabold text-xs text-amber-950">
                          <span>💍 {d.dateStr}</span>
                          <span className="text-[10px] text-gray-500">{d.day}</span>
                        </div>
                        <div className="text-[11px] text-gray-600">
                          नक्षत्र: <span className="font-bold text-[#1F74BA]">{d.nakshatra}</span>
                        </div>
                        <div className="text-[10px] text-gray-500 truncate">
                          {d.lagan}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-5 bg-gray-50 border-t border-gray-200 flex justify-end shrink-0">
              <Link
                to="/quote"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 transition-all"
              >
                <span>विवाह कोटेशन तैयार करें →</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Booking CTA Banner */}
      <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-[#071A2B] via-[#0B2540] to-[#071A2B] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-[#1F74BA]/40 card-hover-lift">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#F8D706] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>अग्रिम तिथि आरक्षण (Advance Date Booking)</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-extrabold font-serif-luxury text-white">
            क्या आपने अपने मांगलिक उत्सव की तिथि चुन ली है?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-normal">
            शुभ तिथियों पर जर्मन हैंगर्स एवं शाही मंडप की अग्रिम बुकिंग तुरंत सुनिश्चित करें।
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <Link
            to="/quote"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all text-center"
          >
            कोटेशन प्लानर खोलें →
          </Link>
          <a
            href="https://wa.me/919229903308"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs transition-all text-center flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>सीधी बात करें</span>
          </a>
        </div>
      </div>
    </div>
  );
};
