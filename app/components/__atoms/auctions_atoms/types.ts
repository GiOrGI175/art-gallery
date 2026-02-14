export interface Product {
  title: string;
  Artist: string;
  year: string;
  ArtId: string;
  mainImgUrl: string;
  mockUpImgUrl: string;
  category: string;
  description: string;
  width: string;
  height: string;
}

export interface AuctionData {
  _id: string;
  product: Product;
  startingPrice: number;
  latestBidAmount: number;
  endDate: number;
  startDate: number;
}
