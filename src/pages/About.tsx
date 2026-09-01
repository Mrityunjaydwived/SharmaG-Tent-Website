import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, 
  Target, 
  Compass, 
  ShieldCheck, 
  Award, 
  Users, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Flame,
  Clock,
  Heart,
  Tent,
  Shield,
  Calendar
} from 'lucide-react';
import { dataService } from '../lib/dataService';
import { BusinessSettings } from '../types';
import { SevenPhere3DCanvas } from '../components/3d/SevenPhere3DCanvas';

export const About: React.FC = () => {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);

  useEffect(() => {
    dataService.getSettings().then(setSettings);
  }, []);

  const coreValues = [
    {
      title: 'पवित्रता और भावनात्मक निष्ठा',
      desc: 'हम हर विवाह को केवल एक व्यावसायिक अनुबंध नहीं, बल्कि दो परिवारों के मिलन और सात फेरों की ईश्वरीय मर्यादा मानते हैं।',
      icon: Heart,
      badgeColor: 'bg-rose-50 text-rose-600 border-rose-200',
    },
    {
      title: 'अटल सुरक्षा और जर्मन इंजीनियरिंग',
      desc: 'मूसलाधार बरसात हो या तेज आंधी — हमारे वाटरप्रूफ जर्मन हैंगर्स और मजबूत ट्रसिंग हर विषम मौसम में आपके उत्सव की सुरक्षा की ढाल हैं।',
      icon: ShieldCheck,
      badgeColor: 'bg-blue-50 text-[#1F74BA] border-blue-200',
    },
    {
      title: 'अखण्ड समय-निष्ठा (100% On-Time)',
      desc: 'बारात और मेहमानों के आगमन से कई घंटे पहले बिजली, लाइट, साउंड व फूलों की अंतिम जांच पूर्ण — तनावमुक्त होकर मनाएं खुशियां।',
      icon: Clock,
      badgeColor: 'bg-amber-50 text-[#F09120] border-amber-200',
    },
    {
      title: 'पारिवारिक सत्कार व ऑन-साइट टीम',
      desc: 'हमारे स्वयं के 50+ कुशल कारीगर, साउंड इंजीनियर और लाइट तकनीशियन पूरे आयोजन में आपके परिवार के सदस्य की भांति समर्पित रहते हैं।',
      icon: HeartHandshake,
      badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
  ];

  const storyMilestones = [
    {
      period: 'शुरुआती दौर एवं संकल्प',
      year: 'नींव व विश्वास',
      title: 'पारंपरिक सेवाभाव एवं परिवारों के आशीर्वाद से शुरुआत',
      desc: 'साधारण शामियाने और खाट-कुर्सियों से शुरू हुआ यह सफर — उद्देश्य केवल एक था, हर बेटी के विवाह को राजा-रानी जैसा सम्मान देना।',
      icon: Tent,
    },
    {
      period: 'तकनीकी क्रांति',
      year: 'मौसम-रोधी विस्तार',
      title: 'जर्मन वाटरप्रूफ हैंगर्स एवं विशाल वेदर-प्रूफ इंफ्रास्ट्रक्चर',
      desc: 'मौसम की मार से मुक्ति दिलाने के लिए एल्युमिनियम स्ट्रक्चर और हेवी-ड्यूटी फायर-रिटार्डेंट फैब्रिक्स शामिल किए, जिसने खुले मैदानों को महलों में बदल दिया।',
      icon: Shield,
    },
    {
      period: 'शाही कला एवं संस्कृति',
      year: 'भव्य विरासत',
      title: 'हस्तनिर्मित 3D नक्काशीदार वरमाला स्टेज व पुष्प कला',
      desc: 'वृंदावन और राजस्थान की सांस्कृतिक नक्काशी, ताजे मोगरे-गुलाब के सुगंधित मंडप और राजसी सिंहासन का निर्माण खुद की कार्यशाला में शुरू किया।',
      icon: Sparkles,
    },
    {
      period: 'आज का शर्माजी टेंट हाउस',
      year: '25+ वर्षों का अटूट भरोसा',
      title: 'सपनों को साकार करने वाला प्रतिष्ठित संस्थान',
      desc: 'आज 2,500 से अधिक सफल विवाह, विशाल भागवत कथा और सम्मेलनों का अनुभव लिए हम हर आयोजन को गौरवशाली इतिहास बनाते हैं।',
      icon: Crown,
    },
  ];

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 bg-white text-[#111827]">
      {/* Header Banner with Emotional & Motivational Hook */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 via-amber-50 to-blue-50 border border-[#1F74BA]/25 text-[#1F74BA] text-xs font-extrabold uppercase tracking-wider shadow-xs animate-pulse-glow">
          <Crown className="w-3.5 h-3.5 text-[#F8D706]" />
          <span>शर्माजी टेंट हाउस — विश्वास, समर्पण और परंपरा (Our Heritage)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif-luxury leading-tight text-[#111827]">
          <span>"हम केवल टेंट नहीं लगाते, हम बनाते हैं आपके सपनों का </span>
          <span className="gradient-text-gold">राजमहल!"</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal max-w-2xl mx-auto">
          विवाह जीवन का वह पावन क्षण है जहाँ दो आत्माएं एक होती हैं। उस पल की गरिमा, माता-पिता का मान और मेहमानों का सत्कार — <span className="font-semibold text-[#1F74BA]">यह हमारी सर्वोच्च साधना और धर्म है।</span>
        </p>
      </div>

      {/* 3D Sacred Seven Phere & Hawan Kund Showcase */}
      <div className="space-y-4">
        <SevenPhere3DCanvas />
        <div className="text-center">
          <span className="text-xs text-gray-500 italic bg-gray-50 px-4 py-1.5 rounded-full border border-gray-200 inline-block shadow-2xs">
            ✨ 3D मॉडल को ड्रैग करके घुमाएं: पावन हवन कुंड की प्रज्वलित अग्नि, फूलों की वर्षा और सात फेरे लेते वर-वधू।
          </span>
        </div>
      </div>

      {/* Confident & Motivational Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-hover-lift rounded-3xl p-8 sm:p-10 space-y-5 bg-gradient-to-br from-blue-50/70 via-white to-blue-50/30 border border-[#1F74BA]/20 shadow-md">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#1F74BA] to-[#0B4F8A] text-white flex items-center justify-center shadow-md">
            <Flame className="w-7 h-7 text-[#F8D706]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
            हमारा अटूट संकल्प <span className="text-xs sm:text-sm font-bold text-[#1F74BA] block sm:inline font-sans">(Our Commitment)</span>
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed font-normal">
            चाहे मौसम की आंधी हो या वक्त की चुनौती, शर्माजी टेंट हाउस का हर एक कारीगर आपके मान-सम्मान के लिए एक सैनिक की तरह डटा रहता है। हमारा संकल्प है कि आपके घर का हर उत्सव बिना किसी रुकावट के, पूर्ण वैभव और सुरक्षा के साथ सम्पन्न हो।
          </p>
        </div>

        <div className="card-hover-lift rounded-3xl p-8 sm:p-10 space-y-5 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 border border-[#F09120]/25 shadow-md">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#071A2B] to-[#0B2540] text-[#F8D706] flex items-center justify-center shadow-md">
            <Crown className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
            हमारा विजन <span className="text-xs sm:text-sm font-bold text-[#F09120] block sm:inline font-sans">(Our Royal Vision)</span>
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed font-normal">
            भारतीय विवाह संस्कृति और सनातन परंपराओं की पवित्रता को आधुनिक तकनीक और राजसी ठाठ-बाट के साथ दुनिया के हर कोने में स्थापित करना। हम हर परिवार को ऐसा अनुभव देते हैं, जिसकी चर्चा आने वाली पीढ़ियां गर्व से करती हैं।
          </p>
        </div>
      </div>

      {/* Integrated Journey Timeline */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-[#1F74BA]/20 text-[#1F74BA] text-xs font-extrabold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#F8D706]" />
            <span>हमारा गौरवशाली सफर (Our Heritage Journey)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-luxury text-[#111827]">
            सच्चाई, मेहनत और परिवारों का <span className="gradient-text-gold">25+ वर्षों का विश्वास</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            जानें कैसे एक छोटे से प्रयास ने हजारों परिवारों के आंसुओं और मुस्कानों के साथ एक विशाल संस्थान का रूप लिया।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {storyMilestones.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="card-hover-lift rounded-3xl p-6 bg-white border border-gray-200/90 hover:border-[#1F74BA]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-[#1F74BA] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      {item.year}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50 to-amber-50 text-[#1F74BA] flex items-center justify-center shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-extrabold font-serif-luxury text-[#111827] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 text-[11px] font-extrabold text-gray-500 flex items-center justify-between">
                  <span>चरण {idx + 1}</span>
                  <span className="text-[#1F74BA]">{item.period}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-[#F09120] text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Award className="w-3.5 h-3.5" />
            <span>कार्य नीति एवं सिद्धांत</span>
          </div>
          <h2 className="text-3xl font-extrabold font-serif-luxury text-[#111827]">
            हमारे <span className="gradient-text-gold">4 अटूट मूल्य</span>
          </h2>
          <p className="text-xs text-gray-500">जिनके दम पर हर आयोजन बनता है निर्विघ्न, गरिमामय और सफल</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="card-hover-lift p-6 rounded-3xl bg-white border border-gray-200/90 hover:border-[#1F74BA]/40 shadow-sm hover:shadow-xl transition-all duration-300 space-y-3.5"
              >
                <div className={`w-12 h-12 rounded-2xl ${v.badgeColor} border flex items-center justify-center shadow-xs`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-extrabold font-serif-luxury text-[#111827] leading-snug">{v.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Founder & Leadership Spotlight */}
      <div className="card-hover-lift rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-amber-50/60 via-white to-blue-50/40 border border-amber-200/80 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 text-center lg:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8D706]/30 text-amber-950 text-xs font-black uppercase tracking-wider border border-[#F8D706]">
              <Crown className="w-3.5 h-3.5" />
              <span>संस्थापक एवं संचालक (Founder & Owner)</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-serif-luxury text-[#111827]">
              श्री प्रदीप शर्मा
            </h3>
            <p className="text-xs font-bold text-[#1F74BA] uppercase tracking-wider">
              SharmaG Tent House, त्योंथर (रीवा, म.प्र.)
            </p>
            <div className="pt-2 text-xs text-gray-700 space-y-1 font-medium">
              <p>📍 <strong>मुख्यालय:</strong> वार्ड नं. 1, त्योंथर, रीवा (म.प्र.)</p>
              <p>📞 <strong>फ़ोन:</strong> +91 9229903308 | +91 7489467539</p>
              <p>📧 <strong>ईमेल:</strong> dwivedibandhavesh@gmail.com</p>
              <p>⏰ <strong>उपलब्धता:</strong> सातों दिन 24 घंटे (24x7 Open)</p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
            <p className="border-l-4 border-[#1F74BA] pl-4 italic text-gray-800 font-medium">
              "हमारा उद्देश्य केवल टेंट लगाना नहीं, बल्कि आपके परिवार के सबसे बड़े दिन को ईश्वर के आशीर्वाद और राजसी गरिमा से सजाना है। त्योंथर, रीवा और आसपास के हर गांव-कस्बे में पिछले 25 वर्षों से हर बेटी के विवाह को रानी जैसा सम्मान देना ही हमारी पूंजी है।"
            </p>
            <p>
              श्री प्रदीप शर्मा के कुशल मार्गदर्शन में शर्माजी टेंट हाउस ने पारंपरिक शामियाने से लेकर आधुनिक वाटरप्रूफ जर्मन हैंगर्स, 3D वरमाला स्टेज और कॉन्सर्ट लाइटिंग तक का सफर तय किया है। आज हमारी समर्पित टीम 24 घंटे हर मौसम में तत्पर रहकर हर आयोजन को निर्विघ्न बनाती है।
            </p>
          </div>
        </div>
      </div>

      {/* Motivational Call to Action */}
      <div className="rounded-3xl p-8 sm:p-12 text-center space-y-6 bg-gradient-to-b from-[#071A2B] via-[#0B2540] to-[#071A2B] text-white border border-[#1F74BA]/40 shadow-2xl card-hover-lift">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-[#F8D706] text-xs font-extrabold uppercase tracking-wider border border-[#F8D706]/30">
          <Crown className="w-3.5 h-3.5 text-[#F8D706]" />
          <span>आपकी खुशियां, हमारा दायित्व</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold font-serif-luxury text-white max-w-3xl mx-auto leading-tight">
          "आइए, मिलकर रचें आपके परिवार का सबसे गौरवशाली इतिहास!"
        </h3>
        <p className="text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
          अपनी तारीख तय करें और निश्चिंत हो जाएं। आयोजन स्थल के 3D नक्शे, वाटरप्रूफ पंडाल, फूलों की सजावट और डीजे-लाइटिंग का संपूर्ण दायित्व हमारा है।
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
          <Link
            to="/quote"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F8D706] via-[#FFC928] to-[#F09120] text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            तत्काल कोटेशन प्राप्त करें (Instant Quote) →
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs transition-all"
          >
            सीधी बात करें (Direct Contact)
          </Link>
        </div>
      </div>
    </div>
  );
};
