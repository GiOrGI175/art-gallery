'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getCookie } from 'cookies-next';
import { useTranslation } from 'react-i18next';

import useArtStore, { DataItem } from '@/app/commons/hooks/fetchStore';
import { ArtworksHeader } from '@/app/components/__molecules/artworks_molecules/ArtworksHeader';
import Consultation from '@/app/components/__molecules/artworks_molecules/Consultation';
import ArtsSection from '@/app/components/__organisms/artWorks_organisms/ArtsSection';
import ArtsLoading from '@/app/components/__atoms/artworks_atoms/ArtsLoading';

const ArtsSectionMobile = dynamic(
  () =>
    import('@/app/components/__organisms/artWorks_organisms/ArtsSectionMobile'),
  {
    ssr: false,
    loading: () => <ArtsLoading />,
  }
);

export default function Artworks() {
  const { t } = useTranslation();

  const fetchData = useArtStore((s) => s.fetchData);
  const allData = useArtStore((s) => s.allData);
  const setToken = useArtStore((s) => s.setToken);

  const [filteredArtworks, setFilteredArtworks] = useState<DataItem[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const readToken = async () => {
      const token = await getCookie('auth_token');
      setToken(token || undefined);
    };
    readToken();
  }, [setToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (allData) {
      setFilteredArtworks(allData);
      setLoading(false);
    }
  }, [allData]);

  if (loading) {
    return (
      <div className='w-full h-[80dvh] flex justify-center items-center bg-[#D9D9D9] sm:bg-[#060002]'>
        <span className='sm:mt-[200px] font-Oswald text-[41px] sm:text-[100px] text-[#D04175]'>
          {t('common.loading')}
        </span>
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col items-center bg-[#060002] sm:z-10'>
      <div className='w-full flex flex-col items-center bg-[#D9D9D9] sm:bg-[#060002]'>
        <ArtworksHeader
          allData={allData}
          setFilteredArtworks={setFilteredArtworks}
        />
      </div>

      <div className='w-full flex flex-col items-center bg-[#D9D9D9] sm:bg-[#060002]'>
        <div className='max-w-[1440px] w-full hidden sm:flex justify-center px-[20px]'>
          <ArtsSection fetchData={fetchData} allData={filteredArtworks} />
        </div>

        <div className='max-w-[1440px] w-full sm:hidden flex justify-center pb-[25px] px-[20px]'>
          <ArtsSectionMobile />
        </div>
      </div>

      <div className='w-full flex flex-col items-center bg-[#D5D5D5]'>
        <Consultation />
      </div>
    </div>
  );
}
