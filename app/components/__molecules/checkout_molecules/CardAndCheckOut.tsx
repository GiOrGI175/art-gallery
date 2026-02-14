'use client';

import CheckOutForm from './CheckOutForm';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { Address } from '../../__atoms/profile_atoms/type';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

export default function CardAndCheckOut() {
  const token = getCookie('auth_token');
  const [userName, setUserName] = useState<string | null>(null);

  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  interface DecodedToken {
    userName: string;
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('address');
      if (stored) {
        setSavedAddresses(JSON.parse(stored));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof token === 'string') {
      const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
      setUserName(decodedToken.userName);
    }
  }, [token]);

  const router = useRouter();
  const handleClick = () => {
    router.push('/cart');
  };

  const { t } = useTranslation();

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={i18next.language + 'header.signUp'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='font-RedRose px-4 '
      >
        <button
          className='font-RedRose font-light text-[22px] leading-7 text-[#D04175] mt-[28px]  gap-3 hidden sm:flex '
          onClick={handleClick}
        >
          <Image src='/vectorback.svg' width={16} height={16} alt='icon' />
          {t('Cart.backToCart')}
        </button>
        <div className='mt-[41px]'>
          <h3 className='font-normal text-[36px] leading-[44px] text-[#DDDCDC]'>
            {t('Cart.account')}
          </h3>
          <h5 className='font-RedRose font-light text-[22px] leading-7 text-[#DDDCDC] mt-[12px]'>
            {userName}
          </h5>
        </div>
        <div className='mt-[48px]'>
          <h3 className='font-normal text-[36px] leading-[44px] text-[#DDDCDC]'>
            {t('Cart.delivery')}
          </h3>

          <div className='flex flex-col gap-[5px] h-[70px] '>
            <div className='flex items-center'>
              <input
                type='checkbox'
                checked={useSavedAddress}
                onChange={(e) => setUseSavedAddress(e.target.checked)}
                className='mt-[12px] checked:accent-[#D04175] accent-[#D04175]      border-[3px] rounded-sm checked:border-[#D04175] w-[18px] h-[18px] '
              />
              <h5 className='font-RedRose font-light text-[22px] leading-7 text-[#DDDCDC] mt-[12px]'>
                {t('Cart.useAddress')}
              </h5>
            </div>
            {useSavedAddress && (
              <select
                onChange={(e) => {
                  const selected = savedAddresses.find(
                    (addr) => addr.adressName === e.target.value
                  );
                  setSelectedAddress(selected || null);
                }}
                className='mt-[20px] placeholder:text-[#DDDDDD] text-[#DDDDDD] w-full  bg-[black] border-b-[1px] border-t-0 border-r-0 border-l-0 border-b-[#E4E4E4] border-opacity-[50%] focus:outline-none'
              >
                <option value=''>Select Address</option>
                {savedAddresses.map((item, index) => (
                  <option key={index} value={item.adressName}>
                    {item.adressName} - {item.fullName}, {item.city}
                  </option>
                ))}
              </select>
            )}
          </div>
          <CheckOutForm selectedAddress={selectedAddress} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
