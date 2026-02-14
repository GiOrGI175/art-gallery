'use client';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

const OurStory = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <div className='max-w-[1280px] w-full py-[40px]'>
      <div
        className={`relative h-[83px]  ${
          lang === 'en'
            ? 'max-w-[100px] xs:max-w-[210px]'
            : 'max-w-[200px] xs:max-w-[420px]'
        }   duration-700 `}
      >
        <AnimatePresence mode='wait'>
          <motion.h3
            key={i18next.language + 'header.signUp'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute font-Oswald font-medium text-[24px] ${
              lang === 'en' ? 'xs:text-[57px]' : 'xs:text-[45px]'
            } leading-[84px] text-[#CDCDCD] z-20   ${
              lang === 'en' ? 'w-[198px]' : 'max-w-[400px]'
            }`}
          >
            {t('home.ourStory')}
          </motion.h3>
        </AnimatePresence>
        <div className='absolute top-[53%]  z-10 w-full  h-[5px] xs:h-[14px] bg-[#D04175]' />
      </div>
      <AnimatePresence mode='wait'>
        <motion.p
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='font-Oswald py-[20px] font-extralight text-[16px] leading-[23px] text-[#E4E4E433]  opacity-20'
        >
          {t('home.storyInfo')}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default OurStory;
