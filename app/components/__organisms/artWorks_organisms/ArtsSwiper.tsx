'use client';

import React, { useState } from 'react';
import { SwiperClass } from 'swiper/react';
import ArtsInfo from '../../__molecules/artworks_molecules/ArtsInfo';
import { DataItem } from '@/app/commons/hooks/fetchStore';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ArtworkTitle from '../../__atoms/artworks_atoms/ArtworkTitle';
import ArtworkMetaInfo from '../../__atoms/artworks_atoms/ArtworkMetaInfo';
import ArtworkDetailsSection from '../../__atoms/artworks_atoms/ArtworkDetailsSection';
import ArtworkActions from '../../__atoms/artworks_atoms/ArtworkActions';
import ImageSwiper from '../../__atoms/artworks_atoms/ImageSwiper';
import SlideIndicator from '../../__atoms/artworks_atoms/SlideIndicator';

type ArtsSwiperPrpsType = {
  imgs: string[];
  product: DataItem;
};

interface userId {
  userId: string;
}

const ArtsSwiper: React.FC<ArtsSwiperPrpsType> = ({ imgs, product }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [banerIndex, setBanerIndex] = useState(1);

  const handleIndexseter = (swiper: SwiperClass) => {
    const currentIndex = swiper.realIndex + 1;
    setBanerIndex(currentIndex);
  };

  const addProduct = async () => {
    console.log('geashva');

    const token = getCookie('auth_token');
    if (typeof token === 'string') {
      const decodedToken: userId = jwtDecode(token);
      const userId = decodedToken.userId;

      try {
        await axios.post(`http://localhost:3005/cart/${userId}`, {
          productId: product._id,
          quantity: 1,
        });
        toast.success('Product added successfully');
      } catch (error) {
        console.error('Error adding product to cart', error);
      }
    }
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='max-w-[1280px] w-full flex  flex-col sm:flex-row justify-between'>
        <div className='mb-[20px] flex sm:hidden justify-between'>
          <ArtworkTitle product={product} lang={lang} />
          <ArtworkMetaInfo product={product} />
        </div>

        <ImageSwiper imgs={imgs} onSlideChange={handleIndexseter} />

        <ArtworkDetailsSection product={product} lang={lang} />

        <ArtworkActions onAddToCart={addProduct} />

        <ArtsInfo product={product} />
      </div>

      <SlideIndicator currentIndex={banerIndex} />
    </div>
  );
};

export default ArtsSwiper;
