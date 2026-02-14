'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getCookie } from 'cookies-next';
import useArtStore, { DataItem } from '@/app/commons/hooks/fetchStore';
import useAppBtn from '@/app/commons/hooks/setStore';

type EditButtonProps = {
  itemId: string;
  item: DataItem;
};

const EditButton: React.FC<EditButtonProps> = ({ itemId, item }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const setEditItem = useAppBtn((state) => state.setEditItem);

  const fetchUserArts = useArtStore((state) => state.fetchUserArts);

  const deleteArtWork = async (id: string) => {
    setIsLoading(true);

    const token = getCookie('auth_token');
    if (!token || typeof token !== 'string') {
      console.error('No auth token found');
      return;
    }

    const decoded = JSON.parse(atob(token.split('.')[1]));
    const userId = decoded.userId;

    try {
      const res = await fetch(`http://localhost:3005/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        console.log('Artwork deleted');
        await fetchUserArts(userId);
        setIsLoading(false);
      } else {
        console.error('Failed to delete artwork');
      }
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  };

  return (
    <div className='absolute  top-[9px] left-[9px] sm:top-[60px] sm:left-[16px]'>
      {isEditing ? (
        <button
          className='w-[50px] h-[30px] flex justify-center items-center'
          onClick={(e) => {
            e.preventDefault();
            deleteArtWork(itemId);
          }}
        >
          {isLoading ? (
            <div className='spinner !w-[22px] !h-[22px] !border-[2px] !border-t-[2px]'></div>
          ) : (
            <span className='font-Oswald text-[20px] text-[#D04175]'>
              delete
            </span>
          )}
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(true);
            setEditItem(item);
          }}
        >
          <Image src='/sharp-edit.svg' width={24} height={24} alt='edit' />
        </button>
      )}
    </div>
  );
};

export default EditButton;
