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
import { PaginatorModule } from 'primeng/paginator';
import { Router, NavigationStart } from '@angular/router';


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
    PaginatorModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [ProductService],
})
export class ProductListComponent implements OnDestroy {
  pendingNumber: string = '0';
  sidebarVisible: boolean = false;
  visible: boolean = false;
  products: Products[] = [];
  searchText: string = '';
  pageIndex: number = 1; // For tracking the current page
  itemsPerPage: number = 7; // Number of items per page
  first = 0;
  totalProducts: number = 0;
  pageLinkSize: number = 5;

  private subscriptions = new Subscription();


  services = inject(ProductService);

  constructor(private router: Router) {

    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setTimeout(() => {
        this.first = +savedPage; // Set to the saved page
      });
    }

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

  onPageChange(event: any) {
    localStorage.setItem('currentPage', event.first.toString());
  }

  navigateToDetail() {
    localStorage.setItem('pageIndex', this.pageIndex.toString());
  }

  showDialog() {
    this.visible = true;
  }

  fetchProduct() {
    this.subscriptions.add(this.services.getProductZoho().subscribe(({ message }) => {
      console.log(message);
    }))
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
