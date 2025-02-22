import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    RouterModule,
    DialogModule,
    DropdownModule,
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent {
  returnDialog: boolean = false;
  returnMessageDialog: boolean = false;

  products: any[] = [
    {
      orderId: '#45784',
      customer: 'Shuaib',
      date: '16-08-2024',
      paid: 'No',
      status: 'Pending',
      items: 2,
      paymentMode: 'Cash on delivery',
      total: 'AED 1050.00',
      action: 'View Details',
    },
    {
      orderId: '#45784',
      customer: 'Ajmal',
      date: '18-08-2024',
      paid: 'Yes',
      status: 'Delivered',
      items: 3,
      paymentMode: 'Card on delivery',
      total: 'AED 7500.00',
      action: 'View Details',
    },
    {
      orderId: '#45784',
      customer: 'Ismail',
      date: '26-08-2024',
      paid: 'Yes',
      status: 'Cancelled',
      items: 1,
      paymentMode: 'Online Payment',
      total: 'AED 4500.00',
      action: 'View Details',
    },
    {
      orderId: '#45784',
      customer: 'Musthafa',
      date: '16-09-2024',
      paid: 'Yes',
      status: 'Delivered',
      items: 1,
      paymentMode: 'Online Payment',
      total: 'AED 5500.00',
      action: 'View Details',
    },
    {
      orderId: '#45784',
      customer: 'Jabir',
      date: '01-09-2024',
      paid: 'Yes',
      status: 'Returned',
      items: 3,
      paymentMode: 'Card on delivery',
      total: 'AED 1000.00',
      action: 'View Details',
    },
    {
      orderId: '#45784',
      customer: 'Shuaib',
      date: '16-08-2024',
      paid: 'No',
      status: 'Pending',
      items: 2,
      paymentMode: 'Cash on delivery',
      total: 'AED 1050.00',
      action: 'View Details',
    },
    {
      orderId: '#45784',
      customer: 'Ajmal',
      date: '18-08-2024',
      paid: 'Yes',
      status: 'Delivered',
      items: 3,
      paymentMode: 'Card on delivery',
      total: 'AED 7500.00',
      action: 'View Details',
    },
    {
      orderId: '#45784',
      customer: 'Ismail',
      date: '26-08-2024',
      paid: 'Yes',
      status: 'Cancelled',
      items: 1,
      paymentMode: 'Online Payment',
      total: 'AED 4500.00',
      action: 'View Details',
    },
    {
      orderId: '#45784',
      customer: 'Musthafa',
      date: '16-09-2024',
      paid: 'Yes',
      status: 'Delivered',
      items: 1,
      paymentMode: 'Online Payment',
      total: 'AED 5500.00',
      action: 'View Details',
    },
    {
      orderId: '#45784',
      customer: 'Jabir',
      date: '01-09-2024',
      paid: 'Yes',
      status: 'Returned',
      items: 3,
      paymentMode: 'Card on delivery',
      total: 'AED 1000.00',
      action: 'View Details',
    },
  ];

  returnRequest: any[] = [
    {
      orderId: '#45784',
      customer: 'Shuaib',
      date: '16-08-2024',
      returnDate: '16-09-2024',
      paid: 'No',
      items: 2,
      paymentMode: 'Cash on delivery',
    },
    {
      orderId: '#45785',
      customer: 'Aisha',
      date: '17-08-2024',
      returnDate: '17-09-2024',
      paid: 'Yes',
      items: 1,
      paymentMode: 'Credit Card',
    },
    {
      orderId: '#45786',
      customer: 'John',
      date: '18-08-2024',
      returnDate: '18-09-2024',
      paid: 'No',
      items: 3,
      paymentMode: 'Bank Transfer',
    },
    {
      orderId: '#45787',
      customer: 'Fatima',
      date: '19-08-2024',
      returnDate: '19-09-2024',
      paid: 'Yes',
      items: 4,
      paymentMode: 'Cash on delivery',
    },
    {
      orderId: '#45788',
      customer: 'Alex',
      date: '20-08-2024',
      returnDate: '20-09-2024',
      paid: 'No',
      items: 2,
      paymentMode: 'Credit Card',
    },
  ];

  driverList = [
    { name: 'Babu', code: 'AU' },
    { name: 'Kumar', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
  ];

  showDialog() {
    this.returnDialog = true;
  }


  showMessageDialog() {
    this.returnMessageDialog = true;
  }
}
