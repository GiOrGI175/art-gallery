import React from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

interface ImageSwiperProps {
  imgs: string[];
  onSlideChange: (swiper: SwiperClass) => void;
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({ imgs, onSlideChange }) => {
  return (
    <div className=' max-w-[848px] w-full sm:h-[888px]  h-[270px] overflow-hidden'>
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
        onSlideChange={onSlideChange}
      >
        {imgs.map((item, index) => (
          <SwiperSlide className='swiper-slide2' key={index}>
            <Image src={item} alt={`slide-${index}`} width={848} height={888} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
