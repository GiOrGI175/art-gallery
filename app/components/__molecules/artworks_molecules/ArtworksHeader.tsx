'use client';
import React, { useCallback, useState } from 'react';
import useArtStore, { DataItem } from '@/app/commons/hooks/fetchStore';
import useAppBtn from '@/app/commons/hooks/setStore';
import { HeaderTitle } from '../../__atoms/artworks_atoms/HeaderTitle';
import { MobileFilterMenu } from '../../__atoms/artworks_atoms/MobileFilterMenu';
import { CategoryBar } from '../../__atoms/artworks_atoms/CategoryBar';
import { DesktopSearchForm } from '../../__atoms/artworks_atoms/DesktopSearchForm';

type ArtworksHeaderProps = {
  allData: DataItem[];
  setFilteredArtworks: React.Dispatch<React.SetStateAction<DataItem[] | null>>;
};

export const ArtworksHeader: React.FC<ArtworksHeaderProps> = ({
  allData,
  setFilteredArtworks,
}) => {
  // ui state
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [artist, setArtist] = useState('');

  // Zustand selectors
  const sortBy = useAppBtn((state) => state.sortBy);
  const order = useAppBtn((state) => state.order);
  const setSortBy = useAppBtn((state) => state.setSortBy);
  const setOrder = useAppBtn((state) => state.setOrder);
  const setCategory = useArtStore((state) => state.setCategory);
  const setSelectedCat = useAppBtn((state) => state.setSelectedCategory);
  const fetchData = useArtStore((state) => state.fetchData);

  // -------------- filter helpers ----------------
  const filterArtworks = useCallback(() => {
    let filtered = [...allData];

    // numeric filters
    if (price) {
      const val = parseInt(price, 10);
      if (!isNaN(val)) filtered = filtered.filter((a) => a.price <= val);
    }
    if (year) {
      const val = parseInt(year, 10);
      if (!isNaN(val)) filtered = filtered.filter((a) => a.year === val);
    }

    // string match
    if (artist) {
      filtered = filtered.filter((a) =>
        a.user.fullName?.toLowerCase().includes(artist.toLowerCase())
      );
    }

    // sort
    if (sortBy && order) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'price':
            return order === 'asc' ? a.price - b.price : b.price - a.price;
          case 'year':
            return order === 'asc' ? a.year - b.year : b.year - a.year;
          case 'artist':
            const aN = a.user.fullName ?? '';
            const bN = b.user.fullName ?? '';
            return order === 'asc'
              ? aN.localeCompare(bN)
              : bN.localeCompare(aN);
          default:
            return 0;
        }
      });
    }

    setFilteredArtworks(filtered);
  }, [allData, price, year, artist, sortBy, order, setFilteredArtworks]);

  // on submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterArtworks();
  };

  // quick‑sort clicks
  const handleFilterClick = (f: { sortBy: string; order: string }) => {
    setSortBy(f.sortBy);
    setOrder(f.order);
    filterArtworks();
  };

  // category switch
  const handleCategory = (cat: string, idx: number) => {
    setHoveredIndex(idx);
    setCategory(cat);
    setSelectedCat(cat);
    fetchData(); // bring fresh list from backend
  };

  return (
    <section className='w-full flex flex-col items-center'>
      {/* header row */}
      <div className='w-full flex justify-center px-[20px]'>
        <div className='max-w-[1280px] w-full mt-[10px] sm:mt-[0px] flex justify-between items-center'>
          <HeaderTitle />
          <MobileFilterMenu
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            onFilterClick={handleFilterClick}
          />
        </div>
      </div>

      {/* category bar */}
      <CategoryBar
        hoveredIndex={hoveredIndex}
        onCategoryClick={handleCategory}
      />

      {/* desktop search fields */}
      <DesktopSearchForm
        price={price}
        year={year}
        artist={artist}
        setPrice={setPrice}
        setYear={setYear}
        setArtist={setArtist}
        onSubmit={handleSearch}
      />
    </section>
  );
};
