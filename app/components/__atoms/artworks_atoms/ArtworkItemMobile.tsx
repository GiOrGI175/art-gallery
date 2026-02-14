'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';
import { DataItem } from '@/app/commons/hooks/fetchStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18next from '@/app/i18n/i18next';

type ArtworkItemMobileProps = {
  item: DataItem;
  changeColor: boolean;
  isLoaded: boolean;
  onImageLoad: () => void;
  onToggleFavorite: (id: string) => void;
  isFavorited: boolean;
  isLoading: boolean;
};

const ArtworkItemMobile: React.FC<ArtworkItemMobileProps> = ({
  item,
  changeColor,
  isLoaded,
  onImageLoad,
  onToggleFavorite,
  isFavorited,
  isLoading,
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <Link href={`/artworks/${item._id}`}>
      <div className='relative w-auto h-[287px]'>
        <div className='max-w-[416px] w-full !max-h-[230px] h-full'>
          {isLoaded && (
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <div className='spinner'></div>
            </div>
          )}
          <Image
            src={item.mainImgUrl}
            width={416}
            height={400}
            alt='Artwork'
            className={`w-[416px] hover:opacity-[80%] !h-full object-cover transition-opacity duration-1000 ${
              isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={onImageLoad}
          />
        </div>

        <FavoriteButton
          isFavorited={isFavorited}
          isLoading={isLoading}
          onClick={() => onToggleFavorite(item._id)}
        />

        <div className='flex justify-between items-center'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={i18next.language + 'header.signUp'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h3
                className={`font-Oswald font-normal  ${
                  lang === 'en'
                    ? 'text-[16px] leading-[23px]'
                    : 'text-[10px] leading-[18px]'
                }   text-[#D04175]`}
              >
                {lang === 'en'
                  ? item.user.fullName.toUpperCase()
                  : item.user.fullNameGEO}
              </h3>
              <p
                className={`font-RedRose text-start font-light ${
                  lang === 'en' ? 'text-[13px]' : 'text-[10px]'
                }  leading-[17px] opacity-40 ${
                  changeColor ? 'text-[#060002]' : 'text-[#DDDDDD]'
                }`}
              >
                {lang === 'en' ? item.title.toUpperCase() : item.titleGEO}
              </p>
            </motion.div>
          </AnimatePresence>
          <span
            className={`font-Oswald font-medium text-[14px] leading-[20px] ${
              changeColor ? 'text-[#060002]' : 'text-[#DDDDDD]'
            }`}
          >
            ${item.price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArtworkItemMobile;
