'use client';

import { useTranslation } from 'react-i18next';

type LoadMoreButtonProps = {
  onClick: () => void;
};

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <div className='w-full pt-[73px] pb-[95px] flex justify-end'>
      <button
        onClick={onClick}
        className='border-b-[1px] border-[#D04175] self-end'
      >
        <span className='font-RedRose font-normal text-[20px] leading-[24px] opacity-[50%] text-[#FFFFFF80]'>
          {t('Artworks.ShowAllBtn')}
        </span>
      </button>
    </div>
  );
};

export default LoadMoreButton;
