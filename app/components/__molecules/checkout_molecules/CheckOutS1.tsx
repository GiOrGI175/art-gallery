// import React, { useState, ChangeEvent } from "react";
// import CheckOutForm from "./CheckOutForm";
// import CardInfo from "./CardInfo";

// // Define the type for the form data
// interface FormData {
//   cardNumber: string;
//   expirationDate: string;
//   cvc: string;
//   nameOnCard: string;
// }

// export default function CheckOutS1() {
//   const [formData, setFormData] = useState<FormData>({
//     cardNumber: "",
//     expirationDate: "",
//     cvc: "",
//     nameOnCard: "",
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="font-RedRose">
//       <button className="font-RedRose font-light text-[22px] leading-7 text-[#D04175] mt-[28px]">
//         Back To Cart
//       </button>
//       <div className="mt-[41px]">
//         <h3 className="font-normal text-[36px] leading-[44px] text-[#DDDCDC]">
//           Account
//         </h3>
//         <h5 className="font-RedRose font-light text-[22px] leading-7 text-[#DDDCDC] mt-[12px]">
//           kacharava.tamari12@gmail.com
//         </h5>
//       </div>
//       <div className="mt-[48px]">
//         <h3 className="font-normal text-[36px] leading-[44px] text-[#DDDCDC]">
//           Delivery
//         </h3>
//         <div className="flex gap-[2px]">
//           <input type="checkbox" className="mt-[12px]" />
//           <h5 className="font-RedRose font-light text-[22px] leading-7 text-[#DDDCDC] mt-[12px]">
//             Use a saved address
//           </h5>
//         </div>
//         <CheckOutForm />
//         <CardInfo formData={formData} handleChange={handleChange} />
//       </div>
//     </div>
//   );
// }
