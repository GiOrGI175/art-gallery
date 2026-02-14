import { create } from 'zustand';
import { DataItem } from './fetchStore';

type useAppBtnState = {
  showSignUp: boolean;
  toggleSignUp: () => void;

  showLogIn: boolean;
  togglelogIn: () => void;

  setOverlay: boolean;
  toggleOverlay: (value: boolean) => void;

  showPopUp: boolean;
  setShowPopUp: (state?: boolean) => void;

  showPopUp2: boolean;
  setShowPopUp2: (state?: boolean) => void;

  sortBy: string;
  setSortBy: (value: string) => void;

  order: string;
  setOrder: (value: string) => void;

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  showAuth: boolean;
  toggleAuth: () => void;

  currentEditItem: DataItem | null;
  setEditItem: (item: DataItem | null) => void;

  showSearch: boolean;
  toggleSearch: () => void;
};

const useAppBtn = create<useAppBtnState>((set) => ({
  showSearch: false,
  toggleSearch: () => set((state) => ({ showSearch: !state.showSearch })),

  showSignUp: false,
  toggleSignUp: () => set((state) => ({ showSignUp: !state.showSignUp })),

  showLogIn: false,
  togglelogIn: () => set((state) => ({ showLogIn: !state.showLogIn })),

  setOverlay: false,
  toggleOverlay: (value) => set({ setOverlay: value }),

  showPopUp: false,
  setShowPopUp: (value) =>
    set((state) => ({
      showPopUp: value !== undefined ? value : !state.showPopUp,
    })),

  showPopUp2: false,
  setShowPopUp2: (value) =>
    set((state) => ({
      showPopUp2: value !== undefined ? value : !state.showPopUp2,
    })),

  sortBy: 'createdAt',
  setSortBy: (value) => set({ sortBy: value }),

  order: 'asc',
  setOrder: (value) => set({ order: value }),

  selectedCategory: '',
  setSelectedCategory: (value) => set({ selectedCategory: value }),

  showAuth: false,
  toggleAuth: () => set((state) => ({ showAuth: !state.showAuth })),

  currentEditItem: null as DataItem | null,
  setEditItem: (item: DataItem | null) => set({ currentEditItem: item }),
}));

export default useAppBtn;
