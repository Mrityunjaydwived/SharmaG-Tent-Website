// Vedic Panchangam, Astrological Parameters & 36 Guna Milan Data (2026 - 2036)

export interface RashiDefinition {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  symbol: string;
  element: 'अग्नि (Fire)' | 'पृथ्वी (Earth)' | 'वायु (Air)' | 'जल (Water)';
  lord: string;
  varna: 'ब्राह्मण' | 'क्षत्रिय' | 'वैश्य' | 'शूद्र';
  vashya: 'चतुष्पद' | 'मानव (द्विपद)' | 'जलचर' | 'वनचर' | 'कीट';
}

export interface NakshatraDefinition {
  id: string;
  number: number;
  nameHindi: string;
  nameEnglish: string;
  lord: string;
  deity: string;
  yoni: string;
  gana: 'देव' | 'मनुष्य' | 'राक्षस';
  nadi: 'आदि' | 'मध्य' | 'अंत्य';
  rashi: string;
}

export const VEDIC_RASHIS: RashiDefinition[] = [
  { id: 'mesha', nameHindi: 'मेष (Aries)', nameEnglish: 'Aries', symbol: '♈', element: 'अग्नि (Fire)', lord: 'मंगल (Mars)', varna: 'क्षत्रिय', vashya: 'चतुष्पद' },
  { id: 'vrishabha', nameHindi: 'वृषभ (Taurus)', nameEnglish: 'Taurus', symbol: '♉', element: 'पृथ्वी (Earth)', lord: 'शुक्र (Venus)', varna: 'वैश्य', vashya: 'चतुष्पद' },
  { id: 'mithuna', nameHindi: 'मिथुन (Gemini)', nameEnglish: 'Gemini', symbol: '♊', element: 'वायु (Air)', lord: 'बुध (Mercury)', varna: 'शूद्र', vashya: 'मानव (द्विपद)' },
  { id: 'karka', nameHindi: 'कर्क (Cancer)', nameEnglish: 'Cancer', symbol: '♋', element: 'जल (Water)', lord: 'चंद्र (Moon)', varna: 'ब्राह्मण', vashya: 'जलचर' },
  { id: 'simha', nameHindi: 'सिंह (Leo)', nameEnglish: 'Leo', symbol: '♌', element: 'अग्नि (Fire)', lord: 'सूर्य (Sun)', varna: 'क्षत्रिय', vashya: 'वनचर' },
  { id: 'kanya', nameHindi: 'कन्या (Virgo)', nameEnglish: 'Virgo', symbol: '♍', element: 'पृथ्वी (Earth)', lord: 'बुध (Mercury)', varna: 'वैश्य', vashya: 'मानव (द्विपद)' },
  { id: 'tula', nameHindi: 'तुला (Libra)', nameEnglish: 'Libra', symbol: '♎', element: 'वायु (Air)', lord: 'शुक्र (Venus)', varna: 'शूद्र', vashya: 'मानव (द्विपद)' },
  { id: 'vrishchika', nameHindi: 'वृश्चिक (Scorpio)', nameEnglish: 'Scorpio', symbol: '♏', element: 'जल (Water)', lord: 'मंगल (Mars)', varna: 'ब्राह्मण', vashya: 'कीट' },
  { id: 'dhanu', nameHindi: 'धनु (Sagittarius)', nameEnglish: 'Sagittarius', symbol: '♐', element: 'अग्नि (Fire)', lord: 'गुरु (Jupiter)', varna: 'क्षत्रिय', vashya: 'मानव (द्विपद)' },
  { id: 'makara', nameHindi: 'मकर (Capricorn)', nameEnglish: 'Capricorn', symbol: '♑', element: 'पृथ्वी (Earth)', lord: 'शनि (Saturn)', varna: 'वैश्य', vashya: 'जलचर' },
  { id: 'kumbha', nameHindi: 'कुंभ (Aquarius)', nameEnglish: 'Aquarius', symbol: '♒', element: 'वायु (Air)', lord: 'शनि (Saturn)', varna: 'शूद्र', vashya: 'मानव (द्विपद)' },
  { id: 'meena', nameHindi: 'मीन (Pisces)', nameEnglish: 'Pisces', symbol: '♓', element: 'जल (Water)', lord: 'गुरु (Jupiter)', varna: 'ब्राह्मण', vashya: 'जलचर' },
];

