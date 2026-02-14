import { socialMeda } from '@/app/commons/services/footerLinks';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type NewsletterProps = {
  homePageFooter: boolean;
};

const Newsletter: React.FC<NewsletterProps> = ({ homePageFooter }) => {
  return (
    <div className='sm:max-w-[265px] w-full flex flex-col'>
      <div className='w-[50%] sm:w-full flex justify-center self-end'>
        <h6 className='mb-[12px] sm:mb-[38px]  font-Oswald  font-medium text-[14px] leading-[20px] text-end sm:text-center text-[#060002]'>
          Newsletter
        </h6>
      </div>
      <div className='w-full flex flex-row-reverse sm:flex-col justify-between'>
        <div className='w-full flex gap-[12px] justify-end'>
          <div className='max-w-[78px] sm:max-w-[130px] w-full h-[24px] sm:h-[46px]'>
            <input
              type='text'
              placeholder='Email:'
              className={`w-full h-full bg-transparent  border-b-[1px] border-[#D04175]  placeholder:font-RedRose placeholder:font-light placeholder:text-[14px] placeholder:leading-[16px] placeholder:text-[#0E0004]   font-RedRose text-[14px] leading-[17px] text-[#0E0004]  focus:outline-none   ${
                homePageFooter
                  ? ' placeholder:text-[#060002]'
                  : 'placeholder:text-[#B3B3B3] text-[#B3B3B3]'
              } `}
            />
          </div>
          <button className='max-w-[75px] sm:max-w-[119px] w-full h-[26px] sm:h-[46px] rounded-[4px] border-[1px] border-[#D04175] sm:px-[5px] hover:bg-[#F0F0F0] duration-500'>
            <span
              className={`font-RedRose  font-light text-[14px] sm:text-[18px] leading-[17px] sm:leading-[22px] text-end sm:text-center text-[#060002] ${
                homePageFooter ? ' text-[#060002]' : 'text-[#B3B3B3]'
              } `}
            >
              Subscribe
            </span>
          </button>
        </div>
        <div className='w-full flex sm:justify-end '>
          <ul className='flex  gap-[22px] sm:mt-[28px] sm:mr-[28px]'>
            {socialMeda.map((item) => (
              <li key={item.id}>
                <Link href={item.link}>
                  <Image
                    src={`${homePageFooter ? item.light_img : item.img}`}
                    width={24}
                    height={24}
                    alt='Social medea icons'
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
