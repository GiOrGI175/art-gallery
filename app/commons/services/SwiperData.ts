// // export type SwiperItemT = {
// //   id: number;
// //   author: string;
// //   name: string;
// //   price: number;
// //   img: string;
// // };

// // export const swpperData: SwiperItemT[] = [
// //   {
// //     id: 1,
// //     author: 'tata kacharava',
// //     name: 'freedom',
// //     price: 250.0,
// //     img: '/swipperSlide1.webp',
// //   },
// //   {
// //     id: 2,
// //     author: 'tata kacharava',
// //     name: 'REMEMBER ME',
// //     price: 350.0,
// //     img: '/swipperSlide2.webp',
// //   },
// //   {
// //     id: 3,
// //     author: 'tata kacharava',
// //     name: 'POWER ME',
// //     price: 650.0,
// //     img: '/swipperSlide3.webp',
// //   },
// //   {
// //     id: 4,
// //     author: 'tata kacharava',
// //     name: 'fermer',
// //     price: 200.0,
// //     img: '/swipperSlide4.webp',
// //   },
// //   {
// //     id: 5,
// //     author: 'tata kacharava',
// //     name: 'Mountains',
// //     price: 900.0,
// //     img: '/swipperSlide5.webp',
// //   },
// //   {
// //     id: 6,
// //     author: 'tata kacharava',
// //     name: 'big Mountains',
// //     price: 800.0,
// //     img: '/swipperSlide6.webp',
// //   },
// // ];

// import axios from 'axios';
// import { DataItem } from '../hooks/fetchStore';

// const swpperData: DataItem[] = [];

// async function fetchFeaturesWorks() {
//   try {
//     const response = await axios('http://localhost:3005/products/Features');

//     const data = await response.data;

//     swpperData.push(...data);
//   } catch (error) {
//     console.log()
//   }
// }

// fetchFeaturesWorks();

// export { swpperData };
