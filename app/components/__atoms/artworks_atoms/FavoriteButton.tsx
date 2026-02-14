'use client';
import Image from 'next/image';
import React from 'react';

type FavoriteButtonProps = {
  isFavorited: boolean;
  isLoading: boolean;
  onClick: () => void;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorited,
  isLoading,
  onClick,
}) => {
  return (
    <button
      className='absolute top-[9px] right-[9px]'
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
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

export default FavoriteButton;
