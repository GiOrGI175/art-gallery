'use client';

import useAppBtn from '@/app/commons/hooks/setStore';
import { NavBarMobile, navLinksMobile } from '@/app/commons/services/navLinks';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import RoutePrefetcher from '../../__atoms/header_atoms/RoutePrefetcher';

const HeaderMobile = () => {
  const [ShowMenu, setShowMenu] = useState(false);

  const toggleSearch = useAppBtn((state) => state.toggleSearch);
  const toggleAuth = useAppBtn((state) => state.toggleAuth);
  const toggleOverlay = useAppBtn((state) => state.toggleOverlay);

  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    setToken(getCookie('auth_token') as string | undefined);
  }, []);

  return (
    <>
      <RoutePrefetcher />
      <header className='relative w-full h-[40px] flex sm:hidden justify-center items-center px-[20px]  bg-[#060002] z-30'>
        <div className='max-w-[1280px] w-full flex justify-between items-center '>
          <div className='relative h-[25px]'>
            <Link href='/home'>
              <Image src='/Logo_Mobile.svg' width={38} height={25} alt='logo' />
            </Link>
            <div className='absolute bottom-[50%] w-[40px] h-[1px] bg-[#D04175]' />
          </div>
          <div className='flex gap-[12px]'>
            {NavBarMobile.map((item, index) => (
              <Link
                key={`${item.link}+${item.img}`}
                href={item.link}
                onClick={(e) => {
                  if (item.link === '#') {
                    e.preventDefault();
                    toggleSearch();
                    return;
                  }

                  const needAuth = index === 1 || index === 2;
                  if (needAuth && !token) {
                    e.preventDefault();
                    toggleOverlay(true);
                    toggleAuth();
                  }
                }}
              >
                <Image src={item.img} width={16} height={16} alt='Icon' />
              </Link>
            ))}
          </div>
          <div
            className={`w-[72px] h-[40px] flex flex-col items-center bg-[#060002] z-30`}
          >
            <button
              className='w-[72px] h-[30px] py-[19px]   flex justify-center items-center bg-[#060002] z-20 '
              onClick={() => setShowMenu((perv) => !perv)}
            >
              <Image src='/MENU.svg' width={42} height={30} alt='menu' />
            </button>
            <ul
              className={`flex gap-[12px] flex-col items-center w-[112px] bg-[#060002] ${
                ShowMenu ? 'translate-y-[0px]' : 'translate-y-[-275px]'
              }  duration-500 z-10`}
            >
              {navLinksMobile.map((item) => (
                <Link key={item.title} href={item.link}>
                  <li
                    className='h-[38px] flex items-center'
                    onClick={() => setShowMenu((perv) => !perv)}
                  >
                    <span className='font-Oswald font-normal text-[20px] leading-[29px] text-[#DDDDDD]'>
                      {item.title}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderMobile;
