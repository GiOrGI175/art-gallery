'use client';

import { useEffect, useState } from 'react';
import i18next from '@/app/i18n/i18next'; // სწორად პირდაპირ i18next ობიექტი

const LangBtn = () => {
  const [currentLang, setCurrentLang] = useState(i18next.language || 'en');

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ka' : 'en';
    i18next.changeLanguage(newLang).then(() => {
      document.documentElement.lang = newLang;
      setCurrentLang(newLang);
    });
  };

  useEffect(() => {
    const handleLangChange = (lng: string) => {
      setCurrentLang(lng);
    };
    i18next.on('languageChanged', handleLangChange);
    return () => i18next.off('languageChanged', handleLangChange);
  }, []);

  return (
    <button
      className={`w-[58px] h-[29px]  px-[16px] rounded-[4px] border-[1px] hidden sm:flex self-end ${
        currentLang === 'ka' ? 'border-[#D04175]' : 'bg-transparent'
      }`}
      aria-label='Translate Website'
      onClick={toggleLanguage}
    >
      <span>{currentLang === 'en' ? 'KA' : 'EN'}</span>
    </button>
  );
};

export default LangBtn;
