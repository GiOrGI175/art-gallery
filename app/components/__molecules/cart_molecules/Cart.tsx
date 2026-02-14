'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

export default function Cart() {
  const router = useRouter();

  interface userId {
    userId: string;
    fullName: string;
    fullNameGEO: string;
  }

  interface Product {
    _id: string;
    mainImgUrl: string;
    title: string;
    titleGEO: string;
    artist: string;
    category: string;
    categoryGEO: string;
    description: string;
    descriptionGEO: string;
    price: string;
    user: userId;
  }

  interface CartItem {
    _id: string;
    product: Product;
    quantity: number;
    price: number;
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      const token = getCookie('auth_token');

      if (typeof token === 'string') {
        try {
          const decodedToken: userId = jwtDecode(token);
          const userId = decodedToken.userId;

          console.log(userId);

          const res = await axios.get(`http://localhost:3005/cart/${userId}`);
          const items: CartItem[] = res.data.items;
          console.log(items, 'items-cart');
          setCartItems(items);

          const total = items.reduce((acc, item) => acc + item.price, 0);
          setTotalPrice(total);

          setLoading(false);
        } catch (error) {
          console.error('Error fetching cart items', error);
        }
      }
    };

    fetchCartItems();
  }, []);

  const handleDelete = async (itemId: string, productId: string) => {
    const token = getCookie('auth_token');

    if (typeof token === 'string') {
      try {
        const decodedToken: userId = jwtDecode(token);
        const userId = decodedToken.userId;

        await axios.delete(`http://localhost:3005/cart/${userId}/${productId}`);

        const updatedItems = cartItems.filter((item) => item._id !== itemId);
        setCartItems(updatedItems);

        const newTotal = updatedItems.reduce(
          (acc, item) => acc + item.price,
          0
        );
        setTotalPrice(newTotal);
      } catch (error) {
        console.error('Error delete cart items', error);
      }
    }
  };

  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <div className='max-w-[1280px] w-full m-auto font-Oswald pb-[70px]'>
      <AnimatePresence mode='wait'>
        <motion.h2
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='font-Oswald font-normal text-[57px] leading-[84px] text-[#D5D5D5] pl-4'
        >
          {t('Cart.myCart')}
        </motion.h2>
      </AnimatePresence>
      <div>
        {loading ? (
          <div className='w-full sm:h-[1000px] flex justify-center'>
            <span className='mt-[300px] font-Oswald text-start font-normal text-[40px] sm:text-[100px] leading-[41px] text-[#D04175]'>
              {t('common.loading')}
            </span>
          </div>
        ) : cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className='relative flex items-center my-4 p-4 font-Oswald h-[377px] border-b-[1px] border-[#993056]'
            >
              <Image
                src={item.product.mainImgUrl}
                alt='mainImgUrl'
                width={417}
                height={297}
              />
              <AnimatePresence mode='wait'>
                <motion.div
                  key={i18next.language + 'header.signUp'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='flex flex-col justify-between h-[297px] ml-[24px]'
                >
                  <div>
                    <p className='text-[36px] font-normal text-[#D04175]'>
                      {lang === 'en'
                        ? item.product.title
                        : item.product.titleGEO}
                    </p>
                    <h4 className='text-[24px] font-light text-[#DDDDDD]'>
                      {lang === 'en'
                        ? `By: ${item.product.user.fullName}`
                        : `${item.product.user.fullNameGEO}-სმიერ`}
                    </h4>
                  </div>
                  <h4 className='font-normal text-[28px] leading-[45px] text-[#DDDDDD]'>
                    {t('Cart.category')}{' '}
                    {lang === 'en'
                      ? item.product.category
                      : item.product.categoryGEO}
                  </h4>
                  <h4 className='font-normal text-[28px] leading-[45px] text-[#DDDDDD]'>
                    {t('Cart.quantity')} {item.quantity}
                  </h4>
                  <p className='text-[24px] text-[#DDDDDD]'>
                    {t('Cart.price')} ${item.price}
                  </p>
                </motion.div>
              </AnimatePresence>
              <button
                onClick={() => handleDelete(item._id, item.product._id)}
                className='absolute top-0 right-0 cursor-pointer'
              >
                <Image
                  src='cart_delete.svg'
                  alt='delete'
                  width={36}
                  height={36}
                />
              </button>
            </div>
          ))
        ) : (
          <div className='min-h-[100dvh] flex justify-center items-center'>
            <p className='text-[24px] text-[#DDDDDD] text-center'>
              {t('Cart.cartEmpty')}
            </p>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className='max-w-[523px] w-full m-auto mt-[66px]'>
            <div className='flex justify-between'>
              <h4 className='text-[28px] font-light text-[#DDDDDD]'>
                {t('Cart.subtotal')}
              </h4>
              <h4 className='text-[36px] font-light text-[#DDDDDD]'>
                {' '}
                ${totalPrice}
              </h4>
            </div>
            <button
              className='bg-[#D04175] w-full h-[54px] rounded-[4px] mt-[24px]'
              onClick={() => router.push('/cart/checkout')}
            >
              {t('Cart.goToCheckout')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
