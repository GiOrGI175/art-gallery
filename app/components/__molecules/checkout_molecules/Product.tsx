'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { setCookie } from '../../../commons/hooks/cookies';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

// Define a more precise type for the product item
interface ProductItem {
  product: {
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
  };
  quantity: string;
  price: number;
}
interface userId {
  userId: string;
  fullName: string;
  fullNameGEO: string;
}

export default function Product() {
  const [product, setProduct] = useState<ProductItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = getCookie('auth_token');
      if (typeof token === 'string') {
        try {
          const decodedToken: userId = jwtDecode(token);
          const userId = decodedToken.userId;
          setUserId(userId);

          const res = await axios.get(`http://localhost:3005/cart/${userId}`);

          const items = res.data.items;
          console.log(items);
          setProduct(items);

          const total = items.reduce((acc: number, item: ProductItem) => {
            return acc + item.price;
          }, 0);

          setTotalPrice(total);
        } catch (error) {
          console.error('Error fetching cart items', error);
        }
      }
    };

    fetchCartItems();
  }, []);
  console.log(product);

  const handleRemove = async (id: string) => {
    const updatedProducts = product.filter((el) => el.product._id !== id);
    setProduct(updatedProducts);
    setCookie('cartItems', JSON.stringify(updatedProducts), {
      maxAge: 30 * 24 * 60 * 60,
    });
    const remove = await axios.delete(
      `http://localhost:3005/cart/${userId}/${id}`
    );
    console.log(remove);
  };

  const router = useRouter();
  const handleClick = () => {
    router.push('/cart');
  };
  console.log(product, 'produkti');

  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <>
      {product.length > 0 && (
        <AnimatePresence mode='wait'>
          <motion.div
            key={i18next.language + 'header.signUp'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='bg-[#22222280] m-auto sm:m-0 opacity-[50%] relative pl-4 w-full h-full flex flex-col'
          >
            <button
              className='font-RedRose font-light text-[22px] leading-7 text-[#D04175] mt-[28px] flex gap-3 sm:hidden '
              onClick={handleClick}
            >
              <Image src='/vectorback.svg' width={16} height={16} alt='icon' />
              {t('Cart.backToCart')}
            </button>
            <h4 className='flex gap-[12px] mt-[28px]  font-RedRose text-[36px] font-normal leading-none text-[#DDDCDC]'>
              {t('Cart.myCart')}
              <Image src='/cart.svg' width={24} height={24} alt='cartImage' />
            </h4>
            <div className='max-w-[530px] w-full m-auto sm:m-0 '>
              {product && product.length > 0 ? (
                product.map((el, index) => (
                  <div
                    key={index}
                    className='flex justify-between my-4 font-Oswald mt-[40px]'
                  >
                    <Image
                      src={el.product.mainImgUrl}
                      alt='mainImg'
                      width={196}
                      height={165}
                    />
                    <div className='flex flex-col justify-between ml-[24px]'>
                      <div>
                        <p className='text-[24px] font-normal text-[#D04175]'>
                          {lang === 'en'
                            ? el.product.title
                            : el.product.titleGEO}
                        </p>
                        <h4 className='text-[16px] font-light text-[#DDDDDD]'>
                          {lang === 'en'
                            ? `By: ${el.product.user.fullName}`
                            : `${el.product.user.fullNameGEO}-სმიერ`}
                        </h4>
                      </div>

                      <h4 className='font-normal text-[16px] leading-[23px] text-[#DDDDDD]'>
                        {t('Cart.category')}{' '}
                        {lang === 'en'
                          ? el.product.category
                          : el.product.categoryGEO}
                      </h4>
                      <h4 className='font-normal text-[16px] leading-[23px] text-[#DDDDDD]'>
                        {t('Cart.quantity')} {el.quantity}
                      </h4>

                      <p className='text-[20px] text-[#DDDDDD]'>
                        {t('Cart.price')} ${el.price}
                      </p>
                    </div>
                    <div className='h-[17px]'>
                      <Image
                        src='/closeButton.svg'
                        width={17}
                        height={17}
                        alt='close'
                        onClick={() => handleRemove(el.product._id)}
                        className='cursor-pointer'
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>{t('Cart.cartEmpty')}</p>
              )}
              {product.length > 0 && (
                <div className='max-w-[523px] w-full m-auto mt-[66px]'>
                  <div className='flex justify-between'>
                    <h4 className='text-[28px] font-light text-[#DDDDDD]'>
                      {t('Cart.subtotal')}
                    </h4>
                    <h4 className='text-[36px] font-light text-[#DDDDDD]'>
                      {totalPrice} $
                    </h4>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
