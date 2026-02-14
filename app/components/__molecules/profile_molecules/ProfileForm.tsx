'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import useArtStore from '@/app/commons/hooks/fetchStore';
import useArtistStore from '@/app/commons/hooks/useIdStore';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

type ProfileFormData = {
  fullName?: string;
  fullNameGEO?: string;
  email?: string;
  phoneNumber?: string;
};

export default function ProfileForm() {
  const token = useArtStore((state) => state.token);
  const setToken = useArtStore((state) => state.setToken);

  const fetchArtists = useArtistStore((state) => state.fetchArtists);

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

  const { register, handleSubmit } = useForm<ProfileFormData>();

  const onSubmit = async (data: ProfileFormData) => {
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== '')
    );
    console.log(cleanedData, 'data');
    try {
      const response = await axios.patch(
        'http://localhost:3005/users',
        cleanedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Update successful', response.data);

      toast.success('Updated Successfully!');

      fetchArtists();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const { t } = useTranslation();

  return (
    <div className='max-w-[1280px] pb-[60px] w-full m-auto px-4'>
      <ToastContainer />
      <div className=''>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex  justify-between flex-col sm:flex-row  sm:gap-[60px] gap-[20px] mt-[60px]  '
        >
          <div className='flex gap-[60px] flex-col max-w-[519px] w-full h-[411px]'>
            <AnimatePresence mode='wait'>
              <motion.input
                key={i18next.language + 'header.signUp'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                type='text'
                placeholder={t('profile.fullNameEN')}
                {...register('fullName')}
                className='placeholder:text-[#DDDDDD] text-[#DDDDDD]  bg-[black] border-b-[1px] border-t-0 border-r-0 border-l-0 border-b-[#E4E4E4] border-opacity-[50%] focus:outline-none'
              />
            </AnimatePresence>
            <AnimatePresence mode='wait'>
              <motion.input
                key={i18next.language + 'header.signUp'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                type='text'
                placeholder={t('profile.fullNameGE')}
                {...register('fullNameGEO')}
                className='placeholder:text-[#DDDDDD] text-[#DDDDDD]  bg-[black] border-b-[1px] border-t-0 border-r-0 border-l-0 border-b-[#E4E4E4] border-opacity-[50%] focus:outline-none'
              />
            </AnimatePresence>
            <AnimatePresence mode='wait'>
              <motion.input
                key={i18next.language + 'header.signUp'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                type='email'
                placeholder={t('profile.email')}
                {...register('email')}
                className='placeholder:text-[#DDDDDD] bg-[black] focus:outline-none  text-[#DDDDDD] border-b-[1px] border-t-0 border-r-0 border-l-0 border-b-[#E4E4E4] border-opacity-[50%]'
              />
            </AnimatePresence>
            <AnimatePresence mode='wait'>
              <motion.input
                key={i18next.language + 'header.signUp'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                type='text'
                placeholder={t('profile.phone')}
                {...register('phoneNumber')}
                className='placeholder:text-[#DDDDDD] bg-[black] text-[#DDDDDD] focus:outline-none border-b-[1px] border-t-0 border-r-0 border-l-0 border-b-[#E4E4E4] border-opacity-[50%]'
              />
            </AnimatePresence>
          </div>
          <button
            type='submit'
            className='w-[155px] h-[47px] bg-[#D04175] self-end'
          >
            <AnimatePresence mode='wait'>
              <motion.span
                key={`profile.update`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {t('profile.update')}
              </motion.span>
            </AnimatePresence>
          </button>
        </form>
      </div>
    </div>
  );
}