export const VEDIC_NAKSHATRAS: NakshatraDefinition[] = [
  { id: 'ashwini', number: 1, nameHindi: 'अश्विनी (Ashwini)', nameEnglish: 'Ashwini', lord: 'केतु', deity: 'अश्विनी कुमार', yoni: 'अश्व (Horse)', gana: 'देव', nadi: 'आदि', rashi: 'mesha' },
  { id: 'bharani', number: 2, nameHindi: 'भरणी (Bharani)', nameEnglish: 'Bharani', lord: 'शुक्र', deity: 'यम', yoni: 'गज (Elephant)', gana: 'मनुष्य', nadi: 'मध्य', rashi: 'mesha' },
  { id: 'krittika', number: 3, nameHindi: 'कृत्तिका (Krittika)', nameEnglish: 'Krittika', lord: 'सूर्य', deity: 'अग्नि', yoni: 'मेष (Sheep)', gana: 'राक्षस', nadi: 'अंत्य', rashi: 'vrishabha' },
  { id: 'rohini', number: 4, nameHindi: 'रोहिणी (Rohini)', nameEnglish: 'Rohini', lord: 'चंद्र', deity: 'ब्रह्मा', yoni: 'सर्प (Serpent)', gana: 'मनुष्य', nadi: 'अंत्य', rashi: 'vrishabha' },
  { id: 'mrigashira', number: 5, nameHindi: 'मृगशिरा (Mrigashira)', nameEnglish: 'Mrigashira', lord: 'मंगल', deity: 'सोम', yoni: 'सर्प (Serpent)', gana: 'देव', nadi: 'मध्य', rashi: 'mithuna' },
  { id: 'ardra', number: 6, nameHindi: 'आर्द्रा (Ardra)', nameEnglish: 'Ardra', lord: 'राहु', deity: 'रुद्र', yoni: 'श्वान (Dog)', gana: 'मनुष्य', nadi: 'आदि', rashi: 'mithuna' },
  { id: 'punarvasu', number: 7, nameHindi: 'पुनर्वसु (Punarvasu)', nameEnglish: 'Punarvasu', lord: 'गुरु', deity: 'अदिति', yoni: 'मार्जार (Cat)', gana: 'देव', nadi: 'आदि', rashi: 'karka' },
  { id: 'pushya', number: 8, nameHindi: 'पुष्य (Pushya)', nameEnglish: 'Pushya', lord: 'शनि', deity: 'बृहस्पति', yoni: 'मेष (Sheep)', gana: 'देव', nadi: 'मध्य', rashi: 'karka' },
  { id: 'ashlesha', number: 9, nameHindi: 'आश्लेषा (Ashlesha)', nameEnglish: 'Ashlesha', lord: 'बुध', deity: 'सर्प', yoni: 'मार्जार (Cat)', gana: 'राक्षस', nadi: 'अंत्य', rashi: 'karka' },
  { id: 'magha', number: 10, nameHindi: 'मघा (Magha)', nameEnglish: 'Magha', lord: 'केतु', deity: 'पितृ', yoni: 'मूषक (Rat)', gana: 'राक्षस', nadi: 'आदि', rashi: 'simha' },
  { id: 'purvaphalguni', number: 11, nameHindi: 'पूर्वाफाल्गुनी (Purva Phalguni)', nameEnglish: 'Purva Phalguni', lord: 'शुक्र', deity: 'भग', yoni: 'मूषक (Rat)', gana: 'मनुष्य', nadi: 'मध्य', rashi: 'simha' },
  { id: 'uttaraphalguni', number: 12, nameHindi: 'उत्तराफाल्गुनी (Uttara Phalguni)', nameEnglish: 'Uttara Phalguni', lord: 'सूर्य', deity: 'अर्यमा', yoni: 'गौ (Cow)', gana: 'मनुष्य', nadi: 'अंत्य', rashi: 'kanya' },
  { id: 'hasta', number: 13, nameHindi: 'हस्त (Hasta)', nameEnglish: 'Hasta', lord: 'चंद्र', deity: 'सूर्य', yoni: 'महिष (Buffalo)', gana: 'देव', nadi: 'आदि', rashi: 'kanya' },
  { id: 'chitra', number: 14, nameHindi: 'चित्रा (Chitra)', nameEnglish: 'Chitra', lord: 'मंगल', deity: 'विश्वकर्मा', yoni: 'व्याघ्र (Tiger)', gana: 'राक्षस', nadi: 'मध्य', rashi: 'tula' },
  { id: 'swati', number: 15, nameHindi: 'स्वाति (Swati)', nameEnglish: 'Swati', lord: 'राहु', deity: 'वायु', yoni: 'महिष (Buffalo)', gana: 'देव', nadi: 'अंत्य', rashi: 'tula' },
  { id: 'vishakha', number: 16, nameHindi: 'विशाखा (Vishakha)', nameEnglish: 'Vishakha', lord: 'गुरु', deity: 'इंद्राग्नि', yoni: 'व्याघ्र (Tiger)', gana: 'राक्षस', nadi: 'अंत्य', rashi: 'vrishchika' },
  { id: 'anuradha', number: 17, nameHindi: 'अनुराधा (Anuradha)', nameEnglish: 'Anuradha', lord: 'शनि', deity: 'मित्र', yoni: 'मृग (Deer)', gana: 'देव', nadi: 'मध्य', rashi: 'vrishchika' },
  { id: 'jyeshtha', number: 18, nameHindi: 'ज्येष्ठा (Jyeshtha)', nameEnglish: 'Jyeshtha', lord: 'बुध', deity: 'इंद्र', yoni: 'मृग (Deer)', gana: 'राक्षस', nadi: 'आदि', rashi: 'vrishchika' },
  { id: 'mula', number: 19, nameHindi: 'मूल (Mula)', nameEnglish: 'Mula', lord: 'केतु', deity: 'निर्रिति', yoni: 'श्वान (Dog)', gana: 'राक्षस', nadi: 'आदि', rashi: 'dhanu' },
  { id: 'purvashadha', number: 20, nameHindi: 'पूर्वाषाढ़ा (Purva Ashadha)', nameEnglish: 'Purva Ashadha', lord: 'शुक्र', deity: 'आपः', yoni: 'वानर (Monkey)', gana: 'मनुष्य', nadi: 'मध्य', rashi: 'dhanu' },
  { id: 'uttarashadha', number: 21, nameHindi: 'उत्तराषाढ़ा (Uttara Ashadha)', nameEnglish: 'Uttara Ashadha', lord: 'सूर्य', deity: 'विश्वेदेव', yoni: 'नकुल (Mongoose)', gana: 'मनुष्य', nadi: 'अंत्य', rashi: 'makara' },
  { id: 'shravana', number: 22, nameHindi: 'श्रवण (Shravana)', nameEnglish: 'Shravana', lord: 'चंद्र', deity: 'विष्णु', yoni: 'वानर (Monkey)', gana: 'देव', nadi: 'अंत्य', rashi: 'makara' },
  { id: 'dhanishta', number: 23, nameHindi: 'धनिष्ठा (Dhanishta)', nameEnglish: 'Dhanishta', lord: 'मंगल', deity: 'अष्टवसु', yoni: 'सिंह (Lion)', gana: 'राक्षस', nadi: 'मध्य', rashi: 'kumbha' },
  { id: 'shatabhisha', number: 24, nameHindi: 'शतभिषा (Shatabhisha)', nameEnglish: 'Shatabhisha', lord: 'राहु', deity: 'वरुण', yoni: 'अश्व (Horse)', gana: 'राक्षस', nadi: 'आदि', rashi: 'kumbha' },
  { id: 'purvabhadrapada', number: 25, nameHindi: 'पूर्वभाद्रपद (Purva Bhadrapada)', nameEnglish: 'Purva Bhadrapada', lord: 'गुरु', deity: 'अजैकपाद', yoni: 'सिंह (Lion)', gana: 'मनुष्य', nadi: 'आदि', rashi: 'meena' },
  { id: 'uttarabhadrapada', number: 26, nameHindi: 'उत्तरभाद्रपद (Uttara Bhadrapada)', nameEnglish: 'Uttara Bhadrapada', lord: 'शनि', deity: 'अहिर्बुध्न्य', yoni: 'गौ (Cow)', gana: 'मनुष्य', nadi: 'मध्य', rashi: 'meena' },
  { id: 'revati', number: 27, nameHindi: 'रेवती (Revati)', nameEnglish: 'Revati', lord: 'बुध', deity: 'पूषा', yoni: 'गज (Elephant)', gana: 'देव', nadi: 'अंत्य', rashi: 'meena' },
];

