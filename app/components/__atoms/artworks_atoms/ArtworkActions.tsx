import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface ArtworkActionsProps {
  onAddToCart: () => void;
}

const ArtworkActions: React.FC<ArtworkActionsProps> = ({ onAddToCart }) => {
  const { t } = useTranslation();

  return (
    <div className='mt-[63px] w-full  flex sm:hidden flex-col items-center'>
      <button
        className='group w-[211px] h-[44px] bg-[#D04175]'
        onClick={onAddToCart}
      >
        <span className='font-Oswald font-light text-[18px] leading-[22px] text-[#060002] group-hover:text-[#F0F0F0]'>
          {t('Artworks.addCart')}
        </span>
      </button>
      <button className='mt-[28px] w-[211px] h-[44px] border-[1px] border-[#D04175] hover:border-[#060002] transition-border duration-500'>
        <span className='font-Oswald font-light text-[18px] leading-[22px] text-[#D04175]'>
          {t('Artworks.saveFav')}
        </span>
      </button>
      <ToastContainer />
    </div>
  );
};

export default ArtworkActions;
