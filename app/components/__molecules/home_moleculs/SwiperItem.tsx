'use client';

import useArtStore, { DataItem } from '@/app/commons/hooks/fetchStore';
import useAppBtn from '@/app/commons/hooks/setStore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

type ProductCardSwipperProps = {
  item: DataItem;
  height: number;
};

const SwiperItem: React.FC<ProductCardSwipperProps> = ({ item, height }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [favorite, setFavorite] = useState<string[]>([]);

  const [heartLoader, setHeartLoader] = useState<{ [key: string]: boolean }>(
    {}
  );

  const token = useArtStore((state) => state.token);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        'http://localhost:3005/products/getFavorites',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data, 'data fav');
      setFavorite(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFavorites();
    }
  }, [token]);

  const PostFavorites = async (id: string | null) => {
    try {
      const response = await fetch(
        `http://localhost:3005/products/favorites/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedFavorites = await response.json();

        console.log(updatedFavorites, 'updatedFavorites');

        setFavorite(updatedFavorites);
      } else {
        console.error('Failed to toggle favorite');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const toggleOverlay = useAppBtn((state) => state.toggleOverlay);

  const toggleAuth = useAppBtn((state) => state.toggleAuth);

  const toggleFavorite = async (id: string) => {
    if (token !== undefined) {
      setHeartLoader((prev) => ({ ...prev, [id]: true }));

      await PostFavorites(id);

      setHeartLoader((prev) => ({ ...prev, [id]: false }));
    } else {
      toggleOverlay(true);
      toggleAuth();
    }
  };

  return (
    <Link href={`/artworks/${item._id}`}>
      <div
        className={`swiper-item relative flex flex-col items-center justify-center !bg-[#f4f4f4] `}
        style={{ height: `${height - 68}px` }}
      >
        <div className='relative w-full h-full'>
          <Image
            src={item.mainImgUrl}
            alt={item.title}
            layout='fill'
            objectFit='cover'
            className='object-cover hover:opacity-[80%] duration-700'
          />
          <button
            className='absolute top-[18px] right-[16px]'
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(item._id);
            }}
          >
            {heartLoader[item._id] ? (
              <div className='spinner !w-[22px] !h-[22px] !border-[2px] !border-t-[2px]'></div>
            ) : (
              <Image
                src={
                  favorite.includes(item._id) ? '/full_heart.svg' : '/heart.svg'
                }
                width={24}
                height={24}
                alt='Favorite'
              />
            )}
          </button>
          <div className='absolute bottom-[-64px] flex justify-between items-center w-full'>
            <div className=''>
              <h3 className='font-Oswald text-start font-normal text-[28px] leading-[41px] text-[#D04175]'>
                {item.user.fullName.toUpperCase()}
              </h3>
              <AnimatePresence mode='wait'>
                <motion.p
                  key={i18next.language + 'header.signUp'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='font-RedRose text-start font-light text-[22px] leading-[27px] opacity-40 text-[#000000]'
                >
                  {lang === 'en'
                    ? item.title.toUpperCase()
                    : item.titleGEO.toUpperCase()}
                </motion.p>
              </AnimatePresence>
            </div>
            <div>
              <span className='font-Oswald font-medium text-[28px] leading-[41px] text-[#000000]'>
                ${item.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SwiperItem;
