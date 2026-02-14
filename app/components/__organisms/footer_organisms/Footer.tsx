'use client';

import { FooterLinks } from '@/app/commons/services/footerLinks';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Newsletter from '../../__molecules/footer_molecules/Newsletter';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

const Footer = () => {
  const pathname = usePathname();

  function scrollToHash(hash: string) {
    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleNavigation = (hash: string) => {
    if (pathname === '/home') {
      scrollToHash(hash);
    }
  };

  const PathName = usePathname();

  const homePageFooter = PathName === '/' || PathName.startsWith('/home');

  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <footer
      className={`relative pt-[57px] sm:pt-[85px] pb-[12px] sm:pb-[52px] w-full flex-col flex  items-center  px-[20px] sm:z-10 ${
        homePageFooter ? 'bg-[#B3B3B3] ' : 'bg-[#060002]'
      }`}
    >
      <div className='max-w-[1280px] w-full flex justify-between gap-[55px] sm:gap-[0px] '>
        <div className='block sm:hidden absolute max-w-[768px] w-full h-[50px] top-[-30px] ss:top-[-50px] left-[0px]'>
          <Image
            src='/ExperienceArt.webp'
            width={768}
            height={51}
            alt='Experience'
            className='object-cover'
          />
        </div>
        <div className='relative  max-w-[47px] sm:max-w-[140px] w-full h-[27px] sm:h-[87px]'>
          <Link href='/home'>
            <Image
              src={`${homePageFooter ? '/Logo_black.svg' : '/Logo.svg'}`}
              width={90}
              height={56}
              alt='logo'
              className='sm:mt-[16px] sm:ml-[10px] '
            />
          </Link>
          <div className='absolute bottom-[50%] w-[47px] sm:w-[90px] h-[1px] bg-[#D04175]' />
        </div>
        <div className='max-w-[500px] w-full flex justify-between '>
          <ul className='max-w-[90px] sm:max-w-[103px] w-full'>
            {FooterLinks[0].map((item) => (
              <Link href={item.link} key={item.id}>
                <li className='mb-[10px] sm:mb-[20px]'>
                  <AnimatePresence mode='wait'>
                    <motion.span
                      key={i18next.language + item.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`font-Oswald  font-light ${
                        lang === 'en' ? 'text-[12px]' : 'text-[10px]'
                      }  sm:text-[14px] leading-[17px] sm:leading-[21px] ${
                        homePageFooter ? ' text-[#060002]' : 'text-[#B3B3B3]'
                      } `}
                    >
                      {t(item.title)}
                    </motion.span>
                  </AnimatePresence>
                </li>
              </Link>
            ))}
          </ul>
          <ul className='max-w-[90px] sm:max-w-[103px] w-full'>
            {FooterLinks[1].map((item) => (
              <li
                key={item.id}
                className='mb-[10px] sm:mb-[20px] cursor-pointer'
                onClick={() => handleNavigation(item.link)}
              >
                <AnimatePresence mode='wait'>
                  <motion.span
                    key={i18next.language + item.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`font-Oswald  font-light ${
                      lang === 'en' ? 'text-[12px]' : 'text-[10px]'
                    }  sm:text-[14px] leading-[17px] sm:leading-[21px]  ${
                      homePageFooter ? ' text-[#060002]' : 'text-[#B3B3B3]'
                    } `}
                  >
                    {t(item.title)}
                  </motion.span>
                </AnimatePresence>
              </li>
            ))}
          </ul>
          <ul className='max-w-[90px] sm:max-w-[103px] w-full'>
            {FooterLinks[2].map((item) => (
              <li key={item.id} className='mb-[10px] sm:mb-[20px]'>
                <Link href={item.link}>
                  <AnimatePresence mode='wait'>
                    <motion.span
                      key={i18next.language + item.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`font-Oswald  font-light ${
                        lang === 'en' ? 'text-[12px]' : 'text-[10px]'
                      }  sm:text-[14px] leading-[17px] sm:leading-[21px] ${
                        homePageFooter ? ' text-[#060002]' : 'text-[#B3B3B3]'
                      } `}
                    >
                      {t(item.title)}
                    </motion.span>
                  </AnimatePresence>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='hidden sm:block '>
          <Newsletter homePageFooter={homePageFooter} />
        </div>
      </div>
      <div className='w-full flex flex-col sm:flex-row justify-center items-center'>
        <div className='w-full block sm:hidden '>
          <Newsletter homePageFooter={homePageFooter} />
        </div>
        <AnimatePresence mode='wait'>
          <motion.p
            key={i18next.language + 'header.signUp'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`font-Oswald  font-light pt-[30px] sm:pt-[0px] text-[12px] leading-[14px] ${
              homePageFooter ? ' text-[#060002]' : 'text-[#B3B3B3]'
            }`}
          >
            {t('Footer.reserved')}
          </motion.p>
        </AnimatePresence>
      </div>
    </footer>
  );
};

export default Footer;
