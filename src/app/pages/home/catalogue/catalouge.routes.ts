import { Route } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { BannersComponent } from './banners/banners.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CouponDetailComponent } from './coupons/coupon-detail/coupon-detail.component';
import { CouponListComponent } from './coupons/coupon-list/coupon-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

export const catalogueRoutes: Route[] = [
  {
    path: 'banners',
    component: BannersComponent,
  },
  {
    path: 'category',
    component: CategoriesComponent,
  },
  {
    path: 'coupons',
    component: CouponsComponent,
    children: [
      { path: '', component: CouponListComponent },
      { path: 'detail/:id', component: CouponDetailComponent},
    ],
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: 'detail/:id', component: ProductDetailComponent },
    ],
  },
];
