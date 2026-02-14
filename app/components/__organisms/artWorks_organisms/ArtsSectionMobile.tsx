'use client';
import React, { Suspense } from 'react';
import SearchParamsWrapper from '../../__molecules/artworks_molecules/SearchParamsWrapper';

type ArtsSectionMobileProps = {
  findUser?: string;
};

const Loader = () => (
  <div className='w-full h-[80dvh] flex justify-center items-center'>
    <span className='font-Oswald text-start font-normal text-[40px] leading-[41px] text-[#D04175]'>
      Loading...
    </span>
  </div>
);

const ArtsSectionMobile: React.FC<ArtsSectionMobileProps> = ({ findUser }) => {
  return (
    <Suspense fallback={<Loader />}>
      <SearchParamsWrapper findUser={findUser} />
    </Suspense>
  );
};

export default ArtsSectionMobile;