// Ashta Koota (36 Guna) Calculation Algorithm
export interface AshtaKootaResult {
  varna: { points: number; max: number; desc: string; status: 'good' | 'average' | 'poor' };
  vashya: { points: number; max: number; desc: string; status: 'good' | 'average' | 'poor' };
  tara: { points: number; max: number; desc: string; status: 'good' | 'average' | 'poor' };
  yoni: { points: number; max: number; desc: string; status: 'good' | 'average' | 'poor' };
  grahaMaitri: { points: number; max: number; desc: string; status: 'good' | 'average' | 'poor' };
  gana: { points: number; max: number; desc: string; status: 'good' | 'average' | 'poor' };
  bhakoot: { points: number; max: number; desc: string; status: 'good' | 'average' | 'poor' };
  nadi: { points: number; max: number; desc: string; status: 'good' | 'average' | 'poor' };
  totalScore: number;
  maxScore: number;
  verdictHindi: string;
  verdictCategory: 'उत्कृष्ट (Excellent)' | 'शुभ व उत्तम (Very Good)' | 'मध्यम (Average)' | 'अशुभ (Not Recommended)';
  doshaWarnings: string[];
  remedies: string[];
}

export function calculateAshtaKootaMilan(
  groomRashiId: string,
  groomNakshatraId: string,
  brideRashiId: string,
  brideNakshatraId: string
): AshtaKootaResult {
  const gRashi = VEDIC_RASHIS.find((r) => r.id === groomRashiId) || VEDIC_RASHIS[0];
  const bRashi = VEDIC_RASHIS.find((r) => r.id === brideRashiId) || VEDIC_RASHIS[3];
  const gNak = VEDIC_NAKSHATRAS.find((n) => n.id === groomNakshatraId) || VEDIC_NAKSHATRAS[0];
  const bNak = VEDIC_NAKSHATRAS.find((n) => n.id === brideNakshatraId) || VEDIC_NAKSHATRAS[3];

  const doshaWarnings: string[] = [];
  const remedies: string[] = [];

  // 1. वर्ण कूट (Varna - Max 1 Pt)
  const varnaOrder = { 'ब्राह्मण': 4, 'क्षत्रिय': 3, 'वैश्य': 2, 'शूद्र': 1 };
  let varnaPts = 0;
  if (varnaOrder[gRashi.varna] >= varnaOrder[bRashi.varna]) {
    varnaPts = 1;
  } else {
    varnaPts = 0;
  }

  // 2. वश्य कूट (Vashya - Max 2 Pts)
  let vashyaPts = 1;
  if (gRashi.vashya === bRashi.vashya) {
    vashyaPts = 2;
  } else if (
    (gRashi.vashya === 'मानव (द्विपद)' && bRashi.vashya === 'चतुष्पद') ||
    (gRashi.vashya === 'जलचर' && bRashi.vashya === 'मानव (द्विपद)')
  ) {
    vashyaPts = 1.5;
  } else {
    vashyaPts = 0.5;
  }

  // 3. तारा कूट (Tara - Max 3 Pts)
  const countGB = (bNak.number - gNak.number + 27) % 9;
  const countBG = (gNak.number - bNak.number + 27) % 9;
  const auspiciousTarash = [1, 2, 4, 6, 8];
  let taraPts = 0;
  if (auspiciousTarash.includes(countGB) && auspiciousTarash.includes(countBG)) {
    taraPts = 3;
  } else if (auspiciousTarash.includes(countGB) || auspiciousTarash.includes(countBG)) {
    taraPts = 1.5;
  } else {
    taraPts = 0;
  }

  // 4. योनि कूट (Yoni - Max 4 Pts)
  let yoniPts = 2;
  if (gNak.yoni === bNak.yoni) {
    yoniPts = 4;
  } else {
    yoniPts = 2.5;
  }

  // 5. ग्रह मैत्री (Graha Maitri - Max 5 Pts)
  let grahaPts = 3;
  if (gRashi.lord === bRashi.lord) {
    grahaPts = 5;
  } else if (
    (gRashi.lord.includes('सूर्य') && bRashi.lord.includes('चंद्र')) ||
    (gRashi.lord.includes('गुरु') && bRashi.lord.includes('मंगल'))
  ) {
    grahaPts = 4;
  } else {
    grahaPts = 3;
  }

  // 6. गण कूट (Gana - Max 6 Pts)
  let ganaPts = 0;
  if (gNak.gana === bNak.gana) {
    ganaPts = 6;
  } else if (
    (gNak.gana === 'देव' && bNak.gana === 'मनुष्य') ||
    (gNak.gana === 'मनुष्य' && bNak.gana === 'देव')
  ) {
    ganaPts = 5;
  } else if (gNak.gana === 'राक्षस' || bNak.gana === 'राक्षस') {
    ganaPts = 1;
    doshaWarnings.push('गण दोष: वर या वधू में से एक का राक्षस गण है।');
    remedies.push('गण दोष शांति हेतु गायत्री मंत्र जाप एवं भगवान विष्णु व लक्ष्मी पूजन करें।');
  } else {
    ganaPts = 3;
  }

  // 7. भकूट (Bhakoot - Max 7 Pts)
  const rashiDiff = Math.abs(VEDIC_RASHIS.indexOf(gRashi) - VEDIC_RASHIS.indexOf(bRashi));
  let bhakootPts = 7;
  if ([1, 5, 7].includes(rashiDiff)) {
    bhakootPts = 0;
    doshaWarnings.push('भकूट दोष: राशि अंतर (षडाष्टक/द्विर्द्वादश/नवपंचम) उपस्थित है।');
    remedies.push('भकूट दोष परिहार हेतु भगवान शिव का रुद्राभिषेक एवं महामृत्युंजय मंत्र अनुष्ठान करें।');
  } else {
    bhakootPts = 7;
  }

  // 8. नाड़ी कूट (Nadi - Max 8 Pts)
  let nadiPts = 8;
  if (gNak.nadi === bNak.nadi) {
    nadiPts = 0;
    doshaWarnings.push(`नाड़ी दोष: वर एवं वधू दोनों की नाड़ी समान (${gNak.nadi} नाड़ी) है।`);
    remedies.push('नाड़ी दोष निवारणार्थ स्वर्ण दान, महामृत्युंजय जाप एवं वैदिक विद्वान द्वारा शांति पाठ कराएं।');
  } else {
    nadiPts = 8;
  }

  const total = varnaPts + vashyaPts + taraPts + yoniPts + grahaPts + ganaPts + bhakootPts + nadiPts;

  let verdictHindi = '';
  let verdictCategory: AshtaKootaResult['verdictCategory'] = 'मध्यम (Average)';

  if (total >= 28) {
    verdictHindi = 'अति उत्तम एवं राजसी मिलान! वर-वधू का वैवाहिक जीवन अत्यंत सुखद, दीर्घायु, समृद्ध एवं मंगलमय रहेगा।';
    verdictCategory = 'उत्कृष्ट (Excellent)';
  } else if (total >= 21) {
    verdictHindi = 'शुभ व अनुकूल मिलान! गृहस्थ जीवन में सुख, शांति, संतान और समृद्धि के योग हैं।';
    verdictCategory = 'शुभ व उत्तम (Very Good)';
  } else if (total >= 18) {
    verdictHindi = 'मध्यम मिलान। विवाह किया जा सकता है, साधारण दोष निवारण उपाय लाभप्रद रहेंगे।';
    verdictCategory = 'मध्यम (Average)';
  } else {
    verdictHindi = 'गुण संख्या 18 से कम है। विद्वान ज्योतिषी व आचार्य से कुंडली का विस्तृत विश्लेषण कराने के उपरांत ही निर्णय लें।';
    verdictCategory = 'अशुभ (Not Recommended)';
  }

  return {
    varna: {
      points: varnaPts,
      max: 1,
      desc: `${gRashi.varna} (वर) + ${bRashi.varna} (वधू) — कार्य, अहंकार व स्वभाव संतुलन`,
      status: varnaPts === 1 ? 'good' : 'poor',
    },
    vashya: {
      points: vashyaPts,
      max: 2,
      desc: `${gRashi.vashya} + ${bRashi.vashya} — पारस्परिक समर्पण व आकर्षण`,
      status: vashyaPts >= 1.5 ? 'good' : 'average',
    },
    tara: {
      points: taraPts,
      max: 3,
      desc: `तारा बल — स्वास्थ्य, दीर्घायु एवं भाग्य वृद्धि`,
      status: taraPts >= 2 ? 'good' : 'average',
    },
    yoni: {
      points: yoniPts,
      max: 4,
      desc: `${gNak.yoni} + ${bNak.yoni} — शारीरिक व मानसिक सामंजस्य`,
      status: yoniPts >= 3 ? 'good' : 'average',
    },
    grahaMaitri: {
      points: grahaPts,
      max: 5,
      desc: `${gRashi.lord} + ${bRashi.lord} — मित्रता एवं वैचारिक तालमेल`,
      status: grahaPts >= 4 ? 'good' : 'average',
    },
    gana: {
      points: ganaPts,
      max: 6,
      desc: `${gNak.gana} (वर) + ${bNak.gana} (वधू) — व्यवहार व चरित्र संगति`,
      status: ganaPts >= 5 ? 'good' : 'poor',
    },
    bhakoot: {
      points: bhakootPts,
      max: 7,
      desc: `राशि चक्र अंतर — संतान सुख, धन-धान्य एवं पारिवारिक उन्नति`,
      status: bhakootPts === 7 ? 'good' : 'poor',
    },
    nadi: {
      points: nadiPts,
      max: 8,
      desc: `${gNak.nadi} (वर) + ${bNak.nadi} (वधू) — आनुवंशिक स्वास्थ्य व जीवन रक्षा`,
      status: nadiPts === 8 ? 'good' : 'poor',
    },
    totalScore: Math.round(total * 10) / 10,
    maxScore: 36,
    verdictHindi,
    verdictCategory,
    doshaWarnings,
    remedies,
  };
}

