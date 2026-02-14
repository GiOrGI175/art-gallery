'use client';
import Image from 'next/image';
import React from 'react';
import { filters } from '@/app/commons/services/artworksCategory';
import { useTranslation } from 'react-i18next';

type MobileFilterProps = {
  showFilter: boolean;
  setShowFilter: (show: boolean) => void;
  onFilterClick: (filter: { sortBy: string; order: string }) => void;
};

export const MobileFilterMenu: React.FC<MobileFilterProps> = ({
  showFilter,
  setShowFilter,
  onFilterClick,
}) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <div className='relative h-[24px] flex flex-col items-end sm:hidden'>
      <button
        className='w-[24px] h-[24px]'
        onClick={() => setShowFilter(true)}
        aria-label='Open filter menu'
      >
        <Image src='Artworks_filter.svg' width={24} height={24} alt='filter' />
      </button>
      <ul
        className={`absolute flex right-[-20px] gap-[12px] flex-col items-center w-[112px] bg-[#CDCDCD] ${
          showFilter ? 'translate-y-[-16px]' : 'translate-y-[-275px]'
        } duration-500 z-10`}
      >
        <button
          onClick={() => setShowFilter(false)}
          aria-label='Close filter menu'
        >
          <span
            className={`font-Oswald font-medium ${
              lang === 'en' ? 'text-[23px]' : 'text-[17px]'
            } leading-[29px] text-[#060002]`}
          >
            {t('Artworks.sortBy')}
          </span>
        </button>
        {filters.map((f) => (
          <li
            key={f.id}
            className='h-[38px] flex items-center'
            onClick={() => {
              onFilterClick(f);
              setShowFilter(false);
            }}
          >
            <span
              className={`font-Oswald font-normal ${
                lang === 'en' ? 'text-[20px]' : 'text-[16px]'
              } leading-[29px] text-[#060002]`}
            >
              {t(f.filter)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
