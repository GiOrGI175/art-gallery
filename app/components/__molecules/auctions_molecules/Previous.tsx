'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

interface Product {
  _id: string;
  mainImgUrl: string;
  title: string;
  artist: string;
}

interface AuctionItem {
  _id: string;
  startDate: string;
  endDate: string;
  product: Product;
}

const Previous = () => {
  const [filteredProducts, setFilteredProducts] = useState<AuctionItem[]>([]);
  const router = useRouter();

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

          return currentDate >= startDate && currentDate >= endDate;
        });

        setFilteredProducts(filtered);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleClick = (id: string) => {
    router.push(`/auctions/${id}`);
  };

  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const weekdays = [
    'კვირა',
    'ორშაბათი',
    'სამშაბათი',
    'ოთხშაბათი',
    'ხუთშაბათი',
    'პარასკევი',
    'შაბათი',
  ];
  const months = [
    'იანვარი',
    'თებერვალი',
    'მარტი',
    'აპრილი',
    'მაისი',
    'ივნისი',
    'ივლისი',
    'აგვისტო',
    'სექტემბერი',
    'ოქტომბერი',
    'ნოემბერი',
    'დეკემბერი',
  ];

  const getGeorgianDate = (dateString: string) => {
    const date = new Date(dateString);
    const weekday = weekdays[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${weekday}, ${day} ${month} ${year}`;
  };

  return (
    <div className='w-full bg-black flex px-5'>
      <div className='max-w-[1280px] w-full m-auto'>
        <AnimatePresence mode='wait'>
          <motion.h2
            key={i18next.language + 'header.signUp'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='font-normal font-Oswald text-[45px] leading-[84px] text-[#D5D5D5]'
          >
            {t('Auctions.previous')}
          </motion.h2>
        </AnimatePresence>
        {filteredProducts.length === 0 ? (
          <div className='text-center  text-[24px]  text-[#ffffff]'>
            <AnimatePresence mode='wait'>
              <motion.span
                key={i18next.language + 'header.signUp'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {t('Auctions.noPrevious')}
              </motion.span>
            </AnimatePresence>
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-6'>
            {filteredProducts.map((el, index) => (
              <div className='hidden sm:block' key={index}>
                <Image
                  src={el.product.mainImgUrl}
                  width={740}
                  height={560}
                  alt='mountainAndSnow'
                  className='mt-[55px]'
                />

                <div className='max-w-[740px] w-full mt-[46px] flex items-center justify-between mb-[43px]'>
                  <div>
                    <h3 className='font-normal font-Oswald text-[45px] leading-[84px] text-[#D04175]'>
                      {el.product.title}
                    </h3>
                    <h6 className='font-light text-[32px] leading-8 text-[#E4E4E4] opacity-[50%]'>
                      {t('Auctions.lastDay')}{' '}
                      {lang.startsWith('ka')
                        ? getGeorgianDate(el.endDate)
                        : new Date(el.endDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                    </h6>
                  </div>
                  <Image
                    src='/VectorForAuction.svg'
                    width={36}
                    height={36}
                    alt='vector'
                    className='hover:fill-red-900 cursor-pointer'
                    onClick={() => handleClick(el._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {filteredProducts.map((el, index) => (
          <div className=' sm:hidden' key={index}>
            <Image
              src={el.product.mainImgUrl}
              width={740}
              height={560}
              alt='mountainAndSnow'
              className='mt-[55px]'
            />

            <div className='max-w-[740px] w-full mt-[46px] flex items-center justify-between mb-[43px]'>
              <div>
                <h3 className='font-normal font-Oswald text-[20px] leading-7 text-[#D04175]'>
                  {el.product.artist}
                </h3>
                <h5 className='text-[18px] leading-[22px] text-[#F0F0F0] font-RedRose'>
                  {el.product.title}
                </h5>
              </div>
              <Image
                src='/VectorForAuction.svg'
                width={36}
                height={36}
                alt='vector'
                className='hover:fill-red-900 cursor-pointer'
                onClick={() => handleClick(el._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Previous;
