'use client';
import React from 'react';
import type { FormDataT } from './type';
import {
  UseFormRegister,
  FieldErrors,
  UseFormReset,
  UseFormHandleSubmit,
} from 'react-hook-form';
import SubmitButton from './SubmitButton';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';
import { DataItem } from '@/app/commons/hooks/fetchStore';

interface Props {
  register: UseFormRegister<FormDataT>;
  errors: FieldErrors<FormDataT>;
  submitting: boolean;
  editItem: DataItem | null;
  handleSubmit: UseFormHandleSubmit<FormDataT>;
  reset: UseFormReset<FormDataT>;
  fetchUserArts: (userId: string) => void;
  setMainPreview: (url: null) => void;
  setMockupPreview: (url: null) => void;
  setEditItem: (item: DataItem | null) => void;
  setSubmitting: (val: boolean) => void;
}

export default function ArtworkForm({
  register,
  errors,
  submitting,
  handleSubmit,
  setSubmitting,
  editItem,
  reset,
  fetchUserArts,
  setMainPreview,
  setMockupPreview,
  setEditItem,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className='max-w-[312px] w-full flex flex-col gap-[40px]'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='flex flex-col'
        >
          <label className='text-[#DDDDDD] text-[28px]'>
            {t('profile.artworkTitleEN')}
          </label>
          <input
            type='text'
            placeholder={t('profile.addtitle')}
            {...register('title', { required: 'Title is required' })}
            className='bg-black border-b border-[#E4E4E4] text-[#DDDDDD] focus:outline-none'
          />
          {errors.title && (
            <p className='text-red-500'>{errors.title.message}</p>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode='wait'>
        <motion.div
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='flex flex-col'
        >
          <label className='text-[#DDDDDD] text-[28px]'>
            {t('profile.artworkTitleGEO')}
          </label>
          <input
            type='text'
            placeholder={t('profile.addtitle')}
            {...register('titleGEO', { required: 'Title is required' })}
            className='bg-black border-b border-[#E4E4E4] text-[#DDDDDD] focus:outline-none'
          />
          {errors.titleGEO && (
            <p className='text-red-500'>{errors.titleGEO.message}</p>
          )}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        <motion.div
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='flex flex-col'
        >
          <label className='text-[#DDDDDD] text-[28px]'>
            {t('profile.year')}
          </label>
          <input
            type='number'
            placeholder={t('profile.addYear')}
            {...register('year', { required: 'Year is required' })}
            className='bg-black border-b border-[#E4E4E4] text-[#DDDDDD] focus:outline-none'
          />
          {errors.year && <p className='text-red-500'>{errors.year.message}</p>}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode='wait'>
        <motion.div
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='max-w-[308px] w-full'
        >
          <label className='text-[#DDDDDD] text-[28px] max-w-[308px] w-full'>
            {t('profile.description')}
          </label>
          <textarea
            placeholder={t('profile.addDescription')}
            {...register('description', {
              required: 'Description is required',
            })}
            className='bg-black border border-[#D04175] text-[#DDDDDD] h-[192px] focus:outline-none mt-2 w-full'
          />
          {errors.description && (
            <p className='text-red-500'>{errors.description.message}</p>
          )}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        <motion.div
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='max-w-[308px] w-full'
        >
          <label className='text-[#DDDDDD] text-[28px] max-w-[308px] w-full'>
            {t('profile.descriptionGEO')}
          </label>
          <textarea
            placeholder={t('profile.addDescription')}
            {...register('descriptionGEO', {
              required: 'Description is required',
            })}
            className='bg-black border border-[#D04175] text-[#DDDDDD] h-[192px] focus:outline-none mt-2 w-full'
          />
          {errors.descriptionGEO && (
            <p className='text-red-500'>{errors.descriptionGEO.message}</p>
          )}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        <motion.div
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='flex flex-col'
        >
          <label className='text-[#DDDDDD] text-[28px]'>
            {t('profile.category')}
          </label>
          <select
            {...register('category', { required: 'Category is required' })}
            className='bg-black text-[#DDDDDD] focus:outline-none'
          >
            <option value=''> {t('profile.chooseCategory')}</option>
            <option value='painting'> {t('profile.category1')}</option>
            <option value='photography'> {t('profile.category2')}</option>
            <option value='sculpture'> {t('profile.category3')}</option>
            <option value='mixed Media'> {t('profile.category4')}</option>
          </select>
          {errors.category && (
            <p className='text-red-500'>{errors.category.message}</p>
          )}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        <motion.div
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='flex flex-col'
        >
          <label className='text-[#DDDDDD] text-[28px]'>
            {t('profile.size')}
          </label>
          <div className='grid grid-cols-1 gap-4'>
            <div>
              <input
                type='number'
                placeholder={`${t('profile.with')}                     ${t(
                  'profile.cm'
                )}`}
                {...register('width', { required: 'Width is required' })}
                className='bg-black border-b border-[#E4E4E4] text-[#DDDDDD] focus:outline-none'
              />
              {errors.width && (
                <p className='text-red-500'>{errors.width.message}</p>
              )}
            </div>
            <div>
              <input
                type='number'
                placeholder={`${t('profile.height')}                     ${t(
                  'profile.cm'
                )}`}
                {...register('height', { required: 'Height is required' })}
                className='bg-black border-b border-[#E4E4E4] text-[#DDDDDD] focus:outline-none'
              />
              {errors.height && (
                <p className='text-red-500'>{errors.height.message}</p>
              )}
            </div>
            <div>
              <input
                type='number'
                placeholder={`${t('profile.depth')}                     ${t(
                  'profile.cm'
                )}`}
                {...register('depth', { required: 'depth is required' })}
                className='bg-black border-b border-[#E4E4E4] text-[#DDDDDD] focus:outline-none'
              />
              {errors.depth && (
                <p className='text-red-500'>{errors.depth.message}</p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className='flex flex-col'>
        <label className='text-[#DDDDDD] text-[28px]'>
          {t('profile.price')}
        </label>
        <input
          type='text'
          placeholder={t('profile.priceUSD')}
          {...register('price', { required: 'Price is required' })}
          className='bg-black border-b border-[#E4E4E4] text-[#DDDDDD] focus:outline-none'
        />
        {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
      </div>
      <SubmitButton
        editItem={editItem}
        submitting={submitting}
        setSubmitting={setSubmitting}
        handleSubmit={handleSubmit}
        reset={reset}
        fetchUserArts={fetchUserArts}
        setMainPreview={setMainPreview}
        setMockupPreview={setMockupPreview}
        setEditItem={setEditItem}
      />
    </div>
  );
}
