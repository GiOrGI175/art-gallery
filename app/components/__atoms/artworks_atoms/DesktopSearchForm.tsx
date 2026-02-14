'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';

type DesktopSearchFormProps = {
  price: string;
  year: string;
  artist: string;
  setPrice: (price: string) => void;
  setYear: (year: string) => void;
  setArtist: (artist: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export const DesktopSearchForm: React.FC<DesktopSearchFormProps> = ({
  price,
  year,
  artist,
  setPrice,
  setYear,
  setArtist,
  onSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <div className='w-full hidden sm:flex justify-center px-[20px]'>
      <div className='max-w-[1280px] w-full flex'>
        <form
          className='flex w-full justify-between mt-[37px]'
          onSubmit={onSubmit}
        >
          <input
            type='number'
            placeholder={t('Artworks.price')}
            className='w-full max-w-[195px] h-[46px] bg-transparent border-b border-[#DDDDDD] placeholder:font-RedRose placeholder:text-[22px] text-[22px] font-RedRose font-light leading-[27px] text-[#DDDDDD] focus:outline-none opacity-70'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            aria-label='Filter by price'
          />
          <input
            type='number'
            placeholder={t('Artworks.year')}
            className='w-full max-w-[195px] h-[46px] bg-transparent border-b border-[#DDDDDD] placeholder:font-RedRose placeholder:text-[22px] text-[22px] font-RedRose font-light leading-[27px] text-[#DDDDDD] focus:outline-none opacity-70 ml-[5px]'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            aria-label='Filter by year'
          />
          <input
            type='text'
            placeholder={t('Artworks.artist')}
            className='w-full max-w-[195px] h-[46px] bg-transparent border-b border-[#DDDDDD] placeholder:font-RedRose placeholder:text-[22px] text-[22px] font-RedRose font-light leading-[27px] text-[#DDDDDD] focus:outline-none opacity-70 ml-[5px]'
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            aria-label='Filter by artist'
          />
          <button
            type='submit'
            className='group py-[15px] px-[54px] bg-[#D04175] border border-[#D04175] rounded-[4px] ml-[5px] hover:bg-transparent duration-500'
          >
            <span className='font-RedRose font-light text-[18px] leading-[22px] text-[#060002] group-hover:text-[#D04175] duration-500'>
              {t('Artworks.search')}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
