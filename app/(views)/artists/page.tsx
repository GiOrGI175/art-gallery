'use client';

import useAppBtn from '@/app/commons/hooks/setStore';
import useArtistStore from '@/app/commons/hooks/useIdStore';
import ArtistSearch from '@/app/components/__atoms/artists_atoms/ArtistSearch';
import Consultation from '@/app/components/__molecules/artworks_molecules/Consultation';
import Alphabet from '@/app/components/__organisms/artists_organisms/Alphabet';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

export default function Page() {
  const fetchArtists = useArtistStore((state) => state.fetchArtists);
  const isLoading = useArtistStore((state) => state.isLoading);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  const setOverlay = useAppBtn((state) => state.setOverlay);

  const { t } = useTranslation();

  return (
    <div className='w-full flex-col flex  items-center bg-[#D9D9D9] sm:bg-[#060002]'>
      <div className='w-full flex justify-center px-[20px]'>
        <div className='max-w-[1280px] w-full '>
          <AnimatePresence mode='wait'>
            <motion.h2
              key={i18next.language + 'header.signUp'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='mt-[10px] sm:mt-[20px] font-Oswald font-medium text-[24px] sm:text-[57px] leading-[84px] text-[#060002] sm:text-[#CDCDCD]'
            >
              {t('Artist.artist')}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>
      {isLoading ? (
        <div className='w-full h-[80dvh] flex justify-center items-center '>
          <span className='font-Oswald text-start font-normal text-[40px] leading-[41px] text-[#D04175]'>
            Loading...
          </span>
        </div>
      ) : (
        <div className='w-full flex-col flex items-center'>
          <div className='w-full hidden sm:flex justify-center px-[20px]'>
            <div className='max-w-[1280px] w-full '>
              <ArtistSearch />
            </div>
          </div>
          <div className='w-full flex justify-center px-[20px]'>
            <div className='max-w-[1280px] w-full '>
              <Alphabet />
            </div>
          </div>
        </div>
      )}
      <div className=' w-full flex-col flex  items-center  bg-[#D5D5D5]'>
        <Consultation />
      </div>

      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-20 ${
          setOverlay ? 'block ' : 'hidden'
        }  `}
      ></div>
    </div>
  );
}
