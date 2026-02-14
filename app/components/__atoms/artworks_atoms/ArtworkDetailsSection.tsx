import React from 'react';
import { DataItem } from '@/app/commons/hooks/fetchStore';

interface ArtworkDetailsSectionProps {
  product: DataItem;
  lang: string;
}

const ArtworkDetailsSection: React.FC<ArtworkDetailsSectionProps> = ({
  product,
  lang,
}) => {
  return (
    <div className='mt-[10px] flex sm:hidden justify-between'>
      <div className='flex flex-col'>
        <p className='font-Oswald font-normal text-[18px] leading-[26px] text-[#DDDDDD]'>
          Category:{' '}
          <span className='opacity-[50%]'>
            {lang === 'en' ? product.category : product.categoryGEO}
          </span>
        </p>
        <p className='mt-[10px] font-Oswald font-normal text-[18px] leading-[26px] text-[#DDDDDD]'>
          Description:{' '}
          <span className='opacity-[50%]'>
            {lang === 'en' ? product.description : product.descriptionGEO}
          </span>
        </p>
      </div>
      <div className='flex'>
        <p className='mr-[5px] font-Oswald font-normal text-[18px] leading-[26px] text-[#DDDDDD]'>
          Size:
        </p>
        <span className='font-Oswald font-normal text-[18px] leading-[26px] text-[#DDDDDD] flex flex-col opacity-[50%]'>
          Width:{product.width}cm <span>Height:{product.height}cm</span>
        </span>
      </div>
    </div>
  );
};

export default ArtworkDetailsSection;
