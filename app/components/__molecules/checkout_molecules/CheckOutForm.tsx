'use client';

import React, { useEffect, useState } from 'react';
import Fields from '../../../commons/services/Fields';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { Address } from '../../__atoms/profile_atoms/type';
import { useTranslation } from 'react-i18next';

interface FormData {
  FirstName: string;
  LastName: string;
  Email: string;
  Country: string;
  City: string;
  Address: string;
  Address2: string;
  Phone: string;
  PostCode: string;
}

interface CheckoutFormProps {
  selectedAddress: Address | null;
}

interface DecodedToken {
  userId: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ selectedAddress }) => {
  const [formData, setFormData] = useState<FormData>({
    FirstName: '',
    LastName: '',
    Email: '',
    Country: '',
    City: '',
    Address: '',
    Address2: '',
    Phone: '',
    PostCode: '',
  });

  useEffect(() => {
    if (selectedAddress) {
      const [firstName, lastName = ''] = selectedAddress.fullName.split(' ');
      setFormData((prev) => ({
        ...prev,
        FirstName: firstName,
        LastName: lastName,
        Country: selectedAddress.country,
        City: selectedAddress.city,
        Address: selectedAddress.address,
        Phone: selectedAddress.phone,
        PostCode: selectedAddress.zipCode,
        Address2: '',
        Email: '',
      }));
    }
  }, [selectedAddress]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sessionStorage.setItem('isCheckingOut', 'true');

    const token = getCookie('auth_token');
    if (typeof token === 'string') {
      const decodedToken: DecodedToken = jwtDecode(token);
      try {
        const res = await axios.post(
          `http://localhost:3005/paypal/create-order/${decodedToken.userId}`
        );

        const paypalUrl = res.data.links[1]?.href;
        if (paypalUrl) {
          sessionStorage.setItem('isReturningFromPaypal', 'true');
          window.location.href = paypalUrl;
        } else {
          console.error('PayPal URL not found in the response.');
        }
      } catch (error) {
        console.error('Error creating PayPal order:', error);
      }
    }
  };

  const { t } = useTranslation();

  return (
    <div className='font-RedRose'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-[28px] mt-[50px]'
      >
        <div className='grid grid-cols-2 gap-4'>
          {Fields.map((field) => {
            const isFullWidth = ['Email', 'Address', 'Address2'].includes(
              field.name
            );
            const isCountryOrCity = ['Country', 'City'].includes(field.name);

            return (
              <div
                key={field.name}
                className={`border-[1px] border-[#E4E4E4] h-[80px] rounded-lg flex flex-col pl-1 pt-[10px] ${
                  isFullWidth ? 'col-span-2' : isCountryOrCity ? 'w-full' : ''
                }`}
              >
                {field.type === 'select' ? (
                  <>
                    <h5 className='text-[18px] font-light text-[#6A6264]'>
                      {t(field.label)}
                    </h5>
                    <select
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleChange}
                      className='bg-black text-[28px] text-[#DDDCDC] font-normal leading-9 outline-none border-none'
                    >
                      {field.options?.map((option: string) => (
                        <option key={option} value={option}>
                          {t(option)}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <h5 className='text-[18px] font-light text-[#6A6264]'>
                      {t(field.label)}
                    </h5>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleChange}
                      required={field.required}
                      pattern={field.pattern}
                      placeholder={
                        field.name === 'Address2' ? t(field.label) : ''
                      }
                      className='bg-black text-[28px] text-[#DDDCDC] font-normal leading-[35px] outline-none border-none'
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className='flex gap-2 items-center'>
          <input
            type='checkbox'
            className='checked:accent-[#D04175] accent-[#D04175] border-[3px] rounded-sm checked:border-[#D04175] w-[18px] h-[18px]'
          />
          <p className='text-[22px] font-light text-[#6A6264]'>
            {t('Cart.shipping')}
          </p>
        </div>

        <p className='text-[22px] font-light text-[#6A6264]'>
          {t('Cart.policy')}
        </p>

        <button
          type='submit'
          className='mt-6 w-full bg-[#D04175] text-white p-2 rounded transition font-RedRose'
        >
          {t('Cart.pay')}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
