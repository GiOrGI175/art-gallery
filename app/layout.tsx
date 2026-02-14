'use client';

import './globals.css';
import Header from './components/__organisms/header_organisms/Header';
import Footer from './components/__organisms/footer_organisms/Footer';
import HeaderMobile from './components/__organisms/header_organisms/HeaderMobile';
import { useEffect, useState, Suspense } from 'react';
import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const token = getCookie('auth_token');

    if (!token && pathname === '/profile') {
      setIsAuthorized(false);
      router.push('/');
    } else {
      setIsAuthorized(true);
    }
  }, [pathname]);

  if (!isAuthorized && pathname === '/profile') {
    return null;
  }

  return (
    <html lang='en'>
      <body className='flex flex-col items-center'>
        <Header />
        <HeaderMobile />

        
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>

        <Footer />
      </body>
    </html>
  );
}
