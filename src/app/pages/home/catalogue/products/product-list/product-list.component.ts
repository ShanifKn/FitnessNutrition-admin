import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [TableModule, CommonModule,RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: any[] = [
    {
      no: 1,
      image: '/assets/images/customer/product1.svg',
      name: 'Optimum Nutrition Gold Standard 100% Whey Protein',
      category: 'Protein Powder',
      stock: '0',
      price: '49.99',
    },
    {
      no: 2,
      image: '/assets/images/customer/product1.svg',
      name: 'Optimum Nutrition Gold Standard 100% Whey Protein',
      category: 'Supplements',
      stock: '5',
      price: '59.99',
    },
    {
      no: 3,
      image: '/assets/images/customer/product1.svg',
      name: 'Optimum Nutrition Gold Standard 100% Whey Protein',
      category: 'Amino Acids',
      stock: '15',
      price: '29.99',
    },
    {
      no: 4,
      image: '/assets/images/customer/product1.svg',
      name: 'Optimum Nutrition Gold Standard 100% Whey Protein',
      category: 'Supplements',
      stock: '20',
      price: '19.99',
    },
    {
      no: 5,
      image: '/assets/images/customer/product1.svg',
      name: 'Optimum Nutrition Gold Standard 100% Whey Protein',
      category: 'Protein Powder',
      stock: '8',
      price: '39.99',
    },
    {
      no: 6,
      image: '/assets/images/customer/product1.svg',
      name: 'Optimum Nutrition Gold Standard 100% Whey Protein',
      category: 'Energy Boosters',
      stock: '12',
      price: '34.99',
    },
    {
      no: 7,
      image: '/assets/images/customer/product1.svg',
      name: 'Optimum Nutrition Gold Standard 100% Whey Protein',
      category: 'Omega 3',
      stock: '25',
      price: '14.99',
    },
  ];
}
