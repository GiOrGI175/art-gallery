import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ArtistState = {
  allNames: {
    _id: string;
    fullName: string;
    fullNameGEO: string;
    profileUrl?: string;
  }[];
  filteredNames: { _id: string; fullName: string; fullNameGEO: string }[];
  search: string;
  letter: string;
  firstLetterArr: {
    _id: string;
    fullName: string;
    fullNameGEO: string;
    profileUrl?: string;
  }[];
  filterAllLetter: {
    _id: string;
    fullName: string;
    fullNameGEO: string;
    profileUrl?: string;
  }[][];
  allLetters: string[];
  loadedItems: number;
  isLoading: boolean;
};

type ArtistActions = {
  setAllNames: (
    names: {
      _id: string;
      fullName: string;
      fullNameGEO: string;
      profileUrl?: string;
    }[]
  ) => void;
  setFilteredNames: (
    names: { _id: string; fullName: string; fullNameGEO: string }[]
  ) => void;
  setSearch: (query: string) => void;
  setLetter: (letters: string) => void;
  setFirstLetterArr: (
    letters: {
      _id: string;
      fullName: string;
      fullNameGEO: string;
      profileUrl?: string;
    }[]
  ) => void;
  setFilterAllLetter: (
    letters: {
      _id: string;
      fullName: string;
      fullNameGEO: string;
      profileUrl?: string;
    }[][]
  ) => void;
  setAllLetters: (letters: string[]) => void;
  setLoadedItems: (count: number) => void;
  loadMoreItems: () => void;
  fetchArtists: () => Promise<void>;
};

const useArtistStore = create<ArtistState & ArtistActions>()(
  persist(
    (set) => ({
      allNames: [],
      filteredNames: [],
      search: '',
      letter: '',
      firstLetterArr: [],
      filterAllLetter: [],
      allLetters: [],
      loadedItems: 3,
      isLoading: true,

      setAllNames: (names) => set({ allNames: names }),
      setFilteredNames: (names) => set({ filteredNames: names }),
      setSearch: (query) => set({ search: query }),
      setLetter: (letters) => set({ letter: letters }),
      setFirstLetterArr: (letters) => set({ firstLetterArr: letters }),
      setFilterAllLetter: (letters) => set({ filterAllLetter: letters }),
      setAllLetters: (letters) => set({ allLetters: letters }),
      setLoadedItems: (count) => set({ loadedItems: count }),
      loadMoreItems: () =>
        set((state) => ({ loadedItems: state.loadedItems + 3 })),

      fetchArtists: async () => {
        try {
          set({ isLoading: true });
          const response = await fetch('http://localhost:3005/users/artists');
          const result: {
            _id: string;
            fullName: string;
            fullNameGEO: string;
            profileUrl?: string;
          }[] = await response.json();
          console.log(result, 'result');

          set({ allNames: result, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          console.error('Failed to load artists', error);
        }
      },
    }),
    {
      name: 'artist-store',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({ allNames: state.allNames }),
      migrate: (persistedState, version) => {
        if (!persistedState) return null;

        const state = persistedState as ArtistState;

        if (version === 0) {
          const migratedState = {
            allNames: state.allNames.map((artist) => ({
              ...artist,
              profileUrl: '',
            })),
          };
          return migratedState;
        }

        return persistedState;
      },
      version: 1,
    }
  )
);

export default useArtistStore;
