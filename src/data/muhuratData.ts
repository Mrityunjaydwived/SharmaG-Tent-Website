// Muhurat Data export & compatibility layer for 10-Year Shubh Vivah Lagan
import { getYearVivahSummary, getPanchangForMonth, PanchangDay } from './panchangData';

export interface MuhuratItem {
  id: string;
  year: number;
  monthHindi: string;
  monthEnglish: string;
  dateString: string;
  dayOfWeek: string;
  tithi: string;
  nakshatra: string;
  timing: string;
}

export const TEN_YEAR_MUHURATS: MuhuratItem[] = [];

// Populate 10-year muhurats from 2026 to 2036
for (let y = 2026; y <= 2036; y++) {
  const summary = getYearVivahSummary(y);
  summary.months.forEach((m) => {
    m.dates.forEach((d, idx) => {
      TEN_YEAR_MUHURATS.push({
        id: `${y}-${m.monthName}-${idx}`,
        year: y,
        monthHindi: m.monthName,
        monthEnglish: m.monthName,
        dateString: d.dateStr,
        dayOfWeek: d.day,
        tithi: 'शुभ तिथि',
        nakshatra: d.nakshatra,
        timing: d.lagan,
      });
    });
  });
}

export { getYearVivahSummary, getPanchangForMonth };
