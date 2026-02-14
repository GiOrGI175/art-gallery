'use client';

import React from 'react';
import OnGoing from '../../__molecules/auctions_molecules/OnGoing';
import UpComing from '../../__molecules/auctions_molecules/UpComing';
import Previous from '../../__molecules/auctions_molecules/Previous';
import Consultation from '../../__molecules/artworks_molecules/Consultation';
import useAppBtn from '@/app/commons/hooks/setStore';

export default function ActionsMain() {
  const setOverlay = useAppBtn((state) => state.setOverlay);

  return (
    <div className=' w-full '>
      <div className=' w-full  '>
        <OnGoing />
        <UpComing />
        <Previous />
        <div className='flex justify-center'>
          <Consultation />
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-20 ${
          setOverlay ? 'block ' : 'hidden'
        }  `}
      ></div>
    </div>
  );
}
