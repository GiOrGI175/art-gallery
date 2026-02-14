import { useState, useEffect, useCallback } from 'react';
import useArtStore from '@/app/commons/hooks/fetchStore';

export const useFavorites = () => {
  const token = useArtStore((state) => state.token);
  const fetchFavorites = useArtStore((state) => state.fetchFavorites);
  const favoritesData = useArtStore((state) => state.favoritesData);
  const favoritesLoading = useArtStore((state) => state.favoritesLoading);

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const fetchExistingFavorites = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch('http://localhost:3005/products/getFavorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setFavoriteIds(data);
    } catch (err) {
      console.error('Error fetching favorites', err);
    }
  }, [token]);

  const toggleFavorite = async (id: string) => {
    try {
      await fetch(`http://localhost:3005/products/favorites/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      await fetchExistingFavorites();
      fetchFavorites();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFavorites();
      fetchExistingFavorites();
    }
  }, [token]);

  return {
    favoritesData,
    favoritesLoading,
    favoriteIds,
    toggleFavorite,
  };
};
