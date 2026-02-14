'use client';

import { useState } from 'react';
import LoginBtn from './LoginBtn';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAppBtn from '@/app/commons/hooks/setStore';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

interface LoginInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      const res = await axios.post('http://localhost:3005/auth/sign-in', data);

      if (res.status === 201) {
        setCookie('auth_token', res.data.accesToken, {
          maxAge: 60 * 60,
        });

        handleFormSubmit();
        setError(false);

        setTimeout(() => {
          window.location.reload();
        }, 2000);

        console.log(data);
        toast.success('Successfully signed in!');
      }
    } catch (error: unknown) {
      setIsSubmitting(false);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'An error occurred');
        const errorMessage =
          error.response?.data?.message ||
          'Something went wrong. Please try again.';
        toast.error(errorMessage);
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  const togglelogIn = useAppBtn((state) => state.togglelogIn);
  const toggleOverlay = useAppBtn((state) => state.toggleOverlay);
  const setShowPopUp = useAppBtn((state) => state.setShowPopUp);
  const setShowPopUp2 = useAppBtn((state) => state.setShowPopUp2);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPopUp(false);
      setShowPopUp2(false);
      togglelogIn();
      toggleOverlay(false);

      reset();
    }, 2000);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
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
          className='mb-[11px]'
        >
          <form
            className='flex flex-col gap-[48px]'
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={handleKeyPress}
          >
            <label>
              <input
                type='text'
                placeholder={t('SignUp.email')}
                className='w-full h-[40px] border-b-[1px] border-[#DDDDDD] font-Oswald font-light text-[24px] leading-[35px] text-[#DDDDDD] placeholder:font-Oswald placeholder:font-light placeholder:text-[24px] placeholder:leading-[35px] placeholder:text-[#DDDDDD] focus:outline-none bg-transparent'
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
                type='password'
                placeholder={t('SignUp.password')}
                className='w-full h-[40px] border-b-[1px] border-[#DDDDDD] font-Oswald font-light text-[24px] leading-[35px] text-[#DDDDDD] placeholder:font-Oswald placeholder:font-light placeholder:text-[24px] placeholder:leading-[35px] placeholder:text-[#DDDDDD] focus:outline-none bg-transparent'
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
              {error && <p className='text-red-500 text-sm'>{error}</p>}
            </label>
            <LoginBtn isSubmitting={isSubmitting} />
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoginForm;
