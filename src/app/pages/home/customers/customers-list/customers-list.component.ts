import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CustomerService } from '../customer.service';
import { Subscription } from 'rxjs';
import { Customer } from '../../../../shared/interfaces/data.interface';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [TableModule, CommonModule, RouterModule],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.scss',
  providers: [CustomerService],
})
export class CustomersListComponent implements OnDestroy {
  private service = inject(CustomerService);
  private subscription = new Subscription();

  users: Customer[] = [];

  constructor() {
    this.getData();
  }

  getData() {
    this.subscription.add(
      this.service.getCustomers().subscribe(({ data }) => {
        this.users = data;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
