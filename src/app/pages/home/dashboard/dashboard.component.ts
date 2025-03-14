import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OrdersService } from '../orders/orders.service';
import { forkJoin, Subscription } from 'rxjs';
import { Order } from '../../../shared/interfaces/orders.interface';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
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
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [OrdersService]
})
export class DashboardComponent implements OnDestroy {
  products: Order[] = [];
  searchText: string = '';

  private subscriptions = new Subscription();
  private orderService = inject(OrdersService);

  constructor() {
    this.fetchData()
  }

  ngOnInit() { }


  fetchData() {
    this.subscriptions.add(
      forkJoin({
        orders: this.orderService.getOrders(),
      }).subscribe(({ orders }) => {
        this.products = orders.data; // Assuming orders has a 'data' field
      })
    );
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
