import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Timeline } from '../../../../data/data';
import { OrderTrackingComponent } from '../../../../shared/components/order-tracking/order-tracking.component';
import { ButtonModule } from 'primeng/button';
import { forkJoin, Subscription } from 'rxjs';
import { Order } from '../../../../shared/interfaces/orders.interface';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    TableModule,
    OrderTrackingComponent,
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
  private messageService = inject(MessageService);

  orderId: string | null = '';
  order: Partial<Order> = {};
  orderUpdated: boolean = false;

  items: any[] = [];
  deliveryCharge: number = 20;
  orderDetails: any = {};
  timeline: any = [];

  selectedOption: any;
  invoiceNumber: string = '';
  reason: string = '';
  returnDialogVisible = false;
  selectedProduct: any = null;
  invoiceLocked: boolean = false;
  orderTimeline: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');

    if (this.orderId) {
      this.getData(this.orderId);
    }
  }

  getData(_id: string) {
    this.subscriptions.add(
      forkJoin({
        orderResponse: this.service.getOrder(_id),
        statusResponse: this.service.orderStatus(_id),
      }).subscribe(({ orderResponse, statusResponse }) => {
        // Assign the API response to `this.order`
        this.order = orderResponse.data;

        // Map product data into `this.items`
        this.items = orderResponse.data.product.map((product: any) => ({
          productId: product.productId._id,
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          image: product.image,
          amount: product.quantity * product.price,
          stock: product.stock,
          status: product.status,
        }));

        this.selectedOption = orderResponse.data.orderComfirmed;
        this.invoiceNumber = orderResponse.data.invoiceId;

        if (this.order.invoiceId) {
          this.invoiceLocked = true;
        }

        // Process the order status response if needed

        if (statusResponse.data) {
          this.orderTimeline = statusResponse.data.orderTimeline;
        }
        // Store or use the status data

        this.returnDialogVisible = false;
      })
    );
  }

  showDialog() {
    this.orderUpdated = !this.orderUpdated;
  }

  orderUpdates = [
    // { name: 'Pending', code: 'pending' },
    { name: 'Confirmed', code: 'confirmed' },
    { name: 'Delivered', code: 'delivered' },
    { name: 'Cancelled', code: 'cancelled' },
  ];

  cancel() {
    this.orderUpdated = false;
    this.returnDialogVisible = false;
    this.invoiceNumber = '';
  }

  updateOrder() {
    if (this.selectedOption === 'confirmed') {
      this.orderUpdated = false;
      this.returnDialogVisible = true;
    } else {
      this.items.forEach((item: any) => {
        item.status = this.selectedOption; // Ensure all statuses are 'delivered'
      });

      const data = {
        _id: this.orderId,
        orderComfirmed: this.selectedOption,
        product: this.items,
      };

      this.subscriptions.add(
        this.service.updatOrder(data).subscribe(({ data }) => {
          this.orderUpdated = false;

          this.returnDialogVisible = false;

          this.selectedOption = data.orderComfirmed;
          this.invoiceNumber = data.invoiceId;

          this.messageService.add({
            severity: 'success',
            summary: 'Order has been updated!',
            detail: 'Order status email has been sent to the customer.',
          });
        })
      );
    }
  }

  removeProduct(product: any) {
    product.status = 'cancelled';
  }

  selectProduct(product: any) {
    product.status = 'confirmed';
  }

  confirmReturn() {
    if (!this.invoiceNumber) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Please enter a valid invoice number.',
      });
      return;
    }

    const hasPendingProducts = this.items.some(
      (product) => product.status === 'pending'
    );

    if (hasPendingProducts) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Please review the product status.',
      });

      return;
    }

    const data = {
      _id: this.orderId,
      orderComfirmed: this.selectedOption,
      invoiceId: this.invoiceNumber,
      product: this.items,
    };

    this.subscriptions.add(
      this.service.updatOrder(data).subscribe(({ data }) => {
        this.selectedOption = data.data.orderComfirmed;
        this.invoiceNumber = data.data.invoiceId;
        this.orderTimeline = data.orderTimeline;

        this.messageService.add({
          severity: 'success',
          summary: 'Order has been updated!',
          detail: 'Order confirmation email has been sent to the customer.',
        });

        this.orderUpdated = false;
        this.returnDialogVisible = false;
      })
    );
  }

  get validItems() {
    return this.items.filter((item) => item.status !== 'cancelled');
  }

  // Calculate subtotal (sum of amounts from valid items)
  get subtotal() {
    return this.validItems.reduce((sum, item) => sum + item.amount, 0);
  }

  // Calculate VAT (5% of subtotal)
  get vat() {
    return this.subtotal * 0.05;
  }

  // Calculate total amount
  get totalAmount() {
    return this.subtotal + this.vat + this.deliveryCharge;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
