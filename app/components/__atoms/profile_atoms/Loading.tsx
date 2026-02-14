'use client';

import React from 'react';

interface LoadingProps {
  t: (key: string) => string;
}

export const Loading: React.FC<LoadingProps> = ({ t }) => {
  return (
    <p className='text-white text-xl text-center my-10'>
      {t('common.loading')}
    </p>
  );
};
