import { create } from 'zustand';

type User = {
  _id: string;
  fullName: string;
  fullNameGEO: string;
  email: string;
};

export type DataItem = {
  _id: string;
  title: string;
  titleGEO: string;
  description: string;
  descriptionGEO: string;
  category: string;
  categoryGEO: string;
  price: number;
  year: number;
  total: number;
  width: number;
  ArtId: number;
  height: number;
  depth: number;
  mainImgUrl: string;
  mockUpImgUrl: string;
  user: User;
  artist: string;
  isFavorite: boolean;
  features: boolean;
};

// type ArtistData = {
//   name: string;
//   firstname: string;
//   lastName: string;
//   About: string;
//   skils: string;
//   userImg: string;
//   Artworks: DataItem[];
// };

export type GalleryData = {
  _id: string;
  mainImgUrl: string;
  name: string;
  nameGEO: string;
  addres: string;
  addresGEO: string;
  info: string;
  infoGEO: string;
  details: string;
  detailsGEO: string;
  products: DataItem[];
};
// interface UseStore {
//   token: string;
//   setToken: (newToken: string) => void;
//   clearToken: () => void;
// }

type ArtStore = {
  token: string | undefined;
  setToken: (token: string | undefined) => void;

  allData: DataItem[];
  notFound: boolean;
  Artworksloading: boolean;
  setArtworksloading: (state?: boolean) => void;

  Artistloading: boolean;
  skip: number;
  take: number;
  category: string;
  price: string;
  year: string;
  artist: string;

  setCategory: (category: string) => void;
  setPrice: (price: string) => void;
  setYear: (year: string) => void;
  setArtist: (artist: string) => void;

  fetchData: () => Promise<void>;

  param: string;
  setParam: (query: string) => void;

  user: string | undefined;
  setUser: (query: string) => void;
  artistData: DataItem[];

  fetchArtistData: () => Promise<void>;
  Galletyloading: boolean;

  gallerysData: GalleryData[];
  gallreyInfo: null | GalleryData;
  gallreyArtworks: [] | DataItem[];
  fetchGallery: () => Promise<void>;

  favoritesLoading: boolean;
  favoritesData: DataItem[];
  fetchFavorites: () => Promise<void>;

  prevCategory: string;
  setPrevCategory: (category: string) => void;

  artistArtworks: DataItem[];
  fetchUserArts: (id: string) => Promise<void>;
};

const useArtStore = create<ArtStore>((set, get) => ({
  token: undefined,
  setToken: (token: string | undefined) => set({ token }),

  allData: [],
  notFound: false,

  Artworksloading: true,

  setArtworksloading: (value) =>
    set((state) => ({
      Artworksloading: value !== undefined ? value : !state.Artworksloading,
    })),

  skip: 0,
  take: 9,
  category: '',
  price: '',
  year: '',
  artist: '',

  prevCategory: '',

  setCategory: (category) => {
    const { prevCategory } = get();

    // If category changes, reset skip to 0
    if (category !== prevCategory) {
      set({ category, skip: 0, allData: [], prevCategory: category });
    } else {
      set({ category });
    }
  },

  setPrice: (price) => set({ price }),
  setYear: (year) => set({ year }),
  setArtist: (artist) => set({ artist }),

  setPrevCategory: (category) => set({ prevCategory: category }),

  fetchData: async () => {
    const { take, allData, token, category, skip } = get();

    try {
      set({ Artworksloading: true });

      const currentSkip = skip;

      const response = await fetch(
        `http://localhost:3005/products/Select?take=${take}&skip=${currentSkip}${
          category ? `&category=${category}` : ''
        }`,
        {
          method: 'GET',
          headers: {
            Authorization: token ? `Bearer ${token}` : `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      set({ Artworksloading: false });

      if (category) {
        set({ allData: [...allData, ...data], notFound: false });
      } else {
        set({ allData: [...allData, ...data], notFound: false });
      }

      if (data.length === 0) {
        set({ notFound: true });
        return;
      }

      set({ skip: currentSkip + take });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      set({ Artworksloading: false });
    }
  },

  param: '',
  setParam: (query) => set({ param: query }),

  artistData: [],
  user: '',
  setUser: (query) => set({ user: query }),

  Artistloading: true,

  fetchArtistData: async () => {
    try {
      set({ Artistloading: true });

      const { user } = get();

      console.log(user, 'user-zu');

      const currentuser = get().user;

      console.log(currentuser, 'currentuser');
      if (user) {
        const response = await fetch(
          `http://localhost:3005/users/artist/${user}`
        );

        if (!response.ok) {
          console.error('Failed to fetch artist data');
          return;
        }

        const data = await response.json();
        set({ Artistloading: false });

        console.log(data, 'artisData-zu');

        set({ artistData: data });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  gallerysData: [],
  gallreyInfo: null,

  gallreyArtworks: [],
  Galletyloading: true,

  favoritesData: [],

  favoritesLoading: true,

  fetchFavorites: async () => {
    const { token } = get();

    console.log(token);

    try {
      const response = await fetch(`http://localhost:3005/products/Favorite`, {
        method: 'GET',
        headers: {
          Authorization: token ? `Bearer ${token}` : `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }

      const data = await response.json();

      set({ favoritesData: data, favoritesLoading: false });
    } catch (error) {
      console.log(error);
    }
  },

  fetchGallery: async () => {
    try {
      const response = await fetch('http://localhost:3005/galleries');
      const result: GalleryData[] = await response.json();

      console.log(result, 'resultdaata');

      set({ gallerysData: result, Galletyloading: false });
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  },

  artistArtworks: [],

  fetchUserArts: async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3005/users/artist/${id}`);

      if (!response.ok) {
        console.error('Failed to fetch artist data');
        return;
      }

      const data = await response.json();

      set({ artistData: data || [] });
    } catch (error) {
      console.error('Error fetching artist data:', error);
      set({ artistData: [] });
    }
  },
}));

export default useArtStore;
