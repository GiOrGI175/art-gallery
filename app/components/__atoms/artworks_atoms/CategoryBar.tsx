'use client';
import React from 'react';
import { categories } from '@/app/commons/services/artworksCategory';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

type CategoryBarProps = {
  hoveredIndex: number | null;
  onCategoryClick: (category: string, index: number) => void;
};

export const CategoryBar: React.FC<CategoryBarProps> = ({
  hoveredIndex,
  onCategoryClick,
}) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  return (
    <div className='w-full h-[42px] sm:h-[97px] mt-[10px] sm:mt-[45px] bg-[#CDCDCD] sm:bg-[#ffffff1a] flex justify-center items-center px-[20px]'>
      <ul className='max-w-[1280px] w-full flex md:gap-[90px] justify-between md:justify-start'>
        {categories.map((c, idx) => (
          <li key={c.id} onClick={() => onCategoryClick(c.setCategoty, idx)}>
            <AnimatePresence mode='wait'>
              <motion.span
                key={i18next.language + c.category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`font-Oswald font-light ${
                  lang === 'en' ? 'text-[18px]' : 'text-[12px]'
                } sm:text-[28px] md:text-[36px] leading-[26px] sm:leading-[53px] text-[#060002] sm:text-[#F0F0F0] ${
                  hoveredIndex === idx && '!text-[#D04175]'
                } hover:text-[#D04175] duration-500 cursor-pointer`}
              >
                {t(c.category)}
              </motion.span>
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </div>
  );
};
