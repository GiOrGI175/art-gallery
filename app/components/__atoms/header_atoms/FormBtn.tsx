'use client';

import useAppBtn from '@/app/commons/hooks/setStore';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

type FormBtnProps = {
  isSubmitting: boolean;
};

const FormBtn: React.FC<FormBtnProps> = ({ isSubmitting }) => {
  const toggleSignUp = useAppBtn((state) => state.toggleSignUp);
  const togglelogIn = useAppBtn((state) => state.togglelogIn);

  const setSowPopUp = useAppBtn((state) => state.setShowPopUp);
  const setSowPopUp2 = useAppBtn((state) => state.setShowPopUp2);

  const { t } = useTranslation();

  return (
    <div className='max-w-[549px] w-full flex flex-col  items-center relative'>
      <p className='font-RedRose font-light text-[12px] leading-[14px] text-[#060002] opacity-[50%] '>
        {t('SignUp.Policy')}
      </p>
      <button
        className='mt-[34px] w-[268px] h-[56px] bg-[#060002] z-50 hover:bg-transparent hover:border-[1px] hover:border-[#060002] duration-500 rounded-[4px]'
        type='submit'
        disabled={isSubmitting}
      >
        <span className='font-Oswald font-normal text-[24px] leading-[35px] text-[#D04175]'>
          {isSubmitting ? t('SignUp.submitting') : t('SignUp.signUp')}
        </span>
      </button>
      <div>
        <span className='mt-[5px] font-RedRose font-light text-[12px] leading-[15px] text-[#060002] opacity-[50%]'>
          {t('SignUp.haveAnAccount')}
        </span>
        <button
          className='ml-[5px] font-Oswald font-normal text-[12px] text-[#060002] leading-[15px] '
          onClick={() => {
            setSowPopUp(false);
            setSowPopUp2(true);
            toggleSignUp();
            togglelogIn();
          }}
        >
          {t('SignUp.logIn')}
        </button>
      </div>
      <span className='mt-[21px] font-RedRose font-light text-[12px] leading-[15px] text-[#060002] opacity-[50%]'>
        {t('SignUp.google')}
      </span>
      <button className='mt-[8px]'>
        <Image src='logos_google.svg' width={73} height={24} alt='Google' />
      </button>
    </div>
  );
};

export default FormBtn;
