'use client';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

const Consultation = () => {
  const { t } = useTranslation();

  return (
    <section className='max-w-[1440px] w-full flex justify-center px-[20px] pb-[50px] sm:pb-[0px]'>
      <div className='max-w-[1280px] w-full flex flex-col'>
        <AnimatePresence mode='wait'>
          <motion.h3
            key={i18next.language + 'header.signUp'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='mt-[40px] mb-[10px] sm:mb-[25px] font-Oswald font-medium text-[24px] sm:text-[57px] leading-[35px] sm:leading-[84px] text-[#060002]'
          >
            {t('Artworks.consultation')}
          </motion.h3>
        </AnimatePresence>
        <div className=' sm:pb-[57px] sm:pt-[23px] flex flex-col sm:flex-row justify-between'>
          <AnimatePresence mode='wait'>
            <motion.p
              key={i18next.language + 'header.signUp'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='max-w-[738px] mr-[30px] font-Oswald  font-extralight text-[16px] leading-[29px] text-[#060002] opacity-60 '
            >
              {t('Artworks.consultationInfo')}
            </motion.p>
          </AnimatePresence>
          <div className='flex flex-col gap-[10px] mt-[10px] sm:mt-[0px]'>
            <span className='font-Oswald font-normal text-[18px] sm:text-[22px] leading-[26px] sm:leading-[18px] text-[#060002]'>
              EMAIL:
              <span className='font-Oswald font-extralight text-[18px] sm:text-[22px] leading-[26px] sm:leading-[18px] text-[#060002] '>
                KACHARAVA.TAMARI12@GMAIL.COM
              </span>
            </span>
            <span className='font-Oswald font-normal text-[18px] sm:text-[22px] leading-[26px] sm:leading-[18px] text-[#060002] '>
              WHATSUPP:
              <span className='font-Oswald font-extralight text-[18px] sm:text-[22px] leading-[26px] sm:leading-[18px] text-[#060002] '>
                +000-00-00-00
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consultation;
