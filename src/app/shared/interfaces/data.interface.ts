export interface BannerData {
  _id?: string;
  title: string;
  bannerType: string;
  visibility: boolean;
  category: string[]; // Array of ObjectId represented as strings
  subCategory?: string[]; // Array of ObjectId represented as strings
  product?: string; // ObjectId represented as a string
  image: string;
}

export interface Banners {
  mainBanners?: BannerData[]; // Array of Main Banner Data
  subBanners?: BannerData[]; // Array of Sub Banner Data
  offerBanners?: BannerData[]; // Array of Offer Banner Data
  bottomBanners?: BannerData[]; // Array of Bottom Banner Data
}
