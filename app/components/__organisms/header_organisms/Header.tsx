'use client';

import Link from 'next/link';
import { navLinks } from '@/app/commons/services/navLinks';
import Image from 'next/image';
import AuthBtn from '../../__atoms/header_atoms/AuthBtn';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import LangBtn from '../../__atoms/home_atoms/LangBtn';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';
import RoutePrefetcher from '../../__atoms/header_atoms/RoutePrefetcher';

const Header = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userNameGEO, setUserNameGEO] = useState<string | null>(null);

  const router = useRouter();
  interface DecodedToken {
    userName: string;
    userNameGEO: string;
  }

  const PathName = usePathname();
  const disableHeader = ['/home', '/'].includes(PathName);

  useEffect(() => {
    const token = getCookie('auth_token');

    if (typeof token === 'string') {
      try {
        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
        setUserName(decodedToken.userName);
        setUserNameGEO(decodedToken.userNameGEO);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);
  console.log(userName);

  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <>
      <RoutePrefetcher />

      <header className={`w-full hidden sm:flex justify-center px-[20px] z-50`}>
        <div className='max-w-[1440px] w-full flex-col flex items-center'>
          <div
            className={`max-w-[1280px] w-full pt-[21px]  flex justify-between ${
              disableHeader && 'hidden'
            }`}
          >
            <div className='relative h-[87px]'>
              <Link href='/home'>
                <Image
                  src='/Logo_black.svg'
                  width={90}
                  height={56}
                  alt='logo'
                  className='mt-[16px] ml-[10px]'
                />
              </Link>
              <div className='absolute bottom-[50%] w-[90px] h-[1px] bg-[#D04175]' />
            </div>

            <div className='flex flex-col items-end'>
              <div className='flex items-center gap-4'>
                {userName && (
                  <div className='flex items-center gap-[52px]'>
                    <div className='flex gap-[22px]'>
                      <Link href='/profile?wishlist=3'>
                        <Image
                          src='wishlist.svg'
                          width={24}
                          height={24}
                          alt='wishlist'
                          className='cursor-pointer'
                        />
                      </Link>
                      <Image
                        src='cartbtn.svg'
                        width={24}
                        height={24}
                        alt='cartbtn'
                        onClick={() => router.push('/cart')}
                        className='cursor-pointer'
                      />
                    </div>
                    <div
                      className='flex gap-2 cursor-pointer'
                      onClick={() => router.push('/profile')}
                    >
                      <Image
                        src='user.svg'
                        width={18}
                        height={18}
                        alt='userLogo'
                      />
                      <AnimatePresence mode='wait'>
                        <motion.span
                          key={i18next.language + 'header.signUp'}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className='text-[22px] font-RedRose font-light text-[#060002]'
                        >
                          {lang === 'en' ? userName : userNameGEO}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                )}
                <div className={userName ? 'hidden' : 'flex'}>
                  <AuthBtn />
                </div>
              </div>

              <nav>
                <ul className='flex gap-[54px] duration-500'>
                  {navLinks.map((item) => {
                    const isActive = PathName.startsWith(item.link);
                    return (
                      <li
                        key={item.title}
                        className={`h-[57px] mt-[12px] ${
                          lang === 'en' ? 'px-[8px]' : 'px-[0px]'
                        } border-b-[2px] hover:border-[#D04175] ${
                          isActive ? 'border-[#D04175]' : 'border-transparent'
                        } duration-500 flex items-center focus-visible:ring-offset-0 focus-visible:ring-transparent  focus:bg-white/30 transition`}
                      >
                        <Link href={item.link}>
                          {' '}
                          <AnimatePresence mode='wait'>
                            <motion.span
                              key={i18next.language + item.title}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className={`font-Oswald font-normal ${
                                lang === 'en' ? 'text-[28px]' : 'text-[22px]'
                              } leading-[41px] text-[#0E0004]`}
                            >
                              {t(item.title)}
                            </motion.span>
                          </AnimatePresence>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
          <div
            className={`pb-[5px] flex self-end ${disableHeader && 'hidden'}`}
          >
            <LangBtn />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
