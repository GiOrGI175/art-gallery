'use client';
import React from 'react';
import { DataItem } from '@/app/commons/hooks/fetchStore';

interface ArtworkTitleProps {
  product: DataItem;
  lang: string;
}

const ArtworkTitle: React.FC<ArtworkTitleProps> = ({ product, lang }) => {
  return (
    <div className='flex flex-col'>
      <h1 className='font-Oswald font-normal text-[24px] leading-[35px] text-[#D04175]'>
        {lang === 'en' ? product.title : product.titleGEO}
      </h1>
      <p className='font-RedRose font-light text-[18px] leading-[22px]  text-[#DDDDDD] opacity-[50%]'>
        {lang === 'en'
          ? `By ${product.user.fullName}`
          : `${product.user.fullNameGEO}ს მიერ`}
      </p>
    </div>
  );
};

export default ArtworkTitle;
