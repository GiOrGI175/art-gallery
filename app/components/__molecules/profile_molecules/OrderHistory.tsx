import axios from 'axios';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

export default function OrderHistory() {
  interface userId {
    userId: string;
  }
  interface Order {
    paypalOrderId: string;
    date: string;
    status: string;
    totalPrice: number;
  }

  const [order, setOrder] = useState<Order[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getCookie('auth_token');
      if (typeof token === 'string') {
        try {
          const decodedToken: userId = jwtDecode(token);

          const userId = decodedToken.userId;

          const res = await axios.get(`http://localhost:3005/users/${userId}`);
          setOrder(res.data.orders);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);
  console.log(order);

  //  "orderId": "შეკვეთის ნომერი",
  //   "date": "თარიღი",
  //   "status": "სტატუსი",
  //   "total": "ჯამი"
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <div className=' w-full m-auto pb-[30px]'>
      <div className='max-w-[1280px] m-auto'>
        <AnimatePresence mode='wait'>
          <motion.ul
            key={i18next.language + 'header.signUp'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex justify-around font-medium ${
              lang === 'en' ? 'text-[24px]' : 'text-[16px]'
            }     leading-9 text-[#DDDDDD] opacity-[90%]`}
          >
            <li> {t('profile.orderId')}</li>
            <li> {t('profile.date')}</li>
            <li> {t('profile.status')}</li>
            <li> {t('profile.total')}</li>
          </motion.ul>
        </AnimatePresence>
      </div>
      <div className='border-[1px] mt-[40px]'>
        {order.map((el, index) => (
          <div
            className='max-w-[1280px] w-full m-auto flex justify-between font-RedRose items-center'
            key={index}
          >
            <div className='flex gap-4 items-center max-w-[180px] w-full'>
              <div className='max-w-[92px] w-full h-[100px] border-[1px] border-[#D04175] flex justify-center flex-col items-center '>
                <Image
                  src='/add.svg'
                  width={50}
                  height={50}
                  alt='addButton'
                  className='cursor-pointer'
                />
                <p className='text-[#E4E4E4] opacity-[50%] font-light text-[12px] font-RedRose mt-[10px]'>
                  Add Image
                </p>
              </div>
              <h6 className='font-light text-[18px] leading-6 text-[#DDDDDD] opacity-[50%]'>
                {el.paypalOrderId}
              </h6>
            </div>
            <div>
              <h6 className='font-light text-[18px] leading-6 text-[#DDDDDD] opacity-[50%]'>
                {new Date(el.date).toLocaleString()}
              </h6>
            </div>
            <div>
              <h6 className='font-light text-[18px] leading-6 text-[#DDDDDD] opacity-[50%]'>
                {el.status}
              </h6>
            </div>
            <div>
              <h6 className='font-light text-[18px] leading-6 text-[#DDDDDD] opacity-[50%]'>
                {el.totalPrice}.00 $
              </h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
