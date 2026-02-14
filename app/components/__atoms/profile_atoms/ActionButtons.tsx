'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionButtonsProps {
  onFormSubmit: () => void;
  onLogOut: () => void;
  lang: string;
  t: (key: string) => string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onFormSubmit,
  onLogOut,
  lang,
  t,
}) => {
  return (
    <>
      <button
        onClick={onFormSubmit}
        className='w-[155px] h-[45px] bg-[#D04175] self-end rounded-[4px] mt-[30px]'
      >
        <AnimatePresence mode='wait'>
          <motion.span
            key={`${lang}-update`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {t('profile.update')}
          </motion.span>
        </AnimatePresence>
      </button>

      <button
        className='w-[121px] h-[40px] bg-black self-end border-[1px] border-[#6A6264] text-[#D04175] rounded-[4px] mt-[30px]'
        onClick={onLogOut}
      >
        <AnimatePresence mode='wait'>
          <motion.span
            key={`${lang}-logout`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {t('profile.logOut')}
          </motion.span>
        </AnimatePresence>
      </button>
    </>
  );
};
