import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { FeaturedCategoriesComponent } from '../../../../../shared/components/featured-categories/featured-categories.component';
import { CategoryService } from '../category.service';
import { CategoryData } from '../../../../../shared/interfaces/category.interface';
import { Subscription } from 'rxjs';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    TabViewModule,
    FeaturedCategoriesComponent,
    TableModule,
    CommonModule,
    RouterModule,
    ConfirmPopupModule,
    ButtonModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  providers: [ConfirmationService],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  services = inject(CategoryService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);

  private subscriptions = new Subscription();
  categories: CategoryData[] = [];
  featuredCategory: CategoryData[] = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    // Use forkJoin to combine the two API calls
    this.subscriptions.add(
      forkJoin({
        nonFeatured: this.services.getData(),
        featured: this.services.getFeaturedCategory(),
      }).subscribe({
        next: ({ nonFeatured, featured }) => {
          // Assign the results to respective variables
          this.categories = nonFeatured.data;
          this.featuredCategory = featured.data;
        },
        error: (err) => {
          console.error('Error fetching data:', err);
        },
      })
    );
  }

  deleteCategory(_id: string) {
    this.subscriptions.add;
    this.services.deleteCategory(_id).subscribe(({ message }) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: message,
        life: 3000,
      });
      this.removeItemById(_id);
    });
  }

  confirm2(event: Event, _id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this category?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.deleteCategory(_id);
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  removeItemById(idToRemove: string): any[] {
    this.categories = this.categories.filter((item) => item._id !== idToRemove);
    return this.categories;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
