'use client';
import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import Image from 'next/image';
import { FormDataT } from './type';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';
import { DataItem } from '@/app/commons/hooks/fetchStore';

interface Props {
  register: UseFormRegister<FormDataT>;
  errors: FieldErrors<FormDataT>;
  mainPreview: string | null;
  mockupPreview: string | null;
  setMainPreview: (url: string) => void;
  setMockupPreview: (url: string) => void;
  editItem: DataItem | null;
}

export default function UploadSection({
  register,
  errors,
  mainPreview,
  mockupPreview,
  setMainPreview,
  setMockupPreview,
  editItem,
}: Props) {
  const { t } = useTranslation();

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={i18next.language + 'header.signUp'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='max-w-[632px] w-full flex flex-col gap-6'
      >
        {/* Main Image Upload */}
        <label className='relative max-w-[628px] w-full sm:h-[565px] h-[300px] border border-[#D04175] flex justify-center items-center flex-col cursor-pointer overflow-hidden'>
          <>
            {mainPreview ? (
              <Image
                src={mainPreview}
                alt='Main Preview'
                fill
                className='object-cover'
              />
            ) : (
              <>
                <Image
                  src='/add.svg'
                  width={188}
                  height={188}
                  alt='addButton'
                />
                <p className='text-[#993056] mt-[10px]'>
                  {t('profile.addImg')}
                </p>
              </>
            )}
          </>
          <input
            type='file'
            accept='image/*'
            {...register('mainImgUrl', {
              required: !editItem ? 'Main image is required' : false,
              onChange: (e) => {
                if (e.target.files && e.target.files[0]) {
                  setMainPreview(URL.createObjectURL(e.target.files[0]));
                }
              },
            })}
            className='hidden'
          />
          {!editItem && errors.mainImgUrl && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.mainImgUrl.message as string}
            </p>
          )}
        </label>

        <label className='relative max-w-[200px] h-[210px] border border-[#D04175] flex justify-center items-center flex-col cursor-pointer overflow-hidden'>
          <>
            {mockupPreview ? (
              <Image
                src={mockupPreview}
                alt='Mockup Preview'
                fill
                className='object-cover'
              />
            ) : (
              <>
                <Image src='/add.svg' width={59} height={59} alt='addButton' />
                <p className='text-[#993056] mt-[10px]'>
                  {t('profile.addImg')}
                </p>
              </>
            )}
          </>
          <input
            type='file'
            accept='image/*'
            {...register('mockUpImgUrl', {
              required: !editItem ? 'Mock-up image is required' : false,
              onChange: (e) => {
                if (e.target.files && e.target.files[0]) {
                  setMockupPreview(URL.createObjectURL(e.target.files[0]));
                }
              },
            })}
            className='hidden'
          />
          {!editItem && errors.mockUpImgUrl && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.mockUpImgUrl.message as string}
            </p>
          )}
        </label>
      </motion.div>
    </AnimatePresence>
  );
}
