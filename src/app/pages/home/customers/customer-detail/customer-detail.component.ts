import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { forkJoin, Subscription } from 'rxjs';
import {
  Cart,
  CustomerDataCount,
  User,
  Wishlist,
} from '../../../../shared/interfaces/data.interface';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [TableModule, CommonModule, RouterModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss',
  providers: [CustomerService],
})
export class CustomerDetailComponent implements OnDestroy, OnInit {
  private subscriptions = new Subscription();
  private service = inject(CustomerService);
  private route = inject(ActivatedRoute);

  wishlist!: Wishlist;
  cart!: Cart;
  user: Partial<User> = {};  // Avoids undefined reference errors
  userId: string | null = '';
  order: any = [];
  redeem: any[] = [];
  count: Partial<CustomerDataCount> = {}

  constructor() {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.userId) {
      this.getData(this.userId);
    }
  }

  redeemCard: any[] = [
    {
      date: '10-10-2024',
      code: 'ASDZERTYGF',
      offerType: 'Season Promotion',
      redeem: '250.00',
      orderId: '#45890',
      invoice: '#458901231',
    },
  ];


  getData(_id: string) {
    const customerDetails$ = this.service.getCustomerDetails(_id);
    const orders$ = this.service.getOrders(_id);
    const counts$ = this.service.getOrdersCounts(_id);

    this.subscriptions.add(
      forkJoin({
        customerDetails: customerDetails$,
        orders: orders$,
        counts: counts$
      }).subscribe(({ customerDetails, orders, counts }) => {
        this.wishlist = customerDetails.data.wishlist;
        this.cart = customerDetails.data.cart;
        this.user = customerDetails.data.user;
        this.order = orders.data;
        this.count = counts.data;

        console.log(this.order)
      })
    );
  }



  ngOnDestroy() {
    // Unsubscribe from all subscriptions when the component is destroyed
    this.subscriptions.unsubscribe();
  }
}
