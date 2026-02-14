'use client';
import { useTranslation } from 'react-i18next';

const ArtsLoading = () => {
  const { t } = useTranslation();

  return (
    <div className='w-full h-[80dvh] flex justify-center items-center'>
      <span className='font-Oswald text-[40px] text-[#D04175]'>
        {t('common.loading')}
      </span>
    </div>
  );
};

export default ArtsLoading;
