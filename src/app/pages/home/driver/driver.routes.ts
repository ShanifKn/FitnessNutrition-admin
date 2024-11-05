import { Routes } from '@angular/router';
import { DriverComponent } from './driver.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { DriverDetailComponent } from './driver-detail/driver-detail.component';

export const driverRoutes: Routes = [
  {
    path: '',
    component: DriverComponent,
    children: [
      { path: '', component: DriverListComponent },
      { path: 'detail/:id', component: DriverDetailComponent },
    ],
  },
];
