// import { create } from "zustand";
// import Cookies from "js-cookie";

// export interface Item {
//   id: number;
//   name: string;
//   price: number;
//   img: string;
//   content: string;
//   category: string;
// }

// export interface CartItem {
//   item: Item;
//   quantity: number;
// }

// export interface CartStore {
//   cartItems: CartItem[];
//   addItemToCart: (item: Item) => void;
//   clearCart: () => void;
// }

// const useCartStore = create<CartStore>((set, get) => ({
//   cartItems: JSON.parse(Cookies.get("cartItems") ?? "[]"),
//   addItemToCart: (item: Item) => {
//     const updatedCart = [...get().cartItems, { item, quantity: 1 }];
//     set({ cartItems: updatedCart });
//     Cookies.set("cartItems", JSON.stringify(updatedCart), { expires: 7 });
//     console.log("added product", item);
//   },
//   clearCart: () => {
//     set({ cartItems: [] });
//     Cookies.remove("cartItems");
//   },
// }));

// export default useCartStore;
