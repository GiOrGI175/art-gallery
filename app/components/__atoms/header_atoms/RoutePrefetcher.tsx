'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ROUTES_TO_PREFETCH = [
  '/artists',
  '/artworks',
  '/auctions',
  '/cart',
  '/galleries',
  '/paypal-success',
  '/privacy',
  '/profile',
  '/terms',
] as const;

export default function RoutePrefetcher() {
  const router = useRouter();

  useEffect(() => {
    ROUTES_TO_PREFETCH.forEach((route) => router.prefetch(route));
  }, [router]);

  return null;
}
