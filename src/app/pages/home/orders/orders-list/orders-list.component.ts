import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { OrdersService } from '../orders.service';
import {
  Order,
  OrderCount,
} from '../../../../shared/interfaces/orders.interface';
import { forkJoin, Subscription } from 'rxjs';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    RouterModule,
    DialogModule,
    DropdownModule,
    SearchPipe,
    FormsModule,
    ButtonModule
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
  providers: [OrdersService],
})
export class OrdersListComponent implements OnDestroy {
  returnDialog: boolean = false;
  returnMessageDialog: boolean = false;
  deliveryCharge: boolean = false;

  deliveryChargeValue: number = 0;
  searchText: string = '';
  searchText2: string = '';

  orderCount: Partial<OrderCount> = {};
  products: Order[] = [];
  returnRequest: Order[] = [];

  private subscriptions = new Subscription();
  private service = inject(OrdersService);

  constructor() {
    this.fetchData();
  }

  fetchData() {
    this.subscriptions.add(
      forkJoin({
        count: this.service.getCount(),
        orders: this.service.getOrders(),
        returnOrders: this.service.getReturnOrders(),
        deliveryCharge: this.service.deliveryCharge()
      }).subscribe(({ count, orders, returnOrders, deliveryCharge }) => {
        // Assign the respective data
        this.orderCount = count.data; // Assuming count has a 'data' field
        this.products = orders.data; // Assuming orders has a 'data' field
        this.returnRequest = returnOrders.data; // Assuming returnOrders has a 'data' field
        this.deliveryChargeValue = deliveryCharge.data;

      })
    );
  }

  driverList = [
    { name: 'Babu', code: 'AU' },
    { name: 'Kumar', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
  ];

  showDialog() {
    this.returnDialog = true;
  }


  showDialogs() {
    this.deliveryCharge = !this.deliveryCharge;
  }

  showMessageDialog() {
    this.returnMessageDialog = true;
  }


  addDeliveryCharge() {
    this.subscriptions.add(
      this.service.addDeliveryCharge(this.deliveryChargeValue).subscribe(({ message }) => {

      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
