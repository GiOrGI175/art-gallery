'use client';

import useArtistStore from '@/app/commons/hooks/useIdStore';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

const ArtistSearch = () => {
  const allNames = useArtistStore((state) => state.allNames);
  const setFilteredNames = useArtistStore((state) => state.setFilteredNames);
  const setSearch = useArtistStore((state) => state.setSearch);
  const setFirstLetterArr = useArtistStore((state) => state.setFirstLetterArr);
  const setFilterAllLetter = useArtistStore(
    (state) => state.setFilterAllLetter
  );
  const search = useArtistStore((state) => state.search);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);

    const filtered = allNames.filter((name) =>
      (lang === 'ka' ? name.fullNameGEO : name.fullName)
        .toLowerCase()
        .startsWith(query.toLowerCase())
    );

    setFilteredNames(filtered);
    setFirstLetterArr([]);
    setFilterAllLetter([]);
  };

  const { i18n } = useTranslation();
  const lang = i18n.language;

  const { t } = useTranslation();

  return (
    <div className='max-w-[308px] w-full h-[40px] mt-[77px] flex justify-between items-center border-b-[1px] border-[#D04175]'>
      <AnimatePresence mode='wait'>
        <motion.input
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          type='text'
          placeholder={t('Artist.search')}
          className='w-full h-full border-[1px] bg-transparent border-none placeholder:font-RedRose placeholder:font-light placeholder:text-[32px] placeholder:leading-[40px] placeholder:text-[#C6C3C4] placeholder:w-[230px] font-RedRose font-light text-[32px] leading-[40px] text-[#C6C3C4] focus:outline-none'
          onChange={handleSearch}
          value={search}
        />
      </AnimatePresence>
      <Image src='/Search.svg' width={24} height={24} alt='search icon' />
    </div>
  );
};

export default ArtistSearch;
