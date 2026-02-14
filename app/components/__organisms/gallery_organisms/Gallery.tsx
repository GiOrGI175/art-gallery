'use client';

import useArtStore, { GalleryData } from '@/app/commons/hooks/fetchStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

const Gallery = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const fetchGallery = useArtStore((state) => state.fetchGallery);
  const gallerysDataZ = useArtStore((state) => state.gallerysData);
  const Galletyloading = useArtStore((state) => state.Galletyloading);

  const [gallerysData, setGallerysData] = useState<GalleryData[]>([]);

  useEffect(() => {
    fetchGallery();
    setGallerysData(gallerysDataZ);
    console.log(gallerysData);
  }, [fetchGallery, gallerysDataZ]);

  const [isLoaded, setIsLoaded] = useState(true);

  const handleImageLoad = () => {
    setIsLoaded(false);
  };

  return (
    <section className='max-w-[1440px] w-full flex justify-center'>
      {Galletyloading ? (
        <div className='w-full h-[1000px] flex justify-center'>
          <span className='mt-[200px] font-Oswald text-start font-normal text-[40px] sm:text-[100px] leading-[41px] text-[#D04175]'>
            {t('common.loading')}
          </span>
        </div>
      ) : (
        <div className='max-w-[1280px] pb-[20px] w-full grid grid-cols-1 sm:grid-cols-2 gap-[32px] justify-items-center items-center'>
          {gallerysDataZ.map((item, index) => (
            <div
              key={index}
              className='max-w-[623px]  xs:h-[832px] w-full mb-[20px] xs:mb-[157px]'
            >
              <div className='mt-[10px] mb-[15px] block xs:hidden'>
                <AnimatePresence mode='wait'>
                  <motion.h3
                    key={i18next.language + 'header.signUp'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='font-Oswald font-normal text-[20px] leading-[30px] text-[#060002]'
                  >
                    {lang === 'en' ? item.name : item.nameGEO}
                  </motion.h3>
                </AnimatePresence>
                <AnimatePresence mode='wait'>
                  <motion.p
                    key={i18next.language + 'header.signUp'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='font-Oswald font-light text-[18px] leading-[22px] text-[#060002] opacity-[70%]'
                  >
                    {lang === 'en' ? item.addres : item.addresGEO}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className='max-w-[632px] h-[510px] w-full relative'>
                {isLoaded && (
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <div className='spinner'></div>
                  </div>
                )}
                <Image
                  src={item.mainImgUrl}
                  width={0}
                  height={0}
                  sizes='100vw'
                  style={{ width: '100%', height: '100%' }}
                  alt='galleryImg'
                  className={`object-cover w-full h-full transition-opacity duration-1000 ${
                    isLoaded ? 'opacity-0' : 'opacity-100'
                  }`}
                  onLoad={handleImageLoad}
                />
              </div>
              <div className='mt-[10px] hidden xs:block'>
                <AnimatePresence mode='wait'>
                  <motion.h3
                    key={i18next.language + 'header.signUp'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='font-Oswald font-normal text-[45px] leading-[66px] text-[#DDDDDD]'
                  >
                    {lang === 'en' ? item.name : item.nameGEO}
                  </motion.h3>
                </AnimatePresence>
                <AnimatePresence mode='wait'>
                  <motion.p
                    key={i18next.language + 'header.signUp'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='font-Oswald font-light text-[32px] leading-[40px] text-[#DDDDDD] opacity-[50%]'
                  >
                    {lang === 'en' ? item.addres : item.addresGEO}
                  </motion.p>
                </AnimatePresence>
              </div>
              <AnimatePresence mode='wait'>
                <motion.p
                  key={i18next.language + 'header.signUp'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='mt-[13px] font-RedRose font-light text-[16px] xs:text-[18px] leading-[20px] xs:leading-[22px] text-[#53494C] xs:text-[#DDDDDD] opacity-[50%]'
                >
                  {lang === 'en' ? item.info : item.infoGEO}
                </motion.p>
              </AnimatePresence>
              <Link href={`/galleries/${item._id}`}>
                <button
                  className='mt-[20px] group w-full h-[48px] xs:h-[84px] bg-[#D04175] rounded-[4px] hover:bg-[#993056] duration-500'
                  aria-label='see gallerys arts'
                >
                  <AnimatePresence mode='wait'>
                    <motion.span
                      key={i18next.language + 'galleries.galleryBtn'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className='font-RedRose font-normal text-[22px] leading-[27px] text-[#060002] group-hover:text-[#DDDDDD] duration-500'
                    >
                      {t('Galleries.galleryBtn')}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Gallery;
