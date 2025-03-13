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
  ReturnRequest,
} from '../../../../shared/interfaces/orders.interface';
import { forkJoin, Subscription } from 'rxjs';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

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
  dialogSupport: boolean = false;
  returnMessageDialog: boolean = false;
  deliveryCharge: boolean = false;

  deliveryChargeValue: number = 0;
  searchText: string = '';
  searchText2: string = '';
  replyText: string = "";
  errorMessage: string = "";

  orderCount: Partial<OrderCount> = {};
  products: Order[] = [];
  returnRequest: ReturnRequest[] = [];
  supportRequest: ReturnRequest[] = [];
  selectedRequest: Partial<ReturnRequest> | null = null;
  selectedSupport: Partial<ReturnRequest> | null = null;



  private subscriptions = new Subscription();
  private service = inject(OrdersService);
  messageService = inject(MessageService);

  constructor() {
    this.fetchData();
  }

  fetchData() {
    this.subscriptions.add(
      forkJoin({
        count: this.service.getCount(),
        orders: this.service.getOrders(),
        deliveryCharge: this.service.deliveryCharge(),
        returnRequest: this.service.getReturnRequest(),
        supportRequest: this.service.getSupportRequest()
      }).subscribe(({ count, orders, deliveryCharge, returnRequest, supportRequest }) => {
        // Assign the respective data
        this.orderCount = count.data; // Assuming count has a 'data' field
        this.products = orders.data; // Assuming orders has a 'data' field
        this.deliveryChargeValue = deliveryCharge.data;
        this.returnRequest = returnRequest.data;
        this.supportRequest = supportRequest.data;

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
    this.dialogSupport = true;
  }

  showDialogs() {
    this.deliveryCharge = !this.deliveryCharge;
  }

  showMessageDialog(data: any) {
    this.returnMessageDialog = true;
    this.selectedRequest = data;
  }

  showSupportDialog(data: any) {
    this.selectedSupport = data
    this.dialogSupport = true
  }

  addDeliveryCharge() {
    this.subscriptions.add(
      this.service.addDeliveryCharge(this.deliveryChargeValue).subscribe(({ message }) => {

      })
    )
  }

  handleReject() {
    if (!this.selectedRequest?.response) {
      this.errorMessage = "Please provide a reason for rejection.";
      return;
    }
    this.errorMessage = "";

    const data = {
      requestId: this.selectedRequest?._id,
      reason: this.selectedRequest?.response,
      response: false
    }

    this.subscriptions.add(
      this.service.rejectRequest(data).subscribe(({ message }) => {
        this.messageService.add({ severity: 'success', summary: message });
        this.returnMessageDialog = false

        if (this.selectedRequest) {
          this.selectedRequest.status = 'Declined';
        }

      })
    )

  }

  handleAccept() {
    this.errorMessage = "";

    const data = {
      requestId: this.selectedRequest?._id,
      reason: this.selectedRequest?.response,
      response: true
    }

    this.subscriptions.add(
      this.service.rejectRequest(data).subscribe(({ message }) => {
        this.messageService.add({ severity: 'success', summary: message });
        this.returnMessageDialog = false

        if (this.selectedRequest) {
          this.selectedRequest.status = 'Accepted';
        }
      })
    )

  }

  handleSendResponse() {

    const data: any = {
      requestId: this.selectedSupport?._id,
      reason: this.selectedSupport?.response
    }

    this.subscriptions.add(
      this.service.sendSupport(data).subscribe(({ message }) => {
        this.messageService.add({ severity: 'success', summary: message });
        this.dialogSupport = false

        if (this.selectedSupport) {
          this.selectedSupport.status = 'Accepted';
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
