'use client';

import useArtStore, { DataItem } from '@/app/commons/hooks/fetchStore';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

type ArtsInfoPrpsType = {
  product: DataItem;
};
interface userId {
  userId: string;
}

const ArtsInfo: React.FC<ArtsInfoPrpsType> = ({ product }) => {
  const addProduct = async () => {
    const token = getCookie('auth_token');
    if (typeof token === 'string') {
      const decodedToken: userId = jwtDecode(token);
      const userId = decodedToken.userId;

      try {
        await axios.post(`http://localhost:3005/cart/${userId}`, {
          productId: product._id,
          quantity: 1,
        });
        toast.success('Product added successfully');
      } catch (error) {
        console.error('Error adding product to cart', error);
      }
    }
  };

  const token = useArtStore((state) => state.token);
  const setToken = useArtStore((state) => state.setToken);

  useEffect(() => {
    const getToken = async () => {
      const token = await getCookie('auth_token');
      if (token) {
        setToken(token);
      } else {
        setToken(undefined);
      }
    };
    getToken();
  }, [setToken, token]);

  const PostFavorites = async (id: string | null) => {
    try {
      await fetch(`http://localhost:3005/products/favorites/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Product saved successfully!');
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <div className='w-[300px] min-w-[260px] hidden sm:flex flex-col pl-[30px]'>
      <div className='flex flex-col'>
        <AnimatePresence mode='wait'>
          <motion.h1
            key={i18next.language + 'header.signUp'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='font-Oswald font-normal text-[36px] leading-[53px] text-[#D04175]'
          >
            {lang === 'en'
              ? product.title.toUpperCase()
              : product.titleGEO.toUpperCase()}
          </motion.h1>
        </AnimatePresence>
        <AnimatePresence mode='wait'>
          <motion.p
            key={i18next.language + 'header.signUp'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='font-Oswald font-light text-[24px] leading-[35px]  text-[#DDDDDD] '
          >
            {lang === 'en'
              ? `By ${product.user.fullName}`
              : `${product.user.fullNameGEO}ს მიერ`}
          </motion.p>
        </AnimatePresence>
        <span className='font-Oswald font-light text-[24px] leading-[35px]  text-[#DDDDDD] '>
          {product.year}
        </span>
      </div>
      <span className='mt-[38px] font-Oswald font-light text-[16px] leading-[23px]  text-[#989294]'>
        ID: {product.ArtId}
      </span>
      <AnimatePresence mode='wait'>
        <motion.div
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='mt-[52px]'
        >
          <p className='mb-[16px] font-Oswald font-normal text-[28px] leading-[41px]  text-[#DDDDDD]'>
            {t('Artworks.category')}
            <span className='font-Oswald font-light text-[28px] leading-[41px]  text-[#DDDDDD]'>
              {' '}
              {lang === 'en' ? product.category : product.categoryGEO}
            </span>
          </p>
          <p className='font-Oswald font-normal text-[28px] leading-[41px]  text-[#DDDDDD]'>
            {t('Artworks.desc')}
            <span className='font-Oswald font-light text-[28px] leading-[41px]  text-[#DDDDDD]'>
              {' '}
              {lang === 'en' ? product.description : product.descriptionGEO}
            </span>
          </p>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        <motion.div
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='mt-[25px]'
        >
          <p className='mb-[16px] font-Oswald font-normal text-[28px] leading-[41px]  text-[#DDDDDD]'>
            {t('Artworks.size')}
          </p>
          <p className='mb-[20px] max-w-[107px] w-full font-RedRose font-light text-[16px] leading-[20px]  text-[#B3B3B3] border-b-[1px] border-[#B3B3B3] '>
            {t('Artworks.Width')} <span>{product.width}cm</span>
          </p>
          <p className='max-w-[107px] w-full font-RedRose font-light text-[16px] leading-[20px]  text-[#B3B3B3] border-b-[1px] border-[#B3B3B3] '>
            {t('Artworks.Height')} <span>{product.height}cm</span>
          </p>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        <motion.p
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='mt-[65px] font-Oswald font-normal text-[28px] leading-[41px]  text-[#DDDDDD]'
        >
          {t('Artworks.Price')} <span> {product.price}$</span>
        </motion.p>
      </AnimatePresence>
      <div className='mt-[77px]'>
        <button
          className='group mb-[48px] max-w-[309px] w-full h-[54px] rounded-[4px] bg-[#D04175] '
          onClick={addProduct}
        >
          <AnimatePresence mode='wait'>
            <motion.span
              key={i18next.language + 'header.signUp'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='font-RedRose font-normal text-[18px] leading-[22px]  text-[#060002] group-hover:text-[#F0F0F0] duration-500'
            >
              {t('Artworks.addCart')}
            </motion.span>
          </AnimatePresence>
        </button>
        <ToastContainer />
        <button
          className='group max-w-[309px] w-full h-[54px] rounded-[4px] border-[1px] border-[#D04175] hover:border-[0px] duration-500'
          onClick={() => PostFavorites(product._id)}
        >
          <AnimatePresence mode='wait'>
            <motion.span
              key={i18next.language + 'header.signUp'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='font-RedRose font-normal text-[18px] leading-[22px]  text-[#D04175] group-hover:text-[#993056]  duration-500'
            >
              {t('Artworks.saveFav')}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
};

export default ArtsInfo;
