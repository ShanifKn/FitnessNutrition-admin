import { Component, inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { Products } from '../../../../../shared/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../../../shared/pipes/search.pipe';

@Component({
  selector: 'app-pending-list',
  standalone: true,
  imports: [TableModule, CommonModule, RouterModule, FormsModule, SearchPipe],
  templateUrl: './pending-list.component.html',
  styleUrl: './pending-list.component.scss',
  providers: [ProductService],
})
export class PendingListComponent implements OnDestroy {
  products: Products[] = [];
  searchText: string = '';

  private subscriptions = new Subscription();

  services = inject(ProductService);

  constructor() {
    this.getProdcut();
  }

  getProdcut() {
    this.subscriptions.add(
      this.services.getPendingProduct().subscribe(({ data }) => {
        this.products = data;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
