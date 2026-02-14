'use client';

import { DataItem } from '@/app/commons/hooks/fetchStore';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

type User = {
  _id: string;
  fullName: string;
  fullNameGEO: string;
  profileUrl?: string;
  userBio?: string;
  userBioGEO?: string;
  products: DataItem[] | string;
};

type ArtistInfoProps = {
  userInfo: User | null | undefined;
};

const ArtistInfo: React.FC<ArtistInfoProps> = ({ userInfo }) => {
  const [isLoaded, setIsLoaded] = useState(true);

  const handleImageLoad = () => {
    setIsLoaded(false);
  };

  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section className='relative max-w-[1174px] w-full pb-[82px] flex justify-between'>
      <div className='relative w-full flex flex-col justify-between '>
        <div className='flex flex-col'>
          <div className='mb-[10px] sm:h-[142px] ss:mb-[35px] pt-[10px] flex flex-col'>
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
                {lang === 'en'
                  ? userInfo?.fullName.split(' ')[0]
                  : userInfo?.fullNameGEO.split(' ')[0]}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence mode='wait'>
              <motion.span
                key={i18next.language + 'header.signUp'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`font-RedRose font-light text-[28px] ss:text-[57px] leading-[34px] ss:leading-[71px] text-[#993056]  transition-opacity duration-1000 ${
                  isLoaded ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {lang === 'en'
                  ? userInfo?.fullName.split(' ')[1]
                  : userInfo?.fullNameGEO.split(' ')[1]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div className='w-full flex flex-col sm:flex-row justify-between items-'>
          <div className='ss:min-w-[390px] min-w-[180px] ss:max-w-[416px] max-w-[206px] mb-[21px] h-[204px] ss:h-[416px]'>
            <Image
              src={userInfo?.profileUrl || '/images/default-avatar.jpg'}
              alt='პორტრეტი'
              width={416}
              height={416}
              priority
              className={`object-cover  w-full h-full  transition-opacity duration-1000 ${
                isLoaded ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={handleImageLoad}
            />
          </div>
          <div className=' sm:ml-[20px]'>
            <AnimatePresence mode='wait'>
              <motion.span
                key={i18next.language + 'header.signUp'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`mb-[20px] font-RedRose font-light text-[16px] ss:text-[18px] leading-[19px] ss:leading-[22px] text-[#0600028b]  transition-opacity  duration-1000 ${
                  isLoaded ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {lang === 'en' ? userInfo?.userBio : 'userInfo?.userBioGEO'}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistInfo;
