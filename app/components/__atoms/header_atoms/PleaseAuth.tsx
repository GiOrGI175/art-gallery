'use client';

import Image from 'next/image';

const PleaseAuth = () => {
  return (
    <div className='max-w-[387px] w-full h-[202px] pt-[29px] pb-[24px] flex flex-col justify-center items-center bg-[#D04175] rounded-[4px]'>
      <div>
        <Image src='/Warn.svg' width={45} height={45} alt='warning' />
      </div>
      <p className=' mb-[24px] w-full font-Oswald font-light text-[18px] leading-[26px] text-[#060002] text-center'>
        Please Log in or Sign up to continue your purchase.
      </p>
      <div className='flex gap-[12px]'>
        <button className='w-[98px] h-[46px] bg-[#DDDDDD] rounded-[4px]'>
          <span className='font-Oswald font-light text-[18px] leading-[22px] text-[#D04175]'>
            Sign Up
          </span>
        </button>
        <button className='w-[98px] h-[46px] bg-[#060002] rounded-[4px]'>
          <span className='font-Oswald font-light text-[18px] leading-[22px] text-[#F0F0F0]'>
            Log In
          </span>
        </button>
      </div>
    </div>
  );
};

export default PleaseAuth;
