import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    RouterModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.scss',
})
export class DriverListComponent {
  addNewDriver: boolean = false;

  driverList: any[] = [
    {
      driverId: '#12344',
      name: 'Shuaib',
      date: '16-08-2024',
      contact: '+987654310',
      branch: 'Dubai',
      recivedOrders: 4,
      deliverdOrder: 5,
    },
    {
      driverId: '#12345',
      name: 'Ahmed',
      date: '12-08-2024',
      contact: '+987654311',
      branch: 'Abu Dhabi',
      recivedOrders: 6,
      deliverdOrder: 6,
    },
    {
      driverId: '#12346',
      name: 'Fatima',
      date: '10-08-2024',
      contact: '+987654312',
      branch: 'Sharjah',
      recivedOrders: 5,
      deliverdOrder: 4,
    },
    {
      driverId: '#12347',
      name: 'Omar',
      date: '18-08-2024',
      contact: '+987654313',
      branch: 'Dubai',
      recivedOrders: 7,
      deliverdOrder: 6,
    },
    {
      driverId: '#12348',
      name: 'Sara',
      date: '14-08-2024',
      contact: '+987654314',
      branch: 'Abu Dhabi',
      recivedOrders: 8,
      deliverdOrder: 8,
    },
    {
      driverId: '#12349',
      name: 'Ali',
      date: '15-08-2024',
      contact: '+987654315',
      branch: 'Sharjah',
      recivedOrders: 3,
      deliverdOrder: 2,
    },
  ];

  showDialog() {
    console.log('hello');
    this.addNewDriver = true;
  }
}
