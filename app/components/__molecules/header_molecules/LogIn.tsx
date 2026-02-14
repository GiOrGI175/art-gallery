'use clent';

import Image from 'next/image';
import LoginForm from '../../__atoms/header_atoms/LoginForm';
import useAppBtn from '@/app/commons/hooks/setStore';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

const LogIn = () => {
  const togglelogIn = useAppBtn((state) => state.togglelogIn);
  const toggleOverlay = useAppBtn((state) => state.toggleOverlay);

  const setSowPopUp2 = useAppBtn((state) => state.setShowPopUp2);

  const { t } = useTranslation();

  return (
    <div className='max-w-[371px] w-full sm:max-w-[622px] sm:w-[622px]  py-[30px] px-[35px] flex flex-col bg-[#060002] shadow-2xl rounded-[4px]'>
      <div className='mb-[60px] flex justify-between items-center'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={i18next.language + 'header.signUp'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='flex flex-col'
          >
            <h6 className='mb-[8px] font-Oswald font-medium text-[20px] leading-[22px] text-[#D5D5D5]'>
              {t('SignUp.login')}
            </h6>
            <p className='font-Oswald font-thin text-[20px] leading-[22px] text-[#D5D5D5] opacity-[90%]'>
              {t('SignUp.discover')}
            </p>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={() => {
            setSowPopUp2(false);
            togglelogIn();
            toggleOverlay(false);
          }}
        >
          <Image src='/close_dark.svg' width={17} height={17} alt='Close' />
        </button>
      </div>
      <>
        <LoginForm />
      </>
    </div>
  );
};

export default LogIn;
