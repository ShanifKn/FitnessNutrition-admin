import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-driver-detail',
  standalone: true,
  imports: [ButtonModule, DialogModule, InputTextModule, TableModule],
  templateUrl: './driver-detail.component.html',
  styleUrl: './driver-detail.component.scss',
})
export class DriverDetailComponent {
  returnDailog: boolean = false;
  editDriverDailog: boolean = false;
  editLocationDailog: boolean = false;

  showDialog() {
    this.returnDailog = true;
  }

  editDailog() {
    this.editDriverDailog = true;
  }

  locationDailog() {
    this.editLocationDailog = true;
  }

  receivedOrders: any[] = [
    {
      orderId: '#12344',
      date: '16-08-2024',
      payment: 'cod',
      status: 'pending',
      amount: '250',
      salesOrder: '#12346',
      invoiceNo: '#65432',
    },

    {
      orderId: '#12344',
      date: '16-08-2024',
      payment: 'cod',
      status: 'pending',
      amount: '250',
      salesOrder: '#12346',
      invoiceNo: '#65421',
    },

    {
      orderId: '#12344',
      date: '16-08-2024',
      payment: 'cod',
      status: 'pending',
      amount: '250',
      salesOrder: '#12346',
      invoiceNo: '#65421',
    },
  ];
}
