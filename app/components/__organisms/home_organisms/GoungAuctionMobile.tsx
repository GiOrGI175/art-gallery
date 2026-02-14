'use client';

// import useArtStore from '@/app/commons/hooks/fetchStore';
// import useAppBtn from '@/app/commons/hooks/setStore';
// import { AuctionData } from '@/app/commons/services/auctionData';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import i18next from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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

const GoungAuctionMobile = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

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

  return (
    <section className='max-w-[1280px] w-full  flex-col'>
      <div className='pt-[10px] pb-[30px]'>
        <AnimatePresence mode='wait'>
          <motion.h3
            key={i18next.language + 'home.goingAuction'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='font-Oswald font-normal text-[24px] leading-[35px] text-[#060002]'
          >
            {t('home.goingAuction')}
          </motion.h3>
        </AnimatePresence>
      </div>
      <div>
        {filteredProducts.map((item, index) => (
          <Link
            href={`/auctions/${item._id}`}
            key={`${item.product._id} + ${index}`}
          >
            <div className='max-w-[768px] w-full flex flex-col mb-[40px]'>
              <div>
                <Image
                  src={item.product.mainImgUrl}
                  width={768}
                  height={200}
                  alt='auction'
                  className='object-cover w-full hover:opacity-[80%] duration-700'
                />
              </div>
              <div className='mt-[10px] flex justify-between items-center'>
                <div>
                  <h4 className='font-Oswald font-normal text-[20px] leading-[29px] text-[#D04175]'>
                    {item.product.artist.toUpperCase()}
                  </h4>
                  <AnimatePresence mode='wait'>
                    <motion.p
                      key={i18next.language + 'header.signUp'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className='font-RedRose font-light text-[18px] leading-[22px] text-[#060002] opacity-[50%]'
                    >
                      {lang === 'en'
                        ? item.product.title.toUpperCase()
                        : item.product.titleGEO.toUpperCase()}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div>
                  <Image
                    src='/Arrow_R_Black.svg'
                    width={16}
                    height={16}
                    alt='arrow'
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default GoungAuctionMobile;
