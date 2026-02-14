'use client';

import useArtStore, { DataItem } from '@/app/commons/hooks/fetchStore';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import EditButton from '../../__atoms/artworks_atoms/EditButton';

type MyArtworksMobileProps = {
  allData: DataItem[] | null;
};

const MyArtworksMobile: React.FC<MyArtworksMobileProps> = ({ allData }) => {
  const PathName = usePathname();
  const changeColor = ['/artworks', '/home', '/'].includes(PathName);

  const [data, setData] = useState<DataItem[] | null>(null);
  const [favorite, setFavorite] = useState<string[]>([]);

  useEffect(() => {
    setData(allData);
  }, [allData]);

  const [isLoaded, setIsLoaded] = useState(true);

  const handleImageLoad = () => {
    setIsLoaded(false);
  };

  const [heartLoader, setHeartLoader] = useState<{ [key: string]: boolean }>(
    {}
  );

  const token = useArtStore((state) => state.token);

  const fetchexistFavorites = async () => {
    try {
      const response = await fetch(
        'http://localhost:3005/products/getFavorites',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setFavorite(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchexistFavorites();
    }
  }, [token]);

  const PostFavorites = async (id: string | null) => {
    try {
      const response = await fetch(
        `http://localhost:3005/products/favorites/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedFavorites = await response.json();

        setFavorite(updatedFavorites);
      } else {
        console.error('Failed to toggle favorite');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const toggleFavorite = async (id: string) => {
    if (token !== undefined) {
      setHeartLoader((prev) => ({ ...prev, [id]: true }));

      await PostFavorites(id);

      setHeartLoader((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <section className='max-w-[1280px] w-full flex-col flex'>
      {!data ? (
        <div className='w-full h-[80dvh] flex justify-center items-center'>
          <span className='font-Oswald text-start font-normal text-[40px] leading-[41px] text-[#D04175]'>
            Loading...
          </span>
        </div>
      ) : data?.length === 0 ? (
        <div className='w-full h-[80dvh] flex justify-center items-center'>
          <span className='font-Oswald text-start font-normal text-[40px] leading-[41px] text-[#D04175]'>
            Artworks Not Found
          </span>
        </div>
      ) : (
        <div className='w-full grid grid-cols-2 gap-[16px] pt-[18px]'>
          {data?.map((item, index) => (
            <Link href={`/artworks/${item._id}`} key={index}>
              <div key={index} className='relative w-auto h-[287px]'>
                <div className='max-w-[416px] w-full !max-h-[230px] h-full'>
                  {isLoaded && (
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                      <div className='spinner'></div>
                    </div>
                  )}

                  <Image
                    src={item.mainImgUrl}
                    width={416}
                    height={400}
                    alt='Img'
                    className={`w-[416px] hover:opacity-[80%] !h-full object-cover transition-opacity duration-1000 ${
                      isLoaded ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoad={handleImageLoad}
                  />
                </div>
                <EditButton itemId={item._id} item={item} />

                <button
                  className='absolute top-[9px] right-[9px]'
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(item._id);
                  }}
                >
                  {heartLoader[item._id] ? (
                    <div className='spinner !w-[22px] !h-[22px] !border-[2px] !border-t-[2px]'></div>
                  ) : (
                    <Image
                      src={
                        favorite.includes(item._id)
                          ? '/full_heart.svg'
                          : '/heart.svg'
                      }
                      width={24}
                      height={24}
                      alt='Favorite'
                    />
                  )}
                </button>
                <div className='flex justify-between items-center'>
                  <div>
                    <h3 className='font-Oswald font-normal text-[16px] leading-[23px] text-[#D04175]'>
                      {item.user.fullName.toUpperCase()}
                    </h3>
                    <p
                      className={`font-RedRose text-start font-light text-[13px] leading-[17px] opacity-40 ${
                        changeColor ? 'text-[#060002]' : 'text-[#DDDDDD]'
                      }`}
                    >
                      {item.title.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`font-Oswald font-medium text-[14px] leading-[20px] ${
                        changeColor ? 'text-[#060002]' : 'text-[#DDDDDD]'
                      }`}
                    >
                      ${item.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyArtworksMobile;
