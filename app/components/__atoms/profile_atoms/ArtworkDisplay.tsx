'use client';
import React from 'react';
import ArtsSection from '../../__organisms/artWorks_organisms/ArtsSection';
import MyArtworksMobile from '../../__organisms/profile_organisms/MyArtworksMobile';
import useArtStore, { DataItem } from '@/app/commons/hooks/fetchStore';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

interface Props {
  artistData: DataItem[] | null;
}

export default function ArtworksDisplay({ artistData }: Props) {
  const fetchArtistData = useArtStore((state) => state.fetchArtistData);

  const { t } = useTranslation();

  return (
    <div className='mt-[80px]'>
      <AnimatePresence mode='wait'>
        <motion.h5
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='sm:mt-[20px] font-Oswald font-medium text-[24px] sm:text-[57px] leading-[35px] sm:leading-[84px] text-[#060002] sm:text-[#CDCDCD]'
        >
          {t('profile.myArtworks')}
        </motion.h5>
      </AnimatePresence>
      <div className='max-w-[1440px] w-full hidden sm:flex justify-center '>
        <ArtsSection fetchData={fetchArtistData} allData={artistData} />
      </div>
      <div className='max-w-[1440px] w-full sm:hidden flex justify-center pb-[20px]'>
        <MyArtworksMobile allData={artistData} />
      </div>
    </div>
  );
}
