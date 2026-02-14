'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { deleteCookie, getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { useSearchParams } from 'next/navigation';

import useArtStore from '@/app/commons/hooks/fetchStore';
import ProfileS1 from '../../__molecules/profile_molecules/ProfileS1';
import ProfileForm from '../../__molecules/profile_molecules/ProfileForm';
import MyArtWork from '../../__molecules/profile_molecules/MyArtWork';
import OrderHistory from '../../__molecules/profile_molecules/OrderHistory';
import Delivery from '../../__molecules/profile_molecules/Delivery';
import Favorites from '../../__molecules/profile_molecules/Favorites';
import ArtsSectionMobile from '../artWorks_organisms/ArtsSectionMobile';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

interface DecodedToken {
  userRole: string;
  userName: string;
  userNameGEO: string;
}

export default function ProfileMain() {
  const [modalSeller, setModalSeller] = useState(false);
  const [welcomeBack, setWelcomeBack] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userNameGEO, setUserNameGEO] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const { setToken } = useArtStore();
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const logout = useCallback(() => {
    deleteCookie('auth_token');
    setUserName(null);
    window.location.reload();
  }, []);

  const navbarLinks = useMemo(
    () => [
      { id: 1, name: 'profile.profile' },
      ...(userRole === 'seller' ? [{ id: 2, name: 'profile.myArtworks' }] : []),
      { id: 3, name: 'profile.favourites' },
      { id: 4, name: 'profile.orderHistory' },
      { id: 5, name: 'profile.deliveryInformation' },
    ],
    [userRole]
  );

  useEffect(() => {
    (async () => {
      const token = await getCookie('auth_token');

      setToken(token || undefined);

      if (typeof token === 'string') {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          setUserRole(decoded.userRole);
          setUserName(decoded.userName);
          setUserNameGEO(decoded.userNameGEO);

          setModalSeller(decoded.userRole === 'seller');
          setWelcomeBack(decoded.userRole !== 'seller');
        } catch (err) {
          console.error('Invalid token', err);
        }
      }
    })();
  }, [setToken]);

  useEffect(() => {
    if (searchParams.get('wishlist') === '3') {
      setSelectedTab(3);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!navbarLinks.some((link) => link.id === selectedTab)) {
      setSelectedTab(1);
    }
  }, [navbarLinks, selectedTab]);

  const renderTabContent = () => {
    switch (selectedTab) {
      case 1:
        return <ProfileForm />;
      case 2:
        return modalSeller ? <MyArtWork /> : null;
      case 3:
        return (
          <>
            <div className='hidden sm:block'>
              <Favorites />
            </div>
            <div className='block sm:hidden pb-[60px] px-4'>
              <ArtsSectionMobile />
            </div>
          </>
        );
      case 4:
        return <OrderHistory />;
      case 5:
        return <Delivery />;
      default:
        return null;
    }
  };

  return (
    <div className='bg-black w-full'>
      {welcomeBack && (
        <div className='max-w-[1280px] w-full m-auto font-RedRose flex flex-col px-4'>
          <AnimatePresence mode='wait'>
            <motion.h2
              key={i18next.language + 'profile.welcomeback'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='text-[57px] font-light text-[#DDDDDD] leading-[71px]'
            >
              {t('profile.welcomeback')}
            </motion.h2>
          </AnimatePresence>

          <div className='flex justify-between items-end'>
            <AnimatePresence mode='wait'>
              <motion.h2
                key={i18next.language + 'header.signUp'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='text-[57px] font-light text-[#DDDDDD] leading-[71px] w-[296px] mt-[50px]'
              >
                {lang === 'en' ? userName : userNameGEO}
              </motion.h2>
            </AnimatePresence>
          </div>

          <button
            className='w-[121px] h-[40px] bg-black self-end border border-[#6A6264] text-[#D04175] rounded-[4px]'
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      )}

      {modalSeller && <ProfileS1 />}

      <div className='w-full bg-[#FFFFFF1A] sm:h-[109px] flex mt-[10px] px-4'>
        <nav className='max-w-[1280px] w-full m-auto'>
          <ul className='flex justify-between flex-col xss:flex-row'>
            {navbarLinks.map((item) => (
              <li
                key={item.id}
                className={`cursor-pointer flex justify-center items-center ${
                  selectedTab === item.id
                    ? 'border-b-[3px] border-[#D04175]'
                    : ''
                }`}
                onClick={() => setSelectedTab(item.id)}
              >
                <AnimatePresence mode='wait'>
                  <motion.span
                    key={i18next.language + item.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-white font-Oswald font-light ${
                      lang === 'en'
                        ? 'text-[20px] sm:text-[30px] leading-[53px]'
                        : 'text-[17px] sm:text-[28px] leading-[35px]'
                    } text-center`}
                  >
                    {t(item.name)}
                  </motion.span>
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {renderTabContent()}
    </div>
  );
}
