'use client';

import React from 'react';
import { Product } from './types';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <>
      <div className='mt-[0px] sm:mt-[48px]'>
        <h6 className='font-normal sm:text-[28px] text-[18px] leading-[41px] text-[#DDDDDD]'>
          Category:{' '}
          <span className='font-light text-[18px] sm:text-[28px] leading-[41px] text-[#DDDDDD]'>
            {product.category}
          </span>
        </h6>
        <h6 className='font-normal sm:text-[28px] text-[18px] leading-[41px] text-[#DDDDDD] mt-[20px]'>
          Description:{' '}
          <span className='font-light sm:text-[28px] text-[18px] leading-[41px] text-[#DDDDDD]'>
            {product.description}
          </span>
        </h6>
      </div>
      <div className='flex sm:hidden justify-between'>
        <h5
          className='font-normal text-[18px] sm:text-[28px]
           leading-[41px] text-[#DDDDDD]'
        >
          Size:
        </h5>
        <div className='flex flex-col gap-[20px] mt-4'>
          <h6 className='w-[80px] font-RedRose text-[16px] leading-5 text-[#DDDDDD] border-b-[1px]'>
            Width: {product.width}
          </h6>
          <h6 className='w-[80px] font-RedRose text-[16px] leading-5 text-[#DDDDDD] border-b-[1px]'>
            Height: {product.height}
          </h6>
        </div>
      </div>
    </>
  );
};
