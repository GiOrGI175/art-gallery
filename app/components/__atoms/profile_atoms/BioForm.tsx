'use client';

import React from 'react';

import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
  SubmitHandler,
} from 'react-hook-form';

interface FormData {
  profileMainImg: FileList;
  userBio: string;
  userBioGEO: string;
}

interface UserInfo {
  userBio?: string;
  userBioGEO?: string;
  profileMainImg?: string;
}

interface BioFormProps {
  userInfo: UserInfo;
  register: UseFormRegister<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  onSubmit: SubmitHandler<FormData>;
  errors: FieldErrors<FormData>;
}

export const BioForm: React.FC<BioFormProps> = ({
  userInfo,
  register,
  handleSubmit,
  onSubmit,
  errors,
}) => {
  return (
    <div
      className={`max-w-[740px] sm:h-[416px] h-[300px] ml-5 w-full flex justify-center items-center flex-col ${
        userInfo?.userBio ? '' : 'border-[1px] border-[#D04175]'
      }`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col justify-center items-center'
      >
        <div className='w-full'>
          <textarea
            {...register('userBio', {
              required: 'Artist info is required',
            })}
            className={`max-w-[700px] w-full min-h-[120px] appearance-none  bg-black ${
              userInfo?.userBio ? '' : 'border border-[#D04175]'
            } focus:outline-none focus:ring-0 text-[white]`}
            placeholder="Enter artist's information... (EN)"
          />
          {errors.userBio && (
            <span className='text-red-500'>{errors.userBio.message}</span>
          )}
        </div>

        <div className='w-full'>
          <textarea
            {...register('userBioGEO', {
              required: 'Artist info is required',
            })}
            className={`max-w-[700px] w-full  min-h-[120px] appearance-none bg-black ${
              userInfo?.userBioGEO ? '' : 'border border-[#D04175]'
            } focus:outline-none focus:ring-0 text-[white]`}
            placeholder="Enter artist's information... (GEO)"
          />
          {errors.userBioGEO && (
            <span className='text-red-500'>{errors.userBioGEO.message}</span>
          )}
        </div>
      </form>
    </div>
  );
};
