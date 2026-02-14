import React from 'react';
import { DataItem } from '@/app/commons/hooks/fetchStore';

interface ArtworkMetaInfoProps {
  product: DataItem;
}

const ArtworkMetaInfo: React.FC<ArtworkMetaInfoProps> = ({ product }) => {
  return (
    <div className='flex flex-col items-end'>
      <span className='font-Oswald font-light text-[16px] leading-[23px]  text-[#989294] '>
        {product.year}
      </span>
      <span className='font-Oswald font-light text-[16px] leading-[23px]  text-[#989294] '>
        ID: {product.ArtId}
      </span>
    </div>
  );
};

export default ArtworkMetaInfo;
