'use client';

import React from 'react';
import { Product } from './types';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div>
      {/* Desktop Version */}
      <div className='hidden sm:block'>
        <h4 className='font-normal text-[36px] leading-[53px] text-[#D04175]'>
          {product.description}
        </h4>
        <h6 className='font-light text-[24px] leading-[35px] text-[#989294]'>
          {product.year}
        </h6>
        <h6 className='font-light text-[24px] leading-[35px] text-[#989294]'>
          ID:{product.ArtId}
        </h6>
      </div>
    </div>
  );
};
