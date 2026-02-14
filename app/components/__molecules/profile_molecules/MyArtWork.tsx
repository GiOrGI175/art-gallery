'use client';
import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useArtStore, { DataItem } from '@/app/commons/hooks/fetchStore';
import useAppBtn from '@/app/commons/hooks/setStore';
import { UserToken, FormDataT } from '../../__atoms/profile_atoms/type';
import UploadSection from '../../__atoms/profile_atoms/UploadSection';
import ArtworkForm from '../../__atoms/profile_atoms/ArtworkFrom';
import ArtworksDisplay from '../../__atoms/profile_atoms/ArtworkDisplay';
import ImgsfildesNames from '../../__atoms/profile_atoms/ImgsfildesNames';

export default function MyArtWork() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormDataT>();

  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [mockupPreview, setMockupPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchUserArts = useArtStore((state) => state.fetchUserArts);
  const artistDataz = useArtStore((state) => state.artistData);
  const token = useArtStore((state) => state.token);

  const editItem = useAppBtn((state) => state.currentEditItem);
  const setEditItem = useAppBtn((state) => state.setEditItem);

  const [artistData, setArtistData] = useState<DataItem[] | null>(null);

  useEffect(() => {
    if (editItem) {
      Object.entries(editItem).forEach(([key, value]) => {
        const typedKey = key as keyof FormDataT;
        if (typedKey === 'mainImgUrl' || typedKey === 'mockUpImgUrl') return;
        setValue(typedKey, value as string | number);
      });
      if (typeof editItem.mainImgUrl === 'string') {
        setMainPreview(editItem.mainImgUrl);
      }
      if (typeof editItem.mockUpImgUrl === 'string') {
        setMockupPreview(editItem.mockUpImgUrl);
      }
    }
  }, [editItem, setValue]);

  useEffect(() => {
    const storedToken = getCookie('auth_token');
    if (storedToken && typeof storedToken === 'string') {
      const decoded: UserToken = jwtDecode(storedToken);
      if (decoded?.userId) fetchUserArts(decoded.userId);
    }
  }, [token]);

  useEffect(() => {
    setArtistData(artistDataz);
  }, [artistDataz]);

  const handleFormSubmit = async (data: FormDataT) => {
    try {
      const token = getCookie('auth_token');
      if (!token || typeof token !== 'string')
        return toast.error('User not authenticated');

      setSubmitting(true);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'mainImgUrl' && value[0])
          formData.append('files', value[0]);
        else if (key === 'mockUpImgUrl' && value[0])
          formData.append('files', value[0]);
        else formData.append(key, value.toString());
      });

      const url = editItem
        ? `http://localhost:3005/products/${editItem._id}`
        : 'http://localhost:3005/products/create';
      const method = editItem ? axios.patch : axios.post;

      await method(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const decoded: UserToken = jwtDecode(token);
      toast.success(
        editItem ? 'Artwork updated' : 'Product added successfully'
      );

      reset();
      setMainPreview(null);
      setMockupPreview(null);
      fetchUserArts(editItem ? editItem.user._id : decoded.userId);
      setEditItem(null);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='max-w-[1280px] w-full m-auto mt-[61px] px-4'>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className='flex flex-col sm:flex-row gap-8'
      >
        <ImgsfildesNames />
        <UploadSection
          register={register}
          errors={errors}
          mainPreview={mainPreview}
          mockupPreview={mockupPreview}
          setMainPreview={setMainPreview}
          setMockupPreview={setMockupPreview}
          editItem={editItem}
        />
        <ArtworkForm
          register={register}
          errors={errors}
          submitting={submitting}
          setSubmitting={setSubmitting}
          handleSubmit={handleSubmit}
          editItem={editItem}
          reset={reset}
          fetchUserArts={fetchUserArts}
          setMainPreview={setMainPreview}
          setMockupPreview={setMockupPreview}
          setEditItem={setEditItem}
        />
      </form>
      <ArtworksDisplay artistData={artistData} />
    </div>
  );
}
