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
import { SearchPipe } from '../../../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

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
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [ProductService],
})
export class ProductListComponent implements OnDestroy {
  pendingNumber: string = '0';
  sidebarVisible: boolean = false;
  products: Products[] = [];
  searchText: string = '';
  pageIndex: number = 1; // For tracking the current page
  itemsPerPage: number = 5; // Number of items per page
  first = 0;
  totalProducts: number = 0;
  pageLinkSize: number = 5;

  private subscriptions = new Subscription();

  services = inject(ProductService);

  constructor() {
    const storedPageIndex = localStorage.getItem('pageIndex');

    if (storedPageIndex) {
      this.first = parseInt(storedPageIndex, 10) * this.itemsPerPage;
    }

    this.getData();
  }

  getData() {
    this.subscriptions.add(
      forkJoin({
        pendingCount: this.services.getCount(),
        products: this.services.getProduct(this.pageIndex, this.itemsPerPage),
      }).subscribe(({ pendingCount, products }) => {
        this.pendingNumber = pendingCount.data;
        this.products = products.data.product;
        this.totalProducts = products.data.totalProducts;

        console.log(this.totalProducts);
      })
    );
  }

  onPageChange(event: any) {
    this.first = event.first; // Update the first row index
    const currentPage = event.first / event.rows; // Calculate current page index
    localStorage.setItem('pageIndex', currentPage.toString()); // Store page index
  }

  navigateToDetail() {
    localStorage.setItem('pageIndex', this.pageIndex.toString());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
