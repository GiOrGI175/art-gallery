import SignUp from '../../__molecules/header_molecules/SignUp';
import LogIn from '../../__molecules/header_molecules/LogIn';
import useAppBtn from '@/app/commons/hooks/setStore';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

const AuthBtn = () => {
  const { t } = useTranslation();

  const toggleOverlay = useAppBtn((state) => state.toggleOverlay);
  const toggleSignUp = useAppBtn((state) => state.toggleSignUp);
  const togglelogIn = useAppBtn((state) => state.togglelogIn);

  const sowPopUp = useAppBtn((state) => state.showPopUp);
  const setSowPopUp = useAppBtn((state) => state.setShowPopUp);

  const showPopUp2 = useAppBtn((state) => state.showPopUp2);
  const setSowPopUp2 = useAppBtn((state) => state.setShowPopUp2);

  return (
    <div className='relative w-full sm:w-auto  flex flex-col justify-end gap-[12px] pt-[8px] z-20 '>
      <div className='w-full sm:w-auto flex justify-center sm:justify-end gap-[12px]'>
        <button
          className=' px-[16px] py-[12px]  h-[44px] sm:h-[46px] rounded-[4px] bg-[#AFABAC] hover:bg-transparent duration-700'
          onClick={() => {
            setSowPopUp(true);
            setSowPopUp2(false);
            toggleOverlay(true);
            toggleSignUp();
          }}
        >
          <AnimatePresence mode='wait'>
            <motion.span
              key={i18next.language + 'header.signUp'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='font-RedRose font-light text-[18px] leading-[22px] text-[#D04175] '
            >
              {t('header.signUp')}
            </motion.span>
          </AnimatePresence>
        </button>
        <button
          className='group  px-[16px] py-[12px]  h-[44px] sm:h-[46px] rounded-[4px] bg-[#D04175] hover:bg-transparent duration-700'
          onClick={() => {
            setSowPopUp2(true);
            setSowPopUp(false);
            toggleOverlay(true);
            togglelogIn();
          }}
        >
          <AnimatePresence mode='wait'>
            <motion.span
              key={i18next.language + 'header.signUp'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='font-RedRose font-light text-[18px] leading-[22px] text-[#F0F0F0] group-hover:text-[#060002] duration-700'
            >
              {t('header.logIn')}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
      <div
        className={`hidden h-[1084px] sm:block absolute right-[0px]  ${
          sowPopUp ? 'translate-y-[1090px]' : 'translate-y-[-250px]'
        }  duration-500`}
      >
        <SignUp />
      </div>
      <div
        className={`hidden h-[1084px] sm:block absolute right-[0px]  ${
          showPopUp2 ? 'translate-y-[1090px]' : 'translate-y-[-250px]'
        }  duration-500`}
      >
        <LogIn />
      </div>
    </div>
  );
};

export default AuthBtn;
