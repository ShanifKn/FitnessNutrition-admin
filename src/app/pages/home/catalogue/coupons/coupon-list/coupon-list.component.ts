import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-coupon-list',
  standalone: true,
  imports: [TableModule, CommonModule, RouterModule, ButtonModule, DialogModule],
  templateUrl: './coupon-list.component.html',
  styleUrl: './coupon-list.component.scss',
})
export class CouponListComponent {

  displayDialog: boolean = false;

  coupons: any[] = [
    {
      _id: '1234',
      name: 'AVE20NOW',
      type: 'Percentage',
      registered: '50%',
      status: 'Finished',
      start: '14-sep-24 12:30pm',
      end: '14-sep-24 12:30pm',
    },
    {
      _id: '5678',
      name: 'SUMMER15',
      type: 'Flat Discount',
      registered: '30%',
      status: 'Planned',
      start: '01-jun-24 10:00am',
      end: '30-jun-24 11:59pm',
    },
    {
      _id: '9101',
      name: 'FREESHIP50',
      type: 'Free Shipping',
      registered: '75%',
      status: 'Finished',
      start: '10-aug-24 9:00am',
      end: '12-aug-24 6:00pm',
    },
    {
      _id: '1121',
      name: 'WELCOME10',
      type: 'Percentage',
      registered: '60%',
      status: 'Enabled',
      start: '01-jan-24 8:00am',
      end: '01-mar-24 11:59pm',
    },
    {
      _id: '3141',
      name: 'BLACKFRI30',
      type: 'Percentage',
      registered: '85%',
      status: 'Planned',
      start: '23-nov-24 12:00am',
      end: '25-nov-24 11:59pm',
    },
  ];

  constructor() {
    this.displayDialog = true;
  }
}
