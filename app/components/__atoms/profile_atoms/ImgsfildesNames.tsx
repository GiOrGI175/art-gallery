'use client';

import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

const ImgsfildesNames = () => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col justify-between sm:h-[630px]'>
      <AnimatePresence mode='wait'>
        <motion.h3
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='text-[#DDDDDD] font-light text-[28px] leading-[41px]'
        >
          {t('profile.mainImage')}
        </motion.h3>
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        <motion.h3
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='text-[#DDDDDD] font-light text-[28px] leading-[41px] hidden sm:flex'
        >
          {t('profile.addMockUp')}
        </motion.h3>
      </AnimatePresence>
    </div>
  );
};

export default ImgsfildesNames;
