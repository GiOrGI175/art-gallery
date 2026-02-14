export interface UserToken {
  userId: string;
}

export interface FormDataT {
  title: string;
  titleGEO: string;
  year: number;
  description: string;
  descriptionGEO: string;
  category: string;
  width: number;
  height: number;
  depth: number;
  price: number;
  mainImgUrl: FileList;
  mockUpImgUrl: FileList;
}

export type Address = {
  fullName: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
  phone: string;
  adressName: string;
};
