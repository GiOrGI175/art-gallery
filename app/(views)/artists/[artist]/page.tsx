'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import useArtStore, { DataItem } from '@/app/commons/hooks/fetchStore';
import useArtistStore from '@/app/commons/hooks/useIdStore';

import ArtistInfo from '@/app/components/__molecules/artists_molecules/ArtistInfo';
import Consultation from '@/app/components/__molecules/artworks_molecules/Consultation';
import ArtsSection from '@/app/components/__organisms/artWorks_organisms/ArtsSection';
import ArtsSectionMobile from '@/app/components/__organisms/artWorks_organisms/ArtsSectionMobile';
import { useTranslation } from 'react-i18next';

export type Artist = {
  _id: string;
  fullName: string;
};

type UserInfo = {
  _id: string;
  fullName: string;
  fullNameGEO: string;
  profileUrl?: string;
  userBio?: string;
  products: DataItem[] | string;
};

export default function Page() {
  const { artist } = useParams<{ artist: string }>();
  const allNames = useArtistStore((state) => state.allNames);
  const [findUser, setFindUser] = useState<Artist>();

  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [artistData, setArtistData] = useState<DataItem[] | null>(null);

  const fetchArtistData = useArtStore((state) => state.fetchArtistData);
  const setUser = useArtStore((state) => state.setUser);

  const name = decodeURIComponent(artist.replace(/%20/g, ' '));

  useEffect(() => {
    const match = allNames.find((user) => user.fullName === name);
    setFindUser(match);
  }, [allNames, name]);

  useEffect(() => {
    if (findUser?._id) {
      setUser(findUser._id);
    }
  }, [findUser, setUser]);

  useEffect(() => {
    if (!findUser) return;

    const fetchArtist = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/users/${findUser._id}`
        );
        if (!response.ok) throw new Error('Failed to fetch artist info');

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserArts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/users/artist/${findUser._id}`
        );
        if (!response.ok) throw new Error('Failed to fetch artist artworks');

        const data = await response.json();
        setArtistData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching artworks:', error);
        setArtistData(null);
      }
    };

    fetchArtist();
    fetchUserArts();
  }, [findUser]);

  const { t } = useTranslation();

  return (
    <div className='w-full flex flex-col items-center bg-[#060002]'>
      <div className='w-full flex justify-center bg-[#D9D9D9] px-[20px]'>
        <div className='max-w-[1440px] w-full flex justify-center'>
          {!findUser || !userInfo ? (
            <div className='max-w-[1280px] w-full h-[685px] flex justify-center items-center'>
              <span className='font-Oswald text-[100px] text-[#D04175]'>
                {t('common.loading')}
              </span>
            </div>
          ) : (
            <div className='max-w-[1280px] w-full flex justify-start'>
              <ArtistInfo userInfo={userInfo} />
            </div>
          )}
          <div className='relative w-[2px] h-full bg-[#D04175] right-[53px]' />
        </div>
      </div>

      <div className='w-full flex flex-col items-center bg-[#060002] px-[20px]'>
        <div className='max-w-[1440px] w-full hidden sm:flex justify-center'>
          <ArtsSection fetchData={fetchArtistData} allData={artistData} />
        </div>
        <div className='max-w-[1440px] w-full sm:hidden flex justify-center pb-[20px]'>
          <ArtsSectionMobile findUser={findUser?._id} />
        </div>
      </div>

      <div className='w-full flex flex-col items-center bg-[#D5D5D5]'>
        <Consultation />
      </div>
    </div>
  );
}
