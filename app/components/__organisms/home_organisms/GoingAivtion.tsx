'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

interface Product {
  _id: string;
  mainImgUrl: string;
  title: string;
  titleGEO: string;
  artist: string;
  price: string;
  startingPrice: string;
  latestBidAmount: string;
}

interface AuctionItem {
  _id: string;
  startDate: string;
  endDate: string;
  product: Product;
  latestBidAmount: string;
  id: number;
}
// import { AuctionItem } from '../../__molecules/auctions_molecules/OnGoing';
import useArtStore from '@/app/commons/hooks/fetchStore';
import useAppBtn from '@/app/commons/hooks/setStore';
import Link from 'next/link';

const GoingAuction = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const token = useArtStore((state) => state.token);
  const toggleOverlay = useAppBtn((state) => state.toggleOverlay);
  const toggleAuth = useAppBtn((state) => state.toggleAuth);

  const [favorite, setFavorite] = useState<string[]>([]);

  const [heartLoader, setHeartLoader] = useState<{ [key: string]: boolean }>(
    {}
  );

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

      setFavorite(data);
    } catch (error) {
      console.log(error);
    }
  };
  const [filteredProducts, setFilteredProducts] = useState<AuctionItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<AuctionItem[]>(
          'http://localhost:3005/auction-bidding'
        );
        const currentDate = new Date();

        const filtered = res.data.filter((product) => {
          const startDate = new Date(product.startDate);
          const endDate = new Date(product.endDate);

          return currentDate >= startDate && currentDate <= endDate;
        });

        setFilteredProducts(filtered);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(filteredProducts);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<AuctionItem[]>(
          'http://localhost:3005/auction-bidding'
        );
        const currentDate = new Date();

        const filtered = res.data.filter((product) => {
          const startDate = new Date(product.startDate);
          const endDate = new Date(product.endDate);

          return currentDate >= startDate && currentDate <= endDate;
        });

        setFilteredProducts(filtered);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(filteredProducts, 'filteredProducts');

  return (
    <section className='max-w-[1280px] w-full py-[40px] flex-col'>
      <div>
        <AnimatePresence mode='wait'>
          <motion.h3
            key={i18next.language + 'home.goingAuction'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='py-[40px] font-Oswald font-normal text-[57px] leading-[84px] text-[#060002]'
          >
            {t('home.goingAuction')}
          </motion.h3>
        </AnimatePresence>
      </div>
      <div className='grid  grid-cols-2 md:grid-cols-3 justify-center items-center md:items-start  gap-[16px]'>
        {filteredProducts.slice(-3).map((item, index) => {
          const imageHeight =
            index === 0 ? 460 : index === 1 ? 720 : index === 2 ? 568 : 720;
          return (
            <Link
              href={`/auctions/${item._id}`}
              key={`${item.product._id} + ${index}`}
            >
              <div className='relative max-w-[416px] w-full h-auto'>
                <div
                  style={{ height: `${imageHeight}px` }}
                  className='max-w-[416px] w-full h-full'
                >
                  <Image
                    src={item.product.mainImgUrl}
                    width={416}
                    height={imageHeight}
                    alt='Img'
                    style={{ height: `${imageHeight}px` }}
                    className='object-cover w-full hover:opacity-[80%] duration-700'
                  />
                </div>
                <button
                  className='absolute top-[18px] right-[16px]'
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(item.product._id);
                  }}
                >
                  {heartLoader[item.product._id] ? (
                    <div className='spinner !w-[22px] !h-[22px] !border-[2px] !border-t-[2px]'></div>
                  ) : (
                    <Image
                      src={
                        favorite.includes(item.product._id)
                          ? '/full_heart.svg'
                          : '/heart.svg'
                      }
                      width={24}
                      height={24}
                      alt='Favorite'
                    />
                  )}
                </button>
                <div className='flex justify-between'>
                  <div>
                    <h3 className='font-Oswald font-normal text-[28px] leading-[41px] text-[#D04175]'>
                      {item.product.artist.toUpperCase()}
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
                          ? item.product.title.toUpperCase()
                          : item.product.titleGEO.toUpperCase()}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <div>
                    <span className='font-Oswald font-medium text-[28px] leading-[41px] text-[#000000]'>
                      ${item.latestBidAmount}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className='w-full flex justify-end'>
        <Link
          href='/auctions'
          className=' border-b-[1px] border-[#D04175] self-end'
          aria-label='Show all auctions'
        >
          <AnimatePresence mode='wait'>
            <motion.span
              key={i18next.language + 'header.signUp'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='font-RedRose font-normal text-[20px] leading-[24px] text-[#000000]'
            >
              {t('home.ShowAllBtn')}
            </motion.span>
          </AnimatePresence>
        </Link>
      </div>
    </section>
  );
};

export default GoingAuction;
