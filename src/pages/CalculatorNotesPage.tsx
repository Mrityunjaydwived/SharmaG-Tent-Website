import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  FileText, 
  Ruler, 
  Trash2, 
  Copy, 
  Check, 
  MessageCircle, 
  CheckSquare, 
  Square, 
  Sparkles, 
  ArrowRight,
  Plus
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { id: '1', text: 'विवाह मंडप व वाटरप्रूफ शामियाना बुकिंग', completed: true },
  { id: '2', text: 'वरमाला 3D स्टेज व महाराजा सोफा फाइनल करना', completed: false },
  { id: '3', text: 'बरात डीजे गाड़ी व 3D एलईडी डांस फ्लोर तय करना', completed: false },
  { id: '4', text: 'फेयरी लाइट्स टनल व आतिशबाजी व्यवस्था', completed: false },
  { id: '5', text: 'हलवाई व कैटरिंग फूड स्टॉल हट्स लिस्ट', completed: false },
  { id: '6', text: 'पंडित जी से शुभ मुहूर्त व लग्न पत्रिका', completed: true },
  { id: '7', text: 'जनरेटर (Silent DG Set) व बैकअप पावर', completed: false },
];

export const CalculatorNotesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calc' | 'notes' | 'tentsize'>('calc');

  // Calculator State
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcEquation, setCalcEquation] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  // Notes & Checklist State (Persistent in localStorage)
  const [notesText, setNotesText] = useState<string>(() => {
    try {
      return localStorage.getItem('sharmag_user_notes') || '';
    } catch {
      return '';
    }
  });

  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('sharmag_user_checklist');
      return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST;
    } catch {
      return DEFAULT_CHECKLIST;
    }
  });

  const [newChecklistText, setNewChecklistText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Tent Size Estimator State
  const [estGuests, setEstGuests] = useState<number>(500);
  const [estEventType, setEstEventType] = useState<'seated' | 'dining' | 'luxury'>('dining');

  // Save notes & checklist on change
  useEffect(() => {
    try {
      localStorage.setItem('sharmag_user_notes', notesText);
    } catch {}
  }, [notesText]);

  useEffect(() => {
    try {
      localStorage.setItem('sharmag_user_checklist', JSON.stringify(checklist));
    } catch {}
  }, [checklist]);

  // Calculator Handlers
  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setCalcDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setCalcDisplay(calcDisplay === '0' ? digit : calcDisplay + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setCalcDisplay('0.');
      setWaitingForOperand(false);
    } else if (!calcDisplay.includes('.')) {
      setCalcDisplay(calcDisplay + '.');
    }
  };

  const handleClear = () => {
    setCalcDisplay('0');
    setCalcEquation('');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleBackspace = () => {
    if (calcDisplay.length > 1) {
      setCalcDisplay(calcDisplay.slice(0, -1));
    } else {
      setCalcDisplay('0');
    }
  };

  const performOperation = (nextOp: string) => {
    const inputValue = parseFloat(calcDisplay);

    if (prevValue === null) {
      setPrevValue(inputValue);
      setCalcEquation(`${inputValue} ${nextOp}`);
    } else if (operation) {
      const currentValue = prevValue || 0;
      let newValue = currentValue;

      if (operation === '+') newValue = currentValue + inputValue;
      else if (operation === '-') newValue = currentValue - inputValue;
      else if (operation === '×') newValue = currentValue * inputValue;
      else if (operation === '÷') newValue = inputValue !== 0 ? currentValue / inputValue : 0;
      else if (operation === '%') newValue = (currentValue * inputValue) / 100;

      setCalcDisplay(String(newValue));
      setPrevValue(newValue);
      setCalcEquation(`${newValue} ${nextOp}`);
    }

    setWaitingForOperand(true);
    setOperation(nextOp);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(calcDisplay);
    if (prevValue !== null && operation) {
      let newValue = prevValue;
      if (operation === '+') newValue = prevValue + inputValue;
      else if (operation === '-') newValue = prevValue - inputValue;
      else if (operation === '×') newValue = prevValue * inputValue;
      else if (operation === '÷') newValue = inputValue !== 0 ? prevValue / inputValue : 0;
      else if (operation === '%') newValue = (prevValue * inputValue) / 100;

      setCalcDisplay(String(newValue));
      setCalcEquation(`${prevValue} ${operation} ${inputValue} =`);
      setPrevValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const applyGST = () => {
    const val = parseFloat(calcDisplay) || 0;
    const withGST = val * 1.18;
    setCalcDisplay(String(Math.round(withGST)));
    setCalcEquation(`${val} + 18% GST =`);
    setWaitingForOperand(true);
  };

  const applyAdvance = (pct: number) => {
    const val = parseFloat(calcDisplay) || 0;
    const adv = (val * pct) / 100;
    setCalcDisplay(String(Math.round(adv)));
    setCalcEquation(`${val} का ${pct}% एडवांस =`);
    setWaitingForOperand(true);
  };

  const addCalcToNotes = () => {
    const appendText = `\n• गणना: ${calcEquation} ₹${calcDisplay}`;
    setNotesText((prev) => prev + appendText);
    setActiveTab('notes');
  };

  // Checklist Actions
  const toggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const addChecklistItem = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newChecklistText.trim()) return;
    const newItem: ChecklistItem = {
      id: `task-${Date.now()}`,
      text: newChecklistText.trim(),
      completed: false,
    };
    setChecklist((prev) => [...prev, newItem]);
    setNewChecklistText('');
  };

  const deleteChecklistItem = (id: string) => {
    setChecklist((prev) => prev.filter((item) => item.id !== id));
  };

  const copyAllNotes = () => {
    const fullContent = `📝 SharmaG इवेंट नोट्स व चेकलिस्ट\n\n📌 नोट्स:\n${notesText || 'कोई नोट्स नहीं'}\n\n✅ चेकलिस्ट:\n${checklist.map(c => `${c.completed ? '✓' : '□'} ${c.text}`).join('\n')}`;
    navigator.clipboard.writeText(fullContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const fullContent = `📝 *SharmaG इवेंट नोट्स व चेकलिस्ट*\n\n📌 *नोट्स:*\n${notesText || 'कोई नोट्स नहीं'}\n\n✅ *चेकलिस्ट:*\n${checklist.map(c => `${c.completed ? '✅' : '⬜'} ${c.text}`).join('\n')}`;
    const url = `https://wa.me/?text=${encodeURIComponent(fullContent)}`;
    window.open(url, '_blank');
  };

  // Tent Calculation Logic
  const sqFtPerGuest = estEventType === 'seated' ? 10 : estEventType === 'dining' ? 14 : 18;
  const totalSqFt = estGuests * sqFtPerGuest;
  const suggestedLength = Math.round(Math.sqrt(totalSqFt * 1.5));
  const suggestedWidth = Math.round(totalSqFt / suggestedLength);
  const estChairs = estGuests;
  const estDiningTables = Math.round(estGuests / 8);
  const estSofas = Math.max(4, Math.round(estGuests / 50));

  const addTentEstimateToNotes = () => {
    const appendText = `\n• टेंट अनुमान (${estGuests} मेहमान): ${suggestedWidth}x${suggestedLength} ft (${totalSqFt.toLocaleString()} sq ft), ${estChairs} कुर्सियां, ${estDiningTables} डाइनिंग टेबल्स, ${estSofas} सोफा।`;
    setNotesText((prev) => prev + appendText);
    setActiveTab('notes');
  };

  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 bg-white text-[#111827]">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-[#1F74BA]/25 text-[#1F74BA] text-xs font-extrabold uppercase tracking-wider shadow-xs animate-pulse-glow">
          <Calculator className="w-4 h-4 text-[#F8D706]" />
          <span>इवेंट टूल्स — कैलकुलेटर, पर्सनल नोट्स व टेंट साइज प्लानर</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-luxury leading-tight text-[#111827]">
          <span>अपने उत्सव का हिसाब और </span>
          <span className="gradient-text-gold">चेकलिस्ट तैयार करें</span>
        </h1>

        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          बजट का सटीक हिसाब लगाएं, टेंट का सही क्षेत्रफल जानें और अपनी शादी व मांगलिक आयोजन की संपूर्ण चेकलिस्ट सुरक्षित रखें।
        </p>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex justify-center">
        <div className="p-1.5 rounded-2xl bg-gray-100 border border-gray-200 inline-flex gap-2 max-w-full overflow-x-auto shadow-inner">
          <button
            onClick={() => setActiveTab('calc')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'calc'
                ? 'bg-[#1F74BA] text-white shadow-md'
                : 'text-gray-700 hover:text-[#111827] hover:bg-white/60'
            }`}
          >
            <Calculator className="w-4 h-4 text-[#F8D706]" />
            <span>🧮 डिजिटल कैलकुलेटर (Calculator)</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'notes'
                ? 'bg-[#1F74BA] text-white shadow-md'
                : 'text-gray-700 hover:text-[#111827] hover:bg-white/60'
            }`}
          >
            <FileText className="w-4 h-4 text-[#F8D706]" />
            <span>📝 मेरे नोट्स व शादी चेकलिस्ट (Notes)</span>
          </button>

          <button
            onClick={() => setActiveTab('tentsize')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'tentsize'
                ? 'bg-[#1F74BA] text-white shadow-md'
                : 'text-gray-700 hover:text-[#111827] hover:bg-white/60'
            }`}
          >
            <Ruler className="w-4 h-4 text-[#F8D706]" />
            <span>🎪 टेंट साइज व गेस्ट एस्टीमेटर (Tent Sizer)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DIGITAL CALCULATOR */}
      {activeTab === 'calc' && (
        <div className="max-w-md mx-auto card-hover-lift rounded-3xl p-6 sm:p-8 bg-white border border-gray-200 shadow-xl space-y-4 animate-fade-in">
          {/* LCD Screen */}
          <div className="p-5 rounded-2xl bg-gray-900 text-white font-mono text-right shadow-inner space-y-1">
            <div className="text-xs text-gray-400 min-h-[16px] truncate">
              {calcEquation || ' '}
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#F8D706] truncate">
              ₹ {calcDisplay}
            </div>
          </div>

          {/* Event Quick Shortcuts */}
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={applyGST}
              className="py-2 px-1 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1F74BA] font-extrabold text-xs border border-blue-200 transition"
              title="18% GST जोड़ें"
            >
              +18% GST
            </button>
            <button
              onClick={() => applyAdvance(20)}
              className="py-2 px-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-extrabold text-xs border border-amber-200 transition"
              title="20% बयाना / एडवांस"
            >
              20% एडवांस
            </button>
            <button
              onClick={() => applyAdvance(50)}
              className="py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-extrabold text-xs border border-emerald-200 transition"
              title="50% पेमेंट"
            >
              50% पेमेंट
            </button>
            <button
              onClick={addCalcToNotes}
              className="py-2 px-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-extrabold text-xs border border-purple-200 transition"
              title="इस हिसाब को नोट्स में लिखें"
            >
              📝 सेव नोट्स
            </button>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-4 gap-2.5 font-mono">
            <button
              onClick={handleClear}
              className="py-3.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 font-black text-sm transition"
            >
              C
            </button>
            <button
              onClick={handleBackspace}
              className="py-3.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-black text-sm transition flex items-center justify-center"
            >
              ⌫
            </button>
            <button
              onClick={() => performOperation('%')}
              className="py-3.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-black text-sm transition"
            >
              %
            </button>
            <button
              onClick={() => performOperation('÷')}
              className="py-3.5 rounded-xl bg-[#1F74BA] text-white font-black text-sm hover:bg-[#185e97] transition"
            >
              ÷
            </button>

            {['7', '8', '9'].map((n) => (
              <button
                key={n}
                onClick={() => handleDigit(n)}
                className="py-3.5 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-black text-base border border-gray-200 shadow-2xs transition"
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => performOperation('×')}
              className="py-3.5 rounded-xl bg-[#1F74BA] text-white font-black text-sm hover:bg-[#185e97] transition"
            >
              ×
            </button>

            {['4', '5', '6'].map((n) => (
              <button
                key={n}
                onClick={() => handleDigit(n)}
                className="py-3.5 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-black text-base border border-gray-200 shadow-2xs transition"
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => performOperation('-')}
              className="py-3.5 rounded-xl bg-[#1F74BA] text-white font-black text-sm hover:bg-[#185e97] transition"
            >
              -
            </button>

            {['1', '2', '3'].map((n) => (
              <button
                key={n}
                onClick={() => handleDigit(n)}
                className="py-3.5 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-black text-base border border-gray-200 shadow-2xs transition"
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => performOperation('+')}
              className="py-3.5 rounded-xl bg-[#1F74BA] text-white font-black text-sm hover:bg-[#185e97] transition"
            >
              +
            </button>

            <button
              onClick={() => handleDigit('0')}
              className="py-3.5 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-black text-base border border-gray-200 shadow-2xs transition"
            >
              0
            </button>
            <button
              onClick={() => handleDigit('00')}
              className="py-3.5 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-black text-xs border border-gray-200 shadow-2xs transition"
            >
              00
            </button>
            <button
              onClick={handleDecimal}
              className="py-3.5 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-black text-base border border-gray-200 shadow-2xs transition"
            >
              .
            </button>
            <button
              onClick={handleEquals}
              className="py-3.5 rounded-xl bg-gradient-to-r from-[#F8D706] to-[#F09120] text-black font-black text-base shadow-sm hover:scale-102 transition"
            >
              =
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: USER NOTES & EVENT CHECKLIST */}
      {activeTab === 'notes' && (
        <div className="max-w-2xl mx-auto card-hover-lift rounded-3xl p-6 sm:p-8 bg-white border border-gray-200 shadow-xl space-y-6 animate-fade-in">
          {/* Header & Quick Action Buttons */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-black font-serif-luxury text-[#111827]">
                पर्सनल इवेंट डायरी व चेकलिस्ट
              </h3>
              <p className="text-[11px] text-gray-500">
                🔒 आपके सभी नोट्स आपके डिवाइस में ऑटो-सेव रहते हैं
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyAllNotes}
                className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center gap-1.5"
                title="सभी नोट्स कॉपी करें"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'कॉपी हुआ' : 'कॉपी करें'}</span>
              </button>

              <button
                onClick={shareOnWhatsApp}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1.5 border border-emerald-200"
                title="WhatsApp पर शेयर करें"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Notes Freeform Scratchpad */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-gray-700 block">
              📝 बजट व ज़रूरी बातें (Personal Scratchpad):
            </label>
            <textarea
              rows={5}
              placeholder="यहां अपने खर्चे, मेहमानों के नाम, हलवाई का हिसाब या ज़रूरी फोन नंबर लिखें..."
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              className="w-full p-4 rounded-2xl bg-amber-50/40 border border-amber-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none transition leading-relaxed"
            />
          </div>

          {/* Wedding / Event Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-gray-700 block">
                ✅ शादी व आयोजन तैयारी चेकलिस्ट:
              </span>
              <span className="text-xs font-bold text-[#1F74BA]">
                {checklist.filter(c => c.completed).length} / {checklist.length} पूर्ण
              </span>
            </div>

            {/* Add new task input */}
            <form onSubmit={addChecklistItem} className="flex gap-2">
              <input
                type="text"
                placeholder="नई तैयारी जोड़ें (उदा: फल व माला व्यवस्था)..."
                value={newChecklistText}
                onChange={(e) => setNewChecklistText(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:border-[#1F74BA] focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#1F74BA] text-white font-black text-xs hover:bg-[#185e97]"
              >
                + जोड़ें
              </button>
            </form>

            {/* Checklist items */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 text-xs ${
                    item.completed
                      ? 'bg-emerald-50/60 border-emerald-200 text-gray-500 line-through'
                      : 'bg-white border-gray-200 text-[#111827] hover:border-[#1F74BA]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {item.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                    <span className="truncate">{item.text}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChecklistItem(item.id);
                    }}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TENT SIZE & GUEST ESTIMATOR */}
      {activeTab === 'tentsize' && (
        <div className="max-w-2xl mx-auto card-hover-lift rounded-3xl p-6 sm:p-8 bg-white border border-gray-200 shadow-xl space-y-6 animate-fade-in">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-black font-serif-luxury text-[#111827]">
              🎪 टेंट साइज एवं गेस्ट क्षमता कैलकुलेटर
            </h3>
            <p className="text-xs text-gray-500">
              मेहमानों की संख्या डालें और टेंट का सही आकार (Sq. Ft.), लंबाई x चौड़ाई व कुर्सियों का अनुमान जानें:
            </p>
          </div>

          {/* Guest Count Slider */}
          <div className="space-y-2 p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700">
              <span>मेहमानों की संख्या (Guests):</span>
              <span className="text-base font-black text-[#1F74BA]">{estGuests} लोग</span>
            </div>
            <input
              type="range"
              min="50"
              max="2500"
              step="50"
              value={estGuests}
              onChange={(e) => setEstGuests(Number(e.target.value))}
              className="w-full accent-[#1F74BA] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-bold text-gray-400">
              <span>50</span>
              <span>500</span>
              <span>1000</span>
              <span>2500+</span>
            </div>
          </div>

          {/* Seating Style Selector */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-700 block">आयोजन व्यवस्था प्रकार:</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setEstEventType('seated')}
                className={`p-2.5 rounded-xl text-center text-xs font-bold border transition ${
                  estEventType === 'seated'
                    ? 'border-[#1F74BA] bg-blue-50 text-[#1F74BA]'
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                केवल बैठक
              </button>
              <button
                onClick={() => setEstEventType('dining')}
                className={`p-2.5 rounded-xl text-center text-xs font-bold border transition ${
                  estEventType === 'dining'
                    ? 'border-[#1F74BA] bg-blue-50 text-[#1F74BA]'
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                स्टेज + भोजन
              </button>
              <button
                onClick={() => setEstEventType('luxury')}
                className={`p-2.5 rounded-xl text-center text-xs font-bold border transition ${
                  estEventType === 'luxury'
                    ? 'border-[#1F74BA] bg-blue-50 text-[#1F74BA]'
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                शाही हैंगर
              </button>
            </div>
          </div>

          {/* Results Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-blue-50 border border-gray-200 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-black text-gray-700">अनुशंसित टेंट एरिया:</span>
              <span className="font-black text-lg text-[#1F74BA]">
                {totalSqFt.toLocaleString()} Sq. Ft.
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-600">सुझावित आकार:</span>
              <span className="font-extrabold text-amber-900 text-sm">
                {suggestedWidth} x {suggestedLength} फीट
              </span>
            </div>
            <div className="pt-3 border-t border-gray-200 grid grid-cols-3 gap-2 text-center text-xs font-bold">
              <div className="p-2 rounded-xl bg-white border border-gray-100 shadow-2xs">
                <span className="block text-gray-400 text-[10px]">कुर्सियां</span>
                <span className="text-[#1F74BA] font-black">{estChairs}</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-gray-100 shadow-2xs">
                <span className="block text-gray-400 text-[10px]">राउंड टेबल</span>
                <span className="text-[#1F74BA] font-black">{estDiningTables}</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-gray-100 shadow-2xs">
                <span className="block text-gray-400 text-[10px]">रॉयल सोफा</span>
                <span className="text-[#1F74BA] font-black">{estSofas} सेट</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={addTentEstimateToNotes}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F8D706] to-[#F09120] text-black font-black text-xs shadow-md hover:scale-102 transition flex items-center justify-center gap-2"
          >
            <span>📝 इस गणना को अपने पर्सनल नोट्स में जोड़ें</span>
          </button>
        </div>
      )}
    </div>
  );
};
