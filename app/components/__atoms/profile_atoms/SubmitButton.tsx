'use client';
import React from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { toast } from 'react-toastify';
import type { FormDataT } from './type';
import { UseFormHandleSubmit, UseFormReset } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';
import { DataItem } from '@/app/commons/hooks/fetchStore';

interface Props {
  editItem: DataItem | null;
  submitting: boolean;
  setSubmitting: (val: boolean) => void;
  handleSubmit: UseFormHandleSubmit<FormDataT>;
  reset: UseFormReset<FormDataT>;
  fetchUserArts: (userId: string) => void;
  setMainPreview: (val: null) => void;
  setMockupPreview: (val: null) => void;
  setEditItem: (item: DataItem | null) => void;
}

export default function SubmitButton({
  editItem,
  submitting,
  setSubmitting,
  handleSubmit,
  reset,
  fetchUserArts,
  setMainPreview,
  setMockupPreview,
  setEditItem,
}: Props) {
  const onSubmit = async (data: FormDataT) => {
    if (!editItem) return;

    setSubmitting(true);

    const token = getCookie('auth_token');
    if (!token || typeof token !== 'string') return;

    const formData = new window.FormData();
    formData.append('title', data.title);
    formData.append('titleGEO', data.titleGEO);
    formData.append('year', data.year.toString());
    formData.append('description', data.description);
    formData.append('descriptionGEO', data.descriptionGEO);
    formData.append('category', data.category);
    formData.append('width', data.width.toString());
    formData.append('height', data.height.toString());
    formData.append('depth', data.depth.toString());
    formData.append('price', data.price.toString());
    if (data.mainImgUrl?.[0]) {
      formData.append('files', data.mainImgUrl[0]);
    }
    if (data.mockUpImgUrl?.[0]) {
      formData.append('files', data.mockUpImgUrl[0]);
    }

    await axios.patch(
      `http://localhost:3005/products/${editItem._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    toast.success('Artwork updated');
    reset();
    setMainPreview(null);
    setMockupPreview(null);
    fetchUserArts(editItem.user._id);
    setEditItem(null);
    setSubmitting(false);
  };

  const { t } = useTranslation();

  return editItem ? (
    <button
      onClick={handleSubmit(onSubmit)}
      className='bg-[#D04175] text-white px-4 py-2 rounded mt-4'
    >
      {submitting ? 'Updating...' : 'Update'}
    </button>
  ) : (
    <button
      type='submit'
      className='bg-[#D04175] text-white px-4 py-2 rounded mt-4'
    >
      <AnimatePresence mode='wait'>
        <motion.span
          key={i18next.language + 'header.signUp'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {submitting ? t('profile.Submitting') : t('profile.submit')}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
