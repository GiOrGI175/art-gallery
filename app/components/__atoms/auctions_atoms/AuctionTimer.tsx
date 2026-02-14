'use client';

import React, { useEffect, useState } from 'react';
import { AuctionData } from './types';

interface AuctionTimerProps {
  auctionData: AuctionData;
  className?: string;
}

export const AuctionTimer: React.FC<AuctionTimerProps> = ({
  auctionData,
  className,
}) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const formatTimeLeft = (ms: number) => {
      if (ms <= 0) return '0s';
      const totalSeconds = Math.floor(ms / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const updateCountdown = () => {
      const now = Date.now();
      const auctionStart = new Date(auctionData.startDate).getTime();
      const auctionEnd = new Date(auctionData.endDate).getTime();

      if (now < auctionStart) {
        setTimeLeft(`Auction starts in: ${formatTimeLeft(auctionStart - now)}`);
      } else if (now < auctionEnd) {
        setTimeLeft(`Auction ends in: ${formatTimeLeft(auctionEnd - now)}`);
      } else {
        setTimeLeft('Auction ended');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [auctionData]);

  return (
    <h6
      className={`font-normal text-[23px] leading-[10px] text-[#DDDDDD] ${className}`}
    >
      {timeLeft}
    </h6>
  );
};
