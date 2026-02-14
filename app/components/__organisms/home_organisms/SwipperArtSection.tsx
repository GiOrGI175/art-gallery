'use client';

import React, { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperItem from '../../__molecules/home_moleculs/SwiperItem';
import SwippArrow_L from '../../__atoms/home_atoms/SwippArrow_L';
import SwippArrow_R from '../../__atoms/home_atoms/SwippArrow_R';
import useArtStore, { DataItem } from '@/app/commons/hooks/fetchStore';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

const SwipperArtSection = () => {
  const { t } = useTranslation();

  const [arrowHover, setArrowHover] = useState({
    arrow_R: false,
    arrow_L: false,
  });
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );

  const heights = [416, 640, 532];

  const [swpperData, setSwpperData] = useState<DataItem[] | []>([]);

  const token = useArtStore((state) => state.token);

  useEffect(() => {
    async function fetchFeaturesWorks() {
      try {
        const response = await fetch(
          'http://localhost:3005/products/Features',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token ? `Bearer ${token}` : `${token}`,
            },
          }
        );

        const data = await response.json();
        console.log(data, 'dataFeature');

        if (Array.isArray(data)) {
          setSwpperData(data);
        }

        setSwpperData(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchFeaturesWorks();
  }, []);

  return (
    <>
      <section className='max-w-[1280px] mb-[90px] w-full flex flex-col'>
        <AnimatePresence mode='wait'>
          <motion.h2
            key={i18next.language + 'header.signUp'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='py-[40px] font-Oswald font-normal text-[57px] leading-[84px] text-[#060002]'
          >
            {t('home.featuredArtworks')}
          </motion.h2>
        </AnimatePresence>
        <div>
          <div className='max-w-[1280px] w-full mx-auto h-full'>
            <div className='relative'>
              <Swiper
                className='mySwiper2 w-full h-full'
                slidesPerView={3}
                spaceBetween={16}
                loop={true}
                cssMode={true}
                mousewheel={true}
                keyboard={true}
                pagination={false}
                autoHeight={true}
                modules={[Navigation]}
                slidesPerGroup={3}
                onSwiper={(swiper) => setSwiperInstance(swiper)}
                breakpoints={{
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                    slidesPerGroup: 3,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    slidesPerGroup: 2,
                  },
                  480: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                    slidesPerGroup: 1,
                  },
                }}
              >
                {swpperData.map((item, index) => {
                  return (
                    <SwiperSlide
                      key={item._id}
                      className='swiper-slide2'
                      style={{
                        height: `${heights[index % heights.length]}px`,
                      }}
                    >
                      <SwiperItem
                        item={item}
                        height={heights[index % heights.length]}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <div className='absolute bottom-[50%] max-w-[1380px] w-full flex justify-between'>
        <button
          className='custom-prev'
          aria-label='Go to previous slide'
          onClick={() => swiperInstance?.slidePrev()}
          onMouseMove={() =>
            setArrowHover((prev) => ({ ...prev, arrow_L: true }))
          }
          onMouseLeave={() =>
            setArrowHover((prev) => ({ ...prev, arrow_L: false }))
          }
        >
          <SwippArrow_L arrowHover={arrowHover.arrow_L} />
        </button>
        <button
          className='custom-next'
          aria-label='Go to next slide'
          onClick={() => swiperInstance?.slideNext()}
          onMouseMove={() =>
            setArrowHover((prev) => ({ ...prev, arrow_R: true }))
          }
          onMouseLeave={() =>
            setArrowHover((prev) => ({ ...prev, arrow_R: false }))
          }
        >
          <SwippArrow_R arrowHover={arrowHover.arrow_R} />
        </button>
      </div>
    </>
  );
};

export default SwipperArtSection;
