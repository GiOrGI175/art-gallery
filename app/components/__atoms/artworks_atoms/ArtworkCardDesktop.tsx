// ArtworkCardDesktop.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DataItem } from '@/app/commons/hooks/fetchStore';
import FavoriteButtonDesk from './FavoriteButtonDesk';
import EditButton from './EditButton';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

type ArtworkCardDesktopProps = {
  item: DataItem;
  colIndex: number;
  index: number;
  isFavorited: boolean;
  isLoading: boolean;
  onToggleFavorite: (id: string) => void;
  onImageLoad: () => void;
  isLoaded: boolean;
  heights: number[][];
  imgHeights: number[][];
};

const ArtworkCardDesktop: React.FC<ArtworkCardDesktopProps> = ({
  item,
  colIndex,
  index,
  isFavorited,
  isLoading,
  onToggleFavorite,
  onImageLoad,
  isLoaded,
  heights,
  imgHeights,
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const pathname = usePathname();

  const showEdit = pathname === '/profile';

  return (
    <Link href={`/artworks/${item._id}`}>
      <div
        className='relative max-w-[416px] w-full h-full pt-[40px]'
        style={{ height: `${heights[colIndex][index % 3]}px` }}
      >
        {isLoaded && (
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='spinner'></div>
          </div>
        )}

        <Image
          src={item.mainImgUrl}
          width={416}
          height={heights[colIndex][index % 3]}
          alt='art'
          loading='lazy'
          className={`object-cover hover:opacity-[70%] w-full transition-opacity duration-1000 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ height: `${imgHeights[colIndex][index % 3]}px` }}
          onLoad={onImageLoad}
        />

        {showEdit && <EditButton itemId={item._id} item={item} />}

        <FavoriteButtonDesk
          isFavorited={isFavorited}
          isLoading={isLoading}
          onClick={() => onToggleFavorite(item._id)}
        />

        <div className='flex justify-between items-center w-full'>
          <div>
            <AnimatePresence mode='wait'>
              <motion.h3
                key={i18next.language + 'header.signUp'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='font-Oswald text-start font-normal text-[28px] leading-[41px] text-[#D04175]'
              >
                {lang === 'en' ? item.title.toUpperCase() : item.titleGEO}
              </motion.h3>{' '}
            </AnimatePresence>

            <AnimatePresence mode='wait'>
              <motion.p
                key={i18next.language + 'header.signUp'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='font-RedRose text-start font-light text-[22px] leading-[27px] opacity-40 text-[#DDDDDD]'
              >
                {lang === 'en'
                  ? item.user.fullName.toUpperCase()
                  : item.user.fullNameGEO}
              </motion.p>
            </AnimatePresence>
          </div>
          <span className='font-Oswald font-medium text-[28px] leading-[41px] text-[#DDDDDD]'>
            ${item.price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArtworkCardDesktop;
