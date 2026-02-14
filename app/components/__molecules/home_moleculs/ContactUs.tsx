import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

const ContactUs = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <section className='relative w-full flex flex-col items-center z-20'>
      <div className='max-w-[1280px] w-full sm:py-[40px] flex-col '>
        {' '}
        <AnimatePresence mode='wait'>
          <motion.h6
            key={i18next.language + 'header.signUp'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='hidden sm:block mb-[25px] font-Oswald font-medium text-[57px] leading-[84px] text-[#CDCDCD] '
          >
            {t('home.delivery')}
          </motion.h6>
        </AnimatePresence>
        h6
        <div
          className={`relative flex sm:hidden items-center h-[56px] ${
            lang === 'en' ? 'max-w-[198px]' : 'max-w-[270px]'
          }   duration-700 `}
        >
          <AnimatePresence mode='wait'>
            <motion.h6
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`absolute  ${
                lang === 'en' ? 'w-[198px]' : 'max-w-[370px]'
              } font-Oswald font-medium text-[24px] leading-[25px] text-[#CDCDCD] z-20 `}
            >
              {t('home.deliveryMobile')}
            </motion.h6>
          </AnimatePresence>
          <div className='absolute top-[52%] z-10 w-full h-[6px] bg-[#D04175]' />
        </div>
        <div className='flex flex-col pb-[37px] sm:pb-[0px] sm:py-[20px]'>
          <AnimatePresence mode='wait'>
            <motion.p
              key={i18next.language + 'header.signUp'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='hidden sm:block max-w-[1060px] font-Oswald font-extralight text-[16px] leading-[23px] text-[#E4E4E433]'
            >
              {t('home.deliveryInfo')}
            </motion.p>
          </AnimatePresence>
          <div className='sm:mt-[30px] flex flex-col sm:flex-row justify-between gap-[10px]'>
            <div className='flex flex-col gap-[5px]'>
              <span className='font-Oswald font-normal text-[16px] leading-[18px] text-[#E4E4E4] sm:opacity-50 '>
                Average delivery:
              </span>
              <div className='flex flex-col gap-[5px]'>
                <span className='font-Oswald font-normal text-[16px] leading-[18px] text-[#E4E4E4] sm:opacity-50'>
                  Within GE:
                  <span className='font-Oswald font-extralight text-[16px] leading-[18px] text-[#E4E4E4] sm:opacity-50'>
                    2-5 working days
                  </span>
                </span>
                <span className='font-Oswald font-normal text-[16px] leading-[18px] text-[#E4E4E4] sm:opacity-50'>
                  International Delivery:
                  <span className='font-Oswald font-extralight text-[16px] leading-[18px] text-[#E4E4E4] sm:opacity-50'>
                    6-14 working days
                  </span>
                </span>
              </div>
            </div>
            <div className='mt-[25px] sm:mt-[0px] flex flex-col gap-[10px]'>
              <span className='font-Oswald font-normal ss:text-[22px] ss:leading-[18px] text-[#E4E4E4] sm:opacity-50'>
                EMAIL:
                <span className='font-Oswald font-extralight ss:text-[22px] ss:leading-[18px] text-[#E4E4E4] sm:opacity-50'>
                  KACHARAVA.TAMARI12@GMAIL.COM
                </span>
              </span>
              <span className='font-Oswald font-normal ss:text-[22px] ss:leading-[18px] text-[#E4E4E4] sm:opacity-50'>
                WHATSUPP:
                <span className='font-Oswald font-extralight ss:text-[22px] ss:leading-[18px] text-[#E4E4E4] sm:opacity-50'>
                  +000-00-00-00
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='relative h-[213px] w-full hidden sm:flex justify-center'>
        <Image
          src='/ExperienceArt.webp'
          width={1403}
          height={213}
          alt='ExperienceArt'
          className='absolute top-[140px] md:top-[120px] lg:top-[68px]'
        />
      </div>
    </section>
  );
};

export default ContactUs;
