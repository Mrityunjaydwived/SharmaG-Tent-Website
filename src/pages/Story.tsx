import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Award, Sparkles, Tent, Shield, Crown, ArrowRight } from 'lucide-react';

export const Story: React.FC = () => {
  const milestones = [
    {
      period: 'स्थापना और शुरुआत',
      year: 'स्थापना वर्ष',
      title: 'पारंपरिक सेवा एवं आतिथ्य सत्कार से शुरुआत',
      description: 'शर्माजी टेंट हाउस की नींव पारंपरिक भारतीय सत्कार, ईमानदारी और परिवारों के मांगलिक कार्यों में सुंदर शामियाना सजाने के उद्देश्य से रखी गई थी।',
      icon: Tent,
      stats: 'स्थानीय विवाह एवं धार्मिक आयोजनों से शुरुआत',
    },
    {
      period: 'आधुनिक विस्तार',
      year: 'वाटरप्रूफ युग',
      title: 'जर्मन वाटरप्रूफ हैंगर और मजबूत ट्रसिंग का आगमन',
      description: 'मौसम की अनिश्चितताओं से बेफिक्र करने के लिए अत्याधुनिक एल्युमिनियम हैंगर और अग्निरोधक तिरपाल शामिल किए, जिससे भारी बारिश में भी आयोजन शान से होते रहे।',
      icon: Shield,
      stats: '1,500+ मेहमानों की क्षमता',
    },
    {
      period: 'मंडप एवं कलात्मक सजावट',
      year: 'कला एवं सौंदर्य',
      title: 'विशिष्ट नक्काशीदार मंडप एवं ताजे फूलों का भव्य स्टूडियो',
      description: 'मात्र टेंट लगाने से आगे बढ़कर राजसी थीम वाले मंडप, लकड़ी के नक्काशीदार द्वार, सुंदर झूमर और सेल्फी प्वाइंट की इन-हाउस व्यवस्था विकसित की।',
      icon: Sparkles,
      stats: '500+ भव्य मंडप एवं स्टेज तैयार किए गए',
    },
    {
      period: 'लाइटिंग एवं मनोरंजन क्रांति',
      year: 'आधुनिक तकनीक',
      title: 'शार्पी बीम, लेजर शो एवं लाइन-ऐरे साउंड सिस्टम',
      description: 'संगीत संध्या और वरमाला एंट्री को जादुई बनाने हेतु कंप्यूटरीकृत स्टेज लाइट्स, 3D एलईडी फ्लोर्स और क्रिस्टल क्लियर साउंड का समावेश किया गया।',
      icon: Award,
      stats: 'सम्पूर्ण तकनीकी एवं लाइव संगीत सेटअप',
    },
    {
      period: 'वर्तमान एवं भविष्य',
      year: 'आज का शर्माजी',
      title: 'क्षेत्र का सबसे भरोसेमंद और प्रतिष्ठित टेंट हाउस',
      description: 'आज शर्माजी टेंट हाउस कई एकड़ में फैले शाही विवाह, विशाल भागवत कथा, और सम्मेलनों के लिए भव्यता, सुरक्षा और समय की पाबंदी का दूसरा नाम है।',
      icon: Crown,
      stats: '5,000+ से अधिक मेहमानों की एक साथ क्षमता',
    },
  ];

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 bg-white text-[#111827]">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-[#1F74BA]/20 text-[#1F74BA] text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          हमारा सफर और परंपरा (Our Journey)
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-luxury leading-tight text-[#111827]">
          विश्वास, भव्यता और सत्कार की गौरवशाली यात्रा
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          छोटे-छोटे पारिवारिक आयोजनों से लेकर कई एकड़ में फैले शाही विवाह पंडालों तक — जानें शर्माजी टेंट हाउस की सफलता का सफर।
        </p>
      </div>

      {/* Timeline Tree */}
      <div className="relative border-l-2 border-blue-200 ml-4 md:ml-32 space-y-12 pl-6 md:pl-10">
        {milestones.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="relative group">
              {/* Timeline Marker Pin */}
              <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-[#1F74BA] text-[#1F74BA] flex items-center justify-center group-hover:scale-110 shadow-sm transition">
                <Icon className="w-4 h-4" />
              </div>

              <div className="rounded-2xl p-6 md:p-8 bg-white border border-gray-200 hover:border-[#1F74BA] shadow-sm hover:shadow-md transition space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1F74BA]">
                    {item.period}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[11px] font-bold text-[#1F74BA]">
                    {item.year}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold font-serif-luxury text-[#111827]">
                  {item.title}
                </h3>

                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-gray-700">
                  <Sparkles className="w-3.5 h-3.5 text-[#F8D706]" />
                  <span>मुख्य उपलब्धि: {item.stats}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl p-8 sm:p-12 text-center space-y-6 bg-white border border-gray-200 shadow-md">
        <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-luxury text-[#111827]">
          आप भी हमारे इस सफर का हिस्सा बनें
        </h3>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          अपने परिवार के मांगलिक कार्यों को एक यादगार उत्सव में बदलें। शर्माजी टेंट हाउस के साथ मिलकर योजना बनाएं।
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/quote"
            className="px-8 py-3.5 rounded-xl bg-[#F8D706] text-black font-extrabold text-xs shadow-md hover:bg-[#ebd005] transition flex items-center gap-2"
          >
            <span>आयोजन की तैयारी शुरू करें (Get Quote)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
