'use client';
import React from 'react';
import Image from 'next/image';

type FavoriteButtonProps = {
  isFavorited: boolean;
  isLoading: boolean;
  onClick: () => void;
};

const FavoriteButtonDesk: React.FC<FavoriteButtonProps> = ({
  isFavorited,
  isLoading,
  onClick,
}) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className='absolute top-[60px] right-[16px]'
    >
      {isLoading ? (
        <div className='spinner !w-[22px] !h-[22px] !border-[2px] !border-t-[2px]'></div>
      ) : (
        <Image
          src={isFavorited ? '/full_heart.svg' : '/heart.svg'}
          width={24}
          height={24}
          alt='Favorite'
        />
      )}
    </button>
  );
};

export default FavoriteButtonDesk;
