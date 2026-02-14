// components/ImageGallery.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Product } from './types';

interface ImageGalleryProps {
  product: Product;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ product }) => {
  const [bannerIndex, setBannerIndex] = useState(1);

  const handleIndexSetter = (swiper: SwiperClass) => {
    setBannerIndex(swiper.realIndex + 1);
  };

  return (
    <div className='max-w-[844px] w-full h-full mr-3'>
      <div className='max-w-[848px] w-full sm:h-[880px] h-[280px] overflow-hidden'>
        <Swiper
          className='mySwiper2 w-full h-full'
          slidesPerView={1}
          direction={'vertical'}
          effect={'slide'}
          loop={true}
          mousewheel={false}
          keyboard={true}
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{
            delay: 2000,
            reverseDirection: true,
            disableOnInteraction: false,
          }}
          onSlideChange={handleIndexSetter}
        >
          <SwiperSlide className='swiper-slide2'>
            <Image
              src={product.mainImgUrl}
              alt='ImgAuction'
              width={844}
              height={880}
              className='h-full'
            />
          </SwiperSlide>
          <SwiperSlide className='swiper-slide2'>
            <Image
              src={product.mockUpImgUrl}
              alt='ImgAuction'
              width={844}
              height={880}
              className='h-full'
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className='relative max-w-[1280px] w-full z-20 hidden sm:block'>
        <div className='absolute bottom-[360px] left-[-61px] w-[21px] h-[166px] flex flex-col justify-between items-center'>
          <div className='h-[83px] border-b-[1px] border-[#993056]'>
            <span className='font-RedRose font-normal text-[28px] leading-[34px] text-[#993056]'>
              {bannerIndex}
            </span>
          </div>
          <div>
            <span className='font-RedRose font-normal text-[28px] leading-[34px] text-[#993056]'>
              2
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
