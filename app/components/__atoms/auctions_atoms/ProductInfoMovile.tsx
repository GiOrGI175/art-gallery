'use client';

import React from 'react';
import { Product } from './types';

interface ProductInfoMovileProps {
  product: Product;
}

export const ProductInfoMovile: React.FC<ProductInfoMovileProps> = ({
  product,
}) => {
  return (
    <div>
      <div className='sm:hidden w-full  flex justify-between  mb-5'>
        <div className='flex flex-col'>
          <h5 className='text-[#D04175] text-[24px] font-normal leading-[35px]'>
            {product.title}
          </h5>
          <h6 className='font-RedRose font-light text-[18px] leading-6'>
            {product.Artist}
          </h6>
        </div>
        <div>
          <h6 className='font-light text-[16px] leading-[23px] text-[#989294]'>
            {product.year}
          </h6>
          <h6 className='font-light text-[12px] leading-[25px] text-[#989294]'>
            ID:{product.ArtId}
          </h6>
        </div>
      </div>
    </div>
  );
};
