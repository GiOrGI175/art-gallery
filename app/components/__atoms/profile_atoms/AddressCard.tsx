'use client';
import Image from 'next/image';
import React from 'react';
import type { Address } from './type';

interface Props {
  item: Address;
  index: number;
  editingIndex: number | null;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function AddressCard({
  item,
  index,
  editingIndex,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className='max-w-[352px] w-full flex flex-col'>
      <div className='mb-[8px] w-full flex'>
        <div className='flex w-full'>
          <Image
            src={
              item.adressName.startsWith('Home')
                ? '/work_address.svg'
                : '/home_address.svg'
            }
            width={24}
            height={24}
            alt='address icon'
            className='mr-[10px]'
          />
          <h6 className='font-Oswald text-start font-normal text-[22px] text-[#E4E4E4] opacity-90'>
            {item.adressName}
          </h6>
        </div>

        {editingIndex === index ? (
          <button onClick={() => onDelete(index)}>
            <span className='font-Oswald text-[20px] text-[#D04175]'>
              delete
            </span>
          </button>
        ) : (
          <button onClick={() => onEdit(index)}>
            <Image src='/sharp-edit.svg' width={24} height={24} alt='edit' />
          </button>
        )}
      </div>
      <div className='flex flex-col gap-[8px] text-[#DDDDDD] opacity-70 font-RedRose text-[18px]'>
        <p>{item.fullName}</p>
        <p>{item.address}</p>
        <p>{item.phone}</p>
        <p>
          {item.zipCode} {item.city}
        </p>
        <p>{item.country}</p>
      </div>
    </div>
  );
}
