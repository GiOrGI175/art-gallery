import React from 'react';

interface SlideIndicatorProps {
  currentIndex: number;
}

const SlideIndicator: React.FC<SlideIndicatorProps> = ({ currentIndex }) => {
  return (
    <div className='relative max-w-[1440px] w-full z-10 hidden sm:block'>
      <div className='absolute bottom-[360px] left-[31px] w-[21px] h-[166px] flex flex-col justify-between items-center'>
        <div className='h-[83px] border-b-[1px] border-[#993056]'>
          <span className='font-RedRose font-normal text-[28px] leading-[34px] text-[#993056]'>
            {currentIndex}
          </span>
        </div>
        <div>
          <span className='font-RedRose font-normal text-[28px] leading-[34px] text-[#993056]'>
            2
          </span>
        </div>
      </div>
    </div>
  );
};

export default SlideIndicator;
