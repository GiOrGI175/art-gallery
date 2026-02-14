'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

export const HeaderTitle: React.FC = () => {
  const { t } = useTranslation();

  return (
    <AnimatePresence mode='wait'>
      <motion.h2
        key={i18next.language + 'Artworks.artworks'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='sm:mt-[20px] font-Oswald font-medium text-[24px] sm:text-[57px] leading-[35px] sm:leading-[84px] text-[#060002] sm:text-[#CDCDCD]'
      >
        {t('Artworks.artworks')}
      </motion.h2>
    </AnimatePresence>
  );
};
