'use client';

import Search from '@/app/components/__atoms/home_atoms/Search';
import AboutUs from '@/app/components/__molecules/home_moleculs/AboutUs';
import ContactUs from '@/app/components/__molecules/home_moleculs/ContactUs';
import OurStory from '@/app/components/__molecules/home_moleculs/OurStory';
import GoingAivtion from '@/app/components/__organisms/home_organisms/GoingAivtion';
import HeroHeader from '@/app/components/__organisms/header_organisms/HeroHeader';
import SwipperArtSection from '@/app/components/__organisms/home_organisms/SwipperArtSection';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AuthBtn from '@/app/components/__atoms/header_atoms/AuthBtn';
import ArtsSectionMobile from '@/app/components/__organisms/artWorks_organisms/ArtsSectionMobile';
import GoungAuctionMobile from '@/app/components/__organisms/home_organisms/GoungAuctionMobile';
import useAppBtn from '@/app/commons/hooks/setStore';
import SignUp from '@/app/components/__molecules/header_molecules/SignUp';
import LogIn from '@/app/components/__molecules/header_molecules/LogIn';
import Head from 'next/head';
import { getCookie } from 'cookies-next';
import PlsAuth from '@/app/components/__atoms/header_atoms/PlsAuth';
import useArtStore from '@/app/commons/hooks/fetchStore';
import SearchMoblie from '@/app/components/__atoms/home_atoms/SearchMoblie';
import PlsAuthMobile from '@/app/components/__atoms/header_atoms/PlsAuthMobile';

export default function HomePage() {
  const setOverlay = useAppBtn((state) => state.setOverlay);
  const showSignUp = useAppBtn((state) => state.showSignUp);
  const showLogIn = useAppBtn((state) => state.showLogIn);
  const showAuth = useAppBtn((state) => state.showAuth);
  const showSearch = useAppBtn((state) => state.showSearch);

  const setToken = useArtStore((state) => state.setToken);

  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const token = await getCookie('auth_token');
      if (token) {
        setToken(token);
      } else {
        setToken(undefined);
      }
    };
    getToken();
  }, [setToken]);

  const [user, setUser] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    const token = getCookie('auth_token');
    if (typeof token === 'string') {
      setUser(true);
    }
  }, []);
  console.log(user);

  return (
    <>
      <Head>
        <link rel='preload' href='/Hero.webp' as='image' type='image/webp' />
      </Head>
      <div className='w-full flex-col flex  items-center bg-[#060002] z-20'>
        <section
          className={`relative max-w-[1440px] sm:h-[860px] w-full flex flex-col items-center  sm:bg-cover sm:bg-center`}
        >
          <div className='hidden sm:block absolute h-[860px]  d inset-0 -z-10'>
            <Image
              src='/Hero.webp'
              alt='banner'
              layout='fill'
              objectFit='cover'
              priority
              className={`object-cover  transition-opacity duration-1000 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadingComplete={handleImageLoad}
            />
          </div>

          <HeroHeader />
          <div className='w-full h-full hidden sm:flex justify-center '>
            <Search />
          </div>

          <div className='relative block sm:hidden'>
            <Image
              src='/Hero.webp'
              width={768}
              height={240}
              alt='baner'
              className={`object-cover  transition-opacity duration-1000 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadingComplete={handleImageLoad}
            />

            <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
              {showSearch && <SearchMoblie />}
            </div>

            {!user && (
              <div className='absolute bottom-[28px] w-full'>
                <AuthBtn />
              </div>
            )}
            {/* <div className="absolute bottom-[28px] w-full">
              <AuthBtn />
            </div> */}
          </div>
        </section>
      </div>
      <div
        className='w-full flex-col flex  items-center bg-[#060002] px-[20px] relative -z-10'
        id='about'
      >
        <AboutUs />
      </div>
      <div className='relative w-full flex-col hidden sm:flex  items-center bg-[#E8E8E8] px-[23px] z-10'>
        <SwipperArtSection />
      </div>
      <div className=' w-full flex-col sm:hidden flex   items-center bg-[#E8E8E8] '>
        <div className='max-w-[1440px] w-full  flex justify-center pb-[25px] px-[20px]'>
          <ArtsSectionMobile />
        </div>
      </div>
      <div className='w-full flex-col flex  items-center bg-[#060002] px-[20px]'>
        <OurStory />
      </div>
      <div className='w-full flex-col hidden sm:flex  items-center bg-[#E8E8E8] px-[20px]'>
        <GoingAivtion />
      </div>
      <div className='w-full flex-col flex sm:hidden   items-center bg-[#E8E8E8] px-[20px]'>
        <GoungAuctionMobile />
      </div>
      <div
        className='w-full flex-col flex  items-center bg-[#060002] px-[20px]'
        id='delivery'
      >
        <ContactUs />
      </div>
      <div
        className={`sm:hidden fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-40 ${
          setOverlay ? 'block' : 'hidden'
        } `}
      ></div>
      {showSignUp && (
        <div
          className={`sm:hidden mt-[40px]  h-full w-full flex justify-center items-start absolute top-0 left-1/2 transform -translate-x-1/2  z-50 duration-500`}
        >
          <SignUp />
        </div>
      )}
      {showLogIn && (
        <div
          className={`sm:hidden mt-[40px] h-full w-full flex justify-center items-start absolute top-0 left-1/2 transform -translate-x-1/2  z-50 duration-500`}
        >
          <LogIn />
        </div>
      )}

      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-[11] ${
          setOverlay ? 'block ' : 'hidden'
        }  `}
      ></div>
      <div
        className={`${
          showAuth ? 'fixed opacity-100' : 'hidden opacity-0'
        } top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 transition-opacity duration-500`}
      >
        <PlsAuth />
      </div>

      <div
        className={`${
          showAuth ? 'fixed sm:hidden opacity-100' : 'hidden opacity-0'
        } top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 transition-opacity duration-500`}
      >
        <PlsAuthMobile />
      </div>
    </>
  );
}
