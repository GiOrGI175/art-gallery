import React from 'react';
import CardAndCheckOut from '../../__molecules/checkout_molecules/CardAndCheckOut';
import Product from '../../__molecules/checkout_molecules/Product';

export default function checkout() {
  return (
    <div className='bg-black max-w-[1280px] w-full grid grid-cols-1 sm:grid-cols-2 sm:grid-col-end order-1 sm:order-1 pb-[70px]'>
      <div className='order-2 sm:order-1 max-w-[632px] m-auto w-full'>
        <CardAndCheckOut />
      </div>
      <div className='order-1 sm:order-2'>
        <Product />
      </div>
    </div>
  );
}
