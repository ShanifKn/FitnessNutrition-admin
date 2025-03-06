import { Component, inject, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import { DriverService } from '../driver.service';
import { Driver } from '../../../../shared/interfaces/driver.interface';

@Component({
  selector: 'app-driver-detail',
  standalone: true,
  imports: [ButtonModule, DialogModule, InputTextModule, TableModule],
  templateUrl: './driver-detail.component.html',
  styleUrl: './driver-detail.component.scss',
})
export class DriverDetailComponent implements OnDestroy {
  private route = inject(ActivatedRoute)
  private subscriptions = new Subscription();
  services = inject(DriverService);

  driver!: Driver

  returnDailog: boolean = false;
  editDriverDailog: boolean = false;
  editLocationDailog: boolean = false;
  driverId: string | null = ''


  constructor() {
    this.driverId = this.route.snapshot.paramMap.get('id')

    if (this.driverId) {
      this.getDriverId(this.driverId)
    }
  }



  getDriverId(_id: string) {
    this.subscriptions.add(
      this.services.getDetails(_id).subscribe(({ data }) => {
        this.driver = data
      }))
  }




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


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
