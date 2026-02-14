'use client';

import { useEffect, useState } from 'react';
import AddressCard from '../../__atoms/profile_atoms/AddressCard';
import AddressForm from '../../__atoms/profile_atoms/AddressForm';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

type Address = {
  fullName: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
  phone: string;
  adressName: string;
};

export default function Delivery() {
  const [addresArray, setAddressArray] = useState<Address[]>([]);
  const [Erorr, setErorr] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState<Address>({
    fullName: '',
    address: '',
    country: '',
    city: '',
    zipCode: '',
    phone: '',
    adressName: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('address');
      if (stored) {
        setAddressArray(JSON.parse(stored));
      }
    }
  }, []);

  const handleCange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = Object.values(formData).every(
      (val) => val.trim() !== ''
    );

    if (!isFormValid) {
      setErorr('გთხოვ შეავსო ყველა ველი!');
      return;
    }

    const updatedArray = [...addresArray];

    if (editingIndex !== null) {
      updatedArray[editingIndex] = formData;
    } else {
      updatedArray.push(formData);
    }

    setAddressArray(updatedArray);
    localStorage.setItem('address', JSON.stringify(updatedArray));

    setFormData({
      fullName: '',
      address: '',
      country: '',
      city: '',
      zipCode: '',
      phone: '',
      adressName: '',
    });

    setErorr('');
    setEditingIndex(null);
  };

  const deleteAddress = (index: number) => {
    const updatedArray = [...addresArray];
    updatedArray.splice(index, 1);
    setAddressArray(updatedArray);
    localStorage.setItem('address', JSON.stringify(updatedArray));

    if (editingIndex === index) {
      setFormData({
        fullName: '',
        address: '',
        country: '',
        city: '',
        zipCode: '',
        phone: '',
        adressName: '',
      });
      setEditingIndex(null);
    }
  };

  const { t } = useTranslation();

  return (
    <div className='max-w-[1280px] w-full m-auto px-4 pb-[30px] sm:px-0 flex justify-between flex-col sm:flex-row'>
      <div className='mt-[60px] max-w-[352px] w-full'>
        <AnimatePresence mode='wait'>
          <motion.h5
            key={i18next.language + 'header.signUp'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='text-[28px] font-normal font-Oswald text-[#DDDDDD]'
          >
            {t('profile.saveAddresses')}
          </motion.h5>
        </AnimatePresence>
        <div className='mt-[34px] w-full flex flex-col gap-[33px]'>
          {addresArray.map((item, index) => (
            <AddressCard
              key={`${item.adressName}+${index}`}
              item={item}
              index={index}
              editingIndex={editingIndex}
              onEdit={(i) => {
                setFormData(addresArray[i]);
                setEditingIndex(i);
              }}
              onDelete={deleteAddress}
            />
          ))}
        </div>
      </div>

      <AddressForm
        formData={formData}
        onChange={handleCange}
        onSubmit={handleSubmit}
        error={Erorr}
        editingIndex={editingIndex}
        addresArray={addresArray}
      />
    </div>
  );
}
