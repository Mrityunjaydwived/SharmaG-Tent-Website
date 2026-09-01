import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  Users, 
  Check, 
  Crown, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Tent, 
  Armchair, 
  Flower2, 
  Lightbulb, 
  Disc,
  IndianRupee,
  ShieldCheck, 
  Truck, 
  Flame,
  UtensilsCrossed
} from 'lucide-react';
import { dataService } from '../lib/dataService';
import { sendNotificationEmail, getWhatsAppUrl, getPhoneUrl } from '../lib/notificationService';

export const Quote: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Form State
  const [eventType, setEventType] = useState('Weddings');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [guestCount, setGuestCount] = useState('500 - 800 Guests');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Royal Tent & Shamiana Structure',
    'Stage & Mandap Floral Decoration',
  ]);
  const [budgetRange, setBudgetRange] = useState('₹50,000 - ₹1,00,000 (पारिवारिक पार्टी / सगाई / रिंग सेरेमनी)');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const serviceOptions = [
    { id: 'tent', name: 'Royal Tent & Shamiana Structure', icon: Tent, desc: 'वाटरप्रूफ जर्मन हैंगर, शामियाना, कारपेटिंग व वीआईपी लाउंज' },
    { id: 'decor', name: 'Stage & Mandap Floral Decoration', icon: Flower2, desc: '3D नक्काशीदार स्टेज, फूलों का मंडप, भव्य प्रवेश द्वार' },
    { id: 'foodstalls', name: 'रॉयल फूड स्टॉल्स व बफे इंफ्रास्ट्रक्चर (Food Stalls & Counters)', icon: UtensilsCrossed, desc: 'विंटेज थीम फूड स्टॉल हट्स, लाइव चाट/मॉकटेल काउंटर्स, बफे डिशेस व डाइनिंग कैनोपी' },
    { id: 'djcar', name: 'बरात डीजे गाड़ी (DJ Sound Vehicle)', icon: Truck, desc: 'हाई-बास RCF साउंड, शार्पी मूविंग हेड्स व जनरेटर युक्त बरात रथ' },
    { id: 'roadlights', name: 'फैंसी रोड लाइट व बाराती छतरी', icon: Lightbulb, desc: 'सड़क के दोनों ओर जगमगाते एलईडी पिलर्स व बाराती लाइट छतरी' },
    { id: 'fireworks', name: 'शाही आतिशबाजी व स्टेज पायरो (Fireworks)', icon: Flame, desc: 'गगनचुंबी स्काई शॉट्स, वरमाला कोल्ड पायरो व रंगीन धुआं' },
    { id: 'seating', name: 'Seating & Infrastructure', icon: Armchair, desc: 'महाराजा सोफा, बैंक्वेट कुर्सियां, वीआईपी राउंड टेबल' },
    { id: 'sound', name: 'Concert Sound & LED Dance Floor', icon: Disc, desc: 'लाइन ऐरे साउंड, 3D इन्फिनिटी डांस फ्लोर व स्टेज डीजे' },
  ];

  const guestCountOptions = [
    'Under 200 Guests (Intimate)',
    '200 - 500 Guests (Medium)',
    '500 - 1,000 Guests (Grand)',
    '1,000 - 3,000 Guests (Royal)',
    '3,000+ Guests (Massive Gathering)',
  ];

  const budgetOptions = [
    '₹20,000 - ₹50,000 (छोटे उत्सव / बर्थडे / पूजा)',
    '₹50,000 - ₹1,00,000 (पारिवारिक पार्टी / सगाई / रिंग सेरेमनी)',
    '₹1,00,000 - ₹3,00,000 (मीडियम इवेंट / हल्दी-मेहंदी / कथा)',
    '₹3,00,000 - ₹5,00,000 (विवाह एवं रिसेप्शन समारोह)',
    '₹5,00,000 - ₹10,00,000 (भव्य शाही विवाह आयोजन)',
    '₹10,00,000 - ₹25,00,000 (विशाल जर्मन हैंगर व लग्जरी डेकोर)',
    '₹25,00,000+ (अल्ट्रा लग्जरी रॉयल उत्सव)',
  ];

  const toggleService = (name: string) => {
    if (selectedServices.includes(name)) {
      setSelectedServices(selectedServices.filter((s) => s !== name));
    } else {
      setSelectedServices([...selectedServices, name]);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    setIsSubmitting(true);
    try {
      await dataService.submitEnquiry({
        customer_name: customerName,
        phone,
        email: email || 'N/A',
        event_type: eventType,
        event_date: eventDate || 'तय होनी बाकी है',
        event_location: eventLocation || 'त्योंथर / रीवा / निकटवर्ती क्षेत्र',
        guest_count: guestCount,
        required_services: selectedServices,
        budget_range: budgetRange,
        message,
        status: 'New',
        admin_notes: 'Submitted via Interactive Quote Planner',
      });

      // Dispatch direct email notification to owner email (dwivedibandhavesh@gmail.com) via FormSubmit
      await sendNotificationEmail({
        subject: `💰 नया कोटेशन अनुरोध: ${customerName} (${phone}) - ${eventType}`,
        name: customerName,
        phone: phone,
        email: email,
        eventType: eventType,
        date: eventDate,
        location: eventLocation,
        guests: guestCount,
        services: selectedServices.join(', '),
        budget: budgetRange,
        message: message,
        source: 'कोटेशन विज़ार्ड (Instant Quote Planner)',
      });

      setIsComplete(true);
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FAF8F5', '#E2C366', '#AA7C11'],
        });
      } catch {
        // Safe fallback
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 bg-white text-[#111827]">
      {/* Header Banner with Color Palettes & Hindi Typography */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 via-amber-50 to-blue-50 border border-[#1F74BA]/25 text-[#1F74BA] text-xs font-extrabold uppercase tracking-wider shadow-xs animate-pulse-glow">
          <Crown className="w-3.5 h-3.5 text-[#F8D706]" />
          <span>इवेंट प्लानर एवं पारदर्शी कोटेशन (Instant Quote Planner)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif-luxury leading-tight text-[#111827]">
          <span>अपने कार्यक्रम का अनुमानित खर्च और </span>
          <span className="gradient-text-gold">शाही योजना बनाएं</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal max-w-2xl mx-auto">
          टेंट, मंडप, सजावट, सोफा और लाइटिंग की जरूरतें चुनें और अपने बजट के अनुसार <span className="font-semibold text-[#1F74BA]">तुरंत सटीक कोटेशन</span> प्राप्त करें।
        </p>
      </div>

      {/* Progress Steps Indicator */}
      {!isComplete && (
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { num: 1, label: 'उत्सव एवं तारीख' },
            { num: 2, label: 'मेहमान व स्थल' },
            { num: 3, label: 'टेंट व सुविधाएं' },
            { num: 4, label: 'बजट व संपर्क' },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => step > s.num && setStep(s.num)}
              className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                step === s.num
                  ? 'bg-gradient-to-r from-[#1F74BA] to-[#0B4F8A] text-white border-[#1F74BA] font-extrabold shadow-md scale-102 ring-2 ring-[#1F74BA]/20'
                  : step > s.num
                  ? 'bg-blue-50 border-[#1F74BA]/30 text-[#1F74BA] font-bold hover:bg-blue-100/70'
                  : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider font-extrabold flex items-center justify-center gap-1">
                {step > s.num && <CheckCircle2 className="w-3 h-3 text-[#1F74BA]" />}
                <span>चरण 0{s.num}</span>
              </div>
              <div className="hidden sm:block font-bold mt-1 truncate text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Wizard Card */}
      <div className="card-hover-lift rounded-3xl p-6 sm:p-10 border border-gray-200/90 bg-white shadow-xl">
        {isComplete ? (
          /* Confirmation Screen */
          <div className="text-center py-10 space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-300 shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-luxury text-[#111827]">
                आपकी योजना सफलतापूर्वक दर्ज हो गई!
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto leading-relaxed font-normal">
                धन्यवाद, <span className="text-[#1F74BA] font-extrabold">{customerName}</span> जी। आपके <span className="text-[#111827] font-bold">{eventType}</span> आयोजन का विवरण हमारे पास पहुँच चुका है।
              </p>
            </div>

            {/* Summary Ticket */}
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-br from-blue-50/40 via-white to-amber-50/20 border border-gray-200 text-left text-xs sm:text-sm space-y-2.5 text-gray-700 shadow-sm">
              <div className="flex justify-between border-b border-gray-200/80 pb-2">
                <span className="text-gray-500 font-medium">कार्यक्रम का प्रकार:</span>
                <span className="font-extrabold text-[#111827]">{eventType}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200/80 pb-2">
                <span className="text-gray-500 font-medium">मेहमानों की संख्या:</span>
                <span className="font-extrabold text-[#111827]">{guestCount}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200/80 pb-2">
                <span className="text-gray-500 font-medium">अनुमानित बजट:</span>
                <span className="font-extrabold text-[#1F74BA]">{budgetRange}</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-gray-500 font-medium">संपर्क नंबर:</span>
                <span className="font-extrabold text-[#111827]">{phone}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/919229903308?text=${encodeURIComponent(
                  `नमस्ते प्रदीप शर्मा जी (शर्माजी टेंट हाउस),\n\nमैंने वेबसाइट से कोटेशन अनुरोध भेजा है:\n• नाम: ${customerName}\n• फोन: ${phone}\n• कार्यक्रम: ${eventType}\n• मेहमान: ${guestCount}\n• अनुमानित बजट: ${budgetRange}\n• स्थान: ${eventLocation || 'त्योंथर/रीवा'}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>WhatsApp पर भी कन्फर्मेशन भेजें (+91 9229903308) →</span>
              </a>
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all text-center"
              >
                मुख्य पृष्ठ पर जाएं (Home)
              </Link>
            </div>
          </div>
        ) : (
          /* Steps 1 to 4 */
          <div className="space-y-8">
            {/* Step 1: Event Type & Date */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-[#1F74BA] uppercase tracking-wider block">
                    प्रारंभिक विवरण
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
                    चरण 1: कार्यक्रम का प्रकार और तारीख चुनें
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-normal">
                    आप किस प्रकार के शुभ कार्य के लिए टेंट और सजावट की व्यवस्था करना चाहते हैं?
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  {[
                    { id: 'Weddings', label: 'शुभ विवाह (Wedding)' },
                    { id: 'Religious Events', label: 'भागवत कथा / जागरण' },
                    { id: 'Parties & Celebrations', label: 'सगाई एवं पारिवारिक पार्टी' },
                    { id: 'Corporate Events', label: 'कॉर्पोरेट कार्यक्रम' },
                    { id: 'Political Events', label: 'विशाल जनसभा एवं रैली' },
                    { id: 'Festivals', label: 'त्योहार एवं उत्सव' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setEventType(cat.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between hover:scale-102 ${
                        eventType === cat.id
                          ? 'bg-gradient-to-br from-blue-50 to-amber-50/40 border-[#1F74BA] text-[#1F74BA] font-extrabold shadow-md ring-2 ring-[#1F74BA]/20'
                          : 'bg-white border-gray-200/90 text-gray-700 hover:border-[#1F74BA]/40'
                      }`}
                    >
                      <Crown className={`w-4 h-4 mb-2.5 ${eventType === cat.id ? 'text-[#1F74BA]' : 'text-gray-400'}`} />
                      <span className="text-xs font-extrabold">{cat.label}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs text-gray-700 font-extrabold">शुभ आयोजन की संभावित तारीख (Event Date)</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50/80 border border-gray-200 text-[#111827] focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none text-sm transition-all"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>अगला: मेहमान एवं स्थल (Next) →</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Capacity & Venue */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-[#1F74BA] uppercase tracking-wider block">
                    आकार व क्षमता
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
                    चरण 2: मेहमानों की संख्या एवं आयोजन स्थल
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-normal">
                    इससे हमारे इंजीनियर टेंट का वर्ग फीट, खंभों की दूरी और सुरक्षा निकास की सही माप तय करते हैं।
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-700 font-extrabold">अनुमानित मेहमानों की संख्या (Guest Count)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {guestCountOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setGuestCount(opt)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all duration-200 flex items-center justify-between hover:scale-101 ${
                          guestCount === opt
                            ? 'bg-gradient-to-br from-blue-50 to-amber-50/40 border-[#1F74BA] text-[#1F74BA] font-extrabold shadow-sm ring-2 ring-[#1F74BA]/20'
                            : 'bg-white border-gray-200/90 text-gray-700 hover:border-[#1F74BA]/40'
                        }`}
                      >
                        <span className="flex items-center gap-2 font-bold">
                          <Users className="w-3.5 h-3.5 text-[#1F74BA]" />
                          {opt}
                        </span>
                        {guestCount === opt && <Check className="w-4 h-4 text-[#1F74BA]" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs text-gray-700 font-extrabold">स्थल का नाम / पता / विवरण (Venue Location)</label>
                  <input
                    type="text"
                    placeholder="उदा. शांति वाटिका, मुख्य रिंग रोड या निजी फार्म हाउस"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50/80 border border-gray-200 text-[#111827] focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none text-sm transition-all"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 text-xs font-extrabold hover:bg-gray-200 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>पीछे जाएं (Back)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>अगला: आवश्यक सुविधाएं (Next) →</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Required Services */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-[#1F74BA] uppercase tracking-wider block">
                    सुविधा चयन
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
                    चरण 3: आवश्यक टेंट एवं सजावट सामग्री चुनें
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-normal">
                    अपनी आवश्यकता के अनुसार सभी आवश्यक सुविधाएँ चुनिए:
                  </p>
                </div>

                <div className="space-y-3">
                  {serviceOptions.map((srv) => {
                    const isChecked = selectedServices.includes(srv.name);
                    const Icon = srv.icon;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => toggleService(srv.name)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between hover:scale-101 ${
                          isChecked
                            ? 'bg-gradient-to-br from-blue-50/90 to-amber-50/30 border-[#1F74BA] shadow-sm ring-1 ring-[#1F74BA]/30'
                            : 'bg-white border-gray-200/90 hover:border-[#1F74BA]/40'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-xs ${
                            isChecked ? 'bg-gradient-to-tr from-[#1F74BA] to-[#0B4F8A] text-white' : 'bg-gray-100 text-gray-500'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className={`text-sm font-extrabold ${isChecked ? 'text-[#1F74BA]' : 'text-[#111827]'}`}>
                              {srv.name}
                            </h4>
                            <p className="text-xs text-gray-600 font-normal">{srv.desc}</p>
                          </div>
                        </div>

                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                          isChecked ? 'bg-[#1F74BA] border-[#1F74BA] text-white' : 'border-gray-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-4 h-4" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 text-xs font-extrabold hover:bg-gray-200 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>पीछे जाएं (Back)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>अगला: बजट व विवरण (Next) →</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Budget & Contact */}
            {step === 4 && (
              <form onSubmit={handleFinalSubmit} className="space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-[#1F74BA] uppercase tracking-wider block">
                    अंतिम चरण
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
                    चरण 4: बजट एवं आपका संपर्क विवरण
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-normal">
                    हम आपके बजट के अनुकूल पारदर्शी कोटेशन और 3D लेआउट तैयार करके आपको भेजेंगे।
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-700 font-extrabold">अनुमानित बजट सीमा (Estimated Budget)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {budgetOptions.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudgetRange(b)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all duration-200 flex items-center justify-between hover:scale-101 ${
                          budgetRange === b
                            ? 'bg-gradient-to-br from-blue-50 to-amber-50/40 border-[#1F74BA] text-[#1F74BA] font-extrabold shadow-sm ring-2 ring-[#1F74BA]/20'
                            : 'bg-white border-gray-200/90 text-gray-700 hover:border-[#1F74BA]/40'
                        }`}
                      >
                        <span className="flex items-center gap-1.5 font-bold">
                          <IndianRupee className="w-3.5 h-3.5 text-[#1F74BA]" />
                          {b}
                        </span>
                        {budgetRange === b && <Check className="w-3.5 h-3.5 text-[#1F74BA]" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-700 font-extrabold">आपका पूरा नाम (Your Name) *</label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. राजेश शर्मा"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 text-[#111827] text-sm focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-700 font-extrabold">मोबाइल नंबर (Phone Number) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="उदा. 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 text-[#111827] text-sm focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-700 font-extrabold">ईमेल (Email Address - ऐच्छिक)</label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 text-[#111827] text-sm focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-700 font-extrabold">विशेष अनुरोध या सजावट थीम (Special Requests)</label>
                  <textarea
                    rows={3}
                    placeholder="रंग थीम, विशेष फूलों का मंडप, वीआईपी सोफा या अन्य आवश्यकता लिखें..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50/80 border border-gray-200 text-[#111827] text-sm focus:border-[#1F74BA] focus:bg-white focus:ring-2 focus:ring-[#1F74BA]/20 focus:outline-none transition-all"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 text-xs font-extrabold hover:bg-gray-200 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>पीछे जाएं (Back)</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>{isSubmitting ? 'भेजा जा रहा है...' : 'कोटेशन अनुरोध भेजें (Submit Quote) →'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
