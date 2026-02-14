'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { AuctionData } from './types';
import useAppBtn from '@/app/commons/hooks/setStore';
import useArtStore from '@/app/commons/hooks/fetchStore';

interface BiddingSectionProps {
  auctionData: AuctionData;
  onBidPlaced: (newBidAmount: number) => void;
  isMobile?: boolean;
}

export const BiddingSection: React.FC<BiddingSectionProps> = ({
  auctionData,
  onBidPlaced,
  isMobile = false,
}) => {
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleOverlay = useAppBtn((state) => state.toggleOverlay);
  const toggleAuth = useAppBtn((state) => state.toggleAuth);
  const token = useArtStore((state) => state.token);

  const handleBidSubmit = async () => {
    if (!token) {
      toggleOverlay(true);
      toggleAuth();
      return;
    }

    const numericBidAmount = parseFloat(bidAmount);
    if (!bidAmount || isNaN(numericBidAmount) || numericBidAmount <= 0) {
      toast.error('Please enter a valid bid amount.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3005/auction-bidding/${auctionData._id}/place-bid`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              document.cookie.split('auth_token=')[1]?.split(';')[0]
            }`,
          },
          body: JSON.stringify({ amount: numericBidAmount }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place bid');
      }

      toast.success('Bid placed successfully!');
      onBidPlaced(numericBidAmount);
      setBidAmount('');
    } catch (error) {
      toast.error(
        `Error placing bid: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const textSize = isMobile ? 'text-[22px]' : 'text-[28px]';
  const textColor = isMobile ? 'text-[#060002]' : 'text-[#DDDDDD]';
  const inputHeight = isMobile ? 'h-[35px]' : '';

  return (
    <div className={`${isMobile ? 'sm:hidden' : 'hidden sm:flex'} flex-col`}>
      <div className='flex flex-col gap-[14px] mt-[50px]'>
        <h5
          className={`font-normal ${textSize} leading-[10px] ${textColor} mt-3`}
        >
          Starting Price: {auctionData.startingPrice} $
        </h5>
        <h5
          className={`font-normal ${textSize} leading-[10px] ${textColor} mt-[14px]`}
        >
          Latest Bid: {auctionData.latestBidAmount} $
        </h5>

        <div className='mt-4'>
          <label
            htmlFor='bidInput'
            className={`font-normal ${textSize} leading-10 ${textColor}`}
          >
            Your Bid Amount:
          </label>
          <input
            type='number'
            id='bidInput'
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className={`mt-2 p-2 ${
              isMobile ? 'ml-2' : ''
            } border text-black ${textSize} ${inputHeight} border-gray-300 rounded`}
            placeholder='Enter your bid'
            disabled={loading}
          />
        </div>

        {!isMobile && (
          <h6 className='font-normal text-[28px] leading-[10px] text-[#DDDDDD] mt-[76px] mb-[25px]'>
            Bid: {bidAmount} $
          </h6>
        )}
      </div>

      <button
        className={`bg-[#D04175] h-14 rounded-[4px] text-[#060002] font-normal text-[18px] ${
          isMobile ? 'w-full' : 'mt-1'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleBidSubmit}
        disabled={loading}
      >
        {loading ? 'Placing Bid...' : 'Place A Bid'}
      </button>
    </div>
  );
};
