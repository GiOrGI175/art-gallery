'use client';
import React from 'react';
import type { Address } from './type';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

interface Props {
  formData: Address;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  editingIndex: number | null;
  error: string;
  addresArray: Address[];
}

export default function AddressForm({
  formData,
  onChange,
  onSubmit,
  editingIndex,
  error,
  addresArray,
}: Props) {
  const homeCount =
    addresArray.filter(
      (item) =>
        item.adressName.startsWith('Home') ||
        item.adressName.startsWith('სახლი')
    ).length + 1;

  const workCount =
    addresArray.filter(
      (item) =>
        item.adressName.startsWith('Work') ||
        item.adressName.startsWith('სამსახური')
    ).length + 1;

  const { t } = useTranslation();

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={i18next.language + 'header.signUp'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='max-w-[525px] w-full h-[752px] sm:mt-[60px] m-auto sm:m-0 '
      >
        <h5 className='text-[28px] font-normal font-Oswald text-[#DDDDDD]'>
          {t('profile.addAddresses')}
        </h5>
        <form
          onSubmit={onSubmit}
          className='w-full flex flex-col h-[600px] mt-[50px] justify-between'
        >
          <input
            type='text'
            placeholder={t('profile.fullName')}
            name='fullName'
            value={formData.fullName}
            onChange={onChange}
            className='placeholder:text-[#DDDDDD] text-[#DDDDDD] bg-black border-b border-[#E4E4E4] border-opacity-50 focus:outline-none'
          />
          <input
            type='text'
            placeholder={t('profile.Address1')}
            name='address'
            value={formData.address}
            onChange={onChange}
            className='placeholder:text-[#DDDDDD] text-[#DDDDDD] bg-black border-b border-[#E4E4E4] border-opacity-50 focus:outline-none'
          />
          <select
            name='country'
            value={formData.country}
            onChange={onChange}
            className='text-[#DDDDDD] bg-black border-b border-[#E4E4E4] border-opacity-50 focus:outline-none'
          >
            <option value=''>{t('profile.choosCountry')}</option>
            <option value={t('profile.country1')}>
              {t('profile.country1')}
            </option>
            <option value={t('profile.country2')}>
              {t('profile.country2')}
            </option>
            <option value={t('profile.country3')}>
              {t('profile.country3')}
            </option>
            <option value={t('profile.country4')}>
              {t('profile.country4')}
            </option>
          </select>
          <input
            type='text'
            placeholder={t('profile.city')}
            name='city'
            value={formData.city}
            onChange={onChange}
            className='text-[#DDDDDD] bg-black border-b border-[#E4E4E4] border-opacity-50 focus:outline-none'
          />
          <input
            type='text'
            name='zipCode'
            placeholder={t('profile.ZIP')}
            value={formData.zipCode}
            onChange={onChange}
            className='text-[#DDDDDD] bg-black border-b border-[#E4E4E4] border-opacity-50 focus:outline-none'
          />
          <input
            type='number'
            name='phone'
            placeholder={t('profile.Phone')}
            value={formData.phone}
            onChange={onChange}
            className='text-[#DDDDDD] bg-black border-b border-[#E4E4E4] border-opacity-50 focus:outline-none'
          />
          <select
            name='adressName'
            value={formData.adressName}
            onChange={onChange}
            className='text-[#DDDDDD] bg-black border-b border-[#E4E4E4] border-opacity-50 focus:outline-none'
          >
            <option value=''>{t('profile.chooseCategory')}</option>
            <option value={`${t('profile.Home')}-${homeCount}`}>
              {t('profile.Home')}-{homeCount}
            </option>
            <option value={`${t('profile.Work')}-${workCount}`}>
              {t('profile.Work')}-{workCount}
            </option>
          </select>

          <p className='text-[#D04175] font-Oswald text-[20px]'>{error}</p>

          <button type='submit' className='bg-[#D04175] h-[54px] rounded-[4px]'>
            {editingIndex !== null
              ? t('profile.updateAddress')
              : t('profile.saveAddress')}
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
