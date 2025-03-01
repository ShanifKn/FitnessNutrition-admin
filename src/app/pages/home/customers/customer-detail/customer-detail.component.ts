import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import {
  Cart,
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
  user!: User;
  userId: string | null = '';
  order: any = [];
  redeem: any[] = [];

  constructor() {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
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
    this.subscriptions.add(
      this.service.getCustomerDetails(_id).subscribe(({ data }) => {
        this.wishlist = data.wishlist;
        this.cart = data.cart;
        this.user = data.user;
      })
    );
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions when the component is destroyed
    this.subscriptions.unsubscribe();
  }
}
