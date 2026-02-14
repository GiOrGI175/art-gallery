"use client";
import { useState } from "react";
import Image from "next/image";

interface CardInfoProps {
  formData: {
    cardNumber: string;
    expirationDate: string;
    cvc: string;
    nameOnCard: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CardInfo({ formData, handleChange }: CardInfoProps) {
  const [touchedFields, setTouchedFields] = useState({
    cardNumber: false,
    expirationDate: false,
    cvc: false,
    nameOnCard: false,
  });

  const handleBlur = (field: string) => {
    setTouchedFields((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const validateCardNumber = (cardNumber: string): boolean => {
    const cardNumberPattern = /^\d{16}$/;
    return cardNumberPattern.test(cardNumber);
  };

  const validateExpirationDate = (expirationDate: string): boolean => {
    const expirationDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return expirationDatePattern.test(expirationDate);
  };

  const validateCVC = (cvc: string): boolean => {
    const cvcPattern = /^\d{3,4}$/;
    return cvcPattern.test(cvc);
  };

  return (
    <div className="mt-[50px] font-RedRose">
      <h2 className="text-[36px] font-normal text-[#DDDCDC]">Payment</h2>
      <h2 className="font-light text-[22px]  leading-6 text-[#6A6264]">
        All transactions are secure and encrypted
      </h2>
      <div className="mt-4 space-y-3">
        <div className="flex max-w-[650px] rounded items-center justify-between h-[80px] w-full border-[1px] border-[#E4E4E4] bg-[#2E2E2E80]">
          <div className="flex items-center  gap-1 p-2  ">
            <input
              type="checkbox"
              className=" checked:accent-[#D04175] accent-[#D04175]      border-[3px] rounded-sm checked:border-[#D04175] w-[18px] h-[18px] "
            />
            <h4 className="text-[#DDDCDC] text-[22px] leading-[27px]">
              Credit Card
            </h4>
          </div>
          <div className="flex gap-1 items-center mr-2">
            <Image src="/visa.svg" width={43} height={14} alt="visa" />
            <Image
              src="/logo_mastercard.svg"
              width={43}
              height={14}
              alt="mastercard"
            />
          </div>
        </div>

        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          className="w-full p-2 border h-[80px] border-[#E4E4E4] outline-none rounded bg-[#2E2E2E80] text-[#DDDCDC]"
          value={formData.cardNumber}
          onChange={handleChange}
          onBlur={() => handleBlur("cardNumber")}
        />
        {touchedFields.cardNumber &&
          !validateCardNumber(formData.cardNumber) && (
            <p className="text-red-500">Card Number Must be 16 </p>
          )}

        <div className="flex space-x-2 ">
          <input
            type="text"
            name="expirationDate"
            placeholder="Expiration Date (MM/YY)"
            className="w-1/2 p-2 border h-[80px] border-[#E4E4E4] outline-none rounded bg-[#2E2E2E80] text-[#DDDCDC]"
            value={formData.expirationDate}
            onChange={handleChange}
            onBlur={() => handleBlur("expirationDate")}
          />
          {touchedFields.expirationDate &&
            !validateExpirationDate(formData.expirationDate) && (
              <p className="text-red-500">Invalid expiration date</p>
            )}
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            className="w-1/2 p-2 border h-[80px] border-[#E4E4E4] outline-none rounded bg-[#2E2E2E80] text-[#DDDCDC]"
            value={formData.cvc}
            onChange={handleChange}
            onBlur={() => handleBlur("cvc")}
          />
          {touchedFields.cvc && !validateCVC(formData.cvc) && (
            <p className="text-red-500">Invalid CVC</p>
          )}
        </div>

        <input
          type="text"
          name="nameOnCard"
          placeholder="Name on Card"
          className="w-full p-2 border h-[80px] border-[#E4E4E4] outline-none rounded bg-[#2E2E2E80] text-[#DDDCDC]"
          value={formData.nameOnCard}
          onChange={handleChange}
          onBlur={() => handleBlur("nameOnCard")}
        />
        {touchedFields.nameOnCard && formData.nameOnCard.trim() === "" && (
          <p className="text-red-500">Name on card is required</p>
        )}
      </div>
    </div>
  );
}
