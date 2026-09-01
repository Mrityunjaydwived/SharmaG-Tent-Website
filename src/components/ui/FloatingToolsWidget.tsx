import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  FileText, 
  X, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Share2, 
  MessageCircle, 
  Sparkles, 
  RotateCcw, 
  CheckSquare, 
  Square, 
  Save, 
  Users, 
  Ruler, 
  Percent, 
  Divide, 
  X as Multiply, 
  Minus, 
  Equal, 
  Delete
} from 'lucide-react';
import { BusinessSettings } from '../../types';

interface FloatingToolsWidgetProps {
  settings?: BusinessSettings | null;
}

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

export const FloatingToolsWidget: React.FC<FloatingToolsWidgetProps> = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
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
  const [estGuests, setEstGuests] = useState<number>(300);
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

  // Calculator Logic
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
    <>
      {/* Floating Action Trigger Button in Bottom Right Corner */}
      <aside
        aria-label="Event Calculator & Notes Tools"
        className="fixed bottom-6 right-6 z-40 flex items-center group"
      >
        {/* Hover Pill Label */}
        <div
          onClick={() => setIsOpen(true)}
          className="hidden md:flex items-center mr-3 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#1F74BA]/30 text-xs font-extrabold text-[#111827] shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 cursor-pointer"
        >
          <Calculator className="w-3.5 h-3.5 text-[#1F74BA] mr-1.5" />
          <span>🧮 कैलकुलेटर व नोट्स (Calculator & Notes)</span>
        </div>

        {/* Floating Orb Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-15 h-15 rounded-full bg-gradient-to-tr from-[#1F74BA] via-[#0B4F8A] to-[#F09120] flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/80 relative"
          aria-label="Open Calculator & Notes"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#F8D706] rounded-full border-2 border-black animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#F8D706] rounded-full border-2 border-black" />

          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-0.5">
                <Calculator className="w-4 h-4 text-[#F8D706]" />
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-[7.5px] font-black uppercase text-[#F8D706] tracking-tighter">
                Tools
              </span>
            </div>
          )}
        </button>
      </aside>

      {/* Popover / Window Modal for Calculator & Notes */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 w-full sm:max-w-md h-[90vh] sm:h-[580px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-200/90 flex flex-col overflow-hidden animate-fade-in text-[#111827]">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#071A2B] via-[#0B2540] to-[#071A2B] text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#1F74BA] to-[#F8D706] text-black flex items-center justify-center font-black">
                <Calculator className="w-4 h-4 text-black" />
              </div>
              <div>
                <h3 className="text-sm font-black font-serif-luxury text-white">
                  इवेंट कैलकुलेटर व नोट्स (Tools)
                </h3>
                <p className="text-[10px] text-gray-300">
                  बजट हिसाब, टेंट साइज व पर्सनल शादी चेकलिस्ट
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 bg-gray-50 px-3 pt-2 gap-1.5 shrink-0">
            <button
              onClick={() => setActiveTab('calc')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-xs font-black transition ${
                activeTab === 'calc'
                  ? 'bg-white text-[#1F74BA] border-t border-x border-gray-200 shadow-xs'
                  : 'text-gray-600 hover:text-[#111827]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>कैलकुलेटर</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-xs font-black transition ${
                activeTab === 'notes'
                  ? 'bg-white text-[#1F74BA] border-t border-x border-gray-200 shadow-xs'
                  : 'text-gray-600 hover:text-[#111827]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>नोट्स व चेकलिस्ट</span>
            </button>

            <button
              onClick={() => setActiveTab('tentsize')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-xs font-black transition ${
                activeTab === 'tentsize'
                  ? 'bg-white text-[#1F74BA] border-t border-x border-gray-200 shadow-xs'
                  : 'text-gray-600 hover:text-[#111827]'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>टेंट साइज</span>
            </button>
          </div>

          {/* TAB 1: CALCULATOR */}
          {activeTab === 'calc' && (
            <div className="flex-1 flex flex-col p-4 justify-between bg-gray-50/50 overflow-y-auto">
              {/* LCD Display */}
              <div className="p-4 rounded-2xl bg-gray-900 text-white font-mono text-right shadow-inner space-y-1">
                <div className="text-[11px] text-gray-400 min-h-[16px] truncate">
                  {calcEquation || ' '}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#F8D706] truncate">
                  ₹ {calcDisplay}
                </div>
              </div>

              {/* Event Fast Formula Shortcuts */}
              <div className="grid grid-cols-4 gap-1.5 my-2">
                <button
                  onClick={applyGST}
                  className="py-1.5 px-1 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1F74BA] font-extrabold text-[10px] border border-blue-200"
                  title="18% GST जोड़ें"
                >
                  +18% GST
                </button>
                <button
                  onClick={() => applyAdvance(20)}
                  className="py-1.5 px-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-extrabold text-[10px] border border-amber-200"
                  title="20% बयाना / एडवांस"
                >
                  20% एडवांस
                </button>
                <button
                  onClick={() => applyAdvance(50)}
                  className="py-1.5 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-extrabold text-[10px] border border-emerald-200"
                  title="50% पेमेंट"
                >
                  50% पेमेंट
                </button>
                <button
                  onClick={addCalcToNotes}
                  className="py-1.5 px-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-extrabold text-[10px] border border-purple-200"
                  title="इस हिसाब को नोट्स में लिखें"
                >
                  📝 सेव नोट्स
                </button>
              </div>

              {/* Standard Keypad Grid */}
              <div className="grid grid-cols-4 gap-2 font-mono">
                <button
                  onClick={handleClear}
                  className="py-3 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 font-black text-sm transition"
                >
                  C
                </button>
                <button
                  onClick={handleBackspace}
                  className="py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-black text-sm transition flex items-center justify-center"
                >
                  ⌫
                </button>
                <button
                  onClick={() => performOperation('%')}
                  className="py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-black text-sm transition"
                >
                  %
                </button>
                <button
                  onClick={() => performOperation('÷')}
                  className="py-3 rounded-xl bg-[#1F74BA] text-white font-black text-sm hover:bg-[#185e97] transition"
                >
                  ÷
                </button>

                {['7', '8', '9'].map((n) => (
                  <button
                    key={n}
                    onClick={() => handleDigit(n)}
                    className="py-3 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-black text-base border border-gray-200 shadow-2xs transition"
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => performOperation('×')}
                  className="py-3 rounded-xl bg-[#1F74BA] text-white font-black text-sm hover:bg-[#185e97] transition"
                >
                  ×
                </button>

                {['4', '5', '6'].map((n) => (
                  <button
                    key={n}
                    onClick={() => handleDigit(n)}
                    className="py-3 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-black text-base border border-gray-200 shadow-2xs transition"
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => performOperation('-')}
                  className="py-3 rounded-xl bg-[#1F74BA] text-white font-black text-sm hover:bg-[#185e97] transition"
                >
                  -
                </button>

                {['1', '2', '3'].map((n) => (
                  <button
                    key={n}
                    onClick={() => handleDigit(n)}
                    className="py-3 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-black text-base border border-gray-200 shadow-2xs transition"
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => performOperation('+')}
                  className="py-3 rounded-xl bg-[#1F74BA] text-white font-black text-sm hover:bg-[#185e97] transition"
                >
                  +
                </button>

                <button
                  onClick={() => handleDigit('0')}
                  className="py-3 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-black text-base border border-gray-200 shadow-2xs transition"
                >
                  0
                </button>
                <button
                  onClick={() => handleDigit('00')}
                  className="py-3 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-black text-xs border border-gray-200 shadow-2xs transition"
                >
                  00
                </button>
                <button
                  onClick={handleDecimal}
                  className="py-3 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-black text-base border border-gray-200 shadow-2xs transition"
                >
                  .
                </button>
                <button
                  onClick={handleEquals}
                  className="py-3 rounded-xl bg-gradient-to-r from-[#F8D706] to-[#F09120] text-black font-black text-base shadow-sm hover:scale-102 transition"
                >
                  =
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: USER NOTES & EVENT CHECKLIST */}
          {activeTab === 'notes' && (
            <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
              {/* Quick Actions Top Bar */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-gray-700">
                  पर्सनल इवेंट डायरी व चेकलिस्ट
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={copyAllNotes}
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center gap-1"
                    title="सभी नोट्स कॉपी करें"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">{isCopied ? 'कॉपी हुआ' : 'कॉपी'}</span>
                  </button>

                  <button
                    onClick={shareOnWhatsApp}
                    className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1 border border-emerald-200"
                    title="WhatsApp पर शेयर करें"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span className="text-[10px]">WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Freeform Notes Scratchpad */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500 block">
                  📝 बजट व ज़रूरी बातें (Auto-saved):
                </label>
                <textarea
                  rows={4}
                  placeholder="यहां अपने खर्चे, मेहमानों के नाम, हलवाई का हिसाब या ज़रूरी नंबर लिखें..."
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-amber-50/40 border border-amber-200 text-xs text-[#111827] focus:bg-white focus:border-[#1F74BA] focus:outline-none transition leading-relaxed"
                />
              </div>

              {/* Wedding / Event Checklist */}
              <div className="space-y-2">
                <span className="text-[11px] font-black text-gray-700 block">
                  ✅ आयोजन तैयारी चेकलिस्ट ({checklist.filter(c => c.completed).length}/{checklist.length}):
                </span>

                {/* Add new task input */}
                <form onSubmit={addChecklistItem} className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="नई तैयारी जोड़ें (उदा: फल व माला व्यवस्था)..."
                    value={newChecklistText}
                    onChange={(e) => setNewChecklistText(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:bg-white focus:border-[#1F74BA] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-[#1F74BA] text-white font-black text-xs hover:bg-[#185e97]"
                  >
                    + जोड़ें
                  </button>
                </form>

                {/* Checklist items list */}
                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklist(item.id)}
                      className={`p-2 rounded-xl border transition cursor-pointer flex items-center justify-between gap-2 text-xs ${
                        item.completed
                          ? 'bg-emerald-50/60 border-emerald-200 text-gray-500 line-through'
                          : 'bg-white border-gray-200 text-[#111827] hover:border-[#1F74BA]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
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
                        className="text-gray-400 hover:text-red-500 p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TENT SIZE & GUEST ESTIMATOR */}
          {activeTab === 'tentsize' && (
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-700">
                  🎪 टेंट साइज व क्षमता कैलकुलेटर
                </h4>
                <p className="text-[11px] text-gray-500">
                  मेहमानों की संख्या डालें, टेंट का सही आकार तुरंत जानें:
                </p>
              </div>

              {/* Guest Count Slider / Buttons */}
              <div className="space-y-2 p-3 rounded-2xl bg-blue-50/60 border border-blue-200/80">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                  <span>मेहमानों की संख्या:</span>
                  <span className="text-sm font-black text-[#1F74BA]">{estGuests} लोग</span>
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
                <div className="flex justify-between text-[9px] font-bold text-gray-400">
                  <span>50</span>
                  <span>500</span>
                  <span>1000</span>
                  <span>2500+</span>
                </div>
              </div>

              {/* Seating Style Options */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-gray-700 block">आयोजन व्यवस्था प्रकार:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setEstEventType('seated')}
                    className={`p-2 rounded-xl text-center text-xs font-bold border transition ${
                      estEventType === 'seated'
                        ? 'border-[#1F74BA] bg-blue-50 text-[#1F74BA]'
                        : 'border-gray-200 bg-white text-gray-700'
                    }`}
                  >
                    केवल बैठक
                  </button>
                  <button
                    onClick={() => setEstEventType('dining')}
                    className={`p-2 rounded-xl text-center text-xs font-bold border transition ${
                      estEventType === 'dining'
                        ? 'border-[#1F74BA] bg-blue-50 text-[#1F74BA]'
                        : 'border-gray-200 bg-white text-gray-700'
                    }`}
                  >
                    स्टेज + भोजन
                  </button>
                  <button
                    onClick={() => setEstEventType('luxury')}
                    className={`p-2 rounded-xl text-center text-xs font-bold border transition ${
                      estEventType === 'luxury'
                        ? 'border-[#1F74BA] bg-blue-50 text-[#1F74BA]'
                        : 'border-gray-200 bg-white text-gray-700'
                    }`}
                  >
                    शाही हैंगर
                  </button>
                </div>
              </div>

              {/* Output Results Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-blue-50 border border-gray-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-black text-gray-700">अनुशंसित टेंट एरिया:</span>
                  <span className="font-black text-base text-[#1F74BA]">
                    {totalSqFt.toLocaleString()} Sq. Ft.
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-600">सुझावित आकार:</span>
                  <span className="font-extrabold text-amber-900">
                    {suggestedWidth} x {suggestedLength} फीट
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200 grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
                  <div className="p-1.5 rounded-lg bg-white border border-gray-100">
                    <span className="block text-gray-400">कुर्सियां</span>
                    <span className="text-[#1F74BA] font-black">{estChairs}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-gray-100">
                    <span className="block text-gray-400">राउंड टेबल</span>
                    <span className="text-[#1F74BA] font-black">{estDiningTables}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-gray-100">
                    <span className="block text-gray-400">रॉयल सोफा</span>
                    <span className="text-[#1F74BA] font-black">{estSofas} सेट</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={addTentEstimateToNotes}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#F8D706] to-[#F09120] text-black font-black text-xs shadow-xs hover:scale-102 transition flex items-center justify-center gap-1.5"
              >
                <span>📝 इस गणना को अपने नोट्स में जोड़ें</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
