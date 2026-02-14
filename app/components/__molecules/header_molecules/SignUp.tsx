'use client';

import Image from 'next/image';
import BuyerForm from '../../__atoms/header_atoms/BuyerForm';
import useAppBtn from '@/app/commons/hooks/setStore';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

const SignUp = () => {
  // const [whichUser, setWichUser] = useState(true);

  const toggleSignUp = useAppBtn((state) => state.toggleSignUp);
  const toggleOverlay = useAppBtn((state) => state.toggleOverlay);

  const setSowPopUp = useAppBtn((state) => state.setShowPopUp);

  const { t } = useTranslation();

  return (
    <div className='max-w-[371px] w-full sm:w-[622px]  sm:max-w-[622px]    py-[30px] px-[35px] flex flex-col bg-[#E8E8E8] shadow-2xl rounded-[4px]'>
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
            <h6 className='mb-[8px] font-Oswald font-medium text-[20px] leading-[22px] text-[#060002]'>
              {t('SignUp.signUp')}
            </h6>
            <p className='font-Oswald font-thin text-[20px] leading-[22px] text-[#060002c6] '>
              {t('SignUp.discover')}
            </p>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => {
            setSowPopUp(false);
            toggleSignUp();
            toggleOverlay(false);
          }}
        >
          <Image src='/close.svg' width={17} height={17} alt='Close' />
        </button>
      </div>
      {/* <div className='mb-[40px] flex rounded-[4px] border-[1px] border-[#D04175] overflow-hidden'>
        <button
          className={`flex justify-center items-center flex-1 h-[38px]  ${
            whichUser ? 'bg-[#D04175] rounded-r-[4px]' : ''
          } duration-500`}
          onClick={() => setWichUser(true)}
        >
          <AnimatePresence mode='wait'>
            <motion.span
              key={i18next.language + 'header.signUp'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`font-Oswald font-light text-[20px] leading-[29px] ${
                whichUser ? 'text-[#060002]' : 'text-[#D04175]'
              }  `}
            >
              {t('SignUp.buyer')}
            </motion.span>
          </AnimatePresence>
        </button>
        <button
          className={`flex justify-center items-center flex-1 h-[38px]  ${
            !whichUser ? 'bg-[#D04175] rounded-l-[4px]' : ''
          } duration-500`}
          onClick={() => setWichUser(false)}
        >
          <AnimatePresence mode='wait'>
            <motion.span
              key={i18next.language + 'header.signUp'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`font-Oswald font-light text-[20px] leading-[29px] ${
                !whichUser ? 'text-[#060002]' : 'text-[#D04175]'
              }  duration-500`}
            >
              {t('SignUp.seller')}
            </motion.span>
          </AnimatePresence>
        </button>
      </div> */}
      {/* {whichUser && <BuyerForm />}
      {!whichUser && <SellerForm />} */}
      <BuyerForm />
    </div>
  );
};

export default SignUp;
