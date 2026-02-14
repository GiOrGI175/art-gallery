'use client';

import { GalleryData } from '@/app/commons/hooks/fetchStore';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

type GalleryInfoProps = {
  galleryInfo: GalleryData | undefined;
};

const GalleryInfo: React.FC<GalleryInfoProps> = ({ galleryInfo }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [isLoaded, setIsLoaded] = useState(true);

  const handleImageLoad = () => {
    setIsLoaded(false);
  };

  return (
    <section className='relative max-w-[1174px] w-full pb-[82px] flex'>
      <div className='relative w-full flex flex-col justify-between'>
        <div className='flex flex-col'>
          <div className='w-[91px] ss:w-[238px] mb-[10px] ss:mb-[35px] pt-[10px] flex flex-col'>
            <AnimatePresence mode='wait'>
              <motion.span
                key={i18next.language + 'header.signUp'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`font-RedRose font-light text-[28px] ss:text-[57px] leading-[34px] ss:leading-[71px] text-[#993056] transition-opacity duration-1000 ${
                  isLoaded ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {lang === 'en' ? galleryInfo?.name : galleryInfo?.nameGEO}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div className='w-full flex flex-col sm:flex-row justify-between '>
          <div className='ss:min-w-[390px] min-w-[180px] ss:max-w-[416px] max-w-[206px] mb-[21px] h-[204px] ss:h-[416px]'>
            <Image
              src={galleryInfo?.mainImgUrl || 'art.svg'}
              alt='Gallery Image'
              width={416}
              height={416}
              className={`object-cover w-full h-full  transition-opacity duration-1000 ${
                isLoaded ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={handleImageLoad}
            />
          </div>
          <div className='max-w-[634px] sm:ml-[20px]'>
            {' '}
            <AnimatePresence mode='wait'>
              <motion.p
                key={i18next.language + 'header.signUp'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`mb-[20px] font-RedRose font-light text-[16px] ss:text-[18px] leading-[19px] ss:leading-[22px] text-[#DDDDDD]  text-[#0600028b] transition-opacity duration-1000 ${
                  isLoaded ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {lang === 'en' ? galleryInfo?.info : galleryInfo?.infoGEO}
              </motion.p>
            </AnimatePresence>
            <AnimatePresence mode='wait'>
              <motion.p
                key={i18next.language + 'header.signUp'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`max-w-[634px] font-RedRose font-light text-[16px] ss:text-[18px] leading-[19px] ss:leading-[22px] text-[#DDDDDD]   text-[#0600028b]  transition-opacity duration-1000 ${
                  isLoaded ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {lang === 'en' ? galleryInfo?.details : galleryInfo?.detailsGEO}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryInfo;