// 10-Year Panchang Highlights & Shubh Choghadiya
export const CHOGHADIYA_HOURS = [
  { name: 'अमृत (Amrit)', nature: 'सर्वोत्तम शुभ', desc: 'विवाह, मंडप पूजन व हर नए कार्य के लिए श्रेष्ठ', color: 'emerald' },
  { name: 'शुभ (Shubh)', nature: 'अति शुभ', desc: 'धार्मिक कथा, यज्ञ व मांगलिक कार्यक्रमों हेतु उत्तम', color: 'blue' },
  { name: 'लाभ (Laabh)', nature: 'लाभप्रद', desc: 'व्यापार, बुकिंग, खरीदारी व वाहन शुभारंभ', color: 'amber' },
  { name: 'चर (Char)', nature: 'चलायमान शुभ', desc: 'यात्रा, बरात प्रस्थान व शोभायात्रा', color: 'purple' },
  { name: 'रोग (Rog)', nature: 'अशुभ', desc: 'वाद-विवाद व मांगलिक कार्य वर्जित', color: 'rose' },
  { name: 'काल (Kaal)', nature: 'हानिकारक', desc: 'विवाह व शुभ मुहूर्त हेतु त्याज्य', color: 'gray' },
  { name: 'उद्वेग (Udveg)', nature: 'चिंताजनक', desc: 'अशांति उत्पन्न करने वाला समय', color: 'orange' },
];
