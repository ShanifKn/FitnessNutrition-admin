import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [TableModule, CommonModule, RouterModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss',
})
export class CustomerDetailComponent {
  users: any[] = [
    {
      orderId: '#45890',
      date: '10-10-2024',
      paid: 'Yes',
      status: 'Delivered',
      items: 3,
      total: 'AED 750.00',
    },
    {
      orderId: '#45921',
      date: '05-10-2024',
      paid: 'No',
      status: 'Cancelled',
      items: 1,
      total: 'AED 250.00',
    },
    {
      orderId: '#45815',
      date: '02-10-2024',
      paid: 'Yes',
      status: 'Delivered',
      items: 5,
      total: 'AED 1500.00',
    },
    {
      orderId: '#45798',
      date: '30-09-2024',
      paid: 'No',
      status: 'Pending',
      items: 2,
      total: 'AED 1050.00',
    },
    {
      orderId: '#45945',
      date: '12-10-2024',
      paid: 'Yes',
      status: 'Delivered',
      items: 4,
      total: 'AED 890.00',
    },
    {
      orderId: '#45978',
      date: '11-10-2024',
      paid: 'No',
      status: 'Pending',
      items: 3,
      total: 'AED 500.00',
    },
  ];

  redeemCard: any[] = [
    {
      date: '10-10-2024',
      code: 'ASDZERTYGF',
      offerType: 'Season Promotion',
      redeem: '250.00',
      orderId: '#45890',
      invoice: '#458901231',
    },
  ];
}
