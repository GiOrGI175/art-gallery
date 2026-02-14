import { useState, useEffect } from 'react';
import { AuctionData } from './types';

export const useAuctionData = (id: string | string[]) => {
  const [auctionData, setAuctionData] = useState<AuctionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/auction-bidding/${id}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch auction data');
        }
        const data = await response.json();
        setAuctionData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const updateLatestBid = (newBidAmount: number) => {
    setAuctionData((prev) =>
      prev ? { ...prev, latestBidAmount: newBidAmount } : prev
    );
  };

  return { auctionData, loading, error, updateLatestBid };
};
