'use client';

import { ABCD, ABCD_GEO } from '@/app/commons/services/ABC';
import { useEffect, useState, useMemo } from 'react';
import ArtistList from '../../__molecules/artists_molecules/ArtistList';
import useArtistStore from '@/app/commons/hooks/useIdStore';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

const Alphabet = () => {
  const {
    allNames,
    search,
    setFirstLetterArr,
    setSearch,
    setLetter,
    letter,
    setAllLetters,
    setFilterAllLetter,
  } = useArtistStore();

  const { i18n } = useTranslation();
  const lang = i18n.language;

  const ArtistSNames = useMemo(() => {
    if (!allNames || allNames.length === 0) return [];
    return allNames.map((artist) => ({
      fullName: artist.fullName,
      fullNameGEO: artist.fullNameGEO,
      _id: artist._id,
    }));
  }, [allNames]);

  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  const removeDuplicates = (data: string[]): string[] =>
    data.filter((value, index) => data.indexOf(value) === index);

  const filterByFirstLetter = (
    arr: { fullName: string; fullNameGEO: string; _id: string }[],
    lett: string
  ) => {
    setSearch('');

    const getFirstLetter = (name: string) =>
      name.trim().charAt(0).toLowerCase();

    const nameField = lang === 'en' ? 'fullName' : 'fullNameGEO';

    if (lett.toUpperCase() === 'ALL') {
      setFirstLetterArr([]);
      const alphabetArr = arr.map((item) => getFirstLetter(item[nameField]));
      const uniqueLetters = removeDuplicates(alphabetArr);

      setAllLetters(uniqueLetters);

      const groupedByLetter = uniqueLetters.map((letter) =>
        arr.filter((item) => getFirstLetter(item[nameField]) === letter)
      );

      setFilterAllLetter(groupedByLetter);
    } else {
      const filtered = arr.filter(
        (item) => getFirstLetter(item[nameField]) === lett.toLowerCase()
      );
      setFilterAllLetter([]);
      setFirstLetterArr(filtered);
    }
  };

  useEffect(() => {
    if (ArtistSNames.length > 0 && letter) {
      filterByFirstLetter(ArtistSNames, letter);
    }
  }, [ArtistSNames, letter, lang]);

  useEffect(() => {
    if (search !== '') {
      setHoveredIndex(null);
    }
  }, [search]);

  const currentAlphabet = lang === 'ka' ? ABCD_GEO : ABCD;

  return (
    <div className='mt-[10px] sm:mt-[87px] w-full flex flex-row-reverse sm:flex-col'>
      <div
        className={`sm:w-full pr-[10px] sm:pr-[0px] mb-[52px] sm:mb-[0px] flex justify-start lg:justify-center ${
          lang === 'en' ? 'gap-[24px]' : 'gap-[20px]'
        }  flex-col sm:flex-row sm:overflow-x-auto sm:px-[20px] lg:px-[0px]`}
      >
        {currentAlphabet.map((item, index) => (
          <AnimatePresence mode='wait' key={item.key}>
            <motion.div
              key={i18next.language + 'header.signUp'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`${
                lang === 'en' && ' min-w-[21px]'
              } max-w-[57px] mb-[8px] sm:mb-[20px] flex justify-center cursor-pointer`}
              onClick={() => {
                const selected = item.key;

                setHoveredIndex(index);
                setLetter(item.key);
                if (selected === 'ყველა' || selected === 'ALL') {
                  setLetter('ALL');
                } else {
                  setLetter(selected);
                }
              }}
            >
              <span
                className={`font-RedRose font-light text-[18px] sm:text-[28px] leading-[22px] sm:leading-[34px] text-[#060002] sm:text-[#B3B3B3] ${
                  hoveredIndex === index && '!text-[#D04175]'
                } hover:text-[#D04175] duration-500`}
              >
                {item.key}
              </span>
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
      <div className='w-full'>
        <ArtistList />
      </div>
    </div>
  );
};

export default Alphabet;
