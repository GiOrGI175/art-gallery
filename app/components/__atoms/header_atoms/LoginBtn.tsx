'use client';

import useAppBtn from '@/app/commons/hooks/setStore';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

type LoginBtnProps = {
  isSubmitting: boolean;
};

const LoginBtn: React.FC<LoginBtnProps> = ({ isSubmitting }) => {
  const toggleSignUp = useAppBtn((state) => state.toggleSignUp);
  const togglelogIn = useAppBtn((state) => state.togglelogIn);

  const setShowPopUp = useAppBtn((state) => state.setShowPopUp);
  const setShowPopUp2 = useAppBtn((state) => state.setShowPopUp2);

  const { t } = useTranslation();

  return (
    <div className='max-w-[549px] w-full flex flex-col  items-center relative'>
      <button className='font-RedRose font-light text-[12px] leading-[14px] text-[#E4E4E4] opacity-[50%] '>
        {t('SignUp.forgotPassword')}
      </button>
      <button
        className='group mt-[14px] mb-[25px] w-[268px] h-[56px] bg-[#D04175] z-50 hover:bg-transparent border-[1px] border-[#D04175] hover:border-[1px] hover:border-[#D04175] duration-500 rounded-[4px]'
        type='submit'
        disabled={isSubmitting}
      >
        <span className='font-Oswald font-normal text-[24px] leading-[35px] text-[#060002] group-hover:text-[#D04175] duration-500'>
          {isSubmitting ? t('SignUp.submitting') : t('SignUp.login')}
        </span>
      </button>
      <div>
        <span className='mt-[5px] font-RedRose font-light text-[12px] leading-[15px] text-[#E4E4E4] opacity-[50%]'>
          {t('SignUp.dontAccount')}
        </span>
        <button
          className='ml-[5px] font-Oswald font-normal text-[12px] text-[#E4E4E4] leading-[15px] '
          onClick={() => {
            setShowPopUp(true);
            setShowPopUp2(false);
            toggleSignUp();
            togglelogIn();
          }}
        >
          {t('SignUp.signUp')}
        </button>
      </div>
      <span className='mt-[21px] font-RedRose font-light text-[12px] leading-[15px] text-[#E4E4E4] opacity-[50%]'>
        {t('SignUp.google')}
      </span>
      <button
        className='mt-[8px]'
        onClick={() => {
          window.location.href = 'http://localhost:3005/auth/google';
        }}
      >
        <Image src='logos_google.svg' width={73} height={24} alt='Google' />
      </button>
    </div>
  );
};

export default LoginBtn;
