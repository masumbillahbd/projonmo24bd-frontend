import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/bn';

import { format, parseISO } from 'date-fns';
import { bn } from 'date-fns/locale';

dayjs.extend(relativeTime);
dayjs.locale('bn');

// Helper: ইংরেজি ডিজিট → বাংলা ডিজিট
const enToBnDigitMap = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
  // optional punctuation
  ':': ':',
  ' ': ' ',
  ',': ',',
  // আপনি চাইলে ’.’ ‘/’ etc. add করতে পারেন
};

function toBanglaDigits(str) {
  if (typeof str !== 'string') {
    str = String(str);
  }
  let result = '';
  for (let ch of str) {
    result += (enToBnDigitMap[ch] !== undefined) ? enToBnDigitMap[ch] : ch;
  }
  return result;
}

// আপনার আগে থেকে থাকা ফাংশন
export const getBanglaAgoTime = (timestamp) => {
  if (!timestamp) return '';
  return dayjs(timestamp).fromNow();  // “২ ঘন্টা আগে” ইত্যাদি
};

// আপডেটেড formatBanglaDateTime যা বাংলা সংখ্যা ও মাস নাম সহ
export const formatBanglaDateTime = (timestamp) => {
  if (!timestamp) return '';
  let date;
  try {
    date = parseISO(timestamp);
  } catch (err) {
    date = new Date(timestamp);
  }
  // date-fns দিয়ে মৌলিক ফরম্যাট
  const formattedEn = format(date, "d MMMM yyyy, HH:mm", { locale: bn });
  // ইংরেজি ডিজিট গুলো বাংলা ডিজিটে রূপান্তর
  const formattedBn = toBanglaDigits(formattedEn);
  return formattedBn;
};
