'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

interface ProfileHeaderProps {
  userName: string | null;
  userNameGEO: string | null;
  lang: string;
  t: (key: string) => string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userName,
  userNameGEO,
  lang,
  t,
}) => {
  return (
    <div className='flex justify-between items-end'>
      <AnimatePresence mode='wait'>
        <motion.h2
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='text-[20px] ss:text-[57px] font-light text-[#DDDDDD] leading-[71px] w-[296px]'
        >
          {lang === 'en' ? userName : userNameGEO}
        </motion.h2>
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        <motion.h5
          key={`${lang}-notfound`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='text-[#DDDDDD] font-normal text-[22px] leading-[32px]'
        >
          {t('profile.artistInfo')}
        </motion.h5>
      </AnimatePresence>
    </div>
  );
};
