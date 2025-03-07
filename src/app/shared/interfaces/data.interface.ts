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

export interface Address {
  type: string;
  flatno: string;
  flatname: string;
  street: string;
  landMark: string;
  pin: number;
  city: string;
  country: string;
  delivery?: boolean; // Optional with default value
}

export interface CustomerDataCount {
  orders: number;
  invoice: number;
  value: number;
}

export interface Customer {
  _id: string; // Optional for new documents
  email: string;
  name: string;
  customerId: string;
  image?: string; // Optional
  phone?: number;
  dob?: Date;
  gender?: string;
  verfiy?: boolean; // Optional with default value
  address?: Address[]; // Array of Address
}

export interface Wishlist {
  _id: string;
  items: WishlistItem[];
  createdAt: string;
  updatedAt: string;
}

interface WishlistItem {
  productId: {
    _id: string;
    images: (string | null)[];
    name: string;
    rate: number;
    stock_on_hand: number;
    rating: number;
  };
  _id: string;
}

export interface Cart {
  _id: string;
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

interface CartItem {
  product: {
    _id: string;
    images: (string | null)[];
    name: string;
    rate: number;
    stock_on_hand: number;
    rating: number;
  };
  quantity: number;
  price: number;
  total: number;
  _id: string;
}




export interface User {
  _id: string;
  email: string;
  name: string;
  phone?: number;
  verfiy: boolean;
  address: Address[];
  image?: string
  createdAt: string;
  updatedAt: string;
  __v: number;
  customerId: string;
  gender?: string;
  dob?: string;
}

// interface Address {
//   type: string;
//   flatno: string;
//   flatname: string;
//   street: string;
//   landMark: string;
//   pin: number;
//   city: string;
//   country: string;
//   delivery: boolean;
//   _id: string;
// }

