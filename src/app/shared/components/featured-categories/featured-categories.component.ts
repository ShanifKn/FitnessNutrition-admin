import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CategoryData } from '../../interfaces/category.interface';
import { CategoryService } from '../../../pages/home/catalogue/categories/category.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-featured-categories',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    RouterModule,
    DialogModule,
    ConfirmPopupModule,
  ],
  templateUrl: './featured-categories.component.html',
  styleUrl: './featured-categories.component.scss',
})
export class FeaturedCategoriesComponent {
  services = inject(CategoryService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);

  private subscriptions = new Subscription();
  @Input() featuredCategory: CategoryData[] = [];

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
    this.featuredCategory = this.featuredCategory.filter(
      (item) => item._id !== idToRemove
    );
    return this.featuredCategory;
  }
}
