'use client';

import FormBtn from './FormBtn';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import useAppBtn from '@/app/commons/hooks/setStore';
import axios from 'axios';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

interface sellerInput {
  fullName: string;
  fullNameGEO: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordRepeat: string;
  photoUrl: FileList;
}

const SellerForm = () => {
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<sellerInput>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSignUp = useAppBtn((state) => state.toggleSignUp);

  const toggleOverlay = useAppBtn((state) => state.toggleOverlay);

  const setSowPopUp = useAppBtn((state) => state.setShowPopUp);

  const handleFormSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSowPopUp(false);
      toggleSignUp();
      toggleOverlay(false);

      reset();
    }, 2000);
  };

  const onSubmit: SubmitHandler<sellerInput> = async (data) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('fullNameGEO', data.fullNameGEO);
      formData.append('email', data.email);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('password', data.password);
      formData.append('passwordRepeat', data.passwordRepeat);

      if (data.photoUrl && data.photoUrl.length >= 8) {
        Array.from(data.photoUrl).forEach((file) => {
          formData.append('files', file);
          console.log(data.photoUrl, 'photoUrl sadanca vigebt');

          console.log(file, 'file rac formdatshia');
        });
      }

      console.log(formData, 'formData');

      const res = await axios.post(
        'http://localhost:3005/auth/sign-up/seller',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('shemovidsa');

      if (res.status === 201) {
        handleFormSubmit();
        setError(false);
        console.log(data);
        setTimeout(() => {
          toast.success('Register Successfully!');
        }, 1000);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'An error occurred');
        const errorMessage =
          error.response?.data?.message ||
          'Something went wrong. Please try again.';
        toast.error(errorMessage);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
      console.log('enter');
    }
  };

  const { t } = useTranslation();

  return (
    <div>
      <ToastContainer />
      <AnimatePresence mode='wait'>
        <motion.div
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <form
            className='flex flex-col gap-[48px]'
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={handleKeyPress}
          >
            <label>
              <input
                type='text'
                placeholder={t('SignUp.fullNameEN')}
                className='w-full h-[40px] border-b-[1px] border-[#060002] font-Oswald font-light text-[24px] leading-[35px] text-[#060002] placeholder:font-Oswald placeholder:font-light placeholder:text-[24px] placeholder:leading-[35px] placeholder:text-[#060002] focus:outline-none bg-transparent'
                {...register('fullName', {
                  required: 'FullName is required',
                  maxLength: {
                    value: 25,
                    message: 'FullName must not exceed 25 characters',
                  },
                })}
              />
              {errors.fullName && (
                <p className='text-red-500 text-sm'>
                  {errors.fullName.message}
                </p>
              )}
            </label>

            <label>
              <input
                type='text'
                placeholder={t('SignUp.fullNameGEO')}
                className='w-full h-[40px] border-b-[1px] border-[#060002] font-Oswald font-light text-[24px] leading-[35px] text-[#060002] placeholder:font-Oswald placeholder:font-light placeholder:text-[24px] placeholder:leading-[35px] placeholder:text-[#060002] focus:outline-none bg-transparent'
                {...register('fullNameGEO', {
                  required: 'FullName is required',
                  maxLength: {
                    value: 25,
                    message: 'FullName must not exceed 25 characters',
                  },
                })}
              />
              {errors.fullName && (
                <p className='text-red-500 text-sm'>
                  {errors.fullName.message}
                </p>
              )}
            </label>
            <label>
              <input
                type='text'
                placeholder={t('SignUp.email')}
                className='w-full h-[40px] border-b-[1px] border-[#060002] font-Oswald font-light text-[24px] leading-[35px] text-[#060002] placeholder:font-Oswald placeholder:font-light placeholder:text-[24px] placeholder:leading-[35px] placeholder:text-[#060002] focus:outline-none bg-transparent'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
              )}
            </label>
            <label>
              <input
                type='number'
                placeholder={t('SignUp.phone')}
                className='w-full h-[40px] border-b-[1px] border-[#060002] font-Oswald font-light text-[24px] leading-[35px] text-[#060002] placeholder:font-Oswald placeholder:font-light placeholder:text-[24px] placeholder:leading-[35px] placeholder:text-[#060002] focus:outline-none bg-transparent'
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                  maxLength: {
                    value: 9,
                    message: 'Phone number must not exceed 9 digits',
                  },
                })}
              />
              {errors.phoneNumber && (
                <p className='text-red-500 text-sm'>
                  {errors.phoneNumber.message}
                </p>
              )}
            </label>
            <label>
              <input
                type='password'
                placeholder={t('SignUp.password')}
                className='w-full h-[40px] border-b-[1px] border-[#060002] font-Oswald font-light text-[24px] leading-[35px] text-[#060002] placeholder:font-Oswald placeholder:font-light placeholder:text-[24px] placeholder:leading-[35px] placeholder:text-[#060002] focus:outline-none bg-transparent'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Password must not exceed 15 characters',
                  },
                })}
              />
              {errors.password && (
                <p className='text-red-500 text-sm'>
                  {errors.password.message}
                </p>
              )}
            </label>
            <label>
              <input
                type='password'
                placeholder={t('SignUp.repeatPassword')}
                className='w-full h-[40px] border-b-[1px] border-[#060002] font-Oswald font-light text-[24px] leading-[35px] text-[#060002] placeholder:font-Oswald placeholder:font-light placeholder:text-[24px] placeholder:leading-[35px] placeholder:text-[#060002] focus:outline-none bg-transparent'
                {...register('passwordRepeat', {
                  required: 'Repeat Password is required',
                  validate: (value) => {
                    if (value !== watch('password')) {
                      return 'Passwords do not match';
                    }
                  },
                })}
              />
              {errors.passwordRepeat && (
                <p className='text-red-500 text-sm'>
                  {errors.passwordRepeat.message}
                </p>
              )}
              {error && <p className='text-red-500 text-sm'>{error}</p>}
            </label>

            <div>
              <p className='font-Oswald font-light text-[24px] leading-[35px] text-[#060002]'>
                {t('SignUp.upload')}
              </p>
              <label className='max-w-[551px] w-full h-[99px] mt-[13px] flex flex-col justify-center items-center rounded-[4px] border-[1px] border-[#0E0004] cursor-pointer'>
                <input
                  type='file'
                  multiple
                  accept='image/*'
                  {...register('photoUrl', {
                    required: 'You must upload at least 8 images',
                    validate: (value) =>
                      value.length >= 8 || 'Please upload at least 8 images',
                  })}
                  className='hidden'
                />
                <div>
                  <Image
                    src='/Upload.svg'
                    width={20}
                    height={20}
                    alt='upload'
                  />
                </div>
                <span className='font-Oswald font-light text-[24px] leading-[35px] text-[#989294]'>
                  {t('SignUp.clkUpload')}
                </span>
              </label>
            </div>

            <div className='relative '>
              <FormBtn isSubmitting={isSubmitting} />
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SellerForm;
