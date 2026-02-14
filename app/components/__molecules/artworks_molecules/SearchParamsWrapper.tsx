'use client';
import React, { useEffect, useState } from 'react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import axios from 'axios';

import useArtStore, { DataItem } from '@/app/commons/hooks/fetchStore';
import useAppBtn from '@/app/commons/hooks/setStore';
import PaginationMobile from '../../__organisms/artWorks_organisms/PaginationMobile';
import PlsAuthMobile from '../../__atoms/header_atoms/PlsAuthMobile';
import Loader from '../../__atoms/artworks_atoms/Loader';
import ArtworkItemMobile from '../../__atoms/artworks_atoms/ArtworkItemMobile';
import SignUp from '../header_molecules/SignUp';
import LogIn from '../header_molecules/LogIn';

type SearchParamsWrapperProps = {
  findUser?: string;
};

const SearchParamsWrapper: React.FC<SearchParamsWrapperProps> = ({
  findUser,
}) => {
  const { gallery } = useParams<{ gallery: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [favorite, setFavorite] = useState<string[]>([]);
  const [heartLoader, setHeartLoader] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoaded, setIsLoaded] = useState(true);

  const token = useArtStore((state) => state.token);
  const sortBy = useAppBtn((state) => state.sortBy);
  const order = useAppBtn((state) => state.order);
  const selectedCategory = useAppBtn((state) => state.selectedCategory);
  const setOverlay = useAppBtn((state) => state.setOverlay);
  const toggleOverlay = useAppBtn((state) => state.toggleOverlay);
  const showAuth = useAppBtn((state) => state.showAuth);
  const toggleAuth = useAppBtn((state) => state.toggleAuth);
  const showSignUp = useAppBtn((state) => state.showSignUp);
  const showLogIn = useAppBtn((state) => state.showLogIn);

  const fetchArtWorks = pathname === '/artworks';
  const fetchFav = pathname === '/profile';
  const homePage = pathname === '/' || pathname === '/home';
  const galleryPage = pathname.includes('galleries');
  const changeColor = ['/artworks', '/home', '/'].includes(pathname);
  const disabledPagination = ['/home', '/'].includes(pathname);

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const perPageParam = searchParams.get('perPage');
    if (pageParam) setPage(parseInt(pageParam, 10));
    if (perPageParam) setPerPage(parseInt(perPageParam, 10));
  }, [searchParams]);

  useEffect(() => {
    if (token) fetchFavorites();
  }, [token]);

  useEffect(() => {
    if (fetchArtWorks) fetchArtworkList();
  }, [page, perPage, sortBy, order, selectedCategory, findUser]);

  useEffect(() => {
    if (findUser) fetchArtistWorks(findUser);
  }, [findUser]);

  useEffect(() => {
    if (fetchFav) fetchFavoriteWorks();
  }, []);

  useEffect(() => {
    console.log(homePage, 'boolean');
    if (homePage) fetchFeaturedWorks();
  }, []);

  useEffect(() => {
    if (galleryPage && gallery) fetchGalleryWorks(gallery);
  }, [galleryPage, gallery]);

  const fetchArtworkList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3005/products/slice`, {
        params: {
          page,
          take: perPage,
          sortBy,
          order,
          category: selectedCategory,
        },
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      setData(Array.isArray(res.data.data) ? res.data.data : []);
      setTotalPosts(res.data.totalCount);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/products/getFavorites`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setFavorite(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchArtistWorks = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3005/users/${id}`);
      if (response.ok) {
        const data = await response.json();
        setData(Array.isArray(data.products) ? data.products : []);
      } else {
        console.error('Failed to fetch artist data');
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchFavoriteWorks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3005/products/favorite`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const favdata = await response.json();
      setData(Array.isArray(favdata) ? favdata : []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchFeaturedWorks = async () => {
    setLoading(true);
    console.log('Frontend token:', token); // ეს აუცილებელია!

    try {
      const response = await fetch(`http://localhost:3005/products/Features`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : `${token}`,
        },
      });
      const data = await response.json();
      console.log(data, 'data-FeaturedWorks');
      const artworks = Array.isArray(data) ? data : data.products;
      setData(Array.isArray(artworks) ? artworks : []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchGalleryWorks = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3005/galleries/${id}`);
      if (response.ok) {
        const data = await response.json();
        setData(Array.isArray(data.products) ? data.products : []);
      } else {
        console.error('Failed to fetch gallery');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const postFavorite = async (id: string | null) => {
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
        setFavorite(Array.isArray(updatedFavorites) ? updatedFavorites : []);
      } else {
        console.error('Failed to toggle favorite');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const toggleFavorite = async (id: string) => {
    if (!token) {
      toggleOverlay(true);
      toggleAuth();
      return;
    }

    setHeartLoader((prev) => ({ ...prev, [id]: true }));
    await postFavorite(id);
    setHeartLoader((prev) => ({ ...prev, [id]: false }));
    await fetchFavorites();
    if (fetchFav) await fetchFavoriteWorks();
  };

  const handleImageLoad = () => setIsLoaded(false);

  return (
    <section className='max-w-[1280px] w-full flex-col flex'>
      {loading ? (
        <Loader text='Loading...' />
      ) : data.length === 0 ? (
        <Loader text='Artworks Not Found' />
      ) : (
        <div className='w-full grid grid-cols-2 gap-[16px] pt-[18px]'>
          {data.map((item) => (
            <ArtworkItemMobile
              key={item._id}
              item={item}
              changeColor={changeColor}
              isLoaded={isLoaded}
              onImageLoad={handleImageLoad}
              onToggleFavorite={toggleFavorite}
              isFavorited={favorite.includes(item._id)}
              isLoading={heartLoader[item._id]}
            />
          ))}
        </div>
      )}

      {!disabledPagination && data.length !== 0 && (
        <PaginationMobile
          page={page}
          perPage={perPage}
          totalItems={totalPosts}
          changeColor={changeColor}
        />
      )}

      {showAuth && (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 transition-opacity duration-500'>
          <PlsAuthMobile />
        </div>
      )}

      {showSignUp && (
        <div
          className={`sm:hidden mt-[40px]  h-full w-full flex justify-center items-start absolute top-0 left-1/2 transform -translate-x-1/2  z-50 duration-500`}
        >
          <SignUp />
        </div>
      )}
      {showLogIn && (
        <div
          className={`sm:hidden mt-[40px] h-full w-full flex justify-center items-start absolute top-0 left-1/2 transform -translate-x-1/2  z-50 duration-500`}
        >
          <LogIn />
        </div>
      )}

      {setOverlay && (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-20'></div>
      )}
    </section>
  );
};

export default SearchParamsWrapper;
