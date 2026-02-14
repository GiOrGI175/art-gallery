'use client';

import axios from 'axios';
import { getCookie, deleteCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ProfileHeader } from '../../__atoms/profile_atoms/ProfileHeader';
import { ProfileImage } from '../../__atoms/profile_atoms/ProfileImage';
import { BioForm } from '../../__atoms/profile_atoms/BioForm';
import { ActionButtons } from '../../__atoms/profile_atoms/ActionButtons';
import { Loading } from '../../__atoms/profile_atoms/Loading';

interface FormData {
  profileMainImg: FileList;
  userBio: string;
  userBioGEO: string;
}

interface DecodedToken {
  userName: string;
  userNameGEO: string;
  userId: string;
}

interface UserInfo {
  userBio?: string;
  userBioGEO?: string;
  profileMainImg?: string;
}

export default function ProfileS1() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userNameGEO, setUserNameGEO] = useState<string | null>(null);
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const logOut = () => {
    deleteCookie('auth_token');
    setUserName(null);
    setUserNameGEO(null);
    setUserInfo({});
    setUserId('');
    toast.info('Logged out successfully');
    router.push('/');
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/users/${userId}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const token = getCookie('auth_token');
      if (!token || typeof token !== 'string') return;

      const formData = new FormData();
      if (data.profileMainImg && data.profileMainImg[0]) {
        formData.append('file', data.profileMainImg[0]);
      }
      formData.append('userBio', data.userBio);
      formData.append('userBioGEO', data.userBioGEO);

      const res = await axios.post(
        'http://localhost:3005/users/uploadProfile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.status === 201) {
        toast('Profile Updated Successfully');
        fetchUserInfo();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();
  };

  useEffect(() => {
    const token = getCookie('auth_token');
    if (typeof token === 'string') {
      try {
        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
        setUserName(decodedToken.userName);
        setUserNameGEO(decodedToken.userNameGEO);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    if (userInfo?.userBio) {
      setValue('userBio', userInfo.userBio);
    }
    if (userInfo?.userBioGEO) {
      setValue('userBioGEO', userInfo.userBioGEO);
    }
  }, [userInfo, setValue]);

  return (
    <div className='max-w-[1280px] w-full m-auto font-RedRose flex flex-col px-4 '>
      {isLoading ? (
        <Loading t={t} />
      ) : (
        <>
          <ProfileHeader
            userName={userName}
            userNameGEO={userNameGEO}
            lang={lang}
            t={t}
          />

          <div className='mt-[30px] flex justify-between'>
            <ProfileImage userInfo={userInfo} register={register} />

            <BioForm
              userInfo={userInfo}
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
            />
          </div>

          <ActionButtons
            onFormSubmit={handleFormSubmit}
            onLogOut={logOut}
            lang={lang}
            t={t}
          />

          <ToastContainer />
        </>
      )}
    </div>
  );
}
