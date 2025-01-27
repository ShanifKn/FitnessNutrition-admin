import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Timeline } from '../../../../data/data';
import { OrderTrackingComponent } from '../../../../shared/components/order-tracking/order-tracking.component';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { Order } from '../../../../shared/interfaces/orders.interface';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, OrderTrackingComponent, ButtonModule, DialogModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
  providers: [OrdersService],
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private service = inject(OrdersService);
  private _location = inject(Location);
  private route = inject(ActivatedRoute);

  orderId: string | null = '';
  order: Partial<Order> = {};
  orderUpdated: boolean = false;

  items: any[] = [];
  subtotal: number = 0;
  vat: number = 0;
  deliveryCharge: number = 0;
  totalAmount: number = 0;
  orderDetails: any = {};
  timeline: any = [];

  constructor() {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');

    if (this.orderId) {
      this.getData(this.orderId);
    }
  }

  getData(_id: string) {
    this.subscriptions.add(
      this.service.getOrder(_id).subscribe(({ data }) => {
        // Assign the API response to `this.order`
        this.order = data;

        // Map product data into `this.items`
        this.items = data.product.map((product: any) => ({
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          image: product.image,
          amount: product.quantity * product.price,
        }));

        // Calculate totals
        this.subtotal = this.items.reduce((acc, item) => acc + item.amount, 0);
        this.vat = this.subtotal * 0.05; // 5% VAT
        this.deliveryCharge = 20; // Simulate delivery charge if applicable
        this.totalAmount = this.subtotal + this.vat + this.deliveryCharge;
      })
    );
  }

  showDialog() {
    this.orderUpdated = !this.orderUpdated;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
