'use client';

import Consultation from '@/app/components/__molecules/artworks_molecules/Consultation';
import { DataItem } from '@/app/commons/hooks/fetchStore';
import ArtsSwiper from '@/app/components/__organisms/artWorks_organisms/ArtsSwiper';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useAppBtn from '@/app/commons/hooks/setStore';
import { useTranslation } from 'react-i18next';

export default function Page() {
  const { t } = useTranslation();

  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [product, setProduct] = useState<DataItem | undefined>(undefined);
  const [imgs, setImgs] = useState<string[]>([]);

  const setOverlay = useAppBtn((state) => state.setOverlay);

  useEffect(() => {
    if (id) {
      const fetchArt = async (id: string) => {
        try {
          const res = await axios(
            `http://localhost:3005/products/findOne/${id}`
          );
          const data = res.data;
          setProduct(data);

          const imgArr = [];
          imgArr.push(data.mainImgUrl);
          imgArr.push(data.mockUpImgUrl);
          setImgs(imgArr);
        } catch (error) {
          console.log(error);
        }
      };
      fetchArt(id);
    }
  }, [id]);

  return (
    <div className='w-full flex-col flex  items-center '>
      {product ? (
        <div className='pt-[30px] sm:pt-[73px] pb-[37px] sm:pb-[148px] w-full flex justify-center bg-[#060002] px-[20px]'>
          <ArtsSwiper imgs={imgs} product={product} />
        </div>
      ) : (
        <div className='w-full h-[80dvh] flex justify-center items-center bg-[#060002]'>
          <span className='font-Oswald text-start font-normal sm:text-[100px] text-[40px] leading-[41px] text-[#D04175]'>
            {t('common.loading')}
          </span>
        </div>
      )}
      <div className=' w-full flex-col flex  items-center  bg-[#D5D5D5]'>
        <Consultation />
      </div>

      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-20 ${
          setOverlay ? 'block ' : 'hidden'
        }  `}
      ></div>
    </div>
  );
}
