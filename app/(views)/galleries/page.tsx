'use client';

import useArtStore from '@/app/commons/hooks/fetchStore';
import Consultation from '@/app/components/__molecules/artworks_molecules/Consultation';
import Gallery from '@/app/components/__organisms/gallery_organisms/Gallery';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

export default function Page() {
  const { t } = useTranslation();

  const token = useArtStore((state) => state.token);
  const setToken = useArtStore((state) => state.setToken);

  useEffect(() => {
    const getToken = async () => {
      const token = await getCookie('auth_token');
      if (token) {
        setToken(token);
      } else {
        setToken(undefined);
      }
    };
    getToken();
  }, [setToken, token]);

  return (
    <>
      <div className='w-full flex-col flex  items-center  bg-[#060002] sm:px-[20px]'>
        <div className='max-w-[1280px] w-full  bg-[#D9D9D9] xs:bg-[#060002]'>
          <AnimatePresence mode='wait'>
            <motion.h2
              key={i18next.language + 'header.signUp'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='mt-[10px] xs:mt-[20px] px-[20px] sm:px-[0px] pb-[10px] xs:pb-[52px] font-Oswald font-medium text-[24px] xs:text-[57px] leading-[35px] xs:leading-[84px] text-[#060002] xs:text-[#CDCDCD]'
            >
              {t('Galleries.galleries')}
            </motion.h2>{' '}
          </AnimatePresence>
        </div>
        <div className=' w-full flex-col flex  items-center bg-[#D9D9D9]  xs:bg-[#060002] px-[20px] sm:px-[0px]'>
          <Gallery />
        </div>
      </div>
      <div className=' w-full flex-col flex  items-center  bg-[#D5D5D5]'>
        <Consultation />
      </div>
    </>
  );
}
