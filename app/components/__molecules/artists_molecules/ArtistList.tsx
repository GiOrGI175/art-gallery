'use client';

import useArtistStore from '@/app/commons/hooks/useIdStore';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

type Artist = {
  _id: string;
  fullName: string;
  fullNameGEO: string;
  profileUrl?: string;
};

const ArtistList = () => {
  const {
    firstLetterArr,
    filterAllLetter,
    allLetters,
    filteredNames,
    search,
    letter,
  } = useArtistStore();

  const [loadedItems, setLoadedItems] = useState(3);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const loadMoreItems = () => {
    setLoadedItems((prev) => prev + 3);
  };

  return (
    <div className='pb-[76px]'>
      {/* Desktop Grouped View */}
      <div className='hidden sm:flex flex-wrap justify-between'>
        {filterAllLetter.slice(0, loadedItems * 3).map((group, index) => (
          <div key={index} className='flex flex-col grow basis-[365px]'>
            <AnimatePresence mode='wait'>
              <motion.span
                key={`${lang}-letter-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='py-[37px] font-RedRose font-normal text-[36px] leading-[44px] text-[#D04175]'
              >
                {allLetters[index].toUpperCase()}
              </motion.span>
            </AnimatePresence>

            {group.map((artist: Artist) => (
              <Link key={artist._id} href={`/artists/${artist.fullName}`}>
                <AnimatePresence mode='wait'>
                  <motion.span
                    key={`${artist._id}-${lang}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='font-Oswald font-light text-[28px] leading-[41px] text-[#E4E4E480] hover:font-bold '
                  >
                    {lang === 'en' ? artist.fullName : artist.fullNameGEO}
                  </motion.span>
                </AnimatePresence>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile Grouped View */}
      <div className='flex sm:hidden flex-wrap justify-between'>
        {filterAllLetter.map((group, index) => (
          <div key={index} className='flex flex-col grow basis-[365px]'>
            <AnimatePresence mode='wait'>
              <motion.span
                key={`${lang}-mobile-letter-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='pb-[10px] font-RedRose font-normal text-[28px] leading-[34px] text-[#D04175]'
              >
                {allLetters[index]}
              </motion.span>
            </AnimatePresence>

            {group.map((artist: Artist) => (
              <Link key={artist._id} href={`/artists/${artist.fullName}`}>
                <AnimatePresence mode='wait'>
                  <motion.span
                    key={`${artist._id}-mobile-${lang}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='font-Oswald font-light text-[18px] leading-[26px] text-[#060002]'
                  >
                    {lang === 'en' ? artist.fullName : artist.fullNameGEO}
                  </motion.span>
                </AnimatePresence>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Single Letter View */}
      <div className='w-full flex flex-col'>
        {firstLetterArr.length === 0 &&
        filteredNames.length === 0 &&
        letter !== 'ALL' &&
        letter !== '' ? (
          <AnimatePresence mode='wait'>
            <motion.span
              key={`${lang}-notfound`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='sm:pt-[37px] pb-[10px] sm:pb-[37px] font-RedRose font-normal text-[24px] sm:text-[36px] leading-[35px] sm:leading-[44px] text-[#D04175]'
            >
              {t('Artist.notFound')}
            </motion.span>
          </AnimatePresence>
        ) : (
          <span className='sm:pt-[37px] pb-[10px] sm:pb-[37px] font-RedRose font-normal text-[36px] leading-[44px] text-[#D04175]'>
            {letter !== 'ALL' &&
              search === '' &&
              firstLetterArr.length !== 0 &&
              letter}
          </span>
        )}

        {firstLetterArr.map((artist) => (
          <Link key={artist._id} href={`/artists/${artist.fullName}`}>
            <span className='font-Oswald font-light text-[18px] sm:text-[28px] leading-[41px] text-[#060002] sm:text-[#E4E4E4] sm:opacity-[50%] hover:font-bold '>
              {lang === 'en' ? artist.fullName : artist.fullNameGEO}
            </span>
          </Link>
        ))}
      </div>

      {/* Search View */}
      {search && (
        <div className='relative top-[-74px] w-full flex flex-col'>
          <AnimatePresence mode='wait'>
            <motion.span
              key={`${lang}-search-letter`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='pt-[37px] pb-[37px] font-RedRose font-normal text-[36px] leading-[44px] text-[#D04175]'
            >
              {search && filteredNames.length !== 0 && search[0].toUpperCase()}
            </motion.span>
          </AnimatePresence>

          {filteredNames.map((artist) => (
            <Link key={artist._id} href={`/artists/${artist.fullName}`}>
              <AnimatePresence mode='wait'>
                <motion.span
                  key={`${artist._id}-search-${lang}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='font-Oswald font-light text-[28px] leading-[41px] text-[#E4E4E480] hover:font-bold '
                >
                  {lang === 'en' ? artist.fullName : artist.fullNameGEO}
                </motion.span>
              </AnimatePresence>
            </Link>
          ))}
        </div>
      )}

      {/* Show More Button */}
      {letter === 'ALL' && (
        <div className='w-full pt-[73px] pb-[95px] hidden sm:flex justify-end'>
          <button
            onClick={loadMoreItems}
            className='border-b-[1px] border-[#D04175] self-end'
          >
            <span className='font-RedRose font-normal text-[20px] leading-[24px] opacity-[50%] text-[#FFFFFF80]'>
              Show All
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ArtistList;
