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
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    // OrderTrackingComponent,
    ButtonModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    TableModule,
  ],
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

  selectedOption: any;
  invoiceNumber: string = '';
  reason: string = '';
  returnDialogVisible = false;
  selectedProduct: any = null;

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
          stock: product.productId.stock_on_hand,
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

  orderUpdates = [
    { name: 'Confirmed', code: 'confirmed' },
    { name: 'Delivered', code: 'delivered' },
    { name: 'Cancelled', code: 'cancelled' },
    { name: 'Returned', code: 'returned' },
  ];

  cancel() {
    this.orderUpdated = false;
    this.returnDialogVisible = false;
  }

  updateOrder() {
    if (this.selectedOption?.name === 'Confirmed') {
      console.log('Invoice Number:', this.invoiceNumber);
    } else if (this.selectedOption?.name === 'Returned') {
      this.returnDialogVisible = true;
    }
  }

  confirmReturn() {
    console.log('Selected Product:', this.selectedProduct);
    this.returnDialogVisible = false;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
