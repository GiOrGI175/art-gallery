// Page.tsx (complete main component)
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from '@/app/components/__atoms/auctions_atoms/ImageGallery';
import { ProductInfo } from '@/app/components/__atoms/auctions_atoms/ProductInfo';
import { ProductDetails } from '@/app/components/__atoms/auctions_atoms/ProductDetails';
import { BiddingSection } from '@/app/components/__atoms/auctions_atoms/BiddingSection';
import { AuctionTimer } from '@/app/components/__atoms/auctions_atoms/AuctionTimer';
import { useAuctionData } from '@/app/components/__atoms/auctions_atoms/useAuctionData';
import { ProductInfoMovile } from '@/app/components/__atoms/auctions_atoms/ProductInfoMovile';
import useAppBtn from '@/app/commons/hooks/setStore';
import PlsAuth from '@/app/components/__atoms/header_atoms/PlsAuth';

export default function Page() {
  const showAuth = useAppBtn((state) => state.showAuth);
  const setOverlay = useAppBtn((state) => state.setOverlay);

  const params = useParams();
  const id = params?.id;

  const auctionId = Array.isArray(id) ? id[0] : id;
  const { auctionData, loading, error, updateLatestBid } = useAuctionData(
    auctionId || ''
  );

  if (!id) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='text-red-500 text-xl'>Invalid auction ID</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='text-white text-xl'>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='text-red-500 text-xl'>Error: {error}</div>
      </div>
    );
  }

  if (!auctionData?.product) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='text-white text-xl'>Data not found</div>
      </div>
    );
  }

  const now = new Date();
  const start = new Date(auctionData.startDate);
  const end = new Date(auctionData.endDate);
  const isAuctionActive = now >= start && now <= end;

  return (
    <div className='w-full flex flex-col justify-between'>
      <div className='bg-black w-full flex flex-col px-5 justify-between'>
        <div className='max-w-[1280px] sm:h-[888px] w-full m-auto text-white sm:flex sm:justify-between mt-[77px] font-Oswald'>
          <div className='max-w-[844px] w-full h-full mr-3'>
            <ProductInfoMovile product={auctionData.product} />
            <ImageGallery product={auctionData.product} />
          </div>

          <div
            className={`flex flex-col ${
              isAuctionActive ? 'justify-between' : ''
            }  max-w-[844px] sm:max-w-[310px] w-full`}
          >
            <ProductInfo product={auctionData.product} />

            <div className='sm:flex flex sm:flex-col justify-between w-full'>
              <ProductDetails product={auctionData.product} />
            </div>

            <div className='hidden sm:flex flex-col'>
              <div className='flex flex-col gap-[20px] mt-4'>
                <h6 className='w-[80px] font-RedRose text-[16px] leading-5 text-[#DDDDDD] border-b-[1px]'>
                  Width: {auctionData.product.width}
                </h6>
                <h6 className='w-[80px] font-RedRose text-[16px] leading-5 text-[#DDDDDD] border-b-[1px]'>
                  Height: {auctionData.product.height}
                </h6>
                <AuctionTimer auctionData={auctionData} />
              </div>
            </div>

            {isAuctionActive && (
              <BiddingSection
                auctionData={auctionData}
                onBidPlaced={updateLatestBid}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Section */}
      <div className='bg-[#E8E8E8] font-Oswald w-full px-5 sm:mb-[0px] mb-[70px]'>
        <div className='flex sm:hidden justify-between mt-[20px] w-full'>
          <div className='flex flex-col gap-[14px] w-full'>
            {/* Mobile Timer */}
            <AuctionTimer
              auctionData={auctionData}
              className='font-normal text-[23px] leading-[10px] text-[#060002]'
            />

            {/* Mobile Bidding Section */}
            <BiddingSection
              auctionData={auctionData}
              onBidPlaced={updateLatestBid}
              isMobile={true}
            />
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />

      {showAuth && (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 transition-opacity duration-500'>
          <PlsAuth />
        </div>
      )}

      {setOverlay && (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-20'></div>
      )}
    </div>
  );
}
