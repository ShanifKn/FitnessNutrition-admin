import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-featured-categories',
  standalone: true,
  imports: [TableModule, CommonModule, RouterModule, DialogModule],
  templateUrl: './featured-categories.component.html',
  styleUrl: './featured-categories.component.scss',
})
export class FeaturedCategoriesComponent {


  products: any[] = [
    {
      no: 1,
      image: '/assets/images/customer/product1.svg',
      name: 'Sports Nutritions',
      description: 'Products for sports',
      count: '154',
    },
    {
      no: 1,
      image: '/assets/images/customer/product1.svg',
      name: 'Health Management',
      description: 'Products for Health',
      count: '154',
    },
    {
      no: 1,
      image: '/assets/images/customer/product1.svg',
      name: 'Vitamins & Minerals',
      description: 'Products for Vitamins',
      count: '154',
    },
    {
      no: 1,
      image: '/assets/images/customer/product1.svg',
      name: 'Healthy Foods',
      description: 'Products for healthy foods',
      count: '154',
    },
  ];
}
