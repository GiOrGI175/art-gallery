'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type artworksT = {
  _id: string;
  title: string;
  titleGEO: string;
  mainImgUrl: string;
};

type artistsT = {
  _id: string;
  fullName: string;
  fullNameGEO: string;
  profileUrl: string;
};

type serchResults = {
  artworks: artworksT[];
  artists: artistsT[];
};

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<serchResults>({
    artworks: [],
    artists: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout>(setTimeout(() => {}, 0));

  const fetchSuggestions = async (q: string) => {
    if (q.trim().length === 0) {
      setResults({ artworks: [], artists: [] });
      return;
    }

    const res = await fetch(
      `http://localhost:3005/users/search-suggestions?q=${encodeURIComponent(
        q
      )}`
    );

    const data = await res.json();
    console.log(data, 'data');
    setResults({
      artworks: Array.isArray(data.artworks) ? data.artworks : [],
      artists: Array.isArray(data.artists) ? data.artists : [],
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
      setIsOpen(true);
    }, 300);
  };

  const handleSelect = (type: 'artwork' | 'artist', id: string) => {
    setIsOpen(false);
    setQuery('');
    if (type === 'artwork') router.push(`/artworks/${id}`);
    else router.push(`/artists/${id}`);
  };

  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    console.log('💡 Search results:', results);
  }, [results]);

  return (
    <div>
      <div className='max-w-[510px]  h-[40px] mt-[264px] flex justify-between items-center border-b-[1px] border-[#D04175]'>
        <AnimatePresence mode='wait'>
          <motion.input
            key={i18next.language + 'header.signUp'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            value={query}
            onChange={handleChange}
            onFocus={() => query && setIsOpen(true)}
            type='text'
            aria-label='Search artist what you wont'
            placeholder={t('home.shearch')}
            className='w-full h-full border-[1px] bg-transparent border-none placeholder:font-RedRose placeholder:font-light placeholder:text-[32px] placeholder:leading-[40px] placeholder:text-[#C6C3C4] placeholder:max-w-[475px] focus:outline-none font-RedRose text-[32px] leading-[40px] text-[#C6C3C4]'
          />
        </AnimatePresence>
        <Image src='/Search.svg' width={26} height={26} alt='shearch Icon' />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className='mt-[5px] w-full border border-[#D04175]  shadow-lg z-50 overflow-hidden'
          >
            {results.artworks.length === 0 && results.artists.length === 0 && (
              <div className='p-4 text-center text-[#C6C3C4] font-RedRose bg-[#060002]'>
                {t('home.noResults')}
              </div>
            )}

            {results.artworks.length > 0 && (
              <>
                <div className='p-3 border-b border-[#D04175] bg-[#060002]'>
                  <AnimatePresence mode='wait'>
                    <motion.p
                      key={i18next.language + 'header.signUp'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className='font-Oswald font-medium text-[24px] leading-[25px] text-[#C6C3C4]'
                    >
                      {t('home.artworks')}
                    </motion.p>
                  </AnimatePresence>
                </div>
                {results.artworks.map((artwork) => (
                  <div
                    key={artwork._id}
                    onClick={() => handleSelect('artwork', artwork._id)}
                    className='flex items-center px-4 py-[15px] border-b-[1px] border-b-transparent  hover:border-b-[#D04175] duration-300 cursor-pointer bg-[#060002] hover:bg-[#0f0f0f]'
                  >
                    <Image
                      src={artwork.mainImgUrl}
                      width={75}
                      height={75}
                      alt='artwork picture'
                    />
                    <AnimatePresence mode='wait'>
                      <motion.span
                        key={i18next.language + 'header.signUp'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className='ml-[25px] font-Oswald font-normal text-[20px]  text-[#C6C3C4]'
                      >
                        {lang === 'en' ? artwork.title : artwork.titleGEO}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                ))}
              </>
            )}

            {results.artists.length > 0 && (
              <>
                <div className='p-3 border-b border-[#D04175]  bg-[#060002] '>
                  <AnimatePresence mode='wait'>
                    <motion.p
                      key={i18next.language + 'header.signUp'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className='font-Oswald font-medium text-[24px] leading-[25px] text-[#C6C3C4]'
                    >
                      {t('home.artists')}
                    </motion.p>
                  </AnimatePresence>
                </div>
                {results.artists.map((artist) => (
                  <div
                    key={artist._id}
                    onClick={() => handleSelect('artist', artist.fullName)}
                    className='flex items-center px-4 py-[15px] border-b-[1px] border-b-transparent  hover:border-b-[#D04175] duration-300 cursor-pointer bg-[#060002] hover:bg-[#0f0f0f]'
                  >
                    <Image
                      src={artist.profileUrl}
                      width={75}
                      height={75}
                      alt='artist picture'
                    />
                    <AnimatePresence mode='wait'>
                      <motion.span
                        key={i18next.language + 'header.signUp'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className='ml-[25px] font-Oswald font-normal text-[20px]  text-[#C6C3C4]'
                      >
                        {lang === 'en' ? artist.fullName : artist.fullNameGEO}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                ))}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
