'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import useArtStore, { DataItem } from '@/app/commons/hooks/fetchStore';
import useAppBtn from '@/app/commons/hooks/setStore';

import PlsAuth from '../../__atoms/header_atoms/PlsAuth';
import ArtworkCardDesktop from '../../__atoms/artworks_atoms/ArtworkCardDesktop';
import LoadMoreButton from '../../__atoms/artworks_atoms/LoadMoreButton';
import Status from '../../__molecules/artworks_molecules/Status';
import { useTranslation } from 'react-i18next';

type ArtsSectionProps = {
  fetchData: () => Promise<void>;
  allData: DataItem[] | null;
};

const ArtsSection: React.FC<ArtsSectionProps> = ({ fetchData, allData }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const pathname = usePathname();
  const isArtworksPage = pathname === '/artworks';

  const token = useArtStore((state) => state.token);
  const notFound = useArtStore((state) => state.notFound);
  const Artworksloading = useArtStore((state) => state.Artworksloading);
  const setArtworksloading = useArtStore((state) => state.setArtworksloading);

  const setOverlay = useAppBtn((state) => state.setOverlay);
  const toggleOverlay = useAppBtn((state) => state.toggleOverlay);
  const showAuth = useAppBtn((state) => state.showAuth);
  const toggleAuth = useAppBtn((state) => state.toggleAuth);

  const [favorite, setFavorite] = useState<string[]>([]);
  const [heartLoader, setHeartLoader] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [loadedItems, setLoadedItems] = useState(3);
  const [isLoaded, setIsLoaded] = useState(true);

  const handleImageLoad = () => setIsLoaded(false);

  useEffect(() => {
    if (token) fetchFavorites();
  }, [token]);

  useEffect(() => {
    fetchData();
    setArtworksloading(false);
  }, [fetchData, token]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        'http://localhost:3005/products/getFavorites',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setFavorite(data);
    } catch (error) {
      console.error(error);
    }
  };

  const postFavorite = async (id: string | null) => {
    try {
      const response = await fetch(
        `http://localhost:3005/products/favorites/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const updatedFavorites = await response.json();
        setFavorite(updatedFavorites);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const toggleFavorite = async (id: string) => {
    if (!token) {
      toggleOverlay(true);
      toggleAuth();
      return;
    }
    setHeartLoader((prev) => ({ ...prev, [id]: true }));
    await postFavorite(id);
    setHeartLoader((prev) => ({ ...prev, [id]: false }));
  };

  const loadMoreItems = () => {
    fetchData();
    setLoadedItems((prev) => prev + 3);
  };

  const columns: DataItem[][] = [[], [], []];
  allData?.slice(0, loadedItems * 3).forEach((item, index) => {
    columns[index % 3].push(item);
  });

  const heights = [
    [632, 740, 892],
    [892, 632, 740],
    [740, 892, 632],
  ];
  const imgHeights = [
    [460, 568, 720],
    [720, 460, 568],
    [568, 720, 460],
  ];

  return (
    <section className='max-w-[1280px] w-full flex-col flex'>
      <div className='w-full flex justify-center gap-[16px]'>
        {columns.map((column, colIndex) => (
          <div className='w-full' key={colIndex}>
            {column.map((item, index) => (
              <ArtworkCardDesktop
                key={item._id}
                item={item}
                colIndex={colIndex}
                index={index}
                isFavorited={favorite.includes(item._id)}
                isLoading={heartLoader[item._id]}
                onToggleFavorite={toggleFavorite}
                onImageLoad={handleImageLoad}
                isLoaded={isLoaded}
                heights={heights}
                imgHeights={imgHeights}
              />
            ))}
          </div>
        ))}
      </div>

      {Artworksloading ? (
        <Status text={lang === 'en' ? 'Loading...' : 'იტვირთება...'} />
      ) : notFound && isArtworksPage ? (
        <Status
          text={lang === 'en' ? 'No More Artworks' : 'ნამუშევრები აღარ არის'}
        />
      ) : allData?.length === 0 ? (
        <Status
          text={
            lang === 'en' ? 'Artworks Not Found' : 'ნამუშევრები არ მოიძებნა'
          }
        />
      ) : null}

      <LoadMoreButton onClick={loadMoreItems} />

      {showAuth && (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 transition-opacity duration-500'>
          <PlsAuth />
        </div>
      )}

      {setOverlay && (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-20'></div>
      )}
    </section>
  );
};

export default ArtsSection;
