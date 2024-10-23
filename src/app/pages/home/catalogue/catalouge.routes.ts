import { Route } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { BannersComponent } from './banners/banners.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CouponDetailComponent } from './coupons/coupon-detail/coupon-detail.component';
import { CouponListComponent } from './coupons/coupon-list/coupon-list.component';

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
      {
        path: '',
        component: CouponListComponent,
      },

      {
        path: 'detail/:id',
        component: CouponDetailComponent,
      },
    ],
  },
];
