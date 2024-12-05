export interface CategoryData {
  _id?: string;
  __v?: number;
  createdAt?: string;
  description: string;
  featuredCategory: boolean;
  maximumDiscount: number;
  publishDate: string;
  subCategory?: SubCategoryLevel2[];
  tag: string;
  title: string;
  updatedAt?: string;
  visibility: boolean;
  image?: string;
}

export interface SubCategoryLevel2 {
  title: string;
  level: number;
  subCategory?: SubCategoryLevel3[];
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubCategoryLevel3 {
  title: string;
  level: number;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
