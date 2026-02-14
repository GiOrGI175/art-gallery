'use client';

import useArtStore, {
  DataItem,
  GalleryData,
} from '@/app/commons/hooks/fetchStore';
import Consultation from '@/app/components/__molecules/artworks_molecules/Consultation';
import GalleryInfo from '@/app/components/__molecules/gallery_molecules/GalleryInfo';
import ArtsSection from '@/app/components/__organisms/artWorks_organisms/ArtsSection';
import ArtsSectionMobile from '@/app/components/__organisms/artWorks_organisms/ArtsSectionMobile';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const { t } = useTranslation();

  const params = useParams<{ gallery: string }>();
  const { gallery } = params;

  const fetchGallery = useArtStore((state) => state.fetchGallery);

  console.log(gallery, 'gallery');

  const token = useArtStore((state) => state.token);

  const [galleryInfo, setGalleryInfo] = useState<GalleryData>();
  const [galleryArtWorks, setGalleryArtWorks] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchGalleryData = async (id: string) => {
      try {
        const response = await fetch(`http://localhost:3005/galleries/${id}`);

        if (response.ok) {
          const data = await response.json();

          console.log(data, 'data');
          console.log(data.products, 'data products');

          setGalleryInfo(data);
          setGalleryArtWorks(data.products);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    if (gallery) {
      fetchGalleryData(gallery);
    }
  }, [gallery, token]);

  return (
    <div className='w-full flex-col flex items-center bg-[#060002]'>
      <div className='w-full flex justify-center bg-[#060002] px-[20px]'>
        <div className='max-w-[1440px] w-full flex justify-center'>
          <div className='max-w-[1440px] w-full flex justify-center'>
            {/* Check if galleryInfo is available, else show loading */}
            {!galleryInfo ? (
              <div className='max-w-[1280px] w-full h-[685px] flex justify-start'>
                <div className='w-full h-full flex justify-center items-center'>
                  <span className='font-Oswald text-start font-normal text-[100px] leading-[41px] text-[#D04175]'>
                    {t('common.loading')}
                  </span>
                </div>
              </div>
            ) : (
              <div className='max-w-[1280px] w-full flex justify-start'>
                <GalleryInfo galleryInfo={galleryInfo} />
              </div>
            )}
            <div className='relative w-[2px] h-full bg-[#D04175] right-[53px]' />
          </div>
        </div>
      </div>

      <div className='w-full flex justify-center  bg-[#AFABAC] px-[20px]'>
        <div className='max-w-[1280px] w-full  h-[50px] ss:h-[82px] flex items-center'>
          <AnimatePresence mode='wait'>
            <motion.h2
              key={i18next.language + 'header.signUp'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='hidden ss:flex font-Oswald font-medium text-[45px] leading-[66px] text-[#060002]'
            >
              {t('Galleries.galleryArts')}
            </motion.h2>
          </AnimatePresence>
          <AnimatePresence mode='wait'>
            <motion.h2
              key={i18next.language + 'header.signUp'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='flex ss:hidden font-Oswald font-medium text-[20px] leading-[30px] text-[#060002]'
            >
              {t('Galleries.galleryArtsM')}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>
      <div className=' w-full flex-col flex  items-center bg-[#060002] px-[20px]'>
        <div className='max-w-[1440px] w-full hidden sm:flex justify-center '>
          <ArtsSection fetchData={fetchGallery} allData={galleryArtWorks} />
        </div>
        <div className='max-w-[1440px] w-full sm:hidden flex justify-center pb-[20px]'>
          <ArtsSectionMobile />
        </div>
      </div>
      <div className=' w-full flex-col flex  items-center  bg-[#D5D5D5]'>
        <Consultation />
      </div>
    </div>
  );
}
