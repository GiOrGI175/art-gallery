'use client';

import React from 'react';
import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';

interface FormData {
  profileMainImg: FileList;
  userBio: string;
  userBioGEO: string;
}

interface UserInfo {
  userBio?: string;
  userBioGEO?: string;
  profileMainImg?: string;
  profileUrl?: string;
}

interface ProfileImageProps {
  userInfo: UserInfo;
  register: UseFormRegister<FormData>;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  userInfo,
  register,
}) => {
  return (
    <div
      className={`max-w-[416px] sm:h-[416px] h-[300px] w-full flex items-center justify-center ${
        userInfo.profileUrl ? '' : 'border-[1px] border-[#D04175]'
      }`}
    >
      <div className='flex flex-col items-center'>
        <label className='w-full'>
          {userInfo.profileUrl ? (
            <Image
              src={userInfo.profileUrl}
              width={330}
              height={200}
              alt='profile'
              className='cursor-pointer'
            />
          ) : (
            <Image
              src='/add.svg'
              width={188}
              height={188}
              alt='addButton'
              className='cursor-pointer'
            />
          )}
          <input
            type='file'
            {...register('profileMainImg')}
            className='hidden'
          />
        </label>
        <p className='text-[#993056] mt-[50px]'>Add New Photo</p>
      </div>
    </div>
  );
};
