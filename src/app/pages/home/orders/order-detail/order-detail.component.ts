import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Timeline } from '../../../../data/data';
import { OrderTrackingComponent } from '../../../../shared/components/order-tracking/order-tracking.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, OrderTrackingComponent, ButtonModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {
  items = [
    {
      name: 'Optimum Nutrition Gold Standard 100% Whey Protein',
      image: '/assets/images/dashboard/product.svg',
      quantity: 1,
      offer: 25,
      amount: 128.85,
    },
    {
      name: 'Optimum Nutrition Gold Standard 100% Whey Protein',
      image: '/assets/images/dashboard/product.svg',
      quantity: 1,
      offer: 5,
      amount: 250.71,
    },
  ];

  // Calculation values
  subtotal = 370.9;
  vat = 10.0;
  offerApplied = 30.0;
  deliveryCharge = 0.0;
  totalAmount = 403.0;
  orderTimeline = Timeline;


}
