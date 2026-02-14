'use client';

import { useState } from 'react';
import { useFavorites } from '../../__atoms/profile_atoms/UseFavorites';
import FavoritesGrid from '../../__atoms/profile_atoms/FavoriteGrid';

export default function Favorites() {
  const [loadedItems, setLoadedItems] = useState(2);
  const { favoritesData, favoritesLoading, favoriteIds, toggleFavorite } =
    useFavorites();

  const loadMoreItems = () => {
    setLoadedItems((prev) => prev + 6);
  };

  return (
    <section className='max-w-[1280px] w-full flex flex-col justify-center items-center mx-auto px-4'>
      {favoritesLoading ? (
        <div className='w-full h-full flex justify-center '>
          <span className='mt-[200px] font-Oswald text-[100px] text-[#D04175]'>
            Loading...
          </span>
        </div>
      ) : favoritesData.length === 0 ? (
        <div className='w-full h-full flex justify-center '>
          <span className='mt-[200px] font-Oswald text-[100px] text-[#D04175]'>
            You don’t have favorites
          </span>
        </div>
      ) : (
        <>
          <FavoritesGrid
            data={favoritesData}
            favoriteIds={favoriteIds}
            onToggle={toggleFavorite}
            loadedItems={loadedItems}
          />
          <div className='w-full pt-[73px] pb-[95px] flex justify-end'>
            <button
              onClick={loadMoreItems}
              className='border-b-[1px] border-[#D04175]'
            >
              <span className='font-RedRose text-[20px] text-[#FFFFFF80]'>
                Show All
              </span>
            </button>
          </div>
        </>
      )}
    </section>
  );
}
