'use client';

import useAppBtn from '@/app/commons/hooks/setStore';
import Image from 'next/image';

const PlsAuth = () => {
  const toggleOverlay = useAppBtn((state) => state.toggleOverlay);
  const toggleAuth = useAppBtn((state) => state.toggleAuth);

  const setSowPopUp = useAppBtn((state) => state.setShowPopUp);
  const setSowPopUp2 = useAppBtn((state) => state.setShowPopUp2);

  const toggleSignUp = useAppBtn((state) => state.toggleSignUp);
  const togglelogIn = useAppBtn((state) => state.togglelogIn);

  return (
    <div className='max-w-[387px] w-full p-[11px] rounded-[4px] flex flex-col justify-center items-center bg-[#D04175]'>
      <div className='w-full h-[24px] flex justify-end items-center'>
        <button
          onClick={() => {
            toggleOverlay(false);
            toggleAuth();
          }}
        >
          <Image src='close.svg' width={11} height={11} alt='close' />
        </button>
      </div>
      <div>
        <Image src='werrning.svg' width={45} height={45} alt='werrning' />
      </div>
      <p className='mt-[10px] font-Oswald font-light text-[18px] leading-[100%] text-[#060002]'>
        Please Log in or Sign up to continue your purchase.
      </p>
      <div className='mt-[24px] flex gap-[12px]'>
        <button
          className='group w-[88px] sm:w-[98px] h-[44px] sm:h-[46px] rounded-[4px] bg-[#AFABAC] hover:bg-transparent duration-700'
          onClick={() => {
            setSowPopUp(true);
            setSowPopUp2(false);
            toggleOverlay(true);
            toggleSignUp();
            toggleAuth();
          }}
        >
          <span className='font-RedRose font-light text-[18px] leading-[22px] text-[#D04175] group-hover:text-black duration-700'>
            Sign Up
          </span>
        </button>
        <button
          className='w-[88px] sm:w-[111px] h-[44px] sm:h-[46px] rounded-[4px] bg-[#060002] hover:bg-transparent duration-700'
          onClick={() => {
            setSowPopUp2(true);
            setSowPopUp(false);
            toggleOverlay(true);
            togglelogIn();
            toggleAuth();
          }}
        >
          <span className='font-RedRose font-light text-[18px] leading-[22px] text-[#F0F0F0]'>
            Log In
          </span>
        </button>
      </div>
    </div>
  );
};

export default PlsAuth;
