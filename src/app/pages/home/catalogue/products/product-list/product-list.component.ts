import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { forkJoin, Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { PendingListComponent } from '../pending-list/pending-list.component';
import { Products } from '../../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    RouterModule,
    SidebarModule,
    ButtonModule,
    PendingListComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [ProductService],
})
export class ProductListComponent implements OnDestroy {
  pendingNumber: string = '0';
  sidebarVisible: boolean = false;
  products: Products[] = [];

  private subscriptions = new Subscription();

  services = inject(ProductService);

  constructor() {
    this.getData();
  }

  getData() {
    this.subscriptions.add(
      forkJoin({
        pendingCount: this.services.getCount(),
        products: this.services.getProduct(),
      }).subscribe(({ pendingCount, products }) => {
        this.pendingNumber = pendingCount.data;
        this.products = products.data;

      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
