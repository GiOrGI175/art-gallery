import Image from 'next/image';
import Link from 'next/link';
import { DataItem } from '@/app/commons/hooks/fetchStore';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import i18next from '@/app/i18n/i18next';

interface Props {
  item: DataItem;
  isFavorited: boolean;
  onToggle: () => void;
  height: number;
  imgHeight: number;
}

export default function FavoriteCard({
  item,
  isFavorited,
  onToggle,
  height,
  imgHeight,
}: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <Link href={`/artworks/${item._id}`}>
      <div
        style={{ height }}
        className='relative max-w-[416px] w-full pt-[40px]'
      >
        <Image
          src={item.mainImgUrl}
          width={416}
          height={imgHeight}
          alt='art'
          loading='lazy'
          className='object-cover hover:opacity-[70%] transition-opacity duration-1000'
          style={{ height: imgHeight }}
        />
        <button
          className='absolute top-[60px] right-[16px]'
          onClick={(e) => {
            e.preventDefault();
            onToggle();
          }}
        >
          <Image
            src={isFavorited ? '/full_heart.svg' : '/heart.svg'}
            width={24}
            height={24}
            alt='Favorite'
          />
        </button>
        <div className='flex justify-between items-center w-full'>
          <div>
            <AnimatePresence mode='wait'>
              <motion.h3
                key={i18next.language + 'header.signUp'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='font-Oswald text-[28px] text-[#D04175]'
              >
                {lang === 'en'
                  ? item.title.toUpperCase()
                  : item.titleGEO.toUpperCase()}
              </motion.h3>
            </AnimatePresence>
            <AnimatePresence mode='wait'>
              <motion.p
                key={i18next.language + 'header.signUp'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='font-RedRose text-[22px] text-[#DDDDDD] opacity-40'
              >
                {lang === 'en'
                  ? item.user.fullName.toUpperCase()
                  : item.user.fullNameGEO.toUpperCase()}
              </motion.p>
            </AnimatePresence>
          </div>
          <div>
            <span className='font-Oswald text-[28px] text-[#DDDDDD]'>
              ${item.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
